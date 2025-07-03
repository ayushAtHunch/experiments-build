import { AddUiExperimentPayload, UiSectionIdentifierPayload } from '../types/experiment-manager.interface';
import { ExperimentService } from './experiment';
export declare class ExperimentManager extends ExperimentService {
    /**
     * Generates a standardized identifier for UI sections
     * @param sectionPayload The section information
     * @returns A formatted identifier string
     */
    private getUiSectionIdentifier;
    /**
     * Adds a new UI experiment
     * @param payload The experiment configuration
     */
    addUiExperiment(payload: AddUiExperimentPayload): Promise<void>;
    getUiExperiment(sectionPayload: UiSectionIdentifierPayload, userUId: string): Promise<{
        variant: import("../types/experiment.interface").IVariant;
        id: string;
        name: string;
        slug: string;
        environment: string;
        variants: import("../types/experiment.interface").IVariant[];
        isActive: boolean;
        experimentBase: "ui-section";
        baseEntityId: string;
    }>;
}
