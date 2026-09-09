import './globals.css';
import { Instrument_Sans, Young_Serif } from 'next/font/google';
import StoryblokProvider from '@/components/StoryblokProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const displayFont = Young_Serif({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
});

const bodyFont = Instrument_Sans({
	subsets: ['latin'],
	variable: '--font-body',
	display: 'swap',
});

export const metadata = {
	title: 'Jobbportal',
	description:
		'Lediga jobb inom hotell och restaurang – kök, servering, reception och housekeeping i hela Sverige.',
};

export default function RootLayout({ children }) {
	return (
		<StoryblokProvider>
			<html lang="sv" className={`${displayFont.variable} ${bodyFont.variable}`}>
				<body className="flex min-h-dvh flex-col">
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</StoryblokProvider>
	);
}
