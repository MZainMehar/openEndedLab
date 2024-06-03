import React, { useState, useEffect } from 'react';

const EmployeeTable = ({ setShowRecord }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch('http://localhost:8000/employees')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/employees/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Remove the deleted employee from the local state
        fetchEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div style={inputContainerStyle}>
        <button
          type="button"
          style={submitButtonStyle}
          onClick={() => setShowRecord(false)}
        >
          Add Record
        </button>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Employee Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.empNo}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>
                <button
                  onClick={() => handleDelete(employee._id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px'
};

const deleteButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0',
  width: '30%',
  alignItems: 'center',
  gap: 10
};

const submitButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default EmployeeTable;
