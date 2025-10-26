// --- LOGIN SYSTEM ---
const CORRECT_PIN = "102604";
const loginScreen = document.getElementById('login-screen');
const mainContent = document.getElementById('main-content');
const input = document.getElementById('pin-input');
const button = document.getElementById('pin-btn');
const errorMsg = document.getElementById('error-msg');
const loginBox = document.getElementById('login-box');

button.addEventListener('click', checkPin);
input.addEventListener('keyup', e => { if (e.key === 'Enter') checkPin(); });

function checkPin() {
  if (input.value === CORRECT_PIN) {
    loginScreen.classList.add('opacity-0');
    setTimeout(() => {
      loginScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      confetti({ particleCount: 150, spread: 90 });
    }, 600);
  } else {
    errorMsg.classList.remove('opacity-0');
    loginBox.classList.add('animate-shake');
    setTimeout(() => loginBox.classList.remove('animate-shake'), 500);
  }
}

const songs = [
  { title: "You Belong With Me", artist: "Taylor Swift", src: "YBTM.mp3", img: "8.png" },
  { title: "Mine", artist: "Taylor Swift", src: "Mine.mp3", img: "7.jpg" },
  { title: "Enchanted", artist: "Taylor Swift", src: "Enchanted.mp3", img: "7.jpg" }
];

const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  albumArt.src = song.img;
  progress.style.width = "0%";
}

playPauseBtn.addEventListener("click", async () => {
  if (!isPlaying) {
    try {
      await audio.play();
      isPlaying = true;
      playPauseBtn.textContent = "⏸";
    } catch (err) {
      console.error("Play failed:", err);
    }
  } else {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶";
  }
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
  }
});

audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

loadSong(currentSongIndex);

const noteForm = document.getElementById('noteForm');
const noteList = document.getElementById('noteList');

let notes = JSON.parse(localStorage.getItem('niniNotes')) || [];

function renderNotes() {
  noteList.innerHTML = notes.map(n => `<div class="note-item p-3 bg-pink-100 rounded-lg">${n}</div>`).join('');
}
renderNotes();

if (noteForm) {
  noteForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = document.getElementById('noteText').value.trim();
    if (!text) return;
    notes.push(text);
    localStorage.setItem('niniNotes', JSON.stringify(notes));
    document.getElementById('noteText').value = '';
    renderNotes();
    confetti({ particleCount: 80, spread: 70 });
  });
}
