---
title: "ASP.NET Core Blazor file uploads (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/file-uploads.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor file uploads

-->
-->

This article explains how to upload files in Blazor with the `Microsoft.AspNetCore.Components.Forms.InputFile` component.

## File uploads

> **Warning:**
> Always follow security best practices when permitting users to upload files. For more information, see Upload files in ASP.NET Core.

Use the `Microsoft.AspNetCore.Components.Forms.InputFile` component to read browser file data into .NET code. The `Microsoft.AspNetCore.Components.Forms.InputFile` component renders an HTML `` element of type `file` for single file uploads. Add the `multiple` attribute to permit the user to upload multiple files at once.

File selection isn't cumulative when using an `Microsoft.AspNetCore.Components.Forms.InputFile` component or its underlying HTML ``, so you can't add files to an existing file selection. The component always replaces the user's initial file selection, so file references from prior selections aren't available.

The following `Microsoft.AspNetCore.Components.Forms.InputFile` component executes the `LoadFiles` method when the `Microsoft.AspNetCore.Components.Forms.InputFile.OnChange` (`change`) event occurs. An `Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs` provides access to the selected file list and details about each file:

```razor
<InputFile OnChange="LoadFiles" multiple />

@code {
    private void LoadFiles(InputFileChangeEventArgs e)
    {
        ...
    }
}
```

Rendered HTML:

```html
<input multiple="" type="file" _bl_2="">
```

> **Note:**
> In the preceding example, the `` element's `_bl_2` attribute is used for Blazor's internal processing.

To read data from a user-selected file with a `System.IO.Stream` that represents the file's bytes, call `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` on the file and read from the returned stream. For more information, see the File streams section.

`Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` enforces a maximum size in bytes of its `System.IO.Stream`. Reading one file or multiple files larger than 500 KB results in an exception. This limit prevents developers from accidentally reading large files into memory. The `maxAllowedSize` parameter of `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` can be used to specify a larger size if required.

Outside of processing a small file, avoid reading the incoming file stream directly into memory all at once. For example, don't copy all of the file's bytes into a `System.IO.MemoryStream` or read the entire stream into a byte array all at once. These approaches can result in degraded app performance and potential Denial of Service (DoS) risk, especially for server-side components. Instead, consider adopting either of the following approaches:

* Copy the stream directly to a file on disk without reading it into memory. Note that Blazor apps executing code on the server aren't able to access the client's file system directly.
* Upload files from the client directly to an external service. For more information, see the Upload files to an external service section.

In the following examples, `browserFile` implements `Microsoft.AspNetCore.Components.Forms.IBrowserFile` to represent an uploaded file. Working implementations for `Microsoft.AspNetCore.Components.Forms.IBrowserFile` are shown in the file upload components later in this article.

When calling `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*`, we recommend passing a maximum allowed file size in the `maxAllowedSize` parameter at the limit of the file sizes that you expect to receive. The default value is 500 KB. This article's examples use a maximum allowed file size variable or constant named `maxFileSize` but usually don't show setting a specific value.

✔️Supported: The following approach is **recommended** because the file's `System.IO.Stream` is provided directly to the consumer, a `System.IO.FileStream` that creates the file at the provided path:

```csharp
await using FileStream fs = new(path, FileMode.Create);
await browserFile.OpenReadStream(maxFileSize).CopyToAsync(fs);
```

✔️Supported: The following approach is **recommended** for Microsoft Azure Blob Storage because the file's `System.IO.Stream` is provided directly to `Azure.Storage.Blobs.BlobContainerClient.UploadBlobAsync*`:

```csharp
await blobContainerClient.UploadBlobAsync(
    trustedFileName, browserFile.OpenReadStream(maxFileSize));
```

✔️Only recommended for small files: The following approach is only **recommended for small files** because the file's `System.IO.Stream` content is read into a `System.IO.MemoryStream` in memory (`memoryStream`), which incurs a performance penalty and DoS risk. For an example that demonstrates this technique to save a thumbnail image with an `Microsoft.AspNetCore.Components.Forms.IBrowserFile` to a database using Entity Framework Core (EF Core), see the Save small files directly to a database with EF Core section later in this article.

```csharp
using var memoryStream = new MemoryStream();
await browserFile.OpenReadStream(maxFileSize).CopyToAsync(memoryStream);
var smallFileByteArray = memoryStream.ToArray();
```

❌Not recommended: The following approach is **NOT recommended** because the file's `System.IO.Stream` content is read into a `System.String` in memory (`reader`):

```csharp
var reader = 
    await new StreamReader(browserFile.OpenReadStream(maxFileSize)).ReadToEndAsync();
```

❌Not recommended: The following approach is **NOT recommended** for Microsoft Azure Blob Storage because the file's `System.IO.Stream` content is copied into a `System.IO.MemoryStream` in memory (`memoryStream`) before calling `Azure.Storage.Blobs.BlobContainerClient.UploadBlobAsync*`:

```csharp
var memoryStream = new MemoryStream();
await browserFile.OpenReadStream(maxFileSize).CopyToAsync(memoryStream);
await blobContainerClient.UploadBlobAsync(
    trustedFileName, memoryStream));
```

