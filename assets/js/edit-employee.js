if(sessionStorage.getItem("loggedIn") !== "true"){

    window.location.href = "login.html";

}
const params = new URLSearchParams(window.location.search);

const employeeId = params.get("id");

// Load employee details
fetch(API.employees)
    .then(response => response.json())
    .then(data => {

        const employee = data.find(
            emp => emp.employeeId === employeeId
        );

        if (!employee) {

            alert("Employee not found");

            return;

        }

        document.getElementById("employeeId").value = employee.employeeId || "";
        document.getElementById("employeeName").value = employee.name || "";
        document.getElementById("employeeDepartment").value = employee.department || "";
        document.getElementById("employeeEmail").value = employee.email || "";
        document.getElementById("employeeJoining").value = employee.joiningDate || "";
        document.getElementById("employeeStatus").value = employee.status || "";

    })
    .catch(console.error);


// Save Employee
document.getElementById("saveEmployee").addEventListener("click", function () {

    const employee = {
        employeeId: document.getElementById("employeeId").value,
        name: document.getElementById("employeeName").value,
        department: document.getElementById("employeeDepartment").value,
        email: document.getElementById("employeeEmail").value,
        joiningDate: document.getElementById("employeeJoining").value,
        status: document.getElementById("employeeStatus").value
    };

    console.log("Sending:", employee);

    fetch(API.updateEmployee, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(async response => {
        console.log("Status:", response.status);

        const result = await response.json();

        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.error || result.message || "Unknown error");
        }

        alert("Employee updated successfully!");
        window.location.href = "employees.html";
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });

});