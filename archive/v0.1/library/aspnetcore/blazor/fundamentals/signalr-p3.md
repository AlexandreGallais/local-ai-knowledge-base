---
title: "ASP.NET Core Blazor SignalR guidance (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/signalr.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor SignalR guidance (part 3 of 4)

## Configure SignalR timeouts and Keep-Alive on the client

Configure the following values for the client:

* `withServerTimeout`: Configures the server timeout in milliseconds. If this timeout elapses without receiving any messages from the server, the connection is terminated with an error. The default timeout value is 30 seconds. The server timeout should be at least double the value assigned to the Keep-Alive interval (`withKeepAliveInterval`).
* `withKeepAliveInterval`: Configures the Keep-Alive interval in milliseconds (default interval at which to ping the server). This setting allows the server to detect hard disconnects, such as when a client unplugs their computer from the network. The ping occurs at most as often as the server pings. If the server pings every five seconds, assigning a value lower than `5000` (5 seconds) pings every five seconds. The default value is 15 seconds. The Keep-Alive interval should be less than or equal to half the value assigned to the server timeout (`withServerTimeout`).

The following example for the `App.razor` file (Blazor Web App) shows the assignment of default values.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.withServerTimeout(30000).withKeepAliveInterval(15000);
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

The following example for the `Pages/_Host.cshtml` file (Blazor Server, all versions except ASP.NET Core in .NET 6) or `Pages/_Layout.cshtml` file (Blazor Server, ASP.NET Core in .NET 6).

When creating a hub connection in a component, set the `Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout` (default: 30 seconds) and `Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval` (default: 15 seconds) on the `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. Set the `Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout` (default: 15 seconds) on the built `Microsoft.AspNetCore.SignalR.Client.HubConnection`. The following example shows the assignment of default values:

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .WithServerTimeout(TimeSpan.FromSeconds(30))
        .WithKeepAliveInterval(TimeSpan.FromSeconds(15))
        .Build();

    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(15);

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```

When changing the values of the server timeout (`Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout`) or the Keep-Alive interval (`Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval`):

* The server timeout should be at least double the value assigned to the Keep-Alive interval.
* The Keep-Alive interval should be less than or equal to half the value assigned to the server timeout.

For more information, see the *Global deployment and connection failures* section of Host and deploy ASP.NET Core server-side Blazor apps.

## Adjust the server-side reconnection retry count and interval

