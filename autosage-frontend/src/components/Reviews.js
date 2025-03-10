import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, ListGroup, Container, Card } from "react-bootstrap";
import { NotebookPen } from "lucide-react";

const Reviews = ({ vehicleId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/reviews/${vehicleId}`)
      .then((res) => setReviews(res.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [vehicleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Please enter a comment!");

    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/reviews/${vehicleId}`, {
        rating,
        comment,
      });
      setReviews([res.data, ...reviews]); 
      setComment(""); 
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <h4 className="mt-4"><NotebookPen /> User Reviews</h4>

      {/* Review Form */}
      <Card className="p-3 mb-3 shadow">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Rating:</Form.Label>
            <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </Form>
      </Card>

      {/* Review List */}
      <ListGroup>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ListGroup.Item key={review._id} className="shadow-sm">
              <strong>⭐ {review.rating} Stars</strong> - {review.comment}
              <br />
              <small className="text-muted">Posted on {new Date(review.createdAt).toLocaleDateString()}</small>
            </ListGroup.Item>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default Reviews;
