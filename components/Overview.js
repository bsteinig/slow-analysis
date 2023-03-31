import { Button, createStyles, Flex, Group, Paper, Space, Stack, Text, Timeline, Title } from '@mantine/core';
import { IconArrowsSort, IconChartAreaLine, IconCrane, IconEdit, IconFileExport, IconFilePlus, IconMessageDots, IconSchool, IconSlideshow, IconTrash } from '@tabler/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] + ' !important',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        borderWidth: '2px !important',
        borderStyle: 'solid !important',
    },
    videoWrapper: {
        position: 'relative',
        paddingBottom: '56.25%',
        /* 16:9 */
        paddingTop: 25,
        height: 0,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    section: {
        width: '50%',

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: '100%',
        },
    },
    timelineTitle: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        fontWeight: 600,
    },
    inline: {
        fontSize: 16,
        cursor: 'pointer',
        color: theme.colors.blue[5],
    }
}));

function Overview({ setComponent, lastStep, setFirstVisit, firstVisit, setOpen }) {
    const { classes } = useStyles();

    // timeStamps are the time in seconds for each step of the video
    //NOTE - The original intention was to use these to sync the Timeline with the video, 
    // but this wasn't possible due to issues with Iframe and React
    const timeStamps = [0, 18, 36, 51, 61, 79];

    const handleTour = () => {
        setFirstVisit(true);
        setOpen(true);
        setComponent('build');
    };

    return (
        <Paper shadow="md" p="lg" radius="lg" my={20} className={classes.root}>
            <Group position="apart">
                <Title className={classes.title}>Overview</Title>
                {!firstVisit && (
                    <Button onClick={() => handleTour()}>{lastStep === 0 ? 'Restart' : 'Resume'} Tour</Button>
                )}
            </Group>
            <Flex mt={10} gap={0} justify="flex-start" align="flex-start" direction="row" wrap="wrap">
                <Stack className={classes.section} p="sm">
                    <Text size="md" mb={20}>
                        Slow analysis is the process of analyzing a data visualization, such as a chart or graph, in a
                        step by step manner. By breaking down each component of the visualization, you can better
                        understand the data and how it is being presented.
                        <Space h={6} />
                        This tool assists in the process of taking an exisitng visualization and breaking it down into
                        its component parts. The output of this tool is a set of slides that can be used to create a
                        presentation or a report called a &quot;Slow Reveal&quot;.
                    </Text>
                    <div className={classes.videoWrapper}>
                        <iframe
                            width="560"
                            height="200"
                            className={classes.video}
                            id="ytplayer"
                            src="https://www.youtube-nocookie.com/embed/usImb5pPOgY"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        />
                    </div>
                </Stack>
                <Paper p="md" radius="md" className={classes.section}>
                    <Timeline active={5} bulletSize={30} lineWidth={6}>
                        <Timeline.Item
                            bullet={<IconFilePlus size={20} />}
                            title={<Text className={classes.timelineTitle}>New Project</Text>}
                        >
                            <Text color="dimmed" size="sm">
                                Create a new project on the&nbsp;
                                <Text className={classes.inline} variant="link" component="span" onClick={() => setComponent('build')} inherit>
                                    <IconCrane size={18} style={{ transform: 'translate(0,15%)'}} />{' '}
                                    build page
                                </Text>{' '}
                                by uploading an image and following the setup directions.
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item
                            bullet={<IconSlideshow size={20} />}
                            title={<Text className={classes.timelineTitle}>Add Slides</Text>}
                        >
                            <Text color="dimmed" size="sm">
                                Create new slides, start by clicking and dragging on the image to select an area, then
                                complete the form to add the slide.
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item
                            title={<Text className={classes.timelineTitle}>Edit Slides</Text>}
                            bullet={<IconEdit size={20} />}
                            lineVariant="dashed"
                        >
                            <Text color="dimmed" size="sm">
                                Edit a slide, by clicking on the pencil icon for that slide in the list on the bottom.
                                You can change the title, description, or make a new selection.
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item
                            title={<Text className={classes.timelineTitle}>Rearrange Slides</Text>}
                            bullet={<IconArrowsSort size={20} />}
                            lineVariant="dashed"
                        >
                            <Text color="dimmed" size="sm">
                                Rearrange slides, by clicking and dragging the slide in the list on the bottom using the
                                handles.
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item
                            title={<Text className={classes.timelineTitle}>Delete Slides</Text>}
                            bullet={<IconTrash size={20} />}
                        >
                            <Text color="dimmed" size="sm">
                                Delete a slide, by clicking on the trash can icon for that slide in the list on the
                                bottom.
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item
                            title={<Text className={classes.timelineTitle}>Publish Project</Text>}
                            bullet={<IconFileExport size={20} />}
                        >
                            <Text color="dimmed" size="sm">
                                Check out your project on the&nbsp;{' '}
                                <Text className={classes.inline} variant="link" component="span" onClick={() => setComponent('preview')} inherit>
                                    <IconChartAreaLine size={18} style={{ transform: 'translate(0,22%)'}} />{' '}
                                    preview page
                                </Text>
                                . When you&apos;re happy with your project you can copy the embed code and paste it into
                                your website.
                            </Text>
                        </Timeline.Item>
                    </Timeline>
                </Paper>
            </Flex>
        </Paper>
    );
}

export default Overview;
