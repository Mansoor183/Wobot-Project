import { Box } from '@mui/material'
import React from 'react'
import { HeaderIcon } from '../assets/svg'

const ImgComponent = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
        <HeaderIcon/>
    </Box>
  )
}

export default ImgComponent
