const FALLBACK_APPLY_EMAIL =
	process.env.NEXT_PUBLIC_APPLY_EMAIL || 'jobb@jobbportal.se';

function mailto(email, title) {
	const subject = encodeURIComponent(`Ansökan: ${title}`);
	return `mailto:${email}?subject=${subject}`;
}

/**
 * Resolve where "Sök tjänsten" should lead.
 *
 * Reads the optional `applyUrl` field on a job-post. It may be a Storyblok
 * Link field (object), a URL string, or a plain email address. Without it,
 * the button opens a pre-filled email to the fallback address.
 */
export function getApplyHref(blok) {
	const raw = blok.applyUrl;
	const title = blok.title || '';

	if (raw && typeof raw === 'object') {
		if (raw.linktype === 'email' && raw.email) return mailto(raw.email, title);
		const url = raw.url || raw.cached_url;
		if (url) return url;
	}

	if (typeof raw === 'string' && raw.trim()) {
		const value = raw.trim();
		if (value.includes('@') && !value.startsWith('http')) {
			return mailto(value.replace(/^mailto:/, ''), title);
		}
		return value;
	}

	return mailto(FALLBACK_APPLY_EMAIL, title);
}
