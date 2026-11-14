# core/src/linker/compiler

## Compiler

```ts
export class Compiler
```

Low-level service for running the angular compiler during runtime
to create {@link NgModuleFactory} instances, which
can later be used to create and render a Component instance.

Each `@NgModule` provides an own `Compiler` to its injector,
that will use the directives/pipes of the ng module for compilation
of components.

@publicApi

@deprecated
Ivy JIT mode doesn't require accessing this symbol.

## Compiler.compileModuleSync

```ts
compileModuleSync<T>(moduleType: Type<T>): NgModuleFactory<T>
```

Compiles the given NgModule and all of its components. All templates of the components
have to be inlined.

## Compiler.compileModuleAsync

```ts
compileModuleAsync<T>(moduleType: Type<T>): Promise<NgModuleFactory<T>>
```

Compiles the given NgModule and all of its components

## Compiler.clearCache

```ts
clearCache(): void {}
```

Clears all caches.

## Compiler.clearCacheFor

```ts
clearCacheFor(type: Type<any>) {}
```

Clears the cache for the given component/ngModule.

## Compiler.getModuleId

```ts
getModuleId(moduleType: Type<any>): string | undefined
```

Returns the id for a given NgModule, if one is defined and known to the compiler.

## CompilerOptions

```ts
export type CompilerOptions
```

Options for creating a compiler.

@publicApi

## COMPILER_OPTIONS

```ts
export const COMPILER_OPTIONS = new InjectionToken<CompilerOptions[]>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'compilerOptions' : '', )
```

Token to provide CompilerOptions in the platform injector.

@publicApi

## CompilerFactory

```ts
export abstract class CompilerFactory
```

A factory for creating a Compiler

@publicApi

@deprecated
Ivy JIT mode doesn't require accessing this symbol.