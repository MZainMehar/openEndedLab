const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const URI = "mongodb+srv://bookStore:bookStore@cluster0.epawflq.mongodb.net/bookStore?retryWrites=true&w=majority&appName=Cluster0";

// connect to mongoDB
mongoose.connect(URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error: " + error.message);
}); 

// Get the default connection
const db = mongoose.connection;

// Check for connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the schema
const Schema = mongoose.Schema;
const empSchema = new Schema({
  empNo: Number,
  firstName: String,
  midinit: String,
  lastName: String,
  workDeptId: String,
  phoneNo: String,
  hireDate: Date,
  job: String,
  edLevel: String,
  gender: String,
  birthDate: Date,
  salary: Number,
  bonus: Number,
  comm: Number,
});

// Create the model
const Employee = mongoose.model('Employee', empSchema);

// Routes
app.post('/employees', (req, res) => {
  const employee = new Employee(req.body);
  employee.save()
    .then(() => {
      res.status(201).send('Employee created successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error creating employee');
    });
});

app.get('/employees', (req, res) => {
  Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching employees');
    });
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  Employee.findOneAndDelete({ _id: id })
    .then(() => {
      res.send('Employee deleted successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error deleting employee');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
