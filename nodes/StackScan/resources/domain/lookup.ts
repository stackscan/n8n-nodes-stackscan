import type { INodeProperties } from 'n8n-workflow';

const showOnly = {
	operation: ['lookup'],
	resource: ['domain'],
};

export const domainLookupDescription: INodeProperties[] = [
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'stripe.com',
		displayOptions: { show: showOnly },
		description: 'The website to look up. A full URL is accepted and reduced to its domain.',
		routing: { send: { type: 'query', property: 'domain' } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: { show: showOnly },
		options: [
			{
				displayName: 'Category',
				name: 'technology',
				type: 'string',
				default: '',
				placeholder: 'Ecommerce',
				description: 'Return only technologies matching this name or category',
				routing: { send: { type: 'query', property: 'technology' } },
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 1,
				routing: { send: { type: 'query', property: 'page' } },
			},
			{
				displayName: 'Technologies Per Page',
				name: 'perPage',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 500 },
				default: 50,
				description: 'Max number of technologies to return per page',
				routing: { send: { type: 'query', property: 'per_page' } },
			},
			{
				displayName: 'Skip Cache',
				name: 'fresh',
				type: 'boolean',
				default: false,
				description:
					'Whether to bypass the response cache. A cached response still costs a credit, so this only affects freshness.',
				routing: { send: { type: 'query', property: 'fresh' } },
			},
		],
	},
];
