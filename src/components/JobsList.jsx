import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import { getStoryblokApi, getStoryVersion } from '@/lib/storyblok';
import { getDepartmentOptions } from '@/lib/departments';
import { departmentLabel, formatPublishedAt } from '@/lib/job-format';

async function getJobStories({ department, q }) {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories', {
		version: getStoryVersion(),
		starts_with: 'jobs/',
		content_type: 'job-post',
		filter_query: department
			? { department: { in: department } }
			: undefined,
		search_term: q || undefined,
		sort_by: 'content.publishedAt:desc',
		per_page: 100,
	});

	return data?.stories ?? [];
}

export default async function JobsList({ blok, department, q }) {
	const [stories, departmentOptions] = await Promise.all([
		getJobStories({ department, q }),
		getDepartmentOptions(),
	]);

	return (
		<section className="jobs-list" {...storyblokEditable(blok)}>
			{blok.heading && <h1 className="jobs-list__heading">{blok.heading}</h1>}
			{blok.subheading && (
				<p className="jobs-list__subheading">{blok.subheading}</p>
			)}

			{stories.length === 0 ? (
				<p className="jobs-list__empty">
					{blok.emptyMessage || 'Inga jobb hittades.'}
				</p>
			) : (
				<ul className="jobs-list__cards">
					{stories.map((story) => {
						const content = story.content;
						const label = departmentLabel(content.department, departmentOptions);
						const publishedAt = formatPublishedAt(content.publishedAt);

						return (
							<li key={story.id} className="job-card">
								<Link className="job-card__link" href={`/jobs/${story.slug}`}>
									<h2 className="job-card__title">{content.title}</h2>
									{(label || content.location || publishedAt) && (
										<p className="job-card__meta">
											{label && <span>{label}</span>}
											{content.location && <span>{content.location}</span>}
											{publishedAt && (
												<time dateTime={content.publishedAt}>{publishedAt}</time>
											)}
										</p>
									)}
									{content.summary && (
										<p className="job-card__summary">{content.summary}</p>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
