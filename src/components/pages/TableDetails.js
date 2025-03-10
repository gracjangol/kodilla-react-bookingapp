import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTables, editTable } from '../../redux/tablesRedux';
import { Form, Button, Row, Col, InputGroup, Container } from 'react-bootstrap';

const TableDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tables = useSelector(getTables);
  const table = tables.find((t) => t.id === id);

  const [status, setStatus] = useState(table?.status || "Free");
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table?.maxPeopleAmount || 4);
  const [bill, setBill] = useState(table?.bill || 0);

  useEffect(() => {
    if (!table) {
      navigate('/');
    }
  }, [table, navigate]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (newStatus === "Free" || newStatus === "Cleaning") {
      setPeopleAmount(0);
    }

    if (newStatus === "Busy") {
      setBill(0);
    }
  };

  const handleMaxPeopleChange = (value) => {
    const newMaxPeople = Math.min(Math.max(value, 1), 10);
    setMaxPeopleAmount(newMaxPeople);
    if (peopleAmount > newMaxPeople) {
      setPeopleAmount(newMaxPeople);
    }
  };

  const handlePeopleChange = (value) => {
    const newPeopleAmount = Math.min(Math.max(value, 0), maxPeopleAmount);
    setPeopleAmount(newPeopleAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTable({
      id,
      status,
      peopleAmount,
      maxPeopleAmount,
      bill: status === "Busy" ? bill : 0,
    }));
    navigate('/');
  };

  return (
    <Container className="p-4" style={{ maxWidth: '400px' }}>
      <h1>Table {id}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-2" controlId="status">
          <Form.Label column sm={4}>Status:</Form.Label>
          <Col sm={8}>
            <Form.Select value={status} onChange={handleStatusChange}>
              <option>Free</option>
              <option>Reserved</option>
              <option>Busy</option>
              <option>Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="people">
          <Form.Label column sm={4}>People:</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="number"
              value={peopleAmount}
              onChange={(e) => handlePeopleChange(Number(e.target.value))}
              disabled={status === "Free" || status === "Cleaning"}
            />
          </Col>
          <Col sm={1} className="text-center">/</Col>
          <Col sm={3}>
            <Form.Control
              type="number"
              value={maxPeopleAmount}
              onChange={(e) => handleMaxPeopleChange(Number(e.target.value))}
            />
          </Col>
        </Form.Group>

        {status === "Busy" && (
          <Form.Group as={Row} className="mb-2" controlId="bill">
            <Form.Label column sm={4}>Bill:</Form.Label>
            <Col sm={8}>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                />
              </InputGroup>
            </Col>
          </Form.Group>
        )}

        <Button type="submit" variant="primary" className="mt-3 w-100">Update</Button>
      </Form>
    </Container>
  );
};

export default TableDetails;