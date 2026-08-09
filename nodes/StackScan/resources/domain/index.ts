import type { INodeProperties } from 'n8n-workflow';
import { domainLookupDescription } from './lookup';
import { domainBatchDescription } from './batch';

const showOnlyForDomain = {
	resource: ['domain'],
};

export const domainDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDomain },
		options: [
			{
				name: 'Look Up Technologies',
				value: 'lookup',
				action: 'Look up technologies on a domain',
				description: 'Return every technology detected on one website',
				routing: {
					request: { method: 'GET', url: '/v1/tech-lookup/domains/lookup' },
				},
			},
			{
				name: 'Look Up Technologies in Bulk',
				value: 'batch',
				action: 'Look up technologies on many domains',
				description: 'Return technologies for up to 100 websites in one call',
				routing: {
					request: { method: 'POST', url: '/v1/tech-lookup/domains/batch' },
				},
			},
		],
		default: 'lookup',
	},
	...domainLookupDescription,
	...domainBatchDescription,
];
