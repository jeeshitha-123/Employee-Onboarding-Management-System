const apiUrl = "https://f4xyxlgbih.execute-api.ap-south-1.amazonaws.com/dev/upload";

document.getElementById("uploadForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const employeeId = document.getElementById("employeeId").value;
    const file = document.getElementById("document").files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    try {

        // Step 1: Request a pre-signed URL
        const response = await fetch(
            `${apiUrl}?employeeId=${employeeId}&fileName=${encodeURIComponent(file.name)}`
        );

        const result = await response.json();

        // Step 2: Upload the file directly to S3
        const uploadResponse = await fetch(result.uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type
            }
        });

        if (uploadResponse.ok) {
            document.getElementById("message").innerText =
                "✅ File uploaded successfully!";
        } else {
            document.getElementById("message").innerText =
                "❌ File upload failed.";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("message").innerText =
            "❌ Error uploading file.";
    }

});