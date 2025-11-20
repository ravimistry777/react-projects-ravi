import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { getStorageData, setStorageData } from "../services/storageData";

const EditMovie = ({ show, handleClose, movieId, onUpdateMovie }) => {
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
        let data = getStorageData();
        const updatedMovie = {
            ...inputForm,
            genre: inputForm.genre.split(',').map(g => g.trim()),
            cast: inputForm.cast.split(',').map(c => c.trim()),
            year: parseInt(inputForm.year),
            rating: parseFloat(inputForm.rating)
        };

        let updateData = data.map(v => {
            if(v.id === inputForm.id){
                return updatedMovie
            }else{
                return v
            }
        })
        setStorageData(updateData);
        setInputForm(initialState);
        handleClose();
        
        window.location.reload();
    }

    useEffect(() => {
        if(movieId){
            let data = getStorageData();
            let rec = data.find(v => v.id === movieId);
            if(rec){
                setInputForm({
                    ...rec,
                    genre: Array.isArray(rec.genre) ? rec.genre.join(', ') : rec.genre,
                    cast: Array.isArray(rec.cast) ? rec.cast.join(', ') : rec.cast,
                    year: rec.year.toString(),
                    rating: rec.rating.toString()
                });
            }
        }
    }, [movieId]);

    const handleCloseModal = () => {
        setInputForm(initialState);
        handleClose();
    }

    return(
        <Modal show={show} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton className="bg-dark text-white">
                <Modal.Title>Edit Movie Details</Modal.Title>
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
                                required
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="warning">
                        Update Movie
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditMovie;