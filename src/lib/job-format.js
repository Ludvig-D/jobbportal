import { getDepartmentLabel } from '@/lib/departments';

export function departmentLabel(department, departmentOptions) {
	if (!department) return null;
	if (typeof department === 'string') {
		return getDepartmentLabel(department, departmentOptions) || department;
	}
	return department.name || department.value || null;
}

export function formatPublishedAt(value) {
	if (!value) return null;

	const date = new Date(String(value).replace(' ', 'T'));
	if (Number.isNaN(date.getTime())) return value;

	return date.toLocaleDateString('sv-SE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}
