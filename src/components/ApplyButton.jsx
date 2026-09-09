import { getApplyHref } from '@/lib/apply';

export default function ApplyButton({ blok, className = '' }) {
	const href = getApplyHref(blok);
	const isExternal = href.startsWith('http');

	return (
		<a
			className={`inline-flex items-center justify-center bg-text px-7 py-3 font-semibold text-surface no-underline transition-colors hover:bg-gold hover:text-ink motion-reduce:transition-none ${className}`}
			href={href}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener noreferrer' : undefined}
		>
			Sök tjänsten
		</a>
	);
}
