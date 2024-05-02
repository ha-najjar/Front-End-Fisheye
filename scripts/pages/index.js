    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        const response = await fetch("./data/photographers.json");
        const photographers = await response.json();
        // et bien retourner le tableau photographers seulement une fois récupéré
        return  photographers;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        await displayData(photographers);

        // Ajout de la gestion du clavier
        const photographerArticles = document.querySelectorAll("article");
        photographerArticles.forEach((article, index) => {
            article.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    window.location.href = article.querySelector('a').getAttribute('href');
                } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    const nextCard = photographerArticles[index + 1] || photographerArticles[0];
                    nextCard.focus();
                } else if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    const prevCard = photographerArticles[index - 1] || photographerArticles[photographerArticles.length - 1];
                    prevCard.focus();
                }
            });
        });
    }
    
    init();
    
