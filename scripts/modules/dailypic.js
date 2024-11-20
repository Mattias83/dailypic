let images = [];
let currentImageIndex = 0;

const dailyPicsDiv = document.querySelector(".dailypic");
const imageContainer = document.querySelector(".pic");
const dateContainer = document.querySelector(".pic h2");
const navLeft = document.querySelector(".nav-left");
const navRight = document.querySelector(".nav-right");

navLeft.addEventListener("click", (e) => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage()
});

navRight.addEventListener("click", (e) => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage()
});

// sets dailypic image based on currentImageIndex
function updateImage() {
    const currentImage = document.querySelector(".pic img");
    const currentImageDate = images[currentImageIndex].replace(".webp", "");
    currentImage.src = "pics/" + images[currentImageIndex];
    dateContainer.innerHTML = currentImageDate;
    imageContainer.appendChild(currentImage);
}

// get a list of all images in pics/ directory and sort alphabetically
fetch("get-images.php")
    .then(response => response.json())
    .then(imageList => {
        // sort pics by filename
        images = imageList.sort((a, b) => a.localeCompare(b));
        console.log(images)
        currentImageIndex = images.length - 1;
        updateImage()
    }).catch(error => console.error("error fetching images...", error));


// detect swipe motions
function isTouchDevice() {
    try {
        // Try create a touchevent (only works on touch devices...)
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

if (isTouchDevice()) {
    navLeft.style.display = "none";
    navRight.style.display = "none";
    const mobileMessage = document.querySelector(".mobile-message");
    mobileMessage.style.display = "none";

    let touchStartX = 0;
    let touchStartY = 0;

    let touchStopX = 0;
    let touchStopY = 0;

    function detectSwipeDirection() {
        const deltaX = touchStopX - touchStartX;
        const deltaY = touchStopY - touchStartY;

        // Determine if the swipe is mostly horizontal...
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                // Left
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateImage()
            } else {
                // Right
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateImage()
            }
        } else {
            console.log("svepet är vertikalt och ignoreras");
        }
    }

    dailyPicsDiv.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0]["clientX"];
        touchStartY = e.touches[0]["clientY"];
    }, { passive: true });

    dailyPicsDiv.addEventListener("touchmove", (e) => {
        touchStopX = e.touches[0]["clientX"];
        touchStopY = e.touches[0]["clientY"];
    }, { passive: true });

    dailyPicsDiv.addEventListener("touchend", (e) => {
        detectSwipeDirection();
    }, { passive: true });
}