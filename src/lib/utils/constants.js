"use strict";
/**
 * Configuration constants for the experiments library
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION = exports.ExperimentBaseType = exports.DEFAULT_EXPERIMENTS_FILE_PATHS = void 0;
/** Default path for file-based experiment storage */
exports.DEFAULT_EXPERIMENTS_FILE_PATHS = [
    'libs/experiments/src/store.json',
    '/app/graphql-server/libs/experiments/src/store.json',
    '/app/cron-decoupler-server/libs/experiments/src/store.json',
];
/** Experiment base types */
var ExperimentBaseType;
(function (ExperimentBaseType) {
    ExperimentBaseType["UI_SECTION"] = "ui-section";
    // Additional base types can be added in the future as needed
})(ExperimentBaseType || (exports.ExperimentBaseType = ExperimentBaseType = {}));
/** Experiment validation constraints */
exports.VALIDATION = {
    MIN_VARIANTS: 1,
    MAX_VARIANTS: 10,
    MAX_VARIANT_WEIGHT: 100,
    MIN_VARIANT_WEIGHT: 0,
    MIN_NAME_LENGTH: 1,
    MAX_NAME_LENGTH: 50,
    MIN_SLUG_LENGTH: 1,
    MAX_SLUG_LENGTH: 50,
    MIN_VALUE_LENGTH: 1,
    MAX_VALUE_LENGTH: 5000,
};
//# sourceMappingURL=constants.js.map