---
title: "HTTP logging in .NET and ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/http-logging/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# HTTP logging in ASP.NET Core

-->
-->

HTTP logging is a middleware that logs information about incoming HTTP requests and HTTP responses. HTTP logging provides logs of:

* HTTP request information
* Common properties
* Headers
* Body
* HTTP response information

HTTP logging can:

* Log all requests and responses or only requests and responses that meet certain criteria.
* Select which parts of the request and response are logged.
* Allow you to redact sensitive information from the logs.

HTTP logging ***can reduce the performance of an app***, especially when logging the request and response bodies. Consider the performance impact when selecting fields to log. Test the performance impact of the selected logging properties.

> **Warning:**
> HTTP logging can potentially log personally identifiable information (PII). Consider the risk and avoid logging sensitive information.
> For more information about redaction, check redacting sensitive data

## Enable HTTP logging

HTTP logging is enabled by calling `Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging*` and `Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseHttpLogging*`, as shown in the following example:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });

var app = builder.Build();

app.UseHttpLogging();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.MapGet("/", () => "Hello World!");

app.Run();
```

The empty lambda in the preceding example of calling `AddHttpLogging` adds the middleware with the default configuration. By default, HTTP logging logs request properties, such as the path, and request headers. It also logs the response status code and response headers. The request path isn't repeated in separate response or body log entries.

Add the following line to the `appsettings.Development.json` file at the `"LogLevel": {` level so the HTTP logs are displayed:

```json
"Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
```

With the default configuration, a request and response is logged as a pair of messages similar to the following example:

```output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Protocol: HTTP/2
      Method: GET
      Scheme: https
      PathBase:
      Path: /
      Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
      Host: localhost:52941
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61
      Accept-Encoding: gzip, deflate, br
      Accept-Language: en-US,en;q=0.9
      Upgrade-Insecure-Requests: [Redacted]
      sec-ch-ua: [Redacted]
      sec-ch-ua-mobile: [Redacted]
      sec-ch-ua-platform: [Redacted]
      sec-fetch-site: [Redacted]
      sec-fetch-mode: [Redacted]
      sec-fetch-user: [Redacted]
      sec-fetch-dest: [Redacted]
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      StatusCode: 200
      Content-Type: text/plain; charset=utf-8
      Date: Tue, 24 Oct 2023 02:03:53 GMT
      Server: Kestrel
```

To correlate separate log messages from the same request, enable log scopes on a logging provider that supports scopes. Alternatively, use `CombineLogs` to combine the enabled request and response logs into one message.

## HTTP logging options

To configure global options for the HTTP logging middleware, call `Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging*` in `Program.cs`, using the lambda to configure `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions`.

```csharp
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    logging.CombineLogs = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseStaticFiles();

app.UseHttpLogging();

app.Use(async (context, next) =>
{
    context.Response.Headers["MyResponseHeader"] =
        new string[] { "My Response Header Value" };

    await next();
});

app.MapGet("/", () => "Hello World!");

app.Run();
```

> **Note:**
> In the preceding sample and following samples, `UseHttpLogging` is called after `UseStaticFiles`, so HTTP logging isn't enabled for static files. To enable static file HTTP logging, call `UseHttpLogging` before `UseStaticFiles`.

### `LoggingFields`

`HttpLoggingOptions.LoggingFields` is an enum flag that configures specific parts of the request and response to log. `LoggingFields` defaults to `Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPropertiesAndHeaders` | `Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponsePropertiesAndHeaders`.

### `RequestHeaders` and `ResponseHeaders`

`Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders` and `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders` are sets of HTTP headers that are logged. Header values are only logged for header names that are in these collections. The following code adds `sec-ch-ua` to the `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestHeaders`, so the value of the `sec-ch-ua` header is logged. And it adds `MyResponseHeader` to the `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseHeaders`, so the value of the `MyResponseHeader` header is logged. If these lines are removed, the values of these headers are `[Redacted]`.

```csharp
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    logging.CombineLogs = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseStaticFiles();

app.UseHttpLogging();

app.Use(async (context, next) =>
{
    context.Response.Headers["MyResponseHeader"] =
        new string[] { "My Response Header Value" };

    await next();
});

app.MapGet("/", () => "Hello World!");

app.Run();
```

### `MediaTypeOptions`

`Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.MediaTypeOptions` provides configuration for selecting which encoding to use for a specific media type.

```csharp
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    logging.CombineLogs = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseStaticFiles();

app.UseHttpLogging();

app.Use(async (context, next) =>
{
    context.Response.Headers["MyResponseHeader"] =
        new string[] { "My Response Header Value" };

    await next();
});

app.MapGet("/", () => "Hello World!");

app.Run();
```

This approach can also be used to enable logging for data that isn't logged by default (for example, form data, which might have a media type such as `application/x-www-form-urlencoded` or `multipart/form-data`).

#### `MediaTypeOptions` methods

* `Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddText*`
* `Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.AddBinary*`
* `Microsoft.AspNetCore.HttpLogging.MediaTypeOptions.Clear*`

### `RequestBodyLogLimit` and `ResponseBodyLogLimit`

* `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.RequestBodyLogLimit`
* `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.ResponseBodyLogLimit`

```csharp
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    logging.CombineLogs = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseStaticFiles();

app.UseHttpLogging();

app.Use(async (context, next) =>
{
    context.Response.Headers["MyResponseHeader"] =
        new string[] { "My Response Header Value" };

    await next();
});

app.MapGet("/", () => "Hello World!");

app.Run();
```

### `CombineLogs`

Setting `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.CombineLogs` to `true` configures the middleware to consolidate all of its enabled logs for a request and response into one log at the end. This includes the request, request body, response, response body, and duration.

```csharp
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    logging.CombineLogs = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseStaticFiles();

app.UseHttpLogging();

app.Use(async (context, next) =>
{
    context.Response.Headers["MyResponseHeader"] =
        new string[] { "My Response Header Value" };

    await next();
});

app.MapGet("/", () => "Hello World!");

app.Run();
```

## Endpoint-specific configuration

For endpoint-specific configuration in Minimal API apps, a `Microsoft.AspNetCore.Builder.HttpLoggingEndpointConventionBuilderExtensions.WithHttpLogging*` extension method is available. The following example shows how to configure HTTP logging for one endpoint:

```csharp
app.MapGet("/response", () => "Hello World! (logging response)")
    .WithHttpLogging(HttpLoggingFields.ResponsePropertiesAndHeaders);
```

For endpoint-specific configuration in apps that use controllers, the `[HttpLogging]` attribute is available. The attribute can also be used in Minimal API apps, as shown in the following example:

```csharp
app.MapGet("/duration", [HttpLogging(loggingFields: HttpLoggingFields.Duration)]
    () => "Hello World! (logging duration)");
```
