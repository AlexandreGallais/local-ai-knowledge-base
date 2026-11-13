---
title: "Angular Roadmap (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/roadmap.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular Roadmap (part 2 of 3)

## Completed projects

  **Signal Forms**
  Signal Forms are now stable. This new approach allows developers to manage form state using signals, providing an ergonomic forms creation experience. We promoted Signal Forms to stable and enhanced interoperability with reactive forms - enabling teams to progressively migrate large forms at their own pace.

  **Reactivity**
  We introduced new signal APIs, `resource()` and `httpResource()`, for flexible asynchronous data handling. We promoted these APIs to developer stable.

  **Change Detection**
  With Zoneless being stable and default, we set the default change detection strategy to `OnPush`, to follow current best practices. We also renamed `ChangeDetectionStrategy.Default` to `ChangeDetectionStrategy.Eager`.

See the RFC discussion for details.

  **Signal debugging in Angular DevTools**
  We've added better tooling for debugging Signals using Angular DevTools. This change includes a new UI for inspecting and debugging signals.

  **Improve HMR (Hot Module Reload)**
  We're working towards faster edit/refresh cycle by enabling hot module replacement. In Angular v19 we shipped initial support for CSS and template HMR and in v20 we graduated template HMR to stable. We'll continue collecting feedback to make sure we're addressing developers' needs before we mark this project as complete.

**Zoneless Angular**
In v18 we shipped experimental zoneless support in Angular. It enables developers to use the framework without including zone.js in their bundle, which improves performance, debugging experience, and interoperability. As part of the initial release we also introduced zoneless support to the Angular CDK and Angular Material.

In v19 we introduced zoneless support in server-side rendering, addressed some edge cases, and created a schematic to scaffold zoneless projects. We transitioned Google Fonts to zoneless which improved performance, developer experience, and allowed us to identify gaps that we need to address before moving this feature to developer preview.

As of Angular v20.2, Zoneless Angular is now stable and includes improvements in error handling and server-side rendering.

**Server route configuration**
We're working towards enabling a more ergonomic route configuration on the server. We want to make it trivial to declare which routes should be server-side rendered, prerendered or client-side rendered.

In Angular v19 we shipped developer preview of route-level render mode which allows you to granularly configure which routes you want Angular to prerender, server-side render or client-side render. In Angular v20 we graduated it to stable.

**Enable incremental hydration**
In v17 we graduated hydration from developer preview and we've been consistently observing 40-50% improvements in LCP. Since then we started prototyping incremental hydration and shared a demo on stage at ng-conf.

In v19 we shipped the incremental hydration in developer preview mode, powered by `@defer` blocks. In Angular v20 we graduated it to stable!

**Deliver Angular Signals**
This project rethinks the Angular reactivity model by introducing Signals as a reactivity primitive. The initial planning resulted in hundreds of discussions, conversations with developers, feedback sessions, user experience studies, and a series of RFCs, which received over 1,000 comments.

In Angular v20 we graduated all the fundamental reactivity primitives to stable including signal, effect, linkedSignal, signal-based queries, and inputs.

**Support two-dimensional drag-and-drop**
As part of this project, we implemented mixed orientation support for the Angular CDK drag and drop. This is one of the repository's most highly requested features.

**Event replay with SSR and prerendering**
In v18 we introduced an event replay functionality when using server-side rendering or prerendering. For this feature we depend on the event dispatch primitive (previously known as jsaction) that is running on Google.com.

In Angular v19 we graduated event replay to stable and enabled it by default for all new projects.

**Integrate Angular Language Service with Schematics**
To make it easier for developers to use modern Angular APIs, we enabled integration between the Angular language service and schematics which allows you to refactor your app with a single click.

**Streamline standalone imports with Language Service**
As part of this initiative, the language service automatically imports components and pipes in standalone and NgModule-based apps. Additionally, we've added a template diagnostic to highlight unused imports in standalone components, which should help make application bundles smaller.

**Local template variables**
We've released the support for local template variables in Angular, see `@let` for additional information.

**Expand the customizability of Angular Material**
To provide better customization of our Angular Material components and enable Material 3 capabilities, we'll be collaborating with Google's Material Design team on defining token-based theming APIs.

In v17.2 we shared experimental support for Angular Material 3 and in v18 we graduated it to stable.

**Introduce deferred loading**
In v17 we shipped deferrable views in developer preview, which provide an ergonomic API for deferred code loading. In v18 we enabled deferrable views for library developers and graduated the API to stable.

**iframe support in Angular DevTools**
We enabled debugging and profiling of Angular apps embedded within an iframe on the page.

**Automation for transition of existing hybrid rendering projects to esbuild and vite**
In v17 we shipped a vite and esbuild-based application builder and enabled it for new projects by default. It improves build time for projects using hybrid rendering with up to 87%. As part of v18 we shipped schematics and a guide that migrate existing projects using hybrid rendering to the new build pipeline.

**Make Angular.dev the official home for Angular developers**
Angular.dev is the new site, domain and home for Angular development. The new site contains updated documentation, tutorials and guidance that will help developers build with Angular’s latest features.

**Introduce built-in control flow**
In v17 we shipped a developer preview version of a new control flow. It brings significant performance improvements and better ergonomics for template authoring. We also provided a migration of existing `*ngIf`, `*ngFor`, and `*ngSwitch` which you can run to move your project to the new implementation. As of v18 the built-in control flow is now stable.

**Modernize getting started tutorial**
Over the past two quarters, we developed a new video and textual tutorial based on standalone components.

**Investigate modern bundlers**
In Angular v16, we released a developer preview of an esbuild-based builder with support for `ng build` and `ng serve`. The `ng serve` development server uses Vite and a multi-file compilation by esbuild and the Angular compiler. In v17 we graduated the build tooling from developer preview and enabled it by default for new projects.

