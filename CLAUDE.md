# SalehICONS - Multi-Platform Plugin Suite

A comprehensive suite of plugins that brings 4300+ professional SVG icons from the Saudi Arabia Digital Government Authority to designers across multiple platforms.

## Project Overview

This repository contains plugins for 7 different design platforms, each providing seamless access to the complete Saudi DGA icon library directly within the application.

### Supported Platforms

| Platform | Status | Technology | Type |
|----------|--------|------------|------|
| Adobe Illustrator | ✅ **Complete** | CEP Extension | Native Plugin |
| Adobe Photoshop | 🔜 Planned | CEP Extension | Native Plugin |
| Adobe InDesign | 🔜 Planned | CEP Extension | Native Plugin |
| Affinity Designer | 🔜 Planned | Electron App | Clipboard Helper |
| Figma | 🔜 Planned | Figma Plugin API | Native Plugin |
| Microsoft PowerPoint | 🔜 Planned | Office Add-in | Web Add-in |
| Google Workspace | 🔜 Planned | Apps Script | Web Add-on |

---

## Shared Specifications

All plugins across all platforms share these common specifications:

### General Info

| Field | Value |
|-------|-------|
| Plugin Name | SalehICONS |
| Developer | Saleh Alrkiyan |
| Website | https://salehtechs.com |
| Email | info@salehteches.com |
| Version | 1.2.0 (Illustrator) |
| Logo & Icon | Located in the `logos/` folder at repo root |

### Attribution (Required in All Plugin UIs)

```
Icons provided by the Saudi Arabia Digital Government Authority
(هيئة الحكومة الرقمية السعودية). All rights reserved.
https://dga.gov.sa/

Developed with ❤️ by Saleh Alrkiyan
From Saudi Arabia to the world 🌍
```

**Links:**
- DGA Website: https://dga.gov.sa/
- Figma Community: https://www.figma.com/community/file/1392269191144731080/icons-platforms-code
- Developer: https://salehtechs.com

### Icon Data Source

All plugins fetch icons dynamically from the same GitHub repository:

**Repository:** https://github.com/alrkiyan/SalehICONS

**GitHub API Endpoints:**
- List categories: `https://api.github.com/repos/alrkiyan/SalehICONS/contents/icons`
- List icons in category: `https://api.github.com/repos/alrkiyan/SalehICONS/contents/icons/{categoryName}`
- Raw SVG file: `https://raw.githubusercontent.com/alrkiyan/SalehICONS/main/icons/{categoryName}/{iconFile}.svg`

**Icon Categories (9 total):**
1. bulk-rounded
2. duotone-rounded
3. solid-rounded
4. solid-sharp
5. solid-standard
6. stroke-rounded
7. stroke-sharp
8. stroke-standard
9. twotone-rounded

**Total Icons:** 4300+ icons per category

### UI Requirements (All Platforms)

Every plugin must include:

