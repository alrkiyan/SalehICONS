/**
 * SalehICONS - GitHub API Client
 * Handles fetching icon metadata from GitHub repository
 */

const API = {
    // GitHub API configuration
    BASE_URL: 'https://api.github.com/repos/alrkiyan/SalehICONS/contents/icons',
    RAW_URL: 'https://raw.githubusercontent.com/alrkiyan/SalehICONS/main/icons',
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // milliseconds

    /**
     * Fetch icons for a specific category
     * Uses Git Trees API to bypass 1000-item limit
     * @param {string} category - Category name
     * @return {Promise<Array>} Array of icon objects
     */
    fetchIcons: async function(category) {
        try {
            console.log('Fetching icons for category:', category);

            // Use Git Trees API to fetch all files recursively
            // This bypasses the 1000-item limit of the Contents API
            const treeUrl = 'https://api.github.com/repos/alrkiyan/SalehICONS/git/trees/main?recursive=1';
            const tree = await this.fetchWithRetry(treeUrl);

            if (!tree || !tree.tree || !Array.isArray(tree.tree)) {
                throw new Error('Invalid Git Tree API response');
            }

            // Filter files in the category directory
            const categoryPath = `icons/${category}/`;
            const files = tree.tree.filter(item =>
                item.path &&
                item.path.startsWith(categoryPath) &&
                item.path.endsWith('.svg') &&
                item.type === 'blob'
            );

            // Map to icon objects
            const icons = files.map(file => {
                const filename = file.path.replace(categoryPath, '');
                return {
                    name: filename,
                    displayName: this.formatName(filename),
                    svgUrl: `${this.RAW_URL}/${category}/${filename}`,
                    thumbnailUrl: `${this.RAW_URL}/${category}/${filename}`,
                    category: category,
                    size: file.size || 0
                };
            });

            console.log('Fetched', icons.length, 'icons for category:', category);
            return icons;

        } catch (error) {
            console.error('Failed to fetch icons for category:', category, error);
            throw error;
        }
    },

    /**
     * Fetch with automatic retry on failure
     * @param {string} url - URL to fetch
     * @param {number} attempt - Current attempt number
     * @return {Promise<any>} Parsed JSON response
     */
    fetchWithRetry: async function(url, attempt = 1) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'SalehICONS-Illustrator-Plugin/1.0'
                }
            });

            // Check for rate limiting
            if (response.status === 403) {
                const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
                const rateLimitReset = response.headers.get('X-RateLimit-Reset');

                if (rateLimitRemaining === '0') {
                    const resetDate = new Date(parseInt(rateLimitReset) * 1000);
                    const waitMinutes = Math.ceil((resetDate - new Date()) / 1000 / 60);
                    throw new Error(`GitHub API rate limit exceeded. Resets in ${waitMinutes} minutes.`);
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();

        } catch (error) {
            // Retry on failure
            if (attempt < this.RETRY_ATTEMPTS) {
                console.warn(`Fetch attempt ${attempt} failed, retrying in ${this.RETRY_DELAY}ms...`, error.message);
                await this.sleep(this.RETRY_DELAY * attempt); // Exponential backoff
                return this.fetchWithRetry(url, attempt + 1);
            }

            // All retries failed
            throw error;
        }
    },

    /**
     * Format filename to display name
     * @param {string} filename - Icon filename (e.g., "arrow-left.svg")
     * @return {string} Formatted display name (e.g., "Arrow Left")
     */
    formatName: function(filename) {
        return filename
            .replace('.svg', '')
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    /**
     * Download SVG content from URL
     * @param {string} url - SVG file URL
     * @return {Promise<string>} SVG content as text
     */
    downloadSVG: async function(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.text();

        } catch (error) {
            console.error('Failed to download SVG:', url, error);
            throw error;
        }
    },

    /**
     * Test GitHub API connectivity
     * @return {Promise<Object>} Connection test result
     */
    testConnection: async function() {
        try {
            const url = 'https://api.github.com/repos/alrkiyan/SalehICONS';
            const response = await fetch(url);

            if (!response.ok) {
                return {
                    success: false,
                    error: `HTTP ${response.status}`
                };
            }

            const data = await response.json();

            return {
                success: true,
                repo: data.name,
                stars: data.stargazers_count,
                rateLimit: {
                    remaining: response.headers.get('X-RateLimit-Remaining'),
                    limit: response.headers.get('X-RateLimit-Limit'),
                    reset: new Date(parseInt(response.headers.get('X-RateLimit-Reset')) * 1000)
                }
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    },

    /**
     * Sleep utility for retry delays
     * @param {number} ms - Milliseconds to sleep
     * @return {Promise<void>}
     */
    sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Export for use in main.js
window.API = API;
