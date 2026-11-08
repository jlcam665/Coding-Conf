
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const github = document.getElementById("username").value.trim();
    const avatar = document.getElementById("imageUpload").files[0];

    //GitHub username check
    const githubPattern = /^@[A-Za-z0-9-]+$/;

    if (!githubPattern.test(github)) {
        alert("Please enter a valid GitHub username beginning with @.");
        return;
    }

    //Avatar check
    if (!avatar) {
        alert("Please upload an avatar.");
        return;
    }
    if (avatar.type !== "image/png" && avatar.type !== "image/jpeg") {
        alert("Please upload a PNG or JPEG image.");
        return;
    }
    if (avatar.size > 500 * 1024) {
        alert("Your image must be smaller than 500KB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const ticketData = {
            name: name,
            email: email,
            github: github,
            avatar: reader.result
        };

        sessionStorage.setItem("ticketData", JSON.stringify(ticketData));

        window.location.href = "ticket.html";
    };

    reader.readAsDataURL(avatar);
});
