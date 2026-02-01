# SalehICONS - Adobe Illustrator Plugin

Browse and insert 39,000+ SVG icons from 9 categories directly in Adobe Illustrator.

## Features

- **39,000+ Icons**: Access the complete Saudi Arabia Digital Government Authority icon library
- **9 Categories**: Bulk, Duotone, Solid (Rounded/Sharp/Standard), Stroke (Rounded/Sharp/Standard), Twotone
- **Real-time Search**: Filter icons instantly by name
- **Smart Caching**: Icons are cached locally for 7 days for offline use
- **One-Click Insert**: Click any icon to insert it as editable vector into your document
- **Clean UI**: Modern, professional interface that fits Illustrator's design language

## Installation

### Method 1: Easy Install (Recommended)

1. **Download the Plugin**
   - Get the latest `.zxp` package from releases

2. **Install Anastasiy's Extension Manager**
   - Download from: https://install.anastasiy.com/
   - Free tool for installing Adobe extensions

3. **Install the Plugin**
   - Open Anastasiy's Extension Manager
   - Drag and drop the `.zxp` file into the window
   - Click "Install"

4. **Restart Illustrator**
   - Close and reopen Adobe Illustrator

5. **Open the Panel**
   - Go to: **Window > Extensions > SalehICONS**

### Method 2: Manual Installation

1. **Locate CEP Extensions Folder**

   **macOS:**
   ```
   ~/Library/Application Support/Adobe/CEP/extensions/
   ```

   **Windows:**
   ```
   C:\Users\[USERNAME]\AppData\Roaming\Adobe\CEP\extensions\
   ```

   If the folder doesn't exist, create it.

2. **Copy Plugin Folder**
   - Extract the plugin files
   - Copy the entire `com.salehicons.illustrator` folder to the extensions directory

3. **Enable Debug Mode**

   You need to enable CEP debug mode for manually installed extensions:

   **macOS:**
   ```bash
   defaults write com.adobe.CSXS.9 PlayerDebugMode 1
   defaults write com.adobe.CSXS.10 PlayerDebugMode 1
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   ```

   **Windows:**

   Create/edit this registry key:
   ```
   REGEDIT > HKEY_CURRENT_USER/Software/Adobe/CSXS.9
   Add key: PlayerDebugMode, Type: String, Value: 1
   ```

   Repeat for CSXS.10 and CSXS.11

4. **Restart Illustrator**

5. **Open the Panel**
   - Go to: **Window > Extensions > SalehICONS**

## Usage

### Basic Usage

1. **Open a Document**
   - Create a new document or open an existing one
   - The plugin requires an open document to insert icons

2. **Browse Icons**
   - Use the category dropdown to switch between icon styles
   - Scroll through the grid to browse available icons

3. **Search Icons**
   - Type in the search box to filter icons by name
   - Search works across both display names and filenames

4. **Insert Icons**
   - Click any icon to insert it into your document
   - Icons are inserted as embedded vectors at the center of the active artboard
   - The inserted icon will be automatically selected

### Tips

- **Categories**: Try different categories to find the style that fits your design
  - **Bulk**: Filled with transparency/depth effects
  - **Duotone**: Two-tone color variations
  - **Solid**: Completely filled shapes (3 variants)
  - **Stroke**: Outlined icons (3 variants)
  - **Twotone**: Two-color filled icons

- **Search**: Use descriptive terms like "arrow", "home", "user", "settings"

- **Caching**: Icons are cached for 7 days. The first load of each category requires internet, but subsequent loads work offline

- **Document Status**: Check the bottom of the panel to see if a document is open

## Troubleshooting

### Panel Doesn't Appear

1. **Check Installation**
   - Verify files are in the correct CEP extensions folder
   - Ensure folder name is exactly: `com.salehicons.illustrator`

2. **Enable Debug Mode**
   - For manual installations, PlayerDebugMode must be set to 1
   - Run the debug mode commands for your OS (see installation)

3. **Check Illustrator Version**
   - Plugin requires Adobe Illustrator CC 2014 or later
   - Check your version: **Help > About Illustrator**

