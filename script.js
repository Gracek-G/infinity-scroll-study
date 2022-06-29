const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Photos API
const count = 10;
apiKey = 'WEQCHrOdLUHCrjDliATNAwjZYFGwf__XRQ9b7UTL2cU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=vaporwave&count=${count}`;

// Check if all images are loaded
function imageLoaded () {
    imagesLoaded ++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
        console.log('ready=', ready);
    }
}

//Helper Funtion to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes [key]);
    }
}

// Create Elements For Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images=', totalImages);
    // Run funciton for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check if images loaded
        img.addEventListener('load', imageLoaded);
        //Put <img> into the <a> and then put all into the imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
        alert('API took a dump');
        console.log(error);
    }
}

// Check to see if scrolling near bottom of the page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();