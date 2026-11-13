---
title: "ASP.NET Core Razor component lifecycle (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/lifecycle.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component lifecycle (part 3 of 3)

## Handle incomplete asynchronous actions at render

Asynchronous actions performed in lifecycle events might not have completed before the component is rendered. Objects might be `null` or incompletely populated with data while the lifecycle method is executing. Provide rendering logic to confirm that objects are initialized. Render placeholder UI elements (for example, a loading message) while objects are `null`.

In the following `Slow` component, `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` is overridden to asynchronously execute a long-running task. While `isLoading` is `true`, a loading message is displayed to the user. After the `Task` returned by `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` completes, the component is rerendered with the updated state, showing the "`Finished!`" message.

`Slow.razor`:

```razor
@page "/slow"

<h2>Slow Component</h2>

@if (isLoading)
{
    <div><em>Loading...</em></div>
}
else
{
    <div>Finished!</div>
}

@code {
    private bool isLoading = true;

    protected override async Task OnInitializedAsync()
    {
        await LoadDataAsync();
        isLoading = false;
    }

    private Task LoadDataAsync()
    {
        return Task.Delay(10000);
    }
}
```

The preceding component uses an `isLoading` variable to display the loading message. A similar approach is used for a component that loads data into a collection and checks if the collection is `null` to present the loading message. The following example checks the `movies` collection for `null` to either display the loading message or display the collection of movies:

```razor
@if (movies == null)
{
    <p><em>Loading...</em></p>
}
else
{
    @* display movies *@
}

@code {
    private Movies[]? movies;

    protected override async Task OnInitializedAsync()
    {
        movies = await GetMovies();
    }
}
```

Prerendering waits for *quiescence*, which means that a component doesn't render until all of the components in the render tree have finished rendering. This means that a loading message doesn't display while a child component's `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` method is executing a long-running task during prerendering. To demonstrate this behavior, place the preceding `Slow` component into a test app's `Home` component:

```razor
@page "/"

<PageTitle>Home</PageTitle>

<h1>Hello, world!</h1>

Welcome to your new app.

<Slow />
```

> **Note:**
> Although the examples in this section discuss the `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` lifecycle method, other lifecycle methods that execute during prerendering may delay final rendering of a component. Only `OnAfterRender{Async}` isn't executed during prerendering and is immune to delays due to quiescence.

During prerendering, the `Home` component doesn't render until the `Slow` component is rendered, which takes ten seconds. The UI is blank during this ten-second period, and there's no loading message. After prerendering, the `Home` component renders, and the `Slow` component's loading message is displayed. After ten more seconds, the `Slow` component finally displays the finished message.

As the preceding demonstration illustrates, quiescence during prerendering results in a poor user experience. To improve the user experience, begin by implementing streaming rendering to avoid waiting for the asynchronous task to complete while prerendering.

Add the `[StreamRendering]` attribute to the `Slow` component (use `[StreamRendering(true)]` in .NET 8):

```razor
@attribute [StreamRendering]
```

When the `Home` component is prerendering, the `Slow` component is quickly rendered with its loading message. The `Home` component doesn't wait for ten seconds for the `Slow` component to finish rendering. However, the finished message displayed at the end of prerendering is replaced by the loading message while the component finally renders, which is another ten-second delay. This occurs because the `Slow` component is rendering twice, along with `LoadDataAsync` executing twice. When a component is accessing resources, such as services and databases, double execution of service calls and database queries creates undesirable load on the app's resources.

To address the double rendering of the loading message and the re-execution of service and database calls, persist prerendered state with `Microsoft.AspNetCore.Components.PersistentComponentState` for final rendering of the component, as seen in the following updates to the `Slow` component:

```razor
@page "/slow"
@attribute [StreamRendering]

<h2>Slow Component</h2>

@if (Data is null)
{
    <div><em>Loading...</em></div>
}
else
{
    <div>@Data</div>
}

@code {
    [PersistentState]
    public string? Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data ??= await LoadDataAsync();
    }

    private async Task<string> LoadDataAsync()
    {
        await Task.Delay(5000);
        return "Finished!";
    }
}
```

By combining streaming rendering with persistent component state:

* Services and databases only require a single call for component initialization.
* Components render their UIs quickly with loading messages during long-running tasks for the best user experience.

For more information, see the following resources:

* ASP.NET Core Razor component rendering
* ASP.NET Core Blazor prerendered state persistence.

## Handle errors

For information on handling errors during lifecycle method execution, see Handle errors in ASP.NET Core Blazor apps.

## Stateful reconnection after prerendering

When prerendering on the server, a component is initially rendered statically as part of the page. Once the browser establishes a SignalR connection back to the server, the component is rendered *again* and interactive. If the `OnInitialized{Async}` lifecycle method for initializing the component is present, the method is executed *twice*:

* When the component is prerendered statically.
* After the server connection has been established.

This can result in a noticeable change in the data displayed in the UI when the component is finally rendered. To avoid this behavior, pass in an identifier to cache the state during prerendering and to retrieve the state after prerendering.

