---
title: "Open Web Interface for .NET (OWIN) with ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/owin.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Open Web Interface for .NET (OWIN) with ASP.NET Core

By Steve Smith and Rick Anderson

ASP.NET Core:

* Supports the Open Web Interface for .NET (OWIN).
* Has compatible replacements for the `Microsoft.Owin.*` (Katana) libraries.

OWIN allows web apps to be decoupled from web servers. It defines a standard way for middleware to be used in a pipeline to handle requests and associated responses. ASP.NET Core applications and middleware can interoperate with OWIN-based applications, servers, and middleware.

OWIN provides a decoupling layer that allows two frameworks with disparate object models to be used together. The `Microsoft.AspNetCore.Owin` package provides two adapter implementations:

* ASP.NET Core to OWIN
* OWIN to ASP.NET Core

This allows ASP.NET Core to be hosted on top of an OWIN compatible server/host or for other OWIN compatible components to be run on top of ASP.NET Core.

> **Note:**
> Using these adapters comes with a performance cost. Apps using only ASP.NET Core components shouldn't use the `Microsoft.AspNetCore.Owin` package or adapters.

View or download sample code (how to download)

## Running OWIN middleware in the ASP.NET Core pipeline

ASP.NET Core's OWIN support is deployed as part of the `Microsoft.AspNetCore.Owin` package. You can import OWIN support into your project by installing this package.

OWIN middleware conforms to the OWIN specification, which requires a `Func<IDictionary<string, object>, Task>` interface, and specific keys be set (such as `owin.ResponseBody`). The following simple OWIN middleware displays "Hello World":

```csharp
public Task OwinHello(IDictionary<string, object> environment)
{
    string responseText = "Hello World via OWIN";
    byte[] responseBytes = Encoding.UTF8.GetBytes(responseText);

    // OWIN Environment Keys: http://owin.org/spec/spec/owin-1.0.0.html
    var responseStream = (Stream)environment["owin.ResponseBody"];
    var responseHeaders = (IDictionary<string, string[]>)environment["owin.ResponseHeaders"];

    responseHeaders["Content-Length"] = new string[] { responseBytes.Length.ToString(CultureInfo.InvariantCulture) };
    responseHeaders["Content-Type"] = new string[] { "text/plain" };

    return responseStream.WriteAsync(responseBytes, 0, responseBytes.Length);
}
```

The sample signature returns a `Task` and accepts an `IDictionary<string, object>` as required by OWIN.

The following code shows how to add the `OwinHello` middleware (shown above) to the ASP.NET Core pipeline with the `UseOwin` extension method.

```csharp
public void Configure(IApplicationBuilder app)
{
    app.UseOwin(pipeline =>
    {
        pipeline(next => OwinHello);
    });
}
```

You can configure other actions to take place within the OWIN pipeline.

> **Note:**
> Response headers should only be modified prior to the first write to the response stream.

> **Note:**
> Multiple calls to `UseOwin` is discouraged for performance reasons. OWIN components will operate best if grouped together.

```csharp
app.UseOwin(pipeline =>
{
    pipeline(next =>
    {
        return async environment =>
        {
            // Do something before.
            await next(environment);
            // Do something after.
        };
    });
});
```

## OWIN environment

You can construct an OWIN environment using the `HttpContext`.

```csharp

   var environment = new OwinEnvironment(HttpContext);
   var features = new OwinFeatureCollection(environment);
   ```

## OWIN keys

OWIN depends on an `IDictionary<string,object>` object to communicate information throughout an HTTP Request/Response exchange. ASP.NET Core implements the keys listed below. See the primary specification, extensions, and OWIN Key <example-value> and Common Keys.

### Request data (OWIN v1.0.0)

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| owin.RequestScheme | `String` |  |
| owin.RequestMethod  | `String` | |
| owin.RequestPathBase  | `String` | |
| owin.RequestPath | `String` | |
| owin.RequestQueryString  | `String` | |
| owin.RequestProtocol  | `String` | |
| owin.RequestHeaders | `IDictionary<string,string[]>`  | |
| owin.RequestBody | `Stream`  | |

### Request data (OWIN v1.1.0)

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| owin.RequestId | `String` | Optional |

### Response data (OWIN v1.0.0)

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| owin.ResponseStatusCode | `int` | Optional |
| owin.ResponseReasonPhrase | `String` | Optional |
| owin.ResponseHeaders | `IDictionary<string,string[]>`  | |
| owin.ResponseBody | `Stream`  | |

### Other data (OWIN v1.0.0)

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| owin.CallCancelled | `CancellationToken` |  |
| owin.Version  | `String` | |

### Common keys

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| ssl.ClientCertificate | `X509Certificate` |  |
| ssl.LoadClientCertAsync  | `Func<Task>` | |
| server.RemoteIpAddress  | `String` | |
| server.RemotePort | `String` | |
| server.LocalIpAddress  | `String` | |
| server.LocalPort  | `String` | |
| server.OnSendingHeaders  | `Action<Action<object>,object>` | |

### SendFiles v0.3.0

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| sendfile.SendAsync | See delegate signature | Per Request |

### Opaque v0.3.0

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| opaque.Version | `String` |  |
| opaque.Upgrade | `OpaqueUpgrade` | See delegate signature |
| opaque.Stream | `Stream` |  |
| opaque.CallCancelled | `CancellationToken` |  |

### WebSocket v0.3.0

| Key               | Value (type) | Description |
| ----------------- | ------------ | ----------- |
| websocket.Version | `String` |  |
| websocket.Accept | `WebSocketAccept` | See delegate signature |
| websocket.AcceptAlt |  | Non-spec |
| websocket.SubProtocol | `String` | See RFC6455 Section 4.2.2 Step 5.5 |
| websocket.SendAsync | `WebSocketSendAsync` | See delegate signature  |
| websocket.ReceiveAsync | `WebSocketReceiveAsync` | See delegate signature  |
| websocket.CloseAsync | `WebSocketCloseAsync` | See delegate signature  |
| websocket.CallCancelled | `CancellationToken` |  |
| websocket.ClientCloseStatus | `int` | Optional |
| websocket.ClientCloseDescription | `String` | Optional |

## Related content

* See the source on GitHub for OWIN keys supported in the translation layer.
* Middleware
* Servers
