---
title: "Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/host-and-deploy/webassembly/deployment-layout.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps (part 3 of 3)

## Serve the bundle from the host server app

Due to security restrictions, ASP.NET Core doesn't serve the `app.bundle` file. A request processing helper is required to serve the file when it's requested by clients.

> **Note:**
> Since the same optimizations are transparently applied to the Publish Extensions that are applied to the app's files, the `app.bundle.gz` and `app.bundle.br` compressed asset files are produced automatically on publish.

Place C# code in `Program.cs` of the **:::no-loc text="Server":::** project immediately before the line that sets the fallback file to `index.html` (`app.MapFallbackToFile("index.html");`) to respond to a request for the bundle file (for example, `app.bundle`):

```csharp
app.MapGet("app.bundle", (HttpContext context) =>
{
    string? contentEncoding = null;
    var contentType = 
        "multipart/form-data; boundary=\"--0a7e8441d64b4bf89086b85e59523b7d\"";
    var fileName = "app.bundle";

    var acceptEncodings = context.Request.Headers.AcceptEncoding;

    if (Microsoft.Net.Http.Headers.StringWithQualityHeaderValue
        .StringWithQualityHeaderValue
        .TryParseList(acceptEncodings, out var encodings))
    {
        if (encodings.Any(e => e.Value == "br"))
        {
            contentEncoding = "br";
            fileName += ".br";
        }
        else if (encodings.Any(e => e.Value == "gzip"))
        {
            contentEncoding = "gzip";
            fileName += ".gz";
        }
    }

    if (contentEncoding != null)
    {
        context.Response.Headers.ContentEncoding = contentEncoding;
    }

    return Results.File(
        app.Environment.WebRootFileProvider.GetFileInfo(fileName)
            .CreateReadStream(), contentType);
});
```

The content type matches the type defined earlier in the build task. The endpoint checks for the content encodings accepted by the browser and serves the optimal file, Brotli (`.br`) or Gzip (`.gz`).
