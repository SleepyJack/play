# Toddler Music Player

A simple, offline-capable music player designed for toddlers (2+ years old).

## Features

- ✅ **Super simple interface** - Large image tiles, tap to play
- ✅ **Works offline** - All songs stored locally in browser
- ✅ **Two-mode design** - Child mode (distraction-free) and Parent mode (add/manage songs)
- ✅ **No installation required** - Just open in browser
- ✅ **Installable as PWA** - Add to home screen for app-like experience

## How to Use

### Testing on Your Computer

1. Open `index.html` in Chrome or Firefox
2. You'll see an empty state (no songs yet)
3. Hold the top-right corner for 3 seconds to unlock Parent Mode
4. Click "Add New Song" and select an MP3 file
5. The song appears with a random emoji placeholder
6. Click "Set Icon" next to any song to add a custom image

### Installing on Your Phone

**Method 1: Direct File Access (Recommended for Final Deployment)**

For Android devices, use the **standalone version** which bundles everything into a single file:

1. Transfer `index-standalone.html` to your phone (via USB, email, cloud storage, etc.)
2. Open `index-standalone.html` in Chrome browser on your phone
3. Chrome menu (⋮) → "Add to Home Screen"
4. The app appears as an icon on your home screen
5. Opens full-screen like a native app
6. Add your songs directly on the phone

**Note:** The standalone file (`index-standalone.html`) works better on Android because some browsers block loading external CSS/JS files from `file://` URLs. If you're deploying to desktop or using a web server, you can use the regular `index.html` instead.

**Method 2: Local Server (For Development/Testing Only)**

⚠️ **Important:** Songs added using this method are stored in your phone's browser storage tied to the server URL (e.g., `http://192.168.1.5:8000`). They will NOT be accessible if you later switch to Method 1 (local file access). Use this method for testing only, then use Method 1 for final deployment and re-add your songs.

1. On your computer, run a local web server **from the directory containing the app files**:
   ```bash
   # Navigate to the app directory FIRST
   cd /path/to/toddler-music-player

   # Then start the server:

   # If you have Python (Linux/Mac):
   python3 -m http.server 8000

   # If you have Python (Windows):
   python -m http.server 8000

   # Or if you have Node.js (all platforms):
   npx http-server -p 8000
   ```

2. Find your computer's local IP address:
   ```bash
   # Linux/Mac:
   ip addr show | grep "inet 192"
   # Or:
   ifconfig | grep "inet 192"

   # Windows (Command Prompt):
   ipconfig
   # Look for "IPv4 Address" under your WiFi/Ethernet adapter (e.g., 192.168.1.XXX)

   # Windows (PowerShell):
   Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"}
   ```

3. On your phone (connected to same WiFi):
   - Open Chrome
   - Go to `http://YOUR_IP:8000` (replace YOUR_IP with the address from step 2)
   - Test the app, try adding songs
   - Note: Songs added here will persist only while accessing from this URL

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
- **No internet required** after first load
- **Songs persist** across app restarts within the same browser and origin
- **Storage is origin-specific**: Songs added when accessing via `http://192.168.1.5:8000` are separate from songs added via `file:///sdcard/music/index.html`
- **⚠️ Clearing browser data will delete ALL songs**, including your deployed app's library, not just orphaned dev server data! Only clear browser data if you want to start fresh or need to remove bloat from testing.
- **Note**: If you test using the local server method and add songs, those songs will remain in your phone's browser storage even after switching to local file access, but won't be accessible. They just add minor storage bloat.

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
