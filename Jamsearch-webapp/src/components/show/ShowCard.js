import React, { memo } from 'react';
// import { Link } from 'react-router-dom';
import { Star } from '../styled';
import { StyledShowCard } from './ShowCard.styled';

const ShowCard = ({ id, image, title, artist, onStarClick, isStarred }) => {
  // let artistsAsText = '';
  // artists.forEach(a => {
  //   artistsAsText += a;
  // });

  return (
    <StyledShowCard>
      <div className="img-wrapper">
        <img src={image} alt="show" />
      </div>

      <h1>{title}</h1>

      <p>{artist}</p>

      <div className="btns">
        <button
          type="button"
          onClick={() => {
            onStarClick(isStarred, id);
          }}
        >
          <Star active={isStarred} />
        </button>
      </div>
    </StyledShowCard>
  );
};

export default ShowCard;
