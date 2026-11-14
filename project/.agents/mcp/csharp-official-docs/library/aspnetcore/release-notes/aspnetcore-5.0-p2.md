---
title: "What's new in ASP.NET Core in .NET 5 (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-5.0.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 5 (part 2 of 2)

## Kestrel

* Reloadable endpoints via configuration: Kestrel can detect changes to configuration passed to KestrelServerOptions.Configure and unbind from existing endpoints and bind to new endpoints without requiring an application restart when the `reloadOnChange` parameter is `true`. By default when using `Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults*` or `Microsoft.AspNetCore.WebHost.CreateDefaultBuilder*`, Kestrel binds to the "Kestrel" configuration subsection with `reloadOnChange` enabled. Apps must pass `reloadOnChange: true` when calling `KestrelServerOptions.Configure` manually to get reloadable endpoints.
* HTTP/2 response headers improvements. For more information, see Performance improvements in the next section.
* Support for additional endpoints types in the sockets transport: Adding to the new API introduced in `System.Net.Sockets`, the sockets default transport in Kestrel allows binding to both existing file handles and Unix domain sockets. Support for binding to existing file handles enables using the existing `Systemd` integration without requiring the `libuv` transport.
* Custom header decoding in Kestrel: Apps can specify which `System.Text.Encoding` to use to interpret incoming headers based on the header name instead of defaulting to UTF-8. Set the  `Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions.RequestHeaderEncodingSelector` property to specify which encoding to use:

  ```csharp
  public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.ConfigureKestrel(options =>
            {
                options.RequestHeaderEncodingSelector = encoding =>
                {
                      return encoding switch
                      {
                          "Host" => System.Text.Encoding.Latin1,
                          _ => System.Text.Encoding.UTF8,
                      };
                };
            });
            webBuilder.UseStartup<Startup>();
        });
  ```

### Kestrel endpoint-specific options via configuration

Support has been added for configuring Kestrel's endpoint-specific options via configuration. The endpoint-specific configurations includes the:

* HTTP protocols used
* TLS protocols used
* Certificate selected
* Client certificate mode

Configuration allows specifying which certificate is selected based on the specified server name. The server name is part of the Server Name Indication (SNI) extension to the TLS protocol as indicated by the client. Kestrel's configuration also supports a wildcard prefix in the host name.

The following example shows how to specify endpoint-specific using a configuration file:

```json
{
  "Kestrel": {
    "Endpoints": {
      "EndpointName": {
        "Url": "https://*",
        "Sni": {
          "a.example.org": {
            "Protocols": "Http1AndHttp2",
            "SslProtocols": [ "Tls11", "Tls12"],
            "Certificate": {
              "Path": "testCert.pfx",
              "Password": "<example-value>"
            },
            "ClientCertificateMode" : "NoCertificate"
          },
          "*.example.org": {
            "Certificate": {
              "Path": "testCert2.pfx",
              "Password": "<example-value>"
            }
          },
          "*": {
            // At least one sub-property needs to exist per
            // SNI section or it cannot be discovered via
            // IConfiguration
            "Protocols": "Http1",
          }
        }
      }
    }
  }
}
```

Server Name Indication (SNI) is a TLS extension to include a virtual domain as a part of SSL negotiation. What this effectively means is that the virtual domain name, or a hostname, can be used to identify the network end point.

## Performance improvements

### HTTP/2

* Significant reductions in allocations in the HTTP/2 code path.
* Support for HPack dynamic compression of HTTP/2 response headers in Kestrel. For more information, see Header table size and HPACK: the silent killer (feature) of HTTP/2.
* Sending HTTP/2 PING frames: HTTP/2 has a mechanism for sending PING frames to ensure an idle connection is still functional. Ensuring a viable connection is especially useful when working with long-lived streams that are often idle but only intermittently see activity, for example, gRPC streams. Apps can send periodic PING frames in Kestrel by setting limits on
`Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions`:

   ```csharp
   public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.ConfigureKestrel(options =>
            {
                options.Limits.Http2.KeepAlivePingInterval =
                                               TimeSpan.FromSeconds(10);
                options.Limits.Http2.KeepAlivePingTimeout =
                                               TimeSpan.FromSeconds(1);
            });
            webBuilder.UseStartup<Startup>();
        });
   ```

### Containers

Prior to .NET 5, building and publishing a *Dockerfile* for an ASP.NET Core app required pulling the entire .NET Core SDK and the ASP.NET Core image. With this release, pulling the SDK images bytes is reduced and the bytes pulled for the ASP.NET Core image is largely eliminated. For more information, see this GitHub issue comment.

## Authentication and authorization

### Microsoft Entra ID authentication with Microsoft.Identity.Web

The ASP.NET Core project templates now integrate with `Microsoft.Identity.Web` to handle authentication with Microsoft Entra ID. The Microsoft.Identity.Web package provides:

* A better experience for authentication through Microsoft Entra ID.
* An easier way to access Azure resources on behalf of your users, including Microsoft Graph. See the Microsoft.Identity.Web sample, which starts with a basic login and advances through multi-tenancy, using Azure APIs, using Microsoft Graph, and protecting your own APIs. `Microsoft.Identity.Web` is available alongside .NET 5.

