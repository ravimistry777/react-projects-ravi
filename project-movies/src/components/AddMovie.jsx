import { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { getStorageData, setStorageData } from "../services/storageData";

const AddMovie = ({ show, handleClose,onAddMovie }) => {
    const initialState = {
        title: "",
        director: "",
        year: "",
        rating: "",
        genre: "",
        duration: "",
        description: "",
        poster: "",
        cast: ""
    }

    const [inputForm, setInputForm] = useState(initialState);

    const handleChanged = (e) => {
        const {name, value} = e.target;
        setInputForm({
            ...inputForm,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = Date.now().toString();
        const movieData = {
            id: newId,
            title: inputForm.title,
            director: inputForm.director,
            year: parseInt(inputForm.year),
            rating: parseFloat(inputForm.rating),
            genre: inputForm.genre.split(',').map(g => g.trim()),
            duration: inputForm.duration,
            description: inputForm.description,
            poster: inputForm.poster,
            cast: inputForm.cast.split(',').map(c => c.trim()),
            music: ""
        };

        let data = getStorageData();
        data.push(movieData);
        setStorageData(data);
        setInputForm(initialState);
        handleClose();
        window.location.reload();
    }

    const handleCloseModal = () => {
        setInputForm(initialState);
        handleClose();
    }

    return(
        <Modal show={show} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton className="bg-dark text-white">
                <Modal.Title>Add Movie Details</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Title *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                name="title" 
                                value={inputForm.title} 
                                onChange={handleChanged} 
                                placeholder="Enter Movie Title" 
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Director *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                name="director" 
                                value={inputForm.director} 
                                onChange={handleChanged} 
                                placeholder="Enter Director Name" 
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Year *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="number" 
                                name="year" 
                                value={inputForm.year} 
                                onChange={handleChanged} 
                                placeholder="Enter Release Year" 
                                min="1900"
                                max="2030"
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Rating *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="number" 
                                name="rating" 
                                value={inputForm.rating} 
                                onChange={handleChanged} 
                                placeholder="Enter Rating (0-10)" 
                                step="0.1"
                                min="0"
                                max="10"
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Genre *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                name="genre" 
                                value={inputForm.genre} 
                                onChange={handleChanged} 
                                placeholder="Action, Drama, Sci-Fi" 
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Duration *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                name="duration" 
                                value={inputForm.duration} 
                                onChange={handleChanged} 
                                placeholder="2h 22m" 
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Poster URL *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                name="poster" 
                                value={inputForm.poster} 
                                onChange={handleChanged} 
                                placeholder="https://themeg.com/poster.jpg" 
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Cast *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                type="text" 
                                name="cast" 
                                value={inputForm.cast} 
                                onChange={handleChanged} 
                                placeholder="Actor 1, Actor 2, Actor 3" 
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Description *
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                name="description" 
                                value={inputForm.description} 
                                onChange={handleChanged} 
                                placeholder="Enter movie plot description..." 
                                required
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="success">
                        Add Movie
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddMovie;