import {
    Button,
    Center,
    createStyles,
    Grid,
    LoadingOverlay,
    Overlay,
    Paper,
    Stack,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAugmentedReality } from '@tabler/icons';
import React, { useEffect } from 'react';

const useStyles = createStyles((theme) => ({
    root: {
        minHeight: 505,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
        borderStyle: 'solid',
        borderWidth: 1,
        position: 'relative',
    },
    submit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
    },
    overlay: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[8],
        fontWeight: 600,
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
    },
    overlayIcon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[2],
    },
}));

function CardForm({ selection, setFormSubmission, isEditing, slides }) {
    const { classes } = useStyles();

    const customLoader = (
        <Center>
            <Stack align="center" spacing="md">
                <IconAugmentedReality size={150} className={classes.overlayIcon} />
                <Text size="xl" className={classes.overlay}>
                    Make a selection on the image to the left to create a new slide.
                </Text>
            </Stack>
        </Center>
    );

    const componentForm = useForm({
        initialValues: {
            graphicalFeature: '',
            description: '',
        },
        validate: {
            graphicalFeature: (value) => (value.length > 0 ? null : 'Graphical feature is required'),
        },
    });

    const handleFormSubmit = (values) => {
        if(selection.active){
            setFormSubmission(values)
            componentForm.reset();
        }else{
            alert('Save Failed. Please make a selection on the image to the left.')
        }
    };

    useEffect(() => {
      if(isEditing !== -1){
        componentForm.setValues({
          graphicalFeature: slides[isEditing].data.graphicalFeature,
          description: slides[isEditing].data.description,
        })
      }
      if(isEditing === -1){
        componentForm.reset();
      }
    }, [isEditing])
    

    return (
        <Grid.Col md={5} lg={4}>
            <Paper radius="md" shadow="xs" p="md" className={classes.root}>
                <LoadingOverlay
                    visible={!selection.active}
                    overlayOpacity={0.25}
                    overlayColor="#000"
                    overlayBlur={4}
                    transitionDuration={100}
                    loader={customLoader}
                    radius="md"
                />
                <Stack align="flex-start" justify="flex-start" spacing={0} mb={20}>
                    <Text size="md" weight={500}>
                        Create a new slide
                    </Text>
                    <Text size="sm" color="dimmed">
                        Fill out the form below to create a new slide based on the selected area
                    </Text>
                </Stack>

                <form onSubmit={componentForm.onSubmit((values) => handleFormSubmit(values))}>
                    <Stack px="sm" style={{ height: '400px' }}>
                        <TextInput
                            label="Graphical Feature"
                            placeholder="Describe the selected area"
                            radius="md"
                            size="md"
                            withAsterisk
                            {...componentForm.getInputProps('graphicalFeature')}
                            disabled={!selection.active}
                        />
                        <Textarea
                            label="Description"
                            radius="md"
                            size="sm"
                            autosize
                            minRows={6}
                            maxRows={8}
                            {...componentForm.getInputProps('description')}
                            disabled={!selection.active}
                        />
                        <Button
                            type="submit"
                            variant="outline"
                            color="blue"
                            radius="md"
                            size="md"
                            className={classes.submit}
                            disabled={!selection.active}
                        >
                            Save
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Grid.Col>
    );
}

export default CardForm;
