---
title: "ASP.NET Core Blazor render modes (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/render-modes.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor render modes (part 3 of 3)

## Render mode propagation

Render modes propagate down the component hierarchy.

Rules for applying render modes:

* The default render mode is Static.
* The Interactive Server (`Microsoft.AspNetCore.Components.Web.RenderMode.InteractiveServer`), Interactive WebAssembly (`Microsoft.AspNetCore.Components.Web.RenderMode.InteractiveWebAssembly`), and Interactive Auto (`Microsoft.AspNetCore.Components.Web.RenderMode.InteractiveAuto`) render modes can be used from a component, including using different render modes for sibling components.
* You can't switch to a different interactive render mode in a child component. For example, a Server component can't be a child of a WebAssembly component.
* Parameters passed to an interactive child component from a Static parent must be JSON serializable. This means that you can't pass render fragments or child content from a Static parent component to an interactive child component.

The following examples use a non-routable, non-page `SharedMessage` component. The render mode agnostic `SharedMessage` component doesn't apply a render mode with an `@attribute` directive. If you're testing these scenarios with a Blazor Web App, place the following component in the app's `Components` folder.

`SharedMessage.razor`:

```razor
<p>@Greeting</p>

<button @onclick="UpdateMessage">Click me</button> @message

<p>@ChildContent</p>

@code {
    private string message = "Not updated yet.";

    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    [Parameter]
    public string Greeting { get; set; } = "Hello!";

    private void UpdateMessage()
    {
        message = "Somebody updated me!";
    }
}
```

### Render mode inheritance

If the `SharedMessage` component is placed in a statically-rendered parent component, the `SharedMessage` component is also rendered statically and isn't interactive. The button doesn't call `UpdateMessage`, and the message isn't updated.

`RenderMode5.razor`:

```razor
@page "/render-mode-5"

<SharedMessage />
```

If the `SharedMessage` component is placed in a component that defines the render mode, it inherits the applied render mode.

In the following example, the `SharedMessage` component is interactive over a SignalR connection to the client. The button calls `UpdateMessage`, and the message is updated.

`RenderMode6.razor`:

```razor
@page "/render-mode-6"
@rendermode InteractiveServer

<SharedMessage />
```

### Child components with different render modes

In the following example, both `SharedMessage` components are prerendered and appear when the page is displayed in the browser.

* The first `SharedMessage` component with interactive server-side rendering (interactive SSR) is interactive after Blazor's SignalR circuit is established.
* The second `SharedMessage` component with client-side rendering (CSR) is interactive *after* the Blazor app bundle is downloaded and the .NET runtime is active on the client.

`RenderMode7.razor`:

```razor
@page "/render-mode-7"

<SharedMessage @rendermode="InteractiveServer" />
<SharedMessage @rendermode="InteractiveWebAssembly" />
```

### Child component with a serializable parameter

The following example demonstrates an interactive child component that takes a parameter. Parameters must be serializable.

`RenderMode8.razor`:

```razor
@page "/render-mode-8"

<SharedMessage @rendermode="InteractiveServer" Greeting="Welcome!" />
```

Non-serializable component parameters, such as child content or a render fragment, aren't supported. In the following example, passing child content to the `SharedMessage` component results in a runtime error.

`RenderMode9.razor`:

```razor
@page "/render-mode-9"

<SharedMessage @rendermode="InteractiveServer">
    Child content
</SharedMessage>
```

❌ **Error**:

> :::no-loc text="System.InvalidOperationException: Cannot pass the parameter 'ChildContent' to component 'SharedMessage' with rendermode 'InteractiveServerRenderMode'. This is because the parameter is of the delegate type 'Microsoft.AspNetCore.Components.RenderFragment', which is arbitrary code and cannot be serialized.":::

To circumvent the preceding limitation, wrap the child component in another component that doesn't have the parameter. This is the approach taken in the Blazor Web App project template with the `Routes` component (`Components/Routes.razor`) to wrap the `Microsoft.AspNetCore.Components.Routing.Router` component.

`WrapperComponent.razor`:

```razor
<SharedMessage>
    Child content
</SharedMessage>
```

`RenderMode10.razor`:

```razor
@page "/render-mode-10"

<WrapperComponent @rendermode="InteractiveServer" />
```

In the preceding example:

* The child content is passed to the `SharedMessage` component without generating a runtime error.
* The `SharedMessage` component renders interactively on the server.

### Child component with a different render mode than its parent

Don't try to apply a different interactive render mode to a child component than its parent's render mode.

The following component results in a runtime error when the component is rendered:

`RenderMode11.razor`:

```razor
@page "/render-mode-11"
@rendermode InteractiveServer

<SharedMessage @rendermode="InteractiveWebAssembly" />
```

