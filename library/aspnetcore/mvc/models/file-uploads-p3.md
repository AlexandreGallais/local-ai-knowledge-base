---
title: "Upload files in ASP.NET Core (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/models/file-uploads.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Upload files in ASP.NET Core (part 3 of 5)

### Upload large files with streaming

For scenarios where large file uploads are required, streaming uploads allow you to process incoming multipart form data directly without buffering the entire file in memory or on disk via model binding. This technique is especially important for files that could exceed server or framework buffering thresholds.

The sample application for 9.x demonstrates how a server can receive a file and stream the data directly to disk, supporting robust cancellation via the HTTP request's cancellation token.

`Microsoft.AspNetCore.WebUtilities.MultipartReader` is an ASP.NET Core utility for reading files from incoming requests. The following snippet shows how to process a request and stream the file into an `outputStream` (such as a `System.IO.FileStream`):

```csharp
// Read the boundary from the Content-Type header
var boundary = HeaderUtilities.RemoveQuotes(
    MediaTypeHeaderValue.Parse(request.ContentType).Boundary).Value;

// Use MultipartReader to stream data to a destination
var reader = new MultipartReader(boundary, Request.Body);
MultipartSection? section;

while ((section = await reader.ReadNextSectionAsync(cancellationToken)) != null)
{
    var contentDisposition = section.GetContentDispositionHeader();

    if (contentDisposition != null && contentDisposition.IsFileDisposition())
    {
        await section.Body.CopyToAsync(outputStream, cancellationToken);
    }
}
```

`Microsoft.AspNetCore.Http.Features.IFormFeature` is a wrapper around `Microsoft.AspNetCore.WebUtilities.MultipartReader` that doesn't require you to write manual request body parsing code. You can use its `Microsoft.AspNetCore.Http.Features.IFormFeature.ReadFormAsync*` method to populate the request's form data, then access uploaded files from the built-in collection:

```csharp
// Get the IFormFeature and read the form
var formFeature = Request.HttpContext.Features.GetRequiredFeature<IFormFeature>();
await formFeature.ReadFormAsync(cancellationToken);

// Access the uploaded file (example: first file)
var filePath = Request.Form.Files.First().FileName;

return Results.Ok($"Saved file at {filePath}");
```

For advanced scenarios, manually parse the raw request body using `Microsoft.AspNetCore.Http.HttpRequest.BodyReader`, which exposes an `IPipeReader` for low-level, high-performance streaming. The sample app includes endpoint handlers that use `IPipeReader` in both Minimal APIs and controllers.

The 3.1 example demonstrates how to use JavaScript to stream a file to a controller action. The file'<example-value>'s contents are read using a `MultipartReader`, which reads each individual `MultipartSection`, processing the file or storing the contents as appropriate. After the multipart sections are read, the action performs its own model binding.

The initial page response loads the form and saves an antiforgery token in a cookie (via the `GenerateAntiforgeryTokenCookieAttribute` attribute). The attribute uses ASP.NET Core's built-in antiforgery support to set a cookie with a request token:

```csharp
public class GenerateAntiforgeryTokenCookieAttribute : ResultFilterAttribute
{
    public override void OnResultExecuting(ResultExecutingContext context)
    {
        var antiforgery = context.HttpContext.RequestServices.GetService<IAntiforgery>();

        // Send the request token as a JavaScript-readable cookie
        var tokens = antiforgery.GetAndStoreTokens(context.HttpContext);

        context.HttpContext.Response.Cookies.Append(
            "<example-value>",
            tokens.RequestToken,
            new CookieOptions() { HttpOnly = false });
    }

    public override void OnResultExecuted(ResultExecutedContext context)
    {
    }
}
```

