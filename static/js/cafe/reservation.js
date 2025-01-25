// Получаем все кнопки столов
const tableButtons = document.querySelectorAll('.btn-outline-custom');

// Добавляем обработчик клика для каждой кнопки
tableButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем класс 'selected' у всех кнопок
        tableButtons.forEach(btn => btn.classList.remove('selected'));

        // Добавляем класс 'selected' к текущей кнопке
        button.classList.add('selected');
    });
});
