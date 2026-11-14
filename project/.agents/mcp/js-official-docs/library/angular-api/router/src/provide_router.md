# router/src/provide_router

## provideRouter

```ts
export function provideRouter(routes: Routes, ...features: RouterFeatures[]): EnvironmentProviders
```

Sets up providers necessary to enable `Router` functionality for the application.
Allows to configure a set of routes as well as extra features that should be enabled.

@usageNotes

Basic example of how you can add a Router to your application:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)]
});
```

You can also enable optional features in the Router by adding functions from the `RouterFeatures`
type:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes,
        withDebugTracing(),
        withRouterConfig({paramsInheritanceStrategy: 'always'}))
    ]
  }
);
```
@see [Router](guide/routing)

@see {@link RouterFeatures}

@publicApi
@param routes A set of `Route`s to use for the application routing table.
@param features Optional features to configure additional router behaviors.
@returns A set of providers to setup a Router.

## RouterFeature

```ts
export interface RouterFeature<FeatureKind extends RouterFeatureKind>
```

Helper type to represent a Router feature.

@publicApi

## InMemoryScrollingFeature

```ts
export type InMemoryScrollingFeature = RouterFeature<RouterFeatureKind.InMemoryScrollingFeature>
```

A type alias for providers returned by `withInMemoryScrolling` for use with `provideRouter`.

@see {@link withInMemoryScrolling}
@see {@link provideRouter}

@publicApi

## withInMemoryScrolling

```ts
export function withInMemoryScrolling( options: InMemoryScrollingOptions = {}, ): InMemoryScrollingFeature
```

Enables customizable scrolling behavior for router navigations.

@usageNotes

Basic example of how you can enable scrolling feature:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withInMemoryScrolling())
    ]
  }
);
```

@see {@link provideRouter}
@see {@link ViewportScroller}

@publicApi
@param options Set of configuration parameters to customize scrolling behavior, see
    `InMemoryScrollingOptions` for additional information.
@returns A set of providers for use with `provideRouter`.

## EnabledBlockingInitialNavigationFeature

```ts
export type EnabledBlockingInitialNavigationFeature = RouterFeature<RouterFeatureKind.EnabledBlockingInitialNavigationFeature>
```

A type alias for providers returned by `withEnabledBlockingInitialNavigation` for use with
`provideRouter`.

@see {@link withEnabledBlockingInitialNavigation}
@see {@link provideRouter}

@publicApi

## InitialNavigationFeature

```ts
export type InitialNavigationFeature = EnabledBlockingInitialNavigationFeature | DisabledInitialNavigationFeature
```

A type alias for providers returned by `withEnabledBlockingInitialNavigation` or
`withDisabledInitialNavigation` functions for use with `provideRouter`.

@see {@link withEnabledBlockingInitialNavigation}
@see {@link withDisabledInitialNavigation}
@see {@link provideRouter}

@publicApi

## withEnabledBlockingInitialNavigation

```ts
export function withEnabledBlockingInitialNavigation(): EnabledBlockingInitialNavigationFeature
```

Configures initial navigation to start before the root component is created.

The bootstrap is blocked until the initial navigation is complete. This should be set in case
you use [server-side rendering](guide/ssr), but do not enable [hydration](guide/hydration) for
your application.

@usageNotes

Basic example of how you can enable this navigation behavior:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
    ]
  }
);
```

@see {@link provideRouter}

@publicApi
@returns A set of providers for use with `provideRouter`.

## DisabledInitialNavigationFeature

```ts
export type DisabledInitialNavigationFeature = RouterFeature<RouterFeatureKind.DisabledInitialNavigationFeature>
```

A type alias for providers returned by `withDisabledInitialNavigation` for use with
`provideRouter`.

@see {@link withDisabledInitialNavigation}
@see {@link provideRouter}

@publicApi

## withDisabledInitialNavigation

```ts
export function withDisabledInitialNavigation(): DisabledInitialNavigationFeature
```

Disables initial navigation.

