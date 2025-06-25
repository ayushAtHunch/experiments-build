"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentManager = void 0;
const tslib_1 = require("tslib");
const slugify_1 = require("slugify");
const errors_1 = require("../utils/errors");
const variant_assignment_1 = require("../utils/variant-assignment");
const experiment_1 = require("./experiment");
class ExperimentManager extends experiment_1.ExperimentService {
    // Overbidden Section for UI experiments
    /**
     * Generates a standardized identifier for UI sections
     * @param sectionPayload The section information
     * @returns A formatted identifier string
     */
    getUiSectionIdentifier(sectionPayload) {
        const { base_string, app_id, page_id, section_id } = sectionPayload;
        const identifier = `${base_string}::${app_id}::${page_id}::${section_id}`;
        console.log(`[Experiments] UiExperimentsProvider: Generated UI section identifier: ${identifier}`);
        return identifier;
    }
    /**
     * Adds a new UI experiment
     * @param payload The experiment configuration
     */
    addUiExperiment(payload) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`[Experiments] UiExperimentsProvider: Adding new UI experiment: ${payload.name}`);
            const baseEntityId = this.getUiSectionIdentifier(payload.sectionPayload);
            console.log(`[Experiments] UiExperimentsProvider: Generated baseEntityId: ${baseEntityId}`);
            const exp = {
                name: payload.name,
                slug: (0, slugify_1.default)(payload.name, { lower: true }),
                experimentBase: 'ui-section',
                baseEntityId,
                isActive: (_a = payload.isActive) !== null && _a !== void 0 ? _a : true,
                variants: payload.variants.map((v) => ({
                    value: v.value,
                    name: v.name,
                    slug: (0, slugify_1.default)(v.name, { lower: true }),
                    weight: v.weight,
                })),
            };
            console.log(`[Experiments] UiExperimentsProvider: Created experiment with ${exp.variants.length} variants`);
            yield this.addExperiment(exp);
            console.log(`[Experiments] UiExperimentsProvider: Successfully added UI experiment: ${payload.name}`);
        });
    }
    getUiExperiment(sectionPayload, userUId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const baseEntityId = this.getUiSectionIdentifier(sectionPayload);
            console.log(`[Experiments] Getting variants for user ${userUId} and baseEntityId ${baseEntityId}`);
            if (!userUId)
                throw new errors_1.ExperimentError('User ID is required for variant assignment');
            if (!baseEntityId)
                throw new errors_1.ExperimentError('Base entity ID is required');
            const experiments = yield this.getActiveExperimentsByBaseEntityId(baseEntityId);
            console.log(`[Experiments] Found ${experiments.length} active experiments for baseEntityId ${baseEntityId}`);
            // No active experiments for this entity
            if (!experiments.length) {
                console.log('[Experiments] No active experiments found for this entity');
                return undefined;
            }
            // Currently we only support one active experiment per baseEntityId
            // TODO: to add support for multiple experiments with precedence rules
            const experiment = experiments[0];
            console.log(`[Experiments] Selected experiment: ${experiment.name} (${experiment.slug})`);
            try {
                const variant = (0, variant_assignment_1.getAssignedVariant)(userUId, experiment.slug, experiment.variants);
                console.log(`[Experiments] Assigned variant: ${variant.name} (${variant.slug}) to user ${userUId}`);
                return Object.assign(Object.assign({}, experiment), { variant });
            }
            catch (error) {
                console.error(`[Experiments] Error assigning variant for user ${userUId}:`, error);
                throw error;
            }
        });
    }
}
exports.ExperimentManager = ExperimentManager;
//# sourceMappingURL=experiment-manager.js.map