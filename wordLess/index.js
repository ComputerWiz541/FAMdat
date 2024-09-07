const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    style = document.getElementById('music-style'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Ocean Dreams',
        cover: 'assets/1.jpg',
        style: 'ethereal indie pop soothing',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Spirit of War',
        cover: 'assets/2.jpg',
        style: 'urgent orchestral dark',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Always There for Me',
        cover: 'assets/3.jpg',
        style: 'electronic dream pop ethereal',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Hold, Please',
        cover: 'assets/4.jpg',
        style: 'corporate',
    }
];

//let musicIndex = 0;
let musicIndex = Math.floor(Math.random() * songs.length);
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    style.textContent = song.style;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

const musicAd = document.getElementById('music-ad');
const closeAdBtn = document.getElementById('close-ad');

closeAdBtn.addEventListener('click', () => {
    musicAd.style.display = 'none';
});

const downloadIcon = document.getElementById('download');

downloadIcon.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = songs[musicIndex].path;
    link.setAttribute('download', songs[musicIndex].displayName + '.mp3');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
