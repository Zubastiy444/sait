const bookSlider1 = document.querySelector('.book-slider');
const bookSlider2 = document.querySelector('#portrait-slider .book-slider'); // Второй слайдер
const slides1 = document.querySelectorAll('.book-slider .book-slide');
const slides2 = document.querySelectorAll('#portrait-slider .book-slide');
const prevBtn1 = document.querySelector('.prev-btn');
const nextBtn1 = document.querySelector('.next-btn');
const prevBtn2 = document.querySelector('#portrait-slider .prev-btn');
const nextBtn2 = document.querySelector('#portrait-slider .next-btn');

let currentIndex1 = 0;
let currentIndex2 = 0;

// Обновление слайдера с одинаковой анимацией
function updateBookSlider(slider, slides, currentIndex) {
    const slideWidth = slides[0].clientWidth;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Обработчики для обоих слайдеров (первого и второго)
function setupSlider(slider, slides, prevBtn, nextBtn, currentIndex) {
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateBookSlider(slider, slides, currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateBookSlider(slider, slides, currentIndex);
    });

    return currentIndex;
}

// Настройка обоих слайдеров с одинаковыми функциями
currentIndex1 = setupSlider(bookSlider1, slides1, prevBtn1, nextBtn1, currentIndex1);
currentIndex2 = setupSlider(bookSlider2, slides2, prevBtn2, nextBtn2, currentIndex2);

// Модальное окно
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

// Переключение видимости слайдеров
document.addEventListener('DOMContentLoaded', function () {
    const toggleSliderBtn = document.getElementById('toggle-slider-btn');
    const togglePortraitSliderBtn = document.getElementById('toggle-portrait-slider-btn');
    
    // Переключение для первого слайдера
    toggleSliderBtn.addEventListener('click', function() {
        const sliderContainer = document.querySelector('.book-slider-container');
        const isVisible = sliderContainer.style.display !== 'none';
        sliderContainer.style.display = isVisible ? 'none' : 'block';
        toggleSliderBtn.textContent = isVisible ? 'Открыть каталог' : 'Закрыть каталог';
    });

    // Переключение для второго слайдера (портреты)
    togglePortraitSliderBtn.addEventListener('click', function() {
        const portraitSlider = document.getElementById('portrait-slider');
        const isVisible = portraitSlider.style.display !== 'none';
        portraitSlider.style.display = isVisible ? 'none' : 'block';
        togglePortraitSliderBtn.textContent = isVisible ? 'Открыть каталог' : 'Закрыть каталог';
    });
});
