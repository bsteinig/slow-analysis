import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Build from './Build';
import { Container, Space, Text, Title, useMantineTheme } from '@mantine/core';

const Tour = dynamic(() => import('reactour'), { ssr: false });

function TourWrapper({ setComponent, setProject }) {
    const theme = useMantineTheme();

    const [isTourOpen, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const closeTour = () => {
        setOpen(false);
    };

    const openTour = () => {
        handleClickOpen(true);
        setOpen(true);
    };

    const tourConfig = [
        {
            selector: '[data-tut="reactour__overview"]',
            content: () => (
                <Container>
                    <Title order={3}>Overview</Title>
                    <Text>
                        Slow analysis is the process of analyzing a data visualization, such as a chart or graph, in a
                        step by step manner. By breaking down each component of the visualization, you can better
                        understand the data and how it is being presented.
                        <Space h={6} />
                        This tool assists in the process of taking an exisitng visualization and breaking it down into
                        its component parts. The output of this tool is a set of slides that can be used to create a
                        presentation or a report called a &quot;Slow Reveal&quot;.
                    </Text>
                </Container>
            ),
        },
        {
            selector: '[data-tut="reactour__build"]',
            content: () => (
                <div>
                    <h3>Build</h3>
                    <p>
                        This is the build page. Here you can build your project. You can add slides, change the
                        background color, and change the font.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <>
            <Build setComponent={setComponent} setProject={setProject} />
            <Tour
                onRequestClose={closeTour}
                disableInteraction={false}
                steps={tourConfig}
                isOpen={isTourOpen}
                rounded={5}
                accentColor={theme.colors.blue[6]}
            />
        </>
    );
}

export default TourWrapper;
