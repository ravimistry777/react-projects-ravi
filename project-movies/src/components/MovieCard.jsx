import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye, FaStar } from "react-icons/fa";

const MovieCard = ({ movie, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <Card className="movie-card h-100 position-relative" onClick={() => navigate(`/movie/${movie.id}`)} style={{ cursor: 'pointer' }}>
            <div className="card-img-container position-relative overflow-hidden">
                {/* Blurred Background Layer for Fit */}
                <div 
                    className="position-absolute w-100 h-100" 
                    style={{ 
                        backgroundImage: `url(${movie.poster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(10px) brightness(0.5)',
                        transform: 'scale(1.1)' // Prevent blur edges
                    }}
                />
                
                {/* Main Poster Image - Contained */}
                <Card.Img
                    variant="top"
                    src={movie.poster}
                    alt={movie.title}
                    className="position-relative h-100 w-100"
                    style={{ objectFit: 'contain', zIndex: 1 }}
                />
                
                <div className="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center opacity-0 hover-opacity-100 transition-opacity bg-dark-overlay" style={{ zIndex: 2 }}>
                     <div className="d-flex gap-2">
                        <Button 
                            variant="light" 
                            size="sm" 
                            className="rounded-circle p-2 d-flex align-items-center justify-content-center border-0"
                            style={{ 
                                width: '40px', 
                                height: '40px',
                                background: '#DBC2A6', /* Beige */
                                color: '#414A37' /* Dark Olive Text */
                            }}
                            onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
                        >
                            <FaEye />
                        </Button>
                        <Button 
                            variant="dark" 
                            size="sm" 
                            className="rounded-circle p-2 d-flex align-items-center justify-content-center border border-light"
                            style={{ 
                                width: '40px', 
                                height: '40px',
                                background: '#99744A', /* Bronze */
                                color: '#fff'
                            }}
                            onClick={(e) => { e.stopPropagation(); onEdit(movie.id); }}
                        >
                            <FaEdit />
                        </Button>
                     </div>
                </div>

                <div className="rating-tag" style={{ zIndex: 3 }}>
                    <FaStar /> {movie.rating}
                </div>
            </div>

            <div className="p-2">
                <h6 className="fw-bold mb-0 text-truncate text-main" style={{ fontSize: '0.9rem' }}>{movie.title}</h6>
                <div className="d-flex justify-content-between align-items-center small text-muted mt-1">
                    <span>{movie.year}</span>
                    <span className="text-truncate" style={{ maxWidth: '60px' }}>{movie.genre?.[0]}</span>
                </div>
            </div>
        </Card>
    );
};

export default MovieCard;
