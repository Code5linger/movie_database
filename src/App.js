import React, { useEffect, useState } from 'react';

import Movie from './components/Movie';

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=34c3aec675f77f66c951e9d8ce8ec399&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/movie/550?api_key=34c3aec675f77f66c951e9d8ce8ec399`;  


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm) {

      fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });

    setSearchTerm('');
    }
    
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
  <>
    <header>
      <form onSubmit={handleOnSubmit}>
        <input  
                type="search" 
                className="search" 
                placeholder="Search..."
                value={searchTerm}
                onChange={handleOnChange}
        />
      </form>
    </header>

    <div className="movie-container">
      {movies.length > 0 && 
        movies.map((movie)=><Movie key={movie.id} {...movie}/>)}
      </div>
    </>
  );
}

export default App;
