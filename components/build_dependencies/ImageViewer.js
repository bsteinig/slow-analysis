import { BackgroundImage, Box, createStyles, Grid, Paper, Stack, Text } from '@mantine/core';
import React from 'react';

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
    }
}));

function ImageViewer({ imageURL, selection, setSelection }) {
    const { classes } = useStyles();

    return (
        <Grid.Col md={7} lg={8}>
            <Paper withBorder radius="md" p="md" className={classes.root}>
                <BackgroundImage src={imageURL} radius="sm" className={classes.bgImage}>
                    <Box sx={{ height: 400 }} mx="auto"></Box>
                </BackgroundImage>
            </Paper>
        </Grid.Col>
    );
}

export default ImageViewer;
