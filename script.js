let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Если текущий слайд первый, переходим к последнему
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; // Если текущий слайд последний, переходим к первому
    }

    updateSlidePosition();
}

function updateSlidePosition() {
    const slidesContainer = document.querySelector('.slides-container');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector('.theme-toggle-btn').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
