function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/images/photographers-photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute('src', picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('h3');
        location.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline;
        const p2 = document.createElement('p');
        p2.setAttribute('class', 'card-price');
        p2.textContent = `${price}€/jour`;
        

        
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(p);
        article.appendChild(p2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}