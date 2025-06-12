import { IExperiment } from './experiment.interface';
/**
 * Interface for experiment storage providers
 */
export interface IStoreProvider {
    /**
     * Read all experiments from storage
     * @returns Promise resolving to an array of experiments
     */
    read(): Promise<IExperiment[]>;
    /**
     * Write experiments to storage
     * @param experiments - Array of experiments to store
     * @returns Promise resolving when the operation is complete
     */
    write(experiments: IExperiment[]): Promise<void>;
}
