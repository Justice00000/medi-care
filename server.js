const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY; // Secret key for JWT

app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/signup', (req, res) => {
    const { username, password, role, ...additionalData } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword, role, ...additionalData });

    res.json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

app.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});