The `DisableFormValueModelBindingAttribute` is used to disable model binding:

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class DisableFormValueModelBindingAttribute : Attribute, IResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        var factories = context.ValueProviderFactories;
        factories.RemoveType<FormValueProviderFactory>();
        factories.RemoveType<FormFileValueProviderFactory>();
        factories.RemoveType<JQueryFormValueProviderFactory>();
    }

    public void OnResourceExecuted(ResourceExecutedContext context)
    {
    }
}
```

In the sample app, `GenerateAntiforgeryTokenCookieAttribute` and `DisableFormValueModelBindingAttribute` are applied as filters to the page application models of `/StreamedSingleFileUploadDb` and `/StreamedSingleFileUploadPhysical` in `Startup.ConfigureServices` using Razor Pages conventions:

```csharp
services.AddRazorPages(options =>
{
    options.Conventions
        .AddPageApplicationModelConvention("/StreamedSingleFileUploadDb",
            model =>
            {
                model.Filters.Add(
                    new GenerateAntiforgeryTokenCookieAttribute());
                model.Filters.Add(
                    new DisableFormValueModelBindingAttribute());
            });
    options.Conventions
        .AddPageApplicationModelConvention("/StreamedSingleFileUploadPhysical",
            model =>
            {
                model.Filters.Add(
                    new GenerateAntiforgeryTokenCookieAttribute());
                model.Filters.Add(
                    new DisableFormValueModelBindingAttribute());
            });
});
```

Since model binding doesn't read the form, parameters that are bound from the form don't bind (query, route, and header continue to work). The action method works directly with the `Request` property. A `MultipartReader` is used to read each section. Key/value data is stored in a `KeyValueAccumulator`. After the multipart sections are read, the contents of the `KeyValueAccumulator` are used to bind the form data to a model type.

The complete `StreamingController.UploadDatabase` method for streaming to a database with EF Core:

```csharp
[HttpPost]
[DisableFormValueModelBinding]
[ValidateAntiForgeryToken]
public async Task<IActionResult> UploadDatabase()
{
    if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
    {
        ModelState.AddModelError("File", 
            $"The request couldn't be processed (Error 1).");
        // Log error

        return BadRequest(ModelState);
    }

    // Accumulate the form data key-value pairs in the request (formAccumulator).
    var formAccumulator = new KeyValueAccumulator();
    var trustedFileNameForDisplay = string.Empty;
    var untrustedFileNameForStorage = string.Empty;
    var streamedFileContent = Array.Empty<byte>();

    var boundary = MultipartRequestHelper.GetBoundary(
        MediaTypeHeaderValue.Parse(Request.ContentType),
        _defaultFormOptions.MultipartBoundaryLengthLimit);
    var reader = new MultipartReader(boundary, HttpContext.Request.Body);

    var section = await reader.ReadNextSectionAsync();

    while (section != null)
    {
        var hasContentDispositionHeader = 
            ContentDispositionHeaderValue.TryParse(
                section.ContentDisposition, out var contentDisposition);

        if (hasContentDispositionHeader)
        {
            if (MultipartRequestHelper
                .HasFileContentDisposition(contentDisposition))
            {
                untrustedFileNameForStorage = contentDisposition.FileName.Value;
                // Don't trust the file name sent by the client. To display
                // the file name, HTML-encode the value.
                trustedFileNameForDisplay = WebUtility.HtmlEncode(
                        contentDisposition.FileName.Value);

                streamedFileContent = 
                    await FileHelpers.ProcessStreamedFile(section, contentDisposition, 
                        ModelState, _permittedExtensions, _fileSizeLimit);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
            }
            else if (MultipartRequestHelper
                .HasFormDataContentDisposition(contentDisposition))
            {
                // Don't limit the key name length because the 
                // multipart headers length limit is already in effect.
                var key = <example-value>
                    .RemoveQuotes(contentDisposition.Name).Value;
                var encoding = GetEncoding(section);

                if (encoding == null)
                {
                    ModelState.AddModelError("File", 
                        $"The request couldn't be processed (Error 2).");
                    // Log error

                    return BadRequest(ModelState);
                }

                using (var streamReader = new StreamReader(
                    section.Body,
                    encoding,
                    detectEncodingFromByteOrderMarks: true,
                    bufferSize: 1024,
                    leaveOpen: true))
                {
                    // The value length limit is enforced by 
                    // MultipartBodyLengthLimit
                    var value = await streamReader.ReadToEndAsync();

                    if (string.Equals(value, "undefined", 
                        StringComparison.OrdinalIgnoreCase))
                    {
                        value = string.Empty;
                    }

                    formAccumulator.Append(key, value);

                    if (formAccumulator.ValueCount > 
                        _defaultFormOptions.ValueCountLimit)
                    {
                        // Form key count limit of 
                        // _defaultFormOptions.ValueCountLimit 
                        // is exceeded.
                        ModelState.AddModelError("File", 
                            $"The request couldn't be processed (Error 3).");
                        // Log error

                        return BadRequest(ModelState);
                    }
                }
            }
        }

        // Drain any remaining section body that hasn't been consumed and
        // read the headers for the next section.
        section = await reader.ReadNextSectionAsync();
    }

    // Bind form data to the model
    var formData = new FormData();
    var formValueProvider = new FormValueProvider(
        BindingSource.Form,
        new FormCollection(formAccumulator.GetResults()),
        CultureInfo.CurrentCulture);
    var bindingSuccessful = await TryUpdateModelAsync(formData, prefix: "",
        valueProvider: formValueProvider);

    if (!bindingSuccessful)
    {
        ModelState.AddModelError("File", 
            "The request couldn't be processed (Error 5).");
        // Log error

        return BadRequest(ModelState);
    }

    // **WARNING!**
    // In the following example, the file is saved without
    // scanning the file's contents. In most production
    // scenarios, an anti-virus/anti-malware scanner API
    // is used on the file before making the file available
    // for download or for use by other systems. 
    // For more information, see the topic that accompanies 
    // this sample app.

    var file = new AppFile()
    {
        Content = streamedFileContent,
        UntrustedName = untrustedFileNameForStorage,
        Note = formData.Note,
        Size = streamedFileContent.Length, 
        UploadDT = DateTime.UtcNow
    };

    _context.File.Add(file);
    await _context.SaveChangesAsync();

    return Created(nameof(StreamingController), null);
}
```

`MultipartRequestHelper` (`Utilities/MultipartRequestHelper.cs`):

```csharp
using System;
using System.IO;
using Microsoft.Net.Http.Headers;

