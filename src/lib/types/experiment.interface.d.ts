export interface IVariant {
    name: string;
    slug: string;
    weight: number;
    value: string;
}
export type ExperimentBase = 'ui-section';
export interface IExperiment {
    id: string;
    name: string;
    slug: string;
    environment: string;
    variants: IVariant[];
    isActive: boolean;
    experimentBase: ExperimentBase;
    baseEntityId: string;
}
export interface ISingleVariantExperiment extends Omit<IExperiment, 'variants'> {
    variant: IVariant;
}
export interface IExperimentMeta {
    experimentSlug: string;
    variantSlug: string;
    experimentBase: string;
    baseEntityId: string;
}
export interface IExperimentEntity<T> {
    entity: T;
    meta: IExperimentMeta | undefined;
}
export type TAddExperimentPayload = Omit<IExperiment, 'id' | 'environment'>;
