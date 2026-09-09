import { lineInput, textButton, wrap } from '@/lib/styles';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto bg-band pt-[clamp(2.5rem,6vw,4rem)] pb-6 text-band-text">
			<div className={wrap}>
				<form
					className="grid grid-cols-1 items-end gap-x-[clamp(2rem,6vw,5rem)] gap-y-6 md:grid-cols-2"
					action="#"
				>
					<p className="flex max-w-[32ch] flex-col gap-[0.35rem] text-band-soft">
						<strong className="font-serif text-[1.6rem] leading-[1.15] font-normal text-band-text">
							Få nya jobb direkt i inkorgen
						</strong>
						<span>Vi skickar ett mejl när en ny tjänst läggs ut. Inget annat.</span>
					</p>
					<p className="flex max-w-[26rem] items-end gap-4">
						<input
							className={`${lineInput} border-band-soft text-band-text placeholder:text-band-soft`}
							type="email"
							name="email"
							placeholder="Din e-postadress"
							aria-label="E-postadress"
							autoComplete="email"
						/>
						<button className={textButton} type="submit">
							Prenumerera
						</button>
					</p>
				</form>
				<p className="mt-[clamp(2rem,5vw,3rem)] text-[0.85rem] text-band-soft">
					© {currentYear} Jobbportal
				</p>
			</div>
		</footer>
	);
}
