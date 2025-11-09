import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { moviesData } from './data/moviesData';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
    setFilteredMovies(moviesData);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Container fluid className="mt-3">
          <Routes>
            <Route 
              path="/" 
              element={
                <MovieList 
                  movies={movies}
                  filteredMovies={filteredMovies}
                  setFilteredMovies={setFilteredMovies}
                />
              } 
            />
            <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;