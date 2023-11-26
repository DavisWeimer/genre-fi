import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import useSpotifyToken from '../../hooks/useSpotifyToken';
import SearchBar from '../SearchBar/SearchBar'
import ArtistCard from '../ArtistCard/ArtistCard.js';

function App() {
  const accessToken = useSpotifyToken();
  const [searchedArtists, setSearchedArtists] = useState([]); 


  function newArtists(artists) {
    setSearchedArtists(artists)
  }

  return (
    <div className='App'>
      <Container>
        <SearchBar 
          access_token={accessToken} 
          new_artists={newArtists}
        />
      </Container>
      <Container></Container>
        <ArtistCard 
          searched_artists={searchedArtists}
        />
      </Container>
    </div>
  );
}

export default App;
