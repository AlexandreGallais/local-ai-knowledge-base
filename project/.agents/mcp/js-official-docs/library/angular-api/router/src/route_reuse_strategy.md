# router/src/route_reuse_strategy

## DetachedRouteHandle

```ts
export type DetachedRouteHandle = {}
```

@description

Represents the detached route tree.

This is an opaque value the router will give to a custom route reuse strategy
to store and retrieve later on.

@publicApi

## destroyDetachedRouteHandle

```ts
export function destroyDetachedRouteHandle(handle: DetachedRouteHandle): void
```

@description

Destroys the component associated with a `DetachedRouteHandle`.

This function should be used when a `RouteReuseStrategy` decides to drop a stored handle
and wants to ensure that the component is destroyed.

@param handle The detached route handle to destroy.

@publicApi 22.2
@see [Manually destroying detached route handles](guide/routing/customizing-route-behavior#manually-destroying-detached-route-handles)

## BaseRouteReuseStrategy

```ts
export abstract class BaseRouteReuseStrategy implements RouteReuseStrategy
```

@description

This base route reuse strategy only reuses routes when the matched router configs are
identical. This prevents components from being destroyed and recreated
when just the route parameters, query parameters or fragment change
(that is, the existing component is _reused_).

This strategy does not store any routes for later reuse.

Angular uses this strategy by default.


It can be used as a base class for custom route reuse strategies, i.e. you can create your own
class that extends the `BaseRouteReuseStrategy` one.
@publicApi

## BaseRouteReuseStrategy.shouldDetach

```ts
shouldDetach(route: ActivatedRouteSnapshot): boolean
```

Whether the given route should detach for later reuse.
Always returns false for `BaseRouteReuseStrategy`.

## BaseRouteReuseStrategy.store

```ts
store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
```

A no-op; the route is never stored since this strategy never detaches routes for later re-use.

## BaseRouteReuseStrategy.shouldAttach

```ts
shouldAttach(route: ActivatedRouteSnapshot): boolean
```

Returns `false`, meaning the route (and its subtree) is never reattached

## BaseRouteReuseStrategy.retrieve

```ts
retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null
```

Returns `null` because this strategy does not store routes for later re-use.

## BaseRouteReuseStrategy.shouldReuseRoute

```ts
shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean
```

Determines if a route should be reused.
This strategy returns `true` when the future route config and current route config are
identical.

## BaseRouteReuseStrategy.shouldDestroyInjector

```ts
shouldDestroyInjector(route: Route): boolean
```

Determines if the injector for the given route should be destroyed.

This method is called by the router after navigations.
If this method returns `true`, the router will destroy the injector for the given route.

@see {@link withAutoCleanupInjectors}