Use if there is a reason to have more control over when the router starts its initial navigation
due to some complex initialization logic.

@usageNotes

Basic example of how you can disable initial navigation:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withDisabledInitialNavigation())
    ]
  }
);
```

@see {@link provideRouter}

@returns A set of providers for use with `provideRouter`.

@publicApi

## DebugTracingFeature

```ts
export type DebugTracingFeature = RouterFeature<RouterFeatureKind.DebugTracingFeature>
```

A type alias for providers returned by `withDebugTracing` for use with `provideRouter`.

@see {@link withDebugTracing}
@see {@link provideRouter}

@publicApi

## withDebugTracing

```ts
export function withDebugTracing(): DebugTracingFeature
```

Enables logging of all internal navigation events to the console.
Extra logging might be useful for debugging purposes to inspect Router event sequence.

@usageNotes

Basic example of how you can enable debug tracing:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withDebugTracing())
    ]
  }
);
```

@see {@link provideRouter}

@returns A set of providers for use with `provideRouter`.

@publicApi

## PreloadingFeature

```ts
export type PreloadingFeature = RouterFeature<RouterFeatureKind.PreloadingFeature>
```

A type alias that represents a feature which enables preloading in Router.
The type is used to describe the return value of the `withPreloading` function.

@see {@link withPreloading}
@see {@link provideRouter}

@publicApi

## withPreloading

```ts
export function withPreloading(preloadingStrategy: Type<PreloadingStrategy>): PreloadingFeature
```

Allows to configure a preloading strategy to use. The strategy is configured by providing a
reference to a class that implements a `PreloadingStrategy`.

@usageNotes

Basic example of how you can configure preloading:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withPreloading(PreloadAllModules))
    ]
  }
);
```

@see {@link provideRouter}

@param preloadingStrategy A reference to a class that implements a `PreloadingStrategy` that
    should be used.
@returns A set of providers for use with `provideRouter`.

@see [Preloading strategy](guide/routing/customizing-route-behavior#preloading-strategy)

@publicApi

## RouterConfigurationFeature

```ts
export type RouterConfigurationFeature = RouterFeature<RouterFeatureKind.RouterConfigurationFeature>
```

A type alias for providers returned by `withRouterConfig` for use with `provideRouter`.

@see {@link withRouterConfig}
@see {@link provideRouter}

@publicApi

## withRouterConfig

```ts
export function withRouterConfig(options: RouterConfigOptions): RouterConfigurationFeature
```

Allows to provide extra parameters to configure Router.

@usageNotes

Basic example of how you can provide extra configuration options:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withRouterConfig({
         onSameUrlNavigation: 'reload'
      }))
    ]
  }
);
```

@see {@link provideRouter}

@param options A set of parameters to configure Router, see `RouterConfigOptions` for
    additional information.
@returns A set of providers for use with `provideRouter`.

