document.getElementById("employeeForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const employee = {
        employeeId: document.getElementById("employeeId").value,
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        manager: document.getElementById("manager").value,
        joiningDate: document.getElementById("joiningDate").value,
        status: document.getElementById("status").value
    };

    try {

        const response = await fetch("https://f4xyxlgbih.execute-api.ap-south-1.amazonaws.com/dev/employee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        const result = await response.json();

        document.getElementById("message").innerHTML =
            "✅ Employee Registered Successfully!";

        console.log(result);

        document.getElementById("employeeForm").reset();

    }
    catch(error){

        console.error(error);

        document.getElementById("message").innerHTML =
            "❌ Registration Failed!";
    }

});