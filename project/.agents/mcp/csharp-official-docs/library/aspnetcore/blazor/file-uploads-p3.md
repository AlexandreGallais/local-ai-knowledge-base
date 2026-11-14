---
title: "ASP.NET Core Blazor file uploads (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/file-uploads.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor file uploads (part 3 of 5)

## Upload files to a server with client-side rendering (CSR)

*This section applies to client-side rendered (CSR) components in Blazor Web Apps or Blazor WebAssembly apps.*

The following example demonstrates uploading files to a backend web API controller in a separate app, possibly on a separate server, from a component in a Blazor Web App that adopts CSR or a component in a Blazor WebAssembly app.

The example adopts request streaming for a Chromium-based browser (for example, Google Chrome or Microsoft Edge) with HTTP/2 protocol and HTTPS. If request streaming can't be used, Blazor gracefully degrades to Fetch API without request streaming. For more information, see the File size read and upload limits section.

The following `UploadResult` class maintains the result of an uploaded file. When a file fails to upload on the server, an error code is returned in `ErrorCode` for display to the user. A safe file name is generated on the server for each file and returned to the client in `StoredFileName` for display. Files are keyed between the client and server using the unsafe/untrusted file name in `FileName`.

`UploadResult.cs`:

```csharp
public class UploadResult
{
    public bool Uploaded { get; set; }
    public string? FileName { get; set; }
    public string? StoredFileName { get; set; }
    public int ErrorCode { get; set; }
}
```

> **Note:**
> The preceding `UploadResult` class can be shared between client- and server-based projects. When client and server projects share the class, add an import to each project's imports file (`_Imports.razor`) for the shared project. For example:
>
> ```razor
> @using BlazorSample.Shared
> ```

The following `FileUpload2` component:

* Permits users to upload files from the client.
* Displays the untrusted/unsafe file name provided by the client in the UI. The untrusted/unsafe file name is automatically HTML-encoded by Razor for safe display in the UI.

A security best practice for production apps is to avoid sending error messages to clients that might reveal sensitive information about an app, server, or network. Providing detailed error messages can aid a malicious user in devising attacks on an app, server, or network. The example code in this section only sends back an error code number (`int`) for display by the component client-side if a server-side error occurs. If a user requires assistance with a file upload, they provide the error code to support personnel for support ticket resolution without ever knowing the exact cause of the error.

> **Warning:**
> **Don't trust file names supplied by clients** for:
>
> * Saving the file to a file system or service.
> * Display in UIs that don't encode file names automatically or via developer code.
>
> For more information on security considerations when uploading files to a server, see Upload files in ASP.NET Core.

In the Blazor Web App server project, add `System.Net.Http.IHttpClientFactory` and related services in the project's `Program` file:

```csharp
builder.Services.AddHttpClient();
```

The `System.Net.Http.HttpClient` services must be added to the server project because the client-side component is prerendered on the server. If you disable prerendering for the following component, you aren't required to provide the `System.Net.Http.HttpClient` services in the server project and don't need to add the preceding line to the server project.

For more information on adding `System.Net.Http.HttpClient` services to an ASP.NET Core app, see HTTP requests with IHttpClientFactory - ASP.NET Core.

The client project (`.Client`) of a Blazor Web App must also register an `System.Net.Http.HttpClient` for HTTP POST requests to a backend web API controller. Confirm or add the following to the client project's `Program` file:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
```

The preceding example sets the base address with `builder.HostEnvironment.BaseAddress` (`Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress`), which gets the base address for the app and is typically derived from the `<base>` tag's `href` value in the host page. If you're calling an external web API, set the URI to the web API's base address.

A standalone Blazor WebAssembly app that uploads files to a separate server web API either uses a named `HttpClient` or sets the default `System.Net.Http.HttpClient` service registration to point to the web API's endpoint. In the following example where the web API is hosted locally at port 5001, the base address is `https://localhost:5001`:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri("https://localhost:5001") });
```

In a Blazor Web App, add the `Microsoft.AspNetCore.Components.WebAssembly.Http` namespace to the component's directives:

```razor
@using Microsoft.AspNetCore.Components.WebAssembly.Http
```

`FileUpload2.razor`:

```razor
@page "/file-upload-2"
@using System.Linq
@using System.Net.Http.Headers
@using System.Net
@inject HttpClient Http
@inject ILogger<FileUpload2> Logger

<PageTitle>File Upload 2</PageTitle>

<h1>File Upload Example 2</h1>

<p>
    <label>
        Upload up to @maxAllowedFiles files:
        <InputFile OnChange="OnInputFileChange" multiple />
    </label>
</p>

@if (files.Count > 0)
{
    <div class="card">
        <div class="card-body">
            <ul>
                @foreach (var file in files)
                {
                    <li>
                        File: @file.Name
                        <br>
                        @if (FileUpload(uploadResults, file.Name, Logger,
                       out var result))
                        {
                            <span>
                                Stored File Name: @result.StoredFileName
                            </span>
                        }
                        else
                        {
                            <span>
                                There was an error uploading the file
                                (Error: @result.ErrorCode).
                            </span>
                        }
                    </li>
                }
            </ul>
        </div>
    </div>
}

