import { Anchor, Box, createStyles, Paper, Stack, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import Form from './build_dependencies/Form';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] + ' !important',
    },
}));

function Build({ setActive }) {
    const { classes } = useStyles();

    const [submitted, setSubmitted] = useState(false);
    const [imageURL, setImageURL] = useState('');

    return (
        <Paper shadow="md" p="lg" radius="lg" mt={20} className={classes.root}>
            <Stack align="flex-start" justify="flex-start" spacing={0} mb={30} pl={20}>
                <Title className={classes.title}>Build</Title>
                <Text size="sm" color="dimmed">
                    New here? Check out our{' '}
                    <Anchor component="button" type="button" onClick={() => setActive('overview')}>
                        quick start guide
                    </Anchor>{' '}
                    to get started.
                </Text>
            </Stack>
            {submitted ? <Box> </Box> : <Form setImageURL={setImageURL} setSubmitted={setSubmitted} />}
        </Paper>
    );
}

export default Build;
