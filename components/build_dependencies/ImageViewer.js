import {
    ActionIcon,
    BackgroundImage,
    Box,
    Code,
    createStyles,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    Tooltip,
} from '@mantine/core';
import { useElementSize, useMergedRef, useMouse, useMove, useToggle } from '@mantine/hooks';
import { IconEye, IconEyeOff, IconLock, IconRefresh } from '@tabler/icons';
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
    },
}));

/*
    This component is responsible for displaying the image that the user has uploaded.
    It is a child component of the Build component.
    imageURL: string
    selection: active: boolean, x: number, y: number, width: number, height: number
    setSelection: function
*/
function ImageViewer({ imageURL, selection, setSelection }) {
    const { classes, theme } = useStyles();

    // Selection state
    const [startValue, setStartValue] = useState({ x: 0, y: 0 });
    const [value, setValue] = useState({ x: 0, y: 0 });
    const { ref: sizeRef, width, height } = useElementSize();
    const { ref: moveRef, active } = useMove(setValue);
    const { ref: mouseRef, x: mouseX, y: mouseY } = useMouse();
    const mergedRef = useMergedRef(mouseRef, moveRef, sizeRef);

    // Lock and View state
    const [lock, toggleLock] = useToggle();
    const [view, toggleView] = useToggle();

    useEffect(() => {
        if (active) {
            setSelection({ active: false, x: 0, y: 0, width: 0, height: 0 });
        } else {
            if (value.x === 0 && value.y === 0 && startValue.x === 0 && startValue.y === 0) {
                return;
            } else {
                setSelection({
                    active: true,
                    x: startValue.x,
                    y: startValue.y,
                    width: Math.abs(startValue.x - value.x),
                    height: Math.abs(startValue.y - value.y),
                });
            }
        }
    }, [active]);

    const resetSelection = () => {
        setSelection({ ...selection, active: false });
        setStartValue({ x: 0, y: 0 });
        setValue({ x: 0, y: 0 });
    };

    return (
        <Grid.Col md={7} lg={8}>
            <Paper withBorder radius="md" p="md" className={classes.root}>
                <BackgroundImage src={imageURL} radius="sm" className={classes.bgImage}>
                    <Box
                        sx={(theme) => ({
                            height: 400,
                            position: 'relative',
                            backgroundColor: view ? theme.fn.rgba(theme.colors.gray[9], 0.75) : theme.fn.rgba(theme.colors.gray[9], 0),
                        })}
                        mx="auto"
                        ref={mergedRef}
                        onMouseDown={() =>
                            setStartValue({
                                x: mouseX / width,
                                y: mouseY / height,
                            })
                        }
                        onMouseUp={() =>
                            setSelection({
                                active: true,
                                ...selection,
                            })
                        }
                    >
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
                                backdropFilter: `${ view ? 'brightness(2.25) saturate(1.25) contrast(1.75)' : 'unset'}`,
                            }}
                        />
                    </Box>
                </BackgroundImage>
                <Stack justify="flex-start" spacing={2}>
                    <Text pt="sm" size="sm" color="dimmed">
                        Image Settings:
                    </Text>
                    <Group>
                        <Tooltip label={view ? "See Full Image" : "See Selection"}>
                            <ActionIcon
                                size="lg"
                                radius="md"
                                variant="filled"
                                label={view ? "See Full Image" : "See Selection"}
                                onClick={() => toggleView()}
                            >
                                {view ? <IconEyeOff size={25} /> : <IconEye size={25} />}
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Lock Selection">
                            <ActionIcon size="lg" radius="md" variant="filled" label="Lock Selection">
                                <IconLock size={25} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Reset Selection">
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
                    </Group>
                </Stack>
                <Text>
                    Start Value{' '}
                    <Code>{`{ x: ${Math.round(startValue.x * 100)}, y: ${Math.round(startValue.y * 100)} }`}</Code>
                    Values <Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(value.y * 100)} }`}</Code>
                    Selection<Code>{`active: ${selection.active} `}</Code>
                </Text>
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
