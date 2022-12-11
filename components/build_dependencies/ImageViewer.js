import { Grid, Paper } from '@mantine/core'
import React from 'react'

function ImageViewer() {
  return (
    <Grid.Col md={7} lg={8}>
        <Paper withBorder radius="md">
            <div>ImageViewer</div>
        </Paper>
    </Grid.Col>
  )
}

export default ImageViewer