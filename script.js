document.addEventListener('DOMContentLoaded', function () {
    // Селекторы для всех слайдеров
    const sliders = [
        { id: 'monuments', btn: 'toggle-slider-btn', container: '.book-slider-container' },
        { id: 'portraits', btn: 'toggle-portrait-slider-btn', container: '#portrait-slider' },
        { id: 'fences', btn: 'toggle-fences-slider-btn', container: '#fences-slider' }
    ];

    // Настройка каждого слайдера
    sliders.forEach(slider => {
        const bookSlider = document.querySelector(`${slider.container} .book-slider`);
        const slides = document.querySelectorAll(`${slider.container} .book-slide`);
        const prevBtn = document.querySelector(`${slider.container} .prev-btn`);
        const nextBtn = document.querySelector(`${slider.container} .next-btn`);
        const toggleBtn = document.getElementById(slider.btn);
        let currentIndex = 0;

        // Функция обновления слайдера
        function updateBookSlider() {
            const slideWidth = slides[0].clientWidth;
            bookSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        // Обработчики для кнопок навигации
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateBookSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateBookSlider();
        });

        // Переключение видимости слайдера
        toggleBtn.addEventListener('click', function() {
            const sliderContainer = document.querySelector(slider.container);
            const isVisible = sliderContainer.style.display !== 'none';
            sliderContainer.style.display = isVisible ? 'none' : 'block';
            this.textContent = isVisible ? 'Открыть каталог' : 'Закрыть каталог';
        });
    });

    // Модальное окно для изображений
    const images = document.querySelectorAll('.clickable-img');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');

    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Инициализация слайдеров
    sliders.forEach(slider => {
        const bookSlider = document.querySelector(`${slider.container} .book-slider`);
        const slides = document.querySelectorAll(`${slider.container} .book-slide`);
        updateBookSlider(bookSlider, slides, 0);
    });

    // Функция обновления слайдера (вынесена отдельно для переиспользования)
    function updateBookSlider(slider, slides, currentIndex) {
        const slideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
});
