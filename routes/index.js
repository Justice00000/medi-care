const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.get('/hospital', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/hospital.html'));
});

router.get('/insurance', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/insurance.html'));
});

module.exports = router;