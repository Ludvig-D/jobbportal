import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Toolbar({ blok, ...rest }) {
	return (
		<div
			className="order-3 flex flex-wrap items-end justify-between gap-x-12 gap-y-5 border-b border-rule-strong pb-5"
			{...storyblokEditable(blok)}
		>
			{blok.items?.map((nestedBlok) => (
				<StoryblokServerComponent
					blok={nestedBlok}
					key={nestedBlok._uid}
					{...rest}
				/>
			))}
		</div>
	);
}
