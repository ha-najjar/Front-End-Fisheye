function displayModal() {
    const modal = document.getElementById('contact_modal');
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = "none";
}
 function setModalPhotographerName(name) {
const photographerName = document.querySelector('.modal-photographer-name');
photographerName.textContent = name; 
}
const form = document.querySelector('form');
const first = document.getElementById('firstname');
const last = document.getElementById('lastname');
const mail = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
    const firstValue = first.value;
    console.log(firstValue);
    const lastValue = last.value;
    console.log(lastValue);
    const mailValue = mail.value;
    console.log(mailValue);
    const messageValue = message.value;
    console.log(messageValue);
});