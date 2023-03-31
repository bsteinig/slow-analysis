import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Build from './Build';
import { Button, Center, Container, Space, Text, Title, useMantineTheme } from '@mantine/core';

const Tour = dynamic(() => import('reactour'), { ssr: false });

function TourWrapper({ setComponent, setProject, setFirstVisit, isTourOpen, setOpen, setLastStep, lastStep }) {
    const theme = useMantineTheme();

    // see handleCurr for explanation
    const [cur, setCurr] = useState(0);
    const [force, setForce] = useState(false);

    const closeTour = () => {
        console.log('tour closed', cur);
        setOpen(false);
        setFirstVisit(false);
        setLastStep(cur === tourConfig.length - 1 ? 0 : cur);
    };

    // This is a hack to force the Build component to automatically create a selection during the tour
    const handleCurr = (curr) => {
        setCurr(curr);
        if (curr === 7) {
            // force selection
            setForce(true);
            console.log('force selection');
        } else {
            setForce(false);
        }
    };  

    // react tour config
    const tourConfig = [
        {
            selector: '.tour__welcome',
            content: () => (
                <Container>
                    <Title order={3}>Welcome!</Title>
                    <Text>
                        This is the build page which assists in the process of taking an exisitng visualization and
                        breaking it down into its component parts. The output of this tool is a set of slides that can
                        be used to create a presentation or a report called a &quot;Slow Reveal&quot;.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__titlegroup',
            content: () => (
                <Container>
                    <Title order={3}>Project Overview</Title>
                    <Text>
                        This section contains the title of your project and project level settings. These settings will
                        affect your entire project.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__project-settings',
            content: () => (
                <Container>
                    <Title order={3}>Project Settings</Title>
                    <Text>
                        This button opens the project level settings, here you can change the title of your project,
                        enable keyboard controls for selections, and restart this tour.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__project-restart',
            content: () => (
                <Container>
                    <Title order={3}>Project Restart</Title>
                    <Text>
                        This button clears any created slides and resets the project to its original state. The image
                        and project title will remain the same.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__project-trash',
            content: () => (
                <Container>
                    <Title order={3}>Project Trash</Title>
                    <Text>
                        This button completely deletes the project and returns you initial build menu. This action
                        cannot be reversed.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__imageviewer',
            content: () => (
                <Container>
                    <Title order={3}>Image Viewer</Title>
                    <Text>
                        This section contains the image you are working with and the component selection tools. To
                        create a new selection just click and drag over the image.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__image-settings',
            content: () => (
                <Container>
                    <Title order={3}>Image Settings</Title>
                    <Text>
                        These buttons control the image level settings. Here you can toggle viewing the image without
                        overlay, locking your selection, and resetting the selection.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__cardform',
            content: () => (
                <Container>
                    <Title order={3}>Card Form</Title>
                    <Text>
                        This section contains the form for creating a new slide. The form is broken into two sections,
                        the graphical feature, which is the title for that slide, and the description.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__dragdrop',
            content: () => (
                <Container>
                    <Title order={3}>Slides Viewer</Title>
                    <Text>
                        This section contains the slides you have created. You can drag and drop the slides to reorder,
                        or use the pencil icon to edit the slide. Slides can also be deleted by clicking the trash icon,
                        note: this is an irreversible action.
                    </Text>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
        {
            selector: '.tour__overview',
            content: () => (
                <Container>
                    <Title order={3}>Get Started!</Title>
                    <Text>
                        Now that you have completed the tour, by clicking the button below. You can always revisit this
                        tour by clicking the &quot;Help&quot; button on the Overview tab.
                    </Text>
                    <Space h="md" />
                    <Center>
                        <Button onClick={closeTour} color="blue">
                            Start Building
                        </Button>
                    </Center>
                </Container>
            ),
            style: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            }
        },
    ];

    return (
        <>
            <Build setComponent={setComponent} setProject={setProject} firstVisit={true} forceSelection={force} />
            <Tour
                onRequestClose={(curr) => closeTour(curr)}
                disableInteraction={false}
                steps={tourConfig}
                isOpen={isTourOpen}
                rounded={8}
                accentColor={theme.colors.blue[6]}
                getCurrentStep={(curr) => handleCurr(curr)}
                closeWithMask={false}
                startAt={lastStep}
            />
        </>
    );
}

export default TourWrapper;
