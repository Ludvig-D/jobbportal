import { storyblokEditable } from '@storyblok/react/rsc';

const Feature = ({ blok }) => {
	return (
		<div
			className="border-t border-rule py-6 font-serif text-2xl"
			{...storyblokEditable(blok)}
		>
			<span>{blok.name}</span>
		</div>
	);
};

export default Feature;
