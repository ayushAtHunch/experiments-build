/**
 * Error type for experiment-related errors
 */
export declare class ExperimentError extends Error {
    constructor(message: string);
}
/**
 * Error thrown when experiment validation fails
 */
export declare class ExperimentValidationError extends ExperimentError {
    constructor(message: string);
}
/**
 * Error thrown when an experiment is not found
 */
export declare class ExperimentNotFoundError extends ExperimentError {
    constructor(experimentId: string);
}
