"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedVariant = void 0;
const crypto = require("crypto");
const errors_1 = require("../utils/errors");
/**
 * Assigns a variant to a user based on a deterministic algorithm
 *
 * @param userId - Unique user identifier
 * @param experimentSlug - Experiment slug used for the hash
 * @param variants - Array of available variants with weights
 * @returns The assigned variant
 * @throws {ExperimentError} If variants array is empty
 */
function getAssignedVariant(userId, experimentSlug, variants) {
    console.log(`[Experiments] Assigning variant for user ${userId} in experiment ${experimentSlug}`);
    // Validation
    if (!variants || variants.length === 0) {
        throw new errors_1.ExperimentError('Cannot assign variant: No variants provided');
    }
    if (!userId || !experimentSlug) {
        throw new errors_1.ExperimentError('Cannot assign variant: Missing user ID or experiment slug');
    }
    // Sort variants to ensure consistent assignment
    const sortedVariants = [...variants].sort((a, b) => a.slug.localeCompare(b.slug));
    // Create a hash input that includes all factors affecting the distribution
    const input = `${userId}|${experimentSlug}|${sortedVariants.map((v) => `${v.slug}:${v.weight}`).join('|')}`;
    // Generate a hash and convert to a normalized value between 0 and 1
    const hash = crypto.createHash('md5').update(input).digest('hex');
    const hashInt = parseInt(hash.slice(0, 8), 16);
    const normalized = hashInt / 0xffffffff;
    console.log(`[Experiments] Generated hash: ${hash.substring(0, 8)}..., normalized value: ${normalized}`);
    // Calculate total weight for normalization
    const totalWeight = sortedVariants.reduce((sum, v) => sum + v.weight, 0);
    console.log(`[Experiments] Total weight of all variants: ${totalWeight}`);
    if (totalWeight <= 0) {
        console.error('[Experiments] Error: Cannot assign variant: Total variant weight must be greater than 0');
        throw new errors_1.ExperimentError('Cannot assign variant: Total variant weight must be greater than 0');
    }
    // Assign variant based on the normalized hash value and variant weights
    let cumulative = 0;
    for (const variant of sortedVariants) {
        cumulative += variant.weight / totalWeight;
        console.log(`[Experiments] Checking variant ${variant.name} (${variant.slug}) with weight ${variant.weight}, cumulative probability: ${cumulative}`);
        if (normalized < cumulative) {
            console.log(`[Experiments] Selected variant: ${variant.name} (${variant.slug})`);
            return variant;
        }
    }
    // Fallback to the last variant (should rarely happen due to floating point precision)
    const fallbackVariant = sortedVariants[sortedVariants.length - 1];
    console.log(`[Experiments] Using fallback variant: ${fallbackVariant.name} (${fallbackVariant.slug})`);
    return fallbackVariant;
}
exports.getAssignedVariant = getAssignedVariant;
//# sourceMappingURL=variant-assignment.js.map