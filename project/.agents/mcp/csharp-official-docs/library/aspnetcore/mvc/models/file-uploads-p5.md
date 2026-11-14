---
title: "Upload files in ASP.NET Core (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/models/file-uploads.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Upload files in ASP.NET Core (part 5 of 5)

## Server and app configuration

### Multipart body length limit

`Microsoft.AspNetCore.Http.Features.FormOptions.MultipartBodyLengthLimit` sets the limit for the length of each multipart body. Form sections that exceed this limit throw an `System.IO.InvalidDataException` when parsed. The default is 134,217,728 (128 MB). Customize the limit using the `Microsoft.AspNetCore.Http.Features.FormOptions.MultipartBodyLengthLimit` setting in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<FormOptions>(options =>
{
    // Set the limit to 256 MB
    options.MultipartBodyLengthLimit = 268435456;
});
```

`Microsoft.AspNetCore.Mvc.RequestFormLimitsAttribute` is used to set the `Microsoft.AspNetCore.Http.Features.FormOptions.MultipartBodyLengthLimit` for a single page or action.

In a Razor Pages app, apply the filter with a convention in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages(options =>
{
    options.Conventions
        .AddPageApplicationModelConvention("/FileUploadPage",
            model =>
            {
                // Set the limit to 256 MB
                model.Filters.Add(
                    new RequestFormLimitsAttribute()
                    {
                        MultipartBodyLengthLimit = 268435456
                    });
            });
});
```

In a Razor Pages app or an MVC app, apply the filter to the page model or action method:

```csharp
// Set the limit to 256 MB
[RequestFormLimits(MultipartBodyLengthLimit = 268435456)]
public class BufferedSingleFileUploadPhysicalModel : PageModel
{
    ...
}
```

### Kestrel maximum request body size

For apps hosted by Kestrel, the default maximum request body size is 30,000,000 bytes, which is approximately 28.6 MB. Customize the limit using the MaxRequestBodySize Kestrel server option:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    // Handle requests up to 50 MB
    options.Limits.MaxRequestBodySize = 52428800;
});
```

`Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute` is used to set the MaxRequestBodySize for a single page or action.

In a Razor Pages app, apply the filter with a convention in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages(options =>
{
    options.Conventions
        .AddPageApplicationModelConvention("/FileUploadPage",
            model =>
            {
                // Handle requests up to 50 MB
                model.Filters.Add(
                    new RequestSizeLimitAttribute(52428800));
            });
});
```

In a Razor pages app or an MVC app, apply the filter to the page handler class or action method:

```csharp
// Handle requests up to 50 MB
[RequestSizeLimit(52428800)]
public class BufferedSingleFileUploadPhysicalModel : PageModel
{
    ...
}
```

The `RequestSizeLimitAttribute` can also be applied using the `@attribute` Razor directive:

```cshtml
@attribute [RequestSizeLimitAttribute(52428800)]
```

### Other Kestrel limits

Other Kestrel limits might apply for apps hosted by Kestrel:

* Maximum client connections
* Request and response data rates

### IIS

When hosted on IIS in-process, request size limits can exist at both the IIS request filtering module layer and the ASP.NET Core server layer:

* **IIS request filtering (`maxAllowedContentLength`)**: The default IIS request limit is 30,000,000 bytes (~28.6 MB). Customize this limit in the `web.config` file. IIS inspects incoming requests and rejects any request that exceeds this limit with HTTP 404.13 before the request reaches the ASP.NET Core app:

  ```xml
  <system.webServer>
    <security>
      <requestFiltering>
        <requestLimits maxAllowedContentLength="52428800" />
      </requestFiltering>
    </security>
  </system.webServer>
  ```

  For more information, see Request Limits `<requestLimits>`.

* **ASP.NET Core IIS server options (`IISServerOptions.MaxRequestBodySize`)**: ASP.NET Core also enforces a default request body size limit of 30,000,000 bytes (~28.6 MB) when hosted in-process. Customize this limit in `Program.cs`:

  ```csharp
  builder.Services.Configure<IISServerOptions>(options =>
  {
      options.MaxRequestBodySize = 52428800; // 50 MB
  });
  ```

> **Note:**
> When hosted in-process on IIS, both limits apply. If `maxAllowedContentLength` is smaller than `IISServerOptions.MaxRequestBodySize`, IIS rejects requests exceeding `maxAllowedContentLength` before ASP.NET Core processes them. To support larger uploads on IIS, increase both `maxAllowedContentLength` in `web.config` and `IISServerOptions.MaxRequestBodySize` (or apply `Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute`).

