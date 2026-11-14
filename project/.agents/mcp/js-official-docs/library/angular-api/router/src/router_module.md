# router/src/router_module

## RouterModule

```ts
export class RouterModule
```

@description

Adds directives and providers for in-app navigation among views defined in an application.
Use the Angular `Router` service to declaratively specify application states and manage state
transitions.

You can import this NgModule multiple times, once for each lazy-loaded bundle.
However, only one `Router` service can be active.
To ensure this, there are two ways to register routes when importing this module:

* The `forRoot()` method creates an `NgModule` that contains all the directives, the given
routes, and the `Router` service itself.
* The `forChild()` method creates an `NgModule` that contains all the directives and the given
routes, but does not include the `Router` service.

@see [Routing and Navigation guide](guide/routing/common-router-tasks) for an
overview of how the `Router` service should be used.

@publicApi

## RouterModule.forRoot

```ts
static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders<RouterModule>
```

Creates and configures a module with all the router providers and directives.
Optionally sets up an application listener to perform an initial navigation.

When registering the NgModule at the root, import as follows:

```ts
@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
class MyNgModule {}
```

@param routes An array of `Route` objects that define the navigation paths for the application.
@param config An `ExtraOptions` configuration object that controls how navigation is performed.
@return The new `NgModule`.

## RouterModule.forChild

```ts
static forChild(routes: Routes): ModuleWithProviders<RouterModule>
```

Creates a module with all the router directives and a provider registering routes,
without creating a new Router service.
When registering for submodules and lazy-loaded submodules, create the NgModule as follows:

```ts
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
class MyNgModule {}
```

@param routes An array of `Route` objects that define the navigation paths for the submodule.
@return The new NgModule.

## ROUTER_INITIALIZER

```ts
export const ROUTER_INITIALIZER = new InjectionToken<(compRef: ComponentRef<any>)
```

A DI token for the router initializer that
is called after the app is bootstrapped.

@publicApi