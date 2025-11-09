import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card text-white h-100">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          className="movie-poster"
        />
        <Badge bg="warning" text="dark" className="rating-badge">
          ☆ {movie.rating}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{movie.title}</Card.Title>
        <Card.Text className="text-warning mb-2">
          {movie.year} • {movie.duration}
        </Card.Text>
        <Card.Text className="flex-grow-1">
          {movie.description.length > 100 
            ? `${movie.description.substring(0, 100)}...` 
            : movie.description
          }
        </Card.Text>
        <div className="mb-3">
          {movie.genre.map((genre, index) => (
            <Badge 
              key={index} 
              bg="outline-light" 
              text="light" 
              className="genre-badge"
            >
              {genre}
            </Badge>
          ))}
        </div>
        <Link to={`/movie/${movie.id}`}>
          <Button variant="outline-light" className="w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;