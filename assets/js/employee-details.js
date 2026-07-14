if(sessionStorage.getItem("loggedIn") !== "true"){

    window.location.href = "login.html";

}
const params = new URLSearchParams(window.location.search);

const employeeId = params.get("id");

console.log(employeeId);
fetch(API.employees)
    .then(response => response.json())
    .then(data => {

        const employee = data.find(emp => emp.employeeId === employeeId);
        console.log("Selected employee:", employee);
        if (!employee) {

    document.querySelector(".card-body").innerHTML = `
        <div class="alert alert-danger">
            Employee not found.
        </div>
    `;

    return;
}
document.getElementById("registrationSelect").value =
    employee.registration || "Pending";

document.getElementById("documentsSelect").value =
    employee.documents || "Pending";

document.getElementById("verificationSelect").value =
    employee.verification || "Pending";

document.getElementById("trainingSelect").value =
    employee.training || "Pending";
        document.getElementById("employeeId").innerText =
    employee.employeeId || "-";

document.getElementById("employeeName").innerText =
    employee.name || "-";

document.getElementById("employeeDepartment").innerText =
    employee.department || "-";

document.getElementById("employeeStatus").innerText =
    employee.status || "-";

document.getElementById("employeeEmail").innerText =
    employee.email || "-";

document.getElementById("employeeJoining").innerText =
    employee.joiningDate || "-";

    // --------------------------
// Onboarding Progress
// --------------------------

const steps = [

    employee.registration || "Pending",

    employee.documents || "Pending",

    employee.verification || "Pending",

    employee.training || "Pending"

];

const completed =
    steps.filter(step => step === "Completed").length;

const percentage =
    (completed / steps.length) * 100;

function setStatus(id, value){

    const element =
        document.getElementById(id);

    element.innerText = value;

    element.className =
        value === "Completed"
        ? "badge bg-success float-end"
        : "badge bg-warning text-dark float-end";

}

setStatus(
    "registrationStatus",
    employee.registration || "Pending"
);

setStatus(
    "documentsStatus",
    employee.documents || "Pending"
);

setStatus(
    "verificationStatus",
    employee.verification || "Pending"
);

setStatus(
    "trainingStatus",
    employee.training || "Pending"
);

document.getElementById("documentsStatus").innerText =
    employee.documents || "Pending";

document.getElementById("verificationStatus").innerText =
    employee.verification || "Pending";

document.getElementById("trainingStatus").innerText =
    employee.training || "Pending";

const progress =
    document.getElementById("progressBar");

progress.style.width = percentage + "%";

progress.innerText = percentage + "%";

    })
    
    .catch(error => {

        console.error(error);

    });
    document.getElementById("editEmployeeBtn").addEventListener("click", () => {

    window.location.href = `edit-employee.html?id=${employeeId}`;

});
document
.getElementById("saveProgress")
.addEventListener("click", async () => {

    const body = {

        employeeId: employeeId,

        registration:
            document.getElementById("registrationSelect").value,

        documents:
            document.getElementById("documentsSelect").value,

        verification:
            document.getElementById("verificationSelect").value,

        training:
            document.getElementById("trainingSelect").value

    };

    try {

        const response = await fetch(API.updateProgress, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const result = await response.json();

        alert(result.message);

        location.reload();

    }

    catch(error){

        console.error(error);

        alert("Unable to update progress.");

    }

});