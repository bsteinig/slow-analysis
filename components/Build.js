import {
    ActionIcon,
    Anchor,
    Button,
    Center,
    createStyles,
    Divider,
    Group,
    Image,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconPhoto, IconTrashX, IconUpload, IconX } from '@tabler/icons';
import React, { useState } from 'react';
import { useEffect } from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] + ' !important',
    },
    title: {
        color: theme.colorScheme === 'dark' ? theme.colors.teal[4] : theme.colors.teal[8],
    },
    form: {
        maxWidth: 450,
    },
    textInput: {
        maxWidth: 450,
    },
}));

function Build({ setActive }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [files, setFiles] = useState([]);

    const upload = useForm({
        initialValues: {
            link: '',
            file: null,
        },

        validate: {
            link: (value) =>
                value ? (/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(value) ? null : 'Invalid link') : null,
        },
    });

    console.log(upload.values);

    useEffect(() => {
        if (files.length > 0) {
            upload.setFieldValue('file', files[0]);
        }
    }, [files]);

    const resetUpload = () => {
        upload.setFieldValue('file', null);
        setFiles([]);
    };

    const handleUploadSubmission = (values) => {
        if(values.link) {
            console.log(values.link);
        }else if(values.file) {
            console.log(values.file);
        }
    };

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                width={200}
                key={index}
                src={imageUrl}
                alt="Preview"
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
    });

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

            <Center>
                <Stack>
                    <form onSubmit={upload.onSubmit((values) => handleUploadSubmission(values))}>
                        <Group>
                            <Stack spacing={2} className={classes.form}>
                                <TextInput
                                    placeholder="Image link "
                                    label="Get started with an image URL"
                                    description="Accepted formats: (png, jpg, jpeg, gif, svg)"
                                    icon={<IconPhoto size={24} />}
                                    radius="md"
                                    size="md"
                                    className={classes.textInput}
                                    {...upload.getInputProps('link')}
                                />
                                <Divider my="xs" label="Or upload an image" labelPosition="center" />
                                <Group spacing="xs" noWrap>
                                    <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                                        <Group
                                            position="center"
                                            spacing="xs"
                                            style={{
                                                minHeight: 60,
                                                pointerEvents: 'none',
                                                transition: 'width 0.3 ease',
                                            }}
                                        >
                                            <Dropzone.Accept>
                                                <IconUpload
                                                    size={20}
                                                    stroke={1.5}
                                                    color={
                                                        theme.colors[theme.primaryColor][
                                                            theme.colorScheme === 'dark' ? 4 : 6
                                                        ]
                                                    }
                                                />
                                            </Dropzone.Accept>
                                            <Dropzone.Reject>
                                                <IconX
                                                    size={20}
                                                    stroke={1.5}
                                                    color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                                                />
                                            </Dropzone.Reject>
                                            <Dropzone.Idle>
                                                <IconPhoto size={20} stroke={1.5} />
                                            </Dropzone.Idle>

                                            <div>
                                                <Text size="md" inline>
                                                    Drop an image here, or click to browse
                                                </Text>
                                                <Text size="xs" color="dimmed" inline mt={7}>
                                                    All image types are supported, but should not exceed 5mb
                                                </Text>
                                            </div>
                                        </Group>
                                    </Dropzone>
                                    {upload.values.file && (
                                        <ActionIcon
                                            color="red"
                                            size="xl"
                                            radius="md"
                                            variant="outline"
                                            style={{ height: 96 }}
                                            onClick={() => resetUpload()}
                                            aria-label="Remove image from upload"
                                        >
                                            <IconTrashX size={34} />
                                        </ActionIcon>
                                    )}
                                </Group>
                                <Center>
                                    <Button
                                        type="submit"
                                        mt={20}
                                        sx={{ width: 100 }}
                                        disabled={upload.values.link == '' && !upload.values.file}
                                        aria-label="Submit"
                                    >
                                        Submit
                                    </Button>
                                </Center>
                            </Stack>
                            {upload.values.file && (
                                <Center>
                                    <Paper p="sm" withBorder shadow="md">
                                        <Stack>
                                            <Text size="md" weight={500}>
                                                Upload Preview
                                            </Text>
                                            {previews}
                                        </Stack>
                                    </Paper>
                                </Center>
                            )}
                        </Group>
                    </form>
                </Stack>
            </Center>
        </Paper>
    );
}

export default Build;
