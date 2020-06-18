import React, { useState, useCallback, useEffect } from 'react';
import MovieList from './MovieList';
import { useHttp } from '../hooks/http.hook';

export default function HomePage () {
  const { request } = useHttp();
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    try {
        const data = await request('/api/movies/', 'GET');
        setMovies(data.movies);
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  useEffect(() => {
    getMovies();
    console.log(movies);
  }, []);

  return (
    <div>
        {/* <Search /> */}
        <MovieList movies={movies} />
    </div>
  );
};