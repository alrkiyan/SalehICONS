/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder, File, app */

/**
 * SalehICONS - Adobe Illustrator JSX Bridge
 * Handles SVG icon insertion into Illustrator documents
 */

/**
 * Base64 decoder for ExtendScript
 * @param {string} input - Base64 encoded string
 * @return {string} Decoded string
 */
function base64Decode(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    // Remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }

    return output;
}

/**
 * Insert an SVG icon from Base64-encoded content
 * @param {string} base64Content - Base64-encoded SVG content
 * @param {string} iconName - Name of the icon file
 * @return {string} Result message (SUCCESS or ERROR: message)
 */
function insertIconFromBase64(base64Content, iconName) {
    try {
        // Check if a document is open
        if (!app.documents.length) {
            return "ERROR: No document open. Please open a document first.";
        }

        // Decode Base64 content
        var svgContent = base64Decode(base64Content);

        if (!svgContent || svgContent.length < 10) {
            return "ERROR: Failed to decode SVG content.";
        }

        // Call the content insertion function
        return insertIconFromContent(svgContent, iconName);

    } catch (e) {
        return "ERROR: " + e.message;
    }
}

/**
 * Insert an SVG icon into the active Illustrator document from SVG content
 * @param {string} svgContent - The SVG file content as string
 * @param {string} iconName - Name of the icon file
 * @return {string} Result message (SUCCESS or ERROR: message)
 */
function insertIconFromContent(svgContent, iconName) {
    try {
        // Check if a document is open
        if (!app.documents.length) {
            return "ERROR: No document open. Please open a document first.";
        }

        var doc = app.activeDocument;

        // Create temp file path
        var tempFolder = Folder.temp;
        var tempFile = new File(tempFolder + "/" + iconName);

        // Write SVG content to temp file
        // Don't set encoding - let ExtendScript handle it automatically
        tempFile.lineFeed = "Unix";  // Use consistent line endings
        if (!tempFile.open("w")) {
            return "ERROR: Failed to create temp file.";
        }

        tempFile.write(svgContent);
        tempFile.close();

        // Wait for file to be flushed to disk
        $.sleep(200);

        // Verify file was created and has content
        if (!tempFile.exists) {
            return "ERROR: Temp file not created.";
        }

        if (tempFile.length < 10) {
            return "ERROR: Temp file is empty or corrupted.";
        }

        // Verify the file was written correctly by reading it back
        tempFile.open("r");
        var writtenContent = tempFile.read();
        tempFile.close();

        if (writtenContent.length < svgContent.length * 0.9) {
            return "ERROR: File write verification failed - content truncated.";
        }

        // New approach: Open SVG as document, copy, paste into active document
        // This bypasses the problematic placedItems.file approach

        var originalDoc = doc;
        var tempDoc = null;

        try {
            // Open the SVG file as a new document
            tempDoc = app.open(tempFile);

            // Select all artwork in the temp document
            tempDoc.selectObjectsOnActiveArtboard();

            // If nothing selected, try selecting all
            if (tempDoc.selection.length === 0) {
                app.executeMenuCommand('selectall');
            }

            // Copy the selection
            app.copy();

            // Close temp document without saving
            tempDoc.close(SaveOptions.DONOTSAVECHANGES);
            tempDoc = null;

            // Switch back to original document
            app.activeDocument = originalDoc;

            // Paste the icon
            app.paste();

            // Get the pasted items (they should be selected)
            var pastedItems = originalDoc.selection;

            // Position at center of active artboard if we have pasted items
            if (pastedItems.length > 0) {
                try {
                    var artboard = originalDoc.artboards[originalDoc.artboards.getActiveArtboardIndex()];
                    var artboardRect = artboard.artboardRect;
                    var centerX = artboardRect[0] + (artboardRect[2] - artboardRect[0]) / 2;
                    var centerY = artboardRect[1] + (artboardRect[3] - artboardRect[1]) / 2;

                    // Group the pasted items if there are multiple
                    var iconGroup;
                    if (pastedItems.length > 1) {
                        iconGroup = originalDoc.groupItems.add();
                        for (var i = pastedItems.length - 1; i >= 0; i--) {
                            pastedItems[i].moveToBeginning(iconGroup);
                        }
                    } else {
                        iconGroup = pastedItems[0];
                    }

                    // Center the icon on the artboard
                    var iconWidth = iconGroup.width;
                    var iconHeight = iconGroup.height;
                    iconGroup.position = [centerX - iconWidth/2, centerY + iconHeight/2];

                } catch (posError) {
                    // If positioning fails, icon will appear at default paste location
                }
            }

        } catch (openError) {
            // If open/copy/paste fails, clean up and return error
            if (tempDoc) {
                try {
                    tempDoc.close(SaveOptions.DONOTSAVECHANGES);
                } catch (closeError) {
                    // Ignore
                }
            }
            return "ERROR: Failed to open SVG file - " + openError.message;
        }

        // Clean up temp file
        try {
            tempFile.remove();
        } catch (e) {
            // Temp file cleanup failed but icon was inserted
        }

        return "SUCCESS";

    } catch (e) {
        return "ERROR: " + e.message;
    }
}

