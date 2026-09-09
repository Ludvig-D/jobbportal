import { cache } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';

export const getDepartmentOptions = cache(async () => {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'job-departments',
	});

	return data?.datasource_entries ?? [];
});

export function getDepartmentLabel(value, options) {
	if (!value) return null;
	const entry = options?.find((option) => option.value === value);
	return entry?.name || value;
}
