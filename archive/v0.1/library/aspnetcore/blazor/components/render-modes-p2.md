---
title: "ASP.NET Core Blazor render modes (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/render-modes.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor render modes (part 2 of 3)

## Detect rendering location, interactivity, and assigned render mode at runtime

The `Microsoft.AspNetCore.Components.ComponentBase.RendererInfo` and `Microsoft.AspNetCore.Components.ComponentBase.AssignedRenderMode` properties permit the app to detect details about the location, interactivity, and assigned render mode of a component:

* `Microsoft.AspNetCore.Components.RendererInfo.Name` returns the location where the component is executing:
  * `Static`: On the server (SSR) and incapable of interactivity.
  * `Server`: On the server (SSR) and capable of interactivity after prerendering.
  * `WebAssembly`: On the client (CSR) and capable of interactivity after prerendering.
  * `WebView`: On the native device and capable of interactivity after prerendering.
* `Microsoft.AspNetCore.Components.RendererInfo.IsInteractive` indicates if the component supports interactivity at the time of rendering. The value is `true` when rendering interactively or `false` when prerendering or for static SSR (`Microsoft.AspNetCore.Components.RendererInfo.Name` of `Static`).
* `Microsoft.AspNetCore.Components.ComponentBase.AssignedRenderMode` exposes the component's assigned render mode:
  * `InteractiveServerRenderMode` for Interactive Server.
  * `InteractiveAutoRenderMode` for Interactive Auto.
  * `InteractiveWebAssemblyRenderMode` for Interactive WebAssembly.
  * `null` if a render mode isn't assigned.

Components use these properties to render content depending on their location or interactivity status. The following examples demonstrate typical use cases.

Display content until a component is interactive:

```razor
@if (!RendererInfo.IsInteractive)
{
    <p>Connecting to the assistant...</p>
}
else
{
    ...
}
```

Disable a button until a component is interactive:

```razor
<button @onclick="Send" disabled="@(!RendererInfo.IsInteractive)">
    Send
</button>
```

Disable a form during prerendering and enable the form when the component is interactive:

```razor
<EditForm Model="Movie" ...>
    <fieldset disabled="@disabled">
        
        ...

        <button type="submit" >Save</button>
    </fieldset>
</EditForm>

@code {
    private bool disabled = true;

    [SupplyParameterFromForm]
    private Movie? Movie { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Movie ??= await ...;

        if (RendererInfo.IsInteractive)
        {
            disabled = false;
        }
    }
}
```

Render markup to support performing a regular HTML action if the component is statically rendered:

```razor
@if (AssignedRenderMode is null)
{
    // The render mode is Static Server
    <form action="/movies">
        <input type="text" name="titleFilter" />
        <input type="submit" value="Search" />
    </form>
}
else
{
    // The render mode is Interactive Server, WebAssembly, or Auto
    <input @bind="titleFilter" />
    <button @onclick="FilterMovies">Search</button>
}
```

In the preceding example:

* When the value of `Microsoft.AspNetCore.Components.ComponentBase.AssignedRenderMode` is `null`, the component adopts static SSR. Blazor event handling isn't functional in a browser with static SSR, so the component submits a form (GET request) with a `titleFilter` query string set to the user's `` value. The `Movie` component (`/movie`) can read the query string and process the value of `titleFilter` to render the component with the filtered results.
* Otherwise, the render mode is any of `InteractiveServer`, `InteractiveWebAssembly`, or `InteractiveAuto`. The component is capable of using an event handler delegate (`FilterMovies`) and the value bound to the `` element (`titleFilter`) to filter movies interactively over the background SignalR connection.

## Static server-side rendering (static SSR)

Components use static server-side rendering (static SSR). The component renders to the response stream and interactivity isn't enabled.

In the following example, there's no designation for the component's render mode, so the component inherits its render mode from its parent. Since no ancestor component specifies a render mode, the following component is *statically rendered* on the server. The button isn't interactive and doesn't call the `UpdateMessage` method when selected. The value of `message` doesn't change, and the component isn't rerendered in response to UI events.

`RenderMode1.razor`:

```razor
@page "/render-mode-1"

<button @onclick="UpdateMessage">Click me</button> @message

@code {
    private string message = "Not updated yet.";

    private void UpdateMessage()
    {
        message = "Somebody updated me!";
    }
}
```

If using the preceding component locally in a Blazor Web App, place the component in the server project's `Components/Pages` folder. The server project is the solution's project with a name that doesn't end in `.Client`. When the app is running, navigate to `/render-mode-1` in the browser's address bar.

