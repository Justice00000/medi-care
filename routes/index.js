const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth'); // Ensure the path is correct

const app = express();

app.use(express.json());

app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Use the router for routes starting with /auth
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});