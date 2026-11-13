---
title: "Testing Utility APIs (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/testing/utility-apis.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Testing Utility APIs

NOTE: While this guide is being updated for Vitest, some descriptions and examples of utility APIs are currently presented within the context of Karma/Jasmine. We are actively working to provide Vitest equivalents and updated guidance where applicable.

This page describes the most useful Angular testing features.

The Angular testing utilities include the `TestBed`, the `ComponentFixture`, and a handful of functions that control the test environment.
The `TestBed` and `ComponentFixture` classes are covered separately.

Here's a summary of the stand-alone functions, in order of likely utility:

| Function     | Details                                                                                                                                                                                                                                                      |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`inject`]   | Injects one or more services from the current `TestBed` injector into a test function. It cannot inject a service provided by the component itself. See discussion of the debugElement.injector. |
| `getTestBed` | Gets the current instance of the `TestBed`. Usually unnecessary because the static class methods of the `TestBed` class are typically sufficient. The `TestBed` instance exposes a few rarely used members that are not available as static methods.         |

For handling complex asynchronous scenarios or testing legacy Zone.js-based applications, see the Zone.js Testing Utilities guide.

## `TestBed` class summary

The `TestBed` class is one of the principal Angular testing utilities.
Its API is quite large and can be overwhelming until you've explored it, a little at a time.
Read the early part of this guide first to get the basics before trying to absorb the full API.

The module definition passed to `configureTestingModule` is a subset of the `@NgModule` metadata properties.

```ts
type TestModuleMetadata = {
  providers?: any[];
  declarations?: any[];
  imports?: any[];
  schemas?: Array<SchemaMetadata | any[]>;
};
```

Each override method takes a `MetadataOverride<T>` where `T` is the kind of metadata appropriate to the method, that is, the parameter of an `@NgModule`, `@Component`, `@Directive`, or `@Pipe`.

```ts
type MetadataOverride<T> = {
  add?: Partial<T>;
  remove?: Partial<T>;
  set?: Partial<T>;
};
```

The `TestBed` API consists of static class methods that either update or reference a _global_ instance of the `TestBed`.

Internally, all static methods cover methods of the current runtime `TestBed` instance, which is also returned by the `getTestBed()` function.

Call `TestBed` methods _within_ a `beforeEach()` to ensure a fresh start before each individual test.

Here are the most important static methods, in order of likely utility.

| Methods                  | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configureTestingModule` | The testing shims establish the initial test environment and a default testing module. The default testing module is configured with basic <example-value> and some Angular service substitutes that every tester needs.  Call `configureTestingModule` to refine the testing module configuration for a particular set of tests by adding and removing imports, declarations \(of components, directives, and pipes\), and providers.                                                                                               |
| `compileComponents`      | Compile the testing module asynchronously after you've finished configuring it. You **must** call this method if _any_ of the testing module components have asynchronously loaded resources (like @defer blocks).                                                                                                                                                                                                                                                                                                                                       |
| `createComponent<T>`     | Create an instance of a component of type `T` based on the current `TestBed` configuration. After calling `createComponent`, the `TestBed` configuration is frozen for the duration of the current spec.                                                                                                                                                                                                                                                                                                                                                 |
| `overrideComponent`      | Replace metadata for the given component class, which could be nested deeply within an inner module.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `overrideDirective`      | Replace metadata for the given directive class, which could be nested deeply within an inner module.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `overridePipe`           | Replace metadata for the given pipe class, which could be nested deeply within an inner module.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `overrideModule`         | Replace metadata for the given `NgModule`. Recall that modules can import other modules. The `overrideModule` method can reach deeply into the current testing module to modify one of these inner modules.                                                                                                                                                                                                                                                                                                                                              |
| `inject`                 | Retrieve a service from the current `TestBed` injector. The `inject` function is often adequate for this purpose. But `inject` throws an error if it can't provide the service.  What if the service is optional?  The `TestBed.inject()` method takes an optional second parameter, the object to return if Angular can't find the provider \(`null` in this example\): `expect(TestBed.inject(NotProvided, null)).toBeNull();` After calling `TestBed.inject`, the `TestBed` configuration is frozen for the duration of the current spec. |
| `initTestEnvironment`    | Initialize the testing environment for the entire test run.  The testing shims call it for you so there is rarely a reason for you to call it yourself.  Call this method _exactly once_. To change this default in the middle of a test run, call `resetTestEnvironment` first.  Specify a default Angular testing module and a `PlatformRef`. Alternatives for non-browser platforms are available in the general form `@angular/platform-<platform_name>/testing`.                                                                  |
| `resetTestEnvironment`   | Reset the initial test environment, including the default testing module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

A few of the `TestBed` instance methods are not covered by static `TestBed` _class_ methods.
These are rarely needed.