❌ **Error**:

> :::no-loc text="Cannot create a component of type 'BlazorSample.Components.SharedMessage' because its render mode 'Microsoft.AspNetCore.Components.Web.InteractiveWebAssemblyRenderMode' is not supported by Interactive Server rendering.":::

## Static SSR pages in an interactive app

There are cases where the app's specification calls for components to adopt static server-side rendering (static SSR) and only run on the server, while the rest of the app uses an interactive render mode.

This approach is only useful when the app has specific pages that can't work with interactive Server or WebAssembly rendering. For example, adopt this approach for pages that depend on reading/writing HTTP cookies and can only work in a request/response cycle instead of interactive rendering. For pages that work with interactive rendering, you shouldn't force them to use static SSR, as it's less efficient and less responsive for the end user.

Mark any Razor component page with the `[ExcludeFromInteractiveRouting]` attribute assigned with the `@attribute` Razor directive:

```razor
@attribute [ExcludeFromInteractiveRouting]
```

Applying the attribute causes navigation to the page to exit from interactive routing. Inbound navigation is forced to perform a full-page reload instead resolving the page via interactive routing. The full-page reload forces the top-level root component, typically the `App` component (`App.razor`), to rerender from the server, allowing the app to switch to a different top-level render mode.

The `Microsoft.AspNetCore.Components.Routing.RazorComponentsEndpointHttpContextExtensions.AcceptsInteractiveRouting*` extension method allows the component to detect whether the `[ExcludeFromInteractiveRouting]` attribute is applied to the current page.

In the `App` component, use the pattern in the following example:

* Pages that aren't annotated with the `[ExcludeFromInteractiveRouting]` attribute default to the `InteractiveServer` render mode with global interactivity. You can replace `InteractiveServer` with `InteractiveWebAssembly` or `InteractiveAuto` to specify a different default global render mode.
* Pages annotated with the `[ExcludeFromInteractiveRouting]` attribute adopt static SSR (`PageRenderMode` is assigned `null`).

```razor
<!DOCTYPE html>
<html>
<head>
    ...
    <HeadOutlet @rendermode="@PageRenderMode" />
</head>
<body>
    <Routes @rendermode="@PageRenderMode" />
    ...
</body>
</html>

@code {
    [CascadingParameter]
    private HttpContext HttpContext { get; set; } = default!;

    private IComponentRenderMode? PageRenderMode
        => HttpContext.AcceptsInteractiveRouting() ? InteractiveServer : null;
}
```

An alternative to using the `Microsoft.AspNetCore.Components.Routing.RazorComponentsEndpointHttpContextExtensions.AcceptsInteractiveRouting*` extension method is to read endpoint metadata manually using `HttpContext.GetEndpoint()?.Metadata`.

## Custom shorthand render modes

The `@rendermode` directive takes a single parameter that's a static instance of type `Microsoft.AspNetCore.Components.IComponentRenderMode`. The `@rendermode` directive attribute can take any render mode instance, static or not. The Blazor framework provides the `Microsoft.AspNetCore.Components.Web.RenderMode` static class with some predefined render modes for convenience, but you can create your own.

Normally, a component uses the following `@rendermode` directive to disable prerendering:

```razor
@rendermode @(new InteractiveServerRenderMode(prerender: false))
```

However, consider the following example that creates a shorthand interactive server-side render mode without prerendering via the app's imports file (`Components/_Imports.razor`):

```csharp
public static IComponentRenderMode InteractiveServerWithoutPrerendering { get; } = 
    new InteractiveServerRenderMode(prerender: false);
```

Use the shorthand render mode in components throughout the `Components` folder:

```razor
@rendermode InteractiveServerWithoutPrerendering
```

Alternatively, a single component instance can define a custom render mode via a private field:

```razor
@rendermode interactiveServerWithoutPrerendering

...

@code {
    private static IComponentRenderMode interactiveServerWithoutPrerendering = 
        new InteractiveServerRenderMode(prerender: false);
}
```

At the moment, the shorthand render mode approach is probably only useful for reducing the verbosity of specifying the `prerender` flag. The shorthand approach might be more useful in the future if additional flags become available for interactive rendering and you would like to create shorthand render modes with different combinations of flags.

## Related content

* WebSocket compression
  * ASP.NET Core Blazor SignalR guidance
  * Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering
* ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)
* Cascading values/parameters and render mode boundaries: Also see the Root-level cascading values and Root-level cascading values with notifications sections earlier in the article.
* ASP.NET Core Razor class libraries (RCLs) with static server-side rendering (static SSR)
* Secure data in Blazor Web Apps with Interactive Auto rendering
