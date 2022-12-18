import { Anchor, createStyles, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import React from 'react';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] + ' !important',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        borderWidth: '2px !important',
        borderStyle: 'solid !important',
    },
    output: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        minWidth: '75%',
        minHeight: 500,
    },
}));

function Preview({ setComponent, project }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
        <Paper shadow="md" p="md" radius="lg" mt={20} className={classes.root}>
            <Stack spacing={0}>
                <Stack align="flex-start" justify="flex-start" spacing={0} pl={20}>
                    <Title className={classes.title}>Preview</Title>
                    <Text size="sm" color="dimmed">
                        Your project output will be displayed here.{' '}
                        <Anchor component="button" type="button" onClick={() => setComponent('build')}>
                            Start building
                        </Anchor>{' '}
                        to get started.
                    </Text>
                </Stack>
                <DynamicReactJson
                    src={project}
                    iconStyle="triangle"
                    theme={theme.colorScheme === 'dark' ? 'summerfruit' : 'summerfruit:inverted'}
                    style={{ padding: '30px 40px', marginLeft: 20, marginRight: 20, backgroundColor: 'none' }}
                />
            </Stack>
        </Paper>
    );
}

export default Preview;
