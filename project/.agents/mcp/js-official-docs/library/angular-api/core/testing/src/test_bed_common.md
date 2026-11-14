# core/testing/src/test_bed_common

## TestComponentRenderer

```ts
export class TestComponentRenderer
```

An abstract class for inserting the root test component element in a platform independent way.

@publicApi

## ComponentFixtureAutoDetect

```ts
export const ComponentFixtureAutoDetect = new InjectionToken<boolean>('ComponentFixtureAutoDetect')
```

@publicApi

## ComponentFixtureNoNgZone

```ts
export const ComponentFixtureNoNgZone = new InjectionToken<boolean>('ComponentFixtureNoNgZone')
```

@publicApi

## TestModuleMetadata

```ts
export interface TestModuleMetadata
```

@publicApi

## TestModuleMetadata.errorOnUnknownElements

```ts
errorOnUnknownElements?: boolean
```

Whether NG0304 runtime errors should be thrown when unknown elements are present in component's
template. Defaults to `false`, where the error is simply logged. If set to `true`, the error is
thrown.
@see [NG8001](/errors/NG8001) for the description of the problem and how to fix it

## TestModuleMetadata.errorOnUnknownProperties

```ts
errorOnUnknownProperties?: boolean
```

Whether errors should be thrown when unknown properties are present in component's template.
Defaults to `false`, where the error is simply logged.
If set to `true`, the error is thrown.
@see [NG8002](/errors/NG8002) for the description of the error and how to fix it

## TestModuleMetadata.rethrowApplicationErrors

```ts
rethrowApplicationErrors?: boolean
```

Whether errors that happen during application change detection should be rethrown.

When `true`, errors that are caught during application change detection will
be reported to the `ErrorHandler` and rethrown to prevent them from going
unnoticed in tests.

When `false`, errors are only forwarded to the `ErrorHandler`, which by default
simply logs them to the console.

Defaults to `true`.

## TestModuleMetadata.deferBlockBehavior

```ts
deferBlockBehavior?: DeferBlockBehavior
```

Whether defer blocks should behave with manual triggering or play through normally.
Defaults to `manual`.

## TestModuleMetadata.inferTagName

```ts
inferTagName?: boolean
```

Whether to infer the tag name of test components from their selectors.
Otherwise `div` will be used as the tag name for test components.

## TestModuleMetadata.animationsEnabled

```ts
animationsEnabled?: boolean
```

Whether animate.enter / animate.leave should trigger as normal or be disabled.
Defaults to `false`.

## TestEnvironmentOptions

```ts
export interface TestEnvironmentOptions
```

@publicApi

## TestEnvironmentOptions.teardown

```ts
teardown?: ModuleTeardownOptions
```

Configures the test module teardown behavior in `TestBed`.

## TestEnvironmentOptions.errorOnUnknownElements

```ts
errorOnUnknownElements?: boolean
```

Whether errors should be thrown when unknown elements are present in component's template.
Defaults to `false`, where the error is simply logged.
If set to `true`, the error is thrown.
@see [NG8001](/errors/NG8001) for the description of the error and how to fix it

## TestEnvironmentOptions.errorOnUnknownProperties

```ts
errorOnUnknownProperties?: boolean
```

Whether errors should be thrown when unknown properties are present in component's template.
Defaults to `false`, where the error is simply logged.
If set to `true`, the error is thrown.
@see [NG8002](/errors/NG8002) for the description of the error and how to fix it

## ModuleTeardownOptions

```ts
export interface ModuleTeardownOptions
```

Configures the test module teardown behavior in `TestBed`.
@publicApi

## ModuleTeardownOptions.destroyAfterEach

```ts
destroyAfterEach: boolean
```

Whether the test module should be destroyed after every test. Defaults to `true`.

## ModuleTeardownOptions.rethrowErrors

```ts
rethrowErrors?: boolean
```

Whether errors during test module destruction should be re-thrown. Defaults to `true`.