During static SSR, Razor component page requests are processed by server-side ASP.NET Core middleware pipeline request processing for authorization. Dedicated Blazor features for authorization aren't operational because Razor components aren't rendered during server-side request processing. Blazor router features in the `Routes` component that aren't available during static SSR include displaying Not Authorized content (`<NotAuthorized>...</NotAuthorized>`) (`Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView.NotAuthorized`). Blazor Web Apps typically process unauthorized requests on the server by customizing the behavior of authorization middleware.

If the app exhibits root-level interactivity, server-side ASP.NET Core request processing isn't involved after the initial static SSR, which means that the preceding Blazor features work as expected.

Enhanced navigation with static SSR requires special attention when loading JavaScript. For more information, see ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR).

## Interactive server-side rendering (interactive SSR)

Interactive server-side rendering (interactive SSR) renders the component interactively from the server using Blazor Server. User interactions are handled over a real-time connection with the browser. The circuit connection is established when the Server component is rendered.

In the following example, the render mode is set interactive SSR by adding `@rendermode InteractiveServer` to the component definition. The button calls the `UpdateMessage` method when selected. The value of `message` changes, and the component is rerendered to update the message in the UI.

`RenderMode2.razor`:

```razor
@page "/render-mode-2"
@rendermode InteractiveServer

<button @onclick="UpdateMessage">Click me</button> @message

@code {
    private string message = "Not updated yet.";

    private void UpdateMessage()
    {
        message = "Somebody updated me!";
    }
}
```

If using the preceding component in a Blazor Web App, place the component in the server project's `Components/Pages` folder. The server project is the solution's project with a name that doesn't end in `.Client`. When the app is running, navigate to `/render-mode-2` in the browser's address bar.

Interactive Server components handle web UI events using a real-time connection with the browser called a circuit. A circuit and its associated state are created when a root Interactive Server component is rendered. The circuit is closed when there are no remaining Interactive Server components on the page, which frees up server resources.

## Client-side rendering (CSR)

Client-side rendering (CSR) renders the component interactively on the client using Blazor WebAssembly. The .NET runtime and app bundle are downloaded and cached when the WebAssembly component is initially rendered. Components using CSR must be built from a separate client project that sets up the Blazor WebAssembly host.

In the following example, the render mode is set to CSR with `@rendermode InteractiveWebAssembly`. The button calls the `UpdateMessage` method when selected. The value of `message` changes, and the component is rerendered to update the message in the UI.

`RenderMode3.razor`:

```razor
@page "/render-mode-3"
@rendermode InteractiveWebAssembly

<button @onclick="UpdateMessage">Click me</button> @message

@code {
    private string message = "Not updated yet.";

    private void UpdateMessage()
    {
        message = "Somebody updated me!";
    }
}
```

If using the preceding component locally in a Blazor Web App, place the component in the client project's `Pages` folder. The client project is the solution's project with a name that ends in `.Client`. When the app is running, navigate to `/render-mode-3` in the browser's address bar.

## Automatic (Auto) rendering

Automatic (Auto) rendering determines how to render the component at runtime. The component is initially rendered with interactive server-side rendering (interactive SSR) using the Blazor Server hosting model. The .NET runtime and app bundle are downloaded to the client in the background and cached so that they can be used on future visits.

The Auto render mode never dynamically changes the render mode of a component already on the page. The Auto render mode makes an initial decision about which type of interactivity to use for a component, then the component keeps that type of interactivity for as long as it's on the page. One factor in this initial decision is considering whether components already exist on the page with WebAssembly/Server interactivity. Auto mode prefers to select a render mode that matches the render mode of existing interactive components. The reason that the Auto mode prefers to use an existing interactivity mode is to avoid introducing a new interactive runtime that doesn't share state with the existing runtime.

Components using the Auto render mode must be built from a separate client project that sets up the Blazor WebAssembly host.

In the following example, the component is interactive throughout the process. The button calls the `UpdateMessage` method when selected. The value of `message` changes, and the component is rerendered to update the message in the UI. Initially, the component is rendered interactively from the server, but on subsequent visits it's rendered from the client after the .NET runtime and app bundle are downloaded and cached.

`RenderMode4.razor`:

```razor
@page "/render-mode-4"
@rendermode InteractiveAuto

<button @onclick="UpdateMessage">Click me</button> @message

@code {
    private string message = "Not updated yet.";

    private void UpdateMessage()
    {
        message = "Somebody updated me!";
    }
}
```

If using the preceding component locally in a Blazor Web App, place the component in the client project's `Pages` folder. The client project is the solution's project with a name that ends in `.Client`. When the app is running, navigate to `/render-mode-4` in the browser's address bar.