✅ Clean, modern, professional UI matching the host application's design language
✅ SalehICONS logo displayed at the top (clickable, opens https://salehtechs.com)
✅ Search bar with real-time filtering by icon name
✅ Category selector (dropdown/tabs) for 9 icon categories
✅ Responsive grid showing icon thumbnails with SVG previews
✅ Icon count display (e.g., "Showing 150 of 4300+ icons")
✅ Document/canvas status indicator
✅ Attribution footer with DGA and developer credits
✅ Loading states with spinner
✅ Error states with retry button
✅ Client-side caching (7-day duration) for offline use

---

## Platform-Specific Implementation Details

### 1. Adobe Illustrator ✅ (Complete - v1.2.0)

**Technology:** CEP (Common Extensibility Platform) Extension

**Architecture:**
- **Frontend:** HTML/CSS/JavaScript (Chromium-based panel)
- **Backend:** ExtendScript (.jsx) for Illustrator API
- **Communication:** CSInterface bridge

**Installation:**
- Manual: Copy to `~/Library/Application Support/Adobe/CEP/extensions/` (Mac) or `%AppData%\Adobe\CEP\extensions\` (Windows)
- Package: .zxp file installable via Anastasiy's Extension Manager

**Icon Insertion Method:**
1. Download SVG as text via JavaScript fetch
2. Encode to Base64
3. Pass to ExtendScript via CEP bridge
4. Decode Base64 to SVG content
5. Write to temp file
6. Open SVG as temporary Illustrator document
7. Select all artwork
8. Copy to clipboard
9. Switch to user's document
10. Paste as native vector objects
11. Position at artboard center
12. Group if multiple objects

**Key Features:**
- Works with all Illustrator versions CC 2014+
- Icons inserted as fully editable vector paths
- Automatic positioning at artboard center
- Smart caching reduces API calls
- Handles 4300+ icons per category

**Files:** See `adobe-illustrator/` folder

---

### 2. Adobe Photoshop 🔜 (Planned)

**Technology:** CEP Extension (same as Illustrator)

**Architecture:**
- HTML/CSS/JavaScript UI
- ExtendScript for Photoshop API
- CSInterface bridge

**Installation:**
- Same CEP extension installation as Illustrator
- Different manifest and host script

**Icon Insertion Method:**
1. Download SVG via JavaScript
2. Save to temp file
3. Use ExtendScript to place as Smart Object
4. Position at document center
5. Maintain vector editability

**Key Differences from Illustrator:**
- Places as Smart Object instead of native paths
- Uses `app.activeDocument.placedItems` or `app.open()` then import
- May require rasterization for certain layer types
- Color mode considerations (RGB/CMYK)

**Target Support:** Photoshop CC 2014+

---

### 3. Adobe InDesign 🔜 (Planned)

**Technology:** CEP Extension

**Architecture:**
- HTML/CSS/JavaScript UI
- ExtendScript for InDesign API
- CSInterface bridge

**Installation:**
- Same CEP extension method
- InDesign-specific manifest

**Icon Insertion Method:**
1. Download SVG
2. Save to temp file
3. Use ExtendScript to place on active page
4. Create frame if needed
5. Position based on cursor or page center

**Key Features:**
- Place on active page/spread
- Maintain vector editability
- Support for master pages
- Multi-page document support
- Layer management

**Target Support:** InDesign CC 2014+

---

### 4. Affinity Designer 🔜 (Planned)

**Technology:** Standalone Electron App (Affinity has no official plugin API)

**Architecture:**
- Electron app with system-level clipboard access
- Detects Affinity as foreground application
- HTML/CSS/JavaScript UI (same as Adobe plugins)

**Installation:**
- Download .app (Mac) or .exe (Windows)
- Launch alongside Affinity Designer

**Icon Insertion Method (Clipboard-based):**
1. User clicks icon in plugin UI
2. Download SVG to temp location
3. Copy SVG file path to system clipboard
4. Detect Affinity Designer as active window
5. Programmatically trigger Cmd+V (Mac) or Ctrl+V (Windows)
6. Affinity imports SVG as native vector object

**Key Challenges:**
- No direct API, relies on clipboard
- Requires OS-level permissions for keyboard automation
- Must detect active application
- Platform-specific keyboard shortcuts

**Platforms:** macOS, Windows

---

### 5. Figma 🔜 (Planned)

**Technology:** Figma Plugin API

**Architecture:**
- Figma Plugin (TypeScript/JavaScript)
- Uses Figma Plugin API
- UI rendered in Figma's iframe sandbox

**Installation:**
- Published to Figma Community
- Install via Plugins > Browse plugins > SalehICONS

**Icon Insertion Method:**
1. Download SVG via fetch
2. Parse SVG to extract paths
3. Use Figma API to create vector nodes
4. Position on active frame/canvas
5. Group if multiple shapes

**Key Features:**
- Native Figma vector nodes (not imported files)
- Auto-layout compatible
- Component creation option
- Color customization support
- Works in browser and desktop app

**API Methods:**
- `figma.createNodeFromSvg()`
- `figma.createVector()`
- `figma.currentPage.appendChild()`

---

### 6. Microsoft PowerPoint 🔜 (Planned)

**Technology:** Office Add-in (Web-based)

**Architecture:**
- HTML/CSS/JavaScript (Office.js)
- Task pane add-in
- Uses Office JavaScript API

**Installation:**
- Publish to Microsoft AppSource
- Install via Insert > Get Add-ins

**Icon Insertion Method:**
1. Download SVG via JavaScript
2. Convert SVG to Office.js shape format
3. Use PowerPoint API to insert shape
4. Position on active slide

**Key Features:**
- Works in PowerPoint Online and Desktop
- Cross-platform (Windows/Mac/Web)
- Slide-specific insertion
- Resizable with aspect ratio lock

**API Methods:**
- `Office.context.document.setSelectedDataAsync()`
- `PowerPoint.createShape()`

**Target Support:** PowerPoint 2016+, Office 365

---

### 7. Google Workspace 🔜 (Planned)

**Technology:** Google Apps Script Add-on

**Sub-Plugins:**
- **Google Slides** (primary)
- **Google Docs** (secondary)
- **Google Sheets** (tertiary)

**Architecture:**
- Apps Script (JavaScript)
- HTML Service for UI
- Sidebar interface

**Installation:**
- Publish to Google Workspace Marketplace
- Install via Add-ons menu

**Icon Insertion Method (Google Slides):**
1. Download SVG
2. Convert to PNG or import as image URL
3. Use Slides API to insert image
4. Position on active slide

**Icon Insertion Method (Google Docs):**
1. Download SVG
2. Convert to inline image
3. Insert at cursor position

**Key Challenges:**
- Limited SVG support (may require PNG conversion)
- API rate limits
- Image hosting considerations

**API:** Google Apps Script API, Slides API

---

## Folder Structure

```
SalehICONS/
├── logos/                          # Shared branding assets
│   ├── SalehTechs_logo.svg
│   └── SalehTechs_Icon.svg
│
├── icons/                          # Icon library (4300+ per category)
│   ├── bulk-rounded/
│   ├── duotone-rounded/
│   ├── solid-rounded/
│   ├── solid-sharp/
│   ├── solid-standard/
│   ├── stroke-rounded/
│   ├── stroke-sharp/
│   ├── stroke-standard/
│   └── twotone-rounded/
│
├── adobe-illustrator/              # ✅ Complete
│   ├── com.salehicons.illustrator/
│   ├── SalehICONS-v1.2.0-Illustrator.zip
│   └── SETUP.md
│
├── adobe-photoshop/                # 🔜 Planned
│   └── (to be implemented)
│
├── adobe-indesign/                 # 🔜 Planned
│   └── (to be implemented)
│
├── affinity/                       # 🔜 Planned
│   └── (to be implemented)
│
├── figma/                          # 🔜 Planned
│   └── (to be implemented)
│
├── powerpoint/                     # 🔜 Planned
│   └── (to be implemented)
│
├── google-workspace/               # 🔜 Planned
│   └── (to be implemented)
│
├── CLAUDE.md                       # This file - Project specifications
└── README.md                       # General project overview
```

---

## Development Roadmap

### Phase 1: Adobe Creative Cloud ✅ (In Progress)
- ✅ Adobe Illustrator v1.2.0 (Complete)
- 🔜 Adobe Photoshop
- 🔜 Adobe InDesign

### Phase 2: Alternative Design Tools
- 🔜 Affinity Designer (Electron app)
- 🔜 Figma Plugin

### Phase 3: Productivity Apps
- 🔜 Microsoft PowerPoint (Office Add-in)
- 🔜 Google Slides (Apps Script)

### Phase 4: Expansion
- Additional Google Workspace apps (Docs, Sheets)
- Additional Office apps (Word, Excel)
- Canva integration (if API available)

---

## Important Notes

- **Each plugin is independent** — separate folder, separate installation, no shared code
- **All plugins use the same icon source** — GitHub repo ensures consistency
- **All plugins follow the same UI/UX** — Familiar experience across platforms
- **All plugins include proper attribution** — DGA and developer credits visible
- **All plugins cache icons** — Reduces API calls and enables offline use
- **Version numbers are independent** — Each plugin has its own versioning

---

## Support & Contact

**Developer:** Saleh Alrkiyan
**Email:** info@salehteches.com
**Website:** https://salehtechs.com

**Icon Provider:** Saudi Arabia Digital Government Authority
**Website:** https://dga.gov.sa/

---

*From Saudi Arabia to the world 🌍*
