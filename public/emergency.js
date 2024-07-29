// Get the modal
var modal = document.getElementById("emergencyModal");

// Get the button that opens the modal
var btn = document.getElementById("emergencyBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-btn")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function callEmergency() {
    window.location.href = "tel:+2438137717783";
}

function sendEmergencySMS() {
    window.location.href = "sms:+2438137717783?body=I%20need%20emergency%20assistance%20at%20my%20location.";
}

function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            alert(`Share this location with emergency contacts: ${locationUrl}`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
            window.open(directionsUrl, '_blank');
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to update button text based on authentication status
function updateAuthButton() {
    const button = document.getElementById('loginButton');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if the user is logged in

    if (isLoggedIn) {
        button.textContent = 'Sign Out';
        button.onclick = function () {
            localStorage.setItem('isLoggedIn', 'false'); // Set the user as logged out
            updateAuthButton(); // Update button text
            // Optionally, redirect or perform additional actions for sign-out
        };
    } else {
        button.textContent = 'Sign In';
        button.onclick = function () {
            localStorage.setItem('isLoggedIn', 'true'); // Set the user as logged in
            updateAuthButton(); // Update button text
            // Optionally, redirect or perform additional actions for sign-in
        };
    }
}

// Initialize button state on page load
document.addEventListener('DOMContentLoaded', updateAuthButton);