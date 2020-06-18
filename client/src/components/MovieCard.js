import React from 'react';
import { useHttp } from '../hooks/http.hook';

export default function MovieCard ({movie}) {
  const {request} = useHttp();

  const deleteHandler = async () => {
      try {
          const res = await request(`/api/movies/${movie._id}`, 'DELETE');
          console.log(res);
      } catch (e) {
        console.log(e);
      }
  };

  const returnHandler = () => {

  }

  return (
    <div className="card movie-card">
      <div className='card-body'>
        <h5 className="card-title">{movie.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{movie.releaseYear} {movie.format}</h6>
        <p className="card-text">{movie.stars.join(', ')}</p>
        <div className='movie-card__actions'>
          <a onClick={() => returnHandler()} className="btn btn-primary">Return to main page</a>
          <a onClick={() => deleteHandler()} className="btn btn-danger">Delete</a>
        </div>        
    </div>
  </div>
  );
};