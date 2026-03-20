document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Live AQI Simulation ---
    const aqiVal = document.getElementById("aqi-value");
    if(aqiVal) {
        setInterval(() => {
            let current = parseInt(aqiVal.innerText);
            // Randomly change by -1, 0, or +1
            let change = Math.floor(Math.random() * 3) - 1;
            let newVal = Math.max(30, Math.min(60, current + change));
            aqiVal.innerText = newVal;
            
            // Bonus: Change the label based on the number!
            const aqiLabel = document.querySelector(".aqi-label");
            if(aqiLabel) {
                if(newVal <= 50) {
                    aqiLabel.innerText = "Good";
                    aqiLabel.style.color = "#4ade80"; // Green
                } else {
                    aqiLabel.innerText = "Moderate";
                    aqiLabel.style.color = "#fbbf24"; // Yellow
                }
            }
        }, 3000); // Updates every 3 seconds
    }

    // --- 2. Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Target all our cards to animate when scrolling down
    document.querySelectorAll('.team-member, .project-card, .build-card').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});

// --- 3. Video Modal Logic (How We Made It) ---
function openVideo(videoName) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    
    // Set video source and show it
    video.src = videoName;
    modal.classList.add('show');
    video.play();
}

function closeVideo() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    
    // Hide it
    modal.classList.remove('show');
    
    // Pause and clear after the fade animation finishes
    setTimeout(() => {
        video.pause();
        video.src = "";
    }, 400); 
}

// --- 4. Image Modal Logic (Components Needed) ---
function openImage(imageName) {
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('modal-image');
    
    // Set image source and show it
    img.src = imageName;
    modal.classList.add('show');
}

function closeImage() {
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('modal-image');
    
    // Hide it
    modal.classList.remove('show');
    
    // Clear the image after the fade animation finishes
    setTimeout(() => {
        img.src = "";
    }, 400); 
}

// --- 5. Click Background to Close ---
// Closes ANY modal if the user taps the dark blurred background
window.onclick = function(event) {
    const videoModal = document.getElementById('video-modal');
    const imageModal = document.getElementById('image-modal');
    
    if (event.target === videoModal) {
        closeVideo();
    }
    if (event.target === imageModal) {
        closeImage();
    }
}
