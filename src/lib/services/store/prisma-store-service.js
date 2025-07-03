"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaStoreService = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
class PrismaStoreService {
    constructor(prismaClient, environment) {
        this.experimentStore = prismaClient.experiments;
        this.variantStore = prismaClient.experiment_variants;
        this.environment = environment;
    }
    getAllExperiments() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiments = yield this.experimentStore.findMany({
                where: {
                    environment: this.environment,
                },
                include: {
                    variants: true,
                },
            });
            return experiments.map((exp) => this.mapToExperiment(exp));
        });
    }
    getExperimentById(experimentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiment = yield this.experimentStore.findFirst({
                where: {
                    id: experimentId,
                    environment: this.environment,
                },
                include: {
                    variants: true,
                },
            });
            return experiment ? this.mapToExperiment(experiment) : undefined;
        });
    }
    getExperimentsByBaseEntityId(baseEntityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiments = yield this.experimentStore.findMany({
                where: {
                    base_entity_id: baseEntityId,
                    environment: this.environment,
                },
                include: {
                    variants: true,
                },
            });
            return experiments.map((exp) => this.mapToExperiment(exp));
        });
    }
    getExperimentBySlug(experimentSlug) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiment = yield this.experimentStore.findUnique({
                where: {
                    slug_environment: {
                        slug: experimentSlug,
                        environment: this.environment,
                    },
                },
                include: {
                    variants: true,
                },
            });
            return experiment ? this.mapToExperiment(experiment) : undefined;
        });
    }
    getActiveExperimentsByBaseEntityId(baseEntityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiments = yield this.experimentStore.findMany({
                where: {
                    base_entity_id: baseEntityId,
                    is_active: true,
                    environment: this.environment,
                },
                include: {
                    variants: true,
                },
            });
            return experiments.map((exp) => this.mapToExperiment(exp));
        });
    }
    addExperiment(experiment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experimentId = (0, uuid_1.v4)();
            yield this.experimentStore.create({
                data: {
                    id: experimentId,
                    name: experiment.name,
                    slug: experiment.slug,
                    environment: this.environment,
                    is_active: experiment.isActive,
                    experiment_base: experiment.experimentBase,
                    base_entity_id: experiment.baseEntityId,
                    variants: {
                        create: experiment.variants.map((variant) => ({
                            id: (0, uuid_1.v4)(),
                            name: variant.name,
                            slug: variant.slug,
                            weight: variant.weight,
                            value: variant.value,
                        })),
                    },
                },
            });
            return experimentId;
        });
    }
    updateExperiment(_experiment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented - Updating experiments is intentionally disabled to avoid issues with variant assignment for existing users');
        });
    }
    deleteExperiment(experimentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.experimentStore.delete({
                where: { id: experimentId },
            });
        });
    }
    mapToExperiment(dbExperiment) {
        return {
            id: dbExperiment.id,
            name: dbExperiment.name,
            slug: dbExperiment.slug,
            environment: dbExperiment.environment,
            isActive: dbExperiment.is_active,
            experimentBase: dbExperiment.experiment_base,
            baseEntityId: dbExperiment.base_entity_id,
            variants: dbExperiment.variants.map((variant) => this.mapToVariant(variant)),
        };
    }
    mapToVariant(dbVariant) {
        return {
            name: dbVariant.name,
            slug: dbVariant.slug,
            weight: dbVariant.weight,
            value: dbVariant.value,
        };
    }
}
exports.PrismaStoreService = PrismaStoreService;
//# sourceMappingURL=prisma-store-service.js.map