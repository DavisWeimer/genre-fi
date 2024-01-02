import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';



function SearchBar({ access_token, new_artists }) {
  // SEARCH!
  async function search() {
    console.log("Search for " + searchInput);
  
    // GET request for Artists w/ search
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      }
    }
    await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist&market=US', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        new_artists(data.artists.items)
      })
  }

  const [searchInput, setSearchInput] = useState("");

  return (
    <InputGroup style={{ margin: 'auto', padding: '1rem' }} size='lg'>
      <FormControl 
        placeholder='Search For Artist'
        type='input'
        onKeyDown={event => {
          if (event.key === 'Enter') {
            search();
          }
        }}
        onChange={event => setSearchInput(event.target.value)}
      />
      <Button onClick={search}variant="dark">
        Search
      </Button>
    </InputGroup>
  )
}

export default SearchBar;