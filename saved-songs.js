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
let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
let musicIndex = 0;
let isPlaying = false;

if (savedSongs.length === 0) {
    alert('No saved songs found.');
    window.location.href = './index.html';
}

loadMusic(savedSongs[musicIndex]);

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    style.textContent = song.style;
    image.src = song.cover;
    background.src = song.cover;
}

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + savedSongs.length) % savedSongs.length;
    loadMusic(savedSongs[musicIndex]);
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

const savedSongsList = document.getElementById('saved-songs-list');
savedSongs.forEach((song, index) => {
    const songElement = document.createElement('div');
    songElement.classList.add('saved-song');

    songElement.innerHTML = `
        <img src="${song.cover}" alt="${song.displayName}" class="song-cover">
        <div class="song-info">
            <h2>${song.displayName}</h2>
            <p>${song.style}</p>
        </div>
        <i class="fa-solid fa-play play-button" data-index="${index}"></i>
    `;

    savedSongsList.appendChild(songElement);

    songElement.querySelector('.play-button').addEventListener('click', () => {
        musicIndex = index;
        loadMusic(savedSongs[musicIndex]);
        playMusic();
    });
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);



