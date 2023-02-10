import { ActionIcon, Center, createStyles, Grid, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { IconGripHorizontal, IconTools, IconTrashX, IconX } from '@tabler/icons';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const useStyles = createStyles((theme) => ({
    card: {
        minWidth: 200,
        width: 200,
        height: 225,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        margin: theme.spacing.md,
        boxShadow: theme.shadows.sm,
    },
    dragging: {
        boxShadow: theme.shadows.xl,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    },
    editing: {
        opacity: 0.5,
    },
    highlight: {
        opacity: 1,
    },
    dragHandle: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        minHeight: 220,
    },
}));

function DragnDrop({ slides, handlers, handleEditSlide, isEditing }) {
    const { classes, cx } = useStyles();

    const items = slides.map((slide, index) => (
        <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled={isEditing !== -1}>
            {(provided, snapshot) => (
                <Paper
                    key={index}
                    radius="md"
                    p="sm"
                    withBorder
                    className={cx(classes.card, {
                        [classes.dragging]: snapshot.isDragging,
                        [classes.editing]: isEditing !== -1,
                        [classes.highlight]: isEditing === index,
                    })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Stack justify="space-between" style={{ height: '100%' }}>
                        <Stack align="flex-start" justify="flex-start" spacing={0}>
                            <Center style={{ width: '100%' }}>
                                <div className={classes.dragHandle} {...provided.dragHandleProps}>
                                    <IconGripHorizontal size={30} stroke={2} />
                                </div>
                            </Center>
                            <Text size="md" weight={600}>
                                {slide.data.graphicalFeature}
                            </Text>
                            <Text size="sm" color="dimmed" lineClamp={3}>
                                {slide.data.description}
                            </Text>
                        </Stack>
                        <Group position="apart">
                            <Tooltip label={isEditing === index ? 'Cancel Edit' : 'Edit Slide'}>
                                <ActionIcon
                                    size="lg"
                                    radius="md"
                                    variant="filled"
                                    color={isEditing === index ? 'red' : 'blue'}
                                    label="Edit Slide"
                                    onClick={() => handleEditSlide(index)}
                                >
                                    {isEditing === index ? <IconX size={25} stroke={3} /> : <IconTools size={25} />}
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Delete Slide">
                                <ActionIcon
                                    size="lg"
                                    radius="md"
                                    variant="filled"
                                    color="red"
                                    label="Delete Slide"
                                    onClick={() => {
                                        handlers.remove(index);
                                        handleEditSlide(-1);
                                    }}
                                >
                                    <IconTrashX size={25} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Stack>
                </Paper>
            )}
        </Draggable>
    ));

    return (
        <Grid.Col span={12} style={{ width: '100%' }}>
            <Paper withBorder radius="md" p="sm" style={{ overflowX: 'auto' }} className="tour__dragdrop">
                <Stack spacing={0}>
                    <Text size="lg" weight={600}>
                        Slides
                    </Text>
                    <Text size="xs" color="dimmed">
                        Drag and drop to reorder
                    </Text>
                </Stack>
                <DragDropContext
                    onDragEnd={({ destination, source }) =>
                        handlers.reorder({ from: source.index, to: destination?.index || 0 })
                    }
                >
                    <Droppable droppableId="dnd-list" direction="horizontal">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className={classes.container}>
                                {items}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Paper>
        </Grid.Col>
    );
}

export default DragnDrop;
