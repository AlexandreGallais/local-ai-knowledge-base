---
title: "ASP.NET Core Blazor file uploads (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/file-uploads.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor file uploads (part 2 of 5)

## Upload files to a server with server-side rendering

*This section applies to Interactive Server components in Blazor Web Apps or Blazor Server apps.*

The following example demonstrates uploading files from a server-side app to a backend web API controller in a separate app, possibly on a separate server.

In the server-side app's `Program` file, add `System.Net.Http.IHttpClientFactory` and related services that allow the app to create `System.Net.Http.HttpClient` instances:

```csharp
builder.Services.AddHttpClient();
```

For more information, see HTTP requests with IHttpClientFactory - ASP.NET Core.

For the examples in this section:

* The web API runs at the URL: `https://localhost:5001`
* The server-side app runs at the URL: `https://localhost:5003`

For testing, the preceding URLs are configured in the projects' `Properties/launchSettings.json` files.

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

A security best practice for production apps is to avoid sending error messages to clients that might reveal sensitive information about an app, server, or network. Providing detailed error messages can aid a malicious user in devising attacks on an app, server, or network. The example code in this section only sends back an error code number (`int`) for display by the component client-side if a server-side error occurs. If a user requires assistance with a file upload, they provide the error code to support personnel for support ticket resolution without ever knowing the exact cause of the error.

The following `LazyBrowserFileStream` class defines a custom stream type that lazily calls `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` just before the first bytes of the stream are requested. The stream isn't transmitted from the browser to the server until reading the stream begins in .NET.

`LazyBrowserFileStream.cs`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/LazyBrowserFileStream.cs._
The following `FileUpload2` component:

* Permits users to upload files from the client.
* Displays the untrusted/unsafe file name provided by the client in the UI. The untrusted/unsafe file name is automatically HTML-encoded by Razor for safe display in the UI.

> **Warning:**
> **Don't trust file names supplied by clients** for:
>
> * Saving the file to a file system or service.
> * Display in UIs that don't encode file names automatically or via developer code.
>
> For more information on security considerations when uploading files to a server, see Upload files in ASP.NET Core.

`FileUpload2.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/FileUpload2.razor._

If the component limits file uploads to a single file at a time or if the component only adopts client-side rendering (CSR, `InteractiveWebAssembly`), the component can avoid the use of the `LazyBrowserFileStream` and use a `System.IO.Stream`. The following demonstrates the changes for the `FileUpload2` component:

```diff
- var stream = new LazyBrowserFileStream(file, maxFileSize);
- var fileContent = new StreamContent(stream);
+ var fileContent = new StreamContent(file.OpenReadStream(maxFileSize));
```

Remove the `LazyBrowserFileStream` class (`LazyBrowserFileStream.cs`), as it isn't used.

The following controller in the web API project saves uploaded files from the client.

> **Important:**
> The controller in this section is intended for use in a separate web API project from the Blazor app. The web API should mitigate Cross-Site Request Forgery (XSRF/CSRF) attacks if file upload users are authenticated.

**To use the following code, create a `Development/unsafe_uploads` folder at the root of the web API project for the app running in the `Development` environment.**

Because the example uses the app's environment as part of the path where files are saved, additional folders are required if other environments are used in testing and production. For example, create a `Staging/unsafe_uploads` folder for the `Staging` environment. Create a `Production/unsafe_uploads` folder for the `Production` environment.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see Upload files in ASP.NET Core.

`Controllers/FilesaveController.cs`:

```csharp
using System.Net;
using Microsoft.AspNetCore.Mvc;

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

The server app must register controller services and map controller endpoints. For more information, see Routing to controller actions in ASP.NET Core.