To adjust the reconnection retry count and interval, set the number of retries (`maxRetries`) and period in milliseconds permitted for each retry attempt (`retryIntervalMilliseconds`).

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      reconnectionOptions: {
        maxRetries: 3,
        retryIntervalMilliseconds: 2000
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

When the user navigates back to an app with a disconnected circuit, reconnection is attempted immediately rather than waiting for the duration of the next reconnect interval. This behavior seeks to resume the connection as quickly as possible for the user.

The default reconnect timing uses a computed backoff strategy. The first several reconnection attempts occur in rapid succession before computed delays are introduced between attempts. The default logic for computing the retry interval is an implementation detail subject to change without notice, but you can find the default logic that the Blazor framework uses in the `computeDefaultRetryInterval` function (reference source).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Customize the retry interval behavior by specifying a function to compute the retry interval. In the following exponential backoff example, the number of previous reconnection attempts is multiplied by 1,000 ms to calculate the retry interval. When the count of previous attempts to reconnect (`previousAttempts`) is greater than the maximum retry limit (`maxRetries`), `null` is assigned to the retry interval (`retryIntervalMilliseconds`) to cease further reconnection attempts:

```javascript
Blazor.start({
  circuit: {
    reconnectionOptions: {
      retryIntervalMilliseconds: (previousAttempts, maxRetries) => 
        previousAttempts >= maxRetries ? null : previousAttempts * 1000
    },
  },
});
```

An alternative is to specify the exact sequence of retry intervals. After the last specified retry interval, retries stop because the `retryIntervalMilliseconds` function returns `undefined`:

```javascript
Blazor.start({
  circuit: {
    reconnectionOptions: {
      retryIntervalMilliseconds: 
        Array.prototype.at.bind([0, 1000, 2000, 5000, 10000, 15000, 30000]),
    },
  },
});
```

For more information on Blazor startup, see ASP.NET Core Blazor startup.

## Control when the reconnection UI appears

Controlling when the reconnection UI appears can be useful in the following situations:

* A deployed app frequently displays the reconnection UI due to ping timeouts caused by internal network or Internet latency, and you would like to increase the delay.
* An app should report to users that the connection has dropped sooner, and you would like to shorten the delay.

The timing of the appearance of the reconnection UI is influenced by adjusting the Keep-Alive interval and timeouts on the client. The reconnection UI appears when the server timeout is reached on the client (`withServerTimeout`, Client configuration section). However, changing the value of `withServerTimeout` requires changes to other Keep-Alive, timeout, and handshake settings described in the following guidance.

As general recommendations for the guidance that follows:

* The Keep-Alive interval should match between client and server configurations.
* Timeouts should be at least double the value assigned to the Keep-Alive interval.

### Server configuration

Set the following:

* `Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval` (default: 30 seconds): The time window clients have to send a message before the server closes the connection.
* `Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout` (default: 15 seconds): The interval used by the server to timeout incoming handshake requests by clients.
* `Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval` (default: 15 seconds): The interval used by the server to send keep alive pings to connected clients. Note that there is also a Keep-Alive interval setting on the client, which should match the server's value.

The `Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval` and `Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout` can be increased, and the `Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval` can remain the same. The important consideration is that if you change the values, make sure that the timeouts are at least double the value of the Keep-Alive interval and that the Keep-Alive interval matches between server and client. For more information, see the Configure SignalR timeouts and Keep-Alive on the client section.

In the following example:

* The `Microsoft.AspNetCore.SignalR.HubOptions.ClientTimeoutInterval` is increased to 60 seconds (default value: 30 seconds).
* The `Microsoft.AspNetCore.SignalR.HubOptions.HandshakeTimeout` is increased to 30 seconds (default value: 15 seconds).
* The `Microsoft.AspNetCore.SignalR.HubOptions.KeepAliveInterval` isn't set in developer code and uses its default value of 15 seconds. Decreasing the value of the Keep-Alive interval increases the frequency of communication pings, which increases the load on the app, server, and network. Care must be taken to avoid introducing poor performance when lowering the Keep-Alive interval.

**Blazor Web App** (.NET 8 or later) in the server project's `Program` file:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents()
    .AddHubOptions(options =>
{
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(60);
    options.HandshakeTimeout = TimeSpan.FromSeconds(30);
});
```

**Blazor Server** in the `Program` file:

```csharp
builder.Services.AddServerSideBlazor()
    .AddHubOptions(options =>
    {
        options.ClientTimeoutInterval = TimeSpan.FromSeconds(60);
        options.HandshakeTimeout = TimeSpan.FromSeconds(30);
    });
```

For more information, see the Server-side circuit handler options section.

### Client configuration

Set the following:

* `withServerTimeout` (default: 30 seconds): Configures the server timeout, specified in milliseconds, for the circuit's hub connection.
* `withKeepAliveInterval` (default: 15 seconds): The interval, specified in milliseconds, at which the connection sends Keep-Alive messages.

The server timeout can be increased, and the Keep-Alive interval can remain the same. The important consideration is that if you change the values, make sure that the server timeout is at least double the value of the Keep-Alive interval and that the Keep-Alive interval values match between server and client. For more information, see the Configure SignalR timeouts and Keep-Alive on the client section.

In the following startup configuration example (location of the Blazor script), a custom value of 60 seconds is used for the server timeout. The Keep-Alive interval (`withKeepAliveInterval`) isn't set and uses its default value of 15 seconds.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.withServerTimeout(60000);
      }
    }
  });
</script>
```

When creating a hub connection in a component, set the server timeout (`Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.WithServerTimeout*`, default: 30 seconds) on the `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. Set the `Microsoft.AspNetCore.SignalR.Client.HubConnection.HandshakeTimeout` (default: 15 seconds) on the built `Microsoft.AspNetCore.SignalR.Client.HubConnection`. Confirm that the timeouts are at least double the Keep-Alive interval (`Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.WithKeepAliveInterval*`/`Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval`) and that the Keep-Alive value matches between server and client.

The following example is based on the `Index` component in the SignalR with Blazor tutorial. The server timeout is increased to 60 seconds, and the handshake timeout is increased to 30 seconds. The Keep-Alive interval isn't set and uses its default value of 15 seconds.

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .WithServerTimeout(TimeSpan.FromSeconds(60))
        .Build();

    hubConnection.HandshakeTimeout = TimeSpan.FromSeconds(30);

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```

## Modify the server-side reconnection handler

The reconnection handler's circuit connection events can be modified for custom behaviors, such as:

* To notify the user if the connection is dropped.
* To perform logging (from the client) when a circuit is connected.

To modify the connection events, register callbacks for the following connection changes:

* Dropped connections use `onConnectionDown`.
* Established/re-established connections use `onConnectionUp`.

**Both `onConnectionDown` and `onConnectionUp` must be specified.**

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      reconnectionHandler: {
        onConnectionDown: (options, error) => console.error(error),
        onConnectionUp: () => console.log("Up, up, and away!")
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.
