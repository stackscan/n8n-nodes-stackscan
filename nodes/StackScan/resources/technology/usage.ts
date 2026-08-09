import type { INodeProperties } from 'n8n-workflow';

const showOnly = {
	operation: ['usage'],
	resource: ['technology'],
};

export const technologyUsageDescription: INodeProperties[] = [
	{
		displayName: 'Technology',
		name: 'technology',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'Shopify',
		displayOptions: { show: showOnly },
		description: 'The technology name, for example Shopify or Google Analytics',
		routing: { send: { type: 'query', property: 'technology' } },
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
				displayName: 'Include Websites',
				name: 'websites',
				type: 'boolean',
				default: false,
				description:
					'Whether to include a page of websites running the technology. Counts and top countries are returned either way.',
				routing: { send: { type: 'query', property: 'websites' } },
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
				displayName: 'Websites Per Page',
				name: 'perPage',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 25,
				routing: { send: { type: 'query', property: 'per_page' } },
			},
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
