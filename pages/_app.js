import '../styles/globals.css';
import { Navbar, Footer } from '../components';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </SessionProvider>
    );
}

export default MyApp;
