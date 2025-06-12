"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experimentManager = void 0;
const experiment_manager_1 = require("../core/experiment-manager");
const store_porvider_1 = require("./store-porvider");
const experimentManager = new experiment_manager_1.ExperimentManager(store_porvider_1.storeProvider);
exports.experimentManager = experimentManager;
//# sourceMappingURL=experiment-provider.js.map