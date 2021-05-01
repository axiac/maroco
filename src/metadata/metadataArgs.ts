import { MetadataArgsStorage } from 'routing-controllers';

// These are internal types used by `routing-controllers`.
// This package needs them and uses TypeScript utility types to define them
// from the public types exported by package `routing-controllers`.
export type ControllerMetadataArgs = ReturnType<MetadataArgsStorage['filterControllerMetadatasForClasses']>[0];
export type ActionMetadataArgs = ReturnType<MetadataArgsStorage['filterActionsWithTarget']>[0];
export type ParamMetadataArgs = ReturnType<MetadataArgsStorage['filterParamsWithTargetAndMethod']>[0];
export type ResponseHandleMetadataArgs = ReturnType<MetadataArgsStorage['filterResponseHandlersWithTarget']>[0];
