document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.querySelector("#leave-review form");

    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const review = document.querySelector("#review").value.trim();

        if (!name || !review) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        fetch("/submit_review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, review }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const modal = bootstrap.Modal.getInstance(document.getElementById("leave-review"));
                modal.hide();

                document.querySelector("#review-message").innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ${data.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;

                reviewForm.reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Ошибка:", error));
    });
});
