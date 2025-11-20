import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getStorageData, setStorageData } from '../services/storageData';

const MovieCard = ({ movie, onEdit,onDeleteMovie }) => {
    const handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete "${movie.title}"?`)){
            let data = getStorageData();
            let updateData = data.filter(v => v.id !== movie.id);
            setStorageData(updateData);
            window.location.reload();
        }
    }

    return (
        <Card className="movie-card text-white h-100">
            <div className="position-relative">
                <Card.Img 
                    variant="top" 
                    src={movie.poster} 
                    className="movie-poster"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
                    }}
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
                    {movie.genre && movie.genre.map((genre, index) => (
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
                <div className="d-flex gap-2">
                    <Link to={`/movie/${movie.id}`} className="flex-grow-1">
                        <Button variant="outline-light" className="w-100">
                            View Details
                        </Button>
                    </Link>
                    <Button variant="outline-warning" onClick={() => onEdit(movie.id)}>
                        Edit
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MovieCard;