namespace SampleApp.Utilities
{
    public static class MultipartRequestHelper
    {
        // Content-Type: multipart/form-data; boundary="----WebKitFormBoundarymx2fSWqWSd0OxQqq"
        // The spec at https://tools.ietf.org/html/rfc2046#section-5.1 states that 70 characters is a reasonable limit.
        public static string GetBoundary(MediaTypeHeaderValue contentType, int lengthLimit)
        {
            var boundary = HeaderUtilities.RemoveQuotes(contentType.Boundary).Value;

            if (string.IsNullOrWhiteSpace(boundary))
            {
                throw new InvalidDataException("Missing content-type boundary.");
            }

            if (boundary.Length > lengthLimit)
            {
                throw new InvalidDataException(
                    $"Multipart boundary length limit {lengthLimit} exceeded.");
            }

            return boundary;
        }

        public static bool IsMultipartContentType(string contentType)
        {
            return !string.IsNullOrEmpty(contentType)
                   && contentType.IndexOf("multipart/", StringComparison.OrdinalIgnoreCase) >= 0;
        }

        public static bool HasFormDataContentDisposition(ContentDispositionHeaderValue contentDisposition)
        {
            // Content-Disposition: form-data; name="key";
            return contentDisposition != null
                && contentDisposition.DispositionType.Equals("form-data")
                && string.IsNullOrEmpty(contentDisposition.FileName.Value)
                && string.IsNullOrEmpty(contentDisposition.FileNameStar.Value);
        }

        public static bool HasFileContentDisposition(ContentDispositionHeaderValue contentDisposition)
        {
            // Content-Disposition: form-data; name="myfile1"; filename="Misc 002.jpg"
            return contentDisposition != null
                && contentDisposition.DispositionType.Equals("form-data")
                && (!string.IsNullOrEmpty(contentDisposition.FileName.Value)
                    || !string.IsNullOrEmpty(contentDisposition.FileNameStar.Value));
        }
    }
}
```

The complete `StreamingController.UploadPhysical` method for streaming to a physical location:
