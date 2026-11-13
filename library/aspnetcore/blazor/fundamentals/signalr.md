---
title: "ASP.NET Core Blazor SignalR guidance (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/signalr.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor SignalR guidance

-->
-->

This article explains how to configure and manage SignalR connections in Blazor apps.

For general guidance on ASP.NET Core SignalR configuration, see the topics in the Overview of ASP.NET Core SignalR area of the documentation, especially ASP.NET Core SignalR configuration.

Server-side apps use ASP.NET Core SignalR to communicate with the browser. SignalR's hosting and scaling conditions apply to server-side apps.

Blazor works best when using WebSockets as the SignalR transport due to lower latency, reliability, and security. Long Polling is used by SignalR when WebSockets isn't available or when the app is explicitly configured to use Long Polling.

## Azure SignalR Service with stateful reconnect

The Azure SignalR Service with SDK v1.26.1 or later supports SignalR stateful reconnect (`Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderHttpExtensions.WithStatefulReconnect*`).

## WebSocket compression for Interactive Server components

By default, Interactive Server components:

* Enable compression for WebSocket connections. `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.DisableWebSocketCompression` (default: `false`) controls WebSocket compression.

* Adopt a `frame-ancestors` Content Security Policy (CSP) directive set to `'self'`, which is the default and only permits embedding the app in an `` of the origin from which the app is served when compression is enabled or when a configuration for the WebSocket context is provided.

The default `frame-ancestors` CSP can be changed by setting the value of `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy` to `null` if you want to configure the CSP in a centralized way or `'none'` for an even stricter policy. When the `frame-ancestors` CSP is managed in a centralized fashion, care must be taken to apply a policy whenever the first document is rendered. We don't recommend removing the policy completely, as it will make the app vulnerable to attack. For more information, see Enforce a Content Security Policy for ASP.NET Core Blazor and the MDN CSP Guide.

Use `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ConfigureWebSocketAcceptContext` to configure the `Microsoft.AspNetCore.Http.WebSocketAcceptContext` for the WebSocket connections used by the server components. By default, a policy that enables compression and sets a CSP for the frame ancestors defined in `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy` is applied.

Usage examples:

Disable compression by setting `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.DisableWebSocketCompression` to `true`, which reduces the vulnerability of the app to attack but may result in reduced performance:

```csharp
builder.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(o => o.DisableWebSocketCompression = true)
```

When compression is enabled, configure a stricter `frame-ancestors` CSP with a value of `'none'` (single quotes required), which allows WebSocket compression but prevents browsers from embedding the app into an ``:

```csharp
builder.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(o => o.ContentSecurityFrameAncestorsPolicy = "'none'")
```

When compression is enabled, remove the `frame-ancestors` CSP by setting `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy` to `null`. This scenario is only recommended for apps that set the CSP in a centralized way:

```csharp
builder.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(o => o.ContentSecurityFrameAncestorsPolicy = null)
```

> **Important:**
> Browsers apply CSP directives from multiple CSP headers using the strictest policy directive value. Therefore, a developer can't add a weaker `frame-ancestors` policy than `'self'` on purpose or by mistake.
>
> Single quotes are required on the string value passed to `Microsoft.AspNetCore.Components.Server.ServerComponentsEndpointOptions.ContentSecurityFrameAncestorsPolicy`:
>
> ❌Unsupported values: `none`, `self`
>
> ✔️Supported values: `'none'`, `'self'`
>
> Additional options include specifying one or more host sources and scheme sources.

For security implications, see Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering. For more information, see Enforce a Content Security Policy for ASP.NET Core Blazor and CSP: `frame-ancestors` (MDN documentation).

### SignalR `ConfigureConnection` for Interactive Server components

Blazor provides access to configure the underlying SignalR connection options when using Interactive Server components through the `ConfigureConnection` property on `ServerComponentsEndpointOptions`. This enables configuration of `HttpConnectionDispatcherOptions` properties.

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(options =>
    {
        options.ConfigureConnection = dispatcherOptions =>
        {
            dispatcherOptions.CloseOnAuthenticationExpiration = true;
            dispatcherOptions.AllowStatefulReconnects = true;
            dispatcherOptions.ApplicationMaxBufferSize = 1024 * 1024;
        };
    });
```

This provides a clean, type-safe API for configuring SignalR connection settings without needing to inspect endpoint metadata.

## Disable response compression for Hot Reload

When using Hot Reload, disable response compression middleware in the `Development` environment. Whether or not the default code from a project template is used, always call `Microsoft.AspNetCore.Builder.ResponseCompressionBuilderExtensions.UseResponseCompression*` first in the request processing pipeline.

In the `Program` file:

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseResponseCompression();
}
```

## Client-side SignalR cross-origin negotiation for authentication

This section explains how to configure SignalR's underlying client to send credentials, such as cookies or HTTP authentication headers.

Use `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials*` to set `Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestCredentials.Include` on cross-origin `fetch` requests.

`IncludeRequestCredentialsMessageHandler.cs`:

