---
title: "ASP.NET Core Blazor SignalR guidance (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/signalr.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor SignalR guidance (part 2 of 4)

## Maximum receive message size

*This section only applies to projects that implement SignalR.*

The maximum incoming SignalR message size permitted for hub methods is limited by the `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize` (default: 32 KB). SignalR messages larger than `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize` throw an error. The framework doesn't impose a limit on the size of a SignalR message from the hub to a client.

When SignalR logging isn't set to Debug or Trace, a message size error only appears in the browser's developer tools console:

> Error: Connection disconnected with error 'Error: Server returned an error on close: Connection closed with an error.'.

When SignalR server-side logging is set to Debug or Trace, server-side logging surfaces an `System.IO.InvalidDataException` for a message size error.

`appsettings.Development.json`:

```json
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      ...
      "Microsoft.AspNetCore.SignalR": "Debug"
    }
  }
}
```

Error:

> System.IO.InvalidDataException: The maximum message size of 32768B was exceeded. The message size can be configured in AddHubOptions.

One approach involves increasing the limit by setting `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize` in the `Program` file. The following example sets the maximum receive message size to 64 KB:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents()
    .AddHubOptions(options => options.MaximumReceiveMessageSize = 64 * 1024);
```

Increasing the SignalR incoming message size limit comes at the cost of requiring more server resources, and it increases the risk of Denial of Service (DoS) attacks. Additionally, reading a large amount of content in to memory as strings or byte arrays can also result in allocations that work poorly with the garbage collector, resulting in additional performance penalties.

A better option for reading large payloads is to send the content in smaller chunks and process the payload as a `System.IO.Stream`. This can be used when reading large JavaScript (JS) interop JSON payloads or if JS interop data is available as raw bytes. For an example that demonstrates sending large binary payloads in server-side apps that uses techniques similar to the `InputFile` component, see the Binary Submit sample app and the Blazor `InputLargeTextArea` Component Sample.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Forms that process large payloads over SignalR can also use streaming JS interop directly. For more information, see Call .NET methods from JavaScript functions in ASP.NET Core Blazor. For a forms example that streams `<textarea>` data to the server, see Troubleshoot ASP.NET Core Blazor forms.

Consider the following guidance when developing code that transfers a large amount of data:

* Leverage the native streaming JS interop support to transfer data larger than the SignalR incoming message size limit:
  * Call JavaScript functions from .NET methods in ASP.NET Core Blazor
  * Call .NET methods from JavaScript functions in ASP.NET Core Blazor
  * Form payload example: Troubleshoot ASP.NET Core Blazor forms
* General tips:
  * Don't allocate large objects in JS and C# code.
  * Free consumed memory when the process is completed or cancelled.
  * Enforce the following additional requirements for security purposes:
    * Declare the maximum file or data size that can be passed.
    * Declare the minimum upload rate from the client to the server.
  * After the data is received by the server, the data can be:
    * Temporarily stored in a memory buffer until all of the segments are collected.
    * Consumed immediately. For example, the data can be stored immediately in a database or written to disk as each segment is received.

## Blazor server-side Hub endpoint route configuration

In the `Program` file, call `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` to map the Blazor `Microsoft.AspNetCore.SignalR.Hub` to the app's default path. The Blazor script (`blazor.*.js`) automatically points to the endpoint created by `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*`.

## Reflect the server-side connection state in the UI

If the client detects a lost connection (circuit) to the server, a default UI is displayed to the user while the client attempts to reconnect:

If reconnection fails, the user is instructed to retry or reload the page:

If reconnection succeeds, user state is often lost. Custom code can be added to any component to save and reload user state across connection failures. For more information, see ASP.NET Core Blazor state management overview and ASP.NET Core Blazor server-side state management.

To create UI elements that track reconnection state, the following table describes:

* A set of `components-reconnect-*` CSS classes (**CSS class** column) that are set or unset by Blazor on an element with an `id` of `components-reconnect-modal`.
* A `components-reconnect-state-changed` event (**Event** column) that indicates a reconnection status change.

| CSS class | Event | Indicates… |
| --- | --- | --- |
| `components-reconnect-show` | `show` | A lost connection. The client is attempting to reconnect. The reconnection modal is shown. |
| `components-reconnect-paused` | `paused` | The connection is paused. For more information, see Pause and resume circuits. |
| `components-reconnect-hide` | `hide` | An active connection is re-established to the server. The reconnection model is closed. |
| `components-reconnect-retrying` | `retrying` | The client is attempting to reconnect. |
| `components-reconnect-failed` | `failed` | Reconnection failed, probably due to a network failure. |
| `components-reconnect-rejected` | `rejected` | Reconnection rejected. |

When the reconnection state change in `components-reconnect-state-changed` is `failed`, call `Blazor.reconnect()` in JavaScript to attempt reconnection.

When the reconnection state change is `rejected`, the server was reached but refused the connection, and the user's state on the server is lost. To reload the app, call `location.reload()` in JavaScript. This connection state may result when:

* A crash in the server-side circuit occurs.
* The client is disconnected long enough for the server to drop the user's state. Instances of the user's components are disposed.
* The server is restarted, or the app's worker process is recycled.

The developer adds an event listener on the reconnect modal element to monitor and react to reconnection state changes, as seen in the following example:

```javascript
const reconnectModal = document.getElementById("components-reconnect-modal");
reconnectModal.addEventListener("components-reconnect-state-changed", 
  handleReconnectStateChanged);