@code {
    private List<File> files = new();
    private List<UploadResult> uploadResults = new();
    private int maxAllowedFiles = 3;
    private bool shouldRender;

    protected override bool ShouldRender() => shouldRender;

    private async Task OnInputFileChange(InputFileChangeEventArgs e)
    {
        shouldRender = false;
        long maxFileSize = 1024 * 15;
        var upload = false;

        using var content = new MultipartFormDataContent();

        foreach (var file in e.GetMultipleFiles(maxAllowedFiles))
        {
            if (uploadResults.SingleOrDefault(
                f => f.FileName == file.Name) is null)
            {
                try
                {
                    files.Add(new() { Name = file.Name });

                    var fileContent = new StreamContent(file.OpenReadStream(maxFileSize));

                    fileContent.Headers.ContentType =
                        new MediaTypeHeaderValue(file.ContentType);

                    content.Add(
                        content: fileContent,
                        name: "\"files\"",
                        fileName: file.Name);

                    upload = true;
                }
                catch (Exception ex)
                {
                    Logger.LogInformation(
                        "{FileName} not uploaded (Err: 6): {Message}",
                        file.Name, ex.Message);

                    uploadResults.Add(
                        new()
                        {
                            FileName = file.Name,
                            ErrorCode = 6,
                            Uploaded = false
                        });
                }
            }
        }

        if (upload)
        {
            using var request = new HttpRequestMessage(HttpMethod.Post, "/Filesave");
            request.SetBrowserRequestStreamingEnabled(true);
            request.Content = content;

            using var response = await Http.SendAsync(request);

            var newUploadResults = await response.Content
                .ReadFromJsonAsync<IList<UploadResult>>();

            if (newUploadResults is not null)
            {
                uploadResults = uploadResults.Concat(newUploadResults).ToList();
            }
        }

        shouldRender = true;
    }

    private static bool FileUpload(IList<UploadResult> uploadResults,
        string? fileName, ILogger<FileUpload2> logger, out UploadResult result)
    {
        result = uploadResults.SingleOrDefault(f => f.FileName == fileName) ?? new();

        if (!result.Uploaded)
        {
            logger.LogInformation("{FileName} not uploaded (Err: 5)", fileName);
            result.ErrorCode = 5;
        }

        return result.Uploaded;
    }

    private class File
    {
        public string? Name { get; set; }
    }
}
```

The following controller in the server-side project saves uploaded files from the client.

**To use the following code, create a `Development/unsafe_uploads` folder at the root of the server-side project for the app running in the `Development` environment.**

Because the example uses the app's environment as part of the path where files are saved, additional folders are required if other environments are used in testing and production. For example, create a `Staging/unsafe_uploads` folder for the `Staging` environment. Create a `Production/unsafe_uploads` folder for the `Production` environment.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see Upload files in ASP.NET Core.

In the following example for a hosted Blazor WebAssembly app or where a shared project is used to supply the `UploadResult` class, add the shared project's namespace:

```csharp
using BlazorSample.Shared;
```

We recommend using a namespace for the following controller (for example: `namespace BlazorSample.Controllers`).

`Controllers/FilesaveController.cs`:

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class FilesaveController(
    IHostEnvironment env, ILogger<FilesaveController> logger) 
    : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<IList<UploadResult>>> PostFile(
        [FromForm] IEnumerable<IFormFile> files)
    {
        var maxAllowedFiles = 3;
        long maxFileSize = 1024 * 15;
        var filesProcessed = 0;
        var resourcePath = new Uri($"{Request.Scheme}://{Request.Host}/");
        List<UploadResult> uploadResults = [];

        foreach (var file in files)
        {
            var uploadResult = new UploadResult();
            string trustedFileNameForFileStorage;
            var untrustedFileName = file.FileName;
            uploadResult.FileName = untrustedFileName;
            var trustedFileNameForDisplay =
                WebUtility.HtmlEncode(untrustedFileName);

            if (filesProcessed < maxAllowedFiles)
            {
                if (file.Length == 0)
                {
                    logger.LogInformation("{FileName} length is 0 (Err: 1)",
                        trustedFileNameForDisplay);
                    uploadResult.ErrorCode = 1;
                }
                else if (file.Length > maxFileSize)
                {
                    logger.LogInformation("{FileName} of {Length} bytes is " +
                        "larger than the limit of {Limit} bytes (Err: 2)",
                        trustedFileNameForDisplay, file.Length, maxFileSize);
                    uploadResult.ErrorCode = 2;
                }
                else
                {
                    try
                    {
                        trustedFileNameForFileStorage = Path.GetRandomFileName();
                        var path = Path.Combine(env.ContentRootPath,
                            env.EnvironmentName, "unsafe_uploads",
                            trustedFileNameForFileStorage);

                        await using FileStream fs = new(path, FileMode.Create);
                        await file.CopyToAsync(fs);

                        logger.LogInformation("{FileName} saved at {Path}",
                            trustedFileNameForDisplay, path);
                        uploadResult.Uploaded = true;
                        uploadResult.StoredFileName = trustedFileNameForFileStorage;
                    }
                    catch (IOException ex)
                    {
                        logger.LogError("{FileName} error on upload (Err: 3): {Message}",
                            trustedFileNameForDisplay, ex.Message);
                        uploadResult.ErrorCode = 3;
                    }
                }

                filesProcessed++;
            }
            else
            {
                logger.LogInformation("{FileName} not uploaded because the " +
                    "request exceeded the allowed {Count} of files (Err: 4)",
                    trustedFileNameForDisplay, maxAllowedFiles);
                uploadResult.ErrorCode = 4;
            }

            uploadResults.Add(uploadResult);
        }

        return new CreatedResult(resourcePath, uploadResults);
    }
}
```

In the preceding code, `System.IO.Path.GetRandomFileName*` is called to generate a secure file name. Never trust the file name provided by the browser, as a cyberattacker may choose an existing file name that overwrites an existing file or send a path that attempts to write outside of the app.

The server app must register controller services and map controller endpoints. For more information, see Routing to controller actions in ASP.NET Core. We recommend adding controller services with `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews*` in order to automatically mitigate Cross-Site Request Forgery (XSRF/CSRF) attacks for authenticated users. If you merely use `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers*`, antiforgery isn't enabled automatically. For more information, see Routing to controller actions in ASP.NET Core.
