import React from 'react';
import { Placeholder } from 'react-bootstrap';

const PlaylistPlaceholder = ({ style, count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Placeholder key={index} as="a" style={style} animation="glow">
          <Placeholder xs={2} style={{ marginRight: '10px' }} />
          <Placeholder xs={7} />
        </Placeholder>
      ))}
    </>
  );
};

export default PlaylistPlaceholder;
