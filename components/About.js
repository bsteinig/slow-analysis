import { Center, createStyles, Divider, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1] + ' !important',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        borderWidth: '2px !important',
        borderStyle: 'solid !important',
    },
    timelineTitle: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        fontWeight: 600,
    },
    userCard: {
        width: 'clamp(250px, 90%, 800px)',
        height: '320px',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        boxShadow: theme.shadows.lg,
    },
    infoBox: {
        height: '300px',
    },
}));

function About() {
    const { classes } = useStyles();

    return (
        <Paper shadow="md" p="lg" radius="lg" my={20} className={classes.root}>
            <Center>
                <Title className={classes.title}>About Us</Title>
            </Center>
            <Divider mx={'30%'} my={10} size="lg" color="blue.6" />
            <Stack align="center" justify="flex-start" spacing="xl">
                <Paper className={classes.userCard} radius="md" p="xs" >
                    <Group position="">
                        <Image
                            src="https://media.licdn.com/dms/image/D5603AQFy07xWrZGOLg/profile-displayphoto-shrink_400_400/0/1676414678612?e=1684368000&v=beta&t=gilBY2eR9POpCbRfzE_50il_b1xC5dK10rJt21NIgnY"
                            width={200}
                            height={300}
                            radius="md"
                            alt="profile-pic"
                            fit='cover'
                        />
                        <Stack className={classes.infoBox} align="flex-start" justify="flex-start" spacing={0}>
                        </Stack>
                    </Group>
                </Paper>
            </Stack>
        </Paper>
    );
}

export default About;
