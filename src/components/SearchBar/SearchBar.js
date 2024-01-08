import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

function SearchBar({ access_token, new_artists }) {
  // Define a function to load options asynchronously
  const loadOptions = async (inputValue) => {
    if (!inputValue) {
      return [];
    }

    try {
      // GET request for Artists with search
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${inputValue}&type=artist&market=US`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log("data", data)
      // Transform the data into an array of options
      const options = data.artists.items.map((artist) => ({
        value: artist.id,
        label: artist.name
      }));

      return options;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleSelect = async (selectedOption) => {
    try {
      // Fetch the artist's details using the artist's ID
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${selectedOption.value}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch artist details');
      }

      const artistData = await response.json();

      // Call the new_artists function to update the state with the artist's details
      new_artists([artistData]);
      console.log("artistData", artistData)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleSelect} // Handle the selection of an artist
      />
    </>
  )
}

export default SearchBar;