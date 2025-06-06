import React, { useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

type Props = {
  placeholder: string
}

const Search: React.FC<Props> = ({ placeholder }) => {
  const [searchTxt, setSearchTxt] = useState('')


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(event.target.value)
  }

  return (
    <>




      <TextField
        id='outlined-end-adornment'
        placeholder={placeholder}
        value={searchTxt}
        onChange={handleChange}
        sx={{ minWidth: "350px" }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    </>


  )
}

export default Search
