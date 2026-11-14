# core/src/testability/testability

## PublicTestability

```ts
export declare interface PublicTestability
```

Testability API.
`declare` keyword causes tsickle to generate externs, so these methods are
not renamed by Closure Compiler.
@publicApi

## Testability

```ts
export class Testability implements PublicTestability
```

The Testability service provides testing hooks that can be accessed from
the browser.

Angular applications bootstrapped using an NgModule (via `@NgModule.bootstrap` field) will also
instantiate Testability by default (in both development and production modes).

For applications bootstrapped using the `bootstrapApplication` function, Testability is not
included by default. You can include it into your applications by getting the list of necessary
providers using the `provideProtractorTestingSupport()` function and adding them into the
`options.providers` array. Example:

```ts
import {provideProtractorTestingSupport} from '@angular/platform-browser';

await bootstrapApplication(RootComponent, providers: [provideProtractorTestingSupport()]);
```

@publicApi

## Testability.isStable

```ts
isStable(): boolean
```

Whether an associated application is stable

## Testability.whenStable

```ts
whenStable(doneCb: Function, timeout?: number, updateCb?: Function): void
```

Wait for the application to be stable with a timeout. If the timeout is reached before that
happens, the callback receives a list of the macro tasks that were pending, otherwise null.

@param doneCb The callback to invoke when Angular is stable or the timeout expires
   whichever comes first.
@param timeout Optional. The maximum time to wait for Angular to become stable. If not
   specified, whenStable() will wait forever.
@param updateCb Optional. If specified, this callback will be invoked whenever the set of
   pending macrotasks changes. If this callback returns true doneCb will not be invoked
   and no further updates will be issued.

## Testability.findProviders

```ts
findProviders(using: any, provider: string, exactMatch: boolean): any[]
```

Find providers by name
@param using The root element to search from
@param provider The name of binding variable
@param exactMatch Whether using exactMatch

## TestabilityRegistry

```ts
export class TestabilityRegistry
```

A global registry of {@link Testability} instances for specific elements.
@publicApi

## TestabilityRegistry.registerApplication

```ts
registerApplication(token: any, testability: Testability)
```

Registers an application with a testability hook so that it can be tracked
@param token token of application, root element
@param testability Testability hook

## TestabilityRegistry.unregisterApplication

```ts
unregisterApplication(token: any)
```

Unregisters an application.
@param token token of application, root element

## TestabilityRegistry.unregisterAllApplications

```ts
unregisterAllApplications()
```

Unregisters all applications

## TestabilityRegistry.getTestability

```ts
getTestability(elem: any): Testability | null
```

Get a testability hook associated with the application
@param elem root element

## TestabilityRegistry.getAllTestabilities

```ts
getAllTestabilities(): Testability[]
```

Get all registered testabilities

## TestabilityRegistry.getAllRootElements

```ts
getAllRootElements(): any[]
```

Get all registered applications(root elements)

## TestabilityRegistry.findTestabilityInTree

```ts
findTestabilityInTree(elem: Node, findInAncestors: boolean = true): Testability | null
```

Find testability of a node in the Tree
@param elem node
@param findInAncestors whether finding testability in ancestors if testability was not found in
current node

## GetTestability

```ts
export interface GetTestability
```

Adapter interface for retrieving the `Testability` service associated for a
particular context.

@publicApi

## setTestabilityGetter

```ts
export function setTestabilityGetter(getter: GetTestability): void
```

Set the {@link GetTestability} implementation used by the Angular testing framework.
@publicApi