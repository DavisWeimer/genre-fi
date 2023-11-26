import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Row, Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { CLIENT_SECRET, CLIENT_ID } from './client.js';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchedArtists, setSearchedArtists] = useState([]); 

  useEffect(() => {
    //API Access Token
  
    var authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(result => {
      if (!result.ok) {
        throw new Error(`Error: ${result.status}`);
      }
      return result.json();
    })
    .then(data => {
      setAccessToken(data.access_token);
    })
    .catch(error => {
      console.error('Error fetching access token:', error.message);
    });
  }, [])

  // SEARCH!
  async function search() {
    console.log("Search for " + searchInput);

    // GET request for Artists w/ search
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist&market=US', searchParameters)
      .then(response => response.json())
      .then(data => {
        setSearchedArtists(data.artists.items)
      })

    console.log(searchedArtists)
  }

  return (
    <div className='App'>
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl 
            placeholder={searchInput ? searchInput : 'Search For Artist'}
            type='input'
            onKeyDown={event => {
              if (event.key === 'Enter') {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search} >
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
        <Card>
          <Card.Img src='#'/>
          <Card.Body>
            <Card.Title>Artist Name</Card.Title>
          </Card.Body>
        </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
