import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function ArtistCard({ searched_artists }) {
  return (
    <Row className='mx-2 row row-cols-4'>
    {searched_artists
      .filter(artist => artist.images && artist.images.length > 0) // Filter out artists without images
      .map((artist, i) => (
        <Card key={i}>
          <Card.Img src={artist.images[0].url} alt={artist.name} className="square-image" />
          <Card.Body>
            <Card.Title>{artist.name}</Card.Title>
          </Card.Body>
        </Card>
      ))
    }
  </Row>
  )
}

export default ArtistCard;