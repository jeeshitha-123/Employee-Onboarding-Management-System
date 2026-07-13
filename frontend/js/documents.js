const apiUrl = "https://f4xyxlgbih.execute-api.ap-south-1.amazonaws.com/dev/documents";

async function loadDocuments() {

    const employeeId = document.getElementById("employeeId").value;

    const response = await fetch(
        `${apiUrl}?employeeId=${employeeId}`
    );

    const files = await response.json();

    const list = document.getElementById("documentList");

    list.innerHTML = "";

    files.forEach(file => {

        const item = document.createElement("li");

        item.innerText = file.fileName;

        list.appendChild(item);

    });

}