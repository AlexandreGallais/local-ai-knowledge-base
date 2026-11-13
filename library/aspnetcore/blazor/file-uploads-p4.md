---
title: "ASP.NET Core Blazor file uploads (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/file-uploads.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor file uploads (part 4 of 5)

Cross-Origin Requests (CORS) configuration on the server is required for request streaming when the server is hosted at a different origin, and a preflight request is always made by the client. In the service configuration of the server's `Program` file (the server project of a Blazor Web App or the backend server web API of a Blazor WebAssembly app), the following default CORS policy is suitable for testing with the examples in this article. The client makes the local request from port 5003. Change the port number to match the client app port that you're using:

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:5003")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
```

After calling `Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*` in the `Program` file, call `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` to add CORS middleware:

```csharp
app.UseCors();
```

For more information, see Enable Cross-Origin Requests (CORS) in ASP.NET Core.

Configure the server's maximum request body size and multipart body length limits if the limits constrain the upload size.

For the Kestrel server, set `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.MaxRequestBodySize` (default: 30,000,000 bytes) and `Microsoft.AspNetCore.Http.Features.FormOptions.MultipartBodyLengthLimit` (default: 134,217,728 bytes). Set the `maxFileSize` variable in the component and the controller to the same value.

In the following `Program` file Kestrel configuration (the server project of a Blazor Web App or the backend server web API of a Blazor WebAssembly app), the `{LIMIT}` placeholder is the limit in bytes:

```csharp
using Microsoft.AspNetCore.Http.Features;

...

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = {LIMIT};
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = {LIMIT};
});
```

## Cancel a file upload

A file upload component can detect when a user has cancelled an upload by using a `System.Threading.CancellationToken` when calling into the `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` or `System.IO.StreamReader.ReadAsync*`.

Create a `System.Threading.CancellationTokenSource` for the `InputFile` component. At the start of the `OnInputFileChange` method, check if a previous upload is in progress.

If a file upload is in progress:

* Call `System.Threading.CancellationTokenSource.Cancel*` on the previous upload.
* Create a new `System.Threading.CancellationTokenSource` for the next upload and pass the `System.Threading.CancellationTokenSource.Token` to `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` or `System.IO.StreamReader.ReadAsync*`.

## Upload files server-side with progress

The following example demonstrates how to upload files in a server-side app with upload progress displayed to the user.

To use the following example in a test app:

* **Create a folder to save uploaded files for the `Development` environment: `Development/unsafe_uploads`.**
* Configure the maximum file size (`maxFileSize`, 15 KB in the following example) and maximum number of allowed files (`maxAllowedFiles`, 3 in the following example).
* Set the buffer to a different value (10 KB in the following example), if desired, for increased granularity in progress reporting. We don't recommended using a buffer larger than 30 KB due to performance and security concerns.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see Upload files in ASP.NET Core.

`FileUpload3.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/FileUpload3.razor._
For more information, see the following API resources:

* `System.IO.FileStream`: Provides a `System.IO.Stream` for a file, supporting both synchronous and asynchronous read and write operations.
* `System.IO.FileStream.ReadAsync*`: The preceding `FileUpload3` component reads the stream asynchronously with `System.IO.FileStream.ReadAsync*`. Reading a stream synchronously with `System.IO.FileStream.Read*` isn't supported in Razor components.

## File streams

With server interactivity, file data is streamed over the SignalR connection into .NET code on the server as the file is read.

For a WebAssembly-rendered component, file data is streamed directly into the .NET code within the browser.

## Upload image preview

For an image preview of uploading images, start by adding an `InputFile` component with a component reference and an `OnChange` handler:

```razor
<InputFile @ref="inputFile" OnChange="ShowPreview" />
```

Add an image element with an element reference, which serves as the placeholder for the image preview:

```razor
<img @ref="previewImageElem" />
```

Add the associated references:

```razor
@code {
    private InputFile? inputFile;
    private ElementReference previewImageElem;
}
```

In JavaScript, add a function called with an HTML `input` and `img` element that performs the following:

