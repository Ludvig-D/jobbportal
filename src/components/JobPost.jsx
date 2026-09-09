import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';
import Link from 'next/link';
import { getDepartmentOptions } from '@/lib/departments';
import { departmentLabel, formatPublishedAt } from '@/lib/job-format';

export default async function JobPost({ blok }) {
	const departmentOptions = await getDepartmentOptions();
	const department = departmentLabel(blok.department, departmentOptions);
	const publishedAt = formatPublishedAt(blok.publishedAt);

	return (
		<article className="job-post" {...storyblokEditable(blok)}>
			<Link className="job-post__back" href="/jobs">
				← Alla jobb
			</Link>

			{(department || blok.location || publishedAt) && (
				<p className="job-post__meta">
					{department && <span>{department}</span>}
					{blok.location && <span>{blok.location}</span>}
					{publishedAt && <time dateTime={blok.publishedAt}>{publishedAt}</time>}
				</p>
			)}

			<h1>{blok.title}</h1>

			{blok.summary && <p className="job-post__summary">{blok.summary}</p>}

			{blok.content && (
				<div className="job-post__content">
					<StoryblokServerRichText doc={blok.content} />
				</div>
			)}
		</article>
	);
}
