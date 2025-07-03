import { IExperiment, TAddExperimentPayload } from './experiment.interface';
/**
 * Interface for experiment storage providers
 */
export interface IStoreProvider {
    /**
     * Get all experiments from storage
     * @returns Promise resolving to an array of experiments
     */
    getAllExperiments(): Promise<IExperiment[]>;
    /**
     * Get experiment by ID
     * @param experimentId - The experiment ID to search for
     * @returns Promise resolving to experiment or undefined if not found
     */
    getExperimentById(experimentId: string): Promise<IExperiment | undefined>;
    /**
     * Get experiments by base entity ID
     * @param baseEntityId - The base entity ID to filter by
     * @returns Promise resolving to array of matching experiments
     */
    getExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    /**
     * Get experiment by slug
     * @param experimentSlug - The experiment slug to search for
     * @returns Promise resolving to experiment or undefined if not found
     */
    getExperimentBySlug(experimentSlug: string): Promise<IExperiment | undefined>;
    /**
     * Get active experiments by base entity ID
     * @param baseEntityId - The base entity ID to filter by
     * @returns Promise resolving to array of active experiments
     */
    getActiveExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    /**
     * Add a new experiment to storage
     * @param experiment - The experiment to add (without ID, will be auto-generated)
     * @returns Promise resolving to the generated experiment ID
     */
    addExperiment(experiment: TAddExperimentPayload): Promise<string>;
    /**
     * Update an existing experiment in storage
     * @param experiment - The experiment to update
     * @returns Promise resolving when the operation is complete
     */
    updateExperiment(experiment: IExperiment): Promise<void>;
    /**
     * Delete an experiment from storage
     * @param experimentId - The ID of the experiment to delete
     * @returns Promise resolving when the operation is complete
     */
    deleteExperiment(experimentId: string): Promise<void>;
}
