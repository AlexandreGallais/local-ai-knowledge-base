---
title: "What's new in ASP.NET Core in .NET 6 (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-6.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 6 (part 4 of 5)

## Miscellaneous

### Hot Reload

Quickly make UI and code updates to running apps without losing app state for faster and more productive developer experience using Hot Reload. For more information, see .NET Hot Reload support for ASP.NET Core and Update on .NET Hot Reload progress and Visual Studio 2022 Highlights.

### Improved single-page app (SPA) templates

The ASP.NET Core project templates have been updated for Angular and React to use an improved pattern for single-page apps that is more flexible and more closely aligns with common patterns for modern front-end web development.

Previously, the ASP.NET Core template for Angular and React used specialized middleware during development to launch the development server for the front-end framework and then proxy requests from ASP.NET Core to the development server. The logic for launching the front-end development server was specific to the command-line interface for the corresponding front-end framework. Supporting additional front-end frameworks using this pattern meant adding additional logic to ASP.NET Core.

The updated ASP.NET Core templates for Angular and React in .NET 6 flips this arrangement around and take advantage of the built-in proxying support in the development servers of most modern front-end frameworks. When the ASP.NET Core app is launched, the front-end development server is launched just as before, but the development server is configured to proxy requests to the backend ASP.NET Core process. All of the front-end specific configuration to setup proxying is part of the app, not ASP.NET Core. Setting up ASP.NET Core projects to work with other front-end frameworks is now straight-forward: setup the front-end development server for the chosen framework to proxy to the ASP.NET Core backend using the pattern established in the Angular and React templates.

The startup code for the ASP.NET Core app no longer needs any single-page app-specific logic. The logic for starting the front-end development server during development is injecting into the app at runtime by the new Microsoft.AspNetCore.SpaProxy package. Fallback routing is handled using endpoint routing instead of SPA-specific middleware.

Templates that follow this pattern can still be run as a single project in Visual Studio or using `dotnet run` from the command-line. When the app is published, the front-end code in the *ClientApp* folder is built and collected as before into the web root of the host ASP.NET Core app and served as static files. Scripts included in the template configure the front-end development server to use HTTPS using the ASP.NET Core development certificate.

### Draft HTTP/3 support in .NET 6

HTTP/3 is currently in draft and therefore subject to change. HTTP/3 support in ASP.NET Core is not released, it's a preview feature included in .NET 6.

See the blog entry HTTP/3 support in .NET 6.

### Nullable Reference Type Annotations

Portions of the ASP.NET Core in .NET 6 source code has had nullability annotations applied.

By utilizing the new Nullable feature in C# 8, ASP.NET Core can provide additional compile-time safety in the handling of reference types. For example, protecting against `null` reference exceptions. Projects that have opted in to using nullable annotations may see new build-time warnings from ASP.NET Core APIs.

To enable nullable reference types, add the following property to project files:

```xml
<PropertyGroup>
    <Nullable>enable</Nullable>
</PropertyGroup>
```

 For more information, see Nullable reference types.

### Source Code Analysis

Several .NET compiler platform analyzers were added that inspect application code for problems such as incorrect middleware configuration or order, routing conflicts, etc. For more information, see Diagnostic Code Analysis in ASP.NET Core Apps.

### Web app template improvements

The web app templates:

* Use the new minimal hosting model.
* Significantly reduces the number of files and lines of code required to create an app. For example, the ASP.NET Core empty web app creates one C# file with four lines of code and is a complete app.
* Unifies `Startup.cs` and `Program.cs` into a single `Program.cs` file.
* Uses top-level statements to minimize the code required for an app.
* Uses global `using` directives to eliminate or minimize the number of `using` statement lines required.

### Template generated ports for Kestrel

Random ports are assigned during project creation for use by the Kestrel web server. Random ports help minimize a port conflict when multiple projects are run on the same machine.

When a project is created, a random HTTP port between 5000-5300 and a random HTTPS port between 7000-7300 is specified in the generated `Properties/launchSettings.json` file. The ports can be changed in the `Properties/launchSettings.json` file. If no port is specified, Kestrel  defaults to the HTTP 5000 and HTTPS 5001 ports. For more information, see Configure endpoints for Kestrel web server.

