//fonction pour récupérer tout les données depuis le json
async function getDataFromJson() {
    const response = await fetch('./data/photographers.json');
    const dataFromJson = await response.json();
    // et bien retourner les données seulement une fois récupéré
    return dataFromJson;
}
// fonction pour récupérer un photographe à partir de son id
async function getPhotographerById(id) {
    // Récupère les datas des photographes
    const { photographers } = await getDataFromJson();
    const photographer = await photographers.find(
        (_photographer) => _photographer.id === Number(id)
    );
    return photographer;
}

// fonction qui construit la page d'un photographe
async function buildPhotographerPage(photographer, photographerMedias) {
    photographerHeader(photographer);

    // Parcourir les medias et pour chaque élément appeler un template pour construire un seul media
    photographerMedias.forEach(media => {
        mediaTemplate(media, photographer.name);
    });
    setDropdownList(photographerMedias, photographer.name);
    setModalPhotographerName(photographer.name);
    buildTotalLikesAndPrice(photographer.price, photographerMedias);
}
// fonction récupére la liste des médias d'un photographe depuis le json
async function getMediasById(id){
    const { media } = await getDataFromJson();
    const photographerMedias = await media.filter(
        (_item) => _item.photographerId === Number(id)
    );
    return photographerMedias;
}


async function init() {
    // Récupère les id à partir du url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const photographer = await getPhotographerById(id);
    const photographerMedias = await getMediasById(id);
    await buildPhotographerPage(photographer, photographerMedias);
    updateLikes();
    buildLightbox(photographerMedias, photographer.name);
}

init();
