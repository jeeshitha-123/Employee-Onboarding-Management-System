// ===============================
// Login Check
// ===============================
if (sessionStorage.getItem("loggedIn") !== "true") {

    window.location.href = "login.html";

}

// Store all documents
let allDocuments = [];

// ===============================
// Upload Document
// ===============================

document.getElementById("uploadBtn").addEventListener("click", async () => {

    const employeeId =
        document.getElementById("employeeId").value.trim();

    const documentType =
        document.getElementById("documentType").value;

    const file =
        document.getElementById("documentFile").files[0];

    if (!employeeId || !file) {

        alert("Please enter Employee ID and select a file.");

        return;

    }

    try {

        // Generate Upload URL

        const response = await fetch(API.generateUploadUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                employeeId,
                documentType,
                fileName: file.name,
                contentType: file.type

            })

        });

        if (!response.ok) {

            throw new Error("Unable to generate upload URL.");

        }

        const result = await response.json();

        // Upload to S3

        const uploadResponse = await fetch(result.uploadUrl, {

            method: "PUT",

            headers: {

                "Content-Type": file.type

            },

            body: file

        });

        if (!uploadResponse.ok) {

            throw new Error("Upload failed.");

        }

        alert("Document uploaded successfully.");

        // Close Modal

        const modal = bootstrap.Modal.getInstance(

            document.getElementById("uploadModal")

        );

        if (modal) {

            modal.hide();

        }

        // Reset Form

        document.getElementById("employeeId").value = "";

        document.getElementById("documentFile").value = "";

        document.getElementById("documentType").selectedIndex = 0;

        // Reload Table

        loadDocuments();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});


// ===============================
// Load Documents
// ===============================

async function loadDocuments() {

    try {

        const response = await fetch(API.documents);

        allDocuments = await response.json();

        // Render table
        renderDocuments(allDocuments);

        // Dashboard Counts
        document.getElementById("documentCount").innerText =
            allDocuments.length;

        document.getElementById("resumeCount").innerText =
            allDocuments.filter(doc => doc.documentType === "Resume").length;

        document.getElementById("offerCount").innerText =
            allDocuments.filter(doc => doc.documentType === "Offer Letter").length;

        document.getElementById("aadhaarCount").innerText =
            allDocuments.filter(doc => doc.documentType === "Aadhaar").length;

        document.getElementById("panCount").innerText =
            allDocuments.filter(doc => doc.documentType === "PAN").length;

        document.getElementById("certificateCount").innerText =
            allDocuments.filter(doc => doc.documentType === "Certificate").length;

    }

    catch (error) {

        console.error(error);

    }

}


// ===============================
// Render Documents
// ===============================

function renderDocuments(documents){

    const table =
    document.getElementById("documentsTable");

    table.innerHTML="";

    documents.forEach(doc=>{

        table.innerHTML +=`

        <tr>

        <td>${doc.employeeId}</td>

        <td>${doc.documentType}</td>

        <td>${doc.fileName}</td>

        <td>

        <a
        href="${doc.fileUrl}"
        target="_blank"
        class="btn btn-primary btn-sm">

        View

        </a>

        </td>

        </tr>

        `;

    });

}


// ===============================
// Search + Filter
// ===============================

function filterDocuments(){

    const search =
    document.getElementById("searchDocument")
    .value
    .toLowerCase();

    const type =
    document.getElementById("typeFilter").value;

    const filtered = allDocuments.filter(doc=>{

        const matchSearch =

        doc.employeeId.toLowerCase().includes(search) ||

        doc.fileName.toLowerCase().includes(search);

        const matchType =

        type==="" ||

        doc.documentType===type;

        return matchSearch && matchType;

    });

    renderDocuments(filtered);

}


// ===============================
// Events
// ===============================

document

.getElementById("searchDocument")

.addEventListener("keyup", filterDocuments);

document

.getElementById("typeFilter")

.addEventListener("change", filterDocuments);


// ===============================
// Initial Load
// ===============================

loadDocuments();