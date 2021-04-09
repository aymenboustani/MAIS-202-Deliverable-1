import React, { useCallback } from 'react';
import ShowCard from './ShowCard';

import { FlexGrid } from '../styled';

import IMAGE_NOT_FOUND from '../../images/not-found.png';

const ShowGrid = ({ data, savedShows, updateSaved, reload }) => {
  const onStarClick = (isStarred, id) => {
    console.log('star got clicked');
    if (isStarred) {
      updateSaved('remove', id);
    } else {
      updateSaved('add', id);
    }
    reload();
  };

  return (
    <FlexGrid>
      {data.map(show => {
        const isStarred = savedShows.includes(show.id);

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            title={show.title}
            artist={show.artist}
            image={show.image ? show.image : IMAGE_NOT_FOUND}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
