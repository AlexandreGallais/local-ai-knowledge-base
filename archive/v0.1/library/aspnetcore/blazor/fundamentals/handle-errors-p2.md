---
title: "Handle errors in ASP.NET Core Blazor apps (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/handle-errors.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core Blazor apps (part 2 of 3)

## Error boundaries

*Error boundaries* provide a convenient approach for handling exceptions. The `Microsoft.AspNetCore.Components.Web.ErrorBoundary` component:

* Renders its child content when an error hasn't occurred.
* Renders error UI when an unhandled exception is thrown by any component within the error boundary.

To define an error boundary, use the `Microsoft.AspNetCore.Components.Web.ErrorBoundary` component to wrap one or more other components. The error boundary manages unhandled exceptions thrown by the components that it wraps.

```razor
<ErrorBoundary>
    ...
</ErrorBoundary>
```

To implement an error boundary in a global fashion, add the boundary around the body content of the app's main layout.

In `MainLayout.razor`:

```razor
<article class="content px-4">
    <ErrorBoundary>
        @Body
    </ErrorBoundary>
</article>
```

In Blazor Web Apps with the error boundary only applied to a static `MainLayout` component, the boundary is only active during static server-side rendering (static SSR). The boundary doesn't activate just because a component further down the component hierarchy is interactive.

An interactive render mode can't be applied to the `MainLayout` component because the component's `Body` parameter is a `Microsoft.AspNetCore.Components.RenderFragment` delegate, which is arbitrary code and can't be serialized. To enable interactivity broadly for the `MainLayout` component and the rest of the components further down the component hierarchy, the app must adopt a global interactive render mode by applying the interactive render mode to the `HeadOutlet` and `Routes` component instances in the app's root component, which is typically the `App` component. The following example adopts the Interactive Server (`InteractiveServer`) render mode globally.

In `Components/App.razor`:

```razor
<HeadOutlet @rendermode="InteractiveServer" />

...

<Routes @rendermode="InteractiveServer" />
```

If you prefer not to enable global interactivity, place the error boundary farther down the component hierarchy. The important concepts to keep in mind are that wherever the error boundary is placed:

* If the component where the error boundary is placed isn't interactive, the error boundary is only capable of activating on the server during static SSR. For example, the boundary can activate when an error is thrown in a component lifecycle method but not for an event triggered by user interactivity within the component, such as an error thrown by a button click handler.
* If the component where the error boundary is placed is interactive, the error boundary is capable of activating for interactive components that it wraps.

> **Note:**
> The preceding considerations aren't relevant for standalone Blazor WebAssembly apps because the client-side rendering (CSR) of a Blazor WebAssembly app is completely interactive.

Consider the following example, where an exception thrown by an embedded counter component is caught by an error boundary in the `Home` component, which adopts an interactive render mode.

`EmbeddedCounter.razor`:

```razor
<h1>Embedded Counter</h1>

<p role="status">Current count: @currentCount</p>
<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;

        if (currentCount > 5)
        {
            throw new InvalidOperationException("Current count is too big!");
        }
    }
}
```

`Home.razor`:

```razor
@page "/"
@rendermode InteractiveServer

<PageTitle>Home</PageTitle>

<h1>Home</h1>

<ErrorBoundary>
    <EmbeddedCounter />
</ErrorBoundary>
```

If the unhandled exception is thrown for a `currentCount` over five:

* The error is logged normally (`System.InvalidOperationException: Current count is too big!`).
* The exception is handled by the error boundary.
* The default error UI is rendered by the error boundary.

The `Microsoft.AspNetCore.Components.Web.ErrorBoundary` component renders an empty `` element using the `blazor-error-boundary` CSS class for its error content. The colors, text, and icon for the default UI are defined in the app's stylesheet in the `wwwroot` folder, so you're free to customize the error UI.

To change the default error content:

* Wrap the components of the error boundary in the `Microsoft.AspNetCore.Components.ErrorBoundaryBase.ChildContent` property.
* Set the `Microsoft.AspNetCore.Components.ErrorBoundaryBase.ErrorContent` property to the error content.

The following example wraps the `EmbeddedCounter` component and supplies custom error content:

```razor
<ErrorBoundary>
    <ChildContent>
        <EmbeddedCounter />
    </ChildContent>
    <ErrorContent>
        <p class="errorUI">😈 A rotten gremlin got us. Sorry!</p>
    </ErrorContent>
</ErrorBoundary>
```

