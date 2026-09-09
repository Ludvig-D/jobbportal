import Link from 'next/link';

export default function Header() {
	return (
		<header className="site-header">
			<Link className="site-header__logo" href="/">
				JOBBPORTAL
			</Link>
			<nav className="site-header__nav">
				<Link href="/jobs">JOBB</Link>
				<Link href="/om-oss">OM OSS</Link>
				<Link href="/kontakt">KONTAKT</Link>
			</nav>
		</header>
	);
}
