import { IStoreProvider } from '../../types/store-service.interface';
import { IExperiment } from '../../types/experiment.interface';
/**
 * File-based implementation of the store provider
 */
export declare class FileStore implements IStoreProvider {
    private readonly filePaths;
    private readonly primaryFilePath;
    /**
     * Creates a new file-based store provider
     * @param filePath - Primary path to the JSON file (relative to process.cwd())
     *                   If not provided, will use the array of default paths
     */
    constructor(filePath?: string);
    /**
     * Read experiments from storage, trying multiple file paths in order
     * @returns Array of experiments
     */
    read(): Promise<IExperiment[]>;
    /**
     * Write experiments to storage
     * @param experiments - Array of experiments to write
     */
    write(experiments: IExperiment[]): Promise<void>;
}
