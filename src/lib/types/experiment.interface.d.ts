export interface IVariant {
    name: string;
    slug: string;
    weight: number;
    value: string;
}
export interface IExperiment {
    id: string;
    name: string;
    slug: string;
    variants: IVariant[];
    isActive: boolean;
    /** Type of experiment (e.g., ui-based, user-based) */
    experimentBase: 'ui-section';
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
