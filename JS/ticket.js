const data = sessionStorage.getItem("ticketData");

if (data === null) {
    window.location.href = "index.html";
} else {
    const ticket = JSON.parse(data);

    document.getElementById("ticketName").textContent = ticket.name;
    document.getElementById("ticketGithub").textContent = ticket.github;
    document.getElementById("ticketAvatar").src = ticket.avatar;
}