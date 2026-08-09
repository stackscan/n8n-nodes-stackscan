import {
	NodeConnectionTypes,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { domainDescription } from './resources/domain';
import { companyDescription } from './resources/company';
import { technologyDescription } from './resources/technology';

export class StackScan implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'StackScan',
		name: 'stackScan',
		icon: { light: 'file:stackscan.svg', dark: 'file:stackscan.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Look up the technologies and companies behind any website',
		defaults: { name: 'StackScan' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'stackScanApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.stackscan.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Workspace Name or ID',
				name: 'workspace',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getWorkspaces' },
				required: true,
				default: '',
				description:
					'Each workspace has its own credits and its own data, so picking the wrong one spends the wrong balance. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				routing: {
					request: {
						headers: { 'X-Tenant-Id': '={{$value}}' },
					},
				},
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Company', value: 'company' },
					{ name: 'Domain', value: 'domain' },
					{ name: 'Technology', value: 'technology' },
				],
				default: 'domain',
			},
			...domainDescription,
			...companyDescription,
			...technologyDescription,
		],
	};

	methods = {
		loadOptions: {
			async getWorkspaces(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'stackScanApi',
					{
						method: 'GET',
						url: 'https://api.stackscan.com/v1/me',
						json: true,
					},
				)) as { workspaces?: Array<{ id: string; name: string }> };

				// An empty list means the token is valid but belongs to no
				// workspace. Saying so beats rendering an empty dropdown and
				// leaving the user to guess which half is wrong.
				const workspaces = response.workspaces ?? [];

				return workspaces.map((workspace) => ({
					name: workspace.name,
					value: workspace.id,
				}));
			},
		},
	};
}