A component that receives an image file can call the `Microsoft.AspNetCore.Components.Forms.BrowserFileExtensions.RequestImageFileAsync*` convenience method on the file to resize the image data within the browser's JavaScript runtime before the image is streamed into the app. Use cases for calling `Microsoft.AspNetCore.Components.Forms.BrowserFileExtensions.RequestImageFileAsync*` are most appropriate for Blazor WebAssembly apps.

## File size read and upload limits

For Chromium-based browsers (for example, Google Chrome and Microsoft Edge) using the HTTP/2 protocol, HTTPS, and CORS, client-side Blazor supports using the Streams API to permit uploading large files with request streaming.

Without a Chromium browser, HTTP/2 protocol, or HTTPS, client-side Blazor reads the file's bytes into a single JavaScript array buffer when marshaling the data from JavaScript to C#, which is limited to 2 GB or to the device's available memory. Large file uploads may fail for client-side uploads using the `Microsoft.AspNetCore.Components.Forms.InputFile` component.

## Security considerations

### Avoid `IBrowserFile.Size` for file size limits

Avoid using `Microsoft.AspNetCore.Components.Forms.IBrowserFile.Size` to impose a limit on the file size. Instead of using the unsafe client-supplied file size, explicitly specify the maximum file size. The following example uses the maximum file size assigned to `maxFileSize`:

```diff
- var fileContent = new StreamContent(file.OpenReadStream(file.Size));
+ var fileContent = new StreamContent(file.OpenReadStream(maxFileSize));
```

### File name security

Never use a client-supplied file name for saving a file to physical storage. Create a safe file name for the file using `System.IO.Path.GetRandomFileName` or `System.IO.Path.GetTempFileName` to create a full path (including the file name) for temporary storage.

Razor automatically HTML encodes property values for display. The following code is safe to use:

```cshtml
@foreach (var file in Model.DatabaseFiles) {
    <tr>
        <td>
            @file.UntrustedName
        </td>
    </tr>
}
```

Outside of Razor, always use `System.Net.WebUtility.HtmlEncode*` to safely encode file names from a user's request.

Many implementations must include a check that the file exists; otherwise, the file is overwritten by a file of the same name. Supply additional logic to meet your app's specifications.

## Examples

The following examples demonstrate multiple file upload in a component. `Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs.GetMultipleFiles*` allows reading multiple files. Specify the maximum number of files to prevent a malicious user from uploading a larger number of files than the app expects. `Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs.File` allows reading the first and only file if the file upload doesn't support multiple files.

`Microsoft.AspNetCore.Components.Forms.InputFileChangeEventArgs` is in the `Microsoft.AspNetCore.Components.Forms` namespace, which is typically one of the namespaces in the app's imports file (`_Imports.razor`). When the namespace is present in the imports file, it provides API member access to the app's components.

Namespaces in the imports file aren't applied to C# files (`.cs`). C# files require an explicit `using` directive at the top of the class file:

```razor
using Microsoft.AspNetCore.Components.Forms;
```

For testing file upload components, you can create test files of any size with PowerShell:

```powershell
$out = new-object byte[] {SIZE}; (new-object Random).NextBytes($out); [IO.File]::WriteAllBytes('{PATH}', $out)
```

In the preceding command:

* The `{SIZE}` placeholder is the size of the file in bytes (for example, `2097152` for a 2 MB file).
* The `{PATH}` placeholder is the path and file with file extension (for example, `D:/test_files/testfile2MB.txt`).

### Server-side file upload example

**To use the following code, create a `Development/unsafe_uploads` folder at the root of the app running in the `Development` environment.**

Because the example uses the app's environment as part of the path where files are saved, additional folders are required if other environments are used in testing and production. For example, create a `Staging/unsafe_uploads` folder for the `Staging` environment. Create a `Production/unsafe_uploads` folder for the `Production` environment.

> **Warning:**
> The example saves files without scanning their contents, and the guidance in this article doesn't take into account additional security best practices for uploaded files. On staging and production systems, disable execute permission on the upload folder and scan files with an anti-virus/anti-malware scanner API immediately after upload. For more information, see Upload files in ASP.NET Core.

`FileUpload1.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/FileUpload1.razor._
### Client-side file upload example

The following example processes file bytes and doesn't send files to a destination outside of the app. For an example of a Razor component that sends a file to a server or service, see the following sections:

* Upload files to a server with client-side rendering (CSR)
* Upload files to an external service

The component assumes that the Interactive WebAssembly render mode (`InteractiveWebAssembly`) is inherited from a parent component or applied globally to the app.

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_WebAssembly/Pages/FileUpload1.razor._
`Microsoft.AspNetCore.Components.Forms.IBrowserFile` returns metadata exposed by the browser as properties. Use this metadata for preliminary validation.

* `Microsoft.AspNetCore.Components.Forms.IBrowserFile.Name`
* `Microsoft.AspNetCore.Components.Forms.IBrowserFile.Size`
* `Microsoft.AspNetCore.Components.Forms.IBrowserFile.LastModified`
* `Microsoft.AspNetCore.Components.Forms.IBrowserFile.ContentType`

***Never trust the values of the preceding properties, especially the `Microsoft.AspNetCore.Components.Forms.IBrowserFile.Name` property for display in the UI.*** Treat all user-supplied data as a significant security risk to the app, server, and network. For more information, see Upload files in ASP.NET Core.
