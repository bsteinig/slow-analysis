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

    // First visit state
    const [firstVisit, setFirstVisit] = useSessionStorage({ key: 'firstVisit', defaultValue: true });
    const [isTourOpen, setOpen] = useState(true);
    const [lastStep, setLastStep] = useSessionStorage({ key: 'lastStep', defaultValue: 0 });

    // Project state
    const [project, setProject] = useState({}); // image: url, title: string, slides: [{}, {}, {}]

    // conditionally render the component based on the active state (overview, build, preview)
    const renderComponent = (setFirstVisit) => {
        switch (component) {
            case 'overview':
                return (
                    <Overview
                        setComponent={setComponent}
                        lastStep={lastStep}
                        firstVisit={firstVisit}
                        setFirstVisit={setFirstVisit}
                        setOpen={setOpen}
                    />
                );
            case 'build':
                return firstVisit ? (
                    <TourWrapper
                        setComponent={setComponent}
                        setProject={setProject}
                        setFirstVisit={setFirstVisit}
                        isTourOpen={isTourOpen}
                        setOpen={setOpen}
                        setLastStep={setLastStep}
                        lastStep={lastStep}
                    />
                ) : (
                    <Build setComponent={setComponent} setProject={setProject} />
                );
            case 'preview':
                return <Preview setComponent={setComponent} project={project} />;
            default:
                return firstVisit ? (
                    <Overview
                        setComponent={setComponent}
                        firstVisit={firstVisit}
                        setFirstVisit={setFirstVisit}
                        lastStep={lastStep}
                        setOpen={setOpen}
                    />
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
