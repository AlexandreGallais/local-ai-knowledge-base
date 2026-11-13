---
title: "What's new in ASP.NET Core in .NET 8 (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-8.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 8 (part 2 of 6)

## Blazor

### Full-stack web UI

With the release of .NET 8, Blazor is a full-stack web UI framework for developing apps that render content at either the component or page level with:

* Static Server rendering (also called *static server-side rendering*, static SSR) to generate static HTML on the server.
* Interactive Server rendering (also called *interactive server-side rendering*, interactive SSR) to generate interactive components with prerendering on the server.
* Interactive WebAssembly rendering (also called *client-side rendering*, CSR, which is always assumed to be interactive) to generate interactive components on the client with prerendering on the server.
* Interactive Auto (automatic) rendering to initially use the server-side ASP.NET Core runtime for content rendering and interactivity. The .NET WebAssembly runtime on the client is used for subsequent rendering and interactivity after the Blazor bundle is downloaded and the WebAssembly runtime activates. Interactive Auto rendering usually provides the fastest app startup experience.

Interactive render modes also prerender content by default.

For more information, see the following articles:

* ASP.NET Core Blazor fundamentals: New sections on rendering and static/interactive concepts appear at the top of the article.
* ASP.NET Core Blazor render modes
* **Migration coverage**: Migrate from ASP.NET Core in .NET 7 to .NET 8

Examples throughout the Blazor documentation have been updated for use in Blazor Web Apps. Blazor Server examples remain in content versioned for .NET 7 or earlier.

### New article on class libraries with static server-side rendering (static SSR)

We've added a new article that discusses component library authorship in Razor class libraries (RCLs) with static server-side rendering (static SSR).

For more information, see ASP.NET Core Razor class libraries (RCLs) with static server-side rendering (static SSR).

### New article on HTTP caching issues

We've added a new article that discusses some of the common HTTP caching issues that can occur when upgrading Blazor apps across major versions and how to address HTTP caching issues.

For more information, see Avoid HTTP caching issues when upgrading ASP.NET Core Blazor apps.

### New Blazor Web App template

We've introduced a new Blazor project template: the *Blazor Web App* template. The new template provides a single starting point for using Blazor components to build any style of web UI. The template combines the strengths of the existing Blazor Server and Blazor WebAssembly hosting models with the new Blazor capabilities added in .NET 8: static server-side rendering (static SSR), streaming rendering, enhanced navigation and form handling, and the ability to add interactivity using either Blazor Server or Blazor WebAssembly on a per-component basis.

As part of unifying the various Blazor hosting models into a single model in .NET 8, we're also consolidating the number of Blazor project templates. We removed the Blazor Server template, and the ASP.NET Core Hosted option has been removed from the Blazor WebAssembly template. Both of these scenarios are represented by options when using the Blazor Web App template.

> **Note:**
> Existing Blazor Server and Blazor WebAssembly apps remain supported in .NET 8. Optionally, these apps can be  updated to use the new full-stack web UI Blazor features.

For more information on the new Blazor Web App template, see the following articles:

* Tooling for ASP.NET Core Blazor
* ASP.NET Core Blazor project structure

### New JS initializers for Blazor Web Apps

For Blazor Server, Blazor WebAssembly, and Blazor Hybrid apps:

* `beforeStart` is used for tasks such as customizing the loading process, logging level, and other options.
* `afterStarted` is used for tasks such as registering Blazor event listeners and custom event types.

The preceding legacy JS initializers aren't invoked by default in a Blazor Web App. For Blazor Web Apps, a new set of JS initializers are used: `beforeWebStart`, `afterWebStarted`, `beforeServerStart`, `afterServerStarted`, `beforeWebAssemblyStart`, and `afterWebAssemblyStarted`.

For more information, see ASP.NET Core Blazor startup.

### Split of prerendering and integration guidance

For prior releases of .NET, we covered prerendering and integration in a single article. To simplify and focus our coverage, we've split the subjects into the following new articles, which have been updated for .NET 8:

* Prerender ASP.NET Core Razor components
* Integrate ASP.NET Core Razor components with MVC or Razor Pages

### Persist component state in a Blazor Web App

You can persist and read component state in a Blazor Web App using the existing `Microsoft.AspNetCore.Components.PersistentComponentState` service. This is useful for persisting component state during prerendering.

Blazor Web Apps automatically persist any registered app-level state created during prerendering, removing the need for the Persist Component State Tag Helper.

### Form handling and model binding

Blazor components can now handle submitted form requests, including model binding and validating the request data. Components can implement forms with separate form handlers using the standard HTML `<form>` tag or using the existing `EditForm` component.

Form model binding in Blazor honors the data contract attributes (for example, `[DataMember]` and `[IgnoreDataMember]`) for customizing how the form data is bound to the model.

New antiforgery support is included in .NET 8. A new `AntiforgeryToken` component renders an antiforgery token as a hidden field, and the new `[RequireAntiforgeryToken]` attribute enables antiforgery protection. If an antiforgery check fails, a 400 (Bad Request) response is returned without form processing. The new antiforgery features are enabled by default for forms based on `Editform` and can be applied manually to standard HTML forms.

For more information, see ASP.NET Core Blazor forms overview.

### Enhanced navigation and form handling

Static server-side rendering (static SSR) typically performs a full page refresh whenever the user navigates to a new page or submits a form. In .NET 8, Blazor can enhance page navigation and form handling by intercepting the request and performing a fetch request instead. Blazor then handles the rendered response content by patching it into the browser DOM. Enhanced navigation and form handling avoids the need for a full page refresh and preserves more of the page state, so pages load faster and more smoothly. Enhanced navigation is enabled by default when the Blazor script (`blazor.web.js`) is loaded. Enhanced form handling can be optionally enabled for specific forms.

New enhanced navigation API allows you to refresh the current page by calling `NavigationManager.Refresh(bool forceLoad = false)`.

For more information, see the following guidance:

* Enhanced navigation and form handling
* Location changes

### New article on static rendering with enhanced navigation for JS interop

Some apps depend on JS interop to perform initialization tasks that are specific to each page. When using Blazor's enhanced navigation feature with statically-rendered pages that perform JS interop initialization tasks, page-specific JS may not be executed again as expected each time an enhanced page navigation occurs. A new article explains how to address this scenario in Blazor Web Apps:

ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)

### Streaming rendering

You can now stream content updates on the response stream when using static server-side rendering (static SSR) with Blazor. Streaming rendering can improve the user experience for pages that perform long-running asynchronous tasks in order to fully render by rendering content as soon as it's available.

For example, to render a page you might need to make a long running database query or an API call. Normally, asynchronous tasks executed as part of rendering a page must complete before the rendered response is sent, which can delay loading the page. Streaming rendering initially renders the entire page with placeholder content while asynchronous operations execute. After the asynchronous operations are complete, the updated content is sent to the client on the same response connection and patched by into the DOM. The benefit of this approach is that the main layout of the app renders as quickly as possible and the page is updated as soon as the content is ready.

For more information, see ASP.NET Core Razor component rendering.

### Inject keyed services into components

Blazor now supports injecting keyed services using the `[Inject]` attribute. Keys allow for scoping of registration and consumption of services when using dependency injection. Use the new `InjectAttribute.Key` property to specify the key for the service to inject:

```csharp
[Inject(Key = "my-service")]
public IMyService MyService { get; set; }
```

The `@inject` Razor directive doesn't support keyed services for this release, but work is tracked by Update `@inject` to support keyed services (dotnet/razor #9286) for a future .NET release.

For more information, see ASP.NET Core Blazor dependency injection.

### Access `HttpContext` as a cascading parameter

You can now access the current `Microsoft.AspNetCore.Http.HttpContext` as a cascading parameter from a static server component:

```csharp
[CascadingParameter]
public HttpContext? HttpContext { get; set; }
```

Accessing the `Microsoft.AspNetCore.Http.HttpContext` from a static server component might be useful for inspecting and modifying headers or other properties.

For an example that passes `Microsoft.AspNetCore.Http.HttpContext` state, access and refresh tokens, to components, see ASP.NET Core Blazor additional server-side security scenarios.

### Render Razor components outside of ASP.NET Core

You can now render Razor components outside the context of an HTTP request. You can render Razor components as HTML directly to a string or stream independently of the ASP.NET Core hosting environment. This is convenient for scenarios where you want to generate HTML fragments, such as for a generating email or static site content.

For more information, see Render Razor components outside of ASP.NET Core.

### Sections support

The new `SectionOutlet` and `SectionContent` components in Blazor add support for specifying outlets for content that can be filled in later. Sections are often used to define placeholders in layouts that are then filled in by specific pages. Sections are referenced either by a unique name or using a unique object ID.

For more information, see ASP.NET Core Blazor sections.

### Error page support

Blazor Web Apps can define a custom error page for use with the ASP.NET Core exception handling middleware. The Blazor Web App project template includes a default error page with similar content to the one used in MVC and Razor Pages apps. When the error page is rendered in response to a request from exception handling middleware, the error page always renders as a static server component, even if interactivity is otherwise enabled.

See the `Error` component (`Components/Pages/Error.razor`) of the server project in the Blazor Web App project template (`dotnet/aspnetcore` GitHub repository).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### QuickGrid

The Blazor QuickGrid component is no longer experimental and is now part of the Blazor framework in .NET 8.

QuickGrid is a high performance grid component for displaying data in tabular form. QuickGrid is built to be a simple and convenient way to display your data, while still providing powerful features, such as sorting, filtering, paging, and virtualization.

For more information, see ASP.NET Core Blazor \`QuickGrid\` component.

### Route to named elements

Blazor now supports using client-side routing to navigate to a specific HTML element on a page using standard URL fragments. If you specify an identifier for an HTML element using the standard `id` attribute, Blazor correctly scrolls to that element when the URL fragment matches the element identifier.

For more information, see ASP.NET Core Blazor navigation.

### Root-level cascading values

Root-level cascading values can be registered for the entire component hierarchy. Named cascading values and subscriptions for update notifications are supported.

For more information, see the following resources:

* Root-level cascading values
* Root-level cascading values with notifications

### Virtualize empty content

Use the new `EmptyContent` parameter on the `Virtualize` component to supply content when the component has loaded and either `Items` is empty or `ItemsProviderResult<T>.TotalItemCount` is zero.

For more information, see ASP.NET Core Razor component virtualization.

### Close circuits when there are no remaining interactive server components

Interactive server components handle web UI events using a real-time connection with the browser called a circuit. A circuit and its associated state are set up when a root interactive server component is rendered. The circuit is closed when there are no remaining interactive server components on the page, which frees up server resources.

### Monitor SignalR circuit activity

You can now monitor inbound circuit activity in server-side apps using the new `CreateInboundActivityHandler` method on `CircuitHandler`. Inbound circuit activity is any activity sent from the browser to the server, such as UI events or JavaScript-to-.NET interop calls.

For more information, see ASP.NET Core Blazor SignalR guidance.

### Faster runtime performance with the Jiterpreter

The *Jiterpreter* is a new runtime feature in .NET 8 that enables partial Just-in-Time (JIT) compilation support when running on WebAssembly to achieve improved runtime performance.

For more information, see ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation.

### Ahead-of-time (AOT) SIMD and exception handling

Blazor WebAssembly ahead-of-time (AOT) compilation now uses WebAssembly Fixed-width SIMD and WebAssembly Exception handling by default to improve runtime performance.

For more information, see the following articles:

* AOT: Single Instruction, Multiple Data (SIMD)
* AOT: Exception handling
