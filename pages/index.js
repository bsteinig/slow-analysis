import { Container, createStyles } from '@mantine/core';
import { useLocalStorage, useSessionStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import Build from '../components/Build';
import Nav from '../components/Nav';
import Overview from '../components/Overview';
import Preview from '../components/Preview';
import TourWrapper from '../components/TourWrapper';

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
    const [component, setComponent] = useState('');

    const [firstVisit, setFirstVisit] = useSessionStorage({ key: 'firstVisit', defaultValue: true });

    

    // Project state
    const [project, setProject] = useState({}); // image: url, title: string, slides: [{}, {}, {}]

    // conditionally render the component based on the active state (overview, build, preview)
    const renderComponent = (setFirstVisit) => {
        switch (component) {
            case 'overview':
                return <Overview setComponent={setComponent} />;
            case 'build':
                return <TourWrapper setComponent={setComponent} setProject={setProject} />;
            case 'preview':
                return <Preview setComponent={setComponent} project={project} />;
            default:
                return firstVisit ? (
                    <Overview setComponent={setComponent} setFirstVisit={setFirstVisit}/>
                ) : (
                    <Build setComponent={setComponent} setProject={setProject} />
                );
        }
    };

    return (
        <div className={classes.root}>
            <Nav setActive={setComponent} />
            <Container size="lg" className={classes.main}>
                {renderComponent(setFirstVisit)}
            </Container>
        </div>
    );
}
