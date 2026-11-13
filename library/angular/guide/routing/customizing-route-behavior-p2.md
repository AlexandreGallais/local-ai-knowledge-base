---
title: "Customizing route behavior (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/routing/customizing-route-behavior.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Customizing route behavior (part 2 of 3)

## Route reuse strategy

Route reuse strategy controls whether Angular destroys and recreates components during navigation or preserves them for reuse. By default, Angular destroys component instances when navigating away from a route and creates new instances when navigating back.

### When to implement route reuse

Custom route reuse strategies benefit applications that need:

- **Form state preservation** - Keep partially completed forms when users navigate away and return
- **Expensive data retention** - Avoid re-fetching large datasets or complex calculations
- **Scroll position maintenance** - Preserve scroll positions in long lists or infinite scroll implementations
- **Tab-like interfaces** - Maintain component state when switching between tabs

### Creating a custom route reuse strategy

Angular's `RouteReuseStrategy` class allows you to customize navigation behavior through the concept of "detached route handles."

"Detached route handles" are Angular's way of storing component instances and their entire view hierarchy. When a route is detached, Angular preserves the component instance, its child components, and all associated state in memory. This preserved state can later be reattached when navigating back to the route.

The `RouteReuseStrategy` class provides the following methods that control the lifecycle of route components:

| Method                                                                         | Description                                                                                                 |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `shouldDetach`                   | Determines if a route should be stored for later reuse when navigating away                                 |
| `store`                                 | Stores the detached route handle when `shouldDetach` returns true                                           |
| `shouldAttach`                   | Determines if a stored route should be reattached when navigating to it                                     |
| `retrieve`                           | Returns the previously stored route handle for reattachment                                                 |
| `shouldReuseRoute`           | Determines if the router should reuse the current route instance instead of destroying it during navigation |
| `shouldDestroyInjector` | Determines if the router should destroy the injector of a detached route when it is no longer stored        |

The following example demonstrates a custom route reuse strategy that selectively preserves component state based on route metadata:

```ts
import {
  RouteReuseStrategy,
  Route,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers = new Map<Route | null, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Determines if a route should be stored for later reuse
    return route.data['reuse'] === true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    // Stores the detached route handle when shouldDetach returns true
    if (handle && route.data['reuse'] === true) {
      const key = this.getRouteKey(route);
      this.handlers.set(key, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // Checks if a stored route should be reattached
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true && this.handlers.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // Returns the stored route handle for reattachment
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true ? (this.handlers.get(key) ?? null) : null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Determines if the router should reuse the current route instance
    return future.routeConfig === curr.routeConfig;
  }

  private getRouteKey(route: ActivatedRouteSnapshot): Route | null {
    return route.routeConfig;
  }
}
```

### Manually destroying detached route handles

When implementing a custom `RouteReuseStrategy`, you may need to manually destroy a `DetachedRouteHandle` if you decide to discard it without reattaching it. For example, if your strategy has a cache size limit or expires handles after a certain time, you must ensure the component and its state are properly destroyed to avoid memory leaks.

Since `DetachedRouteHandle` is an opaque type, you cannot call a destroy method directly on it. Instead, use the `destroyDetachedRouteHandle` function provided by the Router.

```ts
import {destroyDetachedRouteHandle} from '@angular/router';

// ... inside your strategy
if (this.handles.size > MAX_CACHE_SIZE) {
  const handle = this.handles.get(oldestKey);
  if (handle) {
    destroyDetachedRouteHandle(handle);
    this.handles.delete(oldestKey);
  }
}
```

NOTE: Avoid using the route path as the key when `canMatch` guards are involved, as it may lead to duplicate entries.

### Automatic cleanup of unused route injectors

By default, Angular does not destroy the injectors of detached routes, even if they are no longer stored by the `RouteReuseStrategy`. This is primarily because this level of memory management is not commonly needed for most applications.

To enable automatic cleanup of unused route injectors, you can use the `withAutoCleanupInjectors` feature in your router configuration. This feature checks which routes are currently stored by the strategy after navigations and destroys the injectors of any detached routes that are not currently stored by the reuse strategy.

