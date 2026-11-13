---
title: "Profiling with the Chrome DevTools"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/best-practices/runtime-performance/profiling-with-chrome-devtools.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Profiling with the Chrome DevTools

Angular integrates with the Chrome DevTools extensibility API to present framework-specific data and insights directly in the Chrome DevTools performance panel.

With the integration enabled, you can record a performance profile containing two sets of data:

- Standard performance entries based on Chrome's understanding of your code executing in a browser, and
- Angular-specific entries contributed by the framework's runtime.

Both sets of data are presented together on the same tab, but on separate tracks:

Angular-specific data are expressed in terms of framework concepts (components, change detection, lifecycle hooks, etc.) alongside lower-level function and method calls captured by a browser. These two data sets are correlated, and you can switch between the different views and level of details.

You can use the Angular track to better understand how your code runs in the browser, including:

- Determining whether a given code block is part of the Angular application, or whether it belongs to another script running on the same page.
- Identifying performance bottlenecks and attribute those to specific components or services.
- Gaining deeper insight into Angular's inner working with a visual breakdown of each change detection cycle.

## Recording a profile

### Enable integration

You can enable Angular profiling in one of two ways:

1. Run `ng.enableProfiling()` in Chrome's console panel, or
1. Include a call to `enableProfiling()` in your application startup code (imported from `@angular/core`).

NOTE: Angular profiling works exclusively in development mode.

Here is an example of how you can enable the integration in the application bootstrap to capture all possible events:

```ts
import {enableProfiling} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {MyApp} from './my-app';

// Turn on profiling *before* bootstrapping your application
// in order to capture all of the code run on start-up.
enableProfiling();
bootstrapApplication(MyApp);
```

### Record a profile

Use the **Record** button in the Chrome DevTools performance panel:

See the Chrome DevTools documentation for more details on recording profiles.

## Open a component in Angular DevTools

After recording a profile, select a component event in the **Angular** track.
The **Summary** tab can include a **Component** link that uses the `angular-devtools://component/...` URL scheme.

Click the link to open Angular DevTools and select the matching component in the **Components** tab.
This helps you move from a browser-level profile to the component state and metadata for a selected event.

NOTE: Opening component links requires Angular DevTools for Chrome and Chrome's experimental `chrome://flags/#enable-devtools-deep-link-via-extensibility-api` flag.

## Interpreting a recorded profile

You can use the "Angular" custom track to quickly identify and diagnose performance issues. The following sections describe some common profiling scenarios.

### Differentiating between your Angular application and other tasks on the same page

As Angular and Chrome data are presented on the separate but correlated tracks, you can see when Angular's application code is executed as opposed to some other browser processing (typically layout and paint) or other scripts running on the same page (in this case the custom Angular track does not have any data):

This allows you to determine whether further investigations should focus on the Angular application code or on other parts of your codebase or dependencies.

### Color-coding

Angular uses colors in the flame chart graph to distinguish tasks types:

- 🟦 Blue represents TypeScript code written by the application developer (for example: services, component constructors and lifecycle hooks, etc.).
- 🟪 Purple represents templates code written by the application developer and transformed by the Angular compiler.
- 🟩 Green represents entry points to the application code and identifies _reasons_ for executing code.

The following examples illustrate the described color-coding in various, real-life recordings.

#### Example: Application bootstrapping

The application bootstrap process usually consists of:

- Triggers marked in blue, such as the call to the `bootstrapApplication`, instantiation of the root component, and initial change detection
- Various DI services instantiated during bootstrap, marked in green.

#### Example: Component execution

One component processing is typically represented as an entry point (blue) followed by its template execution (purple). A template might, in turn, trigger instantiation of directives and execution of lifecycle hooks (green):

#### Example: Change detection

A change detection cycle usually consists of one or more data synchronization passes (blue), where each pass traverses a subset of components.

With this data visualization, it is possible to immediately identify components that were involved in the change detection and which were skipped (typically the `OnPush` components that were not marked dirty).

Additionally, you can inspect the number of synchronization passes for one change detection. Having more than one synchronization pass suggest that state is updated during change detection. You should avoid this, as it slows down page updates and can even result in infinite loops in the worst cases.
