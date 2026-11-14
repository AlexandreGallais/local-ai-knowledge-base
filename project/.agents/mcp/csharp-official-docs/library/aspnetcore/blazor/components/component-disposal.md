---
title: "ASP.NET Core Razor component disposal"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/component-disposal.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component disposal

This article explains the ASP.NET Core Razor component disposal process with `System.IDisposable` and `System.IAsyncDisposable`.

If a component implements `System.IDisposable` or `System.IAsyncDisposable`, the framework calls for resource disposal when the component is removed from the UI. Don't rely on the exact timing of when these methods are executed. For example, `System.IAsyncDisposable` can be triggered before or after an asynchronous `System.Threading.Tasks.Task` awaited in `OnInitalizedAsync` or `OnParametersSetAsync` is called or completes. Also, object disposal code shouldn't assume that objects created during initialization or other lifecycle methods exist.

Components shouldn't need to implement `System.IDisposable` and `System.IAsyncDisposable` simultaneously. If both are implemented, the framework only executes the asynchronous overload.

Developer code must ensure that `System.IAsyncDisposable` implementations don't take a long time to complete.

For more information, see the introductory remarks of ASP.NET Core Blazor synchronization context.

## Disposal of JavaScript interop object references

Examples throughout the JavaScript (JS) interop articles demonstrate typical object disposal patterns:

* When calling JS from .NET, as described in Call JavaScript functions from .NET methods in ASP.NET Core Blazor, dispose any created `Microsoft.JSInterop.IJSObjectReference`/`Microsoft.JSInterop.IJSInProcessObjectReference`/`Microsoft.JSInterop.Implementation.JSObjectReference` either from .NET or from JS to avoid leaking JS memory.

* When calling .NET from JS, as described in Call .NET methods from JavaScript functions in ASP.NET Core Blazor, dispose any created `Microsoft.JSInterop.DotNetObjectReference` either from .NET or from JS to avoid leaking .NET memory.

JS interop object references are implemented as a map keyed by an identifier on the side of the JS interop call that creates the reference. When object disposal is initiated from either the .NET or JS side, Blazor removes the entry from the map, and the object can be garbage collected as long as no other strong reference to the object is present.

At a minimum, always dispose objects created on the .NET side to avoid leaking .NET managed memory.

## DOM cleanup tasks during component disposal

For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

For guidance on `Microsoft.JSInterop.JSDisconnectedException` when a circuit is disconnected, see ASP.NET Core Blazor JavaScript interoperability (JS interop). For general JavaScript interop error handling guidance, see the *JavaScript interop* section in Handle errors in ASP.NET Core Blazor apps.

## Synchronous `IDisposable`

For synchronous disposal tasks, use `System.IDisposable.Dispose*`.

The following component:

* Implements `System.IDisposable` with the `@implements` Razor directive.
* Disposes of `obj`, which is a type that implements `System.IDisposable`.
* A null check is performed because `obj` is created in a lifecycle method (not shown).

```razor
@implements IDisposable

...

@code {
    ...

    public void Dispose()
    {
        obj?.Dispose();
    }
}
```

If a single object requires disposal, a lambda can be used to dispose of the object when `System.IDisposable.Dispose*` is called. The following example appears in the ASP.NET Core Razor component rendering article and demonstrates the use of a lambda expression for the disposal of a `System.Timers.Timer`.

`TimerDisposal1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/TimerDisposal1.razor._
> **Note:**
> In the preceding example, the call to `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is wrapped by a call to `Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync*` because the callback is invoked outside of Blazor's synchronization context. For more information, see ASP.NET Core Razor component rendering.

If the object is created in a lifecycle method, such as `OnInitialized{Async}`, check for `null` before calling `Dispose`.

`TimerDisposal2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/TimerDisposal2.razor._
For more information, see:

* Cleaning up unmanaged resources (.NET documentation)
* Null-conditional operators ?. and ?[]

## Asynchronous `IAsyncDisposable`

For asynchronous disposal tasks, use `System.IAsyncDisposable.DisposeAsync*`.

The following component:

* Implements `System.IAsyncDisposable` with the `@implements` Razor directive.
* Disposes of `obj`, which is an unmanaged type that implements `System.IAsyncDisposable`.
* A null check is performed because `obj` is created in a lifecycle method (not shown).

```razor
@implements IAsyncDisposable

...

