import { ExperimentManager } from '../core/experiment-manager';
import { IExperimentPrismaDatabase } from '../types/database.interface';
/**
 * Configuration for creating an ExperimentManager instance
 */
export interface ExperimentManagerConfig {
    prismaClient: IExperimentPrismaDatabase;
    environment: string;
}
/**
 * Factory for creating configured ExperimentManager instances
 */
export declare class ExperimentManagerFactory {
    /**
     * Creates a new ExperimentManager with Prisma storage
     * @param config Configuration object containing Prisma client
     * @returns Configured ExperimentManager instance
     */
    static create(config: ExperimentManagerConfig): ExperimentManager;
}
