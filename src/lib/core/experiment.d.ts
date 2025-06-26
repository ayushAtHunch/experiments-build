import { IExperiment, IExperimentMeta, ISingleVariantExperiment, TAddExperimentPayload } from '../types/experiment.interface';
import { IStoreProvider } from '../types/store-service.interface';
/**
 * Abstract base class for experiment services
 */
export declare abstract class ExperimentService {
    protected storeHandler: IStoreProvider;
    constructor(storeHandler: IStoreProvider);
    /**
     * Get all experiments
     * @returns Promise resolving to an array of experiments
     */
    getAllExperiments(): Promise<IExperiment[]>;
    /**
     * Get a single experiment by ID
     * @param experimentId - The ID of the experiment to retrieve
     * @returns Promise resolving to the experiment or undefined if not found
     */
    getExperimentById(experimentId: string): Promise<IExperiment | undefined>;
    /**
     * Get experiments filtered by baseEntityId
     * @param baseEntityId - The entity ID to filter by
     * @returns Promise resolving to an array of matching experiments
     */
    getExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    /**
     * Get active experiments filtered by baseEntityId
     * @param baseEntityId - The entity ID to filter by
     * @returns Promise resolving to an array of matching active experiments
     */
    getActiveExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    /**
     * Add a new experiment
     * Protected to prevent direct access - should be called through specific methods in subclasses
     * @param experiment - The experiment to add (without ID, will be auto-generated)
     * @returns Promise resolving to the generated experiment ID
     */
    protected addExperiment(experiment: TAddExperimentPayload): Promise<string>;
    /**
     * Update an existing experiment
     * @param experiment - The updated experiment data
     * @returns Promise resolving when the operation is complete
     *
     * Intentionally not implemented because we don't want to handle the case
     * of new users vs. old users for now. This will be implemented in a future version.
     */
    updateExperiment(_updatedExperiment: IExperiment): Promise<void>;
    /**
     * Delete an experiment
     * @param experimentId - The ID of the experiment to delete
     * @returns Promise resolving when the operation is complete
     */
    deleteExperiment(experimentId: string): Promise<void>;
    /**
     * Activate an experiment
     * @param experimentId - The ID of the experiment to activate
     * @returns Promise resolving when the operation is complete
     */
    activateExperiment(experimentId: string): Promise<void>;
    /**
     * Deactivate an experiment
     * @param experimentId - The ID of the experiment to deactivate
     * @returns Promise resolving when the operation is complete
     */
    deactivateExperiment(experimentId: string): Promise<void>;
    /**
     * Validate an experiment for data integrity
     * @param experiment - The experiment to validate (without ID)
     * @returns True if valid, throws ExperimentValidationError if invalid
     */
    validateExperiment(experiment: TAddExperimentPayload): boolean;
    /**
     * Generates experiment metadata for tracking and analytics
     *
     * @param payload Experiment with assigned variant
     * @returns Metadata object for analytics
     */
    generateMeta(payload: ISingleVariantExperiment): IExperimentMeta;
}
