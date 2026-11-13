---
title: "ASP.NET Core Blazor server-side state management (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/state-management/server.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor server-side state management (part 2 of 3)

## Automatic circuit pause on tab inactivity

Auto-pause can pause a circuit when the browser tab becomes hidden, freeing server memory and SignalR connections held by inactive users. It's an opt-in feature provided by the `Microsoft.AspNetCore.Components.Server.AutoPause` package. After adding a package reference, enable the feature by calling `AddAutoPause` when the app's root component is mapped:

```csharp
app.MapRazorComponents<App>()
    .WithBrowserOptions(options => options.AddAutoPause(p => p.HiddenDelay = TimeSpan.FromSeconds(30)));
```

`AddAutoPause` configures an `AutoPauseBrowserOptions` instance with the following properties:

* `Enabled`: Whether auto-pause is enabled. Defaults to `true`, so calling `AddAutoPause` is what enables the feature.
* `HiddenDelay`: The delay after the tab becomes hidden before the circuit pauses. Defaults to two minutes (`TimeSpan.FromMinutes(2)`) and must be greater than `TimeSpan.Zero`.

After the tab is hidden for `HiddenDelay`, the circuit pauses. If the user returns before the delay elapses, the pause doesn't occur.

> **Note:**
> Auto-pause triggers on the Page Visibility API `visibilitychange` event, whose meaning differs by platform:
>
> * On desktop, the tab becomes hidden when the user switches tabs or minimizes the window. The pause timer runs reliably, and the circuit pauses gracefully after the delay.
> * On mobile, the page also becomes hidden when the *whole app* is backgrounded (switching apps, returning to the home screen, or locking the screen), not just when switching browser tabs.
>
> On mobile, the operating system suspends the page's JavaScript shortly after the app is backgrounded (within seconds on Android, up to about 30 seconds on iOS). If `HiddenDelay` is longer than that window, the pause timer never fires, and the circuit is dropped by the OS-initiated disconnect instead of pausing gracefully. The session is still preserved through the normal reconnection and circuit state persistence path, but the client-side veto and deferral logic doesn't run. For this reason, graceful auto-pause isn't guaranteed and isn't a supported scenario on mobile when the app is backgrounded.

The package defers the pause while circuit-owned work is in progress (downloads, uploads, JS interop calls, Web Locks, Picture-in-Picture). It vetoes the pause entirely while focused text `` elements with Blazor `@bind` bindings are edited or audio/video is playing.

For elements without Blazor bindings (for example, `<canvas>`, WebRTC connections, or custom elements), the app is responsible for handling state. Register a circuit handler with an `onCircuitPausing` callback in the Blazor startup configuration:

```razor
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      circuitHandlers: [
        {
          onCircuitPausing: async (signal /* AbortSignal */) => {
            // Example: save canvas state before the pause proceeds.
            const canvas = document.getElementById('drawing-canvas');
            if (canvas) {
              localStorage.setItem('canvasData', canvas.toDataURL());
            }

            // Example: close an active WebRTC connection gracefully.
            if (window.activePeerConnection && !signal.aborted) {
              window.activePeerConnection.close();
              await new Promise(resolve => {
                signal.addEventListener('abort', resolve);
                setTimeout(resolve, 100);
              });
            }
          }
        }
      ]
    }
  });
</script>
```

> **Note:**
> The `` element can't have its value restored after pause/resume due to browser security restrictions. Using `[PersistentState]` on a property bound to a file `` element causes an `InvalidStateError` that crashes the circuit. Instead, capture the file name in a separate property. Because the browser doesn't expose the file name through the native `change` event, read it with a small JS interop helper:
>
> ```razor
> @inject IJSRuntime JS
>
>
> @SelectedFileName
>
> @code {
>     [PersistentState]
>     public string? SelectedFileName { get; set; }
>
>     private async Task HandleFileSelected(ChangeEventArgs e)
>     {
>         SelectedFileName = await JS.InvokeAsync<string>("getFileName", "persist-upload");
>     }
> }
> ```
>
> ```javascript
> window.getFileName = (id) => document.getElementById(id)?.files?.[0]?.name ?? '';
> ```

## Server-triggered circuit pause

A server-side Blazor app that adopts the Interactive Server render mode can implement server-triggered circuit pause, which allows the app to gracefully pause client circuits, preserving client state for seamless reconnection.

This feature is useful in the following scenarios:

* Planned shutdowns and deployments.
* Instance draining.
* App maintenance windows.

`Circuit.RequestCircuitPauseAsync(CancellationToken)` is used to request that the connected client begin the graceful circuit-pause flow. The `CancellationToken` cancels the request before it is accepted by the framework. The method returns `true` if the request was accepted and the client was asked to begin pausing.

When a server-side Blazor application shuts down (for example, during deployment), connected clients lose their SignalR connection. The approach in this section:

* Detects shutdown before the server closes connections.
* Triggers a pause on connected circuits via `Microsoft.AspNetCore.Components.Server.Circuits.Circuit.RequestCircuitPauseAsync`.
* Preserves state using `[PersistentState]` attribute on component properties.

In the following example implementation, the following code files are placed in a `Shutdown` folder at the root of the app:

* `CircuitShutdownService.cs`: A singleton service that coordinates shutdown.
* `ShutdownCircuitHandler.cs`: A scoped service for each active circuit.
* `ShutdownCircuitOptions.cs`: Configuration options.

