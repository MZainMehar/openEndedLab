import { useState } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable';

function App() {
  const [showRecord, setShowRecord] = useState(false);
  const [formData, setFormData] = useState({
    empNo: '',
    firstName: '',
    midinit: '',
    lastName: '',
    workDeptId: '',
    phoneNo: '',
    hireDate: '',
    job: '',
    edLevel: '',
    gender: '',
    birthDate: '',
    salary: '',
    bonus: '',
    comm: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error creating employee');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage('Employee created successfully!');
        setFormData({
          empNo: '',
          firstName: '',
          midinit: '',
          lastName: '',
          workDeptId: '',
          phoneNo: '',
          hireDate: '',
          job: '',
          edLevel: '',
          gender: '',
          birthDate: '',
          salary: '',
          bonus: '',
          comm: ''
        });
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error creating employee');
      });
  };

  return (
    <div className="App">
      {showRecord ? (
        <EmployeeTable setShowRecord={setShowRecord} />
      ) : (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2>Employee Form</h2>
          {message && <p>{message}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={inputContainerStyle}>
              <label>Employee Number:</label>
              <input
                type="number"
                name="empNo"
                value={formData.empNo}
                onChange={handleChange}
                placeholder="Employee Number"
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={inputContainerStyle}>
              <label>Middle Initial:</label>
              <input
                type="text"
                name="midinit"
                value={formData.midinit}
                onChange={handleChange}
                placeholder="Middle Initial"
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={inputContainerStyle}>
              <label>Work Department ID:</label>
              <input
                type="text"
                name="workDeptId"
                value={formData.workDeptId}
                onChange={handleChange}
                placeholder="Work Department ID"
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone Number"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={inputContainerStyle}>
              <label>Hire Date:</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                placeholder="Hire Date"
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Job:</label>
              <input
                type="text"
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="Job"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={inputContainerStyle}>
              <label>Education Level:</label>
              <input
                type="text"
                name="edLevel"
                value={formData.edLevel}
                onChange={handleChange}
                placeholder="Education Level"
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Gender"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={inputContainerStyle}>
              <label>Birth Date:</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="Birth Date"
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Salary:</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Salary"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={inputContainerStyle}>
              <label>Bonus:</label>
              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                placeholder="Bonus"
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label>Commission:</label>
              <input
                type="number"
                name="comm"
                value={formData.comm}
                onChange={handleChange}
                placeholder="Commission"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={inputContainerStyle}>
            <button type="submit" style={submitButtonStyle}>
              Submit
            </button>
            <button
              type="button"
              style={submitButtonStyle}
              onClick={() => setShowRecord(true)}
            >
              Show Record
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
  margin: '0 auto'
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0',
  gap: 10
};

const inputStyle = {
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const submitButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default App;
