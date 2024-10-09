import { useState, useEffect } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../styles.css';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://fitnessapp-api-ln8u.onrender.com/workouts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error('Failed to fetch workouts', error);
    }
  };

  const addWorkout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://fitnessapp-api-ln8u.onrender.com/workouts',
        { name, duration, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchWorkouts();
      resetForm();
    } catch (error) {
      console.error('Failed to add workout', error);
    }
  };

  const editWorkout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://fitnessapp-api-ln8u.onrender.com/workouts/${currentWorkoutId}`,
        { name, duration, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchWorkouts();
      resetForm();
    } catch (error) {
      console.error('Failed to edit workout', error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://fitnessapp-api-ln8u.onrender.com/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchWorkouts();
    } catch (error) {
      console.error('Failed to delete workout', error);
    }
  };

  const handleEditClick = (workout) => {
    setEditing(true);
    setCurrentWorkoutId(workout._id);
    setName(workout.name);
    setDuration(workout.duration);
    setStatus(workout.status);
  };

  const resetForm = () => {
    setName('');
    setDuration('');
    setStatus('');
    setEditing(false);
    setCurrentWorkoutId(null);
  };

  return (
    <Container className="mt-4">
      <h2>Your Workouts</h2>
      <Form onSubmit={editing ? editWorkout : addWorkout} className="mt-4">
        <Form.Group controlId="workoutName" className="mb-2">
          <Form.Label>Workout Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="workoutDuration" className="mb-2">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="workoutStatus" className="mb-2">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editing ? 'Update Workout' : 'Add Workout'}
        </Button>
        {editing && (
          <Button variant="secondary" onClick={resetForm} className="ms-2">
            Cancel
          </Button>
        )}
      </Form>

      <Row className="mt-4">
        {workouts.map((workout) => (
          <Col md={4} key={workout._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{workout.name}</Card.Title>
                <Card.Text>
                  <strong>Duration:</strong> {workout.duration} minutes
                  <br />
                  <strong>Status:</strong> {workout.status}
                </Card.Text>
                <Button variant="warning" onClick={() => handleEditClick(workout)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteWorkout(workout._id)} className="ms-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Workouts;
