import { storyblokEditable } from '@storyblok/react/rsc';

export default function SearchBar({ blok, department, q }) {
	return (
		<form
			method="get"
			action="/jobs"
			className="toolbar__search"
			{...storyblokEditable(blok)}
		>
			<input
				type="search"
				name="q"
				defaultValue={q ?? ''}
				placeholder={blok.placeholder || 'Sök jobb, plats eller kompetens'}
				aria-label="Sök jobb"
			/>
			{department && <input type="hidden" name="department" value={department} />}
			<button type="submit">Sök jobb</button>
		</form>
	);
}