@see [Router configuration options](guide/routing/customizing-route-behavior#router-configuration-options)

@publicApi

## RouterHashLocationFeature

```ts
export type RouterHashLocationFeature = RouterFeature<RouterFeatureKind.RouterHashLocationFeature>
```

A type alias for providers returned by `withHashLocation` for use with `provideRouter`.

@see {@link withHashLocation}
@see {@link provideRouter}

@publicApi

## withHashLocation

```ts
export function withHashLocation(): RouterHashLocationFeature
```

Provides the location strategy that uses the URL fragment instead of the history API.

@usageNotes

Basic example of how you can use the hash location option:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withHashLocation())
    ]
  }
);
```

@see {@link provideRouter}
@see {@link /api/common/HashLocationStrategy HashLocationStrategy}

@returns A set of providers for use with `provideRouter`.

@publicApi

## NavigationErrorHandlerFeature

```ts
export type NavigationErrorHandlerFeature = RouterFeature<RouterFeatureKind.NavigationErrorHandlerFeature>
```

A type alias for providers returned by `withNavigationErrorHandler` for use with `provideRouter`.

@see {@link withNavigationErrorHandler}
@see {@link provideRouter}

@publicApi

## withNavigationErrorHandler

```ts
export function withNavigationErrorHandler( handler: (error: NavigationError)
```

Provides a function which is called when a navigation error occurs.

This function is run inside application's [injection context](guide/di/dependency-injection-context)
so you can use the [`inject`](api/core/inject) function.

This function can return a `RedirectCommand` to convert the error to a redirect, similar to returning
a `UrlTree` or `RedirectCommand` from a guard. This will also prevent the `Router` from emitting
`NavigationError`; it will instead emit `NavigationCancel` with code NavigationCancellationCode.Redirect.
Return values other than `RedirectCommand` are ignored and do not change any behavior with respect to
how the `Router` handles the error.

@usageNotes

Basic example of how you can use the error handler option:
```ts
const appRoutes: Routes = [];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(appRoutes, withNavigationErrorHandler((e: NavigationError) =>
inject(MyErrorTracker).trackError(e)))
    ]
  }
);
```

@see {@link NavigationError}
@see {@link /api/core/inject inject}
@see {@link runInInjectionContext}
@see [Centralize error handling in withNavigationErrorHandler](guide/routing/data-resolvers#centralize-error-handling-in-withnavigationerrorhandler)

@returns A set of providers for use with `provideRouter`.

@publicApi

## AutoCleanupInjectorsFeature

```ts
export type AutoCleanupInjectorsFeature = RouterFeature<RouterFeatureKind.AutoCleanupInjectorsFeature>
```

A type alias for providers returned by `withAutoCleanupInjectors` for use with `provideRouter`.

@see {@link withAutoCleanupInjectors}
@see {@link provideRouter}

@publicApi 22.2

## withAutoCleanupInjectors

```ts
export function withAutoCleanupInjectors(): AutoCleanupInjectorsFeature
```

Enables automatic destruction of unused route injectors.

@description

When enabled, the router will automatically destroy `EnvironmentInjector`s associated with `Route`s
that are no longer active or stored by the `RouteReuseStrategy`.

This feature is opt-in and requires `RouteReuseStrategy.shouldDestroyInjector` to return `true`
for the routes that should be destroyed. If the `RouteReuseStrategy` uses stored handles, it
should also implement `retrieveStoredRouteHandles` to ensure injectors for handles that will be
reattached are not destroyed.

@publicApi 22.2

## withExperimentalAutoCleanupInjectors

```ts
export function withExperimentalAutoCleanupInjectors(): AutoCleanupInjectorsFeature
```

Enables automatic destruction of unused route injectors.

@deprecated Use `withAutoCleanupInjectors` instead.
@see {@link withAutoCleanupInjectors}
@publicApi

## ComponentInputBindingFeature

```ts
export type ComponentInputBindingFeature = RouterFeature<RouterFeatureKind.ComponentInputBindingFeature>
```

A type alias for providers returned by `withComponentInputBinding` for use with `provideRouter`.

@see {@link withComponentInputBinding}
@see {@link provideRouter}

@publicApi

## ViewTransitionsFeature

```ts
export type ViewTransitionsFeature = RouterFeature<RouterFeatureKind.ViewTransitionsFeature>
```

A type alias for providers returned by `withViewTransitions` for use with `provideRouter`.

@see {@link withViewTransitions}
@see {@link provideRouter}

@publicApi

## RouterFeatures

```ts
export type RouterFeatures = | PreloadingFeature | DebugTracingFeature | InitialNavigationFeature | InMemoryScrollingFeature | RouterConfigurationFeature | NavigationErrorHandlerFeature | ComponentInputBindingFeature | ViewTransitionsFeature | AutoCleanupInjectorsFeature | RouterHashLocationFeature | ExperimentalPlatformNavigationFeature | RouterResourcesFeature
```

A type alias that represents all Router features available for use with `provideRouter`.
Features can be enabled by adding special functions to the `provideRouter` call.
See documentation for each symbol to find corresponding function name. See also `provideRouter`
documentation on how to use those functions.

@see {@link provideRouter}

@publicApi