For the preceding example, the app's stylesheet presumably includes an `errorUI` CSS class to style the content. The error content is rendered from the `Microsoft.AspNetCore.Components.ErrorBoundaryBase.ErrorContent` property without a block-level element. A block-level element, such as a division (``) or a paragraph (``) element, can wrap the error content markup, but it isn't required.

Optionally, use the context (`@context`) of the `Microsoft.AspNetCore.Components.ErrorBoundaryBase.ErrorContent` to obtain error data:

```razor
<ErrorContent>
    @context.HelpLink
</ErrorContent>
```

The `Microsoft.AspNetCore.Components.ErrorBoundaryBase.ErrorContent` can also name the context. In the following example, the context is named `exception`:

```razor
<ErrorContent Context="exception">
    @exception.HelpLink
</ErrorContent>
```

> **Warning:**
> Always avoid exposing error information to clients on the Internet, which is a security risk.

If the error boundary is defined in the app's layout, the error UI is seen regardless of which page the user navigates to after the error occurs. We recommend narrowly scoping error boundaries in most scenarios. If you broadly scope an error boundary, you can reset it to a non-error state on subsequent page navigation events by calling the error boundary's `Microsoft.AspNetCore.Components.ErrorBoundaryBase.Recover*` method.

In `MainLayout.razor`:

* Add a field for the `Microsoft.AspNetCore.Components.Web.ErrorBoundary` to capture a reference to it with the `@ref` attribute directive.
* In the `OnParameterSet` lifecycle method, you can trigger a recovery on the error boundary with `Microsoft.AspNetCore.Components.ErrorBoundaryBase.Recover*` to clear the error when the user navigates to a different component.

```razor
...

<ErrorBoundary @ref="errorBoundary">
    @Body
</ErrorBoundary>

...

@code {
    private ErrorBoundary? errorBoundary;

    protected override void OnParametersSet()
    {
        errorBoundary?.Recover();
    }
}
```

To avoid the infinite loop where recovering merely rerenders a component that throws the error again, don't call `Microsoft.AspNetCore.Components.ErrorBoundaryBase.Recover*` from rendering logic. Only call `Microsoft.AspNetCore.Components.ErrorBoundaryBase.Recover*` when:

* The user performs a UI gesture, such as selecting a button to indicate that they want to retry a procedure or when the user navigates to a new component.
* Additional logic that executes also clears the exception. When the component is rerendered, the error doesn't reoccur.

The following example permits the user to recover from the exception with a button:

```razor
<ErrorBoundary @ref="errorBoundary">
    <ChildContent>
        <EmbeddedCounter />
    </ChildContent>
    <ErrorContent>
        <div class="alert alert-danger" role="alert">
            <p class="fs-3 fw-bold">😈 A rotten gremlin got us. Sorry!</p>
            <p>@context.HelpLink</p>
            <button class="btn btn-info" @onclick="_ => errorBoundary?.Recover()">
                Clear
            </button>
        </div>
    </ErrorContent>
</ErrorBoundary>

@code {
    private ErrorBoundary? errorBoundary;
}
```

You can also subclass `Microsoft.AspNetCore.Components.Web.ErrorBoundary` for custom processing by overriding `Microsoft.AspNetCore.Components.Web.ErrorBoundary.OnErrorAsync*`. The following example merely logs the error, but you can implement any error handling code you wish. You can remove the line that returns a `System.Threading.Tasks.Task.CompletedTask` if your code awaits an asynchronous task.

`CustomErrorBoundary.razor`:

```razor
@inherits ErrorBoundary
@inject ILogger<CustomErrorBoundary> Logger

@if (CurrentException is null)
{
    @ChildContent
}
else if (ErrorContent is not null)
{
    @ErrorContent(CurrentException)
}

@code {
    protected override Task OnErrorAsync(Exception ex)
    {
        Logger.LogError(ex, "😈 A rotten gremlin got us. Sorry!");
        return Task.CompletedTask;
    }
}
```

The preceding example can also be implemented as a class.

`CustomErrorBoundary.cs`:

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

namespace BlazorSample;

public class CustomErrorBoundary : ErrorBoundary
{
    [Inject]
    ILogger<CustomErrorBoundary> Logger {  get; set; } = default!;

    protected override Task OnErrorAsync(Exception ex)
    {
        Logger.LogError(ex, "😈 A rotten gremlin got us. Sorry!");
        return Task.CompletedTask;
    }
}
```

Either of the preceding implementations used in a component:

```razor
<CustomErrorBoundary>
    ...
