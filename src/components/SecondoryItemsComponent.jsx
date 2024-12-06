import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from '../Contexts/SearchContext';

const SecondoryItemsComponent = () => {

  const { setSearch } = useContext(SearchContext);

  const setSearchResult = (e) => {
    setSearch(e.target.value);
  }


  return (
    <Box sx={{ marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h4' gutterBottom>
            Cameras
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
            Manage your cameras here.
          </Typography>
        </Box>
        <Box>
          <TextField
            sx={{
              marginTop: '2px',
              border: '1px',
              '& .MuiOutlinedInput-root': {
                height: '40px',
                backgroundColor: '#F3F3F4'
              },
            }}
            variant="outlined"
            placeholder="search"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={setSearchResult}
          />
        </Box>
      </Box>
  )
}

export default SecondoryItemsComponent
