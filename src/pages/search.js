import { Box, Typography } from '@mui/material'
import SearchBox from '../components/searchBox'
import SearchImages from '../features/search/search'

const Search = () => {
  return (
    <>
      <Box mt='10px'>
        <Typography variant='h4' component='h1' align='center' fontWeight={600} sx={{ flexGrow: 1 }}>
        Use the most powerful photo engine in the world:
        </Typography>
        <SearchBox />
      </Box>
      <SearchImages />
    </>
  )
}

export default Search
