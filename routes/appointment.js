const express = require('express');
const router = express.Router();

// Mock database function to save appointment (replace with actual database logic)
const appointments = []; // In-memory storage for demonstration

const createAppointment = (appointmentData, callback) => {
    const appointment = { id: appointments.length + 1, ...appointmentData };
    appointments.push(appointment);
    callback(null, appointment);
};

// Booking route
router.post('/appointments/book', (req, res) => {
    const { fullName, email, phone, medicalService, appointmentType, preferredDate, additionalNotes } = req.body;

    const appointmentData = {
        fullName,
        email,
        phone,
        medicalService,
        appointmentType,
        preferredDate,
        additionalNotes,
    };

    createAppointment(appointmentData, (err, appointment) => {
        if (err) {
            return res.status(500).send({ message: 'Error booking appointment.' });
        }
        res.send({ message: 'Appointment booked successfully.', appointment });
    });
});

module.exports = router;