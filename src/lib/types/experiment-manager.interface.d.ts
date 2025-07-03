import { IVariant } from './experiment.interface';
/**
 * Type for UI section identifier parameters
 */
export type UiSectionIdentifierPayload = {
    /** Base string indicating experiment type */
    base_string: 'ui-section';
    /** App identifier (e.g., 'HUNCH_MOBILE', 'HUNCH_WEB') */
    app_id: string;
    /** Page identifier (e.g., 'paywall', 'home', 'profile') */
    page_id: string;
    /** Section identifier within the page */
    section_id: string;
};
/**
 * Type for adding a new UI experiment
 */
export interface AddUiExperimentPayload {
    /** Human-readable name for the experiment */
    name: string;
    /** Whether the experiment is active */
    isActive?: boolean;
    /** Array of variants for the experiment (without slugs which will be generated) */
    variants: Omit<IVariant, 'slug'>[];
    /** Section identifier information */
    sectionPayload: UiSectionIdentifierPayload;
}
