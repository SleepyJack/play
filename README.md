# Toddler Music Player

A simple, offline-capable music player designed for toddlers (2+ years old).

## Features

- ✅ **Super simple interface** - Large image tiles, tap to play
- ✅ **Works offline** - All songs stored locally in browser
- ✅ **Two-mode design** - Child mode (distraction-free) and Parent mode (add/manage songs)
- ✅ **No installation required** - Just open in browser
- ✅ **Installable as PWA** - Add to home screen for app-like experience

## How to Use

### Live App (Recommended)

**Access the app at: https://sleepyjack.github.io/play/**

1. Open the URL above on your phone in Chrome
2. Chrome menu (⋮) → **"Add to Home Screen"**
3. The app appears as an icon on your home screen
4. Opens full-screen like a native app
5. Hold the top-right corner for 3 seconds to unlock Parent Mode
6. Add songs and set custom icons
7. Return to Child Mode and enjoy!

**Your songs are stored privately** in your phone's browser storage - they never get uploaded anywhere. The GitHub repo only contains the app code, not your music files.

### Local Development

For developers who want to modify the code:

1. Clone this repository
2. Open `index.html` in Chrome or Firefox to test locally
3. Or run a local server for testing:
   ```bash
   # Navigate to the project directory
   cd /path/to/play

   # Start a local server
   python3 -m http.server 8000    # Linux/Mac
   python -m http.server 8000     # Windows

   # Access at http://localhost:8000
   ```

## Parent Mode

**How to Access:**
- 3-second long-press on top-right corner of the screen
- Visual feedback appears after 1 second

**What You Can Do:**
- ✅ Add new songs (MP3, M4A, etc.)
- ✅ Set custom images for songs (JPG, PNG)
- ✅ Delete songs
- ✅ Export/import your song library
- ✅ Toggle "Keep screen on" setting

**Returning to Child Mode:**
- Click "← Back to Child Mode" button
- Auto-locks after 30 seconds of inactivity (feature can be added)

## Backup & Restore

The app includes export/import functionality to backup your entire song library and restore it anywhere.

### Export Library (📥)

**How it works:**
1. In Parent Mode, tap "📥 Export Library"
2. Downloads a backup file: `toddler-music-backup-YYYY-MM-DD.json`
3. Contains all your songs, images, and metadata
4. Save it to Google Drive, your computer, or anywhere safe

**Use cases:**
- 💾 **Backup before clearing browser data**
- 📱 **Transfer to another device** (e.g., set up grandma's tablet)
- 👨‍👩‍👧 **Share with family** so everyone has the same songs
- 🔄 **Restore after data loss**

### Import Library (📤)

**How it works:**
1. In Parent Mode, tap "📤 Import Library"
2. Select your backup `.json` file
3. Confirms how many songs will be added
4. Imports songs into your library

**Notes:**
- ✅ Import **adds** to existing songs (doesn't replace)
- ✅ Works across different browsers and devices
- ✅ Completely offline after downloading the backup
- ⚠️ Backup files can be large (~5-10MB per song with image)

## Child Mode

- **Large, scrollable grid of songs**
- **Tap any song to play**
- **Tap again to pause**
- **Currently playing indicator** at bottom
- **No buttons or distractions**

## Song Icons

Songs without custom images show:
- Random music emoji (🎵, 🎸, 🎹, etc.)
- First letter of song name
- Colorful gradient background

You can add custom images anytime in Parent Mode.

## Storage

- **Everything stored locally** in your browser's IndexedDB
- **No internet required** after first load (Progressive Web App)
- **Songs persist** across app restarts
- **Your data is private** - songs and images never leave your device
- **⚠️ Clearing browser data will delete ALL songs** - only do this if you want to start fresh
- **Storage capacity** - Modern browsers allow 100+ MB, enough for many songs with images

## Browser Compatibility

- ✅ Chrome/Edge (Android/Desktop) - Full support
- ✅ Firefox (Android/Desktop) - Full support
- ✅ Safari (iOS) - Full support (add to home screen works)
- ❌ Old browsers without IndexedDB support

## Tips

1. **File names become song names** - Name your MP3s descriptively (e.g., "Twinkle Twinkle.mp3")
2. **Use square images** - They look best in the grid (1:1 aspect ratio)
3. **Keep songs under 10MB** - Browser storage has limits
4. **Use recognizable images** - Your toddler needs to identify songs visually

## Troubleshooting

**"No songs appear after adding"**
- Refresh the page
- Check browser console for errors (F12)

**"Cannot play song"**
- Ensure audio file is valid MP3/M4A
- Some browsers don't support all audio formats

**"App won't install on home screen"**
- Make sure you're using Chrome/Safari
- Try accessing via HTTPS (required for some PWA features)

**"Screen keeps turning off"**
- Enable "Keep screen on" in Parent Mode settings
- Note: This requires browser permission

## Privacy

- No data leaves your device
- No analytics or tracking
- No internet connection required
- All songs stored locally in browser

## Future Enhancements (Ideas)

- [x] Export/backup song library ✅ **Implemented!**
- [ ] Auto-lock Parent Mode after 30s
- [ ] Shuffle mode
- [ ] Favorites/playlists
- [ ] Volume controls
- [ ] Sleep timer
- [ ] Batch import multiple songs at once (currently one at a time)

---

Built with ❤️ for toddlers who love music!
