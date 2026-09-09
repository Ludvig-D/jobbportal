import { notFound } from 'next/navigation';
import { getStoryblokApi, getStoryVersion } from '@/lib/storyblok';
import JobPost from '@/components/JobPost';

async function getJobStory(slug) {
	const storyblokApi = getStoryblokApi();
	const sbParams = { version: getStoryVersion() };

	for (const path of [`jobs/${slug}`, slug]) {
		try {
			const { data } = await storyblokApi.get(`cdn/stories/${path}`, sbParams);
			if (data?.story?.content?.component === 'job-post') {
				return data.story;
			}
		} catch {
			// Storyblok throws when the slug does not exist — try the next path.
		}
	}

	return null;
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const story = await getJobStory(slug);

	if (!story) {
		return { title: 'Jobb hittades inte' };
	}

	return {
		title: story.content.title,
		description: story.content.summary,
	};
}

export default async function JobPostPage({ params }) {
	const { slug } = await params;
	const story = await getJobStory(slug);

	if (!story) {
		notFound();
	}

	return <JobPost blok={story.content} />;
}
