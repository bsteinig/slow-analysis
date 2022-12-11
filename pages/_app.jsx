import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Slow Analysis</title>
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'dark',
                    fontFamily: 'Open Sans',
                    headings: {
                        fontFamily: 'Manrope',
                    }
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
}
