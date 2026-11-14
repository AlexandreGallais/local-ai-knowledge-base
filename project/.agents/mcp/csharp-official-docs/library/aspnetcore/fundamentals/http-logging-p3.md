---
title: "HTTP logging in .NET and ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/http-logging/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HTTP logging in .NET and ASP.NET Core (part 3 of 3)

## Logging redaction options

To configure options for logging with redaction, call `Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLoggingRedaction*` in `Program.cs` using the lambda to configure `Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions`:

```csharp
using Microsoft.Extensions.Compliance.Classification;

namespace HttpLoggingSample
{
    public static class MyTaxonomyClassifications
    {
        public static string Name => "MyTaxonomy";

        public static DataClassification Private => new(Name, nameof(Private));
        public static DataClassification Public => new(Name, nameof(Public));
        public static DataClassification Personal => new(Name, nameof(Personal));
    }
}
```

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```

With the previous redaction configuration, the output is similar to the following:

```output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[9]
      Request and Response:
      server.address: localhost:61361
      Path: /
      http.request.header.accept:
      Protocol: HTTP/2
      Method: GET
      Scheme: https
      http.response.header.content-type:
      StatusCode: 200
      Duration: 8.4684
info: Microsoft.AspNetCore.Hosting.Diagnostics[2]
      Request finished HTTP/2 GET https://localhost:61361/ - 200 - text/plain;+charset=utf-8 105.5334ms
```

> **Note:**
> Request path `/home` isn't logged because it's included in the `ExcludePathStartsWith` property. `http.request.header.accept` and `http.response.header.content-type` were redacted by `Microsoft.Extensions.Compliance.Redaction.ErasingRedactor`.

### `RequestPathLoggingMode`

`Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestPathLoggingMode` determines how the request path is logged, whether `Formatted` or `Structured`, set by `Microsoft.AspNetCore.Diagnostics.Logging.IncomingPathLoggingMode`:

* `Formatted`: Logs the request path without parameters.
* `Structured`: Logs the request path with parameters included.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```

### `RequestPathParameterRedactionMode`

`Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestPathParameterRedactionMode`
specifies how route parameters in the request path should be redacted, whether `Strict`, `Loose`, or `None`, set by `Microsoft.Extensions.Http.Diagnostics.HttpRouteParameterRedactionMode`:

* `Strict`: Request route parameters are considered sensitive, require explicit annotation with a data classification, and are redacted by default.
* `Loose`: All parameters are considered as non-sensitive and included as-is by default.
* `None`: Route parameters aren't redacted regardless of the presence of data classification annotations.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```

### `RequestHeadersDataClasses`

`Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestHeadersDataClasses` maps request headers to their data classification, which determines how they are redacted:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```

### `ResponseHeadersDataClasses`

`Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.ResponseHeadersDataClasses`, similar to `Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RequestHeadersDataClasses``, but for response headers:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```

### `RouteParameterDataClasses`

`Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.RouteParameterDataClasses` maps route parameters to their data classification:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```

### `ExcludePathStartsWith`

`Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.ExcludePathStartsWith` specifies paths that should be excluded from logging entirely:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```

### `IncludeUnmatchedRoutes`

`Microsoft.AspNetCore.Diagnostics.Logging.LoggingRedactionOptions.IncludeUnmatchedRoutes` allows reporting unmatched routes. If set to `true`, logs whole path of routes not identified by Routing instead of logging `Unknown` value for path attribute:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });
builder.Services.AddRedaction();

builder.Services.AddHttpLoggingRedaction(op =>
{
    op.RequestPathParameterRedactionMode = HttpRouteParameterRedactionMode.None;
    op.RequestPathLoggingMode = IncomingPathLoggingMode.Formatted;
    op.RequestHeadersDataClasses.Add(HeaderNames.Accept, MyTaxonomyClassifications.Public);
    op.ResponseHeadersDataClasses.Add(HeaderNames.ContentType, MyTaxonomyClassifications.Private);
    op.RouteParameterDataClasses = new Dictionary<string, DataClassification>
    {
        { "one", MyTaxonomyClassifications.Personal },
    };
    // Add the paths that should be filtered, with a leading '/'.
    op.ExcludePathStartsWith.Add("/home");
    op.IncludeUnmatchedRoutes = true;
});

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Logged!");
app.MapGet("/home", () => "Not logged!");

app.Run();
```
