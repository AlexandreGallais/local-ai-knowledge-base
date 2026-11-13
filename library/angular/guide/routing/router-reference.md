---
title: "Router reference"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/routing/router-reference.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Router reference

The following sections highlight some core router concepts and terminology.

## Router events

During each navigation, the `Router` emits navigation events through the `Router.events` property.
These events are shown in the following table.

| Router event                                              | Details                                                                                                                                                                |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NavigationStart`           | Triggered when navigation starts.                                                                                                                                      |
| `RouteConfigLoadStart` | Triggered before the `Router` lazy loads a route configuration.                                                                                                        |
| `RouteConfigLoadEnd`     | Triggered after a route has been lazy loaded.                                                                                                                          |
| `RoutesRecognized`         | Triggered when the Router parses the URL and the routes are recognized.                                                                                                |
| `GuardsCheckStart`         | Triggered when the Router begins the Guards phase of routing.                                                                                                          |
| `ChildActivationStart` | Triggered when the Router begins activating a route's children.                                                                                                        |
| `ActivationStart`           | Triggered when the Router begins activating a route.                                                                                                                   |
| `GuardsCheckEnd`             | Triggered when the Router finishes the Guards phase of routing successfully.                                                                                           |
| `ResolveStart`                 | Triggered when the Router begins the Resolve phase of routing.                                                                                                         |
| `ResolveEnd`                     | Triggered when the Router finishes the Resolve phase of routing successfully.                                                                                          |
| `ChildActivationEnd`     | Triggered when the Router finishes activating a route's children.                                                                                                      |
| `ActivationEnd`               | Triggered when the Router finishes activating a route.                                                                                                                 |
| `NavigationEnd`               | Triggered when navigation ends successfully.                                                                                                                           |
| `NavigationCancel`         | Triggered when navigation is canceled. This can happen when a Route Guard returns false during navigation, or redirects by returning a `UrlTree` or `RedirectCommand`. |
| `NavigationError`           | Triggered when navigation fails due to an unexpected error.                                                                                                            |
| `Scroll`                             | Represents a scrolling event.                                                                                                                                          |

When you enable the `withDebugTracing` feature, Angular logs these events to the console.

## Router terminology

Here are the key `Router` terms and their meanings:

| Router part           | Details                                                                                                                                                                                                                                   |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Router`              | Displays the application component for the active URL. Manages navigation from one component to the next.                                                                                                                                 |
| `provideRouter`       | provides the necessary service providers for navigating through application views.                                                                                                                                                        |
| `RouterModule`        | A separate NgModule that provides the necessary service providers and directives for navigating through application views.                                                                                                                |
| `Routes`              | Defines an array of Routes, each mapping a URL path to a component.                                                                                                                                                                       |
| `Route`               | Defines how the router should navigate to a component based on a URL pattern. Routes can include paths, components, child routes, guards, resolvers, and resources.                                                                       |
| `RouterOutlet`        | The directive \(`<router-outlet>`\) that marks where the router displays a view.                                                                                                                                                          |
| `RouterLink`          | The directive for binding a clickable HTML element to a route. Clicking an element with a `routerLink` directive that's bound to a _string_ or a _link parameters array_ triggers a navigation.                                           |
| `RouterLinkActive`    | The directive for adding/removing classes from an HTML element when an associated `routerLink` contained on or inside the element becomes active/inactive. It can also set the `aria-current` of an active link for better accessibility. |
| `ActivatedRoute`      | A service that's provided to each route component that contains route specific information such as route parameters, static data, resolve data, route resources, global query parameters, and the global fragment.                        |
| `RouterState`         | The current state of the router including a tree of the currently activated routes together with convenience methods for traversing the route tree.                                                                                       |
| Link parameters array | An array that the router interprets as a routing instruction. You can bind that array to a `RouterLink` or pass the array as an argument to the `Router.navigate` method.                                                                 |
| Routing component     | An Angular component with a `RouterOutlet` that displays views based on router navigations.                                                                                                                                               |

## `<base href>`

The router uses the browser's history.pushState for navigation.
`pushState` lets you customize in-application URL paths; for example, `localhost:4200/crisis-center`.
The in-application URLs can be indistinguishable from server URLs.

Modern HTML5 browsers were the first to support `pushState` which is why many people refer to these URLs as "HTML5 style" URLs.

HELPFUL: HTML5 style navigation is the router default.
In the LocationStrategy and browser URL styles section, learn why HTML5 style is preferable, how to adjust its behavior, and how to switch to the older hash \(`#`\) style, if necessary.

You must add a `<base href>` element to the application's `index.html` for `pushState` routing to work.
The browser uses the `<base href>` value to prefix relative URLs when referencing CSS files, scripts, and images.

Add the `<base>` element just after the `<head>` tag.
If the `app` folder is the application root, as it is for this application, set the `href` value in `index.html` as shown here.

```html
<base href="/" />
```

### HTML5 URLs and the `<base href>`

The guidelines that follow will refer to different parts of a URL.
This diagram outlines what those parts refer to:

```text
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme    authority      path        query   fragment
```

While the router uses the HTML5 pushState style by default, you must configure that strategy with a `<base href>`.

The preferred way to configure the strategy is to add a `<base href>` element tag in the `<head>` of the `index.html`.

```angular-html
<base href="/" />
```

Without that tag, the browser might not be able to load resources \(images, CSS, scripts\) when "deep linking" into the application.

Some developers might not be able to add the `<base>` element, perhaps because they don't have access to `<head>` or the `index.html`.

Those developers can still use HTML5 URLs by taking the following two steps:

1. Provide the router with an appropriate `APP_BASE_HREF` value.
1. Use root URLs \(URLs with an `authority`\) for all web resources: CSS, images, scripts, and template HTML files.
   - The `<base href>` `path` should end with a "/", as browsers ignore characters in the `path` that follow the right-most "`/`"
   - If the `<base href>` includes a `query` part, the `query` is only used if the `path` of a link in the page is empty and has no `query`.
     This means that a `query` in the `<base href>` is only included when using `HashLocationStrategy`.

   - If a link in the page is a root URL \(has an `authority`\), the `<base href>` is not used.
     In this way, an `APP_BASE_HREF` with an authority will cause all links created by Angular to ignore the `<base href>` value.

   - A fragment in the `<base href>` is _never_ persisted

For more complete information on how `<base href>` is used to construct target URIs, see the RFC section on transforming references.

### `HashLocationStrategy`

Use `HashLocationStrategy` by providing the `useHash: true` in an object as the second argument of the `RouterModule.forRoot()` in the `AppModule`.

```ts
providers: [provideRouter(appRoutes, withHashLocation())];
```

When using `RouterModule.forRoot`, this is configured with the `useHash: true` in the second argument: `RouterModule.forRoot(routes, {useHash: true})`.
