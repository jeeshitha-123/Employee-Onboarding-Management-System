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
            const row = document.createElement("tr");

row.innerHTML = `
    <td>${employee.employeeId}</td>
    <td>${employee.name}</td>
    <td>${employee.department}</td>
    <td>${employee.manager}</td>
    <td>${employee.joiningDate}</td>
    <td>
    <span class="badge ${
        employee.status === "Approved"
            ? "bg-success"
            : employee.status === "Rejected"
            ? "bg-danger"
            : "bg-warning text-dark"
    }">
        ${employee.status}
    </span>
</td>
    <td>
    <button class="btn btn-success btn-sm"
        onclick="updateStatus('${employee.employeeId}','Approved')">
        Approve
    </button>

    <button class="btn btn-danger btn-sm"
        onclick="updateStatus('${employee.employeeId}','Rejected')">
        Reject
    </button>
</td>
`;

tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Fetch Error:", error);
    });
    async function updateStatus(employeeId, status) {

    const response = await fetch(
        "https://f4xyxlgbih.execute-api.ap-south-1.amazonaws.com/dev/status",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeId: employeeId,
                status: status
            })
        }
    );

    const result = await response.json();

    alert(result.message);

    location.reload();
}