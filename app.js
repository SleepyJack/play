// ===== DATABASE =====
const DB_NAME = 'ToddlerMusicPlayer';
const DB_VERSION = 1;
const STORE_NAME = 'songs';

let db = null;
let currentAudio = null;
let currentSongId = null;

// Initialize database
async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
      }
    };
  });
}

// Database operations
async function addSong(name, audioBlob, imageBlob = null) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const song = {
      name: name,
      audioBlob: audioBlob,
      imageBlob: imageBlob,
      addedDate: new Date().toISOString()
    };

    const request = store.add(song);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllSongs() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function updateSong(id, updates) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const song = getRequest.result;
      Object.assign(song, updates);
      const updateRequest = store.put(song);
      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () => reject(updateRequest.error);
    };
    getRequest.onerror = () => reject(getRequest.error);
  });
}

async function deleteSong(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ===== AUDIO PLAYBACK =====
function stopPlayback() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  currentSongId = null;
  updateNowPlaying(null);
  updateSongTiles();
}

function playSong(song) {
  // If clicking the same song, just pause it
  if (currentSongId === song.id) {
    stopPlayback();
    return;
  }

  // Stop current song if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Create and play new audio
  const audioUrl = URL.createObjectURL(song.audioBlob);
  currentAudio = new Audio(audioUrl);
  currentSongId = song.id;

  currentAudio.play().catch(err => {
    console.error('Playback error:', err);
    alert('Could not play this song. Please check the audio file.');
  });

  // Update UI
  updateNowPlaying(song);
  updateSongTiles();

  // Handle song end
  currentAudio.onended = () => {
    currentSongId = null;
    updateNowPlaying(null);
    updateSongTiles();
    URL.revokeObjectURL(audioUrl);
  };
}

function updateNowPlaying(song) {
  const nowPlaying = document.getElementById('now-playing');
  nowPlaying.innerHTML = ''; // Clear contents

  if (song) {
    // Create icon element
    if (song.imageBlob) {
      const img = document.createElement('img');
      img.className = 'now-playing-icon';
      img.src = URL.createObjectURL(song.imageBlob);
      nowPlaying.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'now-playing-placeholder';

      const emoji = document.createElement('div');
      emoji.textContent = getRandomEmoji();

      const initial = document.createElement('div');
      initial.textContent = song.name.charAt(0).toUpperCase();
      initial.style.fontSize = '0.7em';

      placeholder.appendChild(emoji);
      placeholder.appendChild(initial);
      nowPlaying.appendChild(placeholder);
    }
    nowPlaying.classList.remove('hidden');
  } else {
    nowPlaying.classList.add('hidden');
  }
}

