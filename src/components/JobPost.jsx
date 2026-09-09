import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';
import Link from 'next/link';
import { getDepartmentOptions } from '@/lib/departments';
import { departmentLabel, formatPublishedAt } from '@/lib/job-format';
import { wrap } from '@/lib/styles';
import ApplyButton from '@/components/ApplyButton';

function MetaItem({ label, children }) {
	return (
		<p>
			<span className="block text-[0.8rem] text-soft">{label}</span>
			{children}
		</p>
	);
}

export default async function JobPost({ blok }) {
	const departmentOptions = await getDepartmentOptions();
	const department = departmentLabel(blok.department, departmentOptions);
	const publishedAt = formatPublishedAt(blok.publishedAt);
	// A long description pushes the first button out of view, so repeat it at the end.
	const isLongContent = (blok.content?.content?.length ?? 0) > 5;

	return (
		<article
			className={`${wrap} grid grid-cols-1 pt-6 pb-[clamp(3rem,8vw,6rem)] md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10`}
			{...storyblokEditable(blok)}
		>
			<p className="col-span-full mb-[clamp(2rem,6vw,4rem)] text-[0.95rem]">
				<Link
					className="text-text underline decoration-2 decoration-gold underline-offset-[0.35em]"
					href="/jobs"
				>
					Tillbaka till alla jobb
				</Link>
			</p>

			<aside
				className="row-start-3 mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6 text-[0.95rem] leading-[1.4] md:sticky md:top-8 md:col-start-1 md:row-start-2 md:mt-0 md:flex-col md:gap-4 md:self-start md:border-t-0 md:pt-[0.6rem]"
				aria-label="Om tjänsten"
			>
				{department && <MetaItem label="Avdelning">{department}</MetaItem>}
				{blok.location && <MetaItem label="Ort">{blok.location}</MetaItem>}
				{publishedAt && (
					<MetaItem label="Publicerad">
						<time dateTime={blok.publishedAt}>{publishedAt}</time>
					</MetaItem>
				)}
			</aside>

			<div className="row-start-2 min-w-0 md:col-start-2">
				<h1 className="mb-5 max-w-[16ch] font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.02] text-balance">
					{blok.title}
				</h1>

				{blok.summary && (
					<p className="mb-6 max-w-[40ch] text-xl leading-[1.45]">
						{blok.summary}
					</p>
				)}

				<ApplyButton blok={blok} className="mb-10" />

				{blok.content && (
					<>
						<div className="rich-text">
							<StoryblokServerRichText doc={blok.content} />
						</div>
						{isLongContent && <ApplyButton blok={blok} className="mt-10" />}
					</>
				)}
			</div>
		</article>
	);
}