@code {
    ...

    public async ValueTask DisposeAsync()
    {
        if (obj is not null)
        {
            await obj.DisposeAsync();
        }
    }
}
```

For more information, see:

* ASP.NET Core Blazor synchronization context
* Cleaning up unmanaged resources (.NET documentation)
* Null-conditional operators ?. and ?[]

## Assignment of `null` to disposed objects

Usually, there's no need to assign `null` to disposed objects after calling `System.IDisposable.Dispose*`/`System.IAsyncDisposable.DisposeAsync*`. Rare cases for assigning `null` include the following:

* If the object's type is poorly implemented and doesn't tolerate repeat calls to `System.IDisposable.Dispose*`/`System.IAsyncDisposable.DisposeAsync*`, assign `null` after disposal to gracefully skip further calls to `System.IDisposable.Dispose*`/`System.IAsyncDisposable.DisposeAsync*`.
* If a long-lived process continues to hold a reference to a disposed object, assigning `null` allows the garbage collector to free the object in spite of the long-lived process holding a reference to it.

These are unusual scenarios. For objects that are implemented correctly and behave normally, there's no point in assigning `null` to disposed objects. In the rare cases where an object must be assigned `null`, we recommend documenting the reason and seeking a solution that prevents the need to assign `null`.

## `StateHasChanged`

> **Note:**
> Calling `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` in `Dispose` and `DisposeAsync` isn't supported. `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` might be invoked as part of tearing down the renderer, so requesting UI updates at that point isn't supported.

## Event handlers

Always unsubscribe event handlers from .NET events. The following Blazor form examples show how to unsubscribe an event handler in the `Dispose` method.

Private field and lambda approach:

```razor
@implements IDisposable

<EditForm ... EditContext="editContext" ...>
    ...
    <button type="submit" disabled="@formInvalid">Submit</button>
</EditForm>

@code {
    ...

    private EventHandler<FieldChangedEventArgs>? fieldChanged;

    protected override void OnInitialized()
    {
        editContext = new(model);

        fieldChanged = (_, __) =>
        {
            ...
        };

        editContext.OnFieldChanged += fieldChanged;
    }

    public void Dispose()
    {
        editContext.OnFieldChanged -= fieldChanged;
    }
}
```

Private method approach:

```razor
@implements IDisposable

<EditForm ... EditContext="editContext" ...>
    ...
    <button type="submit" disabled="@formInvalid">Submit</button>
</EditForm>

@code {
    ...

    protected override void OnInitialized()
    {
        editContext = new(model);
        editContext.OnFieldChanged += HandleFieldChanged;
    }

    private void HandleFieldChanged(object sender, FieldChangedEventArgs e)
    {
        ...
    }

    public void Dispose()
    {
        editContext.OnFieldChanged -= HandleFieldChanged;
    }
}
```

For more information on the `Microsoft.AspNetCore.Components.Forms.EditForm` component and forms, see ASP.NET Core Blazor forms overview and the other forms articles in the *Forms* node.

## Anonymous functions, methods, and expressions

When anonymous functions, methods, or expressions, are used, it isn't necessary to implement `System.IDisposable` and unsubscribe delegates. However, failing to unsubscribe a delegate is a problem **when the object exposing the event outlives the lifetime of the component registering the delegate**. When this occurs, a memory leak results because the registered delegate keeps the original object alive. Therefore, only use the following approaches when you know that the event delegate disposes quickly. When in doubt about the lifetime of objects that require disposal, subscribe a delegate method and properly dispose the delegate as the earlier examples show.

Anonymous lambda method approach (explicit disposal not required):

```csharp
private void HandleFieldChanged(object sender, FieldChangedEventArgs e)
{
    formInvalid = !editContext.Validate();
    StateHasChanged();
}

protected override void OnInitialized()
{
    editContext = new(starship);
    editContext.OnFieldChanged += (s, e) => HandleFieldChanged((editContext)s, e);
}
```

Anonymous lambda expression approach (explicit disposal not required):

```csharp
private ValidationMessageStore? messageStore;

[CascadingParameter]
private EditContext? CurrentEditContext { get; set; }

protected override void OnInitialized()
{
    ...

    messageStore = new(CurrentEditContext);

    CurrentEditContext.OnValidationRequested += (s, e) => messageStore.Clear();
    CurrentEditContext.OnFieldChanged += (s, e) => 
        messageStore.Clear(e.FieldIdentifier);
}
```

The full example of the preceding code with anonymous lambda expressions appears in the ASP.NET Core Blazor advanced form validation article.

For more information, see Cleaning up unmanaged resources and the topics that follow it on implementing the `Dispose` and `DisposeAsync` methods.

## Disposal during JS interop

Trap `Microsoft.JSInterop.JSDisconnectedException` in potential cases where loss of Blazor's SignalR circuit prevents JS interop calls and results an unhandled exception.

For more information, see the following resources:

* JavaScript isolation in JavaScript modules
* JavaScript interop calls without a circuit
