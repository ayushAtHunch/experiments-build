import { IStoreProvider } from '../../types/store-service.interface';
import { IExperiment } from '../../types/experiment.interface';
import { IExperimentPrismaDatabase } from '../../types/database.interface';
export declare class PrismaStoreService implements IStoreProvider {
    private readonly experimentStore;
    private readonly variantStore;
    private readonly environment;
    constructor(prismaClient: IExperimentPrismaDatabase, environment: string);
    getAllExperiments(): Promise<IExperiment[]>;
    getExperimentById(experimentId: string): Promise<IExperiment | undefined>;
    getExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    getExperimentBySlug(experimentSlug: string): Promise<IExperiment | undefined>;
    getActiveExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    addExperiment(experiment: Omit<IExperiment, 'id' | 'environment'>): Promise<string>;
    updateExperiment(_experiment: IExperiment): Promise<void>;
    deleteExperiment(experimentId: string): Promise<void>;
    activateExperiment(experimentId: string): Promise<void>;
    deactivateExperiment(experimentId: string): Promise<void>;
    private mapToExperiment;
    private mapToVariant;
}
