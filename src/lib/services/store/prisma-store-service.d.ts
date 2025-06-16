import { IStoreProvider } from '../../types/store-service.interface';
import { IExperiment } from '../../types/experiment.interface';
import { IExperimentPrismaDatabase } from '../../types/database.interface';
export declare class PrismaStoreService implements IStoreProvider {
    private readonly prismaClient;
    constructor(prismaClient: IExperimentPrismaDatabase);
    getAllExperiments(): Promise<IExperiment[]>;
    getExperimentById(experimentId: string): Promise<IExperiment | undefined>;
    getExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    getExperimentBySlug(experimentSlug: string): Promise<IExperiment | undefined>;
    getActiveExperimentsByBaseEntityId(baseEntityId: string): Promise<IExperiment[]>;
    addExperiment(experiment: IExperiment): Promise<void>;
    updateExperiment(experiment: IExperiment): Promise<void>;
    deleteExperiment(experimentId: string): Promise<void>;
    private mapToExperiment;
    private mapToVariant;
}