```ts
import {provideRouter, withAutoCleanupInjectors} from '@angular/router';
import {ApplicationConfig} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withAutoCleanupInjectors())],
};
```

If you do not provide a custom `RouteReuseStrategy` or your custom strategy extends `BaseRouteReuseStrategy`, injectors will now be destroyed when the route is inactive.

#### Cleanup with a custom `RouteReuseStrategy`

If your application uses a custom `RouteReuseStrategy` _and_ the strategy does not extend `BaseRouteReuseStrategy`, you must implement `shouldDestroyInjector` to tell the router which routes should have their injectors destroyed:

```ts
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  // ... other methods

  shouldDestroyInjector(route: Route): boolean {
    return !route.data['retainInjector'];
  }
}
```

If your strategy ever stores a `DetachedRouteHandle`, you will also need to tell the Router about these so it does not destroy any injectors needed by that detached handle:

```ts
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private readonly handles = new Map<Route, DetachedRouteHandle>();

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null) {
    if (handle) {
      this.handles.set(route.routeConfig!, handle);
    }
  }

  retrieveStoredRouteHandles(): DetachedRouteHandle[] {
    return Array.from(this.handles.values());
  }

  // ... other methods
}
```

### Configuring a route to use a custom route reuse strategy

Routes can opt into reuse behavior through route configuration metadata. This approach keeps the reuse logic separate from component code, making it easy to adjust behavior without modifying components:

```ts
export const routes: Routes = [
  {
    path: 'products',
    component: ProductList,
    data: {reuse: true}, // Component state persists across navigations
  },
  {
    path: 'products/:id',
    component: ProductDetail,
    // No reuse flag - component recreates on each navigation
  },
  {
    path: 'search',
    component: Search,
    data: {reuse: true}, // Preserves search results and filter state
  },
];
```

You can also configure a custom route reuse strategy at the application level through Angular's dependency injection system. In this case, Angular creates a single instance of the strategy that manages all route reuse decisions throughout the application:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy},
  ],
};
```

## Preloading strategy

Preloading strategies determine when Angular loads lazy-loaded route modules in the background. While lazy loading improves initial load time by deferring module downloads, users still experience a delay when first navigating to a lazy route. Preloading strategies eliminate this delay by loading modules before users request them.

### Built-in preloading strategies

Angular provides two preloading strategies out of the box:

| Strategy                                            | Description                                                                                                      |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `NoPreloading`           | The default strategy that disables all preloading. In other words, modules only load when users navigate to them |
| `PreloadAllModules` | Loads all lazy-loaded modules immediately after the initial navigation                                           |

The `PreloadAllModules` strategy can be configured as follows:

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withPreloading(PreloadAllModules))],
};
```

The `PreloadAllModules` strategy works well for small to medium applications where downloading all modules doesn't significantly impact performance. However, larger applications with many feature modules might benefit from more selective preloading.

### Creating a custom preloading strategy

Custom preloading strategies implement the `PreloadingStrategy` interface, which requires a single `preload` method. This method receives the route configuration and a function that triggers the actual module load. The strategy returns an Observable that emits when preloading completes or an empty Observable to skip preloading:

```ts
import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Only preload routes marked with data: { preload: true }
    if (route.data?.['preload']) {
      return load();
    }
    return of(null);
  }
}
```

This selective strategy checks route metadata to determine preloading behavior. Routes can opt into preloading through their configuration:

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes'),
    data: {preload: true}, // Preload immediately after initial navigation
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.routes'),
    data: {preload: false}, // Only load when user navigates to reports
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    // No preload flag - won't be preloaded
  },
];
```

### Performance considerations for preloading

Preloading impacts both network usage and memory consumption. Each preloaded module consumes bandwidth and increases the application's memory footprint. Mobile users on metered connections might prefer minimal preloading, while desktop users on fast networks can handle aggressive preloading strategies.

The timing of preloading also matters. Immediate preloading after initial load might compete with other critical resources like images or API calls. Strategies should consider the application's post-load behavior and coordinate with other background tasks to avoid performance degradation.

Browser resource limits also affect preloading behavior. Browsers limit concurrent HTTP connections, so aggressive preloading might queue behind other requests. Service workers can help by providing fine-grained control over caching and network requests, complementing the preloading strategy.
