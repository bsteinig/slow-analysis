import {
    Anchor,
    Button,
    Center,
    Code,
    Collapse,
    Container,
    createStyles,
    Group,
    Modal,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
    Tooltip,
    useMantineTheme,
} from '@mantine/core';
import { IconAppWindow, IconBrowser, IconSourceCode } from '@tabler/icons';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useEffect } from 'react';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });
import { Prism } from '@mantine/prism';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] + ' !important',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        borderWidth: '2px !important',
        borderStyle: 'solid !important',
    },
    title: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        weight: 'bold',
    },
    output: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        minWidth: '95%',
        minHeight: 500,
        borderRadius: theme.radius.lg,
        display: 'flex',
        padding: theme.spacing.sm,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    toolbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
    },
    frame: {
        width: '100%',
        height: '500px',
        border: 'none',
        paddingTop: '50px',
    },
}));

function Preview({ setComponent, project }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const [openHTML, setOpenHTML] = useState(false);
    const [showSource, setShowSource] = useState(false);
    const [component, setIndex] = useState('');

    // raw embed code, used for copy to clipboard
    //NOTE - this should probably be loaded from a file or something less gross
    const index = `<html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>{sitetitle}</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bsteinig/slow-analysis-cdn/style.css" />
        </head>
        <body>
          <div class="container">
            <div class="img-comp">
              <div class="img-comp-highlight" id="img-comp-highlight"></div>
              <img
                src="{imageURL}"
                alt="graphic"
                class="responsive"
                id="img-comp-img"
              />
            </div>
            <div class="info-comp">
              <h1 class="headline">
                  {title}
              </h1>
              <div class="text-container">
                <h3 class="comp-title" id="comp-title">Click Next to begin</h3>
                <p class="comp-info" id="comp-info"></p>
              </div>
              <div class="btn-group">
                  <button class="btn" onclick="backClick()">Back</button>
                  <button class="btn" onclick="nextClick()">Next</button>
                </div>
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/gh/bsteinig/slow-analysis-cdn/script.js" async defer></script>
          <div id="aspect" style="display: none;">{aspect}</div>
          <div id="titles" style="display: none;">{GraphArea}</div>
          <div id="descs" style="display: none;">{descriptions}</div>
          <div id="coords" style="display: none;">{coords}</div>
        </body>
      </html>`;

    // Function to generate the HTML preview
    // Fill content in index.html with the project data
    const generateHTML = (project) => {
        // replace {sitetitle} and {title} with project title
        let html = index.replace(/{title}/g, project.title);
        html = html.replace(/{sitetitle}/g, project.title);
        // replace {imageURL} with project image
        html = html.replace(/{imageURL}/g, project.image);
        // replace {aspect} with project aspect ratio
        html = html.replace(/{aspect}/g, project.aspect);
        // For each graph area, replace {GraphArea} with the graph area title
        let graphArea = '';
        let descriptions = '';
        let coords = '';
        project.slides.forEach((slide, index) => {
            // if last slide, don't add a pipe
            if (index === project.slides.length - 1) {
                graphArea += slide.data.graphicalFeature;
                descriptions += slide.data.description ? slide.data.description : ' ';
                coords +=
                    slide.selection.startX +
                    ',' +
                    slide.selection.startY +
                    ',' +
                    slide.selection.endX +
                    ',' +
                    slide.selection.endY;
            } else {
                graphArea += slide.data.graphicalFeature + '||';
                descriptions += slide.data.description ? slide.data.description + '||' : ' ||';
                coords +=
                    slide.selection.startX +
                    ',' +
                    slide.selection.startY +
                    ',' +
                    slide.selection.endX +
                    ',' +
                    slide.selection.endY +
                    '||';
            }
        });
        html = html.replace(/{GraphArea}/g, graphArea);
        html = html.replace(/{descriptions}/g, descriptions);
        html = html.replace(/{coords}/g, coords);
        setIndex(html);
    };

    // regenerate HTML when project changes
    useEffect(() => {
        if (project.slides?.length > 0) {
            generateHTML(project);
        }
    }, [project]);

    return (
        <>
            <Modal opened={openHTML} onClose={() => setOpenHTML(false)} title="Source Code" size="xl" zIndex={1000}>
                <Text size="sm" color="dimmed">
                    Copy and paste this code into your website to embed your project.
                </Text>
                <Prism language="html">{component}</Prism>
            </Modal>
            <Paper shadow="md" p="md" radius="lg" mt={20} className={classes.root}>
                <Stack spacing={0}>
                    <Stack align="flex-start" justify="flex-start" spacing={0} mb={10} pl={20}>
                        <Title className={classes.title}>Preview</Title>
                        <Text size="sm" color="dimmed">
                            Your project output will be displayed here.{' '}
                            <Anchor component="button" type="button" onClick={() => setComponent('build')}>
                                Start building
                            </Anchor>{' '}
                            to get started.
                        </Text>
                    </Stack>
                    <Container my={10} className={classes.output}>
                        {component === '' ? (
                            <>
                                <Skeleton animate={false} height={400} width="50%" />
                                <div style={{ width: '45%' }}>
                                    <Center style={{ flexDirection: 'column' }}>
                                        <Skeleton animate={false} height={28} mb={24} width="80%" radius="xl" />
                                        <Skeleton animate={false} height={20} mb={16} width="50%" radius="xl" />
                                    </Center>
                                    {[...Array(9)].map((x, i) => (
                                        <Skeleton
                                            key={i}
                                            animate={false}
                                            height={12}
                                            mb={i == 8 ? 48 : 8}
                                            width={i == 8 ? '60%' : '100%'}
                                            radius="xl"
                                        />
                                    ))}
                                    <Group position="center">
                                        <Skeleton animate={false} height={30} mr={10} mb={8} width="30%" radius="xl" />
                                        <Skeleton animate={false} height={30} ml={10} mb={8} width="30%" radius="xl" />
                                    </Group>
                                </div>
                            </>
                        ) : (
                            <iframe width="100%" height="400px" srcDoc={component} className={classes.frame}></iframe>
                        )}
                    </Container>
                    <Paper shadow="md" p="md" radius="lg" mt={20} mx={20} className={classes.toolbar}>
                        <Stack direction="row" align="flex-start" justify="space-between" spacing="md">
                            <Text size="md" weight={500}>
                                Choose an export option below to save your project, or view the source code.
                            </Text>
                            <Group>
                                <Tooltip
                                    multiline
                                    width={220}
                                    withArrow
                                    transition="fade"
                                    transitionDuration={200}
                                    label="Use this option to create an HTML file that you can embed in your website. This option is recommended if you want to use your project in a website."
                                    events={{ hover: true, focus: true, touch: false }}
                                >
                                    <Button
                                        leftIcon={<IconBrowser size={24} />}
                                        onClick={() => setOpenHTML(true)}
                                        radius="md"
                                    >
                                        Copy HTML Embed
                                    </Button>
                                </Tooltip>
                                <Button
                                    leftIcon={<IconSourceCode size={24} />}
                                    color="teal"
                                    radius="md"
                                    onClick={() => setShowSource(!showSource)}
                                >
                                    View Source Code
                                </Button>
                            </Group>
                        </Stack>
                    </Paper>
                    <Collapse in={showSource} transitionDuration={200}>
                        <DynamicReactJson
                            src={project}
                            iconStyle="triangle"
                            theme={theme.colorScheme === 'dark' ? 'summerfruit' : 'summerfruit:inverted'}
                            style={{ padding: '30px 40px', marginLeft: 20, marginRight: 20, backgroundColor: 'none' }}
                        />
                    </Collapse>
                </Stack>
            </Paper>
        </>
    );
}

export default Preview;

// If an offline version is every needed, uncomment this code
// You would really just need to zip the index.html, index.js, style.css, and the images folder
/*
                                <Tooltip
                                    multiline
                                    width={220}
                                    withArrow
                                    transition="fade"
                                    transitionDuration={200}
                                    label="Use this option to create an HTML file that you can use to create a standalone application. This option is recommended if you want to use your project offline."
                                    events={{ hover: true, focus: true, touch: false }}
                                >
                                    <Button leftIcon={<IconAppWindow size={24} />} radius="md">
                                        Copy HTML Canvas
                                    </Button>
                                </Tooltip>
*/
