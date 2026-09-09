import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
	title: 'Jobbportal',
	description: 'Hitta ditt nästa jobb – lediga tjänster inom teknik, design, marknad och mycket mer.',
};

export default function RootLayout({ children }) {
	return (
		<StoryblokProvider>
			<html lang="sv">
				<body>
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</StoryblokProvider>
	);
}