4. **Restart Computer**
   - Sometimes a full restart is needed after enabling debug mode

### Icons Won't Load

1. **Check Internet Connection**
   - First-time loading requires internet to fetch icons from GitHub
   - After caching, icons work offline

2. **Check GitHub Access**
   - Ensure GitHub is not blocked by firewall/proxy
   - Test: Visit https://github.com/alrkiyan/SalehICONS in your browser

3. **Clear Cache**
   - Open browser console in panel (if available)
   - Run: `Cache.clear()`
   - Reload the panel

4. **API Rate Limits**
   - GitHub API allows 60 requests/hour unauthenticated
   - Wait 1 hour if you hit the limit
   - Cached icons work during rate limiting

### Icons Won't Insert

1. **Open a Document**
   - The panel shows "No document" at the bottom
   - Create or open a document first

2. **Check System Commands**
   - macOS: Ensure `curl` is available (pre-installed)
   - Windows: Ensure PowerShell is available (pre-installed)

3. **File Permissions**
   - Illustrator needs write access to temp folder
   - Check folder permissions: `Folder.temp` path

### Panel UI Issues

1. **Panel Too Small**
   - Drag the panel edges to resize
   - Minimum size: 320x400px
   - Maximum size: 1200x2000px

2. **Thumbnails Not Loading**
   - Check internet connection
   - Check browser console for errors
   - Try refreshing the panel

## Development

### Debug Mode

To enable debugging:

1. **Set Debug Port**
   - Edit `.debug` file in plugin root
   - Default port: 8088

2. **Open Chrome DevTools**
   - Open Chrome/Edge browser
   - Navigate to: `http://localhost:8088`
   - DevTools will connect to the panel

3. **View Console**
   - All console.log() messages appear here
   - Inspect DOM, network requests, etc.

### File Structure

```
com.salehicons.illustrator/
├── CSXS/
│   └── manifest.xml          # CEP configuration
├── host/
│   └── illustrator.jsx       # ExtendScript bridge
├── client/
│   ├── index.html           # UI markup
│   ├── css/
│   │   └── style.css        # Styles
│   ├── js/
│   │   ├── CSInterface.js   # Adobe CEP library
│   │   ├── cache.js         # LocalStorage manager
│   │   ├── api.js           # GitHub API client
│   │   └── main.js          # App logic
│   └── assets/
│       ├── logo.svg         # SalehTechs logo
│       └── icon.svg         # Panel icon
├── .debug                   # Debug config
└── README.md               # This file
```

### Modifying the Plugin

- **UI Changes**: Edit `client/index.html` and `client/css/style.css`
- **App Logic**: Edit `client/js/main.js`
- **API Changes**: Edit `client/js/api.js`
- **Caching**: Edit `client/js/cache.js`
- **Illustrator Integration**: Edit `host/illustrator.jsx`
- **Panel Config**: Edit `CSXS/manifest.xml`

After changes, reload the panel: **Window > Extensions > SalehICONS** (toggle off/on)

## Credits

**Plugin Developer:** Saleh Alrkiyan
**Website:** https://salehtechs.com
**Email:** info@salehteches.com

**Icon Library:** Saudi Arabia Digital Government Authority (هيئة الحكومة الرقمية السعودية)
**Icon Source:** https://dga.gov.sa/
**Figma Community:** https://www.figma.com/community/file/1392269191144731080/icons-platforms-code

All icons are provided by the Saudi Arabia Digital Government Authority. All rights reserved.

## License

This plugin is provided as-is. The icons are property of the Saudi Arabia Digital Government Authority.

## Support

For issues, questions, or feature requests:
- Email: info@salehteches.com
- GitHub Issues: https://github.com/alrkiyan/SalehICONS/issues

## Version History

### v1.0.0 (Initial Release)
- Browse 39,000+ icons across 9 categories
- Real-time search functionality
- Smart caching (7-day duration)
- One-click icon insertion
- Support for Illustrator CC 2014+
- Cross-platform (macOS/Windows)
