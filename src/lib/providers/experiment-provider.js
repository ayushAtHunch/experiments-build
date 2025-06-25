"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentManagerFactory = void 0;
const experiment_manager_1 = require("../core/experiment-manager");
const prisma_store_service_1 = require("../services/store/prisma-store-service");
/**
 * Factory for creating configured ExperimentManager instances
 */
class ExperimentManagerFactory {
    /**
     * Creates a new ExperimentManager with Prisma storage
     * @param config Configuration object containing Prisma client
     * @returns Configured ExperimentManager instance
     */
    static create(config) {
        const storeProvider = new prisma_store_service_1.PrismaStoreService(config.prismaClient, config.environment);
        return new experiment_manager_1.ExperimentManager(storeProvider);
    }
}
exports.ExperimentManagerFactory = ExperimentManagerFactory;
//# sourceMappingURL=experiment-provider.js.map