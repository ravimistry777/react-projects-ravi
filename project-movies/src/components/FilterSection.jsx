import { Button, Col, Form, Row } from "react-bootstrap";

const FilterSection = ({
  categories,
  onSearch,
  onFilter,
  onRatingChange,
  onReset,
  searchQuery,
  selectedGenre,
  selectedRating
}) => {
  return (
    <div className="filter-section">
      <Row className="g-4 align-items-end">
        <Col lg={4} md={6}>
          <Form.Group>
            <Form.Label className="form-label text-muted small fw-bold text-uppercase ls-1">Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title or director..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="modern-input"
            />
          </Form.Group>
        </Col>

        <Col lg={3} md={6}>
          <Form.Group>
            <Form.Label className="form-label text-muted small fw-bold text-uppercase ls-1">Genre</Form.Label>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => onFilter(e.target.value)}
              className="modern-input"
            >
              <option value="">All Genres</option>
              {categories.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={3} md={6}>
          <Form.Group>
            <Form.Label className="form-label d-flex justify-content-between text-muted small fw-bold text-uppercase ls-1">
              <span>Min Rating</span>
              <span className="text-primary fw-bold">{selectedRating}</span>
            </Form.Label>
            <Form.Range
              min="0"
              max="10"
              step="0.1"
              value={selectedRating}
              onChange={(e) => onRatingChange(e.target.value)}
              className="accent-range my-2"
              style={{ accentColor: 'var(--primary)' }}
            />
          </Form.Group>
        </Col>

        <Col lg={2} md={6}>
          <Button
            className="btn-premium-outline w-100"
            onClick={onReset}
          >
            Reset Filters
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterSection;