### New logging defaults

The following changes were made to both `appsettings.json` and `appsettings.Development.json`:

```diff
- "Microsoft": "Warning",
- "Microsoft.Hosting.Lifetime": "Information"
+ "Microsoft.AspNetCore": "Warning"
```

The change from `"Microsoft": "Warning"` to `"Microsoft.AspNetCore": "Warning"` results in logging all informational messages from the `Microsoft` namespace ***except*** `Microsoft.AspNetCore`. For example, `Microsoft.EntityFrameworkCore` is now logged at the informational level.

### Developer exception page middleware added automatically

In the development environment, the `Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware` is added by default. It's no longer necessary to add the following code to web UI apps:

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
```

### Support for Latin1 encoded request headers in HttpSysServer

`HttpSysServer` now supports decoding request headers that are `Latin1` encoded by setting the `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.UseLatin1RequestHeaders` property on `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions` to `true`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseHttpSys(o => o.UseLatin1RequestHeaders = true);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### The ASP.NET Core Module logs include timestamps and PID

The ASP.NET Core Module (ANCM) for IIS (ANCM) enhanced diagnostic logs include timestamps and PID of the process emitting the logs. Logging timestamps and PID makes it easier to diagnose issues with overlapping process restarts in IIS when multiple IIS worker processes are running.

The resulting logs now resemble the sample output show below:

```dotnetcli
[2021-07-28T19:23:44.076Z, PID: 11020] [aspnetcorev2.dll] Initializing logs for 'C:\<path>\aspnetcorev2.dll'. Process Id: 11020. File Version: 16.0.21209.0. Description: IIS ASP.NET Core Module V2. Commit: 96475a2acdf50d7599ba8e96583fa73efbe27912.
[2021-07-28T19:23:44.079Z, PID: 11020] [aspnetcorev2.dll] Resolving hostfxr parameters for application: '.\InProcessWebSite.exe' arguments: '' path: 'C:\Temp\e86ac4e9ced24bb6bacf1a9415e70753\'
[2021-07-28T19:23:44.080Z, PID: 11020] [aspnetcorev2.dll] Known dotnet.exe location: ''
```

### Configurable unconsumed incoming buffer size for IIS

The IIS server previously only buffered 64 KiB of unconsumed request bodies. The 64 KiB buffering resulted in reads being constrained to that maximum size, which impacts the performance with large incoming bodies such as uploads. In .NET 6 , the default buffer size changes from 64 KiB to 1 MiB which should improve throughput for large uploads. In our tests, a 700 MiB upload that used to take 9 seconds now only takes 2.5 seconds.

The downside of a larger buffer size is an increased per-request memory consumption when the app isn't quickly reading from the request body. So, in addition to changing the default buffer size, the buffer size configurable, allowing apps to configure the buffer size based on workload.

### View Components Tag Helpers

Consider a view component with an optional parameter, as shown in the following code:

```csharp
class MyViewComponent
{
    IViewComponentResult Invoke(bool showSomething = false) { ... }
}
```

With ASP.NET Core in .NET 6, the tag helper can be invoked without having to specify a value for the `showSomething` parameter:

```razor
<vc:my />
```

### Angular template updated to Angular 12

The ASP.NET Core in .NET 6 template for Angular now uses Angular 12.

The React template has been updated to React 17.

### Configurable buffer threshold before writing to disk in Json.NET output formatter

**Note**: We recommend using the `System.Text.Json` output formatter except when  the `Newtonsoft.Json` serializer is required for compatibility reasons. The `System.Text.Json` serializer is fully `async` and works efficiently for larger payloads.

The `Newtonsoft.Json` output formatter by default buffers responses up to 32 KiB in memory before buffering to disk. This is to avoid performing synchronous IO, which can result in other side-effects such as thread starvation and application deadlocks. However, if the response is larger than 32 KiB, considerable disk I/O occurs. The memory threshold is now configurable via the MvcNewtonsoftJsonOptions.OutputFormatterMemoryBufferThreshold property before buffering to disk:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages()
            .AddNewtonsoftJson(options =>
            { 
                options.OutputFormatterMemoryBufferThreshold = 48 * 1024;
            });

var app = builder.Build();
```

