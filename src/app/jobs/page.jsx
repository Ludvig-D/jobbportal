import { notFound } from 'next/navigation';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { getStoryblokApi, getStoryVersion } from '@/lib/storyblok';

function firstValue(value) {
	return Array.isArray(value) ? value[0] : value;
}

async function getJobsIndexStory() {
	const storyblokApi = getStoryblokApi();

	try {
		const { data } = await storyblokApi.get('cdn/stories/jobs', {
			version: getStoryVersion(),
		});
		return data?.story ?? null;
	} catch {
		return null;
	}
}

export async function generateMetadata() {
	return {
		title: 'Jobb | Jobbportal',
		description: 'Bläddra bland lediga jobb hos Jobbportal.',
	};
}

export default async function JobsPage({ searchParams }) {
	const params = await searchParams;
	const department = firstValue(params?.department) || undefined;
	const q = firstValue(params?.q) || undefined;

	const story = await getJobsIndexStory();

	if (!story) {
		notFound();
	}

	return (
		<StoryblokServerComponent
			blok={story.content}
			department={department}
			q={q}
		/>
	);
}
