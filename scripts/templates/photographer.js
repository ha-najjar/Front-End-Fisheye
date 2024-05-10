//Fonction pour construire l'en-tête du photographe avec ses informations.
function photographerHeader(photographer) {
    // Déstructure les données du photographe
    const { name, portrait, city, country, tagline } = photographer;
    const picture = `assets/images/photographers-photos/${portrait}`;
    // récupérer les informations du photographe à partir du DOM
    const photographerName = document.querySelector('.photographer-name');
    const photographerLocation = document.querySelector('.photographer-location');
    const photographerTagline = document.querySelector('.photographer-tagline');
    const photographerImage = document.querySelector('.photographer-image');

    photographerName.textContent = name;
    photographerLocation.textContent = `${city}, ${country}`;
    photographerTagline.textContent = tagline;
    photographerImage.setAttribute('src', picture);
    photographerImage.setAttribute('alt', name);
}
//Fonction pour construire le template d'un média.
function mediaTemplate(media, photographerName) {
    const mediasContainer = document.querySelector('.photographer-medias');
    const {title, image, likes, video} = media;
    const nameArray = photographerName.split(' ');
    const imageFolder = nameArray[0].toLowerCase();
    // Crée un élément <article> pour le média
    const article = document.createElement( 'article' );
    let imgVideo;
    // Vérifie s'il s'agit d'une vidéo ou d'une image et construit l'élément correspondant
    if (video) {
        const videoPath = `assets/images/${imageFolder}/${video}`;
        imgVideo = document.createElement('video');
        imgVideo.setAttribute('alt', `vidéo nommé ${title} réalisée par le photographe ${photographerName}`);
        const videoSource = document.createElement('source');
        videoSource.setAttribute('src', videoPath);
        videoSource.setAttribute('type', 'video/mp4');
        imgVideo.appendChild(videoSource);

    } else {
        const picture = `assets/images/${imageFolder}/${image}`;
        imgVideo = document.createElement( 'img' );
        imgVideo.setAttribute('src', picture);
        imgVideo.setAttribute('alt', `image nommé ${title} réalisée par le photographe ${photographerName}`);
    }
    imgVideo.className = 'img-video';
    imgVideo.setAttribute('tabindex', 0);

    // Crée un conteneur pour le contenu du média

    const itemContent = document.createElement('div');
    itemContent.className = 'item-content';
    const h3 = document.createElement( 'h3' );
    h3.textContent = title;
    const likesContainer = document.createElement('div');
    likesContainer.className = 'likes-container';
    const likesNumber = document.createElement('span');
    likesNumber.className = 'likes-number';
    likesNumber.textContent = likes;
    const likesIcon = document.createElement('i');
    likesIcon.className = 'fa-solid fa-heart like-icon';
    likesIcon.setAttribute('aria-label', 'bouton like en forme de coeur, permet d\'ajouter un like a la photo');
    likesIcon.setAttribute('tabindex', 0);
    
    // Ajouter les éléments au conteneur de likes

    likesContainer.appendChild(likesNumber);
    likesContainer.appendChild(likesIcon);
    // Ajouter les éléments au conteneur de contenu du média
    itemContent.appendChild(h3);
    itemContent.appendChild(likesContainer);
    // Ajouter l'image ou la vidéo au <article>
    article.appendChild(imgVideo);
    article.appendChild(itemContent);
    // Ajoute l'article au conteneur des médias
    mediasContainer.appendChild(article);


}

//Fonction pour construire l'affichage du total des likes et du prix du photographe.

function buildTotalLikesAndPrice(price,medias) {
    const totalLikes = document.querySelector('.total-likes');
    const photographerPrice = document.createElement('div');
    photographerPrice.textContent = `${price}€ / jour`;
    const photographerLikes = document.createElement('div');
    const  photographerLikesNumber = document.createElement('span');
    photographerLikesNumber.className = 'total-likes-number';
    const likesIcon = document.createElement('i');
    likesIcon.className = 'fa-solid fa-heart';
    likesIcon.setAttribute('aria-label', 'likes');

    // Calcule le nombre total de likes à partir des médias

    let likesNumber = 0;
    medias.forEach(element => {
        likesNumber += element.likes;
    });

    photographerLikesNumber.textContent = likesNumber;
    photographerLikes.appendChild(photographerLikesNumber);
    photographerLikes.appendChild(likesIcon);
    totalLikes.appendChild(photographerLikes);
    totalLikes.appendChild(photographerPrice);
}

//Fonction pour mettre à jour le nombre total de likes.
const updateTotalLikes = () => {
    const totalLikesNumber = document.querySelector('.total-likes-number');
    totalLikesNumber.textContent = Number(totalLikesNumber.textContent) + 1;
};

//Fonction pour incrémenter le nombre de likes d'un média.
const incrementLikesNumber = (likeElement) => {
    likeElement.textContent = Number(likeElement.textContent) + 1;
    updateTotalLikes();
  
};

//Fonction pour mettre à jour les likes lorsqu'un utilisateur clique sur le bouton de like.
const updateLikes = () => {
    const likesIcons = document.querySelectorAll('.like-icon');
    likesIcons.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            incrementLikesNumber(element.parentElement.firstChild);
        });

        // ajouter la gestion du clavier  pour incrementer les likes 
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                incrementLikesNumber(element.parentElement.firstChild);          
            }
        });

    });
};
