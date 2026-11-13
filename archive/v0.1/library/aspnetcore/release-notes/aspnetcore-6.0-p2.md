---
title: "What's new in ASP.NET Core in .NET 6 (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-6.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 6 (part 2 of 5)

## Blazor

### Project template changes

Several project template changes were made for Blazor apps, including the use of the `Pages/_Layout.cshtml` file for layout content that appeared in the `_Host.cshtml` file for earlier Blazor Server apps. Study the changes by creating an app from a 6.0 project template or accessing the ASP.NET Core reference source for the project templates:

* Blazor Server
* Blazor WebAssembly

### Blazor WebAssembly native dependencies support

Blazor WebAssembly apps can use native dependencies built to run on WebAssembly. For more information, see ASP.NET Core Blazor WebAssembly native dependencies.

### WebAssembly Ahead-of-time (AOT) compilation and runtime relinking

Blazor WebAssembly supports ahead-of-time (AOT) compilation, where you can compile your .NET code directly into WebAssembly. AOT compilation results in runtime performance improvements at the expense of a larger app size. Relinking the .NET WebAssembly runtime trims unused runtime code and thus improves download speed. For more information, see Ahead-of-time (AOT) compilation and Runtime relinking.

### Persist prerendered state

Blazor supports persisting state in a prerendered page so that the state doesn't need to be recreated when the app is fully loaded. For more information, see Integrate ASP.NET Core Razor components with MVC or Razor Pages.

### Error boundaries

Error boundaries provide a convenient approach for handling exceptions on the UI level. For more information, see Handle errors in ASP.NET Core Blazor apps.

### SVG support

The `<foreignObject>` element element is supported to display arbitrary HTML within an SVG. For more information, see ASP.NET Core Razor components.

### Blazor Server support for byte array transfer in JS Interop

Blazor supports optimized byte array JS interop that avoids encoding and decoding byte arrays into Base64. For more information, see the following resources:

* Call JavaScript functions from .NET methods in ASP.NET Core Blazor
* Call .NET methods from JavaScript functions in ASP.NET Core Blazor

### Query string enhancements

Support for working with query strings is improved. For more information, see ASP.NET Core Blazor navigation.

### Binding to select multiple

Binding supports multiple option selection with `` elements. For more information, see the following resources:

* ASP.NET Core Blazor data binding
* ASP.NET Core Blazor input components

### Head (`<head>`) content control

Razor components can modify the HTML `<head>` element content of a page, including setting the page's title (`<title>` element) and modifying metadata (`<meta>` elements). For more information, see Control `<head>` content in ASP.NET Core Blazor apps.

### Generate Angular and React components

Generate framework-specific JavaScript components from Razor components for web frameworks, such as Angular or React. For more information, see ASP.NET Core Razor components.

### Render components from JavaScript

Render Razor components dynamically from JavaScript for existing JavaScript apps. For more information, see ASP.NET Core Razor components.

### Custom elements

Experimental support is available for building custom elements, which use standard HTML interfaces. For more information, see ASP.NET Core Razor components.

### Infer component generic types from ancestor components

An ancestor component can cascade a type parameter by name to descendants using the new `[CascadingTypeParameter]` attribute. For more information, see ASP.NET Core Razor components.

### Dynamically rendered components

Use the new built-in `DynamicComponent` component to render components by type. For more information, see Dynamically-rendered ASP.NET Core Razor components.

### Improved Blazor accessibility

Use the new `FocusOnNavigate` component to set the UI focus to an element based on a CSS selector after navigating from one page to another. For more information, see ASP.NET Core Blazor routing.

### Custom event argument support

Blazor supports custom event arguments, which enable you to pass <example-value> data to .NET event handlers with custom events. For more information, see ASP.NET Core Blazor event handling.

### Required parameters

Apply the new `[EditorRequired]` attribute to specify a required component parameter. For more information, see ASP.NET Core Razor components.

### Collocation of JavaScript files with pages, views, and components

Collocate JavaScript files for pages, views, and Razor components as a convenient way to organize scripts in an app. For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

### JavaScript initializers

JavaScript initializers execute logic before and after a Blazor app loads. For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

### Streaming JavaScript interop

Blazor now supports streaming data directly between .NET and JavaScript. For more information, see the following resources:

* Stream from .NET to JavaScript
* Stream from JavaScript to .NET

### Generic type constraints

Generic type parameters are now supported. For more information, see ASP.NET Core Razor components.

### WebAssembly deployment layout

Use a deployment layout to enable Blazor WebAssembly app downloads in restricted security environments. For more information, see Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps.

### New Blazor articles

In addition to the Blazor features described in the preceding sections, new Blazor articles are available on the following subjects:

