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
        displayName: 'Neon Goodbye',
        cover: 'assets/1.jpg',
        style: 'dancepop electronic futuristic',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Times 2',
        cover: 'assets/2.jpg',
        style: 'country',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Echoes of Goodbye',
        cover: 'assets/3.jpg',
        style: 'pop rhythmic melancholic',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Dancing in the Light',
        cover: 'assets/4.jpg',
        style: 'gospel anthemic uplifting',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'The Melodic Blaze',
        cover: 'assets/5.jpg',
        style: 'opera mellow orchestral',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Dance Till Dawn',
        cover: 'assets/6.jpg',
        style: 'electronic edm',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Trapped in the Factory',
        cover: 'assets/7.jpg',
        style: 'anthemic j-pop',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Digital Heartache',
        cover: 'assets/8.jpg',
        style: 'futuristic traditional electronic',
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
