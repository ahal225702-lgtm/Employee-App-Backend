require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
app.use(express.json());
// Task1: initiate app and run server at 3000


app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below




const Employee = mongoose.model('Employee', new mongoose.Schema({
    name: String,
    location: String,
    position: String,
    salary: Number
}));

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/api/employeelist', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/employeelist', async (req, res) => {
    try {
        const { _id, name, location, position, salary } = req.body;

        if (!_id) {
            return res.status(400).json({ message: 'Employee ID is required' });
        }

        const employee = await Employee.findByIdAndUpdate(
            _id,
            { name, location, position, salary },
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


//TODO: get single data from db  using api '/api/employeelist/:id'





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}






//TODO: delete a employee data from db by using api '/api/employeelist/:id'





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/{*path}', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


