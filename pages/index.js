import { Container, createStyles } from '@mantine/core';
import { useState } from 'react';
import Build from '../components/Build';
import Nav from '../components/Nav';
import Overview from '../components/Overview';
import Preview from '../components/Preview';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        minHeight: '100vh',
    },
    main: {
        paddingTop: 120,
        paddingBottom: 120,
    },
}));

export default function IndexPage() {
    const { classes } = useStyles();
    const [component, setComponent] = useState('build');

    // conditionally render the component based on the active state (overview, build, preview)
    const renderComponent = () => {
        switch (component) {
            case 'overview':
                return <Overview />;
            case 'build':
                return <Build setComponent={setComponent} />;
            case 'preview':
                return <Preview />;
            default:
                return <Build />;
        }
    };

    return (
        <div className={classes.root}>
            <Nav setActive={setComponent} />
            <Container size="lg" className={classes.main}>
                {renderComponent()}
            </Container>
        </div>
    );
}
