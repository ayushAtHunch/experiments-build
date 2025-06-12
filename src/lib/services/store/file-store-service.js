"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStore = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const path = require("path");
const constants_1 = require("../../utils/constants");
/**
 * File-based implementation of the store provider
 */
class FileStore {
    /**
     * Creates a new file-based store provider
     * @param filePath - Primary path to the JSON file (relative to process.cwd())
     *                   If not provided, will use the array of default paths
     */
    constructor(filePath) {
        if (filePath) {
            this.filePaths = [filePath, ...constants_1.DEFAULT_EXPERIMENTS_FILE_PATHS];
            this.primaryFilePath = filePath;
        }
        else {
            this.filePaths = [...constants_1.DEFAULT_EXPERIMENTS_FILE_PATHS];
            this.primaryFilePath = this.filePaths[0];
        }
        console.log(`[Experiments] FileStore initialized with file paths:`, this.filePaths);
        console.log(`[Experiments] Primary file path for writing: ${this.primaryFilePath}`);
    }
    /**
     * Read experiments from storage, trying multiple file paths in order
     * @returns Array of experiments
     */
    read() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const filePath of this.filePaths) {
                const resolvedPath = path.resolve(process.cwd(), filePath);
                console.log(`[Experiments] Attempting to read experiments from: ${resolvedPath}`);
                try {
                    const data = yield fs_1.promises.readFile(resolvedPath, 'utf-8');
                    const experiments = JSON.parse(data);
                    console.log(`[Experiments] Successfully read ${experiments.length} experiments from ${resolvedPath}`);
                    return experiments;
                }
                catch (error) {
                    console.log(`[Experiments] Could not read from ${resolvedPath}: ${error.message}`);
                }
            }
            console.log(`[Experiments] No valid experiment files found, returning empty array`);
            return [];
        });
    }
    /**
     * Write experiments to storage
     * @param experiments - Array of experiments to write
     */
    write(experiments) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resolvedPath = path.resolve(process.cwd(), this.primaryFilePath);
            console.log(`[Experiments] Writing ${experiments.length} experiments to primary file: ${resolvedPath}`);
            try {
                // Ensure directory exists
                const dir = path.dirname(resolvedPath);
                yield fs_1.promises.mkdir(dir, { recursive: true });
                console.log(`[Experiments] Ensured directory exists: ${dir}`);
                // Write the file with pretty formatting
                yield fs_1.promises.writeFile(resolvedPath, JSON.stringify(experiments, null, 2));
                console.log(`[Experiments] Successfully wrote experiments to file: ${resolvedPath}`);
            }
            catch (error) {
                console.error(`[Experiments] Error writing experiments to file ${resolvedPath}:`, error);
                throw error;
            }
        });
    }
}
exports.FileStore = FileStore;
//# sourceMappingURL=file-store-service.js.map