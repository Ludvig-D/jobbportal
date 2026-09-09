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

const mainColumn = 'md:col-start-2';

export default async function JobsList({ blok, department, q }) {
	const [stories, departmentOptions] = await Promise.all([
		getJobStories({ department, q }),
		getDepartmentOptions(),
	]);
	const isFiltered = Boolean(department || q);

	return (
		<section className="contents" {...storyblokEditable(blok)}>
			{blok.heading && (
				<h1 className="order-1 mt-[clamp(2rem,7vw,4.5rem)] mb-4 max-w-[12ch] font-serif text-[clamp(2.75rem,7.5vw,4.75rem)] leading-[0.98] text-balance">
					{blok.heading}
				</h1>
			)}
			{blok.subheading && (
				<p className="order-2 mb-[clamp(2rem,5vw,3rem)] max-w-[38ch] text-xl leading-[1.45] text-soft">
					{blok.subheading}
				</p>
			)}

			{stories.length === 0 ? (
				<div className="order-4 grid justify-items-start gap-2 py-12 text-lg">
					<p>{blok.emptyMessage || 'Inga jobb hittades.'}</p>
					{isFiltered && <Link href="/jobs">Visa alla lediga jobb</Link>}
				</div>
			) : (
				<ol className="order-4">
					{stories.map((story) => {
						const content = story.content;
						const label = departmentLabel(content.department, departmentOptions);
						const publishedAt = formatPublishedAt(content.publishedAt);

						return (
							<li
								key={story.id}
								className="border-t border-rule first:border-t-0"
							>
								<Link
									className="group grid grid-cols-1 gap-y-[0.4rem] py-6 text-text no-underline md:grid-cols-[11rem_minmax(0,1fr)] md:grid-rows-[auto_auto_auto] md:gap-x-10 md:gap-y-2 md:py-8"
									href={`/jobs/${story.slug}`}
								>
									<h2
										className={`${mainColumn} font-serif text-[clamp(1.45rem,2.6vw,1.85rem)] leading-[1.15] underline decoration-[0.06em] decoration-transparent underline-offset-[0.14em] transition-colors group-hover:decoration-gold motion-reduce:transition-none`}
									>
										{content.title}
									</h2>
									{(label || content.location) && (
										<p className="order-first flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] leading-[1.4] text-soft md:order-none md:col-start-1 md:row-span-3 md:row-start-1 md:flex-col md:gap-[0.1rem] md:pt-[0.35rem]">
											{label && (
												<span className="font-semibold text-text">{label}</span>
											)}
											{content.location && <span>{content.location}</span>}
										</p>
									)}
									{content.summary && (
										<p className={`${mainColumn} max-w-[58ch]`}>
											{content.summary}
										</p>
									)}
									{publishedAt && (
										<p className={`${mainColumn} mt-1 text-sm text-soft`}>
											Publicerad{' '}
											<time dateTime={content.publishedAt}>{publishedAt}</time>
										</p>
									)}
								</Link>
							</li>
						);
					})}
				</ol>
			)}
		</section>
	);
}