* ASP.NET Core Blazor file downloads: Learn how to download a file using native `byte[]` streaming interop to ensure efficient transfer to the client.
* Display images and documents in ASP.NET Core Blazor: Discover how to work with images and documents in Blazor apps, including how to stream image and document data.

## Build Blazor Hybrid apps with .NET MAUI, WPF, and Windows Forms

Use Blazor Hybrid to blend desktop and mobile native client frameworks with .NET and Blazor:

* .NET Multi-platform App UI (.NET MAUI) is a cross-platform framework for creating native mobile and desktop apps with C# and XAML.
* Blazor Hybrid apps can be built with Windows Presentation Foundation (WPF) and Windows Forms frameworks.

> **Important:**
> Blazor Hybrid is in preview and shouldn't be used in production apps until final release.

For more information, see the following resources:

* Preview ASP.NET Core Blazor Hybrid documentation
* What is .NET MAUI?
* Microsoft .NET Blog (category: ".NET MAUI")

## Kestrel

HTTP/3 is currently in draft and therefore subject to change. HTTP/3 support in ASP.NET Core is not released, it's a preview feature included in .NET 6.

Kestrel now supports HTTP/3. For more information, see Use HTTP/3 with the ASP.NET Core Kestrel web server and the blog entry HTTP/3 support in .NET 6.

### New Kestrel logging categories for selected logging

Prior to this change, enabling verbose logging for Kestrel was prohibitively expensive as all of Kestrel shared the `Microsoft.AspNetCore.Server.Kestrel` logging category name. `Microsoft.AspNetCore.Server.Kestrel` is still available, but the following new subcategories allow for more control of logging:

* `Microsoft.AspNetCore.Server.Kestrel` (current category): `ApplicationError`, `ConnectionHeadResponseBodyWrite`, `ApplicationNeverCompleted`, `RequestBodyStart`, `RequestBodyDone`, `RequestBodyNotEntirelyRead`, `RequestBodyDrainTimedOut`, `ResponseMinimumDataRateNotSatisfied`, `InvalidResponseHeaderRemoved`, `HeartbeatSlow`.
* `Microsoft.AspNetCore.Server.Kestrel.BadRequests`: `ConnectionBadRequest`, `RequestProcessingError`, `RequestBodyMinimumDataRateNotSatisfied`.
* `Microsoft.AspNetCore.Server.Kestrel.Connections`: `ConnectionAccepted`, `ConnectionStart`, `ConnectionStop`, `ConnectionPause`, `ConnectionResume`, `ConnectionKeepAlive`, `ConnectionRejected`, `ConnectionDisconnect`, `NotAllConnectionsClosedGracefully`, `NotAllConnectionsAborted`, `ApplicationAbortedConnection`.
* `Microsoft.AspNetCore.Server.Kestrel.Http2`: `Http2ConnectionError`, `Http2ConnectionClosing`, `Http2ConnectionClosed`, `Http2StreamError`, `Http2StreamResetAbort`, `HPackDecodingError`, `HPackEncodingError`, `Http2FrameReceived`, `Http2FrameSending`, `Http2MaxConcurrentStreamsReached`.
* `Microsoft.AspNetCore.Server.Kestrel.Http3`: `Http3ConnectionError`, `Http3ConnectionClosing`, `Http3ConnectionClosed`, `Http3StreamAbort`, `Http3FrameReceived`, `Http3FrameSending`.

Existing rules continue to work, but you can now be more selective on which rules you enable. For example, the observability overhead of enabling `Debug` logging for just bad requests is greatly reduced and can be enabled with the following configuration:

```xml
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.AspNetCore.Kestrel.BadRequests": "Debug"
    }
  }
```

Log filtering applies rules with the longest matching category prefix. For more information, see How filtering rules are applied

### Emit KestrelServerOptions via EventSource event

The KestrelEventSource emits a new event containing the JSON-serialized `Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions` when enabled with verbosity `EventLevel.LogAlways`. This event makes it easier to reason about the server behavior when analyzing collected traces. The following JSON is an example of the event payload:

