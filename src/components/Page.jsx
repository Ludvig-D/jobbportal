import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import { wrap } from '@/lib/styles';

/*
 * The index page is a grid so that the toolbar block, which Storyblok places
 * before the jobs list, can be ordered between the list's heading and its rows.
 */
const Page = ({ blok, ...rest }) => (
	<main
		className={`${wrap} grid grid-cols-[minmax(0,1fr)] pb-[clamp(3rem,8vw,6rem)]`}
		{...storyblokEditable(blok)}
	>
		{blok.body?.map((nestedBlok) => (
			<StoryblokServerComponent
				blok={nestedBlok}
				key={nestedBlok._uid}
				{...rest}
			/>
		))}
	</main>
);

export default Page;
