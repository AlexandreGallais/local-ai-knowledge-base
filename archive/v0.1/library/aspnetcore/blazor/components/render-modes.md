---
title: "ASP.NET Core Blazor render modes (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/render-modes.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor render modes

-->
-->

This article explains control of Razor component rendering in Blazor Web Apps, either at compile time or runtime.

This guidance doesn't apply to standalone Blazor WebAssembly apps. Blazor WebAssembly apps only render on the client via a client-side WebAssembly-based runtime and have no concept of a *render mode*. If a render mode is applied to a component in a Blazor WebAssembly app, the render mode designation has no influence on rendering the component.

## Render modes

Every component in a Blazor Web App adopts a *render mode* to determine the hosting model that it uses, where it's rendered, and whether or not it's interactive. *Interactivity* makes it possible for users to interact with rendered components. This includes app responses to Document Object Model (DOM) events and state changes tied to C# members via Blazor's event handlers and binding.

The following table shows the available render modes for rendering Razor components in a Blazor Web App. To apply a render mode to a component use the `@rendermode` directive on the component instance or on the component definition. Later in this article, examples are shown for each render mode scenario.

Name | Description | Render location | Interactive
---- | ----------- | :-------------: | :---------:
Static Server | Static server-side rendering (static SSR) |  Server  | ❌No
Interactive Server | Interactive server-side rendering (interactive SSR) using Blazor Server. | Server | ✔️Yes
Interactive WebAssembly | Client-side rendering (CSR) using Blazor WebAssembly&dagger;. | Client | ✔️Yes
Interactive Auto | Interactive SSR using Blazor Server initially and then CSR on subsequent visits after the Blazor bundle is downloaded. | Server, then client | ✔️Yes

&dagger;Client-side rendering (CSR) is assumed to be interactive. "*Interactive* client-side rendering" and "*interactive* CSR" aren't used by the industry or in the Blazor documentation.

Prerendering is enabled by default for interactive components. Guidance on controlling prerendering is provided later in this article. For general industry terminology on client and server rendering concepts, see ASP.NET Core Blazor fundamentals.

The following examples demonstrate setting the component's render mode with a few basic Razor component features.

To test the render mode behaviors locally, you can place the following components in an app created from the *Blazor Web App* project template. When you create the app, select options from dropdown menus (Visual Studio) or apply the CLI options (.NET CLI) to enable both server-side and client-side interactivity. For guidance on how to create a Blazor Web App, see Tooling for ASP.NET Core Blazor.

## Enable support for interactive render modes

A Blazor Web App must be configured to support interactive render modes. The following extensions are automatically applied to apps created from the *Blazor Web App* project template during app creation. Individual components are still required to declare their render mode per the *Render modes* section after the component services and endpoints are configured in the app's `Program` file.

Services for Razor components are added by calling `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*`.

Component builder extensions:

* `Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents*` adds services to support rendering Interactive Server components.
* `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddInteractiveWebAssemblyComponents*` adds services to support rendering Interactive WebAssembly components.

`Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` discovers available components and specifies the root component for the app (the first component loaded), which by default is the `App` component (`App.razor`).

Endpoint convention builder extensions:

* `Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode*` configures interactive server-side rendering (interactive SSR) for the app.
* `Microsoft.AspNetCore.Builder.WebAssemblyRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveWebAssemblyRenderMode*` configures the Interactive WebAssembly render mode for the app.

> **Note:**
> For orientation on the placement of the API in the following examples, inspect the `Program` file of an app generated from the Blazor Web App project template. For guidance on how to create a Blazor Web App, see Tooling for ASP.NET Core Blazor.

Example 1: The following `Program` file API adds services and configuration for enabling interactive SSR:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
```

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
```

Example 2: The following `Program` file API adds services and configuration for enabling the Interactive WebAssembly render mode:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents();
```

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode();
```

Example 3: The following `Program` file API adds services and configuration for enabling the Interactive Server, Interactive WebAssembly, and Interactive Auto render modes:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();
```

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode();
```

Blazor uses the Blazor WebAssembly hosting model to download and execute components that use the Interactive WebAssembly render mode. A separate client project is required to set up Blazor WebAssembly hosting for these components. The client project contains the startup code for the Blazor WebAssembly host and sets up the .NET runtime for running in a browser. The Blazor Web App template adds this client project for you when you select the option to enable WebAssembly interactivity. Any components using the Interactive WebAssembly render mode should be built from the client project, so they get included in the downloaded app bundle.

## Apply a render mode to a component instance

To apply a render mode to a component instance use the `@rendermode` Razor directive attribute where the component is used.

In the following example, interactive server-side rendering (interactive SSR) is applied to the `Dialog` component instance:

```razor
<Dialog @rendermode="InteractiveServer" />
```

