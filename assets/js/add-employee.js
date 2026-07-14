if (sessionStorage.getItem("loggedIn") !== "true") {

    window.location.href = "login.html";

}

document.getElementById("saveEmployee")

.addEventListener("click", function () {

    const employee = {

        employeeId:
        document.getElementById("employeeId").value.trim(),

        name:
        document.getElementById("name").value.trim(),

        email:
        document.getElementById("email").value.trim(),

        department:
        document.getElementById("department").value,

        manager:
        document.getElementById("manager").value.trim(),

        joiningDate:
        document.getElementById("joiningDate").value,

        status:
        document.getElementById("status").value

    };

    if (

        employee.employeeId === "" ||

        employee.name === "" ||

        employee.email === "" ||

        employee.manager === "" ||

        employee.joiningDate === ""

    ) {

        document.getElementById("message").innerHTML =

        "<span class='text-danger'>Please fill all fields.</span>";

        return;

    }

    fetch(API.employees, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(employee)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Failed to save employee");

        }

        return response.json();

    })

    .then(data => {

        document.getElementById("message").innerHTML =

        "<span class='text-success'>Employee Added Successfully.</span>";

        setTimeout(() => {

            window.location.href = "employees.html";

        }, 1500);

    })

    .catch(error => {

        console.error(error);

        document.getElementById("message").innerHTML =

        "<span class='text-danger'>Unable to add employee.</span>";

    });

});