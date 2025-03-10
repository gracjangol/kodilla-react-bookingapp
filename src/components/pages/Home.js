import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTables, fetchTables } from '../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const tables = useSelector(getTables);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <>
      <h1>All Tables</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td><h3>Table {table.id}</h3></td>
              <td><span className={styles.status}>Status:</span> {table.status}</td>
              <td>
                <Button as={Link} to={`/table/${table.id}`} variant="primary">Show more</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default Home;