> **Note:**
> Blazor templates include a static `using` directive for `Microsoft.AspNetCore.Components.Web.RenderMode` in the app's imports file (`Components/_Imports.razor`) for shorter `@rendermode` syntax:
>
> ```razor
> @using static Microsoft.AspNetCore.Components.Web.RenderMode
> ```
>
> Without the preceding directive, components must specify the static `Microsoft.AspNetCore.Components.Web.RenderMode` class in `@rendermode` syntax:
>
> ```razor
> <Dialog @rendermode="RenderMode.InteractiveServer" />
> ```

You can also reference custom render mode instances instantiated directly with custom configuration. For more information, see the Custom shorthand render modes section later in this article.

## Apply a render mode to a component definition

To specify the render mode for a component as part of its definition, use the `@rendermode` Razor directive and the corresponding render mode attribute.

```razor
@page "..."
@rendermode InteractiveServer
```

Applying a render mode to a component definition is commonly used when applying a render mode to a specific page. Routable pages use the same render mode as the `Microsoft.AspNetCore.Components.Routing.Router` component that rendered the page.

Technically, `@rendermode` is both a Razor *directive* and a Razor *directive attribute*. The semantics are similar, but there are differences. The `@rendermode` directive is on the component definition, so the referenced render mode instance must be static. The `@rendermode` directive attribute can take any render mode instance.

> **Note:**
> Component authors should avoid coupling a component's implementation to a specific render mode. Instead, component authors should typically design components to support any render mode or hosting model. A component's implementation should avoid assumptions on where it's running (server or client) and should degrade gracefully when rendered statically. Specifying the render mode in the component definition may be needed if the component isn't instantiated directly (such as with a routable page component) or to specify a render mode for all component instances.

## Apply a render mode to the entire app

To set the render mode for the entire app, indicate the render mode at the highest-level interactive component in the app's component hierarchy that isn't a root component.

> **Note:**
> Making a root component interactive, such as the `App` component, isn't supported. Therefore, the render mode for the entire app can't be set directly by the `App` component.

For apps based on the Blazor Web App project template, a render mode assigned to the entire app is typically specified where the `Routes` component is used in the `App` component (`Components/App.razor`):

```razor
<Routes @rendermode="InteractiveServer" />
```

The `Microsoft.AspNetCore.Components.Routing.Router` component propagates its render mode to the pages it routes.

You also typically must set the same interactive render mode on the `HeadOutlet` component, which is also found in the `App` component of a Blazor Web App generated from the project template:

```razor
<HeadOutlet @rendermode="InteractiveServer" />
```

For apps that adopt an interactive client-side (WebAssembly or Auto) rendering mode and enable the render mode for the entire app via the `Routes` component:

* Place or move the layout and navigation files of the server app's `Components/Layout` folder into the `.Client` project's `Layout` folder. Create a `Layout` folder in the `.Client` project if it doesn't exist.
* Place or move the components of the server app's `Components/Pages` folder into the `.Client` project's `Pages` folder. Create a `Pages` folder in the `.Client` project if it doesn't exist.
* Place or move the `Routes` component of the server app's `Components` folder into the `.Client` project's root folder.

To enable global interactivity when creating a Blazor Web App:

* Visual Studio: Set the **Interactivity location** dropdown list to **Global**.
* .NET CLI: Use the `-ai|--all-interactive` option.

For more information, see Tooling for ASP.NET Core Blazor.

## Apply a render mode programmatically

Properties and fields can assign a render mode.

The second approach described in this section, setting the render mode by component instance, is especially useful when your app specification calls for one or more components to adopt static SSR in an otherwise interactive app. This scenario is covered in the Static SSR pages in an interactive app section later in this article.

### Set the render mode by component definition

A component definition can define a render mode via a private field:

```razor
@rendermode pageRenderMode

...

@code {
    private static IComponentRenderMode pageRenderMode = InteractiveServer;
}
```

### Set the render mode by component instance

The following example applies interactive server-side rendering (interactive SSR) to any request.

```razor
<Routes @rendermode="PageRenderMode" />

...

@code {
    private IComponentRenderMode? PageRenderMode => InteractiveServer;
}
```

Additional information on render mode propagation is provided in the Render mode propagation section later in this article. The Static SSR pages in an interactive app section shows how to use the preceding approach to adopt static SSR in an otherwise interactive app.

## Blazor documentation examples for Blazor Web Apps

When using a Blazor Web App, most of the Blazor documentation example components ***require*** interactivity to function and demonstrate the concepts covered by the articles. When you test an example component provided by an article, make sure that either the app adopts global interactivity or the component adopts an interactive render mode.

## Prerendering

Interactive render modes (Interactive Server, Interactive WebAssembly, Interactive Auto) support prerendering by default, which initially renders the page content statically from the server to improve the initial load experience. For more information, see Prerender ASP.NET Core Razor components.
