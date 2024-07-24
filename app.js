const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// In-memory user storage for simplicity
const users = [];

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check if user is logged in
function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

// Routes
app.get('/', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/auth/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/auth/register', async (req, res) => {
    const { username, password, role, ...additionalData } = req.body;

    // Check if the user already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user data
    users.push({ username, password: hashedPassword, role, ...additionalData });

    res.json({ message: 'Registration successful!' });
});

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);

    // If user not found or password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Save user information in the session
    req.session.user = { username };

    res.json({ message: 'Login successful!' });
});

// Additional routes for hospital and insurance pages
app.get('/hospital', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hospital.html'));
});

app.get('/insurance', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'insurance.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});