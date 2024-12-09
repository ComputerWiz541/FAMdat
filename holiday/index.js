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
        path: 'assets/Holiday Sparkle.mp3',
        displayName: 'Holiday Sparkle',
        cover: 'assets/Holiday Sparkle.jpg',
        style: 'upbeat, pop, festive',
    },
    {
        path: 'assets/Snowflakes and Firelight.mp3',
        displayName: 'Snowflakes and Firelight',
        cover: 'assets/Snowflakes and Firelight.jpg',
        style: 'upbeat, festive, pop',
    },
    {
        path: 'assets/Jingly Nights.mp3',
        displayName: 'Jingly Nights',
        cover: 'assets/Jingly Nights.jpg',
        style: 'pop',
    },
    {
        path: 'assets/Christmas Wonderland.mp3',
        displayName: 'Christmas Wonderland',
        cover: 'assets/Christmas Wonderland.jpg',
        style: 'christmas',
    },
    {
        path: 'assets/Christmas Time.mp3',
        displayName: 'Christmas Time',
        cover: 'assets/Christmas Time.jpg',
        style: 'christmas',
    },
    {
        path: 'assets/Merry Christmas.mp3',
        displayName: 'Merry Christmas',
        cover: 'assets/Merry Christmas.jpg',
        style: 'Christmas, cheery, bells, chimes, choir, horns, organ, operatic vocals, orchestral',
    },
    {
        path: 'assets/Christmas Calling.mp3',
        displayName: 'Christmas Calling',
        cover: 'assets/Christmas Calling.jpg',
        style: "Boys' Choir, Symphony, Orchestral, Christmas",
    },
];

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

//closeAdBtn.addEventListener('click', () => {
//    musicAd.style.display = 'none';
//});

const downloadIcon = document.getElementById('download');

downloadIcon.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = songs[musicIndex].path;
    link.setAttribute('download', songs[musicIndex].displayName + '.mp3');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// fav songs
const saveBtn = document.getElementById('save');
let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];

saveBtn.addEventListener('click', () => {
    const currentSong = songs[musicIndex];
    if (!savedSongs.some(song => song.displayName === currentSong.displayName)) {
        savedSongs.push(currentSong);
        localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
        alert(`${currentSong.displayName} has been saved to your favorites!`);
    } else {
        alert(`${currentSong.displayName} is already in your favorites.`);
    }
});


const savedAd = document.getElementById('saved-ad');
const closeAd2Btn = document.getElementById('close-ad2');

closeAd2Btn.addEventListener('click', () => {
    savedAd.style.display = 'none';
});




// Loads the list of songs

function displaySongsList() {
    const songsListContainer = document.getElementById('songs-list');
    songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song-list');
        songElement.setAttribute('data-index', index);
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.displayName}" class="song-cover">
            <div class="song-info">
                <h2>${song.displayName}</h2>
                <p>${song.style}</p>
            </div>
        `;
        songsListContainer.appendChild(songElement);

        //To load each song to load and play it
        songElement.addEventListener('click', () => {
            musicIndex = index;
            loadMusic(songs[musicIndex]);
            playMusic();
        });
    });
}










