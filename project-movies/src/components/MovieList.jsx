import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import MovieCard from './MovieCard';
import FilterSection from './FilterSection';

const MovieList = ({ movies = [], filteredMovies = [], setFilteredMovies, onEditMovie }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredMovies]);

  const activeFiltered = Array.isArray(filteredMovies) && filteredMovies.length > 0
    ? filteredMovies
    : Array.isArray(movies) ? movies : [];

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
      <FilterSection 
        movies={movies}
        setFilteredMovies={setFilteredMovies}
        setCurrentPage={setCurrentPage}
      />
      
      <Row className="g-4">
        {currentMovies.length > 0 ? (
          currentMovies.map(movie => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={4}>
              <MovieCard 
                movie={movie} 
                onEdit={onEditMovie}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5">
              <h3>No movies found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          </Col>
        )}
      </Row>

      {activeFiltered.length > moviesPerPage && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
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
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default MovieList;