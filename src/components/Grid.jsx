import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const Grid = ({ blok }) => (
	<div
		{...storyblokEditable(blok)}
		className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-8"
	>
		{blok.columns.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</div>
);

export default Grid;
