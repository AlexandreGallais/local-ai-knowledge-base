---
title: "Performance"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/best-practices/performance/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Performance

Angular includes many optimizations out of the box, but as applications grow, you may need to fine-tune both how quickly your app loads and how responsive it feels during use. These guides cover the tools and techniques Angular provides to help you build fast applications.

## Loading performance

Loading performance determines how quickly your application becomes visible and interactive. Slow loading directly impacts Core Web Vitals like Largest Contentful Paint (LCP) and Time to First Byte (TTFB).

| Technique                                                                                               | What it does                                                                                                                                                                                                                    | When to use it                                                                                |
| :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------- |
| Lazy-loaded routes | Defers loading route components until navigation, reducing the initial bundle size                                                                                                                                              | Applications with multiple routes where not all are needed on initial load                    |
| Deferred loading with `@defer`                                      | Splits components into separate bundles that load on demand                                                                                                                                                                     | Components not visible on initial render, heavy third-party libraries, below-the-fold content |
| Lazy loading services with `injectAsync`                              | Splits rarely used services into separate chunks and loads them on demand                                                                                                                                                       | Services backed by large libraries or infrequently used features                              |
| Image optimization                                     | Prioritizes LCP images, lazy loads others, generates responsive `srcset` attributes                                                                                                                                             | Any application that displays images                                                          |
| Server-side rendering                                                 | Renders pages on the server for faster first paint and better SEO, with hydration to restore interactivity and incremental hydration to defer hydrating sections until needed | Content-heavy applications, pages that need search engine indexing                            |

## Runtime performance

Runtime performance determines how responsive your application feels after it loads. Angular's change detection system keeps the DOM in sync with your data, and optimizing how and when it runs is the primary lever for improving runtime performance.

| Technique                                                       | What it does                                                                                        | When to use it                                                                        |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| Zoneless change detection                     | Removes ZoneJS overhead and triggers change detection only when signals or events indicate a change | New applications (default in Angular v21+), or existing applications ready to migrate |
| Slow computations           | Identifies and optimizes expensive template expressions and lifecycle hooks                         | Profiling reveals specific components causing slow change detection cycles            |
| Skipping component subtrees | Uses `OnPush` change detection to skip unchanged component trees                                    | Applications that need finer control over change detection                            |
| Zone pollution                 | Prevents unnecessary change detection caused by third-party libraries or timers                     | Zone-based applications where profiling reveals excessive change detection cycles     |

## Measuring performance

Identifying what to optimize is just as important as knowing how to optimize it. Angular integrates with browser developer tools to help you find bottlenecks.

| Tool                                                                       | What it does                                                                                                                                                                     |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chrome DevTools profiling | Records Angular-specific performance data alongside browser profiling, with color-coded flame charts that show component rendering, change detection cycles, and lifecycle hooks |
| Angular DevTools                                         | A browser extension that provides a component tree inspector and a profiler for visualizing change detection cycles                                                              |

## What to optimize first

If you are unsure where to start, profile your application first using the Chrome DevTools Angular track to identify specific bottlenecks.

As a general starting point:

- **Slow initial load** — Use `@defer` to split large components out of the main bundle, `NgOptimizedImage` to prioritize above-the-fold images, and server-side rendering to deliver content faster.
- **Slow interactions after load** — Check whether zoneless change detection is enabled, look for slow computations in templates or lifecycle hooks, and consider `OnPush` to reduce unnecessary change detection.
