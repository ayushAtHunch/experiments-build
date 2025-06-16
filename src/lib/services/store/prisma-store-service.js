"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaStoreService = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
class PrismaStoreService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    getAllExperiments() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiments = yield this.prismaClient.experiments.findMany({
                include: {
                    variants: true,
                },
            });
            return experiments.map((exp) => this.mapToExperiment(exp));
        });
    }
    getExperimentById(experimentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiment = yield this.prismaClient.experiments.findUnique({
                where: { id: experimentId },
                include: {
                    variants: true,
                },
            });
            return experiment ? this.mapToExperiment(experiment) : undefined;
        });
    }
    getExperimentsByBaseEntityId(baseEntityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiments = yield this.prismaClient.experiments.findMany({
                where: { base_entity_id: baseEntityId },
                include: {
                    variants: true,
                },
            });
            return experiments.map((exp) => this.mapToExperiment(exp));
        });
    }
    getExperimentBySlug(experimentSlug) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiment = yield this.prismaClient.experiments.findUnique({
                where: { slug: experimentSlug },
                include: {
                    variants: true,
                },
            });
            return experiment ? this.mapToExperiment(experiment) : undefined;
        });
    }
    getActiveExperimentsByBaseEntityId(baseEntityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const experiments = yield this.prismaClient.experiments.findMany({
                where: {
                    base_entity_id: baseEntityId,
                    is_active: true,
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
            yield this.prismaClient.experiments.create({
                data: {
                    id: experiment.id,
                    name: experiment.name,
                    slug: experiment.slug,
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
        });
    }
    updateExperiment(experiment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.experiments.update({
                where: { id: experiment.id },
                data: {
                    name: experiment.name,
                    is_active: experiment.isActive,
                    experiment_base: experiment.experimentBase,
                    base_entity_id: experiment.baseEntityId,
                },
            });
            yield this.prismaClient.experiment_variants.deleteMany({
                where: { experiment_id: experiment.id },
            });
            if (experiment.variants.length > 0) {
                yield this.prismaClient.experiment_variants.createMany({
                    data: experiment.variants.map((variant) => ({
                        id: (0, uuid_1.v4)(),
                        experiment_id: experiment.id,
                        name: variant.name,
                        slug: variant.slug,
                        weight: variant.weight,
                        value: variant.value,
                    })),
                });
            }
        });
    }
    deleteExperiment(experimentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.experiments.delete({
                where: { id: experimentId },
            });
        });
    }
    mapToExperiment(dbExperiment) {
        return {
            id: dbExperiment.id,
            name: dbExperiment.name,
            slug: dbExperiment.slug,
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