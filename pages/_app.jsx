import Head from 'next/head';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';

export default function App(props) {
    const { Component, pageProps } = props;

    const [colorScheme, setColorScheme] = useState('light');
    const toggleColorScheme = (value) => {setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')); console.log(colorScheme);};

    return (
        <>
            <Head>
                <title>Slow Analysis</title>
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            </Head>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: colorScheme,
                    fontFamily: 'Open Sans',
                    headings: {
                        fontFamily: 'Manrope',
                    },
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}
