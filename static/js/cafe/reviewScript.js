// Собираем все отзывы из контейнера
const reviewsContainer = document.getElementById("reviews-container");
const reviews = Array.from(reviewsContainer.getElementsByClassName("col"));

let currentStartIndex = 0; // Индекс текущего первого отзыва

// Функция для отображения отзывов с анимацией
function renderReviews() {
    // Очищаем контейнер
    reviewsContainer.innerHTML = "";

    // Показываем только 3 отзыва с анимацией
    for (let i = 0; i < 3; i++) {
        const reviewIndex = (currentStartIndex + i) % reviews.length;
        const review = reviews[reviewIndex];

        // Скрываем отзыв изначально
        review.style.opacity = 0;
        review.style.animationDelay = `${i * 0.5}s`; // Задаём задержку появления

        reviewsContainer.appendChild(review); // Добавляем в DOM

        // Добавляем плавное появление с задержкой
        setTimeout(() => {
            review.style.opacity = 1;
        }, i * 500); // 500ms для каждой карточки
    }
}

// Функция для переключения отзывов
function updateReviews() {
    // Увеличиваем индекс на 3, чтобы показывать следующие 3 отзыва
    currentStartIndex = (currentStartIndex + 3) % reviews.length;

    // Очищаем и обновляем с новой анимацией
    renderReviews();
}

// Инициализация
renderReviews();
setInterval(updateReviews, 5000); // Обновляем отзывы каждые 5 секунд
