const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/database');
const router = express.Router();

const saltRounds = 10;

// Serve the login.html file
router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});

// Handle login form submission
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).send('Error occurred');
        }
        if (!user) {
            return res.redirect('/auth/login');
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.user = { username: user.username };
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
            }
        });
    });
});

// Serve the register.html file
router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: 'public' });
});

// Handle registration form submission
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error occurred');
        }
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) {
                return res.status(500).send('Error occurred');
            }
            res.redirect('/auth/login');
        });
    });
});

// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;