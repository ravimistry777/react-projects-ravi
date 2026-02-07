import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import MovieCard from './MovieCard';
import FilterSection from './FilterSection';

const MovieList = ({ movies = [], filteredMovies = [], setFilteredMovies, onEditMovie }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const moviesPerPage = 6; // 6 movies per page as requested

  useEffect(() => {
    let result = [...movies];

    if (searchQuery) {
      result = result.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.director.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      result = result.filter(m => (m.genre || []).includes(selectedGenre));
    }

    if (selectedRating > 0) {
      result = result.filter(m => m.rating >= selectedRating);
    }

    setFilteredMovies(result);
  }, [movies, searchQuery, selectedGenre, selectedRating, setFilteredMovies]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredMovies]);

  const categories = [...new Set(movies.flatMap(m => m.genre || []))];

  const handleReset = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setSelectedRating(0);
  };

  const activeFiltered = Array.isArray(filteredMovies) ? filteredMovies : [];

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = activeFiltered.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.max(1, Math.ceil(activeFiltered.length / moviesPerPage));

  const paginate = (pageNumber) => {
    const page = Math.max(1, Math.min(totalPages, pageNumber));
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="hero-section fade-in-up">
        <h1 className="hero-title">Cinema Collection</h1>
        <p className="hero-subtitle">Curated masterpieces for the modern cinephile.</p>
      </div>

      <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
        <FilterSection
          categories={categories}
          onSearch={setSearchQuery}
          onFilter={setSelectedGenre}
          onRatingChange={setSelectedRating}
          onReset={handleReset}
          searchQuery={searchQuery}
          selectedGenre={selectedGenre}
          selectedRating={selectedRating}
        />
      </div>

      <Row className="g-4">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie, index) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={4} className="fade-in-up" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
              <MovieCard
                movie={movie}
                onEdit={onEditMovie}
                onDelete={(id) => {
                  if (window.confirm("Are you sure you want to delete this movie?")) {
                    const savedMovies = JSON.parse(localStorage.getItem("movieManiaMovies") || "[]");
                    const updated = savedMovies.filter(m => String(m.id) !== String(id));
                    localStorage.setItem("movieManiaMovies", JSON.stringify(updated));
                    window.location.reload();
                  }
                }}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5">
              <h3 className="text-muted">No movies found</h3>
              <p className="text-muted opacity-75">Try adjusting your search or filters</p>
            </div>
          </Col>
        )}
      </Row>

      {activeFiltered.length > moviesPerPage && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination className="custom-pagination">
            <Pagination.First 
              disabled={currentPage === 1}
              onClick={() => paginate(1)}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            />
            {pageNumbers.map(number => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
              >
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            />
            <Pagination.Last 
              disabled={currentPage === totalPages}
              onClick={() => paginate(totalPages)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default MovieList;