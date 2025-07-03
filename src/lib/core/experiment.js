"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentService = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../utils/constants");
const errors_1 = require("../utils/errors");
/**
 * Abstract base class for experiment services
 */
class ExperimentService {
    constructor(storeHandler) {
        this.storeHandler = storeHandler;
    }
    /**
     * Get all experiments
     * @returns Promise resolving to an array of experiments
     */
    getAllExperiments() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.storeHandler.getAllExperiments();
        });
    }
    /**
     * Get a single experiment by ID
     * @param experimentId - The ID of the experiment to retrieve
     * @returns Promise resolving to the experiment or undefined if not found
     */
    getExperimentById(experimentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.storeHandler.getExperimentById(experimentId);
        });
    }
    /**
     * Get experiments filtered by baseEntityId
     * @param baseEntityId - The entity ID to filter by
     * @returns Promise resolving to an array of matching experiments
     */
    getExperimentsByBaseEntityId(baseEntityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.storeHandler.getExperimentsByBaseEntityId(baseEntityId);
        });
    }
    // TODO: implement a decorator for getting active experiments
    /**
     * Get active experiments filtered by baseEntityId
     * @param baseEntityId - The entity ID to filter by
     * @returns Promise resolving to an array of matching active experiments
     */
    getActiveExperimentsByBaseEntityId(baseEntityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.storeHandler.getActiveExperimentsByBaseEntityId(baseEntityId);
        });
    }
    /**
     * Add a new experiment
     * Protected to prevent direct access - should be called through specific methods in subclasses
     * @param experiment - The experiment to add (without ID, will be auto-generated)
     * @returns Promise resolving to the generated experiment ID
     */
    addExperiment(experiment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Validate the experiment
            this.validateExperiment(experiment);
            // Check for duplicate slugs
            const existingBySlug = yield this.storeHandler.getExperimentBySlug(experiment.slug);
            if (existingBySlug) {
                throw new errors_1.ExperimentValidationError(`Experiment with slug "${experiment.slug}" already exists`);
            }
            return yield this.storeHandler.addExperiment(experiment);
        });
    }
    /**
     * Update an existing experiment
     * @param experiment - The updated experiment data
     * @returns Promise resolving when the operation is complete
     *
     * Intentionally not implemented because we don't want to handle the case
     * of new users vs. old users for now. This will be implemented in a future version.
     */
    updateExperiment(_updatedExperiment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented - Updating experiments is intentionally disabled to avoid issues with variant assignment for existing users');
        });
    }
    /**
     * Delete an experiment
     * @param experimentId - The ID of the experiment to delete
     * @returns Promise resolving when the operation is complete
     */
    deleteExperiment(experimentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiment = yield this.storeHandler.getExperimentById(experimentId);
            if (!experiment) {
                throw new errors_1.ExperimentValidationError(`Experiment with ID "${experimentId}" not found`);
            }
            yield this.storeHandler.deleteExperiment(experimentId);
        });
    }
    /**
     * Validate an experiment for data integrity
     * @param experiment - The experiment to validate (without ID)
     * @returns True if valid, throws ExperimentValidationError if invalid
     */
    validateExperiment(experiment) {
        // Check required fields (ID is auto-generated, no need to validate)
        if (!experiment.name || experiment.name.length < constants_1.VALIDATION.MIN_NAME_LENGTH || experiment.name.length > constants_1.VALIDATION.MAX_NAME_LENGTH) {
            throw new errors_1.ExperimentValidationError(`Experiment name must be between ${constants_1.VALIDATION.MIN_NAME_LENGTH} and ${constants_1.VALIDATION.MAX_NAME_LENGTH} characters`);
        }
        if (!experiment.slug || experiment.slug.length < constants_1.VALIDATION.MIN_SLUG_LENGTH || experiment.slug.length > constants_1.VALIDATION.MAX_SLUG_LENGTH) {
            throw new errors_1.ExperimentValidationError(`Experiment slug must be between ${constants_1.VALIDATION.MIN_SLUG_LENGTH} and ${constants_1.VALIDATION.MAX_SLUG_LENGTH} characters`);
        }
        // Validate baseEntityId and experimentBase
        if (!experiment.baseEntityId) {
            throw new errors_1.ExperimentValidationError('Experiment baseEntityId is required');
        }
        if (!experiment.experimentBase) {
            throw new errors_1.ExperimentValidationError('Experiment experimentBase is required');
        }
        // Validate variants
        if (!experiment.variants ||
            !Array.isArray(experiment.variants) ||
            experiment.variants.length < constants_1.VALIDATION.MIN_VARIANTS ||
            experiment.variants.length > constants_1.VALIDATION.MAX_VARIANTS) {
            throw new errors_1.ExperimentValidationError(`Experiment must have between ${constants_1.VALIDATION.MIN_VARIANTS} and ${constants_1.VALIDATION.MAX_VARIANTS} variants`);
        }
        // Validate each variant
        for (const variant of experiment.variants) {
            if (!variant.name || variant.name.length < constants_1.VALIDATION.MIN_NAME_LENGTH || variant.name.length > constants_1.VALIDATION.MAX_NAME_LENGTH) {
                throw new errors_1.ExperimentValidationError(`Variant name must be between ${constants_1.VALIDATION.MIN_NAME_LENGTH} and ${constants_1.VALIDATION.MAX_NAME_LENGTH} characters`);
            }
            if (!variant.slug || variant.slug.length < constants_1.VALIDATION.MIN_SLUG_LENGTH || variant.slug.length > constants_1.VALIDATION.MAX_SLUG_LENGTH) {
                throw new errors_1.ExperimentValidationError(`Variant slug must be between ${constants_1.VALIDATION.MIN_SLUG_LENGTH} and ${constants_1.VALIDATION.MAX_SLUG_LENGTH} characters`);
            }
            if (variant.weight < constants_1.VALIDATION.MIN_VARIANT_WEIGHT || variant.weight > constants_1.VALIDATION.MAX_VARIANT_WEIGHT) {
                throw new errors_1.ExperimentValidationError(`Variant weight must be between ${constants_1.VALIDATION.MIN_VARIANT_WEIGHT} and ${constants_1.VALIDATION.MAX_VARIANT_WEIGHT}`);
            }
            if (!variant.value || variant.value.length < constants_1.VALIDATION.MIN_VALUE_LENGTH || variant.value.length > constants_1.VALIDATION.MAX_VALUE_LENGTH) {
                throw new errors_1.ExperimentValidationError(`Variant value must be between ${constants_1.VALIDATION.MIN_VALUE_LENGTH} and ${constants_1.VALIDATION.MAX_VALUE_LENGTH} characters`);
            }
        }
        // Validate that variant slugs are unique within the experiment
        const slugs = experiment.variants.map((v) => v.slug);
        if (new Set(slugs).size !== slugs.length) {
            throw new errors_1.ExperimentValidationError('Variant slugs must be unique within an experiment');
        }
        // Validate that total weight equals 100
        const totalWeight = experiment.variants.reduce((sum, v) => sum + v.weight, 0);
        if (totalWeight !== 100) {
            throw new errors_1.ExperimentValidationError(`Total variant weights must equal 100, but got ${totalWeight}`);
        }
        return true;
    }
    /**
     * Generates experiment metadata for tracking and analytics
     *
     * @param payload Experiment with assigned variant
     * @returns Metadata object for analytics
     */
    generateMeta(payload) {
        const { id, slug: experimentSlug, variant: { slug: variantSlug }, experimentBase, baseEntityId, } = payload;
        // TODO: to think of a strategy to figure out a way to use old variants to sort out
        // new user and old user in case of variant update
        const meta = {
            experimentId: id,
            experimentSlug,
            variantSlug,
            experimentBase,
            baseEntityId,
        };
        console.log(`[Experiments] Generated metadata: ${JSON.stringify(meta)}`);
        return meta;
    }
}
exports.ExperimentService = ExperimentService;
//# sourceMappingURL=experiment.js.map