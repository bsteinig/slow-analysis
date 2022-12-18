import { Container, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
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

    // Project state
    const [project, setProject] = useState({}); // image: url, title: string, slides: [{}, {}, {}]

    useEffect(() => {
        console.log('project', project);
    }, [project])
    

    // conditionally render the component based on the active state (overview, build, preview)
    const renderComponent = () => {
        switch (component) {
            case 'overview':
                return <Overview />;
            case 'build':
                return <Build setComponent={setComponent} setProject={setProject} />;
            case 'preview':
                return <Preview project={project} />;
            default:
                return <Build setComponent={setComponent} setProject={setProject} />;
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