```csharp
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Http;

public class IncludeRequestCredentialsMessageHandler : DelegatingHandler
{
    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
        return base.SendAsync(request, cancellationToken);
    }
}
```

Where a hub connection is built, assign the `System.Net.Http.HttpMessageHandler` to the `Microsoft.AspNetCore.Http.Connections.Client.HttpConnectionOptions.HttpMessageHandlerFactory` option:

```csharp
private HubConnectionBuilder? hubConnection;

...

hubConnection = new HubConnectionBuilder()
    .WithUrl(new Uri(Navigation.ToAbsoluteUri("/chathub")), options =>
    {
        options.HttpMessageHandlerFactory = innerHandler => 
            new IncludeRequestCredentialsMessageHandler { InnerHandler = innerHandler };
    }).Build();
```

The preceding example configures the hub connection URL to the absolute URI address at `/chathub`. The URI can also be set via a string, for example `https://signalr.example.com`, or via configuration. `Navigation` is an injected `Microsoft.AspNetCore.Components.NavigationManager`.

For more information, see ASP.NET Core SignalR configuration.

## Client-side rendering

If prerendering is configured, prerendering occurs before the client connection to the server is established. For more information, see ASP.NET Core Blazor prerendered state persistence.

## Prerendered state size and SignalR message size limit

A large prerendered state size may exceed Blazor's SignalR circuit message size limit, which results in the following:

* The SignalR circuit fails to initialize with an error on the client: :::no-loc text="Circuit host not initialized.":::
* The reconnection UI on the client appears when the circuit fails. Recovery isn't possible.

To resolve the problem, use ***either*** of the following approaches:

* Reduce the amount of data that you are putting into the prerendered state.
* Increase the SignalR message size limit. ***WARNING***: Increasing the limit may increase the risk of Denial of Service (DoS) attacks.

## Additional client-side resources

* Secure a SignalR hub
* Overview of ASP.NET Core SignalR
* ASP.NET Core SignalR configuration
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)

## Use session affinity (sticky sessions) for server-side web farm hosting

When more than one backend server is in use, the app must implement session affinity, also called *sticky sessions*. Session affinity ensures that a client's circuit reconnects to the same server if the connection is dropped, which is important because client state is only held in the memory of the server that first established the client's circuit.

The following error is thrown by an app that hasn't enabled session affinity in a web farm:

> :::no-loc text="Uncaught (in promise) Error: Invocation canceled due to the underlying connection being closed.":::

For more information on session affinity with Azure App Service hosting, see Host and deploy ASP.NET Core server-side Blazor apps.

## Azure SignalR Service

The optional Azure SignalR Service works in conjunction with the app's SignalR hub for scaling up a server-side app to a large number of concurrent connections. In addition, the service's global reach and high-performance data centers significantly aid in reducing latency due to geography.

The service isn't required for Blazor apps hosted in Azure App Service or Azure Container Apps but can be helpful in other hosting environments:

* To facilitate connection scale out.
* Handle global distribution.

For more information, see Host and deploy ASP.NET Core server-side Blazor apps.

## Server-side circuit handler options

Configure the circuit with `Microsoft.AspNetCore.Components.Server.CircuitOptions`. View default values in the reference source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Read or set the options in the `Program` file with an options delegate to `Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents*`. The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

In the `Program` file:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents(options =>
{
    options.{OPTION} = {VALUE};
});
```

To configure the `Microsoft.AspNetCore.SignalR.HubConnectionContext`, use `Microsoft.AspNetCore.SignalR.HubConnectionContextOptions` with `Microsoft.Extensions.DependencyInjection.ServerSideBlazorBuilderExtensions.AddHubOptions*`. View the defaults for the hub connection context options in reference source. For option descriptions in the SignalR documentation, see ASP.NET Core SignalR configuration. The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

In the `Program` file:

```csharp
builder.Services.AddRazorComponents().AddInteractiveServerComponents().AddHubOptions(options =>
{
    options.{OPTION} = {VALUE};
});
```

> **Warning:**
> The default value of `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize` is 32 KB. Increasing the value may increase the risk of Denial of Service (DoS) attacks.
>
> Blazor relies on `Microsoft.AspNetCore.SignalR.HubOptions.MaximumParallelInvocationsPerClient` set to 1, which is the default value. For more information, see MaximumParallelInvocationsPerClient > 1 breaks file upload in Blazor Server mode (`dotnet/aspnetcore` #53951).

For information on memory management, see Manage memory in deployed ASP.NET Core server-side Blazor apps.

## Blazor hub options

Configure `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` options to control `Microsoft.AspNetCore.Http.Connections.HttpConnectionDispatcherOptions` of the Blazor hub. View the defaults for the hub connection dispatcher options in reference source. The `{OPTION}` placeholder represents the option, and the `{VALUE}` placeholder is the value.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Place the call to `app.MapBlazorHub` after the call to `app.MapRazorComponents` in the app's `Program` file:

```csharp
app.MapBlazorHub(options =>
{
    options.{OPTION} = {VALUE};
});
```