**Introduce dependency injection debugging APIs**
To improve the debugging utilities of Angular and Angular DevTools, we'll work on APIs that provide access to the dependency injection runtime. As part of the project, we'll expose debugging methods that allow us to explore the injector hierarchy and the dependencies across their associated providers. As of v17, we shipped a feature that enables us to plug into the dependency injection life-cycle. We also launched a visualization of the injector tree and inspection of the providers declared inside each individual node,

**Improve documentation and schematics for standalone components**
We released a developer preview of the `ng new --standalone` schematics collection, allowing you to create apps free of NgModules. In v17 we switched the new application authoring format to standalone APIs and changed the documentation to reflect the recommendation. Additionally, we shipped schematics which support updating existing applications to standalone components, directives, and pipes. Even though NgModules will stick around for foreseeable future, we recommend you to explore the benefits of the new APIs to improve developer experience and benefit from the new features we build for them.

**Explore hydration and server-side rendering improvements**
In v16, we released a developer preview of non-destructive full hydration, see the hydration guide and the blog post for additional information. We're already seeing significant improvements to Core Web Vitals, including LCP and CLS. In lab tests, we consistently observed 45% better LCP of a real-world app.

In v17 we launched hydration outside developer preview and did a series of improvements in the server-side rendering story, including: route discovery at runtime for SSG, up to 87% faster build times for hybrid rendered applications, prompt that enables hybrid rendering for new projects.

**Non-destructive full app hydration**
In v16, we released a developer preview of non-destructive full hydration, which allows Angular to reuse existing DOM nodes on a server-side rendered page, instead of re-creating an app from scratch. See additional information in the hydration guide.

**Improvements in the image directive**
We released the Angular image directive as stable in v15. We introduced a new fill mode feature that enables images to fit within their parent container rather than having explicit dimensions. Over the past two months, the Chrome Aurora team backported the directive to v12 and newer.

**Documentation refactoring**
Ensure all existing documentation fits into a consistent set of content types. Update excessive use of tutorial-style documentation into independent topics. We want to ensure the content outside the main tutorials is self-sufficient without being tightly coupled to a series of guides. In Q2 2022, we refactored the template content and dependency injection. In Q1 2023, we improved the HTTP guides, and with this, we're putting the documentation refactoring project on hold.

**Improve image performance**
The Aurora and the Angular teams are working on the implementation of an image directive that aims to improve Core Web Vitals. We shipped a stable version of the image directive in v15.

**Modern CSS**
The Web ecosystem evolves constantly and we want to reflect the latest modern standards in Angular. In this project we aim to provide guidelines on using modern CSS features in Angular to ensure developers follow best practices for layout, styling, etc. We shared official guidelines for layout and as part of the initiative stopped publishing flex layout.

**Support adding directives to host elements**
A long-standing feature request is to add the ability to add directives to host elements. The feature lets developers augment their own components with additional behaviors without using inheritance. In v15 we shipped our directive composition API, which enables enhancing host elements with directives.

**Better stack traces**
The Angular and the Chrome DevTools are working together to enable more readable stack traces for error messages. In v15 we released improved relevant and linked stack traces. As a lower priority initiative, we'll be exploring how to make the stack traces friendlier by providing more accurate call frame names for templates.

**Enhanced Angular Material components by integrating MDC Web**
MDC Web is a library created by the Google Material Design team that provides reusable primitives for building Material Design components. The Angular team is incorporating these primitives into Angular Material. Using MDC Web aligns Angular Material more closely with the Material Design specification, expands accessibility, improves component quality, and improves the velocity of our team.

**Implement APIs for optional NgModules**
In the process of making Angular simpler, we are working on introducing APIs that allow developers to initialize apps, instantiate components, and use the router without NgModules. Angular v14 introduces developer preview of the APIs for standalone components, directives, and pipes. In the next few quarters we'll collect feedback from developers and finalize the project making the APIs stable. As the next step we will work on improving use cases such as TestBed, Angular elements, etc.

**Allow binding to protected fields in templates**
To improve the encapsulation of Angular components we enabled binding to protected members of the component instance. This way you'll no longer have to expose a field or a method as public to use it inside your templates.

**Publish guides on advanced concepts**
Develop and publish an in-depth guide on change detection. Develop content for performance profiling of Angular apps. Cover how change detection interacts with Zone.js and explain when it gets triggered, how to profile its duration, as well as common practices for performance optimization.

**Rollout strict typings for @angular/forms**
In Q4 2021 we designed a solution for introducing strict typings for forms and in Q1 2022 we concluded the corresponding request for comments. Currently, we are implementing a rollout strategy with an automated migration step that will enable the improvements for existing projects. We are first testing the solution with more than 2,500 projects at Google to ensure a smooth migration path for the external community.

**Remove legacy View Engine**
After the transition of all our internal tooling to Ivy is completed, we will remove the legacy View Engine for reduced Angular conceptual overhead, smaller package size, lower maintenance cost, and lower codebase complexity.

**Simplified Angular mental model with optional NgModules**
To simplify the Angular mental model and learning journey, we will be working on making NgModules optional. This work lets developers develop standalone components and implement an alternative API for declaring the compilation scope of the component. We kicked this project off with high-level design discussions that we captured in an RFC.

**Design strict typing for @angular/forms**
We will work on finding a way to implement stricter type checking for reactive forms with minimal backward incompatible implications. This way, we let developers catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.

**Improve integration of Angular DevTools with framework**
To improve the integration of Angular DevTools with the framework, we are working on moving the codebase to the angular/angular monorepository. This includes transitioning Angular DevTools to Bazel and integrating it into the existing processes and CI pipeline.
