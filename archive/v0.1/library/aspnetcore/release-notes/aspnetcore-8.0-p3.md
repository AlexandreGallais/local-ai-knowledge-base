---
title: "What's new in ASP.NET Core in .NET 8 (part 3 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-8.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 8 (part 3 of 6)

### Web-friendly Webcil packaging

Webcil is web-friendly packaging of .NET assemblies that removes content specific to native Windows execution to avoid issues when deploying to environments that block the download or use of `.dll` files. Webcil is enabled by default for Blazor WebAssembly apps.

For more information, see Host and deploy ASP.NET Core Blazor WebAssembly.

> **Note:**
> Prior to the release of .NET 8, guidance in Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps addresses environments that block clients from downloading and executing DLLs with a multipart bundling approach. In .NET 8 or later, Blazor uses the Webcil file format to address this problem. Multipart bundling using the experimental NuGet package described by the *WebAssembly deployment layout* article isn't supported for Blazor apps in .NET 8 or later. For more information, see Enhance `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle` package to define a custom bundle format (dotnet/aspnetcore #36978). If you desire to continue using the multipart bundle package in .NET 8 or later apps, you can use the guidance in the article to create your own multipart bundling NuGet package, but it won't be supported by Microsoft.

### Blazor WebAssembly debugging improvements

When debugging .NET on WebAssembly, the debugger now downloads symbol data from symbol locations that are configured in Visual Studio preferences. This improves the debugging experience for apps that use NuGet packages.

You can now debug Blazor WebAssembly apps using Firefox. Debugging Blazor WebAssembly apps requires configuring the browser for remote debugging and then connecting to the browser using the browser developer tools through the .NET WebAssembly debugging proxy. Debugging Firefox from Visual Studio isn't supported at this time.

For more information, see Debug ASP.NET Core Blazor apps.

### Content Security Policy (CSP) compatibility

Blazor WebAssembly no longer requires enabling the `unsafe-eval` script source when specifying a Content Security Policy (CSP).

For more information, see Enforce a Content Security Policy for ASP.NET Core Blazor.

### Handle caught exceptions outside of a Razor component's lifecycle

Use `ComponentBase.DispatchExceptionAsync` in a Razor component to process exceptions thrown outside of the component's lifecycle call stack. This permits the component's code to treat exceptions as though they're lifecycle method exceptions. Thereafter, Blazor's error handling mechanisms, such as error boundaries, can process exceptions.

For more information, see Handle errors in ASP.NET Core Blazor apps.

### Configure the .NET WebAssembly runtime

The .NET WebAssembly runtime can now be configured for Blazor startup.

For more information, see ASP.NET Core Blazor startup.

### Configuration of connection timeouts in `HubConnectionBuilder`

Prior workarounds for configuring hub connection timeouts can be replaced with formal SignalR hub connection builder timeout configuration.

For more information, see the following:

* ASP.NET Core Blazor SignalR guidance
* Host and deploy ASP.NET Core server-side Blazor apps

### Project templates shed Open Iconic

The Blazor project templates no longer depend on Open Iconic for icons.

### Support for dialog cancel and close events

Blazor now supports the `cancel` and `close` events on the `dialog` HTML element.

In the following example:

* `OnClose` is called when the `my-dialog` dialog is closed with the **Close** button.
* `OnCancel` is called when the dialog is canceled with the `Esc` key. When an HTML dialog is dismissed with the `Esc` key, both the `cancel` and `close` events are triggered.

```razor
<div>
    <p>Output: @message</p>

    <button onclick="document.getElementById('my-dialog').showModal()">
        Show modal dialog
    </button>

    <dialog id="my-dialog" @onclose="OnClose" @oncancel="OnCancel">
        <p>Hi there!</p>

        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>
</div>

@code {
    private string? message;

    private void OnClose(EventArgs e) => message += "onclose, ";

    private void OnCancel(EventArgs e) => message += "oncancel, ";
}
```

### Blazor Identity UI

Blazor supports generating a full Blazor-based Identity UI when you choose the authentication option for *Individual Accounts*. You can either select the option for Individual Accounts in the new project dialog for Blazor Web Apps from Visual Studio or pass the `-au|--auth` option set to `Individual` from the command line when you create a new project.

For more information, see the following resources:

* ASP.NET Core Blazor authentication and authorization
* What's new with identity in .NET 8 (blog post)

### Secure Blazor WebAssembly with ASP.NET Core Identity

The Blazor documentation hosts a new article and sample app to cover securing a standalone Blazor WebAssembly app with ASP.NET Core Identity.

For more information, see the following resources:

* Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity
* What's new with identity in .NET 8 (blog post)

### Blazor Server with Yarp routing

Routing and deep linking for Blazor Server with Yarp work correctly in .NET 8.

For more information, see Migrate from ASP.NET Core in .NET 7 to .NET 8.

### Multiple Blazor Web Apps per server project

Support for multiple Blazor Web Apps per server project is under consideration for a future .NET release.