### Per-request body size limits

To dynamically adjust or remove the request body size limit for a specific request, use the `Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature` feature in middleware or an endpoint:

```csharp
app.MapPost("/upload", async (HttpContext context) =>
{
    var maxRequestBodySizeFeature = context.Features.Get<IHttpMaxRequestBodySizeFeature>();

    if (maxRequestBodySizeFeature is { IsReadOnly: false })
    {
        // Set a 100 MB limit for this request, or set to null for unlimited
        maxRequestBodySizeFeature.MaxRequestBodySize = 104857600;
    }

    // Process file upload stream
});
```

* Setting `MaxRequestBodySize` to `null` disables the ASP.NET Core server-side limit for that request.
* The limit must be configured **before** the app begins reading the request body. If `IsReadOnly` is `true`, the request body has already been read and attempting to set `MaxRequestBodySize` throws an `System.InvalidOperationException`.
* Changing `IHttpMaxRequestBodySizeFeature.MaxRequestBodySize` or applying `Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute` only overrides ASP.NET Core server limits (Kestrel or `IISServerOptions`). It does **not** bypass the IIS module-level `maxAllowedContentLength` limit configured in `web.config`.

### Request body size limits summary

The following table summarizes the request body size limit mechanisms in ASP.NET Core:

| Setting / Mechanism | Scope / Layer | How to configure | Default | Notes |
| --- | --- | --- | --- | --- |
| `maxAllowedContentLength` | IIS Module (IIS level) | `web.config` (`<requestLimits>`) | 30,000,000 bytes (~28.6 MB) | Checked by IIS before request reaches ASP.NET Core. Rejects with HTTP 404.13. |
| `IISServerOptions.MaxRequestBodySize` | ASP.NET Core IIS server | `builder.Services.Configure<IISServerOptions>` | 30,000,000 bytes (~28.6 MB) | Enforced by ASP.NET Core IIS in-process server handler. |
| `KestrelServerOptions.Limits.MaxRequestBodySize` | ASP.NET Core Kestrel server | `builder.WebHost.ConfigureKestrel` | 30,000,000 bytes (~28.6 MB) | Enforced by Kestrel server. |
| `Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute` | Action or Razor Page | `[RequestSizeLimit(bytes)]` or `@attribute` | N/A | Overrides ASP.NET Core server limit per action/page. Cannot bypass IIS `maxAllowedContentLength`. |
| `Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature` | Single HTTP Request | `context.Features.Get<IHttpMaxRequestBodySizeFeature>()` | N/A | Dynamically changes or disables (`null`) ASP.NET Core server limit before request body is read. |

## Troubleshoot

Following are some common problems encountered when working with uploading files and their possible solutions.

### Not Found error when deployed to an IIS server

The following error indicates that the uploaded file exceeds the server's configured content length:

```
HTTP 404.13 - Not Found
The request filtering module is configured to deny a request that exceeds the request content length.
```

For more information, see the IIS section.

### Connection failure

A connection error and a reset server connection probably indicate that the uploaded file exceeds Kestrel's maximum request body size. For more information, see the Kestrel maximum request body size section. Kestrel client connection limits are unlimited by default. If you've configured a connection limit, check whether it's rejecting connections before adjusting it.

### Null Reference Exception with IFormFile

If the controller is accepting uploaded files using `Microsoft.AspNetCore.Http.IFormFile` but the value is `null`, confirm that the HTML form is specifying an `enctype` value of `multipart/form-data`. If this attribute isn't set on the `<form>` element, the file upload doesn't occur and any bound `Microsoft.AspNetCore.Http.IFormFile` arguments are `null`. Also confirm that the upload naming in form data matches the app's naming.

### Stream was too long

The examples in this article rely upon `System.IO.MemoryStream` to hold the uploaded file's content. The size limit of a `MemoryStream` is `int.MaxValue`. If the app's file upload scenario requires holding file content larger than 50 MB, use an alternative approach that doesn't rely upon a single `MemoryStream` for holding an uploaded file's content.

## Related content

* HTTP connection request draining

* Unrestricted File Upload
* Azure Security: Security Frame: Input Validation | Mitigations
* Azure Cloud Design Patterns: Valet Key <example-value>
