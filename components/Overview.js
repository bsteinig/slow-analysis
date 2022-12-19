import { createStyles, Flex, Group, Paper, Space, Stack, Text, Timeline, Title } from '@mantine/core';
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots } from '@tabler/icons';
import React from 'react';

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
}));

function Overview() {
    const { classes } = useStyles();

    return (
        <Paper shadow="md" p="lg" radius="lg" my={20} className={classes.root}>
            <Title className={classes.title}>Overview</Title>
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
                            height="315"
                            className={classes.video}
                            src="https://www.youtube-nocookie.com/embed/xuCn8ux2gbs"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </Stack>
                <Paper p='md' radius='md'  className={classes.section}>
                    <Timeline active={1} bulletSize={24} lineWidth={2}>
                        <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
                            <Text color="dimmed" size="sm">
                                You&apos;ve created new branch{' '}
                                <Text variant="link" component="span" inherit>
                                    fix-notifications
                                </Text>{' '}
                                from master
                            </Text>
                            <Text size="xs" mt={4}>
                                2 hours ago
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
                            <Text color="dimmed" size="sm">
                                You&apos;ve pushed 23 commits to
                                <Text variant="link" component="span" inherit>
                                    fix-notifications branch
                                </Text>
                            </Text>
                            <Text size="xs" mt={4}>
                                52 minutes ago
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item
                            title="Pull request"
                            bullet={<IconGitPullRequest size={12} />}
                            lineVariant="dashed"
                        >
                            <Text color="dimmed" size="sm">
                                You&apos;ve submitted a pull request
                                <Text variant="link" component="span" inherit>
                                    Fix incorrect notification message (#187)
                                </Text>
                            </Text>
                            <Text size="xs" mt={4}>
                                34 minutes ago
                            </Text>
                        </Timeline.Item>

                        <Timeline.Item title="Code review" bullet={<IconMessageDots size={12} />}>
                            <Text color="dimmed" size="sm">
                                <Text variant="link" component="span" inherit>
                                    Robert Gluesticker
                                </Text>{' '}
                                left a code review on your pull request
                            </Text>
                            <Text size="xs" mt={4}>
                                12 minutes ago
                            </Text>
                        </Timeline.Item>
                    </Timeline>
                </Paper>
            </Flex>
        </Paper>
    );
}

export default Overview;
