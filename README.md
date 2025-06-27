# Experiments

A lightweight A/B testing library for the Hunch platform with PostgreSQL database storage.

## Features

- **Experiment Management**: Define and manage A/B tests with multiple variants
- **Environment Isolation**: Separate experiments by environment (staging, pre-production, production, production-usa)
- **Consistent Variant Assignment**: Users are consistently assigned to the same variants based on their user ID
- **Weighted Variants**: Configure variant weights to control traffic distribution
- **UI Experiments**: Specialized support for UI-based experiments
- **Experiment Metadata**: Provides experiment metadata to clients for analytics tracking
- **Database Storage**: PostgreSQL-backed storage with optimized queries and proper indexing
- **Factory Pattern**: Extendable architecture with dependency injection

## Implementation Details

- **Analytics**: Analytics tracking is intentionally handled outside this library by clients using the provided `experimentMeta` data
- **Environment Isolation**: Experiments are isolated by environment to allow independent testing in non-production environments
- **Storage**: PostgreSQL database storage using Prisma ORM with optimized queries
- **Focus**: Primary focus is on UI experiments for the current implementation
- **Architecture**: Clean separation between storage interface and implementation

## Future Considerations

The following features are not included in the current implementation but may be considered for future development:

- Conversion tracking and goal definition
- Experiment scheduling and automatic stopping
- Advanced traffic allocation controls
- Multivariate testing
- User segmentation and targeting beyond user ID
- Experiment lifecycle management
- Experiment metrics dashboard

## Building

Run `nx build experiments` to build the library.

The build process includes:

- Compiled TypeScript code
- Assets (README.md and store.json)
- Package.json file

The `store.json` file is included for backward compatibility and testing purposes.

## Running unit tests

Run `nx test experiments` to execute the unit tests via [Jest](https://jestjs.io).

## Database Schema

The library uses two main PostgreSQL tables:

- **experiments**: Main experiment configuration (id, name, slug, environment, is_active, experiment_base, base_entity_id)
- **experiment_variants**: Variant definitions with weights and values

### Environment Isolation

Experiments are isolated by environment using:
- `environment` field in the experiments table
- Composite unique constraint on `(slug, environment)`
- Environment-specific indexes for optimal query performance

This allows the same experiment slug to exist across different environments (staging, pre-production, production, production-usa) without conflicts.

## Usage

```typescript
import { ExperimentManagerFactory, IExperimentPrismaDatabase } from '@monorepo/experiments';
import { PrismaClient } from '@prisma/client';

// Configure database client
const prisma = new PrismaClient();
const experimentDb = {
  experiment_variants: prisma.experiment_variants,
  experiments: prisma.experiments,
};

// Create experiment manager with environment
const environment = process.env.NODE_ENV || 'production'; // staging, pre-production, production, production-usa
const experimentManager = ExperimentManagerFactory.create({ 
  prismaClient: experimentDb as IExperimentPrismaDatabase,
  environment: environment
});

// Use for UI experiments
const experiment = await experimentManager.getUiExperiment(sectionPayload, userId);

// Add new experiment (environment is automatically set from the manager)
const experimentId = await experimentManager.addExperiment({
  name: 'Homepage Layout Test',
  slug: 'homepage-layout-v1',
  isActive: true,
  experimentBase: 'ui-section',
  baseEntityId: 'homepage-hero',
  variants: [
    { name: 'Control', slug: 'control', weight: 50, value: 'original' },
    { name: 'Variant A', slug: 'variant-a', weight: 50, value: 'new-design' }
  ]
});
```

### Environment-Specific Usage

Each environment maintains its own isolated set of experiments:

- **staging**: For development and internal testing
- **pre-production**: For pre-release validation
- **production**: For live production experiments
- **production-usa**: For US-specific production experiments

The same experiment slug can exist across environments with different configurations.

## Architecture

- **Core Services**: Base experiment operations and variant assignment logic
- **Store Interface**: Clean abstraction for storage implementations
- **Prisma Implementation**: Optimized PostgreSQL queries with proper WHERE clauses
- **Factory Pattern**: Dependency injection for different storage backends
- **Type Safety**: Full TypeScript support with comprehensive interfaces
