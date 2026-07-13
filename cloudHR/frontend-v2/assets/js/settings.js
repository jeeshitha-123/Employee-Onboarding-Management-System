if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}
window.onload = function () {
    document.getElementById("password").value = "";
};
const username = sessionStorage.getItem("currentUser");

// Load Profile
fetch(API.profile + "?username=" + username)

.then(response => response.json())

.then(user => {

    document.getElementById("name").value = user.name;

    document.getElementById("email").value = user.email;

    document.getElementById("username").value = user.username;

    // Keep the password field empty
    document.getElementById("password").value = "";

})

.catch(error => {

    console.error(error);

    alert("Unable to load profile.");

});


// Save Changes

document.getElementById("saveBtn")

.addEventListener("click", async () => {

    const data = {

        username: document.getElementById("username").value.trim(),

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        password: document.getElementById("password").value.trim()

    };

    try{

        const response = await fetch(API.updateProfile,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        const result = await response.json();

        if(response.ok){

    sessionStorage.setItem("username", data.name);

    sessionStorage.setItem("currentUser", data.username);

    // Clear the password field
    document.getElementById("password").value = "";

    document.getElementById("message").innerHTML =
    "<span class='text-success'>Profile Updated Successfully.</span>";

}

        else{

            document.getElementById("message").innerHTML=
            "<span class='text-danger'>"+result.message+"</span>";

        }

    }

    catch(error){

        console.error(error);

        document.getElementById("message").innerHTML=
        "<span class='text-danger'>Unable to update profile.</span>";

    }

});