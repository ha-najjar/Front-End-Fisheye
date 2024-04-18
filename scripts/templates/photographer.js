function photographerHeader(photographer) {
  const { name, portrait, city, country, tagline } = photographer;
  const picture = `assets/images/photographers-photos/${portrait}`;

  const photographerName = document.querySelector(".photographer-name");
  const photographerLocation = document.querySelector(".photographer-location");
  const photographerTagline = document.querySelector(".photographer-tagline");
  const photographerImage = document.querySelector(".photographer-image");

  photographerName.textContent = name;
  photographerLocation.textContent = `${city}, ${country}`;
  photographerTagline.textContent = tagline;
  photographerImage.setAttribute("src", picture);
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
      imgVideo.setAttribute('controls', '');
      const videoSource = document.createElement('source');
      videoSource.setAttribute('src', videoPath);
      videoSource.setAttribute('type', 'video/mp4');
      imgVideo.appendChild(videoSource);

    } else {
      const picture = `assets/images/${imageFolder}/${image}`;
      imgVideo = document.createElement( 'img' );
      imgVideo.setAttribute('src', picture);
    }
    
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
    likesIcon.className = 'fa-solid fa-heart';
    
    likesContainer.appendChild(likesNumber);
    likesContainer.appendChild(likesIcon);
    itemContent.appendChild(h3);
    itemContent.appendChild(likesContainer);
    article.appendChild(imgVideo);
    article.appendChild(itemContent);
    
    mediasContainer.appendChild(article);
    


}


