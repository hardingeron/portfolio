// Массив отзывов
const reviews = [
    { text: "Прекрасное место для отдыха с друзьями. Кофе просто невероятный, а десерты — выше всяких похвал!", author: "Анна Иванова" },
    { text: "Салат 'Цезарь' был идеальным, а атмосфера в кафе располагает к долгим беседам.", author: "Максим Петров" },
    { text: "Работаю здесь каждую неделю. Отличное место с вкусным кофе и тихой атмосферой!", author: "Екатерина Смирнова" },
    { text: "Супер!", author: "Смирнов Никита" },
    { text: "Лучший кофе в городе! Обязательно вернусь сюда снова.", author: "Ольга Кузнецова" },
    { text: "Очень уютное место, дружелюбный персонал и вкусные напитки.", author: "Иван Сергеев" }
];

let currentStartIndex = 0; // Индекс текущего первого отзыва
const reviewsContainer = document.getElementById("reviews-container");

// Функция для отображения отзывов с анимацией
function renderReviews() {
    // Очищаем контейнер
    reviewsContainer.innerHTML = "";

    // Показываем только 3 отзыва с анимацией
    for (let i = 0; i < 3; i++) {
        const reviewIndex = (currentStartIndex + i) % reviews.length;
        const review = reviews[reviewIndex];

        // Создаём элемент отзыва
        const col = document.createElement("div");
        col.className = "col";
        col.style.opacity = 0; // Скрываем карточку
        col.style.animationDelay = `${i * 0.5}s`; // Задаём задержку появления

        col.innerHTML = `
            <div class="card h-100 border-0 shadow-lg animate__animated animate__fadeInLeft">
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p class="mb-3">${review.text}</p>
                        <footer class="blockquote-footer">${review.author}</footer>
                    </blockquote>
                </div>
            </div>
        `;

        reviewsContainer.appendChild(col);

        // Добавляем плавное появление с задержкой
        setTimeout(() => {
            col.style.opacity = 1;
        }, i * 500); // 500ms для каждой карточки
    }
}

// Функция для переключения отзывов
function updateReviews() {
    // Увеличиваем индекс
    currentStartIndex = (currentStartIndex + 1) % reviews.length;

    // Очищаем и обновляем с новой анимацией
    renderReviews();
}

// Инициализация
renderReviews();
setInterval(updateReviews, 5000); // Обновляем отзывы каждые 5 секунд
