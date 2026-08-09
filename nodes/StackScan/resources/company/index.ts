import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCompany = {
	resource: ['company'],
};

const showOnlyForLookup = {
	operation: ['lookup'],
	resource: ['company'],
};

export const companyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCompany },
		options: [
			{
				name: 'Look Up Company',
				value: 'lookup',
				action: 'Look up the company behind a domain',
				description: 'Return the company behind a website, with industry and location',
				routing: {
					request: { method: 'GET', url: '/v1/tech-lookup/companies/lookup' },
				},
			},
		],
		default: 'lookup',
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'stripe.com',
		displayOptions: { show: showOnlyForLookup },
		description: 'The website whose company you want. A full URL is accepted.',
		routing: { send: { type: 'query', property: 'domain' } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: { show: showOnlyForLookup },
		options: [
			{
				displayName: 'Skip Cache',
				name: 'fresh',
				type: 'boolean',
				default: false,
				description: 'Whether to bypass the response cache',
				routing: { send: { type: 'query', property: 'fresh' } },
			},
		],
	},
];
