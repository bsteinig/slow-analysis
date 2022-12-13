import { BackgroundImage, Box, Code, createStyles, Grid, Paper, Text } from '@mantine/core';
import { useElementSize, useMergedRef, useMouse, useMove } from '@mantine/hooks';
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

    //const { ref, width, height } = useElementSize();
    const [startValue, setStartValue] = useState({ x: 0, y: 0 });
    const [value, setValue] = useState({ x: 0, y: 0 });
    const { ref: sizeRef, width, height } = useElementSize();
    const { ref: moveRef, active } = useMove(setValue);
    const { ref: mouseRef, x: mouseX, y: mouseY } = useMouse();

    const mergedRef = useMergedRef(mouseRef, moveRef, sizeRef);

    // mousedown and mouseup events
    // useEffect(() => {
    //     if (active) {
    //         setStartValue(value);
    //     } else {
    //         setSelection({ active: true, x: startValue.x, y: startValue.y, width: Math.abs(startValue.x - value.x), height: Math.abs(startValue.y - value.y) });
    //     }
    // }, [active]);

    return (
        <Grid.Col md={7} lg={8}>
            <Paper withBorder radius="md" p="md" className={classes.root}>
                <BackgroundImage src={imageURL} radius="sm" className={classes.bgImage}>
                    <Box
                        sx={(theme) => ({ height: 400, position: 'relative', backgroundColor: theme.fn.rgba(theme.colors.gray[9],0.5)  })}
                        mx="auto"
                        ref={mergedRef}
                        onMouseDown={() =>
                            setStartValue({
                                x: (mouseX / width),
                                y:(mouseY / height),
                            })
                        }
                    >
                        <div
                            style={{
                                position: 'absolute',
                                left: `${value.x < startValue.x ? `unset` : `calc(${startValue.x * 100}% - 8px)`}`,
                                right: `${value.x < startValue.x ? `calc(${(1 - startValue.x) * 100 }% - 8px)` : `unset`}`,
                                top: `${value.y < startValue.y ? `unset` : `calc(${startValue.y * 100}% - 8px)`}`,
                                bottom: `${value.y < startValue.y ? `calc(${(1 - startValue.y) * 100}% - 8px)` : `unset`}`,
                                width: `${
                                    value.x < startValue.x
                                        ? `calc(${(startValue.x - value.x) * 100}% + 16px)`
                                        : `calc(${(value.x - startValue.x) * 100}% + 16px)`
                                }`,
                                height: `${
                                    value.y < startValue.y
                                        ? `calc(${(startValue.y - value.y) * 100}% + 16px)`
                                        : `calc(${(value.y - startValue.y) * 100}% + 16px)`
                                }`,
                                backgroundColor: active
                                    ? theme.fn.rgba(theme.colors.gray[7], 0.5)
                                    : theme.fn.rgba(theme.colors.gray[7], 0.5),
                                backdropFilter: 'ligten(1)',
                            }}
                        />
                    </Box>
                </BackgroundImage>
                <Text>
                    Start Value{' '}
                    <Code>{`{ x: ${Math.round(startValue.x * 100)}, y: ${Math.round(startValue.y * 100)} }`}</Code>
                    Values <Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(value.y * 100)} }`}</Code>
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
