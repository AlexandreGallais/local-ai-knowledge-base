---
title: "ASP.NET Core Blazor SignalR guidance (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/signalr.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor SignalR guidance (part 4 of 4)

## Programmatic control of reconnection and reload behavior

Blazor automatically attempts reconnection and refreshes the browser when reconnection fails. For more information, see the Adjust the server-side reconnection retry count and interval section. However, developer code can implement a custom reconnection handler to take full control of reconnection behavior.

`App.razor`:

```html
<div id="reconnect-modal" style="display: none;"></div>
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script src="boot.js"></script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

Create the following `wwwroot/boot.js` file.

```javascript
(() => {
  const maximumRetryCount = 3;
  const retryIntervalMilliseconds = 5000;
  const reconnectModal = document.getElementById('reconnect-modal');
  
  const startReconnectionProcess = () => {
    reconnectModal.style.display = 'block';

    let isCanceled = false;

    (async () => {
      for (let i = 0; i < maximumRetryCount; i++) {
        reconnectModal.innerText = `Attempting to reconnect: ${i + 1} of ${maximumRetryCount}`;

        await new Promise(resolve => setTimeout(resolve, retryIntervalMilliseconds));

        if (isCanceled) {
          return;
        }

        try {
          const result = await Blazor.reconnect();
          if (!result) {
            // The server was reached, but the connection was rejected; reload the page.
            location.reload();
            return;
          }

          // Successfully reconnected to the server.
          return;
        } catch {
          // Didn't reach the server; try again.
        }
      }

      // Retried too many times; reload the page.
      location.reload();
    })();

    return {
      cancel: () => {
        isCanceled = true;
        reconnectModal.style.display = 'none';
      },
    };
  };

  let currentReconnectionProcess = null;

  Blazor.start({
    circuit: {
      reconnectionHandler: {
        onConnectionDown: () => currentReconnectionProcess ??= startReconnectionProcess(),
        onConnectionUp: () => {
          currentReconnectionProcess?.cancel();
          currentReconnectionProcess = null;
        }
      }
    }
  });
})();
```

## Disconnect Blazor's SignalR circuit from the client

Blazor's SignalR circuit is disconnected when the `unload` page event is triggered. To disconnect the circuit for other scenarios on the client, invoke `Blazor.disconnect` in the appropriate event handler. In the following example, the circuit is disconnected when the page is hidden (`pagehide` event):

```javascript
window.addEventListener('pagehide', () => {
  Blazor.disconnect();
});
```

For more information on Blazor startup, see ASP.NET Core Blazor startup.

## Server-side circuit handler

You can define a *circuit handler*, which allows running code on changes to the state of a user's circuit. A circuit handler is implemented by deriving from `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler` and registering the class in the app's service container. The following example of a circuit handler tracks open SignalR connections.

`TrackingCircuitHandler.cs`:

_Code sample not included: ~/../blazor-samples/7.0/BlazorSample_Server/TrackingCircuitHandler.cs._
Circuit handlers are registered using DI. Scoped instances are created per instance of a circuit. Using the `TrackingCircuitHandler` in the preceding example, a singleton service is created because the state of all circuits must be tracked.

In the `Program` file:

```csharp
builder.Services.AddSingleton<CircuitHandler, TrackingCircuitHandler>();
```

If a custom circuit handler's methods throw an unhandled exception, the exception is fatal to the circuit. To tolerate exceptions in a handler's code or called methods, wrap the code in one or more `try-catch` statements with error handling and logging.

When a circuit ends because a user has disconnected and the framework is cleaning up the circuit state, the framework disposes of the circuit's DI scope. Disposing the scope disposes any circuit-scoped DI services that implement `System.IDisposable`. If any DI service throws an unhandled exception during disposal, the framework logs the exception. For more information, see ASP.NET Core Blazor dependency injection.

## Server-side circuit handler to capture users for custom services

Use a `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler` to capture a user from the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` and set that user in a service. For more information and example code, see ASP.NET Core Blazor additional server-side security scenarios.

## Closure of circuits when there are no remaining Interactive Server components

Interactive Server components handle web UI events using a real-time connection with the browser called a circuit. A circuit and its associated state are created when a root Interactive Server component is rendered. The circuit is closed when there are no remaining Interactive Server components on the page, which frees up server resources.

## Start the SignalR circuit at a different URL

Prevent automatically starting the app by adding `autostart="false"` to the Blazor `<script>` tag (location of the Blazor start script). Manually establish the circuit URL using `Blazor.start`. The following examples use the path `/signalr`.

```diff
- <script src="_framework/blazor.web.js"></script>
+ <script src="_framework/blazor.web.js" autostart="false"></script>
+ <script>
+   Blazor.start({
+     circuit: {
+       configureSignalR: builder => builder.withUrl("/signalr")
+     },
+   });
+ </script>
```

Add the following `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` call with the hub path to the middleware processing pipeline in the server app's `Program` file.

Blazor Web Apps:

```csharp
app.MapBlazorHub("/signalr");
```

Blazor Server:

Leave the existing call to `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` in the file and add a new call to `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` with the path:

```diff
app.MapBlazorHub();
+ app.MapBlazorHub("/signalr");
```

## Impersonation for Windows Authentication

Authenticated hub connections (`Microsoft.AspNetCore.SignalR.Client.HubConnection`) are created with `Microsoft.AspNetCore.Http.Connections.Client.HttpConnectionOptions.UseDefaultCredentials` to indicate the use of default credentials for HTTP requests. For more information, see SignalR authentication and authorization.

When the app is running in IIS Express as the signed-in user under Windows Authentication, which is likely the user's personal or work account, the default credentials are those of the signed-in user.

When the app is published to IIS, the app runs under the *Application Pool Identity*. The `Microsoft.AspNetCore.SignalR.Client.HubConnection` connects as the IIS "user" account hosting the app, not the user accessing the page.

Implement *impersonation* with the `Microsoft.AspNetCore.SignalR.Client.HubConnection` to use the identity of the browsing user.

In the following example:

* The user from the authentication state provider is cast to a `System.Security.Principal.WindowsIdentity`.
* The identity's access token is passed to `System.Security.Principal.WindowsIdentity.RunImpersonatedAsync*` with the code that builds and starts the `Microsoft.AspNetCore.SignalR.Client.HubConnection`.

```csharp
protected override async Task OnInitializedAsync()
{
    var authState = await AuthenticationStateProvider.GetAuthenticationStateAsync();

    if (authState?.User.Identity is not null)
    {
        var user = authState.User.Identity as WindowsIdentity;

        if (user is not null)
        {
            await WindowsIdentity.RunImpersonatedAsync(user.AccessToken, 
                async () =>
                {
                    hubConnection = new HubConnectionBuilder()
                        .WithUrl(NavManager.ToAbsoluteUri("/hub"), config =>
                        {
                            config.UseDefaultCredentials = true;
                        })
                        .WithAutomaticReconnect()
                        .Build();

                        hubConnection.On<string>("name", userName =>
                        {
                            name = userName;
                            InvokeAsync(StateHasChanged);
                        });

                        await hubConnection.StartAsync();
                });
        }
    }
}
```

In the preceding code, `NavManager` is a `Microsoft.AspNetCore.Components.NavigationManager`, and `AuthenticationStateProvider` is an `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` service instance (`AuthenticationStateProvider` documentation).

## Configure the hub URL endpoint for a loopback connection

*This section only applies to server-side Blazor apps.*

If HTTP requests in a server-side Blazor app are failing to connect to itself when using `Microsoft.AspNetCore.Components.NavigationManager.ToAbsoluteUri*`, you might have a load balancer or proxy that isn't expecting requests from the backend server. In this scenario, you can try to change the hub URL that the client is using to connect directly to the backend server.

The following example:

* Configures the hub URL using `System.UriBuilder` and passes it to `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderHttpExtensions.WithUrl*`.
* Sets the URI based on the server's address (`Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature`) and machine name (`System.Environment.MachineName`).

```razor
@using System.Net
@using System.Net.Sockets
@using Microsoft.AspNetCore.Hosting.Server
@using Microsoft.AspNetCore.Hosting.Server.Features
@using Microsoft.AspNetCore.SignalR.Client
@inject IHostEnvironment Environment
@inject IServer Server

...

@code {
    private HubConnection? hubConnection;

    protected override async Task OnInitializedAsync()
    {
        var serverAddress = Server.Features
           .Get<IServerAddressesFeature>()?
           .Addresses
           .FirstOrDefault(a => a.StartsWith("http://") || a.StartsWith("https://"));

        if (serverAddress is null)
        {
            throw new InvalidOperationException("No server address available.");
        }

        var uri = new UriBuilder(serverAddress + "/chathub");

        // If Kestrel is bound to a wildcard, substitute a real IP
        if (uri.Host is "0.0.0.0" or "[::]" or "+" or "*")
        {
            var addresses = await Dns.GetHostAddressesAsync(
                System.Environment.MachineName);
            var ip = addresses.FirstOrDefault(a =>
                a.AddressFamily == AddressFamily.InterNetwork
                && !IPAddress.IsLoopback(a));

            if (ip is null)
            {
                throw new InvalidOperationException("No suitable IP address.");
            }

            uri.Host = ip.ToString();
        }

        hubConnection = new HubConnectionBuilder()
            .WithUrl(uri.Uri)
            .Build();

        hubConnection.On<ChatMessage>("ReceiveMessage", (message) =>
        {
            ...
        });

        await hubConnection.StartAsync();
    }
}
```

## Additional server-side resources

* Server-side host and deployment guidance: SignalR configuration
* Overview of ASP.NET Core SignalR
* ASP.NET Core SignalR configuration
* Server-side security documentation
  * ASP.NET Core Blazor authentication and authorization
  * ASP.NET Core Blazor authentication and authorization
  * Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering
  * ASP.NET Core Blazor additional server-side security scenarios
* IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps
* Server-side reconnection events and component lifecycle events
* What is Azure SignalR Service?
* Performance guide for Azure SignalR Service
* Publish an ASP.NET Core SignalR app to Azure App Service
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
