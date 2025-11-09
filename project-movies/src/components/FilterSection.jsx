import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const FilterSection = ({ movies = [], setFilteredMovies, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const years = (Array.isArray(movies) && movies.length > 0) ? movies.map(m => m.year) : [];
  const minYearFromData = years.length ? Math.min(...years) : 1990;
  const maxYearFromData = years.length ? Math.max(...years) : new Date().getFullYear();

  const [yearRange, setYearRange] = useState([minYearFromData, maxYearFromData]);

  useEffect(() => {
    setYearRange([minYearFromData, maxYearFromData]);
  }, [minYearFromData, maxYearFromData]);

  const allGenres = Array.isArray(movies) && movies.length
    ? [...new Set(movies.flatMap(movie => movie.genre || []))]
    : [];

  useEffect(() => {
    if (!Array.isArray(movies) || movies.length === 0) {
      setFilteredMovies([]);
      return;
    }

    let filtered = movies.filter(movie => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase());


      const matchesGenre = !selectedGenre || (movie.genre || []).includes(selectedGenre);
      const matchesYear = (typeof movie.year === 'number') ? (movie.year >= yearRange[0] && movie.year <= yearRange[1]) : true;
      return matchesSearch && matchesGenre && matchesYear;
    });


    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
    setCurrentPage && setCurrentPage(1);
  }, [searchTerm, selectedGenre, sortBy, yearRange, movies, setFilteredMovies, setCurrentPage]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSortBy('rating');
    setYearRange([minYearFromData, maxYearFromData]);
  };

  // 2 slider
  const handleMinYearChange = (value) => {
    const val = parseInt(value, 10);
    const minAllowed = minYearFromData;
    const maxAllowed = Math.min(val + 1, yearRange[1] - 1);
    const newMin = Math.max(minAllowed, Math.min(val, yearRange[1] - 1));
    setYearRange([newMin, yearRange[1]]);
  };

  const handleMaxYearChange = (value) => {
    const val = parseInt(value, 10);
    const newMax = Math.min(maxYearFromData, Math.max(val, yearRange[0] + 1));
    setYearRange([yearRange[0], newMax]);
  };

  return (
    <div className="filter-section mb-4">
      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search Movies</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by title or director..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-box"
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="search-box"
            >
              <option value="">All Genres</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="search-box"
            >
              <option value="rating">Rating</option>
              <option value="year">Year</option>
              <option value="title">Title</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>
              Year Range: {yearRange[0]} - {yearRange[1]}
            </Form.Label>
            <div className="d-flex flex-column">
              <Form.Range
                min={minYearFromData}
                max={maxYearFromData}
                value={yearRange[0]}
                onChange={(e) => handleMinYearChange(e.target.value)}
                aria-label="Minimum year"
              />
              <Form.Range
                min={minYearFromData}
                max={maxYearFromData}
                value={yearRange[1]}
                onChange={(e) => handleMaxYearChange(e.target.value)}
                aria-label="Maximum year"
              />
            </div>
            <div className="d-flex justify-content-between">
              <small>{minYearFromData}</small>
              <small>{maxYearFromData}</small>
            </div>
          </Form.Group>
        </Col>

        <Col md={1} className="d-flex align-items-end">
          <Button
            variant="outline-light"
            onClick={clearFilters}
            className="w-100"
          >
            Clear
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterSection;