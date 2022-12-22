import {
    ActionIcon,
    BackgroundImage,
    Badge,
    Box,
    Button,
    Code,
    Collapse,
    createStyles,
    Grid,
    Group,
    Overlay,
    Paper,
    Stack,
    Text,
    Tooltip,
} from '@mantine/core';
import { useElementSize, useMergedRef, useMouse, useMove, useToggle } from '@mantine/hooks';
import {
    IconArrowsMove,
    IconEye,
    IconEyeOff,
    IconLock,
    IconLockOff,
    IconLockOpen,
    IconRefresh,
    IconReportAnalytics,
    IconSlashes,
    IconTexture,
} from '@tabler/icons';
import React, { useState, useEffect } from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        minHeight: 400,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
        borderStyle: 'solid',
        borderWidth: 1,
    },
    bgImage: {
        backgroundSize: 'contain !important',
        backgroundRepeat: 'no-repeat !important',
        position: 'relative',
    },
}));

/*
    This component is responsible for displaying the image that the user has uploaded.
    It is a child component of the Build component.
    imageURL: string
    selection: active: boolean, x: number, y: number, width: number, height: number
    setSelection: function
*/
function ImageViewer({ imageURL, selection, setSelection, selectionReset, setSelectionReset }) {
    const { classes, theme } = useStyles();

    // Selection state
    const [startValue, setStartValue] = useState({ x: 0, y: 0 });
    const [value, setValue] = useState({ x: 0, y: 0 });
    const { ref: sizeRef, width, height } = useElementSize();
    const { ref: moveRef, active } = useMove(setValue);
    const { ref: mouseRef, x: mouseX, y: mouseY } = useMouse();
    const mergedRef = useMergedRef(mouseRef, moveRef, sizeRef);

    // Keyboard selection state
    const [keyboardEnabled, toggleKeyboard] = useToggle();
    const [keyboardSelection, setKeyboardSelection] = useState({
        startX: 0.05,
        startY: 0.05,
        endX: 0.15,
        endY: 0.15,
        active: false,
    });
    const [keyboardMove, toggleKeyboardMove] = useToggle();
    const [keyboardResize, toggleKeyboardResize] = useToggle();

    // Keyboard Move handler
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
                            startY: prev.startY - 0.01,
                            endY: prev.endY - 0.01,
                        };
                    });
                } else if (e.key === 'ArrowDown') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            startY: prev.startY + 0.01,
                            endY: prev.endY + 0.01,
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
            setSelection({
                active: true,
                startX: keyboardSelection.startX,
                startY: keyboardSelection.startY,
                endX: keyboardSelection.endX,
                endY: keyboardSelection.endY,
            });
        }
    }, [keyboardMove]);

    // Keyboard Resize handler
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
                            endY: prev.endY - 0.01,
                        };
                    });
                } else if (e.key === 'ArrowDown') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            endY: prev.endY + 0.01,
                        };
                    });
                } else if (e.key === 'ArrowLeft') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            endX: prev.endX - 0.01,
                        };
                    });
                } else if (e.key === 'ArrowRight') {
                    setKeyboardSelection((prev) => {
                        return {
                            ...prev,
                            endX: prev.endX + 0.01,
                        };
                    });
                }else if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Space') {
                    toggleKeyboardResize();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            setSelection({
                active: true,
                startX: keyboardSelection.startX,
                startY: keyboardSelection.startY,
                endX: keyboardSelection.endX,
                endY: keyboardSelection.endY,
            });
        }
    }, [keyboardResize]);


    // Lock,View, and Stats state
    const [locked, toggleLock] = useToggle();
    const [view, toggleView] = useToggle();
    const [collapsed, toggleCollapsed] = useToggle();

    // Mouse selection
    useEffect(() => {
        if (!keyboardEnabled) {
            if (active) {
                setSelection({ active: false, x: 0, y: 0, width: 0, height: 0 });
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

    const resetSelection = () => {
        setSelection({ startX: 0, startY: 0, endX: 0, endY: 0, active: false });
        if (keyboardEnabled) {
            setKeyboardSelection({
                startX: 0.05,
                startY: 0.05,
                endX: 0.15,
                endY: 0.15,
                active: true,
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

    return (
        <Grid.Col md={7} lg={8}>
            <Paper withBorder radius="md" p="md" className={classes.root}>
                <Stack spacing="xs" mb={15}>
                    <Button
                        variant="light"
                        radius="md"
                        style={{ width: 'fit-content' }}
                        onClick={() => toggleKeyboard()}
                    >
                        {keyboardEnabled ? 'Disable' : 'Enable'} Keyboard Selection
                    </Button>
                    <Collapse in={keyboardEnabled}>
                        <Text size="xs" color="gray">
                            Use the arrow keys to move the selection box. Press the spacebar to confirm.
                        </Text>
                    </Collapse>
                </Stack>

                <BackgroundImage src={imageURL} radius="sm" className={classes.bgImage}>
                    {locked && <Overlay opacity={0} color="red" zIndex={5} />}
                    <Box
                        sx={(theme) => ({
                            height: 400,
                            position: 'relative',
                            backgroundColor: !view
                                ? theme.fn.rgba(theme.colors.gray[9], 0.75)
                                : theme.fn.rgba(theme.colors.gray[9], 0),
                        })}
                        mx="auto"
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
                                    left: `calc(${keyboardSelection.startX * 100}% - 1px )`,
                                    top: `calc(${keyboardSelection.startY * 100}% - 1px  )`,
                                    width: `calc(${(keyboardSelection.endX - keyboardSelection.startX) * 100}% + 2px)`,
                                    height: `calc(${(keyboardSelection.endY - keyboardSelection.startY) * 100}% + 2px)`,
                                    backgroundColor: theme.fn.rgba(theme.colors.gray[7], 0.0),
                                    backdropFilter: `${
                                        !view ? 'brightness(2.25) saturate(1.25) contrast(1.75)' : 'unset'
                                    }`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Group noWrap position="apart">
                                    <ActionIcon p={0} onClick={() => toggleKeyboardMove()}>
                                        <IconArrowsMove size={20} />
                                    </ActionIcon>
                                    <ActionIcon p={0} onClick={() => toggleKeyboardResize()}>
                                        <IconSlashes size={20}  />
                                    </ActionIcon>
                                </Group>
                            </div>
                        ) : (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: `${value.x < startValue.x ? `unset` : `calc(${startValue.x * 100}% - 1px )`}`,
                                    right: `${
                                        value.x < startValue.x ? `calc(${(1 - startValue.x) * 100}% - 1px  )` : `unset`
                                    }`,
                                    top: `${value.y < startValue.y ? `unset` : `calc(${startValue.y * 100}% - 1px  )`}`,
                                    bottom: `${
                                        value.y < startValue.y ? `calc(${(1 - startValue.y) * 100}% - 1px   )` : `unset`
                                    }`,
                                    width: `${
                                        value.x < startValue.x
                                            ? `calc(${(startValue.x - value.x) * 100}% + 2px)`
                                            : `calc(${(value.x - startValue.x) * 100}% + 2px)`
                                    }`,
                                    height: `${
                                        value.y < startValue.y
                                            ? `calc(${(startValue.y - value.y) * 100}% + 2px)`
                                            : `calc(${(value.y - startValue.y) * 100}% + 2px)`
                                    }`,
                                    backgroundColor: theme.fn.rgba(theme.colors.gray[7], 0.0),
                                    backdropFilter: `${
                                        !view ? 'brightness(2.25) saturate(1.25) contrast(1.75)' : 'unset'
                                    }`,
                                }}
                            />
                        )}
                    </Box>
                </BackgroundImage>
                <Stack justify="flex-start" spacing={2}>
                    <Text pt="sm" size="sm" color="dimmed">
                        Image Settings:
                    </Text>
                    <Group position="apart">
                        <Group>
                            <Tooltip
                                label={view ? 'See Full Image' : 'See Selection'}
                                events={{ hover: true, focus: true, touch: false }}
                            >
                                <ActionIcon
                                    size="lg"
                                    radius="md"
                                    variant="filled"
                                    label={view ? 'See Selection' : 'See Full Image'}
                                    onClick={() => toggleView()}
                                >
                                    {view ? <IconEye size={25} /> : <IconEyeOff size={25} />}
                                </ActionIcon>
                            </Tooltip>
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
                            <Badge color="orange" radius="md">
                                {locked ? 'Selection Locked' : 'Selection Unlocked'}
                            </Badge>
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