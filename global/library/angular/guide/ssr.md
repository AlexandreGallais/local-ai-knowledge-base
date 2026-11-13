---
title: "Server and hybrid rendering (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/ssr.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Server and hybrid rendering

Angular ships all applications as client-side rendered (CSR) by default. While this approach delivers an initial payload that's lightweight, it introduces trade-offs including slower load times, degraded performance metrics, and higher resource demands since the user's device performs most of the computations. As a result, many applications achieve significant performance improvements by integrating server-side rendering (SSR) into a hybrid rendering strategy.

## What is hybrid rendering?

Hybrid rendering allows developers to leverage the benefits of server-side rendering (SSR), pre-rendering (also known as "static site generation" or SSG) and client-side rendering (CSR) to optimize your Angular application. It gives you fine-grained control over how the different parts of your app are rendered to give your users the best experience possible.

## Setting up hybrid rendering

You can create a **new** project with hybrid rendering by using the server-side rendering flag (i.e., `--ssr`) with the Angular CLI `ng new` command:

```shell
ng new --ssr
```

You can also enable hybrid rendering by adding server-side rendering to an existing project with the `ng add` command:

```shell
ng add @angular/ssr
```

NOTE: By default, Angular prerenders your entire application and generates a server file. To disable this and create a fully static app, set `outputMode` to `static`. To enable SSR, update the server routes to use `RenderMode.Server`. For more details, see `Server routing` and `Generate a fully static application`.

## Server routing

### Configuring server routes

You can create a server route config by declaring an array of `ServerRoute` objects. This configuration typically lives in a file named `app.routes.server.ts`.

```typescript
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'profile', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
```

You can add this config to your application with `provideServerRendering` using the `withRoutes` function:

```typescript
import {provideServerRendering, withRoutes} from '@angular/ssr';
import {ApplicationConfig} from '@angular/core';
import {serverRoutes} from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // ... other providers ...
  ],
};
```

When using the App shell pattern, you must specify the component to be used as the app shell for client-side rendered routes. To do this, use the `withAppShell` feature:

```typescript
import {provideServerRendering, withRoutes, withAppShell} from '@angular/ssr';
import {ApplicationConfig} from '@angular/core';
import {AppShell} from './app-shell';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes), withAppShell(AppShell)),
    // ... other providers ...
  ],
};
```

### Rendering modes

The server routing configuration lets you specify how each route in your application should render by setting a `RenderMode`:

| Rendering mode      | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Server (SSR)**    | Renders the application on the server for each request, sending a fully populated HTML page to the browser. |
| **Client (CSR)**    | Renders the application in the browser. This is the default Angular behavior.                               |
| **Prerender (SSG)** | Prerenders the application at build time, generating static HTML files for each route.                      |

#### Choosing a rendering mode

Each rendering mode has different benefits and drawbacks. You can choose rendering modes based on the specific needs of your application.

##### Client-side rendering (CSR)

Client-side rendering has the simplest development model, as you can write code that assumes it always runs in a web browser. This lets you use a wide range of client-side libraries that also assume they run in a browser.

Client-side rendering generally has worse performance than other rendering modes, as it must download, parse, and execute your page's JavaScript before the user can see any rendered content. If your page fetches more data from the server as it renders, users also have to wait for those additional requests before they can view the complete content.

If your page is indexed by search crawlers, client-side rendering may negatively affect search engine optimization (SEO), as search crawlers have limits to how much JavaScript they execute when indexing a page.

When client-side rendering, the server does not need to do any work to render a page beyond serving static JavaScript assets. You may consider this factor if server cost is a concern.

Applications that support installable, offline experiences with service workers can rely on client-side rendering without needing to communicate with a server.

##### Server-side rendering (SSR)

Server-side rendering offers faster page loads than client-side rendering. Instead of waiting for JavaScript to download and run, the server directly renders an HTML document upon receiving a request from the browser. The user experiences only the latency necessary for the server to fetch data and render the requested page. This mode also eliminates the need for additional network requests from the browser, as your code can fetch data during rendering on the server.

Server-side rendering generally has excellent search engine optimization (SEO), as search crawlers receive a fully rendered HTML document.

Server-side rendering requires you to author code that does not strictly depend on browser APIs and limits your selection of JavaScript libraries that assume they run in a browser.

When server-side rendering, your server runs Angular to produce an HTML response for every request which may increase server hosting costs.

##### Build-time prerendering

Prerendering offers faster page loads than both client-side rendering and server-side rendering. Because prerendering creates HTML documents at _build-time_, the server can directly respond to requests with the static HTML document without any additional work.

Prerendering requires that all information necessary to render a page is available at _build-time_. This means that prerendered pages cannot include any data to the specific user loading the page. Prerendering is primarily useful for pages that are the same for all users of your application.

Because prerendering occurs at build-time, it may add significant time to your production builds. Using `getPrerenderParams` to produce a large number of HTML documents may affect the total file size of your deployments, and thus lead to slower deployments.

Prerendering generally has excellent search engine optimization (SEO), as search crawlers receive a fully rendered HTML document.

Prerendering requires you to author code that does not strictly depend on browser APIs and limits your selection of JavaScript libraries that assume they run in a browser.

