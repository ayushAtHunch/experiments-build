/**
 * Configuration constants for the experiments library
 */
/** Default path for file-based experiment storage */
export declare const DEFAULT_EXPERIMENTS_FILE_PATHS: string[];
/** Experiment base types */
export declare enum ExperimentBaseType {
    UI_SECTION = "ui-section"
}
/** Experiment validation constraints */
export declare const VALIDATION: {
    MIN_VARIANTS: number;
    MAX_VARIANTS: number;
    MAX_VARIANT_WEIGHT: number;
    MIN_VARIANT_WEIGHT: number;
    MIN_NAME_LENGTH: number;
    MAX_NAME_LENGTH: number;
    MIN_SLUG_LENGTH: number;
    MAX_SLUG_LENGTH: number;
    MIN_VALUE_LENGTH: number;
    MAX_VALUE_LENGTH: number;
};
