export { IVariant, IExperiment, ISingleVariantExperiment, IExperimentMeta, IExperimentEntity } from './lib/types/experiment.interface';
export { ExperimentError, ExperimentValidationError, ExperimentNotFoundError } from './lib/utils/errors';
export { UiSectionIdentifierPayload } from './lib/types/experiment-manager.interface';
export { experimentManager } from './lib/providers/experiment-provider';
