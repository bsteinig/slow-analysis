import { Button, createStyles, Group, Navbar, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        top: 30,
        left: '50%',
        transform: 'translate(-50%, 0)',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[0],
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadows.md,
        backdropFilter: 'blur(20px)',

        transition: 'all 0.2s ease',
    },
    link: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
    },
    linkGroup: {
        width: '100%',
        maxWidth: 600,
    },
}));

function Nav({ setActive }) {
    const { classes } = useStyles();

    const theme = useMantineTheme();

    const data = [
        { label: 'Overview', value: 'overview', color: 'grape.7' },
        { label: 'Build', value: 'build', color: 'teal.7' },
        { label: 'Preview', value: 'preview', color: 'orange.7' },
    ];

    const links = data.map((item) => (
        <Button
            variant="subtle"
            compact
            color={item.color}
            className={classes.link}
            radius="xl"
            size="xl"
            key={item.label}
            onClick={() => setActive(item.value)}
        >
            <Text weight={600} size="md">
                {item.label}
            </Text>
        </Button>
    ));

    return (
        <Navbar
            height={70}
            fixed={true}
            p={'sm'}
            width={{ base: '90vw', xs: '80vw', sm: '70vw',  md: '60vw', lg: '50vw' }}
            className={classes.root}
            sx={(theme) => ({
                borderColor: theme.colors.gray[0],
                borderWidth: '2px !important',
                borderStyle: 'solid !important',
            })}
        >
            <Group position="apart" noWrap className={classes.linkGroup}>
                {links}
            </Group>
        </Navbar>
    );
}

export default Nav;
