 
        const images = [
            'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop'
        ];

        const carousel = document.getElementById('carousel');
        let currentIndex = 0;

        // Crear elementos de imagen
        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'carousel-image';
            if (index === 0) img.classList.add('active');
            carousel.appendChild(img);
        });

        const imageElements = document.querySelectorAll('.carousel-image');

        function nextImage() {
            imageElements[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            imageElements[currentIndex].classList.add('active');
        }

        // Cambiar imagen cada 3 segundos
        setInterval(nextImage, 3000);