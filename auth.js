// localStoragezzzz
let users = JSON.parse(localStorage.getItem("users")) || [];

// Signn
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    const getValue = (...ids) => {
        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) return el.value.trim();
        }
        return "";
    };

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let user = {
                name: getValue("signup-name", "name"),
                email: getValue("signup-email", "email"),
                password: getValue("signup-password", "password")
            };

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Account created! Please login.");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let email = getValue("login-email", "email");
            let password = getValue("login-password", "password");

            let user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("loggedUser", JSON.stringify(user));
                window.location.href = "dashboard.html";
            } else {
                alert("Incorrect email or password!");
            }
        });
    }
});

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "index.html";
    });
}
