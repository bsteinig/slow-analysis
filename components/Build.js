import {
    ActionIcon,
    Anchor,
    Button,
    createStyles,
    Grid,
    Group,
    Modal,
    Paper,
    Stack,
    Text,
    Title,
    Tooltip,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconAdjustments, IconRefresh, IconSettings, IconTrash } from '@tabler/icons';
import React, { useState } from 'react';
import CardForm from './build_dependencies/CardForm';
import DragnDrop from './build_dependencies/DragnDrop';
import Form from './build_dependencies/Form';
import ImageViewer from './build_dependencies/ImageViewer';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] + ' !important',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        borderWidth: '2px !important',
        borderStyle: 'solid !important',
    },
    title: {
        color: theme.colorScheme === 'dark' ? theme.colors.teal[4] : theme.colors.teal[8],
    },
}));

function Build({ setComponent }) {
    const { classes } = useStyles();

    // Form state
    const [submitted, setSubmitted] = useLocalStorage({ key: 'image-submitted', defaultValue: false });
    const [imageURL, setImageURL] = useLocalStorage({ key: 'image-url', defaultValue: '' });

    // Selection state
    const [selection, setSelection] = useState({ active: true, x: 0, y: 0, width: 0, height: 0 });

    // Slides state
    const [slides, setSlides] = useState([]);

    // Modals State
    const [restartOpened, setRestartOpened] = useState(false);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [trashOpened, setTrashOpened] = useState(false);

    const handleProjectDelete = () => {
        setSubmitted(false);
        setImageURL('');
        setSelection({ active: true, x: 0, y: 0, width: 0, height: 0 });
        setSlides([]);
        setTrashOpened(false);
    };

    return (
        <>
            <Modal opened={trashOpened} onClose={() => setTrashOpened(false)} title="Warning! Deleting Project">
                <Text size="sm" color="dimmed">
                    By continuing you will be deleting the current project. This action cannot be undone.
                </Text>
                <Group position="center" mt={20}>
                    <Button variant="outline" onClick={() => setTrashOpened(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" color="red" onClick={() => handleProjectDelete()}>
                        Delete
                    </Button>
                </Group>
            </Modal>
            <Paper shadow="md" p="lg" radius="lg" mt={20} className={classes.root}>
                <Group position="apart">
                    <Stack align="flex-start" justify="flex-start" spacing={0} mb={30} pl={20}>
                        <Title className={classes.title}>Build</Title>
                        <Text size="sm" color="dimmed">
                            New here? Check out our{' '}
                            <Anchor component="button" type="button" onClick={() => setComponent('overview')}>
                                quick start guide
                            </Anchor>{' '}
                            to get started.
                        </Text>
                    </Stack>
                    {submitted && (
                        <Group p="md">
                            <Tooltip label="Settings">
                                <ActionIcon size="lg" radius="md" variant="filled" label="Settings">
                                    <IconSettings size={25} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Restart">
                                <ActionIcon size="lg" radius="md" color="yellow" variant="filled" label="Restart">
                                    <IconRefresh size={25} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Trash and Reset">
                                <ActionIcon
                                    size="lg"
                                    radius="md"
                                    color="red"
                                    variant="filled"
                                    label="Trash & Reset"
                                    onClick={() => setTrashOpened(true)}
                                >
                                    <IconTrash size={25} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    )}
                </Group>
                {submitted ? (
                    <Grid grow gutter="xs">
                        <ImageViewer selection={selection} setSelection={setSelection} imageURL={imageURL} />
                        <CardForm selection={selection} setSlides={setSlides} />
                        <DragnDrop slides={slides} />
                    </Grid>
                ) : (
                    <Form setImageURL={setImageURL} setSubmitted={setSubmitted} />
                )}
            </Paper>
        </>
    );
}

export default Build;
