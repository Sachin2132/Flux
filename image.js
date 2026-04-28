const images = [
    'url("images/4.jpg")',
    'url("images/5.jpg")',
    'url("images/6.jpg")'
];

let currentIndex = 0;

function changeBackground() {
    const backgroundDiv = document.querySelector('.background');
    backgroundDiv.style.backgroundImage = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);

// Initial call to set the first background
changeBackground();