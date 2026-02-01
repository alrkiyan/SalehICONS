# SalehICONS - Multi-Platform Plugin Suite

**Access 4300+ professional SVG icons across 7 design platforms**

Browse and insert beautiful icons from the Saudi Arabia Digital Government Authority directly in your favorite design tools.

---

## 🎨 Supported Platforms

| Platform | Status | Version | Download |
|----------|--------|---------|----------|
| **Adobe Illustrator** | ✅ Released | v1.2.0 | [Download](adobe-illustrator/SalehICONS-v1.2.0-Illustrator.zip) |
| **Adobe Photoshop** | 🔜 Coming Soon | - | - |
| **Adobe InDesign** | 🔜 Coming Soon | - | - |
| **Affinity Designer** | 🔜 Coming Soon | - | - |
| **Figma** | 🔜 Coming Soon | - | - |
| **Microsoft PowerPoint** | 🔜 Coming Soon | - | - |
| **Google Workspace** | 🔜 Coming Soon | - | - |

---

## ✨ Features

### 🎯 Universal Features (All Platforms)

- **4300+ Icons Per Category** - Access the complete Saudi DGA icon library
- **9 Icon Styles** - Bulk, Duotone, Solid (3 variants), Stroke (3 variants), Twotone
- **Real-Time Search** - Filter icons instantly by name
- **Smart Caching** - Icons cached for 7 days, works offline after first load
- **One-Click Insert** - Click any icon to insert as editable vector
- **Professional UI** - Clean, modern interface matching each platform
- **Free & Open Source** - No subscriptions, no limitations

### 📦 Icon Categories

1. **Bulk Rounded** - Filled with depth/transparency effects
2. **Duotone Rounded** - Two-tone color variations
3. **Solid Rounded** - Completely filled, rounded corners
4. **Solid Sharp** - Completely filled, sharp corners
5. **Solid Standard** - Completely filled, standard style
6. **Stroke Rounded** - Outlined, rounded style
7. **Stroke Sharp** - Outlined, sharp corners
8. **Stroke Standard** - Outlined, standard style
9. **Twotone Rounded** - Two-color filled icons

---

## 🚀 Quick Start

### Adobe Illustrator (Available Now)

1. **Download** the plugin: [SalehICONS-v1.2.0-Illustrator.zip](adobe-illustrator/SalehICONS-v1.2.0-Illustrator.zip)
2. **Extract** the ZIP file
3. **Follow** the [Installation Guide](adobe-illustrator/SETUP.md)
4. **Launch** Illustrator and go to **Window > Extensions > SalehICONS v1.2.0**

**System Requirements:**
- Adobe Illustrator CC 2014 or later
- macOS 10.12+ or Windows 10+
- Internet connection (first load only)

[View Complete Setup Guide →](adobe-illustrator/SETUP.md)

### Other Platforms

Coming soon! Follow this repository for updates.

---

## 📖 How It Works

1. **Browse** - Select a category and scroll through 4300+ icons
2. **Search** - Type to filter icons by name in real-time
3. **Click** - Click any icon to insert it into your document
4. **Edit** - Icons are inserted as fully editable vectors
5. **Offline** - Icons are cached for offline use after first load

---

## 🎥 Screenshots

### Adobe Illustrator Plugin

