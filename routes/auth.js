const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Mock database functions (you should replace these with your actual database logic)
const users = []; // In-memory user storage for demonstration

const createUser = (username, hashedPassword, callback) => {
    const user = { id: users.length + 1, username, password: hashedPassword };
    users.push(user);
    callback(null);
};

const findUserByUsername = (username, callback) => {
    const user = users.find(user => user.username === username);
    if (user) {
        callback(null, user);
    } else {
        callback('User not found');
    }
};

// Route to serve the login page (GET request)
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Serve your login.html file
});

// Registration route
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

// Login route
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

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/');
    });
});

module.exports = router;