`Shutdown/ShutdownCircuitOptions.cs`:

```csharp
namespace PauseResumeOnShutdown.Shutdown;

public class ShutdownCircuitOptions
{
    public TimeSpan ShutdownTimeout { get; set; } = TimeSpan.FromSeconds(10);
}
```

Using the following approach, the fact that the code sends the `RequestCircuitPauseAsync` asynchronously doesn't mean that upon returning the value that the client is already paused. It's only a request to pause the client, which the client can defer. That's why the code includes the `System.Threading.Tasks.TaskCompletionSource` (`_shutdownTcs`), which is set when there aren't any circuits connected (all of them are successfully shut down). In case a client requests a deferral longer than the server allows, longer than `ShutdownTimeout`, the client doesn't persist state and experiences a normal connection loss. Other clients that don't defer the pause request have their connections re-established after the app goes back online with state persisted.

`Shutdown/CircuitShutdownService.cs`:

```csharp
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.Options;

namespace PauseResumeOnShutdown.Shutdown;

public class CircuitShutdownService
{
    private readonly ConcurrentDictionary<string, Circuit> 
        _circuits = new();
    private readonly ShutdownCircuitOptions _options;
    private bool _isShuttingDown;
    private TaskCompletionSource _shutdownTcs = new();

    public CircuitShutdownService(IHostApplicationLifetime appLifetime, 
        IOptions<ShutdownCircuitOptions> options)
    {
        _options = options.Value;
        appLifetime.ApplicationStopping.Register(OnApplicationStopping);
    }

    private void OnApplicationStopping()
    {
        _isShuttingDown = true;

        if (_circuits.IsEmpty)
        {
            return;
        }

        var pauseTasks = _circuits.Values
            .Select(c => c.RequestCircuitPauseAsync().AsTask())
            .Append(_shutdownTcs.Task);

        Task.WhenAll(pauseTasks).Wait(_options.ShutdownTimeout);

        _shutdownTcs.Task.Wait(_options.ShutdownTimeout);
    }

    public void Register(string circuitId, Circuit circuit)
    {
        _circuits.TryAdd(circuitId, circuit);
    }

    public void Unregister(string circuitId)
    {
        _circuits.TryRemove(circuitId, out _);

        if (_isShuttingDown && _circuits.IsEmpty)
        {
            _shutdownTcs.TrySetResult();
        }
    }
}
```

`Shutdown/ShutdownCircuitHandler.cs`:

```csharp
using Microsoft.AspNetCore.Components.Server.Circuits;

namespace PauseResumeOnShutdown.Shutdown;

public class ShutdownCircuitHandler(CircuitShutdownService shutdownService) 
    : CircuitHandler
{
    public override Task OnConnectionUpAsync(Circuit circuit, 
        CancellationToken <example-value>)
    {
        shutdownService.Register(circuit.Id, circuit);

        return Task.CompletedTask;
    }

    public override Task OnConnectionDownAsync(Circuit circuit, 
        CancellationToken <example-value>)
    {
        shutdownService.Unregister(circuit.Id);

        return Task.CompletedTask;
    }
}
```

`Program.cs`:

```csharp
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.DependencyInjection.Extensions;
using PauseResumeOnShutdown.Components;
using PauseResumeOnShutdown.Shutdown;

var builder = WebApplication.CreateBuilder(args);

// Increase host shutdown timeout to allow time for pause operations
// Must be greater than `ShutdownTimeout` in `ShutdownCircuitOptions` 
// otherwise the host terminates connections before circuits finish 
// pausing
builder.Host.ConfigureHostOptions(options =>
    options.ShutdownTimeout = TimeSpan.FromSeconds(30));

builder.Services.Configure<ShutdownCircuitOptions>(options =>
    options.ShutdownTimeout = TimeSpan.FromSeconds(10));

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// Register CircuitShutdownService as a singleton
builder.Services.AddSingleton<CircuitShutdownService>();

// Register ShutdownCircuitHandler as a scoped CircuitHandler
builder.Services.TryAddEnumerable(
    ServiceDescriptor.Scoped<CircuitHandler, ShutdownCircuitHandler>());

var app = builder.Build();

// ... rest of pipeline
```

Optionally, to defer pause on the client until critical work completes (for example, an in-flight payment), configure the `onPauseRequested` callback in the Blazor startup configuration. Place the following after the server-side Blazor script reference:

```razor
<script> 
  Blazor.start({
    circuit: {
      onPauseRequested: async () => {
        // Perform any critical cleanup or wait for in-flight operations.
        // Return true to allow the pause or false to reject it.
        return true;
      }
    }
  });
</script>
```

Without the `onPauseRequested` callback, the client pauses immediately when the server requests it.

In a component, use the `[PersistentState]` attribute to persist component state across pause/resume. In the following `Counter` component example, the current count (`CurrentCount`) is preserved across server restarts using the preceding approach:

```razor
@page "/counter"
@rendermode InteractiveServer

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @CurrentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    [PersistentState]
    public int CurrentCount { get; set; }

    private void IncrementCount()
    {
        CurrentCount++;
    }
}
```

For more information on the `[PersistentState]` attribute, see ASP.NET Core Blazor prerendered state persistence.

-->
