---
title: "Upload files in ASP.NET Core (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/models/file-uploads.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Upload files in ASP.NET Core (part 2 of 5)

## File upload scenarios

Two general approaches for uploading files are buffering and streaming.

### Buffering

The entire file is read into an `Microsoft.AspNetCore.Http.IFormFile`. `IFormFile` is a C# representation of the file used to process or save the file.

The disk and memory used by file uploads depend on the number and size of concurrent file uploads. If an app attempts to buffer too many uploads, the site crashes when it runs out of memory or disk space. If the size or frequency of file uploads is exhausting app resources, use streaming.

Any single buffered file exceeding 64 KB is moved from memory to a temp file on disk.

Temporary files for larger requests are written to the location named in the `ASPNETCORE_TEMP` environment variable. If `ASPNETCORE_TEMP` isn't defined, the files are written to the current user's temporary folder.

Buffering small files is covered in the following sections of this article:

* Physical storage
* Database

### Streaming

The file is received from a multipart request and directly processed or saved by the app. Streaming doesn't improve performance significantly. Streaming reduces the demands for memory or disk space when uploading files.

Streaming large files is covered in the Upload large files with streaming section.

### Upload small files with buffered model binding to physical storage

To upload small files, use a multipart form or construct a POST request using JavaScript.

The following example demonstrates the use of a Razor Pages form to upload a single file (`Pages/BufferedSingleFileUploadPhysical.cshtml` in the sample app):

```cshtml
<form enctype="multipart/form-data" method="post">
    <dl>
        <dt>
            <label asp-for="FileUpload.FormFile"></label>
        </dt>
        <dd>
            <input asp-for="FileUpload.FormFile" type="file" />
            <span asp-validation-for="FileUpload.FormFile"></span>
        </dd>
    </dl>
    <input asp-page-handler="Upload" class="btn" type="submit" value="Upload" />
</form>
```

The following example is analogous to the prior example except that:

* JavaScript's (Fetch API) is used to submit the form's data.
* There's no validation.

```cshtml
<form action="BufferedSingleFileUploadPhysical/?handler=Upload" 
      enctype="multipart/form-data" onsubmit="AJAXSubmit(this);return false;" 
      method="post">
    <dl>
        <dt>
            <label for="FileUpload_FormFile">File</label>
        </dt>
        <dd>
            <input id="FileUpload_FormFile" type="file" 
                name="FileUpload.FormFile" />
        </dd>
    </dl>

    <input class="btn" type="submit" value="Upload" />

    <div style="margin-top:15px">
        <output name="result"></output>
    </div>
</form>

<script>
  async function AJAXSubmit (oFormElement) {
    var resultElement = oFormElement.elements.namedItem("result");
    const formData = new FormData(oFormElement);

    try {
    const response = await fetch(oFormElement.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.href = '/';
    }

    resultElement.value = 'Result: ' + response.status + ' ' + 
      response.statusText;
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>
```

To perform the form POST in JavaScript for clients that don't support the Fetch API, use one of the following approaches:

* Use a Fetch Polyfill (for example, window.fetch polyfill (github/fetch)).
* Use `XMLHttpRequest`. For example:

  ```javascript
  <script>
    "use strict";

    function AJAXSubmit (oFormElement) {
      var oReq = new XMLHttpRequest();
      oReq.onload = function(e) { 
      oFormElement.elements.namedItem("result").value = 
        'Result: ' + this.status + ' ' + this.statusText;
      };
      oReq.open("post", oFormElement.action);
      oReq.send(new FormData(oFormElement));
    }
  </script>
  ```

In order to support file uploads, HTML forms must specify an encoding type (`enctype`) of `multipart/form-data`.

For a `files` input element to support uploading multiple files provide the `multiple` attribute on the `` element:

```cshtml
<input asp-for="FileUpload.FormFiles" type="file" multiple />
```

The individual files uploaded to the server can be accessed through Model Binding using `Microsoft.AspNetCore.Http.IFormFile`. The sample app demonstrates multiple buffered file uploads for database and physical storage scenarios.

> **Warning:**
> Do **not** use the `FileName` property of `Microsoft.AspNetCore.Http.IFormFile` other than for display and logging. When displaying or logging, HTML encode the file name. A cyberattacker can provide a malicious filename, including full paths or relative paths. Applications should:
>
> * Remove the path from the user-supplied filename.
> * Save the HTML-encoded, path-removed filename for UI or logging.
> * Generate a new random filename for storage.
>
> The following code removes the path from the file name:
>
> ```csharp
> string untrustedFileName = Path.GetFileName(pathName);
> ```
>
> The examples provided thus far don't take into account security considerations. Additional information is provided by the following sections and the sample app:
>
> * Security considerations
> * Validation

When uploading files using model binding and `Microsoft.AspNetCore.Http.IFormFile`, the action method can accept:

* A single `Microsoft.AspNetCore.Http.IFormFile`.
* Any of the following collections that represent several files:
  * `Microsoft.AspNetCore.Http.IFormFileCollection`
  * `System.Collections.IEnumerable`\<`Microsoft.AspNetCore.Http.IFormFile`>
  * List\<`Microsoft.AspNetCore.Http.IFormFile`>

