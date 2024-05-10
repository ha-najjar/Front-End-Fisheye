// Fonction asynchrone qui récupère les données des photographes depuis un fichier JSON.
async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const photographers = await response.json();
    // et bien retourner le tableau photographers seulement une fois récupéré
    return  photographers;
}

//Affiche les données des photographes dans la section dédiée sur la page HTML.
async function displayData(photographers) {
    // Sélectionne la section HTML où afficher les photographes
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        // Crée le modèle de photographe et récupère l'élément DOM de sa carte utilisateur
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        // Ajoute la carte utilisateur à la section des photographes
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    await displayData(photographers);

    // Ajout de la gestion du clavier
    const photographerArticles = document.querySelectorAll('article');
    photographerArticles.forEach((article, index) => {
        article.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = article.querySelector('a').getAttribute('href');
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                const nextCard = photographerArticles[index + 1] || photographerArticles[0];
                nextCard.focus();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevCard = photographerArticles[index - 1] || photographerArticles[photographerArticles.length - 1];
                prevCard.focus();
            }
        });
    });
}
    
init();
    
