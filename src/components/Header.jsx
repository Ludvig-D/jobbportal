import Link from 'next/link';
import { wrap } from '@/lib/styles';

export default function Header() {
	return (
		<header className="pt-6 pb-2">
			<div className={wrap}>
				<Link className="font-serif text-2xl text-text no-underline" href="/">
					Jobbportal
				</Link>
			</div>
		</header>
	);
}
