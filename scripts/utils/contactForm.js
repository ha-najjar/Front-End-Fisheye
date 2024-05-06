function displayModal() {
    const modal = document.getElementById('contact_modal');
	modal.style.display = "block";
    modal.setAttribute('tabindex', 0); // Ajout de l'attribut tabindex pour rendre la modale focusable
    modal.focus(); 
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
    closeModal();
});

  // ajout de la gestion clavier
  const modal = document.getElementById('contact_modal');

  modal.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
          closeModal();
      } else if (event.key === 'Tab') {
          const focusableElements = modal.querySelectorAll('button, input, textarea');
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          if (!event.shiftKey && document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
          } else if (event.shiftKey && document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
          }
      }
  });
