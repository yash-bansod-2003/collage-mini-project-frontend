import '../styles/globals.css';
import { Navbar, Footer } from '../components';
import { SessionProvider } from 'next-auth/react';
import store from '../redux/store';
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </SessionProvider>
        </Provider>
    );
}

export default MyApp;
