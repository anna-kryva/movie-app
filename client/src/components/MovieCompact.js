import React from 'react';

export default function MovieCompact({movie}) {    
  return (
    <div className="card movie-compact">
      <div className='card-body movie-compact__body'>
        <p>{movie.title}</p>
        <a className="btn btn-primary movie-compact__button">Open</a>
      </div>
    </div>
  );
};