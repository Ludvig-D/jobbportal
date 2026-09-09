import { storyblokEditable } from '@storyblok/react/rsc';
import { lineInput, textButton } from '@/lib/styles';

export default function SearchBar({ blok, department, q }) {
	return (
		<form
			method="get"
			action="/jobs"
			role="search"
			className="flex max-w-96 flex-1 basis-64 items-end gap-4"
			{...storyblokEditable(blok)}
		>
			<input
				className={`${lineInput} border-rule-strong text-text placeholder:text-soft`}
				type="search"
				name="q"
				defaultValue={q ?? ''}
				placeholder={blok.placeholder || 'Sök jobb, plats eller kompetens'}
				aria-label="Sök jobb"
			/>
			{department && <input type="hidden" name="department" value={department} />}
			<button className={textButton} type="submit">
				Sök
			</button>
		</form>
	);
}
