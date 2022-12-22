import {
    ActionIcon,
    Button,
    Center,
    createStyles,
    Group,
    MediaQuery,
    Navbar,
    Text,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core';
import { IconChartAreaLine, IconCrane, IconMoonStars, IconSchool, IconSun } from '@tabler/icons';
import React from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 30,
        left: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: 2,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadows.md,

        transition: 'all 0.2s ease',
    },
    link: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
    },
    linkGroup: {
        width: '100%',
        maxWidth: 600,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
}));

function Nav({ setActive }) {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const theme = useMantineTheme();

    const data = [
        { label: 'Overview', value: 'overview', color: 'blue', icon: IconSchool },
        { label: 'Build', value: 'build', color: 'blue', icon: IconCrane },
        { label: 'Preview', value: 'preview', color: 'blue', icon: IconChartAreaLine },
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
            <item.icon size={24} color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]} />
            <MediaQuery smallerThan="xs" styles={{ display: 'none'}} >
                <Text weight={600} size="md" ml={7}>
                    {item.label}
                </Text>
            </MediaQuery>
        </Button>
    ));

    return (
        <Navbar
            height={70}
            fixed={false}
            p="sm"
            width={{ base: '90vw', xs: '80vw', sm: '70vw', md: '60vw', lg: '50vw' }}
            className={classes.root}
            sx={(theme) => ({
                borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                borderWidth: '2px !important',
                borderStyle: 'solid !important',
            })}
        >
            <Group noWrap className={classes.linkGroup}>
                {links}
            </Group>
            <Center style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <ActionIcon
                    onClick={() => toggleColorScheme()}
                    size="lg"
                    radius="xl"
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
                        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
                    })}
                >
                    {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
            </Center>
        </Navbar>
    );
}

export default Nav;
