/**
 * SalehICONS - Cache Manager
 * Handles localStorage caching of icon metadata
 */

const Cache = {
    // Cache configuration
    DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    PREFIX: 'salehicons_',
    VERSION: '1.1', // Updated to invalidate old 1000-icon cache

    /**
     * Get cached icons for a category
     * @param {string} category - Category name
     * @return {Array|null} Array of icon objects or null if not cached/expired
     */
    get: function(category) {
        try {
            const key = this.PREFIX + category;
            const cached = localStorage.getItem(key);

            if (!cached) {
                return null;
            }

            const data = JSON.parse(cached);

            // Validate cache structure
            if (!data.icons || !data.timestamp || !data.version) {
                console.warn('Invalid cache structure for:', category);
                this.remove(category);
                return null;
            }

            // Check version compatibility
            if (data.version !== this.VERSION) {
                console.log('Cache version mismatch for:', category);
                this.remove(category);
                return null;
            }

            // Check if cache is expired
            const now = Date.now();
            const age = now - data.timestamp;

            if (age > this.DURATION) {
                console.log('Cache expired for:', category, '(age:', Math.round(age / 1000 / 60 / 60), 'hours)');
                this.remove(category);
                return null;
            }

            console.log('Cache hit for:', category, '(age:', Math.round(age / 1000 / 60), 'minutes)');
            return data.icons;

        } catch (e) {
            console.error('Cache get error:', e);
            return null;
        }
    },

    /**
     * Store icons in cache
     * @param {string} category - Category name
     * @param {Array} icons - Array of icon objects
     * @return {boolean} True if successful
     */
    set: function(category, icons) {
        try {
            const key = this.PREFIX + category;
            const data = {
                version: this.VERSION,
                category: category,
                icons: icons,
                timestamp: Date.now(),
                count: icons.length
            };

            const jsonString = JSON.stringify(data);
            localStorage.setItem(key, jsonString);

            console.log('Cached', icons.length, 'icons for:', category, '(size:', Math.round(jsonString.length / 1024), 'KB)');
            return true;

        } catch (e) {
            // Handle quota exceeded error
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                console.error('LocalStorage quota exceeded. Clearing old cache...');
                this.clearOldest();
                // Try again after clearing
                try {
                    const jsonString = JSON.stringify(data);
                    localStorage.setItem(key, jsonString);
                    return true;
                } catch (e2) {
                    console.error('Cache set failed after clearing:', e2);
                    return false;
                }
            }
            console.error('Cache set error:', e);
            return false;
        }
    },

    /**
     * Remove cache for a category
     * @param {string} category - Category name
     */
    remove: function(category) {
        try {
            const key = this.PREFIX + category;
            localStorage.removeItem(key);
            console.log('Removed cache for:', category);
        } catch (e) {
            console.error('Cache remove error:', e);
        }
    },

    /**
     * Clear all cached icons
     */
    clear: function() {
        try {
            const keys = Object.keys(localStorage);
            const prefixKeys = keys.filter(key => key.startsWith(this.PREFIX));

            prefixKeys.forEach(key => {
                localStorage.removeItem(key);
            });

            console.log('Cleared all cache (removed', prefixKeys.length, 'entries)');
        } catch (e) {
            console.error('Cache clear error:', e);
        }
    },

    /**
     * Clear the oldest cached category to free space
     */
    clearOldest: function() {
        try {
            const keys = Object.keys(localStorage);
            const prefixKeys = keys.filter(key => key.startsWith(this.PREFIX));

            if (prefixKeys.length === 0) {
                return;
            }

            let oldestKey = null;
            let oldestTime = Date.now();

            prefixKeys.forEach(key => {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data.timestamp < oldestTime) {
                        oldestTime = data.timestamp;
                        oldestKey = key;
                    }
                } catch (e) {
                    // Invalid entry, remove it
                    localStorage.removeItem(key);
                }
            });

            if (oldestKey) {
                localStorage.removeItem(oldestKey);
                console.log('Removed oldest cache entry:', oldestKey);
            }

        } catch (e) {
            console.error('Clear oldest error:', e);
        }
    },

    /**
     * Get cache statistics
     * @return {Object} Cache stats
     */
    getStats: function() {
        try {
            const keys = Object.keys(localStorage);
            const prefixKeys = keys.filter(key => key.startsWith(this.PREFIX));

            let totalSize = 0;
            let totalIcons = 0;
            const categories = [];

            prefixKeys.forEach(key => {
                try {
                    const value = localStorage.getItem(key);
                    const data = JSON.parse(value);

                    totalSize += value.length;
                    totalIcons += data.count || 0;

                    categories.push({
                        category: data.category,
                        count: data.count,
                        age: Math.round((Date.now() - data.timestamp) / 1000 / 60), // minutes
                        size: Math.round(value.length / 1024) // KB
                    });
                } catch (e) {
                    // Skip invalid entries
                }
            });

            return {
                categories: categories.length,
                totalIcons: totalIcons,
                totalSize: Math.round(totalSize / 1024), // KB
                details: categories
            };

        } catch (e) {
            console.error('Get stats error:', e);
            return null;
        }
    }
};

// Export for use in main.js
window.Cache = Cache;