> **Note:**
> Binding matches form files by name. For example, the HTML `name` value in `` must match the C# parameter/property bound (`FormFile`). For more information, see the Match name attribute value to parameter name of POST method section.

The following example:

* Loops through one or more uploaded files.
* Uses Path.GetTempFileName to return a full path for a file, including the file name.
* Saves the files to the local file system using a file name generated by the app.
* Returns the total number and size of files uploaded.

```csharp
public async Task<IActionResult> OnPostUploadAsync(List<IFormFile> files)
{
    long size = files.Sum(f => f.Length);

    foreach (var formFile in files)
    {
        if (formFile.Length > 0)
        {
            var filePath = Path.GetTempFileName();

            using (var stream = System.IO.File.Create(filePath))
            {
                await formFile.CopyToAsync(stream);
            }
        }
    }

    // Process uploaded files
    // Don't rely on or trust the FileName property without validation.

    return Ok(new { count = files.Count, size });
}
```

Use `Path.GetRandomFileName` to generate a file name without a path. In the following example, the path is obtained from configuration:

```csharp
foreach (var formFile in files)
{
    if (formFile.Length > 0)
    {
        var filePath = Path.Combine(_config["StoredFilesPath"], 
            Path.GetRandomFileName());

        using (var stream = System.IO.File.Create(filePath))
        {
            await formFile.CopyToAsync(stream);
        }
    }
}
```

The path passed to the `System.IO.FileStream` *must* include the file name. If the file name isn't provided, an `System.UnauthorizedAccessException` is thrown at runtime.

Files uploaded using the `Microsoft.AspNetCore.Http.IFormFile` technique are buffered in memory or on disk on the server before processing. Inside the action method, the `Microsoft.AspNetCore.Http.IFormFile` contents are accessible as a `System.IO.Stream`. In addition to the local file system, files can be saved to a network share or to a file storage service, such as Azure Blob storage.

For another example that loops over multiple files for upload and uses safe file names, see `Pages/BufferedMultipleFileUploadPhysical.cshtml.cs` in the sample app.

> **Warning:**
> In .NET 7 or earlier versions, Path.GetTempFileName throws an `System.IO.IOException` when more than 65,535 files are created without deleting previous temporary files. The limit of 65,535 files is a per-server limit. For more information on this limit on Windows OS, see the remarks in the following articles:
>
> * GetTempFileNameA function
> * `System.IO.Path.GetTempFileName*`

### Upload small files with buffered model binding to a database

To store binary file data in a database using Entity Framework, define a `System.Byte` array property on the entity:

```csharp
public class AppFile
{
    public int Id { get; set; }
    public byte[] Content { get; set; }
}
```

Specify a page model property for the class that includes an `Microsoft.AspNetCore.Http.IFormFile`:

```csharp
public class BufferedSingleFileUploadDbModel : PageModel
{
    ...

    [BindProperty]
    public BufferedSingleFileUploadDb FileUpload { get; set; }

    ...
}

public class BufferedSingleFileUploadDb
{
    [Required]
    [Display(Name="File")]
    public IFormFile FormFile { get; set; }
}
```

> **Note:**
> `Microsoft.AspNetCore.Http.IFormFile` can be used directly as an action method parameter or as a bound model property. The prior example uses a bound model property.

The `FileUpload` is used in the Razor Pages form:

```cshtml
<form enctype="multipart/form-data" method="post">
    <dl>
        <dt>
            <label asp-for="FileUpload.FormFile"></label>
        </dt>
        <dd>
            <input asp-for="FileUpload.FormFile" type="file">
        </dd>
    </dl>
    <input asp-page-handler="Upload" class="btn" type="submit" value="Upload">
</form>
```

When the form is POSTed to the server, copy the `Microsoft.AspNetCore.Http.IFormFile` to a stream and save it as a byte array in the database. In the following example, `_dbContext` stores the app's database context:

```csharp
public async Task<IActionResult> OnPostUploadAsync()
{
    using (var memoryStream = new MemoryStream())
    {
        await FileUpload.FormFile.CopyToAsync(memoryStream);

        // Upload the file if less than 2 MB
        if (memoryStream.Length < 2097152)
        {
            var file = new AppFile()
            {
                Content = memoryStream.ToArray()
            };

            _dbContext.File.Add(file);

            await _dbContext.SaveChangesAsync();
        }
        else
        {
            ModelState.AddModelError("File", "The file is too large.");
        }
    }

    return Page();
}
```

The preceding example is similar to a scenario demonstrated in the sample app:

* `Pages/BufferedSingleFileUploadDb.cshtml`
* `Pages/BufferedSingleFileUploadDb.cshtml.cs`

> **Warning:**
> Use caution when storing binary data in relational databases, as it can adversely affect performance.
>
> Don't rely on or trust the `FileName` property of `Microsoft.AspNetCore.Http.IFormFile` without validation. The `FileName` property should only be used for display purposes and only after HTML encoding.
>
> The examples provided don't take into account security considerations. Additional information is provided by the following sections and the sample app:
>
> * Security considerations
> * Validation