function handleReconnectStateChanged(event) {
  if (event.detail.state === "show") {
    reconnectModal.showModal();
  } else if (event.detail.state === "hide") {
    reconnectModal.close();
  } else if (event.detail.state === "failed") {
    Blazor.reconnect();
  } else if (event.detail.state === "rejected") {
    location.reload();
  }
}
```

An element with an `id` of `components-reconnect-max-retries` displays the maximum number of reconnect retries:

```html
<span id="components-reconnect-max-retries"></span>
```

An element with an `id` of `components-reconnect-current-attempt` displays the current reconnect attempt:

```html
<span id="components-reconnect-current-attempt"></span>
```

An element with an `id` of `components-seconds-to-next-attempt` displays the number of seconds to the next reconnection attempt:

```html
<span id="components-seconds-to-next-attempt"></span>
```

The Blazor Web App project template includes a `ReconnectModal` component (`Components/Layout/ReconnectModal.razor`) with collocated stylesheet and JavaScript files (`ReconnectModal.razor.css`, `ReconnectModal.razor.js`) that can be customized as needed. These files can be examined in the ASP.NET Core reference source or by inspecting an app created from the Blazor Web App project template. The component is added to the project when the project is created in Visual Studio with **Interactive render mode** set to **Server** or **Auto** or created with the .NET CLI with the option `--interactivity server` (default) or `--interactivity auto`.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Server-side rendering

By default, components are prerendered on the server before the client connection to the server is established. For more information, see ASP.NET Core Blazor prerendered state persistence.

## Monitor server-side circuit activity

Monitor inbound circuit activity using the `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler.CreateInboundActivityHandler*` method on `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler`. Inbound circuit activity is any activity sent from the browser to the server, such as UI events or JavaScript-to-.NET interop calls.

For example, you can use a circuit activity handler to detect if the client is idle and log its circuit ID (`Microsoft.AspNetCore.Components.Server.Circuits.Circuit.Id`):

```csharp
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.Options;
using Timer = System.Timers.Timer;

public sealed class IdleCircuitHandler : CircuitHandler, IDisposable
{
    private Circuit? currentCircuit;
    private readonly ILogger logger;
    private readonly Timer timer;

    public IdleCircuitHandler(ILogger<IdleCircuitHandler> logger, 
        IOptions<IdleCircuitOptions> options)
    {
        timer = new Timer
        {
            Interval = options.Value.IdleTimeout.TotalMilliseconds,
            AutoReset = false
        };

        timer.Elapsed += CircuitIdle;
        this.logger = logger;
    }

    private void CircuitIdle(object? sender, System.Timers.ElapsedEventArgs e)
    {
        logger.LogInformation("{CircuitId} is idle", currentCircuit?.Id);
    }

    public override Task OnCircuitOpenedAsync(Circuit circuit, 
        CancellationToken cancellationToken)
    {
        currentCircuit = circuit;

        return Task.CompletedTask;
    }

    public override Func<CircuitInboundActivityContext, Task> CreateInboundActivityHandler(
        Func<CircuitInboundActivityContext, Task> next)
    {
        return context =>
        {
            timer.Stop();
            timer.Start();

            return next(context);
        };
    }

    public void Dispose() => timer.Dispose();
}

public class IdleCircuitOptions
{
    public TimeSpan IdleTimeout { get; set; } = TimeSpan.FromMinutes(5);
}

public static class IdleCircuitHandlerServiceCollectionExtensions
{
    public static IServiceCollection AddIdleCircuitHandler(
        this IServiceCollection services, 
        Action<IdleCircuitOptions> configureOptions)
    {
        services.Configure(configureOptions);
        services.AddIdleCircuitHandler();

        return services;
    }

    public static IServiceCollection AddIdleCircuitHandler(
        this IServiceCollection services)
    {
        services.AddScoped<CircuitHandler, IdleCircuitHandler>();

        return services;
    }
}
```

Register the service in the `Program` file. The following example configures the default idle timeout of five minutes to five seconds in order to test the preceding `IdleCircuitHandler` implementation:

```csharp
builder.Services.AddIdleCircuitHandler(options => 
    options.IdleTimeout = TimeSpan.FromSeconds(5));
```

Circuit activity handlers also provide an approach for accessing scoped Blazor services from other non-Blazor dependency injection (DI) scopes. For more information and examples, see:

* ASP.NET Core Blazor dependency injection
* ASP.NET Core Blazor additional server-side security scenarios

## Blazor startup

Configure the manual start of Blazor's SignalR circuit in the `App.razor` file of a Blazor Web App:

* Add an `autostart="false"` attribute to the `<script>` tag for the `blazor.*.js` script.
* Place a script that calls `Blazor.start()` after the Blazor script is loaded and inside the closing `</body>` tag.

When `autostart` is disabled, any aspect of the app that doesn't depend on the circuit works normally. For example, client-side routing is operational. However, any aspect that depends on the circuit isn't operational until `Blazor.start()` is called. App behavior is unpredictable without an established circuit. For example, component methods fail to execute while the circuit is disconnected.

For more information, including how to initialize Blazor when the document is ready and how to chain to a JS `Promise`, see ASP.NET Core Blazor startup.