* Extracts the selected file.
* Creates an object URL with `createObjectURL`.
* Sets an event listener to revoke the object URL with `revokeObjectURL` after the image is loaded, so memory isn't leaked.
* Sets the `img` element's source to display the image.

```javascript
window.previewImage = (inputElem, imgElem) => {
  const url = URL.createObjectURL(inputElem.files[0]);
  imgElem.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
  imgElem.src = url;
}
```

Finally, use an injected `Microsoft.JSInterop.IJSRuntime` to add the `OnChange` handler that calls the JavaScript function:

```razor
@inject IJSRuntime JS

...

@code {
    ...

    private async Task ShowPreview() => await JS.InvokeVoidAsync(
        "previewImage", inputFile!.Element, previewImageElem);
}
```

The preceding example is for uploading a single image. The approach can be expanded to support `multiple` images.

The following `FileUpload4` component shows the complete example.

`FileUpload4.razor`:

```razor
@page "/file-upload-4"
@inject IJSRuntime JS

<h1>File Upload Example</h1>

<InputFile @ref="inputFile" OnChange="ShowPreview" />

<img style="max-width:200px;max-height:200px" @ref="previewImageElem" />

@code {
    private InputFile? inputFile;
    private ElementReference previewImageElem;

    private async Task ShowPreview() => await JS.InvokeVoidAsync(
        "previewImage", inputFile!.Element, previewImageElem);
}
```

## Save small files directly to a database with EF Core

Many ASP.NET Core apps use Entity Framework Core (EF Core) to manage database operations. Saving thumbnails and avatars directly to the database is a common requirement. This section demonstrates a general approach that can be further enhanced for production apps.

The following pattern:

* Is based on the Blazor movie database tutorial app.
* Can be enhanced with additional code for file size and content type validation feedback.
* Incurs a performance penalty and DoS risk. Carefully weigh the risk when reading any file into memory and consider alternative approaches, especially for larger files. Alternative approaches include saving files directly to disk or a third-party service for antivirus/antimalware checks, further processing, and serving to clients.

For the following example to work in a Blazor Web App (.NET 8 or later), the component must adopt an interactive render mode (for example, `@rendermode InteractiveServer`) to call `HandleSelectedThumbnail` on an `InputFile` component file change (`OnChange` parameter/event). Blazor Server app components are always interactive and don't require a render mode.

In the following example, a small thumbnail (<= 100 KB) in an `Microsoft.AspNetCore.Components.Forms.IBrowserFile` is saved to a database with EF Core. If a file isn't selected by the user for the `InputFile` component, a default thumbnail is saved to the database.

The default thumbnail (`default-thumbnail.jpg`) is at the project root with a **Copy to Output Directory** setting of **Copy if newer**:

The `Movie` model (`Movie.cs`) has a property (`Thumbnail`) to hold the thumbnail image data:

```csharp
[Column(TypeName = "varbinary(MAX)")]
public byte[]? Thumbnail { get; set; }
```

Image data is stored as bytes in the database as `varbinary(MAX)`. The app base-64 encodes the bytes for display because base-64 encoded data is roughly a third larger than the raw bytes of the image, thus base-64 image data requires additional database storage and reduces the performance of database read/write operations.

Components that display the thumbnail pass image data to the `img` tag's `src` attribute as JPEG, base-64 encoded data:

```razor
<img src="data:image/jpeg;base64,@Convert.ToBase64String(movie.Thumbnail)" 
    alt="User thumbnail" />
```

In the following `Create` component, an image upload is processed. You can enhance the example further with custom validation for file type and size using the approaches in ASP.NET Core Blazor forms validation. To see the full `Create` component without the thumbnail upload code in the following example, see the `BlazorWebAppMovies` sample app in the Blazor samples GitHub repository.

`Components/Pages/MoviePages/Create.razor`:

```razor
@page "/movies/create"
@rendermode InteractiveServer
@using Microsoft.EntityFrameworkCore
@using BlazorWebAppMovies.Models
@inject IDbContextFactory<BlazorWebAppMovies.Data.BlazorWebAppMoviesContext> DbFactory
@inject NavigationManager NavigationManager

...

<div class="row">
    <div class="col-md-4">
        <EditForm method="post" Model="Movie" OnValidSubmit="AddMovie" 
            FormName="create" Enhance>
            <DataAnnotationsValidator />
            <ValidationSummary class="text-danger" role="alert"/>

            ...

            <div class="mb-3">
                <label for="thumbnail" class="form-label">Thumbnail:</label>
                <InputFile id="thumbnail" OnChange="HandleSelectedThumbnail" 
                    class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </EditForm>
    </div>
</div>

...

@code {
    private const long maxFileSize = 102400;
    private IBrowserFile? browserFile;

    [SupplyParameterFromForm]
    private Movie Movie { get; set; } = new();

    private void HandleSelectedThumbnail(InputFileChangeEventArgs e)
    {
        browserFile = e.File;
    }

    private async Task AddMovie()
    {
        using var context = DbFactory.CreateDbContext();

        if (browserFile?.Size > 0 && browserFile?.Size <= maxFileSize)
        {
            using var memoryStream = new MemoryStream();
            await browserFile.OpenReadStream(maxFileSize).CopyToAsync(memoryStream);

            Movie.Thumbnail = memoryStream.ToArray();
        }
        else
        {
            Movie.Thumbnail = File.ReadAllBytes(
                $"{AppDomain.CurrentDomain.BaseDirectory}default_thumbnail.jpg");
        }

        context.Movie.Add(Movie);
        await context.SaveChangesAsync();
        NavigationManager.NavigateTo("/movies");
    }
}
```

The same approach would be adopted in the `Edit` component with an interactive render mode if users were allowed to edit a movie's thumbnail image.

## Upload files to an external service

Instead of an app handling file upload bytes and the app's server receiving uploaded files, clients can directly upload files to an external service. The app can safely process the files from the external service on demand. This approach hardens the app and its server against malicious attacks and potential performance problems.

Consider an approach that uses Azure Files, Azure Blob Storage, or a third-party service with the following potential benefits:

* Upload files from the client directly to an external service with a JavaScript client library or REST API. For example, Azure offers the following client libraries and APIs:
  * Azure Storage File Share client library
  * Azure Files REST API
  * Azure Storage Blob client library for JavaScript
  * Blob service REST API
* Authorize user uploads with a user-delegated shared access signature (SAS) token generated by the app (server-side) for each client file upload. For example, Azure offers the following SAS features:
  * Azure Storage File Share client library for JavaScript: with SAS Token
  * Azure Storage Blob client library for JavaScript: with SAS Token
* Provide automatic redundancy and file share backup.
* Limit uploads with quotas. Note that Azure Blob Storage's quotas are set at the account level, not the container level. However, Azure Files quotas are at the file share level and might provide better control over upload limits. For more information, see the Azure documents linked earlier in this list.
* Secure files with server-side encryption (SSE).

For more information on Azure Blob Storage and Azure Files, see the Azure Storage documentation.

## Server-side SignalR message size limit

File uploads may fail even before they start, when Blazor retrieves data about the files that exceeds the maximum SignalR message size.

SignalR defines a message size limit that applies to every message Blazor receives, and the `Microsoft.AspNetCore.Components.Forms.InputFile` component streams files to the server in messages that respect the configured limit. However, the first message, which indicates the set of files to upload, is sent as a unique single message. The size of the first message may exceed the SignalR message size limit. The issue isn't related to the size of the files, it's related to the number of files.

The logged error is similar to the following:

> :::no-loc text="Error: Connection disconnected with error 'Error: Server returned an error on close: Connection closed with an error.'. e.log @ blazor.server.js:1":::

When uploading files, reaching the message size limit on the first message is rare. If the limit is reached, the app can configure `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize` with a larger value.

For more information on SignalR configuration and how to set `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize`, see ASP.NET Core Blazor SignalR guidance.