```json
{
  "AllowSynchronousIO": false,
  "AddServerHeader": true,
  "AllowAlternateSchemes": false,
  "AllowResponseHeaderCompression": true,
  "EnableAltSvc": false,
  "IsDevCertLoaded": true,
  "RequestHeaderEncodingSelector": "default",
  "ResponseHeaderEncodingSelector": "default",
  "Limits": {
    "KeepAliveTimeout": "00:02:10",
    "MaxConcurrentConnections": null,
    "MaxConcurrentUpgradedConnections": null,
    "MaxRequestBodySize": 30000000,
    "MaxRequestBufferSize": 1048576,
    "MaxRequestHeaderCount": 100,
    "MaxRequestHeadersTotalSize": 32768,
    "MaxRequestLineSize": 8192,
    "MaxResponseBufferSize": 65536,
    "MinRequestBodyDataRate": "Bytes per second: 240, Grace Period: 00:00:05",
    "MinResponseDataRate": "Bytes per second: 240, Grace Period: 00:00:05",
    "RequestHeadersTimeout": "00:00:30",
    "Http2": {
      "MaxStreamsPerConnection": 100,
      "HeaderTableSize": 4096,
      "MaxFrameSize": 16384,
      "MaxRequestHeaderFieldSize": 16384,
      "InitialConnectionWindowSize": 131072,
      "InitialStreamWindowSize": 98304,
      "KeepAlivePingDelay": "10675199.02:48:05.4775807",
      "KeepAlivePingTimeout": "00:00:20"
    },
    "Http3": {
      "HeaderTableSize": 0,
      "MaxRequestHeaderFieldSize": 16384
    }
  },
  "ListenOptions": [
    {
      "Address": "https://127.0.0.1:7030",
      "IsTls": true,
      "Protocols": "Http1AndHttp2"
    },
    {
      "Address": "https://[::1]:7030",
      "IsTls": true,
      "Protocols": "Http1AndHttp2"
    },
    {
      "Address": "http://127.0.0.1:5030",
      "IsTls": false,
      "Protocols": "Http1AndHttp2"
    },
    {
      "Address": "http://[::1]:5030",
      "IsTls": false,
      "Protocols": "Http1AndHttp2"
    }
  ]
}
```

### New DiagnosticSource event for rejected HTTP requests

Kestrel now emits a new `DiagnosticSource` event for HTTP requests rejected at the server layer. Prior to this change, there was no way to observe these rejected requests. The new `DiagnosticSource` event `Microsoft.AspNetCore.Server.Kestrel.BadRequest` contains a `Microsoft.AspNetCore.Http.Features.IBadRequestExceptionFeature` that can be used to introspect the reason for rejecting the request.

```csharp
using Microsoft.AspNetCore.Http.Features;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var diagnosticSource = app.Services.GetRequiredService<DiagnosticListener>();
using var badRequestListener = new BadRequestEventListener(diagnosticSource,
    (badRequestExceptionFeature) =>
{
    app.Logger.LogError(badRequestExceptionFeature.Error, "Bad request received");
});
app.MapGet("/", () => "Hello world");

app.Run();

class BadRequestEventListener : IObserver<KeyValuePair<string, object>>, IDisposable
{
    private readonly IDisposable _subscription;
    private readonly Action<IBadRequestExceptionFeature> _callback;

    public BadRequestEventListener(DiagnosticListener diagnosticListener,
                                   Action<IBadRequestExceptionFeature> callback)
    {
        _subscription = diagnosticListener.Subscribe(this!, IsEnabled);
        _callback = callback;
    }
    private static readonly Predicate<string> IsEnabled = (provider) => provider switch
    {
        "Microsoft.AspNetCore.Server.Kestrel.BadRequest" => true,
        _ => false
    };
    public void OnNext(KeyValuePair<string, object> pair)
    {
        if (pair.Value is IFeatureCollection featureCollection)
        {
            var badRequestFeature = featureCollection.Get<IBadRequestExceptionFeature>();

            if (badRequestFeature is not null)
            {
                _callback(badRequestFeature);
            }
        }
    }
    public void OnError(Exception error) { }
    public void OnCompleted() { }
    public virtual void Dispose() => _subscription.Dispose();
}
```

For more information, see Logging and diagnostics in Kestrel.

### Create a ConnectionContext from an Accept Socket

The new `Microsoft.AspNetCore.Server.Kestrel.Transport.Sockets.SocketConnectionContextFactory` makes it possible to create a `Microsoft.AspNetCore.Connections.ConnectionContext` from an accepted socket. This makes it possible to build a custom socket-based `Microsoft.AspNetCore.Connections.IConnectionListenerFactory` without losing out on all the performance work and pooling happening in SocketConnection.

See this example of a custom IConnectionListenerFactory which shows how to use this `SocketConnectionContextFactory`.

### Kestrel is the default launch profile for Visual Studio

The default launch profile for all new dotnet web projects is Kestrel. Starting Kestrel is significantly faster and results in a more responsive experience while developing apps.

IIS Express is still available as a launch profile for scenarios such as Windows Authentication or port sharing.

### Localhost ports for Kestrel are random

See Template generated ports for Kestrel in this document for more information.
