if(sessionStorage.getItem("loggedIn") !== "true"){

    window.location.href = "login.html";

}
let employees = [];

// -------------------------
// Render Employee Table
// -------------------------
function renderTable(data) {

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No employees found
                </td>
            </tr>
        `;

        return;
    }

    data.forEach(emp => {

        const status = (emp.status || "").trim().toLowerCase();

        const badgeClass =
            status === "completed"
                ? "badge bg-success"
                : "badge bg-warning text-dark";

        table.innerHTML += `
            <tr>

                <td>${emp.employeeId}</td>

                <td>${emp.name}</td>

                <td>${emp.department}</td>

                <td>
                    <span class="${badgeClass}">
                        ${emp.status}
                    </span>
                </td>

                <td>

                    <button
                        class="btn btn-sm btn-outline-primary"
                        onclick="viewEmployee('${emp.employeeId}')">

                        <i class="fa-solid fa-eye"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-outline-success"
                        onclick="editEmployee('${emp.employeeId}')">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="deleteEmployee('${emp.employeeId}')">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

}

// -------------------------
// Search + Filters
// -------------------------
function applyFilters() {

    const keyword =
        document.getElementById("searchEmployee")
        .value
        .toLowerCase();

    const department =
        document.getElementById("departmentFilter").value;

    const status =
        document.getElementById("statusFilter").value;

    const filtered = employees.filter(emp => {

        const matchesSearch =

            (emp.employeeId || "").toLowerCase().includes(keyword) ||

            (emp.name || "").toLowerCase().includes(keyword) ||

            (emp.department || "").toLowerCase().includes(keyword);

        const matchesDepartment =
            department === "" ||
            emp.department === department;

        const matchesStatus =
            status === "" ||
            emp.status === status;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
        );

    });

    renderTable(filtered);

document.getElementById("totalEmployees").innerText = filtered.length;

}

// -------------------------
// Load Employees
// -------------------------
fetch(API.employees)

.then(response => response.json())

.then(data => {

    employees = data;
    document.getElementById("totalEmployees").innerText = employees.length;

    const departments = [
        ...new Set(
            employees.map(emp => emp.department)
        )
    ];

    const dropdown =
        document.getElementById("departmentFilter");

    departments.forEach(dept => {

        dropdown.innerHTML += `
            <option value="${dept}">
                ${dept}
            </option>
        `;

    });

    renderTable(employees);

})

.catch(error => {

    console.error(error);

});

// -------------------------
// Event Listeners
// -------------------------
document
.getElementById("searchEmployee")
.addEventListener("keyup", applyFilters);

document
.getElementById("departmentFilter")
.addEventListener("change", applyFilters);

document
.getElementById("statusFilter")
.addEventListener("change", applyFilters);

// -------------------------
// View Employee
// -------------------------
function viewEmployee(employeeId) {

    window.location.href =
        `employee-details.html?id=${employeeId}`;

}

// -------------------------
// Edit Employee
// -------------------------
function editEmployee(employeeId) {

    window.location.href =
        `edit-employee.html?id=${employeeId}`;

}

// -------------------------
// Delete Employee
// -------------------------
function deleteEmployee(employeeId){

    if(!confirm("Are you sure you want to delete this employee?")){
        return;
    }

    fetch(API.deleteEmployee,{

        method:"DELETE",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            employeeId:employeeId
        })

    })

    .then(response=>{

        if(!response.ok){
            throw new Error("Delete API Failed");
        }

        return response.json();

    })

    .then(data=>{

        alert(data.message || "Employee deleted successfully.");

        employees = employees.filter(emp=>emp.employeeId!==employeeId);

        applyFilters();

        document.getElementById("totalEmployees").innerText = employees.length;

    })

    .catch(error=>{

        console.error(error);

        alert("Delete operation failed.");

    });

}