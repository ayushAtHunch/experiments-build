import { PrismaClient } from '@prisma/client';
export interface IExperimentPrismaDatabase {
    experiments: PrismaClient['experiments'];
    experiment_variants: PrismaClient['experiment_variants'];
}
