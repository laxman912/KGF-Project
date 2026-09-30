/* LOGIN */

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const error =
        document.getElementById("loginError");

    /* DEMO CREDENTIALS */

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "Admin@123";

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        sessionStorage.setItem(
            "adminUsername",
            username
        );

        window.location.href = "index.html";

    } else {

        error.style.display = "block";

        document.getElementById("password").value = "";

    }

});
