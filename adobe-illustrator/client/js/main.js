/**
 * SalehICONS - Main Application Logic
 * Handles UI interactions, icon rendering, and Illustrator integration
 */

// Application state
const App = {
    // CEP Interface
    csInterface: null,

    // Current state
    currentCategory: 'bulk-rounded',
    allIcons: [],
    filteredIcons: [],
    searchTerm: '',

    // UI elements (cached for performance)
    elements: {},

    // Configuration
    config: {
        virtualScrollThreshold: 200, // Render icons in batches
        searchDebounceDelay: 300, // ms
        thumbnailSize: 48 // px
    },

    /**
     * Initialize the application
     */
    init: function() {
        console.log('SalehICONS v1.0 initializing...');

        // Initialize CEP interface
        this.csInterface = new CSInterface();

        // Cache UI elements
        this.cacheElements();

        // Attach event listeners
        this.attachEventListeners();

        // Check Illustrator document status
        this.checkDocumentStatus();

        // Load default category
        this.loadCategory(this.currentCategory);

        // Log cache stats
        const stats = Cache.getStats();
        if (stats) {
            console.log('Cache stats:', stats);
        }

        console.log('App initialized');
    },

    /**
     * Cache DOM elements for performance
     */
    cacheElements: function() {
        this.elements = {
            categorySelect: document.getElementById('category-select'),
            searchInput: document.getElementById('search-input'),
            clearBtn: document.getElementById('clear-btn'),
            iconGrid: document.getElementById('icon-grid'),
            iconGridContainer: document.getElementById('icon-grid-container'),
            iconCount: document.getElementById('icon-count'),
            docStatus: document.getElementById('doc-status'),
            loading: document.getElementById('loading'),
            error: document.getElementById('error'),
            errorMessage: document.getElementById('error-message'),
            retryBtn: document.getElementById('retry-btn'),
            empty: document.getElementById('empty')
        };
    },

    /**
     * Attach event listeners
     */
    attachEventListeners: function() {
        // Category selection
        this.elements.categorySelect.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.loadCategory(this.currentCategory);
        });

        // Search input with debouncing
        let searchTimeout;
        this.elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, this.config.searchDebounceDelay);
        });

        // Clear search button
        this.elements.clearBtn.addEventListener('click', () => {
            this.elements.searchInput.value = '';
            this.elements.clearBtn.classList.remove('visible');
            this.handleSearch('');
        });

        // Show/hide clear button based on input
        this.elements.searchInput.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                this.elements.clearBtn.classList.add('visible');
            } else {
                this.elements.clearBtn.classList.remove('visible');
            }
        });

        // Retry button
        this.elements.retryBtn.addEventListener('click', () => {
            this.loadCategory(this.currentCategory);
        });

        // Logo click handler - open website
        const logoLink = document.getElementById('logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.csInterface.openURLInDefaultBrowser('https://salehtechs.com');
            });
        }

        // Check document status periodically
        setInterval(() => {
            this.checkDocumentStatus();
        }, 2000);
    },

    /**
     * Load icons for a category
     * @param {string} category - Category name
     */
    loadCategory: async function(category) {
        try {
            console.log('Loading category:', category);

            this.showLoading(true);
            this.hideError();
            this.hideEmpty();

            // Check cache first
            let icons = Cache.get(category);

            if (!icons) {
                // Fetch from GitHub API
                console.log('Cache miss, fetching from API...');
                icons = await API.fetchIcons(category);

                // Cache the results
                Cache.set(category, icons);
            }

            // Update state
            this.allIcons = icons;
            this.filteredIcons = icons;

            // Apply current search filter if any
            if (this.searchTerm) {
                this.filterIcons(this.searchTerm);
            }

            // Render icons
            this.renderIcons(this.filteredIcons);

            // Update info
            this.updateIconCount();

            this.showLoading(false);

        } catch (error) {
            console.error('Failed to load category:', error);
            this.showError(error.message);
            this.showLoading(false);
        }
    },

    /**
     * Handle search input
     * @param {string} searchTerm - Search term
     */
    handleSearch: function(searchTerm) {
        this.searchTerm = searchTerm.toLowerCase().trim();

        if (this.searchTerm === '') {
            this.filteredIcons = this.allIcons;
        } else {
            this.filterIcons(this.searchTerm);
        }

        this.renderIcons(this.filteredIcons);
        this.updateIconCount();

        // Show empty state if no results
        if (this.filteredIcons.length === 0) {
            this.showEmpty();
        } else {
            this.hideEmpty();
        }
    },

    /**
     * Filter icons by search term
     * @param {string} term - Search term
     */
    filterIcons: function(term) {
        this.filteredIcons = this.allIcons.filter(icon => {
            const nameMatch = icon.displayName.toLowerCase().includes(term);
            const filenameMatch = icon.name.toLowerCase().includes(term);
            return nameMatch || filenameMatch;
        });
    },

    /**
     * Render icons to the grid
     * @param {Array} icons - Array of icon objects
     */
    renderIcons: function(icons) {
        const grid = this.elements.iconGrid;
        grid.innerHTML = '';

        if (icons.length === 0) {
            return;
        }

        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();

        icons.forEach(icon => {
            const item = this.createIconElement(icon);
            fragment.appendChild(item);
        });

        grid.appendChild(fragment);
    },

    /**
     * Create icon element
     * @param {Object} icon - Icon object
     * @return {HTMLElement} Icon element
     */
    createIconElement: function(icon) {
        const item = document.createElement('div');
        item.className = 'icon-item';
        item.title = icon.displayName;

        // Thumbnail
        const thumbnail = document.createElement('div');
        thumbnail.className = 'icon-thumbnail';

        const img = document.createElement('img');
        img.src = icon.thumbnailUrl;
        img.alt = icon.displayName;
        img.loading = 'lazy';

        thumbnail.appendChild(img);

        // Name
        const name = document.createElement('span');
        name.className = 'icon-name';
        name.textContent = icon.displayName;

        // Append children
        item.appendChild(thumbnail);
        item.appendChild(name);

        // Click handler
        item.addEventListener('click', () => {
            this.insertIcon(icon);
        });

        return item;
    },

    /**
     * Insert icon into Illustrator
     * @param {Object} icon - Icon object
     */
    insertIcon: async function(icon) {
        console.log('Inserting icon:', icon.name);

        // Check if document is open
        this.csInterface.evalScript('isDocumentOpen()', async (result) => {
            if (result === 'false' || result === false) {
                alert('Please open a document first.');
                return;
            }

            try {
                // Download SVG content using JavaScript fetch (more reliable than curl)
                console.log('Downloading SVG content from:', icon.svgUrl);
                const svgContent = await API.downloadSVG(icon.svgUrl);

                if (!svgContent) {
                    throw new Error('Failed to download SVG content');
                }

                // Encode SVG content as Base64 to avoid escaping issues
                const base64Content = btoa(unescape(encodeURIComponent(svgContent)));

                // Call new JSX function with Base64-encoded SVG content
                const jsxCode = `insertIconFromBase64("${base64Content}", "${icon.name}")`;

                this.csInterface.evalScript(jsxCode, (result) => {
                    if (result.startsWith('ERROR')) {
                        console.error('Insert failed:', result);
                        alert(result.replace('ERROR: ', ''));
                    } else {
                        console.log('Icon inserted successfully');
                    }

                    // Update document status
                    this.checkDocumentStatus();
                });

            } catch (error) {
                console.error('Failed to download icon:', error);
                alert('Failed to download icon. Please check your internet connection.');
            }
        });
    },

    /**
     * Check Illustrator document status
     */
    checkDocumentStatus: function() {
        this.csInterface.evalScript('isDocumentOpen()', (result) => {
            const docStatus = this.elements.docStatus;

            if (result === 'true' || result === true) {
                docStatus.textContent = 'Document open';
                docStatus.classList.remove('no-doc');

                // Get document info
                this.csInterface.evalScript('getDocumentInfo()', (info) => {
                    if (info && !info.startsWith('ERROR')) {
                        docStatus.textContent = info;
                    }
                });
            } else {
                docStatus.textContent = 'No document';
                docStatus.classList.add('no-doc');
            }
        });
    },

    /**
     * Update icon count display
     */
    updateIconCount: function() {
        const total = this.allIcons.length;
        const shown = this.filteredIcons.length;

        if (this.searchTerm) {
            this.elements.iconCount.textContent = `${shown} of ${total} icons`;
        } else {
            this.elements.iconCount.textContent = `${total} icons`;
        }
    },

    /**
     * Show loading state
     * @param {boolean} show - Show or hide
     */
    showLoading: function(show) {
        if (show) {
            this.elements.loading.classList.remove('hidden');
            this.elements.iconGrid.style.display = 'none';
        } else {
            this.elements.loading.classList.add('hidden');
            this.elements.iconGrid.style.display = 'grid';
        }
    },

    /**
     * Show error state
     * @param {string} message - Error message
     */
    showError: function(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.error.classList.remove('hidden');
        this.elements.iconGrid.style.display = 'none';
    },

    /**
     * Hide error state
     */
    hideError: function() {
        this.elements.error.classList.add('hidden');
    },

    /**
     * Show empty state
     */
    showEmpty: function() {
        this.elements.empty.classList.remove('hidden');
        this.elements.iconGrid.style.display = 'none';
    },

    /**
     * Hide empty state
     */
    hideEmpty: function() {
        this.elements.empty.classList.add('hidden');
        this.elements.iconGrid.style.display = 'grid';
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export for console debugging
window.App = App;
