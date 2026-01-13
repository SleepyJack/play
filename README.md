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

**Method 1: Direct File Access (Easiest)**
1. Transfer these files to your phone (via USB, email, cloud storage, etc.)
2. Open `index.html` in Chrome browser on your phone
3. Chrome menu (⋮) → "Add to Home Screen"
4. The app appears as an icon on your home screen
5. Opens full-screen like a native app

**Method 2: Local Server (Better for development)**
1. On your computer, run a local web server:
   ```bash
   # If you have Python:
   python3 -m http.server 8000

   # Or if you have Node.js:
   npx http-server -p 8000
   ```
2. Find your computer's local IP address:
   ```bash
   # Linux/Mac:
   ip addr show | grep "inet 192"

   # Or:
   ifconfig | grep "inet 192"
   ```
3. On your phone (connected to same WiFi):
   - Open Chrome
   - Go to `http://YOUR_IP:8000`
   - Add to Home Screen

## Parent Mode

**How to Access:**
- 3-second long-press on top-right corner of the screen
- Visual feedback appears after 1 second

**What You Can Do:**
- ✅ Add new songs (MP3, M4A, etc.)
- ✅ Set custom images for songs (JPG, PNG)
- ✅ Delete songs
- ✅ Toggle "Keep screen on" setting

**Returning to Child Mode:**
- Click "← Back to Child Mode" button
- Auto-locks after 30 seconds of inactivity (feature can be added)

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
- **Songs persist** across app restarts
- **Clearing browser data** will delete all songs (be careful!)

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

- [ ] Auto-lock Parent Mode after 30s
- [ ] Shuffle mode
- [ ] Favorites/playlists
- [ ] Volume controls
- [ ] Sleep timer
- [ ] Import multiple songs at once
- [ ] Export/backup song library

---

Built with ❤️ for toddlers who love music!
