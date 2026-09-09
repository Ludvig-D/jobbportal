import { storyblokEditable } from '@storyblok/react/rsc';

const Teaser = ({ blok }) => {
	return (
		<div className="py-16 text-center" {...storyblokEditable(blok)}>
			<h1 className="font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.02] text-balance">
				{blok.headline}
			</h1>
		</div>
	);
};

export default Teaser;
