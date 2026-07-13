window.onload = function () {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

};

document.getElementById("registerBtn").addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !username || !password) {

        document.getElementById("message").innerHTML =
            "<span class='text-danger'>Please fill all fields.</span>";

        return;
    }

    fetch(API.register, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
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

    .then(result => {

        document.getElementById("message").innerHTML =
            "<span class='text-success'>" + result.message + "</span>";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);

    })

    .catch(error => {

        document.getElementById("message").innerHTML =
            "<span class='text-danger'>" + error.message + "</span>";

    });

});