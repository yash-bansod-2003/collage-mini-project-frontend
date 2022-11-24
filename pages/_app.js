import '../styles/globals.css';
import { Navbar, Footer } from '../components';
import { SessionProvider } from 'next-auth/react';
import store from '../redux/store';
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </Provider>
        </SessionProvider>
    );
}

export default MyApp;
