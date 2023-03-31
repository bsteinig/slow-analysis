import { Grid } from '@mantine/core'
import React from 'react'

// Sometimes we need to wrap a component in a Grid to get it to render properly
// You only need to use this when testing the build dependencies

function TestWrapper({component}) {
  return (
    <Grid>
        {component}
    </Grid>
  )
}

export default TestWrapper