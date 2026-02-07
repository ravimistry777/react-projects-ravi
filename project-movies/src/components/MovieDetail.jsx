import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FaArrowLeft, FaPlay, FaPause } from "react-icons/fa";
import { getStorageData } from "../services/storageData";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const data = getStorageData();
    const foundMovie = data.find(m => String(m.id) === String(id));
    if (foundMovie) {
      setMovie(foundMovie);
    }
  }, [id]);

  useEffect(() => {
    if (movie && movie.music) {
      audioRef.current = new Audio(movie.music);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      // Autoplay attempt
      const playAudio = () => {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.warn("Autoplay blocked. User interaction needed:", err));
      };

      playAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [movie]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback failed:", err));
    }
  };

  if (!movie) return <div className="text-center py-5 text-muted">Loading...</div>;

  return (
    <div className="movie-detail-container pb-5 position-relative">
      <div className="detail-backdrop">
        <img src={movie.poster} alt="" className="detail-backdrop-img" />
      </div>
      
      <Container className="position-relative">
        <Button
          onClick={() => navigate("/")}
          className="mb-4 d-flex align-items-center gap-2 btn-premium-outline"
          style={{ width: 'fit-content' }}
        >
          <FaArrowLeft /> BACK TO GALLERY
        </Button>

        <Row className="g-5">
          <Col lg={4}>
            <div className="detail-poster-wrapper shadow-lg">
              <img
                src={movie.poster}
                alt={movie.title}
                className="img-fluid rounded-3"
                style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
              />
            </div>
          </Col>

          <Col lg={8}>
            <div className="ps-md-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Badge className="px-3 py-2" style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>
                  {movie.rating} IMDB
                </Badge>

                <Button
                  onClick={toggleMusic}
                  className="btn-premium px-4 d-flex align-items-center gap-2"
                  style={{ borderRadius: '50px', padding: '8px 20px' }}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                  {isPlaying ? "PAUSE THEME" : "PLAY THEME"}
                </Button>

                {isPlaying && (
                  <div className="music-indicator">
                    <div className="music-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <small className="fw-bold" style={{ color: 'var(--accent)' }}>THEME PLAYING</small>
                  </div>
                )}
              </div>

              <h1 className="display-3 fw-bold mb-2" style={{ color: 'var(--text-main)' }}>{movie.title}</h1>
              <p className="fw-bold fs-5 mb-4" style={{ color: 'var(--accent)' }}>{movie.year} • {movie.director} • {movie.duration}</p>

              <div className="mb-4">
                <h5 className="text-uppercase small letter-spacing-2 mb-3" style={{ color: 'var(--text-muted)' }}>Plot Summary</h5>
                <p className="fs-5 leading-relaxed" style={{ maxWidth: '800px', color: 'var(--text-main)' }}>
                  {movie.description}
                </p>
              </div>

              <Row className="mb-4">
                <Col md={6}>
                  <h5 className="text-uppercase small letter-spacing-2 mb-3" style={{ color: 'var(--text-muted)' }}>Key Genres</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {movie.genre?.map((g, i) => (
                      <Badge 
                        key={i} 
                        className="px-3 py-2 border"
                        style={{ backgroundColor: 'var(--surface-alt)', color: 'var(--text-main)', borderColor: 'var(--border)' }}
                      >
                        {g}
                      </Badge>
                    ))}
                  </div>
                </Col>
                <Col md={6}>
                  <h5 className="text-uppercase small letter-spacing-2 mb-3" style={{ color: 'var(--text-muted)' }}>Starring</h5>
                  <p style={{ color: 'var(--text-secondary)' }}>{Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast}</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