/**
 * Insert an SVG icon into the active Illustrator document (legacy method using URL)
 * @param {string} svgUrl - URL to the SVG file
 * @param {string} iconName - Name of the icon file
 * @return {string} Result message (SUCCESS or ERROR: message)
 * @deprecated Use insertIconFromContent instead for better reliability
 */
function insertIcon(svgUrl, iconName) {
    try {
        // Check if a document is open
        if (!app.documents.length) {
            return "ERROR: No document open. Please open a document first.";
        }

        var doc = app.activeDocument;

        // Create temp file path
        var tempFolder = Folder.temp;
        var tempFile = new File(tempFolder + "/" + iconName);

        // Download SVG using system command (with retry logic)
        var downloadResult = downloadFile(svgUrl, tempFile);
        if (!downloadResult) {
            return "ERROR: Failed to download icon after 3 attempts. Please check your internet connection or try again.";
        }

        // Verify file was downloaded
        if (!tempFile.exists) {
            return "ERROR: Downloaded file not found.";
        }

        // Insert SVG into document
        var placedItem = doc.placedItems.add();
        placedItem.file = tempFile;

        // Position at center of active artboard
        try {
            var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
            var artboardRect = artboard.artboardRect;
            var centerX = artboardRect[0] + (artboardRect[2] - artboardRect[0]) / 2;
            var centerY = artboardRect[1] + (artboardRect[3] - artboardRect[1]) / 2;

            // Position center of icon at center of artboard
            var iconWidth = placedItem.width;
            var iconHeight = placedItem.height;
            placedItem.position = [centerX - iconWidth/2, centerY + iconHeight/2];
        } catch (e) {
            // If positioning fails, icon will appear at default location
        }

        // Select the placed item
        doc.selection = null;
        placedItem.selected = true;

        // Embed the icon (convert from linked to embedded)
        try {
            placedItem.embed();
        } catch (e) {
            // If embedding fails, try to trace/expand
            try {
                app.executeMenuCommand('Live Trace Make');
                app.executeMenuCommand('expandStyle');
            } catch (traceError) {
                // Icon placed but not embedded
            }
        }

        // Clean up temp file
        try {
            tempFile.remove();
        } catch (e) {
            // Temp file cleanup failed but icon was inserted
        }

        return "SUCCESS";

    } catch (e) {
        return "ERROR: " + e.message;
    }
}

/**
 * Download a file from URL using system command with retry logic
 * @param {string} url - URL to download from
 * @param {File} file - File object to save to
 * @return {boolean} True if successful
 */
function downloadFile(url, file) {
    var maxRetries = 3;
    var retryDelay = 1000; // milliseconds

    for (var attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            var command;

            // Detect OS and use appropriate command
            if ($.os.indexOf("Windows") !== -1) {
                // Windows: Use PowerShell with TLS 1.2 enabled
                var psCmd = "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; " +
                           "(New-Object Net.WebClient).DownloadFile('" + url + "', '" + file.fsName + "')";
                command = 'powershell -Command "' + psCmd + '"';
            } else {
                // macOS/Linux: Use curl with fail-fast and timeout
                command = 'curl -f -L -s -S --max-time 10 -o "' + file.fsName + '" "' + url + '"';
            }

            // Execute system command
            var result = app.system(command);

            // Wait for file to be fully written
            $.sleep(1000);

            // Verify file exists and has reasonable size (>50 bytes)
            if (file.exists && file.length > 50) {
                return true;
            }

            // Clean up failed download
            if (file.exists) {
                try {
                    file.remove();
                } catch (cleanupError) {
                    // Ignore cleanup errors
                }
            }

            // Wait before retry (exponential backoff)
            if (attempt < maxRetries) {
                $.sleep(retryDelay * attempt);
            }

        } catch (e) {
            // Continue to next attempt
            if (attempt < maxRetries) {
                $.sleep(retryDelay * attempt);
            }
        }
    }

    return false;
}

/**
 * Get Illustrator version info
 * @return {string} Version information
 */
function getIllustratorVersion() {
    try {
        return "Illustrator " + app.version;
    } catch (e) {
        return "ERROR: " + e.message;
    }
}

/**
 * Check if a document is open
 * @return {boolean} True if document is open
 */
function isDocumentOpen() {
    try {
        return app.documents.length > 0;
    } catch (e) {
        return false;
    }
}

/**
 * Get active document info
 * @return {string} Document information
 */
function getDocumentInfo() {
    try {
        if (!app.documents.length) {
            return "No document open";
        }

        var doc = app.activeDocument;
        return "Document: " + doc.name +
               " | Artboards: " + doc.artboards.length +
               " | Active: " + (doc.artboards.getActiveArtboardIndex() + 1);

    } catch (e) {
        return "ERROR: " + e.message;
    }
}
