import type { INodeProperties } from 'n8n-workflow';

const showOnly = {
	operation: ['startList'],
	resource: ['technology'],
};

export const technologyStartListDescription: INodeProperties[] = [
	{
		displayName: 'Technology',
		name: 'technology',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'Shopify',
		displayOptions: { show: showOnly },
		description: 'The technology to export every known website for',
		routing: { send: { type: 'body', property: 'technology' } },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add filter',
		default: {},
		displayOptions: { show: showOnly },
		description: 'Anything left out means no filter, which is the full list',
		options: [
			{
				displayName: 'Domain Endings',
				name: 'tld',
				type: 'string',
				typeOptions: { multipleValues: true, multipleValueButtonText: 'Add domain ending' },
				default: [],
				placeholder: 'com',
				routing: { send: { type: 'body', property: 'tld' } },
			},
			{
				displayName: 'Domain Endings Condition',
				name: 'tldCondition',
				type: 'options',
				default: 'include',
				options: [
					{ name: 'Include', value: 'include' },
					{ name: 'Exclude', value: 'exclude' },
				],
				routing: { send: { type: 'body', property: 'tld_condition' } },
			},
			{
				displayName: 'Company Sizes',
				name: 'companySize',
				type: 'string',
				typeOptions: { multipleValues: true, multipleValueButtonText: 'Add company size' },
				default: [],
				placeholder: '11-50',
				routing: { send: { type: 'body', property: 'company_size' } },
			},
			{
				displayName: 'Only Websites With Company Details',
				name: 'onlyWithCompanyInfo',
				type: 'boolean',
				default: false,
				description: 'Whether to drop websites we hold no company record for',
				routing: { send: { type: 'body', property: 'only_with_company_info' } },
			},
		],
	},
];