### Allow anonymous access to an endpoint

The `AllowAnonymous` extension method allows anonymous access to an endpoint:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapGet("/", async context =>
        {
            await context.Response.WriteAsync("Hello World!");
        })
        .AllowAnonymous();
    });
}
```

### Custom handling of authorization failures

Custom handling of authorization failures is now easier with the new `Microsoft.AspNetCore.Authorization.IAuthorizationMiddlewareResultHandler` interface that is invoked by the authorization middleware (`UseAuthorization`). The default implementation remains the same, but a custom handler can be registered with dependency injection, which allows custom HTTP responses based on an authorization failure. See `SampleAuthorizationMiddlewareResultHandler.cs` (reference source) for a demonstration of `IAuthorizationMiddlewareResultHandler`.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### Authorization when using endpoint routing

Authorization when using endpoint routing now receives the `HttpContext` rather than the endpoint instance. This allows the authorization middleware to access the `RouteData` and other properties of the `HttpContext` that were not accessible though the `Microsoft.AspNetCore.Http.Endpoint` class. The endpoint can be fetched from the context using context.GetEndpoint.

### Role-based access control with Kerberos authentication and LDAP on Linux

See Kerberos authentication and role-based access control (RBAC)

## API improvements

### JSON extension methods for HttpRequest and HttpResponse

JSON data can be read and written to from an `HttpRequest` and `HttpResponse` using the new `System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*` and `WriteAsJsonAsync` extension methods. These extension methods use the System.Text.Json serializer to handle the JSON data. The new `HasJsonContentType` extension method can also check if a request has a JSON content type.

The JSON extension methods can be combined with endpoint routing to create JSON APIs in a style of programming we call ***route to code***. It is a new option for developers who want to create basic JSON APIs in a lightweight way. For example, a web app that has only a handful of endpoints might choose to use route to code rather than the full functionality of ASP.NET Core MVC:

```csharp
endpoints.MapGet("/weather/{city:alpha}", async context =>
{
    var city = (string)context.Request.RouteValues["city"];
    var weather = GetFromDatabase(city);

    await context.Response.WriteAsJsonAsync(weather);
});
```

### System.Diagnostics.Activity

The default format for `System.Diagnostics.Activity` now defaults to the W3C format. This makes distributed tracing support in ASP.NET Core interoperable with more frameworks by default.

### FromBodyAttribute

`Microsoft.AspNetCore.Mvc.FromBodyAttribute` now supports configuring an option that allows these parameters or properties to be considered optional:

```csharp
public IActionResult Post([FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)]
                          MyModel model)
{
    ...
}
```

## Miscellaneous improvements

We've started applying nullable annotations to ASP.NET Core assemblies. We plan to annotate most of the common public API surface of the .NET 5 framework.

### Control Startup class activation

An additional `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseStartup*` overload has been added that lets an app provide a factory method for controlling `Startup` class activation. Controlling `Startup` class activation is useful to pass <example-value> parameters to `Startup` that are initialized along with the host:

```csharp
public class Program
{
    public static async Task Main(string[] args)
    {
        var logger = CreateLogger();
        var host = Host.CreateDefaultBuilder()
            .ConfigureWebHost(builder =>
            {
                builder.UseStartup(context => new Startup(logger));
            })
            .Build();

        await host.RunAsync();
    }
}
```

### Auto refresh with dotnet watch

In .NET 5, running dotnet watch on an ASP.NET Core project both launches the default browser and auto refreshes the browser as changes are made to the code. This means you can:

* Open an ASP.NET Core project in a text editor.
* Run `dotnet watch`.
* Focus on the code changes while the tooling handles rebuilding, restarting, and reloading the app.

### Console Logger Formatter

Improvements have been made to the console log provider in the `Microsoft.Extensions.Logging` library. Developers can now implement a custom `ConsoleFormatter` to exercise complete control over formatting and colorization of the console output. The formatter APIs allow for rich formatting by implementing a subset of the VT-100 escape sequences. VT-100 is supported by most modern terminals. The console logger can parse out escape sequences on unsupported terminals allowing developers to author a single formatter for all terminals.

### JSON Console Logger

In addition to support for custom formatters, we've also added a built-in JSON formatter that emits structured JSON logs to the console. The following code shows how to switch from the default logger to JSON:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
           Host.CreateDefaultBuilder(args)
  .ConfigureLogging(logging =>
  {
     logging.AddJsonConsole(options =>
     {
         options.JsonWriterOptions = new JsonWriterOptions()
         { Indented = true };
     });
  })
  .ConfigureWebHostDefaults(webBuilder =>
  {
    webBuilder.UseStartup<Startup>();
  });
```

Log messages emitted to the console are JSON formatted:

```json
{
  "EventId": 0,
  "LogLevel": "Information",
  "Category": "Microsoft.Hosting.Lifetime",
  "Message": "Now listening on: https://localhost:5001",
  "State": {
    "Message": "Now listening on: https://localhost:5001",
    "address": "https://localhost:5001",
    "{OriginalFormat}": "Now listening on: {address}"
  }
}
```

## Breaking changes

Use the articles in Breaking changes in .NET to find breaking changes that might apply when upgrading an app to a newer version of .NET.
