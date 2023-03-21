import {
    ActionIcon,
    Anchor,
    Button,
    Chip,
    createStyles,
    Divider,
    Grid,
    Group,
    Kbd,
    Modal,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
} from '@mantine/core';
import { useHotkeys, useListState, useSessionStorage, useToggle } from '@mantine/hooks';
import { IconAlertTriangle, IconRefreshAlert, IconSettings, IconTrash } from '@tabler/icons';
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

function Build({ setComponent, setProject, firstVisit, forceSelection }) {
    const { classes } = useStyles();

    // Accessibility keyboard shortcut
    useHotkeys([['ctrl+shift+K', () => toggleKeyboard()]]);

    // reactour state
    useEffect(() => {
        if (firstVisit) {
            setSubmitted(true);
            setImageURL(
                'https://ourworldindata.org/uploads/2018/11/Annual-World-Population-since-10-thousand-BCE-for-OWID-800x498.png',
            );
            setTitle('My First Project');
            if (slides.length === 0) {
                const sample1selection = {
                    active: true,
                    startX: 0.15,
                    startY: 0.15,
                    endX: 0.75,
                    endY: 0.75,
                };
                const sample1form = {
                    graphicalFeature: 'Sample 1',
                    description: 'This is a sample description',
                };
                const newSlide = {
                    id: slides.length,
                    selection: sample1selection,
                    data: sample1form,
                };
                // append after 1 second
                setTimeout(() => {
                    handlers.append(newSlide);
                }, 1000);
                const sample2selection = {
                    active: true,
                    startX: 0.15,
                    startY: 0.15,
                    endX: 0.75,
                    endY: 0.75,
                };
                const sample2form = {
                    graphicalFeature: 'Sample 2',
                    description: 'This is a sample description',
                };
                const newSlide2 = {
                    id: slides.length,
                    selection: sample2selection,
                    data: sample2form,
                };
                // append after 1 second
                setTimeout(() => {
                    handlers.append(newSlide2);
                }, 2000);
            }
        }
    }, []);

    useEffect(() => {
        if (forceSelection) {
            setSelection({ active: true, startX: 0.15, startY: 0.15, endX: 0.75, endY: 0.75 });
        }
    }, [forceSelection]);

    // Image state
    const [submitted, setSubmitted] = useSessionStorage({ key: 'image-submitted', defaultValue: false });
    const [imageURL, setImageURL] = useSessionStorage({ key: 'image-url', defaultValue: '' });
    const [title, setTitle] = useSessionStorage({ key: 'image-title', defaultValue: '' });
    const [aspectRatio, setAspectRatio] = useState(1.5);

    // Selection state
    const [selection, setSelection] = useState({ active: false, startX: 0, startY: 0, endX: 0, endY: 0 });
    const [keyboardEnabled, toggleKeyboard] = useToggle();

    // Slides state
    const [storeSlides, setStoreSlides] = useSessionStorage({ key: 'slides', defaultValue: [] });
    const [slides, handlers] = useListState([]);
    const [isEditing, setIsEditing] = useState(-1);

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
            if (isEditing !== -1) {
                // We are editing a slide
                handlers.setItemProp(isEditing, 'selection', selection);
                handlers.setItemProp(isEditing, 'data', formSubmission);
                setIsEditing(-1);
            } else {
                // We need to create a new slide
                const newSlide = {
                    id: slides.length,
                    selection: selection,
                    data: formSubmission,
                };
                handlers.append(newSlide);
            }
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
            aspect: aspectRatio,
            title: title,
            slides: slides,
        });
    }, [imageURL, title, slides, aspectRatio]);

    // Edit slide handler
    const handleEditSlide = (slide) => {
        if (isEditing === -1) {
            setIsEditing(slide);
            if (slide != -1) {
                setSelection(slides[slide].selection);
            }
        } else {
            // Cancel Editing
            setIsEditing(-1);
            setSelectionReset(true);
        }
    };

    return (
        <>
            <Modal
                opened={trashOpened}
                onClose={() => setTrashOpened(false)}
                title={
                    <Title order={4} color="red.6">
                        <IconAlertTriangle size={25} stroke={2.25} style={{ transform: 'translate(0,22%)' }} /> Warning!
                    </Title>
                }
                zIndex={1000}
                className="tour__trash-modal"
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
                title={
                    <Title order={4} color="red.6">
                        <IconAlertTriangle size={25} stroke={2.25} style={{ transform: 'translate(0,22%)' }} /> Warning!
                    </Title>
                }
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
            <Modal
                opened={settingsOpened}
                onClose={() => setSettingsOpened(false)}
                title={
                    <Title order={4}>
                        <IconSettings size={20} stroke={2.25} style={{ transform: 'translate(0,22%)' }} /> Project
                        Settings
                    </Title>
                }
                zIndex={1000}
            >
                <Text size="md">Accessibility Settings:</Text>
                <Button
                    variant="light"
                    radius="md"
                    my="md"
                    style={{ width: 'fit-content' }}
                    onClick={() => toggleKeyboard()}
                >
                    {keyboardEnabled ? 'Disable' : 'Enable'} Keyboard Selection
                </Button>
                <Divider />
                <Text size="md" my="md">
                    Edit Title:
                </Text>
                <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
                <Group position="center" mt={20}>
                    <Button variant="outline" onClick={() => setSettingsOpened(false)}>
                        Close
                    </Button>
                </Group>
            </Modal>
            <Paper shadow="md" p="lg" radius="lg" my={20} className={classes.root}>
                <Stack spacing={0}>
                    <Stack align="flex-start" justify="flex-start" spacing={0} pl={20}>
                        <Group>
                            <Title className={classes.title + ' tour__welcome'} data_tut="tour__welcome">
                                Build
                            </Title>
                            <Chip variant="filled" size="xs" checked={keyboardEnabled}>
                                {keyboardEnabled ? 'Keyboard Mode Enabled' : 'Keyboard Mode Disabled'}
                            </Chip>
                        </Group>
                        <Text size="sm" color="dimmed">
                            New here? Check out our{' '}
                            <Anchor component="button" type="button" onClick={() => setComponent('overview')}>
                                quick start guide
                            </Anchor>{' '}
                            to get started.
                        </Text>
                        <Text size="sm" color="dimmed" mt={5}>
                            Enable keyboard selection with {' '}<Kbd>ctrl</Kbd> + <Kbd>shift</Kbd> +<Kbd>k</Kbd>
                        </Text>
                    </Stack>
                    {submitted && (
                        <Group position="apart" my={15} className="tour__titlegroup">
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
                                            className="tour__project-settings"
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
                                            className="tour__project-restart"
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
                                            label="Trash Project"
                                            className="tour__project-trash"
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
                            isEditing={isEditing}
                            setAspectRatio={setAspectRatio}
                        />
                        <CardForm
                            selection={selection}
                            setFormSubmission={setFormSubmission}
                            isEditing={isEditing}
                            slides={slides}
                        />
                        <DragnDrop
                            slides={slides}
                            handlers={handlers}
                            handleEditSlide={handleEditSlide}
                            isEditing={isEditing}
                            keyboardEnabled={keyboardEnabled}
                        />
                    </Grid>
                ) : (
                    <Form setImageURL={setImageURL} setSubmitted={setSubmitted} setTitle={setTitle} />
                )}
            </Paper>
        </>
    );
}

Build.defaultProps = {
    setComponent: () => {},
    setProject: () => {},
    firstVisit: false,
    forceSelection: false,
};

export default Build;
