import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class StackScanApi implements ICredentialType {
	name = 'stackScanApi';

	displayName = 'StackScan API';

	icon: Icon = { light: 'file:stackscan.svg', dark: 'file:stackscan.dark.svg' };

	documentationUrl = 'https://www.stackscan.com/docs/api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Create one in StackScan under My Account then API Tokens. It is shown once, so copy it before leaving the page.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	// /v1/me is the only endpoint that works without a workspace header, which
	// is what makes it usable both as the credential test and as the source for
	// the workspace dropdown.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.stackscan.com',
			url: '/v1/me',
		},
	};
}
