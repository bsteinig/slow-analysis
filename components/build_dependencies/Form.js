import { ActionIcon, Button, Center, Divider, Group, Paper, Stack, Text, TextInput, useMantineTheme, Image, createStyles } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconPhoto, IconTrashX, IconUpload, IconX } from '@tabler/icons';
import React, { useState, useEffect } from 'react';

const useStyles = createStyles((theme) => ({
    form: {
        maxWidth: 450,
    },
    textInput: {
        maxWidth: 450,
    },
}));

function Form({ setImageURL, setSubmitted }) {

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const resetUpload = () => {
        upload.setFieldValue('file', null);
        setFiles([]);
    };

    const handleUploadSubmission = (values) => {
        if(values.link) {
            console.log(values.link);
            setSubmitted(true);
            setImageURL(values.link);
        }else if(values.file) {
            console.log(values.file);
            setSubmitted(true);
            // TODO: Upload file to server
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
    );
}

export default Form;
