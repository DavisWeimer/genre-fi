import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Card, Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';

// // Search by Genre!

// async function searchByGenre() {
//   var searchParameters = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + access_token
//     }
//   }

//   await fetch('https://api.spotify.com/v1/search?q=' + clickedGenre + '&type=genre&market=US', searchParameters)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//         new_artists(data.artists.items)
//       })
// }

function ArtistCard({ searched_artists, access_token }) {
  return (
    <Row className='row row-cols-4'>
    {searched_artists
      .filter(artist => artist.images && artist.genres.length > 0 && artist.images.length > 0) // Filter out artists without images
      .map((artist, i) => (
        <Card key={i} style={{ width: '15rem' }}>
          <Card.Img src={artist.images[0].url} alt={artist.name} className="square-image" />
          <Card.Body>
            <Card.Title>{artist.name}</Card.Title>
            <ButtonGroup>
              <DropdownButton as={ButtonGroup} title="Genres" id="bg-nested-dropdown">
                {artist.genres.map(((genre, i) => {
                  return <Dropdown.Item eventKey={i}>{genre}</Dropdown.Item>
                }))}
              </DropdownButton>
            </ButtonGroup>
          </Card.Body>
        </Card>
      ))
    }
  </Row>
  )
}

export default ArtistCard;
