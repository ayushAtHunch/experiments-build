import { IVariant } from '../types/experiment.interface';
/**
 * Assigns a variant to a user based on a deterministic algorithm
 *
 * @param userId - Unique user identifier
 * @param experimentSlug - Experiment slug used for the hash
 * @param variants - Array of available variants with weights
 * @returns The assigned variant
 * @throws {ExperimentError} If variants array is empty
 */
export declare function getAssignedVariant(userId: string, experimentSlug: string, variants: IVariant[]): IVariant;
