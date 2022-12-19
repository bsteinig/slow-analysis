import {
    Anchor,
    Button,
    Center,
    Collapse,
    Container,
    createStyles,
    Group,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
    Tooltip,
    useMantineTheme,
} from '@mantine/core';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] + ' !important',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        borderWidth: '2px !important',
        borderStyle: 'solid !important',
    },
    output: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        minWidth: '95%',
        minHeight: 500,
        borderRadius: theme.radius.lg,
        display: 'flex',
        padding: theme.spacing.sm,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}));

function Preview({ setComponent, project }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const [showSource, setShowSource] = useState(false);

    return (
        <Paper shadow="md" p="md" radius="lg" mt={20} className={classes.root}>
            <Stack spacing={0}>
                <Stack align="flex-start" justify="flex-start" spacing={0} mb={10} pl={20}>
                    <Title className={classes.title}>Preview</Title>
                    <Text size="sm" color="dimmed">
                        Your project output will be displayed here.{' '}
                        <Anchor component="button" type="button" onClick={() => setComponent('build')}>
                            Start building
                        </Anchor>{' '}
                        to get started.
                    </Text>
                </Stack>
                <Container my={10} className={classes.output}>
                    <Skeleton animate={false} height={400} width="50%" />
                    <div style={{ width: '45%' }}>
                        <Center style={{ flexDirection: 'column' }}>
                            <Skeleton animate={false} height={28} mb={24} width="80%" radius="xl" />
                            <Skeleton animate={false} height={20} mb={16} width="50%" radius="xl" />
                        </Center>
                        {[...Array(9)].map((x, i) => (
                            <Skeleton
                                key={i}
                                animate={false}
                                height={12}
                                mb={i == 8 ? 48 : 8}
                                width={i == 8 ? '60%' : '100%'}
                                radius="xl"
                            />
                        ))}
                        <Group position="center">
                            <Skeleton animate={false} height={30} mr={10} mb={8} width="30%" radius="xl" />
                            <Skeleton animate={false} height={30} ml={10} mb={8} width="30%" radius="xl" />
                        </Group>
                    </div>
                </Container>
                <Paper shadow="md" p="md" radius="lg" mt={20} mx={20} className={classes.toolbar}>
                    <Stack direction="row" align="flex-start" justify="space-between" spacing="md">
                        <Text size="md" weight={500}>
                            Choose an export option below to save your project, or view the source code.
                        </Text>
                        <Group>
                            <Tooltip
                                multiline
                                width={220}
                                withArrow
                                transition="fade"
                                transitionDuration={200}
                                label="Use this option to create an HTML file that you can embed in your website. This option is recommended if you want to use your project in a website."
                            >
                                <Button radius="md">Copy HTML Embed</Button>
                            </Tooltip>
                            <Tooltip
                                multiline
                                width={220}
                                withArrow
                                transition="fade"
                                transitionDuration={200}
                                label="Use this option to create an HTML file that you can use to create a standalone application. This option is recommended if you want to use your project offline."
                            >
                                <Button radius="md">Copy HTML Canvas</Button>
                            </Tooltip>
                            <Button color="teal" radius="md" onClick={() => setShowSource(!showSource)}>
                                View Source Code
                            </Button>
                        </Group>
                    </Stack>
                </Paper>
                <Collapse in={showSource} transitionDuration={200}>
                <DynamicReactJson
                    src={project}
                    iconStyle="triangle"
                    theme={theme.colorScheme === 'dark' ? 'summerfruit' : 'summerfruit:inverted'}
                    style={{ padding: '30px 40px', marginLeft: 20, marginRight: 20, backgroundColor: 'none' }}
                />
                </Collapse>
            </Stack>
        </Paper>
    );
}

export default Preview;
