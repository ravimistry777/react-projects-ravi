import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const MovieDetail = ({ movies = [] }) => {
  const { id } = useParams();

  useEffect(() => {
    const movie = movies.find(m => m.id === parseInt(id, 10));
    let audio;

    if (movie && movie.music) {
      audio = new Audio(movie.music);
      audio.volume = 1;
      audio.play().catch(err => console.log("Autoplay blocked:", err));
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [id, movies]);

  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <Container className="text-center py-5">
        <h2>Loading...</h2>
        <p>Movie data is not available right now.</p>
        <Link to="/">
          <Button variant="primary" className="mt-3">
            Back to Movies
          </Button>
        </Link>
      </Container>
    );
  }

  const movie = movies.find(m => m.id === parseInt(id, 10));

  if (!movie) {
    return (
      <Container className="text-center py-5">
        <h2>Movie not found</h2>
        <Link to="/">
          <Button variant="primary" className="mt-3">
            Back to Movies
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Link to="/">
        <Button variant="outline-light" className="mb-4">
          ← Back to Movies
        </Button>
      </Link>
      
      <Row className="g-4">
        <Col md={4}>
          <Card className="border-0">
            <Card.Img 
              variant="top" 
              src={movie.poster} 
              className="movie-detail-poster"
            />
          </Card>
        </Col>
        
        <Col md={8}>
          <div className="text-white">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h1 className="display-4 fw-bold">{movie.title}</h1>
              <Badge bg="warning" text="dark" className="fs-6 p-2">
                ★ {movie.rating}/10
              </Badge>
            </div>
            
            <div className="mb-4">
              {(movie.genre || []).map((genre, index) => (
                <Badge 
                  key={index} 
                  bg="outline-light" 
                  text="light" 
                  className="me-2 mb-2 fs-6 p-2"
                >
                  {genre}
                </Badge>
              ))}
            </div>
            
            <Row className="mb-4">
              <Col sm={6}>
                <p><strong>Year:</strong> {movie.year}</p>
                <p><strong>Duration:</strong> {movie.duration}</p>
              </Col>
              <Col sm={6}>
                <p><strong>Director:</strong> {movie.director}</p>
              </Col>
            </Row>
            
            <div className="mb-4">
              <h4>Overview</h4>
              <p className="fs-5">{movie.description}</p>
            </div>
            
            <div className="mb-4">
              <h4>Cast</h4>
              <Row>
                {(movie.cast || []).map((actor, index) => (
                  <Col key={index} xs={6} sm={4} md={3}>
                    <p className="mb-1">• {actor}</p>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
