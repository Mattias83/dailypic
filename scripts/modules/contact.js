const messageSubmit = document.querySelector(".contact-form button");
const messageSent = document.querySelector(".contact-form p");

const messageName = document.getElementById("name");
const message = document.getElementById("message");

messageSubmit.addEventListener("click", (e) => {
    messageName.value = "";
    message.value = "";
    messageSent.style.display = "block";
});