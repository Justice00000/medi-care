// Initialize Swiper
var swiper = new Swiper(".mySwiperServices", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        560: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        950: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1050: {
            slidesPerView: 4,
            spaceBetween: 50,
        },
    },
});

// Check if user is logged in
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/auth/check-session')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                document.getElementById('loginButton').style.display = 'none';
                document.getElementById('userMenu').style.display = 'inline-block';
                document.getElementById('usernameButton').innerText = data.username;
            }
        })
        .catch(error => console.error('Error:', error));
});