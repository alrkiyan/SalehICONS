# SalehICONS Plugin Specifications

Each folder above will eventually contain its own independent plugin. Here are the shared specifications that apply to all three plugins:

## General Info

| Field | Value |
|-------|-------|
| Plugin Name | SalehICONS |
| Developer | Saleh Alrkiyan |
| Website | salehtechs.com |
| Email | info@salehteches.com |
| Logo & Icon | Located in the `logos/` folder at repo root |
| Attribution (must be visible in every plugin's UI) | "Icons provided by the Saudi Arabia Digital Government Authority (هيئة الحكومة الرقمية السعودية). All rights reserved. https://www.figma.com/community/file/1392269191144731080/icons-platforms-code, https://dga.gov.sa/" |

## Icon Data Source

All three plugins must fetch icons dynamically from the same GitHub repo: https://github.com/alrkiyan/SalehICONS

Use the GitHub raw content API:

- **List categories:** `https://api.github.com/repos/alrkiyan/SalehICONS/contents/icons`
- **List icons in a category:** `https://api.github.com/repos/alrkiyan/SalehICONS/contents/icons/{categoryName}`
- **Raw SVG file:** `https://raw.githubusercontent.com/alrkiyan/SalehICONS/main/icons/{categoryName}/{iconFile}.svg`

## UI Requirements (same for all three)

- Clean, modern, professional UI.
- Display the SalehICONS logo from the `logos/` folder at the top.
- A search bar that filters icons by name in real time.
- Category filter (tabs or dropdown) for the 9 icon categories.
- A responsive grid of icon thumbnails showing SVG previews + filenames.
- Attribution text at the bottom thanking the Saudi Arabia Digital Government Authority.
- Loading and error states with a retry option.
- Client-side caching so icons are not re-fetched every time.

## How Each Plugin Inserts Icons

### adobe-illustrator/ (ExtendScript .jsx)

- The plugin is a `.jsx` file using ExtendScript + ScriptUI to build the panel UI.
- **Installed by placing the `.jsx` file inside:** `Adobe Illustrator [VERSION]/Presets/Scripts/`
- **Launched via:** File > Scripts > SalehICONS
- **When the user clicks an icon**, the plugin downloads the SVG to a temp file, then uses the Illustrator ExtendScript API (`app.activeDocument`, `document.placedItems` or `document.layers`) to place the SVG as a fully editable vector object onto the active artboard.

### adobe-photoshop/ (ExtendScript .jsx)

- The plugin is a `.jsx` file using ExtendScript + ScriptUI to build the panel UI.
- **Installed by placing the `.jsx` file inside:** `Adobe Photoshop [VERSION]/Presets/Scripts/`
- **Launched via:** File > Scripts > SalehICONS
- **When the user clicks an icon**, the plugin downloads the SVG to a temp file, then uses the Photoshop ExtendScript API (`app.activeDocument`, `document.placedItems`) to place the SVG as a Smart Object / vector layer in the active document.

### affinity/ (Clipboard-based .jsx helper)

Since Affinity by Canva has no ExtendScript or plugin API, the plugin for Affinity works differently:

- It is a `.jsx` file that acts as a standalone ScriptUI panel (can be run via Adobe's ExtendScript Toolkit, or wrapped in a simple Electron app later).
- The UI is identical to the other two plugins.
- **When the user clicks an icon** while Affinity is the active/foreground application, the plugin:
  1. Downloads the SVG file to a temporary location on disk.
  2. Copies the SVG file to the system clipboard.
  3. Programmatically triggers Ctrl+V (Windows) or Cmd+V (macOS) to paste it into Affinity.
- Affinity natively supports pasting SVG files and imports them as fully editable vector objects in the Vector Studio.

## IMPORTANT NOTES

- All three plugins share the same icon data source (the GitHub repo).
- All three plugins share the same UI design and branding.
- Each plugin folder is independent — do not mix files between folders.
- For now, only create the folder structure and push the icons/logos to GitHub. Do not write any plugin code yet.
- Push the final folder structure to the same GitHub repo after creating it.