For more information, see Support for multiple Blazor Web apps per server project (`dotnet/aspnetcore` #52216).

### Blazor Hybrid

The following articles document changes for Blazor Hybrid in .NET 8:

* Troubleshoot ASP.NET Core Blazor Hybrid: A new article explains how to use `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` logging.
* Build your first app tutorial: The project template name **:::no-loc text=".NET MAUI Blazor":::** has changed to **:::no-loc text=".NET MAUI Blazor Hybrid":::**.
* ASP.NET Core Blazor Hybrid: `BlazorWebView` gains a `TryDispatchAsync` method that calls a specified `Action<ServiceProvider>` asynchronously and passes in the scoped services available in Razor components. This enables code from the native UI to access scoped services such as `NavigationManager`.
* ASP.NET Core Blazor Hybrid routing and navigation: Use the `BlazorWebView.StartPath` property to get or set the path for initial navigation within the Blazor navigation context when the Razor component is finished loading.

### `[Parameter]` attribute is no longer required when supplied from the query string

The `[Parameter]` attribute is no longer required when supplying a parameter from the query string:

```diff
- [Parameter]
  [SupplyParameterFromQuery]
```

## SignalR

### New approach to set the server timeout and Keep-Alive interval

`Microsoft.AspNetCore.SignalR.Client.HubConnection.ServerTimeout` (default: 30 seconds) and `Microsoft.AspNetCore.SignalR.Client.HubConnection.KeepAliveInterval` (default: 15 seconds) can be set directly on `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`.

#### Prior approach for JavaScript clients

The following example shows the assignment of values that are double the default values in .NET 7 or earlier:

```javascript
var connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .build();

connection.serverTimeoutInMilliseconds = 60000;
connection.keepAliveIntervalInMilliseconds = 30000;
```

#### New approach for JavaScript clients

The following example shows the ***new approach*** for assigning values that are double the default values in .NET 8 or later:

```javascript
var connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .withServerTimeout(60000)
  .withKeepAlive(30000)
  .build();
```

#### Prior approach for the JavaScript client of a Blazor Server app

The following example shows the assignment of values that are double the default values in .NET 7 or earlier:

```javascript
Blazor.start({
  configureSignalR: function (builder) {
    let c = builder.build();
    c.serverTimeoutInMilliseconds = 60000;
    c.keepAliveIntervalInMilliseconds = 30000;
    builder.build = () => {
      return c;
    };
  }
});
```

#### New approach for the JavaScript client of server-side Blazor app

The following example shows the ***new approach*** for assigning values that are double the default values in .NET 8 or later for Blazor Web Apps and Blazor Server.

Blazor Web App:

```javascript
Blazor.start({
  circuit: {
    configureSignalR: function (builder) {
      builder.withServerTimeout(60000).withKeepAliveInterval(30000);
    }
  }
});
```

Blazor Server:

```javascript
Blazor.start({
  configureSignalR: function (builder) {
    builder.withServerTimeout(60000).withKeepAliveInterval(30000);
  }
});
```

#### Prior approach for .NET clients

The following example shows the assignment of values that are double the default values in .NET 7 or earlier:

```csharp
var builder = new HubConnectionBuilder()
    .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
    .Build();

builder.ServerTimeout = TimeSpan.FromSeconds(60);
builder.KeepAliveInterval = TimeSpan.FromSeconds(30);

builder.On<string, string>("ReceiveMessage", (user, message) => ...

await builder.StartAsync();
```

#### New approach for .NET clients

The following example shows the ***new approach*** for assigning values that are double the default values in .NET 8 or later:

```csharp
var builder = new HubConnectionBuilder()
    .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
    .WithServerTimeout(TimeSpan.FromSeconds(60))
    .WithKeepAliveInterval(TimeSpan.FromSeconds(30))
    .Build();

builder.On<string, string>("ReceiveMessage", (user, message) => ...

await builder.StartAsync();
```

### SignalR stateful reconnect

SignalR stateful reconnect reduces the perceived downtime of clients that have a temporary disconnect in their network connection, such as when switching network connections or a short temporary loss in access.

Stateful reconnect achieves this by:

* Temporarily buffering data on the server and client.
* Acknowledging messages received (ACK-ing) by both the server and client.
* Recognizing when a connection is returning and replaying messages that might have been sent while the connection was down.

Stateful reconnect is available in .NET 8 or later.

Opt in to stateful reconnect at both the server hub endpoint and the client:

* Update the server hub endpoint configuration to enable the `AllowStatefulReconnects` option:

  ```csharp
  app.MapHub<MyHub>("/hubName", options =>
  {
      options.AllowStatefulReconnects = true;
  });
  ```

  Optionally, the maximum buffer size in bytes allowed by the server can be set globally or for a specific hub with the `StatefulReconnectBufferSize` option:

  The `StatefulReconnectBufferSize` option set globally:

  ```csharp
  builder.AddSignalR(o => o.StatefulReconnectBufferSize = 1000);
  ```

  The `StatefulReconnectBufferSize` option set for a specific hub:

  ```csharp
  builder.AddSignalR().AddHubOptions<MyHub>(o => o.StatefulReconnectBufferSize = 1000);
  ```

  The `StatefulReconnectBufferSize` option is optional with a default of 100,000 bytes.

* Update JavaScript or TypeScript client code to enable the `withStatefulReconnect` option:

  ```javascript
  const builder = new signalR.HubConnectionBuilder()
    .withUrl("/hubname")
    .withStatefulReconnect({ bufferSize: 1000 });  // Optional, defaults to 100,000
  const connection = builder.build();
  ```

  The `bufferSize` option is optional with a default of 100,000 bytes.

* Update .NET client code to enable the `WithStatefulReconnect` option:

  ```csharp
    var builder = new HubConnectionBuilder()
        .WithUrl("<hub url>")
        .WithStatefulReconnect();
    builder.Services.Configure<HubConnectionOptions>(o => o.StatefulReconnectBufferSize = 1000);
    var hubConnection = builder.Build();
  ```

  The `StatefulReconnectBufferSize` option is optional with a default of 100,000 bytes.

For more information, see Configure stateful reconnect.
