export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<form className="site-footer__newsletter" action="#">
				<p className="site-footer__newsletter-text">
					<strong>Få nya jobb direkt</strong>
					<span>Prenumerera på vårt nyhetsbrev och få våra senaste jobbannonser.</span>
				</p>
				<input type="email" name="email" placeholder="Din e-post" aria-label="E-postadress" />
				<button type="submit">Prenumerera</button>
			</form>
			<p className="site-footer__bottom">Alla rättigheter förbehållna © {currentYear} Jobbportal</p>
		</footer>
	);
}
