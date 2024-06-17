import { Providers } from '@/providers';

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
}

export default MyApp;