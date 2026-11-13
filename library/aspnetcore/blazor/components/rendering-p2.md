---
title: "ASP.NET Core Razor component rendering (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/rendering.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component rendering (part 2 of 2)

## `StateHasChanged`

Calling `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` enqueues a rerender to occur when the app's main thread is free.

Components are enqueued for rendering, and they aren't enqueued again if there's already a pending rerender. If a component calls `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` five times in a row in a loop, the component only renders once. This behavior is encoded in `Microsoft.AspNetCore.Components.ComponentBase`, which checks first if it has queued a rerender before enqueuing an additional one.

A component can render multiple times during the same cycle, which commonly occurs when a component has children that interact with each other:

* A parent component renders several children.
* Child components render and trigger an update on the parent.
* A parent component rerenders with new state.

This design allows for `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` to be called when necessary without the risk of introducing unnecessary rendering. You can always take control of this behavior in individual components by implementing `Microsoft.AspNetCore.Components.IComponent` directly and manually handling when the component renders.

Consider the following `IncrementCount` method that increments a count, calls `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*`, and increments the count again:

```csharp
private void IncrementCount()
{
    currentCount++;
    StateHasChanged();
    currentCount++;
}
```

Stepping through the code in the debugger, you might think that the count updates in the UI for the first `currentCount++` execution immediately after `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is called. However, the UI doesn't show an updated count at that point due to the synchronous processing taking place for this method's execution. There's no opportunity for the renderer to render the component until after the event handler is finished. The UI displays increases for both `currentCount++` executions *in a single render*.

If you await something between the `currentCount++` lines, the awaited call gives the renderer a chance to render. This has led to some developers calling `System.Threading.Tasks.Task.Delay*` with a one millisecond delay in their components to allow a render to occur, but we don't recommend arbitrarily slowing down an app to enqueue a render.

The best approach is to await `System.Threading.Tasks.Task.Yield*`, which forces the component to process code asynchronously and render during the current batch with a second render in a separate batch after the yielded task runs the continuation.

Consider the following revised `IncrementCount` method, which updates the UI twice because the render enqueued by `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is performed when the task is yielded with the call to `System.Threading.Tasks.Task.Yield*`:

```csharp
private async Task IncrementCount()
{
    currentCount++;
    StateHasChanged();
    await Task.Yield();
    currentCount++;
}
```

Be careful not to call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` unnecessarily, which is a common mistake that imposes unnecessary rendering costs. Code shouldn't need to call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` when:

* Routinely handling events, whether synchronously or asynchronously, since `Microsoft.AspNetCore.Components.ComponentBase` triggers a render for most routine event handlers.
* Implementing typical lifecycle logic, such as `OnInitialized` or `OnParametersSetAsync`, whether synchronously or asynchronously, since `Microsoft.AspNetCore.Components.ComponentBase` triggers a render for typical lifecycle events.

However, it might make sense to call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` in the cases described in the following sections of this article:

* An asynchronous handler involves multiple asynchronous phases
* Receiving a call from something external to the Blazor rendering and event handling system
* To render component outside the subtree that is rerendered by a particular event

### An asynchronous handler involves multiple asynchronous phases

Due to the way that tasks are defined in .NET, a receiver of a `System.Threading.Tasks.Task` can only observe its final completion, not intermediate asynchronous states. Therefore, `Microsoft.AspNetCore.Components.ComponentBase` can only trigger rerendering when the `System.Threading.Tasks.Task` is first returned and when the `System.Threading.Tasks.Task` finally completes. The framework can't know to rerender a component at other intermediate points, such as when an `System.Collections.Generic.IAsyncEnumerable`1` returns data in a series of intermediate `Task`s. If you want to rerender at intermediate points, call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` at those points.

Consider the following `CounterState1` component, which updates the count four times each time the `IncrementCount` method executes:

* Automatic renders occur after the first and last increments of `currentCount`.
* Manual renders are triggered by calls to `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` when the framework doesn't automatically trigger rerenders at intermediate processing points where `currentCount` is incremented.

`CounterState1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CounterState1.razor._
### Receiving a call from something external to the Blazor rendering and event handling system

`Microsoft.AspNetCore.Components.ComponentBase` only knows about its own lifecycle methods and Blazor-triggered events. `Microsoft.AspNetCore.Components.ComponentBase` doesn't know about other events that may occur in code. For example, any C# events raised by a custom data store are unknown to Blazor. In order for such events to trigger rerendering to display updated values in the UI, call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*`.

Consider the following `CounterState2` component that uses `System.Timers.Timer` to update a count at a regular interval and calls `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` to update the UI:

* `OnTimerCallback` runs outside of any Blazor-managed rendering flow or event notification. Therefore, `OnTimerCallback` must call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` because Blazor isn't aware of the changes to `currentCount` in the callback.
* The component implements `System.IDisposable`, where the `System.Timers.Timer` is disposed when the framework calls the `Dispose` method. For more information, see ASP.NET Core Razor component disposal.

Because the callback is invoked outside of Blazor's synchronization context, the component must wrap the logic of `OnTimerCallback` in `Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync*` to move it onto the renderer's synchronization context. This is equivalent to marshalling to the UI thread in other UI frameworks. `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` can only be called from the renderer's synchronization context and throws an exception otherwise:

> :::no-loc text="System.InvalidOperationException: 'The current thread is not associated with the Dispatcher. Use InvokeAsync() to switch execution to the Dispatcher when triggering rendering or component state.'":::

`CounterState2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CounterState2.razor._
### To render a component outside the subtree that's rerendered by a particular event

The UI might involve:

1. Dispatching an event to one component.
1. Changing some state.
1. Rerendering a completely different component that isn't a descendant of the component receiving the event.

One way to deal with this scenario is to provide a *state management* class, often as a dependency injection (DI) service, injected into multiple components. When one component calls a method on the state manager, the state manager raises a C# event that's then received by an independent component.

For approaches to manage state, see the following resources:

* Bind across more than two components using data bindings.
* Pass data across a component hierarchy using cascading values and parameters.
* In-memory state container service section of the *State management* overview.

For the state manager approach, C# events are outside the Blazor rendering pipeline. Call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` on other components you wish to rerender in response to the state manager's events.

The state manager approach is similar to the earlier case with `System.Timers.Timer` in the previous section. Since the execution call stack typically remains on the renderer's synchronization context, calling `Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync*` isn't normally required. Calling `Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync*` is only required if the logic escapes the synchronization context, such as calling `System.Threading.Tasks.Task.ContinueWith*` on a `System.Threading.Tasks.Task` or awaiting a `System.Threading.Tasks.Task` with `ConfigureAwait(false)`. For more information, see the Receiving a call from something external to the Blazor rendering and event handling system section.

## WebAssembly loading progress indicator for Blazor Web Apps

An app can adopt custom code to create a loading progress indicator. For more information, see ASP.NET Core Blazor startup.
