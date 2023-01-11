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
import { useListState, useSessionStorage, useToggle } from '@mantine/hooks';
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
}));

function Build({ setComponent, setProject }) {
    const { classes } = useStyles();

    // Image state
    const [submitted, setSubmitted] = useSessionStorage({ key: 'image-submitted', defaultValue: false });
    const [imageURL, setImageURL] = useSessionStorage({ key: 'image-url', defaultValue: '' });
    const [title, setTitle] = useSessionStorage({ key: 'image-title', defaultValue: '' });

    // Selection state
    const [selection, setSelection] = useState({ active: false, startX: 0, startY: 0, endX: 0, endY: 0 });
    const [keyboardEnabled, toggleKeyboard] = useToggle();

    // Slides state
    const [storeSlides, setStoreSlides] = useSessionStorage({ key: 'slides', defaultValue: [] });
    const [slides, handlers] = useListState([]);

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
        setTitle('');
        setSelection({ active: false, startX: 0, startY: 0, endX: 0, endY: 0 });
        handlers.setState([]);
        setStoreSlides([]);
        setTrashOpened(false);
    };

    const handleProjectRestart = () => {
        setSelection({ active: false, startX: 0, startY: 0, endX: 0, endY: 0 });
        handlers.setState([]);
        setStoreSlides([]);
        setRestartOpened(false);
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
            handlers.append(newSlide);
            setSelectionReset(true);
            setFormSubmission({});
        }
    }, [formSubmission]);

    // Storage handlers
    useEffect(() => {
        if (slides.length === 0) return;
        //console.log('storing slides', slides);
        setStoreSlides(slides);
    }, [slides]);

    // Only retrieve slides from storage on load
    useEffect(() => {
        if (storeSlides != slides) {
            //console.log('retrieving slides from storage', storeSlides);
            handlers.setState(storeSlides);
        }
    }, [storeSlides]);

    // Project handler
    useEffect(() => {
        setProject({
            image: imageURL,
            title: title,
            slides: slides,
        });
    }, [imageURL, title, slides]);

    return (
        <>
            <Modal
                opened={trashOpened}
                onClose={() => setTrashOpened(false)}
                title="Warning! Deleting Project"
                zIndex={1000}
            >
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
            <Modal
                opened={restartOpened}
                onClose={() => setRestartOpened(false)}
                title="Warning! Restarting Project"
                zIndex={1000}
            >
                <Text size="sm" color="dimmed">
                    By continuing you will be deleting all slides and selections. This action cannot be undone.
                </Text>
                <Group position="center" mt={20}>
                    <Button variant="outline" onClick={() => setRestartOpened(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" color="red" onClick={() => handleProjectRestart()}>
                        Restart
                    </Button>
                </Group>
            </Modal>
            <Modal opened={settingsOpened} onClose={() => setSettingsOpened(false)} title="Settings" zIndex={1000}>
                <Button
                    variant="light"
                    radius="md"
                    style={{ width: 'fit-content' }}
                    onClick={() => toggleKeyboard()}
                >
                    {keyboardEnabled ? 'Disable' : 'Enable'} Keyboard Selection
                </Button>
                <Group position="center" mt={20}>
                    <Button variant="outline" onClick={() => setSettingsOpened(false)}>
                        Close
                    </Button>
                </Group>
            </Modal>
            <Paper shadow="md" p="lg" radius="lg" my={20} className={classes.root}>
                <Stack spacing={0}>
                    <Stack align="flex-start" justify="flex-start" spacing={0} pl={20}>
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
                        <Group position="apart" my={15}>
                            {submitted && <Title>{title}</Title>}
                            <Stack align="flex-start" justify="flex-start" spacing={3} pr="lg">
                                <Text size="sm" color="dimmed">
                                    Project Actions:
                                </Text>
                                <Group position="left">
                                    <Tooltip
                                        label="Project Settings"
                                        events={{ hover: true, focus: true, touch: false }}
                                    >
                                        <ActionIcon
                                            size="lg"
                                            radius="md"
                                            variant="filled"
                                            label="Project Settings"
                                            onClick={() => setSettingsOpened(true)}
                                        >
                                            <IconSettings size={25} />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip
                                        label="Restart Project"
                                        events={{ hover: true, focus: true, touch: false }}
                                    >
                                        <ActionIcon
                                            size="lg"
                                            radius="md"
                                            color="yellow"
                                            variant="filled"
                                            label="Restart Project"
                                            onClick={() => setRestartOpened(true)}
                                        >
                                            <IconRefreshAlert size={25} />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label="Trash Project" events={{ hover: true, focus: true, touch: false }}>
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
                        </Group>
                    )}
                </Stack>
                {submitted ? (
                    <Grid grow gutter="xs">
                        <ImageViewer
                            selection={selection}
                            setSelection={setSelection}
                            imageURL={imageURL}
                            selectionReset={selectionReset}
                            setSelectionReset={setSelectionReset}
                            keyboardEnabled={keyboardEnabled}
                            toggleKeyboard={toggleKeyboard}
                        />
                        <CardForm selection={selection} setFormSubmission={setFormSubmission} />
                        <DragnDrop slides={slides} handlers={handlers} />
                    </Grid>
                ) : (
                    <Form setImageURL={setImageURL} setSubmitted={setSubmitted} setTitle={setTitle} />
                )}
            </Paper>
        </>
    );
}

export default Build;