Prerendering incurs extremely little overhead per server request, as your server responds with static HTML documents. Static files are also easily cached by Content Delivery Networks (CDNs), browsers, and intermediate caching layers for even faster subsequent page loads. Fully static sites can also be deployed solely through a CDN or static file server, eliminating the need to maintain a custom server runtime for your application. This enhances scalability by offloading work from an application web server, making it particularly beneficial for high-traffic applications.

NOTE: When using Angular service worker, the first request is server-rendered, but all subsequent requests are handled by the service worker and rendered client-side.

### Setting headers and status codes

You can set custom headers and status codes for individual server routes using the `headers` and `status` properties in the `ServerRoute` configuration.

```typescript
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile',
    renderMode: RenderMode.Server,
    headers: {
      'X-My-Custom-Header': 'some-value',
    },
    status: 201,
  },
  // ... other routes
];
```

### Redirects

Angular handles redirects specified by the `redirectTo` property in route configurations, differently on the server-side.

**Server-Side Rendering (SSR)**
Redirects are performed using standard HTTP redirects (e.g., 301, 302) within the server-side rendering process.

**Prerendering (SSG)**
Redirects are implemented as "soft redirects" using `<meta http-equiv="refresh">` tags in the prerendered HTML.

### Customizing build-time prerendering (SSG)

When using `RenderMode.Prerender`, you can specify several configuration options to customize the prerendering and serving process.

#### Parameterized routes

For each route with `RenderMode.Prerender`, you can specify a `getPrerenderParams` function. This function lets you control which specific parameters produce separate prerendered documents.

The `getPrerenderParams` function returns a `Promise` that resolves to an array of objects. Each object is a key-value map of route parameter name to value. For example, if you define a route like `post/:id`, `getPrerenderParams ` could return the array `[{id: '123'}, {id: '456'}]`, and thus render separate documents for `post/123` and `post/456`.

The body of `getPrerenderParams` can use Angular's `inject` function to inject dependencies and perform any work to determine which routes to prerender. This typically includes making requests to fetch data to construct the array of parameter values.

You can also use this function with catch-all routes (e.g., `/**`), where the parameter name will be `"**"` and the return value will be the segments of the path, such as `foo/bar`. These can be combined with other parameters (e.g., `/post/:id/**`) to handle more complex route configuration.

```ts
import {RenderMode, ServerRoute} from '@angular/ssr';
import {inject} from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(PostService);
      const ids = await dataService.getIds(); // Assuming this returns ['1', '2', '3']

      return ids.map((id) => ({id})); // Generates paths like: /post/1, /post/2, /post/3
    },
  },
  {
    path: 'post/:id/**',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        {id: '1', '**': 'foo/3'},
        {id: '2', '**': 'bar/4'},
      ]; // Generates paths like: /post/1/foo/3, /post/2/bar/4
    },
  },
];
```

Because `getPrerenderParams` exclusively applies to `RenderMode.Prerender`, this function always runs at _build-time_. `getPrerenderParams` must not rely on any browser-specific or server-specific APIs for data.

IMPORTANT: When using `inject` inside `getPrerenderParams`, please remember that `inject` must be used synchronously. It cannot be invoked within asynchronous callbacks or following any `await` statements. For more information, refer to `runInInjectionContext`.

#### Fallback strategies

When using `RenderMode.Prerender` mode, you can specify a fallback strategy to handle requests for paths that haven't been prerendered.

The available fallback strategies are:

- **Server:** Falls back to server-side rendering. This is the **default** behavior if no `fallback` property is specified.
- **Client:** Falls back to client-side rendering.
- **None:** No fallback. Angular will not handle requests for paths that are not prerendered.

```ts
import {RenderMode, PrerenderFallback, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client, // Fallback to CSR if not prerendered
    async getPrerenderParams() {
      // This function returns an array of objects representing prerendered posts at the paths:
      // `/post/1`, `/post/2`, and `/post/3`.
      // The path `/post/4` will utilize the fallback behavior if it's requested.
      return [{id: '1'}, {id: '2'}, {id: '3'}];
    },
  },
];
```

## Authoring server-compatible components

Some common browser APIs and capabilities might not be available on the server. Applications cannot make use of browser-specific global objects like `window`, `document`, `navigator`, or `location` as well as certain properties of `HTMLElement`.

In general, code which relies on browser-specific symbols should only be executed in the browser, not on the server. This can be enforced through the `afterEveryRender` and `afterNextRender` lifecycle hooks. These are only executed on the browser and skipped on the server.

```angular-ts
import {Component, ElementRef, viewChild, afterNextRender} from '@angular/core';

@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  contentRef = viewChild.required<ElementRef>('content');

  constructor() {
    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      console.log('content height: ' + this.contentRef().nativeElement.scrollHeight);
    });
  }
}
```

NOTE: Prefer platform-specific providers over runtime checks with `isPlatformBrowser` or `isPlatformServer`.

IMPORTANT: Avoid using `isPlatformBrowser` in templates with `@if` or other conditionals to render different content on server and client. This causes hydration mismatches and layout shifts, negatively impacting user experience and Core Web Vitals. Instead, use `afterNextRender` for browser-specific initialization and keep rendered content consistent across platforms.

## Setting providers on the server

On the server side, top level provider values are set once when the application code is initially parsed and evaluated.
This means that providers configured with `useValue` will keep their value across multiple requests, until the server application is restarted.

If you want to generate a new value for each request, use a factory provider with `useFactory`. The factory function will run for every incoming request, ensuring that a new value is created and assigned to the token each time.
