---
title: "ASP.NET Core Razor component rendering (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/rendering.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component rendering

-->
-->

This article explains Razor component rendering in ASP.NET Core Blazor apps, including when to call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` to manually trigger a component to render.

## Rendering conventions for `ComponentBase`

Components *must* render when they're first added to the component hierarchy by a parent component. This is the only time that a component must render. Components *may* render at other times according to their own logic and conventions.

Razor components inherit from the `Microsoft.AspNetCore.Components.ComponentBase` base class, which contains logic to trigger rerendering at the following times:

* After applying an updated set of parameters from a parent component.
* After applying an updated value for a cascading parameter.
* After notification of an event and invoking one of its own event handlers.
* After a call to its own `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` method (see ASP.NET Core Razor component lifecycle). For guidance on how to prevent overwriting child component parameters when `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is called in a parent component, see Avoid overwriting parameters in ASP.NET Core Blazor.

Components inherited from `Microsoft.AspNetCore.Components.ComponentBase` skip rerenders due to parameter updates if either of the following are true:

* All of the parameters are from a set of known types&dagger; or any primitive type that hasn't changed since the previous set of parameters were set.

  &dagger;The Blazor framework uses a set of built-in rules and explicit parameter type checks for change detection. These rules and the types are subject to change at any time. For more information, see the `ChangeDetection` API in the ASP.NET Core reference source.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

* The override of the component's `ShouldRender` method returns `false` (the default `ComponentBase` implementation always returns `true`).

## Control the rendering flow

In most cases, `Microsoft.AspNetCore.Components.ComponentBase` conventions result in the correct subset of component rerenders after an event occurs. Developers aren't usually required to provide manual logic to tell the framework which components to rerender and when to rerender them. The overall effect of the framework's conventions is that the component receiving an event rerenders itself, which recursively triggers rerendering of descendant components whose parameter values may have changed.

For more information on the performance implications of the framework's conventions and how to optimize an app's component hierarchy for rendering, see ASP.NET Core Blazor rendering performance best practices.

## Streaming rendering

Use *streaming rendering* with static server-side rendering (static SSR) or prerendering to stream content updates on the response stream and improve the user experience for components that perform long-running asynchronous tasks to fully render.

For example, consider a component that makes a long-running database query or web API call to render data when the page loads. Normally, asynchronous tasks executed as part of rendering a server-side component must complete before the rendered response is sent, which can delay loading the page. Any significant delay in rendering the page harms the user experience. To improve the user experience, streaming rendering initially renders the entire page quickly with placeholder content while asynchronous operations execute. After the operations are complete, the updated content is sent to the client on the same response connection and patched into the DOM.

Streaming rendering requires the server to avoid buffering the output. The response data must flow to the client as the data is generated. For hosts that enforce buffering, streaming rendering degrades gracefully, and the page loads without streaming rendering.

To stream content updates when using static server-side rendering (static SSR) or prerendering, apply the `[StreamRendering]` attribute in .NET 9 or later (use `[StreamRendering(true)]` in .NET 8) to the component. Streaming rendering must be explicitly enabled because streamed updates may cause content on the page to shift. Components without the attribute automatically adopt streaming rendering if the parent component uses the feature. Pass `false` to the attribute in a child component to disable the feature at that point and further down the component subtree. The attribute is functional when applied to components supplied by a Razor class library.

If enhanced navigation is active, streaming rendering renders Not Found responses without reloading the page. When enhanced navigation is blocked, the framework redirects to Not Found content with a page refresh.

Streaming rendering can only render components that have a route, such as a `NotFoundPage` assignment (`NotFoundPage="..."`) or a status code pages re-execution middleware page assignment (`Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`). The Not Found render fragment (`<NotFound>...</NotFound>`) and the `DefaultNotFound` 404 content ("`Not found`" plain text) don't have routes, so they can't be used during streaming rendering.

Streaming `NavigationManager.NotFound` content rendering uses (in order):

* A `NotFoundPage` passed to the `Router` component, if present.
* A status code pages re-execution middleware page, if configured.
* No action if neither of the preceding approaches is adopted.

Non-streaming `NavigationManager.NotFound` content rendering uses (in order):

* A `NotFoundPage` passed to the `Router` component, if present.
* Not Found render fragment content, if present. *Not recommended in .NET 10 or later.*
* `DefaultNotFound` 404 content ("`Not found`" plain text).

Status code pages re-execution middleware with `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*` takes precedence for browser-based address routing problems, such as an incorrect URL typed into the browser's address bar or selecting a link that has no endpoint in the app.

The following example is based on the `Weather` component in an app created from the Blazor Web App project template. The call to `System.Threading.Tasks.Task.Delay*` simulates retrieving weather data asynchronously. The component initially renders placeholder content ("`Loading...`") without waiting for the asynchronous delay to complete. When the asynchronous delay completes and the weather data content is generated, the content is streamed to the response and patched into the weather forecast table.

`Weather.razor`:

```razor
@page "/weather"
@attribute [StreamRendering]

...

@if (forecasts == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <table class="table">
        ...
        <tbody>
            @foreach (var forecast in forecasts)
            {
                <tr>
                    <td>@forecast.Date.ToShortDateString()</td>
                    <td>@forecast.TemperatureC</td>
                    <td>@forecast.TemperatureF</td>
                    <td>@forecast.Summary</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    ...

    private WeatherForecast[]? forecasts;

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(500);

        ...

        forecasts = ...
    }
}
```

## Suppress UI refreshing (`ShouldRender`)

`Microsoft.AspNetCore.Components.ComponentBase.ShouldRender*` is called each time a component is rendered. Override `Microsoft.AspNetCore.Components.ComponentBase.ShouldRender*` to manage UI refreshing. If the implementation returns `true`, the UI is refreshed.

Even if `Microsoft.AspNetCore.Components.ComponentBase.ShouldRender*` is overridden, the component is always initially rendered.

`ControlRender.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ControlRender.razor._
For more information on performance best practices pertaining to `Microsoft.AspNetCore.Components.ComponentBase.ShouldRender*`, see ASP.NET Core Blazor rendering performance best practices.
