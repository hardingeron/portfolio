// Получаем элементы формы и кнопки
const bookButton = document.getElementById("bookButton");
const tableButtons = document.querySelectorAll(".btn-outline-custom");
let selectedTableId = null;
const reservationModal = document.getElementById('reservationModal'); // Модальное окно
const successMessageContainer = document.getElementById('successMessageContainer'); // Контейнер для сообщения об успешном бронировании

// Добавляем обработчик клика для каждой кнопки стола
tableButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем класс 'selected' у всех кнопок
        tableButtons.forEach(btn => btn.classList.remove('selected'));

        // Добавляем класс 'selected' к текущей кнопке
        button.classList.add('selected');

        // Сохраняем id выбранного стола
        selectedTableId = button.id.replace('table', '');
    });
});

// Обработчик нажатия на кнопку бронирования
bookButton.addEventListener("click", async () => {
    const reservationDate = document.getElementById("reservationDate").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;

    // Проверка на пустые поля
    if (!selectedTableId || !reservationDate || !firstName || !lastName || !phone) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Отправка данных на сервер
    const response = await fetch('/book-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            table_id: selectedTableId,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            reservation_date: reservationDate
        })
    });

    const data = await response.json();

    if (data.status === 'success') {
        // Получаем экземпляр модального окна
        const modal = bootstrap.Modal.getInstance(reservationModal);

        // Закрываем модальное окно
        modal.hide();

        // Очищаем форму бронирования
        document.getElementById("reservationDate").value = '';
        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("phone").value = '';
        selectedTableId = null; // Очищаем выбранный стол

        // Показываем красивое сообщение о успешном бронировании
        successMessageContainer.innerHTML = `
            <div class="success-message show">
                <span>${data.message}</span>
            </div>
        `;
        successMessageContainer.style.display = "block"; // Показываем контейнер с сообщением

        // Добавляем класс для анимации появления
        setTimeout(() => {
            successMessageContainer.classList.add('show');
        }, 10); // Маленькая задержка, чтобы анимация могла сработать

        // Через 2 секунды скрываем сообщение
        setTimeout(() => {
            successMessageContainer.classList.remove('show');
            setTimeout(() => {
                successMessageContainer.style.display = "none"; // Скрываем полностью через 1 секунду
            }, 1000); // Скрытие после завершения анимации исчезновения
        }, 2000); // Сообщение исчезает через 2 секунды
    } else {
        // Показываем сообщение об ошибке
        alert(data.message);
    }
});
