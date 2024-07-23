const express = require('express');
const router = express.Router();

// Serve the index.html file
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
};

// Serve the hospital.html and insurance.html files if authenticated
router.get('/hospital', isAuthenticated, (req, res) => {
    res.sendFile('hospital.html', { root: 'public' });
});

router.get('/insurance', isAuthenticated, (req, res) => {
    res.sendFile('insurance.html', { root: 'public' });
});

module.exports = router;