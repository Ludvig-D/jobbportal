import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import { getDepartmentOptions } from '@/lib/departments';

function buildHref(department, q) {
	const params = new URLSearchParams();
	if (department) params.set('department', department);
	if (q) params.set('q', q);
	const query = params.toString();
	return query ? `/jobs?${query}` : '/jobs';
}

export default async function DepartmentFilter({ blok, department, q }) {
	const options = await getDepartmentOptions();
	const label = blok.label || 'Avdelning';
	const items = [
		{ value: '', name: 'Alla' },
		...options.map((option) => ({ value: option.value, name: option.name })),
	];

	return (
		<nav aria-label={label} {...storyblokEditable(blok)}>
			<span className="sr-only">{label}</span>
			<ul className="flex flex-wrap gap-x-6 gap-y-1">
				{items.map((item) => {
					const isActive = (department ?? '') === item.value;
					return (
						<li key={item.value || 'all'}>
							<Link
								className="inline-block border-b-2 border-transparent pt-[0.35rem] pb-[0.2rem] text-text no-underline transition-colors hover:border-rule aria-[current=true]:border-gold aria-[current=true]:font-semibold motion-reduce:transition-none"
								href={buildHref(item.value, q)}
								aria-current={isActive ? 'true' : undefined}
							>
								{item.name}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
