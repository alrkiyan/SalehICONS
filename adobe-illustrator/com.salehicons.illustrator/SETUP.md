# SalehICONS - Installation Guide

## What You'll Need

- Adobe Illustrator (any version from CC 2014 or later)
- The SalehICONS plugin ZIP file
- 5 minutes of your time

---

## Installation Instructions

### For Mac Users

#### Step 1: Unzip the Plugin
1. Locate the `com.salehicons.illustrator.zip` file you downloaded
2. Double-click it to unzip (you should see a folder named `com.salehicons.illustrator`)

#### Step 2: Open the Extensions Folder
1. Open **Finder**
2. Click on **Go** in the menu bar at the top
3. Hold the **Option (⌥)** key on your keyboard
4. Click **Library** (it appears when you hold Option)
5. Navigate to: `Application Support` → `Adobe` → `CEP` → `extensions`

   **Note:** If you don't see the `CEP` or `extensions` folders, create them:
   - Right-click and select **New Folder**
   - Create `CEP` folder inside Adobe
   - Create `extensions` folder inside CEP

#### Step 3: Copy the Plugin
1. Drag the `com.salehicons.illustrator` folder into the `extensions` folder
2. The final path should be:
   ```
   ~/Library/Application Support/Adobe/CEP/extensions/com.salehicons.illustrator
   ```

#### Step 4: Enable the Plugin (One-Time Setup)
1. Open **Terminal** (Applications → Utilities → Terminal)
2. Copy and paste the following commands (press Enter after each):

   ```bash
   defaults write com.adobe.CSXS.9 PlayerDebugMode 1
   defaults write com.adobe.CSXS.10 PlayerDebugMode 1
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   defaults write com.adobe.CSXS.12 PlayerDebugMode 1
   ```

3. Close Terminal

#### Step 5: Launch the Plugin
1. **Restart Adobe Illustrator** (if it's already open)
2. Open Illustrator
3. Go to **Window** → **Extensions** → **SalehICONS v1.2.0**
4. The SalehICONS panel will appear - you're ready to use it!

---

### For Windows Users

#### Step 1: Unzip the Plugin
1. Locate the `com.salehicons.illustrator.zip` file you downloaded
2. Right-click on it and select **Extract All...**
3. Click **Extract** (you should see a folder named `com.salehicons.illustrator`)

#### Step 2: Open the Extensions Folder
1. Press **Windows Key + R** to open the Run dialog
2. Copy and paste this path and press Enter:
   ```
   %AppData%\Adobe\CEP\extensions
   ```

   **Note:** If you see an error that the folder doesn't exist:
   - Open File Explorer
   - Navigate to: `C:\Users\[YOUR USERNAME]\AppData\Roaming\Adobe`
   - Create a folder named `CEP`
   - Inside CEP, create a folder named `extensions`

#### Step 3: Copy the Plugin
1. Drag the `com.salehicons.illustrator` folder into the `extensions` folder
2. The final path should be:
   ```
   C:\Users\[YOUR USERNAME]\AppData\Roaming\Adobe\CEP\extensions\com.salehicons.illustrator
   ```

#### Step 4: Enable the Plugin (One-Time Setup)
1. Press **Windows Key + R** to open the Run dialog
2. Type `regedit` and press Enter (click Yes if asked for permission)
3. In the Registry Editor, navigate to:
   ```
   HKEY_CURRENT_USER\Software\Adobe
   ```

4. For **each** of the following, create a new key:
   - Right-click on `Adobe` → **New** → **Key**
   - Name it `CSXS.9`, then repeat for `CSXS.10`, `CSXS.11`, and `CSXS.12`

5. For **each** CSXS key you created:
   - Click on the key (e.g., `CSXS.9`)
   - Right-click in the right panel → **New** → **String Value**
   - Name it: `PlayerDebugMode`
   - Double-click on it and set the value to: `1`
   - Click OK

6. Close the Registry Editor

**Alternative (PowerShell - Easier):**

1. Right-click on the **Start menu** → select **Windows PowerShell (Admin)**
2. Copy and paste these commands (press Enter after each):

   ```powershell
   New-Item -Path "HKCU:\Software\Adobe\CSXS.9" -Force
   New-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.9" -Name PlayerDebugMode -Value "1" -PropertyType String -Force

   New-Item -Path "HKCU:\Software\Adobe\CSXS.10" -Force
   New-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.10" -Name PlayerDebugMode -Value "1" -PropertyType String -Force

   New-Item -Path "HKCU:\Software\Adobe\CSXS.11" -Force
   New-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.11" -Name PlayerDebugMode -Value "1" -PropertyType String -Force

   New-Item -Path "HKCU:\Software\Adobe\CSXS.12" -Force
   New-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.12" -Name PlayerDebugMode -Value "1" -PropertyType String -Force
   ```

3. Close PowerShell

#### Step 5: Launch the Plugin
1. **Restart Adobe Illustrator** (if it's already open)
2. Open Illustrator
3. Go to **Window** → **Extensions** → **SalehICONS v1.2.0**
4. The SalehICONS panel will appear - you're ready to use it!

---

## How to Use SalehICONS

1. **Open a document** in Illustrator (create a new one or open an existing file)
2. **Browse icons** by category using the dropdown menu
3. **Search** for icons by name using the search box
4. **Click any icon** to insert it into your document
5. The icon will appear as an editable vector object on your artboard

---

## Troubleshooting

### The plugin doesn't appear in the Extensions menu

**Solution 1:** Make sure the folder name is exactly `com.salehicons.illustrator` (no extra spaces or characters)

**Solution 2:** Check that PlayerDebugMode is enabled (repeat Step 4 above)

**Solution 3:** Completely restart your computer (not just Illustrator)

**Solution 4:** Make sure you're using Illustrator CC 2014 or later

### Icons don't load

**Solution:** Make sure you have an active internet connection (required for first-time loading of each category)

### Icon won't insert when I click it

**Solution:** Make sure you have a document open in Illustrator before clicking an icon

### Panel appears but looks broken

**Solution:** Try these steps:
1. Close Illustrator
2. Delete the plugin folder from the extensions directory
3. Re-install following the steps above
4. Restart Illustrator

---

## Need Help?

If you're still having issues after trying the troubleshooting steps:

📧 **Email:** info@salehteches.com
🌐 **Website:** https://salehtechs.com

---

## Uninstalling

To remove the plugin:

**Mac:**
1. Go to: `~/Library/Application Support/Adobe/CEP/extensions/`
2. Delete the `com.salehicons.illustrator` folder
3. Restart Illustrator

**Windows:**
1. Press Windows Key + R
2. Paste: `%AppData%\Adobe\CEP\extensions`
3. Delete the `com.salehicons.illustrator` folder
4. Restart Illustrator

---

## System Requirements

- **Operating System:** macOS 10.12+ or Windows 10+
- **Adobe Illustrator:** CC 2014 or later (any version)
- **Internet Connection:** Required for downloading icons (cached afterwards)
- **Disk Space:** Approximately 5 MB

---

**Enjoy using SalehICONS!**

*Developed with ❤️ by Saleh Alrkiyan - From Saudi Arabia to the world 🌍*
