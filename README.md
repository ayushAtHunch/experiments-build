# Experiments

A lightweight A/B testing library for the Hunch platform.

## Features

- **Experiment Management**: Define and manage A/B tests with multiple variants
- **Consistent Variant Assignment**: Users are consistently assigned to the same variants based on their user ID
- **Weighted Variants**: Configure variant weights to control traffic distribution
- **UI Experiments**: Specialized support for UI-based experiments
- **Experiment Metadata**: Provides experiment metadata to clients for analytics tracking
- **Flexible Storage**: File-based storage implementation with interfaces for future DB integration
- **Factory Pattern**: Extendable architecture for different experiment types

## Implementation Details

- **Analytics**: Analytics tracking is intentionally handled outside this library by clients using the provided `experimentMeta` data
- **Storage**: Currently implements file-based storage which will be replaced by database storage in the future
- **Focus**: Primary focus is on UI experiments for the current implementation

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

The `store.json` file is an essential asset that contains experiment configurations and is included in the build output.

## Running unit tests

Run `nx test experiments` to execute the unit tests via [Jest](https://jestjs.io).

### Todo:

- UiExperimentsProvider should extend/implement ExperimentProvider instead of FileProvider
- File Provider will become ExperimentProvider and StoreProvider will be injected into it (as on now FileBased bun in future replaced by DBClass but both implements StoreProvider)
