const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { createUser, findUserByUsername } = require('./models/User');

const app = express();
const router = express.Router();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for sessions
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Route to handle user registration
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

// Route to handle user login
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

// Route to handle user logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/');
    });
});

// Route to check if the user is logged in
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

// Use the router
app.use('/auth', router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});