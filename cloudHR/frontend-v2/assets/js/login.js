document.getElementById("loginBtn").addEventListener("click", () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {

        document.getElementById("message").innerHTML =
            "<span class='text-danger'>Enter username and password.</span>";

        return;
    }

    fetch(API.login, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    })

    .then(async response => {

        const result = await response.json();

        if (!response.ok) {

            throw new Error(result.message);

        }

        return result;

    })

    .then(user => {

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", user.username);

        window.location.href = "dashboard.html";

    })

    .catch(error => {

        document.getElementById("message").innerHTML =
            "<span class='text-danger'>" + error.message + "</span>";

    });

});