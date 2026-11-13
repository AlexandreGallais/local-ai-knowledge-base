---
title: "Customizing route behavior (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/routing/customizing-route-behavior.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Customizing route behavior

Angular Router provides powerful extension points that allow you to customize how routes behave in your application. While the default routing behavior works well for most applications, specific requirements often demand custom implementations for performance optimization, specialized URL handling, or complex routing logic.

Route customization can become valuable when your application needs:

- **Component state preservation** across navigations to avoid re-fetching data
- **Strategic lazy module loading** based on user behavior or network conditions
- **External URL integration** or handling Angular routes alongside legacy systems
- **Dynamic route matching** based on runtime conditions beyond simple path
  patterns

NOTE: Before implementing custom strategies, ensure the default router behavior doesn't meet your needs. Angular's default routing is optimized for common use cases and provides the best balance of performance and simplicity. Customizing route strategies can create additional code complexity and have performance implications on memory usage if not carefully managed.

## Router configuration options

The `withRouterConfig` or `RouterModule.forRoot` allows providing additional `RouterConfigOptions` to adjust the Router’s behavior.

### Handle canceled navigations

`canceledNavigationResolution` controls how the Router restores browser history when a navigation is canceled. The default value is `'replace'`, which reverts to the pre-navigation URL with `location.replaceState`. In practice, this means that any time the address bar has already been updated for the navigation, such as with the browser back or forward buttons, the history entry is overwritten with the "rollback" if the navigation fails or is rejected by a guard.
Switching to `'computed'` keeps the in-flight history index in sync with the Angular navigation, so canceling a back button navigation triggers a forward navigation (and vice versa) to return to the original page.

This setting is most helpful when your app uses `urlUpdateStrategy: 'eager'` or when guards frequently cancel popstate navigations initiated by the browser.

```ts
provideRouter(routes, withRouterConfig({canceledNavigationResolution: 'computed'}));
```

### React to same-URL navigations

`onSameUrlNavigation` configures what should happen when the user asks to navigate to the current URL. The default `'ignore'` skips work, while `'reload'` instructs the Router to process the URL in its navigation pipeline rather than skipping it. Guard and resolver reruns are governed by `runGuardsAndResolvers`, and component reuse is determined by the route reuse strategy.

This is useful when you want repeated clicks on a list filter, left-nav item, or refresh button to trigger new data retrieval even though the URL does not change.

```ts
provideRouter(routes, withRouterConfig({onSameUrlNavigation: 'reload'}));
```

You can also control this behavior on individual navigations rather than globally. This allows you to keep the default of `'ignore'` while selectively enabling reload behavior for specific use cases:

```ts
router.navigate(['/some-path'], {onSameUrlNavigation: 'reload'});
```

TIP: If you use route resources, you can refresh data on-demand by calling `.reload()` on the resource or by updating signals read in `params`, without needing to configure `onSameUrlNavigation` or trigger a router navigation.

### Control parameter inheritance

`paramsInheritanceStrategy` defines how route parameters and data flow from parent routes.

By default (`'always'`), child routes automatically inherit parameters, route data, and resolved values from parent routes. This ensures matrix parameters, route data, and resolved values are available further down the route tree—handy when you share contextual identifiers across feature areas such as:

```text
/org/:orgId/projects/:projectId/customers/:customerId
```

```ts
export const routes: Routes = [
  {
    path: 'org/:orgId',
    component: Organization,
    children: [
      {
        path: 'projects/:projectId',
        component: Project,
        children: [
          {
            path: 'customers/:customerId',
            component: Customer,
          },
        ],
      },
    ],
  },
];
```

```ts
@Component({/* ... */})
export class Customer {
  private route = inject(ActivatedRoute);

  // All parent parameters are available directly
  orgId = this.route.snapshot.params['orgId'];
  projectId = this.route.snapshot.params['projectId'];
  customerId = this.route.snapshot.params['customerId'];
}
```

To restore the legacy behavior, set `paramsInheritanceStrategy` to `'emptyOnly'`. With `'emptyOnly'`, child routes inherit params only when their path is empty or the parent does not declare a component:

```ts
provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'emptyOnly'}));
```

In that case, the `Customer` component has to read the parent parameters from its ancestor routes:

```ts
@Component({/* ... */})
export class Customer {
  private route = inject(ActivatedRoute);

  orgId = this.route.parent?.parent?.snapshot.params['orgId'];
  projectId = this.route.parent?.snapshot.params['projectId'];
  customerId = this.route.snapshot.params['customerId'];
}
```

### Decide when the URL updates

`urlUpdateStrategy` determines when Angular writes to the browser address bar. The default `'deferred'` waits for a successful navigation before changing the URL. Use `'eager'` to update immediately when navigation starts. Eager updates make it easier to surface the attempted URL if navigation fails due to guards or errors, but can briefly show an in-progress URL if you have long-running guards.

Consider this when your analytics pipeline needs to see the attempted route even if guards block it.

```ts
provideRouter(routes, withRouterConfig({urlUpdateStrategy: 'eager'}));
```

### Choose default query parameter handling

`defaultQueryParamsHandling` sets the fallback behavior for `Router.createUrlTree` when the call does not specify `queryParamsHandling`. `'replace'` is the default and swaps out the existing query string. `'merge'` combines the provided values with the current ones, and `'preserve'` keeps the existing query parameters and ignores any `queryParams` you pass to the call.

```ts
provideRouter(routes, withRouterConfig({defaultQueryParamsHandling: 'merge'}));
```

This is especially helpful for search and filter pages to automatically retain existing filters when additional parameters are provided.

### Configure trailing slash handling

By default, the `Location` service strips trailing slashes from URLs on read.

You can configure the `Location` service to force a trailing slash on all URLs written to the browser by providing the `TrailingSlashPathLocationStrategy` in your application.

```ts
import {LocationStrategy, TrailingSlashPathLocationStrategy} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [{provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy}],
});
```

You can also force the `Location` service to never have a trailing slash on all URLs written to the browser by providing the `NoTrailingSlashPathLocationStrategy` in your application.

```ts
import {LocationStrategy, NoTrailingSlashPathLocationStrategy} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [{provide: LocationStrategy, useClass: NoTrailingSlashPathLocationStrategy}],
});
```

These strategies only affect the URL written to the browser.
`Location.path()` and `Location.normalize()` will continue to strip trailing slashes when reading the URL.

Angular Router exposes four main areas for customization:

    - Route reuse strategy
    - Preloading strategy
    - URL handling strategy
    - Custom route matchers
