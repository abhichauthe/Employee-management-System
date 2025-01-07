const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create Employee
router.post('/', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get all Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort('-joinDate');
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get single Employee
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }
        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Update Employee
router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }
        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
