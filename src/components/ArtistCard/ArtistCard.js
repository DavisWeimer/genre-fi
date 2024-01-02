import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Carousel, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

function ArtistCard({ searched_artists, access_token }) {
  const chunk = (arr, chunkSize) => {
    let result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const processedArtists = searched_artists
    .filter(artist => artist.images && artist.genres.length > 0 && artist.images.length > 0);
  const artistChunks = chunk(processedArtists, 6);

  return (
    <Carousel 
      style={{ paddingBottom: '1rem', margin: 'auto' }}
      indicators={true} 
      interval={10000}
      prevIcon={null}
      nextIcon={null}
    >
      {artistChunks.map((group, index) => (
        <Carousel.Item key={index} style={{ padding: '1rem' }}>
          <div className="d-flex flex-wrap justify-content-center">
            {group.map((artist, i) => (
              <Card key={i} style={{ 
                width: 'calc(33.333% - 2rem)', 
                margin: '1rem', 
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                background: 'linear-gradient(0deg, #585858ff 0%, #ffffffff 100%)',
                color: 'white'
              }}>
                <Card.Img variant="top" src={artist.images[0].url} alt={artist.name} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{artist.name}</Card.Title>
                  <ButtonGroup>
                    <DropdownButton as={ButtonGroup} title="Genres" size="sm" variant="dark">
                      {artist.genres.map(((genre, i) => {
                        return <Dropdown.Item key={i} eventKey={i}>{genre}</Dropdown.Item>
                      }))}
                    </DropdownButton>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ArtistCard;

// green #29ffbf
// purple #862fde
// gray #585858ff