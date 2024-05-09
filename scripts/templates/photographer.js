function photographerHeader(photographer) {
    const { name, portrait, city, country, tagline } = photographer;
    const picture = `assets/images/photographers-photos/${portrait}`;

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

function mediaTemplate(media, photographerName) {
    const mediasContainer = document.querySelector('.photographer-medias');
    const {title, image, likes, video} = media;
    const nameArray = photographerName.split(' ');
    const imageFolder = nameArray[0].toLowerCase();
    
    const article = document.createElement( 'article' );
    let imgVideo;
    
    if (video) {
        const videoPath = `assets/images/${imageFolder}/${video}`;
        imgVideo = document.createElement('video');
        //imgVideo.setAttribute('controls', '');
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
    likesIcon.setAttribute("aria-label", "bouton like en forme de coeur, permet d'ajouter un like a la photo");
    likesIcon.setAttribute('tabindex', 0);
    
    likesContainer.appendChild(likesNumber);
    likesContainer.appendChild(likesIcon);
    itemContent.appendChild(h3);
    itemContent.appendChild(likesContainer);
    article.appendChild(imgVideo);
    article.appendChild(itemContent);
    
    mediasContainer.appendChild(article);


}

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

const updateTotalLikes = () => {
    const totalLikesNumber = document.querySelector('.total-likes-number');
    totalLikesNumber.textContent = Number(totalLikesNumber.textContent) + 1;
};

const incrementLikesNumber = (likeElement) => {
    likeElement.textContent = Number(likeElement.textContent) + 1;
    updateTotalLikes();
  
};

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
