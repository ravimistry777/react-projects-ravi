import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import { moviesData } from './data/moviesData';
import { getStorageData, setStorageData } from './services/storageData';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const savedMovies = getStorageData();
    if (savedMovies.length > 0) {
      setMovies(savedMovies);
      setFilteredMovies(savedMovies);
    } else {
      setStorageData(moviesData);
      setMovies(moviesData);
      setFilteredMovies(moviesData);
    }
  }, []);

  const handleEditMovie = (movieId) => {
    setSelectedMovieId(movieId);
    setShowEditModal(true);
  };

  return (
    <Router>
      <div className="App">
        <Navigation onAddMovieClick={() => setShowAddModal(true)} />
        <Container fluid className="mt-3">
          <Routes>
            <Route 
              path="/" 
              element={
                <MovieList 
                  movies={movies}
                  filteredMovies={filteredMovies}
                  setFilteredMovies={setFilteredMovies}
                  onEditMovie={handleEditMovie}
                />
              } 
            />
            <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
          </Routes>
        </Container>

        <AddMovie 
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
        />
        <EditMovie 
          show={showEditModal}
          handleClose={() => {
            setShowEditModal(false);
            setSelectedMovieId(null);
          }}
          movieId={selectedMovieId}
        />
      </div>
    </Router>
  );
}

export default App;