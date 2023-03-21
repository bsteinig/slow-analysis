import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Code,
    Collapse,
    Container,
    createStyles,
    Grid,
    Group,
    Image,
    Kbd,
    Overlay,
    Paper,
    Space,
    Stack,
    Text,
    Title,
    Tooltip,
} from '@mantine/core';
import { useElementSize, useFocusTrap, useMergedRef, useMouse, useMove, useToggle } from '@mantine/hooks';
import {
    IconArrowsMaximize,
    IconArrowsMove,
    IconEye,
    IconEyeOff,
    IconLock,
    IconLockOpen,
    IconRefresh,
    IconReportAnalytics,
    IconSlashes,
} from '@tabler/icons';
import React, { useState, useEffect } from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        minHeight: 400,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
        borderStyle: 'solid',
        borderWidth: 1,
    },
    imageContainer: {
        position: 'relative',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlight: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        zIndex: 10,
    },
    image: {
        width: '100%',
        objectFit: 'contain',

        '& > img': {
            width: '100%',
            maxHeight: '400px',
            objectFit: 'contain',
        },
    },
}));

/*
    This component is responsible for displaying the image that the user has uploaded.
    It is a child component of the Build component.
*/
function ImageViewer({
    imageURL,
    selection,
    setSelection,
    selectionReset,
    setSelectionReset,
    keyboardEnabled,
    isEditing,
    setAspectRatio,
}) {
    const { classes, theme } = useStyles();

    // Get intrinsic image size and calculate aspect ratio
    const [imageSize, setImageSize] = useState({ width: 0, height: 0, aspectRatio: 1.6 });

    const handleImageLoad = (e) => {
        setImageSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
            aspectRatio: e.target.naturalWidth / e.target.naturalHeight,
        });
        setAspectRatio(e.target.naturalWidth / e.target.naturalHeight);
    };

    // Lock,View, and Stats state
    const [locked, toggleLock] = useToggle();
    const [view, toggleView] = useToggle();
    const [collapsed, toggleCollapsed] = useToggle();

    // Mouse Selection state
    const [startValue, setStartValue] = useState({ x: 0, y: 0 });
    const [value, setValue] = useState({ x: 0, y: 0 });
    const { ref: sizeRef, width, height } = useElementSize();
    const { ref: moveRef, active } = useMove(setValue);
    const { ref: mouseRef, x: mouseX, y: mouseY } = useMouse();
    const mergedRef = useMergedRef(mouseRef, moveRef, sizeRef);

    //SECTION Keyboard selection state
    const [keyboardSelection, setKeyboardSelection] = useState({
        startX: 0.05,
        startY: 0.05,
        endX: 0.15,
        endY: 0.15,
    });
    // These contorl whether one of the resizing methods is active
    const [keyboardMove, toggleKeyboardMove] = useToggle();
    const [keyboardResize, toggleKeyboardResize] = useToggle();
    // This is the component specific control for whether a selection is active
    const [keyboardActive, toggleKeyboardActive] = useToggle();
    const toggleKeyboardSelection = () => {
        if (keyboardActive) {
            setSelection({
                startX: keyboardSelection.startX,
                startY: keyboardSelection.startY,
                endX: keyboardSelection.endX,
                endY: keyboardSelection.endY,
                active: true,
            });
        } else {
            setSelection({
                startX: keyboardSelection.startX,
                startY: keyboardSelection.startY,
                endX: keyboardSelection.endX,
                endY: keyboardSelection.endY,
                active: false,
            });
        }
        toggleKeyboardActive();
    };

    const focusTrapRef = useFocusTrap(keyboardActive);

    //SECTION Keyboard Selection Handlers
    //NOTE: Keyboard Move handler
    // When keyboardMove becomes true create an event listener for arrow key presses and move the selection box accordingly
    // When keyboardMove becomes false remove the event listener and update selection
    useEffect(() => {
        if (keyboardMove) {
            const handleKeyDown = (e) => {
                e.preventDefault();
                if (e.key === 'ArrowUp') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            startY: Math.max(0, prev.startY - 0.01),
                            endY: prev.startY === 0 ? prev.endY : prev.endY - 0.01,
                        };
                    });
                } else if (e.key === 'ArrowDown') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            startY: prev.endY === 1 ? prev.startY : prev.startY + 0.01,
                            endY: Math.min(1, prev.endY + 0.01),
                        };
                    });
                } else if (e.key === 'ArrowLeft') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            startX: prev.startX - 0.01,
                            endX: prev.endX - 0.01,
                        };
                    });
                } else if (e.key === 'ArrowRight') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            startX: prev.startX + 0.01,
                            endX: prev.endX + 0.01,
                        };
                    });
                } else if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Space') {
                    toggleKeyboardMove();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            if (keyboardEnabled) {
                setSelection({
                    startX: keyboardSelection.startX,
                    startY: keyboardSelection.startY,
                    endX: keyboardSelection.endX,
                    endY: keyboardSelection.endY,
                });
            }
        }
    }, [keyboardMove]);

    //NOTE: Keyboard Resize handler
    // When keyboardResize becomes true create an event listener for arrow key presses and resize the selection box accordingly
    // When keyboardResize becomes false remove the event listener and update selection
    useEffect(() => {
        if (keyboardResize) {
            const handleKeyDown = (e) => {
                e.preventDefault();
                if (e.key === 'ArrowUp') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            endY: Math.max(prev.startY, prev.endY - 0.01),
                        };
                    });
                } else if (e.key === 'ArrowDown') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            endY: Math.min(1, prev.endY + 0.01),
                        };
                    });
                } else if (e.key === 'ArrowLeft') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            endX: Math.max(prev.startX, prev.endX - 0.01),
                        };
                    });
                } else if (e.key === 'ArrowRight') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            endX: Math.min(1, prev.endX + 0.01),
                        };
                    });
                } else if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Space') {
                    toggleKeyboardResize();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            if (keyboardEnabled) {
                setSelection({
                    startX: keyboardSelection.startX,
                    startY: keyboardSelection.startY,
                    endX: keyboardSelection.endX,
                    endY: keyboardSelection.endY,
                });
            }
        }
    }, [keyboardResize]);
    //!SECTION
    //!SECTION

    //SECTION Mouse selection
    useEffect(() => {
        if (!keyboardEnabled && !locked) {
            if (active) {
                setSelection({
                    active: false,
                    startX: 0,
                    startY: 0,
                    endX: 0,
                    endY: 0,
                });
            } else {
                if (value.x === 0 && value.y === 0 && startValue.x === 0 && startValue.y === 0) {
                    return;
                } else {
                    setSelection({
                        active: true,
                        startX: startValue.x,
                        startY: startValue.y,
                        endX: value.x,
                        endY: value.y,
                    });
                }
            }
        }
    }, [active]);

    useEffect(() => {
        if (isEditing !== -1) {
            setStartValue({ x: selection.startX, y: selection.startY });
            setValue({ x: selection.endX, y: selection.endY });
        }
    }, [isEditing]);
    //!SECTION

    // SECTION: Selection reset handlers for both keyboard and mouse
    const resetSelection = () => {
        setSelection({ startX: 0, startY: 0, endX: 0, endY: 0, active: false });
        if (keyboardEnabled) {
            setKeyboardSelection({
                startX: 0.05,
                startY: 0.05,
                endX: 0.15,
                endY: 0.15,
            });
        } else {
            setStartValue({ x: 0, y: 0 });
            setValue({ x: 0, y: 0 });
        }
        if (locked) {
            toggleLock();
        }
    };

    useEffect(() => {
        if (selectionReset) {
            resetSelection();
            setSelectionReset(false);
        }
    }, [selectionReset]);
    //!SECTION

    //SECTION: Clip Path Generator
    const generateClipPath = () => {
        // NOTE: This function generates a clip path string based on startValue and value
        var sx, sy, ex, ey;
        if (startValue.x < value.x) {
            sx = startValue.x;
            ex = value.x;
            if (startValue.y < value.y) {
                sy = startValue.y;
                ey = value.y;
            } else {
                sy = value.y;
                ey = startValue.y;
            }
        } else {
            sx = value.x;
            ex = startValue.x;
            if (startValue.y < value.y) {
                sy = startValue.y;
                ey = value.y;
            } else {
                sy = value.y;
                ey = startValue.y;
            }
        }
        return `polygon(0% 0%, 0% 100%, ${sx * 100}% 100%, ${sx * 100}% ${sy * 100}%, ${ex * 100}% ${sy * 100}%, ${
            ex * 100
        }% ${ey * 100}%, ${sx * 100}% ${ey * 100}%, ${sx * 100}% 100%, 100% 100%, 100% 0%)`;
    };

    const generateKeyboardClipPath = () => {
        // NOTE: This function generates a clip path string based on keyboardSelection
        var sx, sy, ex, ey;
        if (keyboardSelection.startX < keyboardSelection.endX) {
            sx = keyboardSelection.startX;
            ex = keyboardSelection.endX;
            if (keyboardSelection.startY < keyboardSelection.endY) {
                sy = keyboardSelection.startY;
                ey = keyboardSelection.endY;
            } else {
                sy = keyboardSelection.endY;
                ey = keyboardSelection.startY;
            }
        } else {
            sx = keyboardSelection.endX;
            ex = keyboardSelection.startX;
            if (keyboardSelection.startY < keyboardSelection.endY) {
                sy = keyboardSelection.startY;
                ey = keyboardSelection.endY;
            } else {
                sy = keyboardSelection.endY;
                ey = keyboardSelection.startY;
            }
        }
        return `polygon(0% 0%, 0% 100%, ${sx * 100}% 100%, ${sx * 100}% ${sy * 100}%, ${ex * 100}% ${sy * 100}%, ${
            ex * 100
        }% ${ey * 100}%, ${sx * 100}% ${ey * 100}%, ${sx * 100}% 100%, 100% 100%, 100% 0%)`;
    };

    return (
        <Grid.Col md={7} lg={8} className="tour__imageviewer">
            <Paper withBorder radius="md" p="md" className={classes.root} ref={focusTrapRef}>
                <Stack spacing="xs" mb={15}>
                    <Title order={3}>{isEditing !== -1 ? `Editing Slide: ${isEditing}` : 'Create a New Slide'}</Title>
                    <Collapse in={keyboardEnabled}>
                        <Stack spacing="xs">
                            <Text size="sm" color="dimmed">
                                Select the move or resize handle with enter and use the arrow keys to manipulate the
                                selection. Select the resize handle with enter and use the arrow keys to resize the
                                selection.
                            </Text>

                            <Group noWrap spacing="xl">
                                <Button size="sm" onClick={() => toggleKeyboardSelection()} variant="secondary">
                                    {keyboardActive ? 'End Selection' : 'Begin Selection'}
                                </Button>
                                <Group>
                                    <ActionIcon
                                        onClick={() => toggleKeyboardMove()}
                                        disabled={!keyboardActive}
                                        label="Move Selection"
                                        color="dark"
                                        size="lg"
                                        radius="md"
                                        variant='filled'
                                    >
                                        <IconArrowsMove size={26} color={view ? 'none' : 'white'} />
                                    </ActionIcon>
                                    <ActionIcon
                                        onClick={() => toggleKeyboardResize()}
                                        disabled={!keyboardActive}
                                        label="Resize Selection"
                                        color="dark"
                                        size="lg"
                                        radius="md"
                                        variant='filled'
                                    >
                                        <IconArrowsMaximize size={26} color={view ? 'none' : 'white'} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        </Stack>
                    </Collapse>
                </Stack>

                <Container className={classes.imageContainer}>
                    {locked && <Overlay opacity={0} color="red" zIndex={12} />}
                    <Box
                        className={classes.highlight}
                        sx={(theme) => ({
                            aspectRatio: `${imageSize.aspectRatio}`,
                        })}
                        ref={mergedRef}
                        onMouseDown={() => {
                            setStartValue({
                                x: mouseX / width,
                                y: mouseY / height,
                            });
                        }}
                        onMouseUp={() => {
                            setSelection({
                                active: true,
                                ...selection,
                            });
                        }}
                    >
                        {keyboardEnabled ? (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    height: '100%',
                                    width: '100%',
                                    zIndex: 10,
                                    backgroundColor: !view
                                        ? theme.fn.rgba(theme.colors.gray[9], 0.75)
                                        : theme.fn.rgba(theme.colors.gray[9], 0),
                                    clipPath: `${generateKeyboardClipPath()}`,
                                }}
                            ></div>
                        ) : (
                            <div
                                className="clip-path-div"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    height: '100%',
                                    width: '100%',
                                    zIndex: 10,
                                    backgroundColor: !view
                                        ? theme.fn.rgba(theme.colors.gray[9], 0.75)
                                        : theme.fn.rgba(theme.colors.gray[9], 0),
                                    clipPath: `${generateClipPath()}`,
                                }}
                            />
                        )}
                    </Box>
                    <Image
                        src={imageURL}
                        alt="Graph Image"
                        className={classes.image}
                        onLoad={handleImageLoad}
                        fit="contain"
                    />
                </Container>
                <Stack justify="flex-start" spacing={2}>
                    <Text pt="sm" size="sm" color="dimmed">
                        Image Settings:
                    </Text>
                    <Group position="apart" className="tour__image-settings">
                        <Group>
                            <Tooltip
                                label={!view ? 'See Full Image' : 'See Selection'}
                                events={{ hover: true, focus: true, touch: false }}
                            >
                                <ActionIcon
                                    size="lg"
                                    radius="md"
                                    variant="filled"
                                    label={!view ? 'See Selection' : 'See Full Image'}
                                    onClick={() => toggleView()}
                                >
                                    {view ? <IconEye size={25} /> : <IconEyeOff size={25} />}
                                </ActionIcon>
                            </Tooltip>
                            {!keyboardEnabled && (
                                <Tooltip
                                    label={locked ? 'Unlock Selection' : 'Lock Selection'}
                                    events={{ hover: true, focus: true, touch: false }}
                                >
                                    <ActionIcon
                                        size="lg"
                                        radius="md"
                                        variant="filled"
                                        label={locked ? 'Unlock Selection' : 'Lock Selection'}
                                        onClick={() => toggleLock()}
                                    >
                                        {locked ? <IconLockOpen size={25} /> : <IconLock size={25} />}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            <Tooltip label="Reset Selection" events={{ hover: true, focus: true, touch: false }}>
                                <ActionIcon
                                    size="lg"
                                    radius="md"
                                    variant="filled"
                                    color="yellow"
                                    label="Reset Selection"
                                    onClick={() => resetSelection()}
                                >
                                    <IconRefresh size={25} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Detailed Stats" events={{ hover: true, focus: true, touch: false }}>
                                <ActionIcon
                                    size="lg"
                                    radius="md"
                                    variant="filled"
                                    color="blue"
                                    label="Detailed Stats"
                                    onClick={() => toggleCollapsed()}
                                >
                                    <IconReportAnalytics size={25} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                        <Group>
                            <Badge color="green" radius="md">
                                {view ? 'Full Image' : 'Selection View'}
                            </Badge>
                            {!keyboardEnabled && (
                                <Badge color="orange" radius="md">
                                    {locked ? 'Selection Locked' : 'Selection Unlocked'}
                                </Badge>
                            )}
                        </Group>
                    </Group>
                </Stack>
                <Collapse in={collapsed}>
                    <Text mt={5}>
                        Start Value{' '}
                        <Code>{`{ x: ${Math.round(selection.startX * 100)}, y: ${Math.round(
                            selection.startY * 100,
                        )} }`}</Code>
                        , End Value{' '}
                        <Code>{`{ x: ${Math.round(selection.endY * 100)}, y: ${Math.round(
                            selection.endY * 100,
                        )} }`}</Code>
                        , Selection <Code>{`active: ${selection.active} `}</Code>
                    </Text>
                    <Text mt={5}>
                        Start Value{' '}
                        <Code>{`{ x: ${Math.round(keyboardSelection.startX * 100)}, y: ${Math.round(
                            keyboardSelection.startY * 100,
                        )} }`}</Code>
                        , End Value{' '}
                        <Code>{`{ x: ${Math.round(keyboardSelection.endX * 100)}, y: ${Math.round(
                            keyboardSelection.endY * 100,
                        )} }`}</Code>
                        , Selection <Code>{`active: ${keyboardSelection.active} `}</Code>
                    </Text>
                    <Text mt={5}>
                        Keyboard Move <Code>{`active: ${keyboardMove} `}</Code>
                        Keyboard Resize <Code>{`active: ${keyboardResize} `}</Code>
                    </Text>
                </Collapse>
            </Paper>
        </Grid.Col>
    );
}

export default ImageViewer;

/*
setStartValue({
                                x: Math.round((mouseX / width) * 100),
                                y: Math.round((mouseY / height) * 100),
                            })
*/