![Plugin Interface](https://via.placeholder.com/800x600?text=SalehICONS+Illustrator+Plugin)

*Clean, professional interface with search, categories, and icon grid*

---

## 📋 Platform-Specific Details

### Adobe Illustrator ✅ (v1.2.0)
- **Type:** CEP Extension
- **Installation:** Manual or via Extension Manager
- **Features:**
  - Inserts as native vector paths
  - Auto-centers on artboard
  - Groups multiple objects
  - Works with all Illustrator CC versions

[View Illustrator Documentation →](adobe-illustrator/)

### Adobe Photoshop 🔜 (Coming Soon)
- **Type:** CEP Extension
- **Features:** Places as Smart Objects with vector editability

### Adobe InDesign 🔜 (Coming Soon)
- **Type:** CEP Extension
- **Features:** Places on active page, supports master pages

### Affinity Designer 🔜 (Coming Soon)
- **Type:** Standalone Electron App
- **Features:** Clipboard-based insertion for seamless workflow

### Figma 🔜 (Coming Soon)
- **Type:** Figma Plugin
- **Features:** Native vector nodes, auto-layout compatible

### Microsoft PowerPoint 🔜 (Coming Soon)
- **Type:** Office Add-in
- **Features:** Works in desktop and web versions

### Google Workspace 🔜 (Coming Soon)
- **Type:** Apps Script Add-on
- **Features:** Supports Slides, Docs, and Sheets

---

## 🌟 Why SalehICONS?

### 🆓 Completely Free
No subscriptions, no hidden costs, no usage limits

### 🎨 Professional Quality
Icons from the Saudi Arabia Digital Government Authority

### 🌐 Multi-Platform
One icon library, works everywhere you design

### ⚡ Smart & Fast
Intelligent caching, real-time search, instant insertion

### 🔄 Always Updated
Icons fetched from GitHub, always get the latest

### 🇸🇦 Saudi Made
Proudly developed in Saudi Arabia for the world

---

## 📦 What's Included

```
SalehICONS/
├── 📁 adobe-illustrator/         ✅ Complete (v1.2.0)
│   ├── Plugin files
│   ├── Installation guide
│   └── Distribution ZIP
│
├── 📁 adobe-photoshop/           🔜 Coming Soon
├── 📁 adobe-indesign/            🔜 Coming Soon
├── 📁 affinity/                  🔜 Coming Soon
├── 📁 figma/                     🔜 Coming Soon
├── 📁 powerpoint/                🔜 Coming Soon
├── 📁 google-workspace/          🔜 Coming Soon
│
├── 📁 icons/                     39,000+ SVG icons
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
└── 📁 logos/                     SalehTechs branding
```

---

## 🛠️ Technical Details

### Architecture

Each plugin is built using platform-native technologies:

- **Adobe CC Apps:** CEP Extensions (HTML/CSS/JS + ExtendScript)
- **Figma:** Figma Plugin API (TypeScript)
- **Office:** Office Add-ins (Office.js)
- **Google:** Apps Script (JavaScript)
- **Affinity:** Electron App (Node.js)

### Icon Source

All plugins fetch icons from this GitHub repository:

**API Endpoints:**
```
https://api.github.com/repos/alrkiyan/SalehICONS/contents/icons
https://raw.githubusercontent.com/alrkiyan/SalehICONS/main/icons/{category}/{icon}.svg
```

### Caching Strategy

- Icons cached in browser LocalStorage
- 7-day cache duration
- Automatic cache refresh
- Offline support after first load

---

## 📝 Attribution

### Icons Provided By

**Saudi Arabia Digital Government Authority**
**هيئة الحكومة الرقمية السعودية**

All icons are provided by the Saudi Arabia Digital Government Authority. All rights reserved.

- **Website:** https://dga.gov.sa/
- **Figma Community:** https://www.figma.com/community/file/1392269191144731080/icons-platforms-code

### Plugin Developed By

**Saleh Alrkiyan**

Developed with ❤️ in Saudi Arabia

- **Website:** https://salehtechs.com
- **Email:** info@salehteches.com
- **GitHub:** https://github.com/alrkiyan

*From Saudi Arabia to the world 🌍*

---

## 🗺️ Roadmap

### Phase 1: Adobe Creative Cloud (In Progress)
- ✅ **Q1 2024** - Adobe Illustrator v1.2.0
- 🔜 **Q2 2024** - Adobe Photoshop
- 🔜 **Q2 2024** - Adobe InDesign

### Phase 2: Alternative Design Tools
- 🔜 **Q3 2024** - Affinity Designer
- 🔜 **Q3 2024** - Figma Plugin

### Phase 3: Productivity Apps
- 🔜 **Q4 2024** - Microsoft PowerPoint
- 🔜 **Q4 2024** - Google Workspace

### Phase 4: Expansion
- Additional Office apps (Word, Excel)
- Additional Google apps (Docs, Sheets)
- Community feedback & feature requests

---

## 💬 Support

### Get Help

- **📧 Email:** info@salehteches.com
- **🌐 Website:** https://salehtechs.com
- **💬 Issues:** [GitHub Issues](https://github.com/alrkiyan/SalehICONS/issues)

### Troubleshooting

For platform-specific troubleshooting:
- [Adobe Illustrator Setup Guide](adobe-illustrator/SETUP.md)
- Other platforms: Coming soon

### Feature Requests

Have an idea? Open an issue on GitHub or email us!

---

## 📄 License

**Plugin Code:** Open Source (MIT License)
**Icons:** Property of Saudi Arabia Digital Government Authority

The plugin code is free to use, modify, and distribute. The icons are provided by the Saudi Arabia Digital Government Authority and are subject to their terms.

---

## 🙏 Acknowledgments

Special thanks to:

- **Saudi Arabia Digital Government Authority** for providing the comprehensive icon library
- **Adobe** for the CEP platform
- **Figma** for the plugin API
- **Microsoft** and **Google** for their extensibility platforms
- **The open-source community** for inspiration and tools

---

## 📊 Statistics

- **Total Icons:** 39,000+ (4300+ per category)
- **Categories:** 9 styles
- **Platforms:** 7 (1 released, 6 planned)
- **File Size:** ~40KB per plugin
- **Cache Duration:** 7 days
- **Offline Support:** ✅ Yes

---

## 🔗 Links

- **Repository:** https://github.com/alrkiyan/SalehICONS
- **Developer:** https://salehtechs.com
- **DGA Website:** https://dga.gov.sa/
- **Figma Icons:** https://www.figma.com/community/file/1392269191144731080

---

## ⭐ Show Your Support

If you find SalehICONS useful:

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 📢 Share with colleagues
- 📝 Leave a review

---

**Made with ❤️ in Saudi Arabia 🇸🇦**

*Empowering designers worldwide with professional Saudi icons*
