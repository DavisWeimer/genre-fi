import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Carousel, ButtonGroup, DropdownButton, Dropdown, Modal, Button, Pagination } from 'react-bootstrap';
import PlaylistPlaceholder from '../PlaylistPlaceholder/PlaylistPlaceholder';

function ArtistCard({ searched_artists, access_token }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const playlistsPerPage = 5;

  // MODAL LOGIC
  const handleOpenModal = (genre) => {
    setSelectedGenre(genre);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (showModal) {
      fetchPlaylists(selectedGenre);
    }
  }, [showModal, selectedGenre]);

  // MODAL STYLES
  const playlistRowStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    textDecoration: 'none',
    color: 'black',
    background: '#f8f9fa',
    borderRadius: '4px',
    marginBottom: '5px',
  };

  const playlistRowHoverStyle = {
    ...playlistRowStyle,
    background: '#e9ecef',
    cursor: 'pointer'
  };
  
  // PAGINATION LOGIC
  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPlaylist = currentPage * playlistsPerPage;
  const indexOfFirstPlaylist = indexOfLastPlaylist - playlistsPerPage;
  const currentPlaylists = playlist.slice(indexOfFirstPlaylist, indexOfLastPlaylist);

  const paginationItems = [];
  for (let number = 1; number <= Math.ceil(playlist.length / playlistsPerPage); number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} variant='dark' onClick={() => handlePaginationChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  // FETCH PLAYLISTS
  const fetchPlaylists = async (genre) => {
    const genreQuery = encodeURIComponent(`genre: ${selectedGenre}`)
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=playlist&q=${genreQuery}&market=US&limit=10`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      });

      if (!response.ok) {
        setErrorMessage(`No playlists found for genre: ${selectedGenre} 😵‍💫`);
        setPlaylist([]);
        return;
      }
  
      const data = await response.json();
      
      if (data.playlists && data.playlists.items.length > 0) {
        setPlaylist(data.playlists.items);
      } else {
        setErrorMessage(`No playlists found for ${genre} 🥲`);
        setPlaylist([]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`No playlists found for ${genre} 🥲`);
      setPlaylist([]);
    }
  };

  // RESPONSIVE CAROUSEL
  const chunk = (arr, chunkSize) => {
    let result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };
  const processedArtists = searched_artists
    .filter(artist => artist.images && artist.genres.length > 0 && artist.images.length > 0);

  const mobileChunkSize = 2; 
  const desktopChunkSize = 6; 
  const chunkSize = window.innerWidth < 768 ? mobileChunkSize : desktopChunkSize;
  const artistChunks = chunk(processedArtists, chunkSize);

  return (
    <>
      <Carousel 
        style={{ paddingBottom: '1rem', margin: 'auto' }}
        indicators={true} 
        interval={10000}
        prevIcon={null}
        nextIcon={null}
      >
        {artistChunks.map((group, index) => (
          <Carousel.Item key={index} style={{ padding: '1rem' }}>
            <div className="row justify-content-center">
              {group.map((artist, i) => (
                <div className="col-12 col-md-4">
                  <Card key={i} style={{
                      margin: '1rem',
                      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                  }}>
                    <Card.Img variant="top" src={artist.images[0].url} alt={artist.name} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                      <Card.Title>{artist.name}</Card.Title>
                      <ButtonGroup>
                        <DropdownButton as={ButtonGroup} title="Genres" size="sm" variant="dark">
                          {artist.genres.map(((genre, i) => {
                            return <Dropdown.Item onClick={() => handleOpenModal(genre)} key={i} eventKey={i}>{genre}</Dropdown.Item>
                          }))}
                        </DropdownButton>
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedGenre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {playlist.length === 0 ? (
          <PlaylistPlaceholder style={playlistRowStyle} />
        ) : (
          <>
            {currentPlaylists.map((item, index) => (
              <a
                key={index}
                href={item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={playlistRowStyle}
                onMouseOver={e => e.currentTarget.style.background = '#e9ecef'}
                onMouseOut={e => e.currentTarget.style.background = '#f8f9fa'}
              >
                <img src={item.images[0].url} alt={item.name} style={{ width: '28px', height: '28px', marginRight: '10px' }} />
                {item.name}
              </a>
            ))}
          </>
        )}
          <Pagination>{paginationItems}</Pagination>
        </Modal.Body>
        <Modal.Footer>
          <p>{errorMessage}</p>
          <Button variant="dark" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ArtistCard;

// green #29ffbf
// purple #862fde
// gray #585858ff