For more information, see this GitHub pull request and the NewtonsoftJsonOutputFormatterTest.cs file.

### Faster get and set for HTTP headers

New APIs were added to expose all common headers available on  `Microsoft.Net.Http.Headers.HeaderNames` as properties on the `Microsoft.AspNetCore.Http.IHeaderDictionary` resulting in an easier to use API. For example, the in-line middleware in the following code gets and sets both request and response headers using the new APIs:

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Use(async (context, next) =>
{
    var hostHeader = context.Request.Headers.Host;
    app.Logger.LogInformation("Host header: {host}", hostHeader);
    context.Response.Headers.XPoweredBy = "ASP.NET Core 6.0";
    await next.Invoke(context);
    var dateHeader = context.Response.Headers.Date;
    app.Logger.LogInformation("Response date: {date}", dateHeader);
});

app.Run();
```

For implemented headers the get and set accessors are implemented by going directly to the field and bypassing the lookup. For non-implemented headers, the accessors can bypass the initial lookup against implemented headers and directly perform the `Dictionary<string, StringValues>` lookup. Avoiding the lookup results in faster access for both scenarios.

### Async streaming

ASP.NET Core now supports asynchronous streaming from controller actions and responses from the JSON formatter. Returning an `IAsyncEnumerable` from an action no longer buffers the response content in memory before it gets sent. Not buffering helps reduce memory usage when returning large datasets that can be asynchronously enumerated.

Note that Entity Framework Core provides implementations of `IAsyncEnumerable` for querying the database. The improved support for `IAsyncEnumerable` in ASP.NET Core in .NET 6 can make using EF Core with ASP.NET Core more efficient. For example, the following code no longer buffers the product data into memory before sending the response:

```csharp
public IActionResult GetMovies()
{
    return Ok(_context.Movie);
}
```

However, when using lazy loading in EF Core, this new behavior may result in errors due to concurrent query execution while the data is being enumerated. Apps can revert back to the previous behavior by buffering the data:

```csharp
public async Task<IActionResult> GetMovies2()
{
    return Ok(await _context.Movie.ToListAsync());
}
```

See the related announcement for additional details about this change in behavior.

### HTTP logging middleware

HTTP logging is a new built-in middleware that logs information about HTTP requests and HTTP responses including the headers and entire body:

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();
app.UseHttpLogging();

app.MapGet("/", () => "Hello World!");

app.Run();
```

Navigating to `/` with the previous code logs information similar to the following output:

```dotnetcli
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Protocol: HTTP/2
      Method: GET
      Scheme: https
      PathBase:
      Path: /
      Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
      Accept-Encoding: gzip, deflate, br
      Accept-Language: en-US,en;q=0.9
      Cache-Control: max-age=0
      Connection: close
      Cookie: [Redacted]
      Host: localhost:44372
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 Edg/95.0.1020.30
      sec-ch-ua: [Redacted]
      sec-ch-ua-mobile: [Redacted]
      sec-ch-ua-platform: [Redacted]
      upgrade-insecure-requests: [Redacted]
      sec-fetch-site: [Redacted]
      sec-fetch-mode: [Redacted]
      sec-fetch-user: [Redacted]
      sec-fetch-dest: [Redacted]
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      StatusCode: 200
      Content-Type: text/plain; charset=utf-8
```

The preceding output was enabled with the following `appsettings.Development.json` file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
    }
  }
}
```

HTTP logging provides logs of:

* HTTP Request information
* Common properties
* Headers
* Body
* HTTP Response information

To configure the HTTP logging middleware, specify `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions`:

```csharp
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpLogging(logging =>
{
    // Customize HTTP logging.
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("My-Request-Header");
    logging.ResponseHeaders.Add("My-Response-Header");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
});

var app = builder.Build();
app.UseHttpLogging();

app.MapGet("/", () => "Hello World!");

app.Run();
```
