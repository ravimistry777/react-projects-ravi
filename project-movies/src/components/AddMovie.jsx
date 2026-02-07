import { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { getStorageData, setStorageData } from "../services/storageData";

const AddMovie = ({ show, handleClose }) => {
    const initialState = {
        title: "",
        director: "",
        year: "",
        rating: "",
        genre: "",
        duration: "",
        description: "",
        poster: "",
        cast: "",
        music: ""
    }

    const [inputForm, setInputForm] = useState(initialState);

    const handleChanged = (e) => {
        const { name, value } = e.target;
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
            music: inputForm.music
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

    return (
        <Modal show={show} onHide={handleCloseModal} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Add New Movie</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Movie Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={inputForm.title}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="Enter title"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Director</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="director"
                                    value={inputForm.director}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="Enter director name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="year"
                                    value={inputForm.year}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="Year"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="rating"
                                    value={inputForm.rating}
                                    onChange={handleChanged}
                                    step="0.1"
                                    max="10"
                                    min="0"
                                    className="modern-input"
                                    placeholder="Rating"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Genre (comma separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="genre"
                                    value={inputForm.genre}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="Action, Drama"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Duration</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="duration"
                                    value={inputForm.duration}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="e.g. 2h 30m"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Poster URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="poster"
                                    value={inputForm.poster}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="https://..."
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Background Music URL (Optional)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="music"
                                    value={inputForm.music}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="Enter song URL"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Main Cast (comma separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cast"
                                    value={inputForm.cast}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="Cast names"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="form-label">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={inputForm.description}
                                    onChange={handleChanged}
                                    className="modern-input"
                                    placeholder="Movie description..."
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button type="submit" className="btn-premium">
                        Add Movie
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddMovie;
