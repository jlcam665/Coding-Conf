const data = sessionStorage.getItem("ticketData");

if (data === null) {
    // if the form isn't filled in, send the user back home
    window.location.href = "index.html";
} else {
    const ticket = JSON.parse(data);

    document.getElementById("headerName").textContent = ticket.name;
    document.getElementById("headerEmail").textContent = ticket.email;
    document.getElementById("ticketName").textContent = ticket.name;
    document.getElementById("ticketGithub").textContent = ticket.github;
    document.getElementById("ticketAvatar").src = ticket.avatar;
}