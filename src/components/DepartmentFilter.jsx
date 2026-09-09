import { storyblokEditable } from '@storyblok/react/rsc';
import { getDepartmentOptions } from '@/lib/departments';

export default async function DepartmentFilter({ blok, department, q }) {
	const options = await getDepartmentOptions();

	return (
		<form
			method="get"
			action="/jobs"
			className="toolbar__filter"
			{...storyblokEditable(blok)}
		>
			<label htmlFor="department-filter-select">
				{blok.label || 'Kategori'}
			</label>
			<select
				id="department-filter-select"
				name="department"
				defaultValue={department ?? ''}
			>
				<option value="">Alla kategorier</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
			{q && <input type="hidden" name="q" value={q} />}
			<button type="submit">Filtrera</button>
		</form>
	);
}
