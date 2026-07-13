if(sessionStorage.getItem("loggedIn") !== "true"){

    window.location.href = "login.html";

}

const username = sessionStorage.getItem("username");

fetch(API.profile + "?username=" + username)

.then(response => response.json())

.then(result => {

    const user = result.body
        ? JSON.parse(result.body)
        : result;

    document.getElementById("profileName").innerText =
        user.name;

    document.getElementById("profileEmail").innerText =
        user.email;

    document.getElementById("profileUsername").innerText =
        user.username;

})

.catch(error => {

    console.error(error);

    alert("Unable to load profile.");

});