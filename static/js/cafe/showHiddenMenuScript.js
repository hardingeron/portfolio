const toggleMenuBtn = document.getElementById("toggle-menu-btn");
const additionalMenu = document.getElementById("additional-menu");

toggleMenuBtn.addEventListener("click", () => {
    if (additionalMenu.classList.contains("show")) {
        // Скрываем дополнительные позиции
        additionalMenu.classList.remove("show");
        toggleMenuBtn.textContent = "Больше";
    } else {
        // Показываем дополнительные позиции
        additionalMenu.classList.add("show");
        toggleMenuBtn.textContent = "Скрыть";
    }
});
