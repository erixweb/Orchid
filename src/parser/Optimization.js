const swc = require("@swc/core");

const Logger = require("../utils/Logger");

module.exports = {
    /**
     * Optimizes the code passed into the string
     * 
     * @param {string} code 
     * @returns {string}
     */
    async optimize(code) {
        try {
            const result = await swc.minify(code, {
                compress: true,
                mangle: true
            });

            if (result.error) {
                Logger.error("Terser error: " + result.error);
                return code;
            }

            return result.code;
        } catch (error) {
            Logger.error("Error while optimizing: " + error.stack);
            return code;
        }
    }
};