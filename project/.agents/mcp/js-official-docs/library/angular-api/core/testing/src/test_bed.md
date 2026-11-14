# core/testing/src/test_bed

## TestBedStatic

```ts
export interface TestBedStatic extends TestBed
```

Static methods implemented by the `TestBed`.

@publicApi

## TestComponentOptions

```ts
export interface TestComponentOptions
```

Options that can be configured for a test component.

@publicApi

## TestComponentOptions.bindings

```ts
bindings?: Binding[]
```

Bindings to apply to the test component.

## TestComponentOptions.inferTagName

```ts
inferTagName?: boolean
```

Whether to infer the tag name of the test component from its selector.
Otherwise `div` will be used as its tag name.

## TestDirectiveOptions

```ts
export interface TestDirectiveOptions
```

Options that can be configured for a test directive.

@publicApi 22.2

## TestDirectiveOptions.bindings

```ts
bindings?: Binding[]
```

Bindings to apply to the test directive.

## TestBed

```ts
export interface TestBed
```

@publicApi

## TestBed.initTestEnvironment

```ts
initTestEnvironment( ngModule: Type<any> | Type<any>[], platform: PlatformRef, options?: TestEnvironmentOptions, ): void
```

Initialize the environment for testing with a compiler factory, a PlatformRef, and an
angular module. These are common to every test in the suite.

This may only be called once, to set up the common providers for the current test
suite on the current platform. If you absolutely need to change the providers,
first use `resetTestEnvironment`.

Test modules and platforms for individual platforms are available from
'@angular/<platform_name>/testing'.

## TestBed.resetTestEnvironment

```ts
resetTestEnvironment(): void
```

Reset the providers for the test injector.

## TestBed.runInInjectionContext

```ts
runInInjectionContext<T>(fn: ()
```

Runs the given function in the `EnvironmentInjector` context of `TestBed`.

@see {@link https://angular.dev/api/core/EnvironmentInjector#runInContext}

## TestBed.overrideProvider

```ts
overrideProvider( token: any, provider: {useFactory: Function
```

Overwrites all providers for the given token with the given provider definition.

## TestBed.getLastFixture

```ts
getLastFixture<T = unknown>(): ComponentFixture<T>
```

Returns the most recently created `ComponentFixture`, or throws an error if one has not
yet been created.

## TestBed.flushEffects

```ts
flushEffects(): void
```

Execute any pending effects.

@deprecated use `TestBed.tick()` instead

## TestBed.tick

```ts
tick(): void
```

Execute any pending work required to synchronize model to the UI.

@publicApi 20.0

## getTestBed

```ts
export function getTestBed(): TestBed
```

Returns a singleton of the `TestBed` class.

@publicApi

## TestBed

```ts
export const TestBed: TestBedStatic = TestBedImpl
```

@description
Configures and initializes environment for unit testing and provides methods for
creating components and services in unit tests.

`TestBed` is the primary api for writing unit tests for Angular applications and libraries.

@publicApi

## inject

```ts
export function inject(tokens: any[], fn: Function): ()
```

Allows injecting dependencies in `beforeEach()` and `it()`. Note: this function
(imported from the `@angular/core/testing` package) can **only** be used to inject dependencies
in tests. To inject dependencies in your application code, use the [`inject`](api/core/inject)
function from the `@angular/core` package instead.

Example:

```ts
beforeEach(inject([Dependency, AClass], (dep, object) => {
  // some code that uses `dep` and `object`
  // ...
}));

it('...', inject([AClass], (object) => {
  object.doSomething();
  expect(...);
})
```

@publicApi

## InjectSetupWrapper

```ts
export class InjectSetupWrapper
```

@publicApi

## withModule

```ts
export function withModule(moduleDef: TestModuleMetadata): InjectSetupWrapper
```

@publicApi