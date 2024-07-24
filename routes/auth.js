const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUserByUsername } = require('../models/user');

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    createUser(username, hashedPassword, (err) => {
        if (err) {
            return res.status(500).send('Error registering new user.');
        }
        res.send('User registered successfully.');
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    findUserByUsername(username, (err, user) => {
        if (err || !user) {
            return res.status(400).send('Invalid credentials.');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            req.session.userId = user.id;
            res.send('Login successful');
        } else {
            res.status(400).send('Invalid credentials.');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/');
    });
});

module.exports = router;