// ===== UI RENDERING =====
async function renderChildMode() {
  const songs = await getAllSongs();
  const grid = document.getElementById('songs-grid');
  const emptyState = document.getElementById('empty-state');

  grid.innerHTML = '';

  if (songs.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  songs.forEach(song => {
    const tile = createSongTile(song);
    grid.appendChild(tile);
  });
}

function createSongTile(song) {
  const tile = document.createElement('div');
  tile.className = 'song-tile';
  if (currentSongId === song.id) {
    tile.classList.add('playing');
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'song-image-container';

  if (song.imageBlob) {
    const img = document.createElement('img');
    img.className = 'song-image';
    img.src = URL.createObjectURL(song.imageBlob);
    imageContainer.appendChild(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'song-placeholder';

    const emoji = document.createElement('div');
    emoji.className = 'placeholder-emoji';
    emoji.textContent = getRandomEmoji();

    const initial = document.createElement('div');
    initial.className = 'placeholder-initial';
    initial.textContent = song.name.charAt(0).toUpperCase();

    placeholder.appendChild(emoji);
    placeholder.appendChild(initial);
    imageContainer.appendChild(placeholder);
  }

  const name = document.createElement('div');
  name.className = 'song-name';
  name.textContent = song.name;

  tile.appendChild(imageContainer);
  tile.appendChild(name);

  tile.addEventListener('click', () => playSong(song));

  return tile;
}

function updateSongTiles() {
  const tiles = document.querySelectorAll('.song-tile');
  tiles.forEach((tile, index) => {
    getAllSongs().then(songs => {
      if (songs[index] && currentSongId === songs[index].id) {
        tile.classList.add('playing');
      } else {
        tile.classList.remove('playing');
      }
    });
  });
}

async function renderParentMode() {
  const songs = await getAllSongs();
  const list = document.getElementById('songs-list');

  list.innerHTML = '';

  songs.forEach(song => {
    const item = createSongListItem(song);
    list.appendChild(item);
  });
}

function createSongListItem(song) {
  const item = document.createElement('div');
  item.className = 'song-item';

  // Image or placeholder
  if (song.imageBlob) {
    const img = document.createElement('img');
    img.className = 'song-item-image';
    img.src = URL.createObjectURL(song.imageBlob);
    item.appendChild(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'song-item-placeholder';
    placeholder.textContent = song.name.charAt(0).toUpperCase();
    item.appendChild(placeholder);
  }

  // Info
  const info = document.createElement('div');
  info.className = 'song-item-info';

  const name = document.createElement('div');
  name.className = 'song-item-name';
  name.textContent = song.name;

  const meta = document.createElement('div');
  meta.className = 'song-item-meta';
  meta.textContent = song.imageBlob ? 'Has custom image' : 'Using placeholder';

  info.appendChild(name);
  info.appendChild(meta);
  item.appendChild(info);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'song-item-actions';

  const setIconBtn = document.createElement('button');
  setIconBtn.className = 'btn-small';
  setIconBtn.textContent = song.imageBlob ? 'Change Icon' : 'Set Icon';
  setIconBtn.onclick = () => setIconForSong(song.id);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-small btn-danger';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteSongWithConfirm(song.id, song.name);

  actions.appendChild(setIconBtn);
  actions.appendChild(deleteBtn);
  item.appendChild(actions);

  return item;
}

// ===== MODE SWITCHING =====
let unlockTimer = null;

function setupUnlockGesture() {
  const unlockArea = document.getElementById('unlock-area');

  function startUnlock(e) {
    e.preventDefault();
    unlockArea.classList.add('unlocking');

    unlockTimer = setTimeout(() => {
      switchToParentMode();
    }, 3000);
  }

  function cancelUnlock() {
    unlockArea.classList.remove('unlocking');
    if (unlockTimer) {
      clearTimeout(unlockTimer);
      unlockTimer = null;
    }
  }

  // Touch events (for mobile)
  unlockArea.addEventListener('touchstart', startUnlock);
  unlockArea.addEventListener('touchend', cancelUnlock);
  unlockArea.addEventListener('touchcancel', cancelUnlock);

  // Mouse events (for desktop)
  unlockArea.addEventListener('mousedown', startUnlock);
  unlockArea.addEventListener('mouseup', cancelUnlock);
  unlockArea.addEventListener('mouseleave', cancelUnlock);
}

function switchToParentMode() {
  document.getElementById('child-mode').classList.remove('active');
  document.getElementById('parent-mode').classList.add('active');
  renderParentMode();
}

function switchToChildMode() {
  document.getElementById('parent-mode').classList.remove('active');
  document.getElementById('child-mode').classList.add('active');
  renderChildMode();
}

// ===== FILE HANDLING =====
function handleAddSong() {
  const audioInput = document.getElementById('audio-input');
  audioInput.click();
}

document.getElementById('audio-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Extract name from filename (remove extension)
  const name = file.name.replace(/\.[^/.]+$/, '');

  try {
    const audioBlob = new Blob([await file.arrayBuffer()], { type: file.type });
    await addSong(name, audioBlob, null);
    await renderParentMode();
    alert(`"${name}" added successfully!`);
  } catch (err) {
    console.error('Error adding song:', err);
    alert('Failed to add song. Please try again.');
  }

  // Reset input
  e.target.value = '';
});

async function setIconForSong(songId) {
  const imageInput = document.getElementById('image-input');

  // Store songId for the change handler
  imageInput.dataset.songId = songId;
  imageInput.click();
}

document.getElementById('image-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const songId = parseInt(e.target.dataset.songId);

  if (!file || !songId) return;

  try {
    const imageBlob = new Blob([await file.arrayBuffer()], { type: file.type });
    await updateSong(songId, { imageBlob });
    await renderParentMode();
    await renderChildMode(); // Refresh child mode too
    alert('Icon updated successfully!');
  } catch (err) {
    console.error('Error setting icon:', err);
    alert('Failed to set icon. Please try again.');
  }

  // Reset input
  e.target.value = '';
  delete e.target.dataset.songId;
});

async function deleteSongWithConfirm(songId, songName) {
  if (!confirm(`Delete "${songName}"?`)) return;

  try {
    // Stop if currently playing
    if (currentSongId === songId) {
      stopPlayback();
    }

    await deleteSong(songId);
    await renderParentMode();
    await renderChildMode();
  } catch (err) {
    console.error('Error deleting song:', err);
    alert('Failed to delete song. Please try again.');
  }
}

// ===== EXPORT/IMPORT =====
async function exportLibrary() {
  try {
    const songs = await getAllSongs();

    if (songs.length === 0) {
      alert('No songs to export!');
      return;
    }

    // Convert songs to exportable format
    const exportData = {
      version: 1,
      exportDate: new Date().toISOString(),
      songs: await Promise.all(songs.map(async (song) => {
        // Convert blobs to base64
        const audioBase64 = await blobToBase64(song.audioBlob);
        const imageBase64 = song.imageBlob ? await blobToBase64(song.imageBlob) : null;

        return {
          name: song.name,
          audio: audioBase64,
          image: imageBase64,
          addedDate: song.addedDate
        };
      }))
    };

    // Create and download file
    const json = JSON.stringify(exportData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `toddler-music-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
    alert(`Exported ${songs.length} song(s) successfully!`);
  } catch (err) {
    console.error('Export error:', err);
    alert('Failed to export library. Please try again.');
  }
}

async function importLibrary() {
  const input = document.getElementById('import-input');
  input.click();
}

async function handleImport(file) {
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data.version || !data.songs) {
      alert('Invalid backup file format!');
      return;
    }

    // Confirm import
    const existingSongs = await getAllSongs();
    const message = existingSongs.length > 0
      ? `This will add ${data.songs.length} song(s) to your existing ${existingSongs.length} song(s). Continue?`
      : `Import ${data.songs.length} song(s)?`;

    if (!confirm(message)) return;

    // Import songs
    let imported = 0;
    for (const songData of data.songs) {
      try {
        // Convert base64 back to blobs
        const audioBlob = await base64ToBlob(songData.audio);
        const imageBlob = songData.image ? await base64ToBlob(songData.image) : null;

        await addSong(songData.name, audioBlob, imageBlob);
        imported++;
      } catch (err) {
        console.error(`Failed to import "${songData.name}":`, err);
      }
    }

    // Refresh UI
    await renderParentMode();
    await renderChildMode();

    alert(`Successfully imported ${imported} of ${data.songs.length} song(s)!`);
  } catch (err) {
    console.error('Import error:', err);
    alert('Failed to import library. Please check the file and try again.');
  }
}

// Helper functions for blob/base64 conversion
async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function base64ToBlob(base64) {
  const response = await fetch(base64);
  return await response.blob();
}

// ===== UTILITIES =====
function getRandomEmoji() {
  const emojis = ['🎵', '🎶', '🎸', '🎹', '🎺', '🎻', '🥁', '🎤', '🎧', '🔊', '⭐', '🌟', '✨', '🌈', '🎨', '🎪'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// ===== EVENT LISTENERS =====
document.getElementById('back-to-child').addEventListener('click', switchToChildMode);
document.getElementById('add-song-btn').addEventListener('click', handleAddSong);

// Export/Import
document.getElementById('export-btn').addEventListener('click', exportLibrary);
document.getElementById('import-btn').addEventListener('click', importLibrary);
document.getElementById('import-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleImport(file);
  }
  e.target.value = ''; // Reset input
});

// Now playing click to stop
document.getElementById('now-playing').addEventListener('click', stopPlayback);

// Keep screen on setting
document.getElementById('keep-screen-on').addEventListener('change', (e) => {
  if (e.target.checked) {
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').catch(err => {
        console.error('Wake lock error:', err);
      });
    }
  }
});

// ===== INITIALIZATION =====
async function init() {
  try {
    await initDB();
    await renderChildMode();
    setupUnlockGesture();

    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(err => {
        console.log('Service worker registration failed:', err);
      });
    }
  } catch (err) {
    console.error('Initialization error:', err);
    alert('Failed to initialize app. Please refresh the page.');
  }
}

// Start the app
init();
