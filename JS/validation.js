const form = document.getElementById("registrationForm");
const fileInput = document.getElementById("imageUpload");
const avatarPreview = document.getElementById("avatarPreview");
const uploadIcon = document.getElementById("uploadIcon");
const uploadPrompt = document.getElementById("imageUploadPrompt");
const imageError = document.getElementById("imageError");
const avatarActions = document.getElementById("avatarActions");
const removeButton = document.getElementById("removeImageButton");
const changeButton = document.getElementById("changeImageButton");

let avatarFile = null;

//Used to go back to the "click to upload" state
function resetImage() {
    avatarFile = null;
    fileInput.value = "";
    avatarPreview.removeAttribute("src");
    avatarPreview.hidden = true;
    uploadIcon.hidden = false;
    uploadPrompt.hidden = false;
    avatarActions.hidden = true;
}

//Check the file, then show it
function handleFile(file) {
    imageError.textContent = "";

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
        resetImage();
        imageError.textContent = "Please upload a PNG or JPEG image.";
        return;
    }
    if (file.size > 500 * 1024) {
        resetImage();
        imageError.textContent = "Your image must be smaller than 500KB.";
        return;
    }

    avatarFile = file;

    const reader = new FileReader();
    reader.onload = function () {
        avatarPreview.src = reader.result;
        avatarPreview.hidden = false;
        uploadIcon.hidden = true;
        uploadPrompt.hidden = true;
        avatarActions.hidden = false;
    };
    reader.readAsDataURL(file);
}

//For uploading an image
fileInput.addEventListener("change", function () {
    if (fileInput.files[0]) {
        handleFile(fileInput.files[0]);
    }
});

changeButton.addEventListener("click", function () {
    fileInput.click();
});
removeButton.addEventListener("click", function () {
    imageError.textContent = "";
    resetImage();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!avatarFile) {
        imageError.textContent = "Please upload an avatar.";
        return;
    }

    const ticketData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        github: document.getElementById("username").value.trim(),
        avatar: avatarPreview.src // the image as a data URL
    };

    sessionStorage.setItem("ticketData", JSON.stringify(ticketData));
    window.location.href = "ticket.html";
});