const video = document.getElementById("vid"),
    playBtn = document.getElementById("controls_play"),
    playBtnImg = document.getElementById("playBtn"),
    progressBar = document.getElementById("progress"),
    Volume = document.getElementById("volume"),
    btnForward = document.getElementById("controls_+3"),
    btnRewind = document.getElementById("controls_-3"),
    fullscreenBtn = document.getElementById("FullscreenBtn");

// Pause & Play
function VidStatus() {
    if (video.paused) {
        video.play();
        playBtnImg.src = './assets/vid_controls/pause.png';
    } else {
        video.pause();
        playBtnImg.src = './assets/vid_controls/min-play.svg';
    }
}

playBtn.addEventListener('click', VidStatus);
video.addEventListener('click', VidStatus);

// Progress Bar
function progressUpdate() {
    const value = (video.currentTime / video.duration) * 100;
    progressBar.value = value;
    progressBar.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #fff ${value}%, #fff 100%)`;
}

video.addEventListener('timeupdate', progressUpdate);

// Set Volume
function VolumeSet() {
    video.volume = parseFloat(this.value / 10);
    const value = parseFloat(this.value * 10);
    this.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #fff ${value}%, #fff 100%)`;
}

Volume.addEventListener('mousemove', VolumeSet);

// Skip 3s
function SkipForward() {
    video.currentTime += 3;
}

btnForward.addEventListener('click', SkipForward);

function Rewind() {
    video.currentTime -= 3;
}

btnRewind.addEventListener('click', Rewind);

// Fullscreen
function fullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}

fullscreenBtn.addEventListener('click', fullscreen);

// Change Video Time
function ChangeVideoTime() {
    const value = progressBar.value / 100;
    video.currentTime = value * video.duration;
}

progressBar.addEventListener('input', ChangeVideoTime);

// Map initialization
var map = L.map('map').setView([49.1951, 16.6068], 13);

// connecting OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array of markers
var markers = [
    { lat: 49.19450425, lng: 16.59935349160634, title: 'Spilberk Castle' },
    { lat: 49.19472915, lng: 16.60843351307819, title: 'Freedom Square' },
    { lat: 49.1911142, lng: 16.6098606, title: 'Capuchin Monastery' },
    { lat: 49.19235725, lng: 16.608845142922036, title: 'Vegetable Market' },
    { lat: 49.2071685, lng: 16.616061701410256, title: 'Vila Tugendhat' },
    { lat: 49.193013, lng: 16.608070443761125, title: 'Old Town Hall' }
];

// Add markers to map
markers.forEach(function(marker) {
    L.marker([marker.lat, marker.lng])
        .addTo(map)
        .bindPopup(marker.title);
});

const places = document.querySelectorAll('.place');

places.forEach(place => {
    place.addEventListener('click', function() {
        places.forEach(p => {
            if (p !== place) {
                p.classList.remove('expanded');
                p.classList.toggle('hidden');
            }
        });

        place.classList.toggle('expanded');
        
        place.querySelector('.short').classList.toggle('hidden');
        place.querySelector('.full').classList.toggle('hidden');
    });
});

