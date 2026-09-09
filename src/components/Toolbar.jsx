import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Toolbar({ blok, ...rest }) {
	return (
		<div className="toolbar" {...storyblokEditable(blok)}>
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
