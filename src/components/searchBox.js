import { Box, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setSearchTerm } from '../features/search/searchSlice'

const SearchBox = () => {
  const dispatch = useDispatch()
  return (
    <Box mt='5px'>
      <TextField label='Search...' id='searchTerm' onChange={e => dispatch(setSearchTerm(e.target.value))} />
    </Box>
  )
}

export default SearchBox