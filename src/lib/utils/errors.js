"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentNotFoundError = exports.ExperimentValidationError = exports.ExperimentError = void 0;
/**
 * Error type for experiment-related errors
 */
class ExperimentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExperimentError';
    }
}
exports.ExperimentError = ExperimentError;
/**
 * Error thrown when experiment validation fails
 */
class ExperimentValidationError extends ExperimentError {
    constructor(message) {
        super(message);
        this.name = 'ExperimentValidationError';
    }
}
exports.ExperimentValidationError = ExperimentValidationError;
/**
 * Error thrown when an experiment is not found
 */
class ExperimentNotFoundError extends ExperimentError {
    constructor(experimentId) {
        super(`Experiment with ID "${experimentId}" not found`);
        this.name = 'ExperimentNotFoundError';
    }
}
exports.ExperimentNotFoundError = ExperimentNotFoundError;
//# sourceMappingURL=errors.js.map