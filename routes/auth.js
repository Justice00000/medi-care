const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUserByUsername } = require('../models/User');

const router = express.Router();

// Define your routes
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await createUser(username, hashedPassword);
        res.send('User registered successfully.');
    } catch (err) {
        res.status(500).send('Error registering new user.');
    }
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

router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        findUserByUsername(req.session.userId, (err, user) => {
            if (err || !user) {
                return res.status(500).send({ loggedIn: false });
            }
            res.send({ loggedIn: true, username: user.username });
        });
    } else {
        res.send({ loggedIn: false });
    }
});

module.exports = router;