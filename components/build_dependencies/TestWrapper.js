import { Grid } from '@mantine/core'
import React from 'react'

function TestWrapper({component}) {
  return (
    <Grid>
        {component}
    </Grid>
  )
}

export default TestWrapper