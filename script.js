console.log("STarting the script");
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API
const count = 30;
const apiKey ='pPpeevXki_XqmTZNZKIPrGh1tShLJMC3AtcIWL37Rc8';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//check if all images were loaded
function imageLoaded() {
    console.log('imageLoaded')
    imagesLoaded++;
    console.log("imagesLoaded");
    if (imagesLoaded === totalImages){
        ready= true;
        loader.hidden = true;
        console.log('ready =',ready);
        
    }
}

//Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    console.log('Entering setAttributes');
    for (const key in attributes) {
        Element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    console.log('In the displayPhotos() function');
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        //create a to link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href',photo.links.html);
        //item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, Check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from Unsplash API
async function getPhotos(){
    console.log("In the getPhotos() function, trying to get photos");
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
    } catch (error) {

        //catch error here
    }
}

//check to see if scrolling near the botton of the page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        getPhotos();
        ready = false;

        console.log('load more');
    }
});

//on Load
getPhotos();
