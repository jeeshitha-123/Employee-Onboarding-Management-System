// =============================
// Check Login
// =============================

if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

// =============================
// Welcome User
// =============================

const hrName = sessionStorage.getItem("username") || "HR";

const hrNameElement = document.getElementById("hrName");

if (hrNameElement) {
    hrNameElement.textContent = hrName;
}

// =============================
// Today's Date
// =============================

const todayElement = document.getElementById("todayDate");

if (todayElement) {

    const today = new Date();

    todayElement.textContent =
        today.toDateString();

}

// =============================
// Live Clock
// =============================

function updateClock() {

    const clock =
        document.getElementById("liveClock");

    if (clock) {

        clock.textContent =
            new Date().toLocaleTimeString();

    }

}

updateClock();

setInterval(updateClock, 1000);

// =============================
// Load Dashboard Data
// =============================

fetch(API.employees)

.then(response => response.json())

.then(result => {

    const data =
        typeof result === "string"
            ? JSON.parse(result)
            : result.body
            ? JSON.parse(result.body)
            : result;

    // -------------------------
    // Dashboard Counts
    // -------------------------

    document.getElementById("employeeCount").textContent =
        data.length;

    const approved = data.filter(emp =>
(emp.status || "").trim().toLowerCase() === "approved"
).length;

const pending = data.filter(emp =>
(emp.status || "").trim().toLowerCase() === "pending"
).length;

document.getElementById("completedCount").innerText = approved;
document.getElementById("pendingCount").innerText = pending;

    document.getElementById("documentCount").textContent =
        data.length;

    // -------------------------
    // Department Chart
    // -------------------------

    const departmentMap = {};

    data.forEach(emp => {

        departmentMap[emp.department] =
            (departmentMap[emp.department] || 0) + 1;

    });

    const departmentCanvas =
        document.getElementById("departmentChart");

    if (departmentCanvas) {

        new Chart(departmentCanvas, {

            type: "pie",

            data: {

                labels: Object.keys(departmentMap),

                datasets: [{

                    data: Object.values(departmentMap)

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    // -------------------------
    // Status Chart
    // -------------------------

    const statusCanvas =
        document.getElementById("statusChart");

    if (statusCanvas) {

        new Chart(statusCanvas, {

            type: "doughnut",

            data: {

                labels: [

    "Approved",

    "Pending"

],

datasets: [{

    data: [

        approved,

        pending

    ]

}]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    // -------------------------
    // Recent Employees
    // -------------------------

    const employeeTable =
        document.getElementById("employeeTable");

    if (employeeTable) {

        employeeTable.innerHTML = "";

        data.slice(0, 5).forEach(emp => {

            employeeTable.innerHTML += `
<tr>

<td>${emp.employeeId}</td>

<td>${emp.name}</td>

<td>${emp.department}</td>

<td>
    <span class="badge ${
        emp.status === "Approved"
            ? "bg-success"
            : "bg-warning text-dark"
    }">
        ${emp.status}
    </span>
</td>

</tr>
`;

        });

    }

    // -------------------------
    // Notifications
    // -------------------------

    const notificationList =
        document.getElementById("notificationList");

    if (notificationList) {

        notificationList.innerHTML = "";

        data.slice(0, 5).forEach(emp => {

            notificationList.innerHTML += `

            <li class="list-group-item">

                Employee

                <strong>${emp.name}</strong>

                joined

                <strong>${emp.department}</strong>

                department.

            </li>

            `;

        });

    }

})

.catch(error => {

    console.error("Dashboard Error:", error);

    alert("Unable to load dashboard.");

});