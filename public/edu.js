document.addEventListener('DOMContentLoaded', function () {
    const materialsContainer = document.getElementById('materials');

    fetch('https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=women%27s+health&retmax=10')
        .then(response => response.json())
        .then(data => {
            const entries = data.list.document;
            entries.forEach(entry => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                const serviceBox = document.createElement('div');
                serviceBox.classList.add('service-box', 's-box4');

                const icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-tooth');

                const title = document.createElement('strong');
                title.textContent = entry.title;

                const details = document.createElement('p');
                details.textContent = 'Providing access to more detailed healthcare information';

                const link = document.createElement('a');
                link.href = entry.url;
                link.textContent = 'Read More';

                serviceBox.appendChild(icon);
                serviceBox.appendChild(title);
                serviceBox.appendChild(details);
                serviceBox.appendChild(link);

                swiperSlide.appendChild(serviceBox);
                materialsContainer.appendChild(swiperSlide);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});