The following code demonstrates a `WeatherForecastService` that avoids the change in data display due to prerendering. The awaited `System.Threading.Tasks.Task.Delay*` (`await Task.Delay(...)`) simulates a short delay before returning data from the `GetForecastAsync` method.

Add `Microsoft.Extensions.Caching.Memory.IMemoryCache` services with `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*` on the service collection in the app's `Program` file:

```csharp
builder.Services.AddMemoryCache();
```

`WeatherForecastService.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/WeatherForecastService.cs._
For more information on the `Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper.RenderMode`, see ASP.NET Core Blazor SignalR guidance.

The content in this section focuses on Blazor Web Apps and stateful SignalR *reconnection*. To preserve state during the execution of initialization code while prerendering, see ASP.NET Core Blazor prerendered state persistence.

## Prerendering with JavaScript interop

*This section applies to server-side apps that prerender Razor components. Prerendering is covered in Prerender ASP.NET Core Razor components.*

During prerendering, calling into JavaScript (JS) isn't possible. The following example demonstrates how to use JS interop as part of a component's initialization logic in a way that's compatible with prerendering.

The following `scrollElementIntoView` function:

* Scrolls to the passed element with `scrollIntoView`.
* Returns the element's `top` property value from the `getBoundingClientRect` method.

```javascript
window.scrollElementIntoView = (element) => {
  element.scrollIntoView();
  return element.getBoundingClientRect().top;
}
```

Where `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` calls the JS function in component code, the `Microsoft.AspNetCore.Components.ElementReference` is only used in `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` and not in any earlier lifecycle method because there's no HTML DOM element until after the component is rendered.

`StateHasChanged` (reference source) is called to enqueue rerendering of the component with the new state obtained from the JS interop call (for more information, see ASP.NET Core Razor component rendering). An infinite loop isn't created because `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is only called when `scrollPosition` is `null`.

`PrerenderedInterop.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/PrerenderedInterop.razor._
The preceding example pollutes the client with a global function. For a better approach in production apps, see JavaScript isolation in JavaScript modules.

## Cancelable background work

Components often perform long-running background work, such as making network calls (`System.Net.Http.HttpClient`) and interacting with databases. It's desirable to stop the background work to conserve system resources in several situations. For example, background asynchronous operations don't automatically stop when a user navigates away from a component.

Other reasons why background work items might require cancellation include:

* An executing background task was started with faulty input data or processing parameters.
* The current set of executing background work items must be replaced with a new set of work items.
* The priority of currently executing tasks must be changed.
* The app must be shut down for server redeployment.
* Server resources become limited, necessitating the rescheduling of background work items.

To implement a cancelable background work pattern in a component:

* Use a `System.Threading.CancellationTokenSource` and `System.Threading.CancellationToken`.
* Upon disposal of the component and at any point cancellation is desired by manually canceling the token, call `CancellationTokenSource.Cancel` to signal that the background work should be cancelled.
* After the asynchronous call returns, call `System.Threading.CancellationToken.ThrowIfCancellationRequested*` on the token.

In the following example:

* `await Task.Delay(10000, cts.Token);` represents long-running asynchronous background work.
* `BackgroundResourceMethod` represents a long-running background method that shouldn't start if the `Resource` is disposed before the method is called.

`BackgroundWork.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/BackgroundWork.razor._
To display a loading indicator while the background work is taking place, use the following approach.

Create a loading indicator component with a `Loading` parameter that can display child content in a `Microsoft.AspNetCore.Components.RenderFragment`. For the `Loading` parameter:

* When `true`, display a loading indicator.
* When `false`, render the component's content (`ChildContent`). For more information, see Child content render fragments.

`ContentLoading.razor`:

```razor
@if (Loading)
{
    <progress id="loadingIndicator" aria-label="Content loading…"></progress>
}
else
{
    @ChildContent
}

@code {
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    [Parameter]
    public bool Loading { get; set; }
}
```

To load CSS styles for the indicator, add the styles to `<head>` content with the `Microsoft.AspNetCore.Components.Web.HeadContent` component. For more information, see Control head content in ASP.NET Core Blazor apps.

```razor
@if (Loading)
{
    <!-- OPTIONAL ...
    <HeadContent>
        <style>
            ...
        </style>
    </HeadContent>
    -->
    <progress id="loadingIndicator" aria-label="Content loading…"></progress>
}
else
{
    @ChildContent
}

...
```

Wrap the component's Razor markup with the `ContentLoading` component and pass a value in a C# field to the `Loading` parameter when initialization work is performed by the component:

```razor
<ContentLoading Loading="@loading">
    ...
</ContentLoading>

@code {
    private bool loading = true;
    ...

    protected override async Task OnInitializedAsync()
    {
        await LongRunningWork().ContinueWith(_ => loading = false);
    }

    ...
}
```

## Blazor Server reconnection events

The component lifecycle events covered in this article operate separately from server-side reconnection event handlers. When the SignalR connection to the client is lost, only UI updates are interrupted. UI updates are resumed when the connection is re-established. For more information on circuit handler events and configuration, see ASP.NET Core Blazor SignalR guidance.

## Related content

Handle caught exceptions outside of a Razor component's lifecycle
