import { createActionName } from './utils';
import { API_URL } from '../config';

export const getTables = (state) => state.tables;


const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');


export const loadTables = (payload) => ({ type: LOAD_TABLES, payload });
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`) 
      .then((res) => res.json())
      .then((data) => dispatch(loadTables(data)))
      .catch((error) => console.error("Error fetching tables:", error));
  };
};

export const editTable = (table) => {
  return (dispatch) => {
    fetch(`${API_URL}/tables/${table.id}`, { 
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(table),
    })
      .then((res) => res.json())
      .then((updatedTable) => {
        console.log("Updated table:", updatedTable); 
        dispatch(updateTable(updatedTable));
      })
      .catch((error) => console.error("Error updating table:", error));
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
      return action.payload;
    case UPDATE_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? action.payload : table));
    default:
      return statePart;
  }
};
export default tablesReducer;
