import type { INodeProperties } from 'n8n-workflow';

const showOnly = {
	operation: ['batch'],
	resource: ['domain'],
};

export const domainBatchDescription: INodeProperties[] = [
	{
		displayName: 'Domains',
		name: 'domains',
		type: 'string',
		typeOptions: { multipleValues: true, multipleValueButtonText: 'Add domain' },
		default: [],
		required: true,
		placeholder: 'stripe.com',
		displayOptions: { show: showOnly },
		description: 'Up to 100 domains in one call. Only domains we resolve are charged.',
		routing: { send: { type: 'body', property: 'domains' } },
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
				name: 'category',
				type: 'string',
				default: '',
				placeholder: 'Ecommerce',
				description: 'Return only technologies in this category. Case insensitive.',
				routing: { send: { type: 'body', property: 'category' } },
			},
			{
				displayName: 'Technologies Per Domain',
				name: 'perDomain',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 50 },
				default: 10,
				routing: { send: { type: 'body', property: 'per_domain' } },
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'multiOptions',
				default: [],
				description:
					'Which per-technology fields to include. Leave empty for all of them. Trimming this cuts response size on large batches.',
				options: [
					{ name: 'Category', value: 'category' },
					{ name: 'Stack ID', value: 'stack_id' },
					{ name: 'Sub Category', value: 'sub_category' },
					{ name: 'Total Sites', value: 'total_sites' },
					{ name: 'Website', value: 'website' },
				],
				routing: { send: { type: 'body', property: 'fields' } },
			},
			{
				displayName: 'Skip Cache',
				name: 'fresh',
				type: 'boolean',
				default: false,
				description: 'Whether to bypass the response cache',
				routing: { send: { type: 'body', property: 'fresh' } },
			},
		],
	},
];
