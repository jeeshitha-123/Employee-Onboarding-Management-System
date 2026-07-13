// Check Login
if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let employees = [];

// Load Employee Data
async function loadReports() {

    try {

        const response = await fetch(API.employees);

        if (!response.ok) {
            throw new Error("Unable to load employees.");
        }

        employees = await response.json();

        // Dashboard Cards
        document.getElementById("totalEmployees").innerText = employees.length;

        const approved = employees.filter(emp =>
    (emp.status || "").trim().toLowerCase() === "approved"
).length;

const pending = employees.filter(emp =>
    (emp.status || "").trim().toLowerCase() === "pending"
).length;

document.getElementById("completedEmployees").innerText = approved;
document.getElementById("pendingEmployees").innerText = pending;
        const departments = {};

        employees.forEach(emp => {
            departments[emp.department] =
                (departments[emp.department] || 0) + 1;
        });

        document.getElementById("departmentCount").innerText =
            Object.keys(departments).length;

        // Employee Table
        const table = document.getElementById("reportTable");
        table.innerHTML = "";

        employees.forEach(emp => {

            table.innerHTML += `

            <tr>

                <td>${emp.employeeId}</td>

                <td>${emp.name}</td>

                <td>${emp.department}</td>

                <td>${emp.status}</td>

            </tr>

            `;

        });

        // Department Chart
        new Chart(document.getElementById("deptChart"), {

            type: "bar",

            data: {

                labels: Object.keys(departments),

                datasets: [{

                    label: "Employees",

                    data: Object.values(departments)

                }]

            }

        });

        // Status Chart
        new Chart(document.getElementById("statusChart"), {

            type: "doughnut",

            data: {

                labels: ["Approved", "Pending"],

datasets: [{

    data: [approved, pending]

}]

            }

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load reports.");

    }

}

loadReports();


// ===============================
// Download CSV Report
// ===============================

document.getElementById("downloadCSV")

.addEventListener("click", () => {

    let csv = "Employee ID,Name,Department,Status\n";

    employees.forEach(emp => {

        csv +=
`${emp.employeeId},${emp.name},${emp.department},${emp.status}\n`;

    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "employee-report.csv";

    a.click();

    URL.revokeObjectURL(url);

});


// ===============================
// Search Employees
// ===============================

const search = document.getElementById("searchReport");

if (search) {

    search.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const rows = document.querySelectorAll("#reportTable tr");

        rows.forEach(row => {

            row.style.display =
                row.innerText.toLowerCase().includes(keyword)
                ? ""
                : "none";

        });

    });

}