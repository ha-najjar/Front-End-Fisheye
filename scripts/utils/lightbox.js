const  buildLightbox = (medias, photographerName) => {
    let currentIndex = 0;
    const openLightbox = (index) => {
        const lightbox = document.querySelector('.lightbox');
        lightbox.style.display = "flex";
        buildMediaDOM(index);
    };

    const closeLightbox = () => {
        const lightbox = document.querySelector('.lightbox');
        lightbox.style.display = "none";
        const lightboxContainer = document.querySelector('.lightbox-container');
        lightboxContainer.innerHTML = '';
    };

    const changeMedia = (direction) => {
        if (direction === 'next') {
            if(currentIndex === medias.length - 1){
              currentIndex = 0;
            } else {
                currentIndex += 1;
            }

            buildMediaDOM(currentIndex);
        } else {
            if(currentIndex === 0){
                currentIndex = medias.length - 1;
            } else {
            currentIndex -= 1;
            }

            buildMediaDOM(currentIndex);
        }
    }

    const buildMediaDOM = (index) => {
        currentIndex = index;
        const lightboxContainer = document.querySelector('.lightbox-container');
        lightboxContainer.innerHTML = '';
        const {title, image, video} = medias[currentIndex];
        const nameArray = photographerName.split(' ');
        const imageFolder = nameArray[0].toLowerCase();
        if (video) {
            const videoPath = `assets/images/${imageFolder}/${video}`;
            const videoDOM = document.createElement('video');
            videoDOM.setAttribute('controls', '');
            const videoDOMSource = document.createElement('source');
            videoDOMSource.src = videoPath;
            videoDOMSource.type = 'video/mp4';
            lightboxContainer.appendChild(videoDOM);
        } else {
            const imageDOM = document.createElement('img');
            imageDOM.src = `assets/images/${imageFolder}/${image}`;
            imageDOM.alt = title;
            lightboxContainer.appendChild(imageDOM);
        }
        const h3 = document.createElement('h3');
        h3.textContent = title;
        lightboxContainer.appendChild(h3);

    }

    const addEventClickToMedias = () => {
        const mediasElements = document.querySelectorAll('.img-video');
        mediasElements.forEach( (element, index) => {
            element.addEventListener("click", (event) => {
                event.preventDefault();
                openLightbox(index);
            });
        });
    };

    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxPrevious = document.querySelector('.lightbox-prev');

    lightboxClose.addEventListener("click", (event) => {
        event.preventDefault();
        closeLightbox();
    });

    lightboxNext.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(currentIndex);
       
            changeMedia('next');
        
    });

    lightboxPrevious.addEventListener("click", (event) => {
        event.preventDefault();
       
            changeMedia('previous');
        
    });


    addEventClickToMedias();
}