</CustomErrorBoundary>
```

## Alternative global exception handling

The approach described in this section applies to Blazor Server, Blazor WebAssembly, and Blazor Web Apps that adopt a global interactive render mode (`InteractiveServer`, `InteractiveWebAssembly`, or `InteractiveAuto`). The approach doesn't work with Blazor Web Apps that adopt per-page/component render modes or static server-side rendering (static SSR) because the approach relies on a `CascadingValue`/`CascadingParameter`, which don't work across render mode boundaries or with components that adopt static SSR.

An alternative to using Error boundaries (`Microsoft.AspNetCore.Components.Web.ErrorBoundary`) is to pass a custom error component as a `CascadingValue` to child components. An advantage of using a component over using an injected service or a custom logger implementation is that a cascaded component can render content and apply CSS styles when an error occurs.

The following `ProcessError` component example merely logs errors, but methods of the component can process errors in any way required by the app, including through the use of multiple error processing methods.

`ProcessError.razor`:

```razor
@inject ILogger<ProcessError> Logger

<CascadingValue Value="this" IsFixed="true">
    @ChildContent
</CascadingValue>

@code {
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    public void LogError(Exception ex)
    {
        Logger.LogError("ProcessError.LogError: {Type} Message: {Message}", 
            ex.GetType(), ex.Message);

        // Call StateHasChanged if LogError directly participates in 
        // rendering. If LogError only logs or records the error,
        // there's no need to call StateHasChanged.
        //StateHasChanged();
    }
}
```

> **Note:**
> For more information on `Microsoft.AspNetCore.Components.RenderFragment`, see ASP.NET Core Razor components.
>
> `Microsoft.AspNetCore.Components.CascadingValue`1.IsFixed` is used to indicate that a cascading parameter doesn't change after initialization.

When using this approach in a Blazor Web App, open the `Routes` component and wrap the `Microsoft.AspNetCore.Components.Routing.Router` component (`<Router>...</Router>`) with the `ProcessError` component. This permits the `ProcessError` component to cascade down to any component of the app where the `ProcessError` component is received as a `CascadingParameter`.

In `Routes.razor`:

```razor
<ProcessError>
    <Router ...>
        ...
    </Router>
</ProcessError>
```

When using this approach in a Blazor Server or Blazor WebAssembly app, open the `App` component, wrap the `Microsoft.AspNetCore.Components.Routing.Router` component (`<Router>...</Router>`) with the `ProcessError` component. This permits the `ProcessError` component to cascade down to any component of the app where the `ProcessError` component is received as a `CascadingParameter`.

In `App.razor`:

```razor
<ProcessError>
    <Router ...>
        ...
    </Router>
</ProcessError>
```

To process errors in a component:

* Designate the `ProcessError` component as a `CascadingParameter` in the `@code` block. In an example `Counter` component in an app based on a Blazor project template, add the following `ProcessError` property:

  ```csharp
  [CascadingParameter]
  private ProcessError? ProcessError { get; set; }
  ```

* Call an error processing method in any `catch` block with an appropriate exception type. The example `ProcessError` component only offers a single `LogError` method, but the error processing component can provide any number of error processing methods to address alternative error processing requirements throughout the app. The following `Counter` component `@code` block example includes the `ProcessError` cascading parameter and traps an exception for logging when the count is greater than five:

  ```razor
  @code {
      private int currentCount = 0;

      [CascadingParameter]
      private ProcessError? ProcessError { get; set; }

      private void IncrementCount()
      {
          try
          {
              currentCount++;

              if (currentCount > 5)
              {
                  throw new InvalidOperationException("Current count is over five!");
              }
          }
          catch (Exception ex)
          {
              ProcessError?.LogError(ex);
          }
      }
  }
  ```

The logged error:

> :::no-loc text="fail: {COMPONENT NAMESPACE}.ProcessError[0]":::
> :::no-loc text="ProcessError.LogError: System.InvalidOperationException Message: Current count is over five!":::

If the `LogError` method directly participates in rendering, such as showing a custom error message bar or changing the CSS styles of the rendered elements, call `StateHasChanged` at the end of the `LogError` method to rerender the UI.

Because the approaches in this section handle errors with a `try-catch` statement, an app's SignalR connection between the client and server isn't broken when an error occurs and the circuit remains alive. Other unhandled exceptions remain fatal to a circuit. For more information, see the section on how a circuit reacts to unhandled exceptions.
