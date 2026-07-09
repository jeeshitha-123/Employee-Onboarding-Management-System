const apiUrl = "https://f4xyxlgbih.execute-api.ap-south-1.amazonaws.com/dev/employee";

fetch(apiUrl)
    .then(response => {
        console.log("Status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data);

        const tbody = document.querySelector("#employeeTable tbody");

        tbody.innerHTML = "";

        data.forEach(employee => {
            const row = `
                <tr>
                    <td>${employee.employeeId}</td>
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.manager}</td>
                    <td>${employee.joiningDate}</td>
                    <td>${employee.status}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    })
    .catch(error => {
        console.error("Fetch Error:", error);
    });