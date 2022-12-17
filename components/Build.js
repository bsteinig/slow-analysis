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
import { IconRefreshAlert, IconSettings, IconTrash } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
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

    // Image state
    const [submitted, setSubmitted] = useLocalStorage({ key: 'image-submitted', defaultValue: false });
    const [imageURL, setImageURL] = useLocalStorage({ key: 'image-url', defaultValue: '' });

    // Selection state
    const [selection, setSelection] = useState({ active: false, startX: 0, startY: 0, endX: 0, endY: 0 });

    // Slides state
    const [slides, setSlides] = useState([]);

    // Form state
    const [formSubmission, setFormSubmission] = useState({});
    const [selectionReset, setSelectionReset] = useState(false);

    // Modals State
    const [restartOpened, setRestartOpened] = useState(false);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [trashOpened, setTrashOpened] = useState(false);

    // Modal handlers
    const handleProjectDelete = () => {
        setSubmitted(false);
        setImageURL('');
        setSelection({ active: false, startX: 0, startY: 0, endX: 0, endY: 0 });
        setSlides([]);
        setTrashOpened(false);
    };

    // Form handlers
    useEffect(() => {
        console.log('formSubmission', formSubmission);
        if (selection.active && Object.keys(formSubmission).length > 0) {
            // We have received a form submission and a selection is active
            // We need to create a new slide
            const newSlide = {
                id: slides.length,
                selection: selection,
                data: formSubmission,
            };
            setSlides([...slides, newSlide]);
            setSelectionReset(true);
            setFormSubmission({});
        }
    }, [formSubmission]);

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
                        <Stack align="flex-start" justify="flex-start" spacing={3} pr="lg">
                            <Text size="sm" color="dimmed">
                                Project Actions:
                            </Text>
                            <Group position="left">
                                <Tooltip label="Project Settings">
                                    <ActionIcon size="lg" radius="md" variant="filled" label="Project Settings">
                                        <IconSettings size={25} />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Restart Project">
                                    <ActionIcon
                                        size="lg"
                                        radius="md"
                                        color="yellow"
                                        variant="filled"
                                        label="Restart Project"
                                    >
                                        <IconRefreshAlert size={25} />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Trash Project">
                                    <ActionIcon
                                        size="lg"
                                        radius="md"
                                        color="red"
                                        variant="filled"
                                        label="Trash Projec"
                                        onClick={() => setTrashOpened(true)}
                                    >
                                        <IconTrash size={25} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Stack>
                    )}
                </Group>
                {submitted ? (
                    <Grid grow gutter="xs">
                        <ImageViewer selection={selection} setSelection={setSelection} imageURL={imageURL} selectionReset={selectionReset} setSelectionReset={setSelectionReset} />
                        <CardForm selection={selection} setSlides={setSlides} setFormSubmission={setFormSubmission} />
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
