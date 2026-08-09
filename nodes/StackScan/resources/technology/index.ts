import type { INodeProperties } from 'n8n-workflow';
import { technologyUsageDescription } from './usage';
import { technologyStartListDescription } from './startList';

const showOnlyForTechnology = {
	resource: ['technology'],
};

export const technologyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTechnology },
		options: [
			{
				name: 'Get Usage',
				value: 'usage',
				action: 'Get usage for a technology',
				description: 'How many websites run a technology, and where they are',
				routing: {
					request: { method: 'GET', url: '/v1/tech-lookup/technologies/lookup' },
				},
			},
			{
				name: 'Start List Export',
				value: 'startList',
				action: 'Start a technology list export',
				description:
					'Begin a whole-technology export and return straight away with a report ID and status URL',
				routing: {
					request: { method: 'POST', url: '/v1/tech-lookup/lists' },
				},
			},
		],
		default: 'usage',
	},
	...technologyUsageDescription,
	...technologyStartListDescription,
];
