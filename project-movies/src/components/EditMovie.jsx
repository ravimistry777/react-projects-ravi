import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { getStorageData, setStorageData } from "../services/storageData";

const EditMovie = ({ show, handleClose, movieId }) => {
    const initialState = {
        id: "",
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
        let data = getStorageData();
        const updatedMovie = {
            ...inputForm,
            genre: typeof inputForm.genre === 'string' ? inputForm.genre.split(',').map(g => g.trim()) : inputForm.genre,
            cast: typeof inputForm.cast === 'string' ? inputForm.cast.split(',').map(c => c.trim()) : inputForm.cast,
            year: parseInt(inputForm.year),
            rating: parseFloat(inputForm.rating)
        };

        let updateData = data.map(v => {
            if (v.id === inputForm.id) {
                return updatedMovie
            } else {
                return v
            }
        })
        setStorageData(updateData);
        setInputForm(initialState);
        handleClose();
        window.location.reload();
    }

    useEffect(() => {
        if (movieId) {
            let data = getStorageData();
            let rec = data.find(v => v.id === movieId);
            if (rec) {
                setInputForm({
                    ...rec,
                    genre: Array.isArray(rec.genre) ? rec.genre.join(', ') : rec.genre,
                    cast: Array.isArray(rec.cast) ? rec.cast.join(', ') : rec.cast,
                    year: rec.year.toString(),
                    rating: rec.rating.toString(),
                    music: rec.music || ""
                });
            }
        }
    }, [movieId]);

    const handleCloseModal = () => {
        setInputForm(initialState);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleCloseModal} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Edit Movie</Modal.Title>
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditMovie;
