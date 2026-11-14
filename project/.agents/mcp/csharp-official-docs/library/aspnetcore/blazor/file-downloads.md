---
title: "ASP.NET Core Blazor file downloads"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/file-downloads.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor file downloads

This article explains how to download files in Blazor apps.

## File downloads

This article covers approaches for the following scenarios, where a file shouldn't be opened by a browser but downloaded and saved on the client:

* Stream file content to a raw binary data buffer on the client: Typically, this approach is used for relatively small files (\< 250 MB).
* Download a file via a URL without streaming: Usually, this approach is used for relatively large files (> 250 MB).

When downloading files from a different origin than the app, Cross-Origin Resource Sharing (CORS) considerations apply. For more information, see the Cross-Origin Resource Sharing (CORS) section.

## Security considerations

Use caution when providing users with the ability to download files from a server. Cyberattackers may execute Denial of Service (DoS) attacks, API exploitation attacks, or attempt to compromise networks and servers in other ways.

Security steps that reduce the likelihood of a successful attack are:

* Download files from a dedicated file download area on the server, preferably from a non-system drive. Using a dedicated location makes it easier to impose security restrictions on downloadable files. Disable execute permissions on the file download area.
* Client-side security checks are easy to circumvent by malicious users. Always perform client-side security checks on the server, too.
* Don't receive files from users or other untrusted sources and then make the files available for immediate download without performing security checks on the files. For more information, see Upload files in ASP.NET Core.

## Download from a stream

*This section applies to files that are typically up to 250 MB in size.*

The recommended approach for downloading relatively small files (< 250 MB) is to stream file content to a raw binary data buffer on the client with JavaScript (JS) interop. This approach is effective for components that adopt an interactive render mode but not components that adopt static server-side rendering (static SSR).

> **Warning:**
> The approach in this section reads the file's content into a JS `ArrayBuffer`. This approach loads the entire file into the client's memory, which can impair performance. To download relatively large files (\>= 250 MB), we recommend following the guidance in the Download from a URL section.

The following `downloadFileFromStream` JS function:

* Reads the provided stream into an `ArrayBuffer`.
* Creates a `Blob` to wrap the `ArrayBuffer`.
* Creates an object URL to serve as the file's download address.
* Creates an `HTMLAnchorElement` (`` element).
* Assigns the file's name (`fileName`) and URL (`url`) for the download.
* Triggers the download by firing a `click` event on the anchor element.
* Removes the anchor element.
* Revokes the object URL (`url`) by calling `URL.revokeObjectURL`. **This is an important step to ensure memory isn't leaked on the client.**

```html
<script>
  window.downloadFileFromStream = async (fileName, contentStreamReference) => {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
  }
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

The following component:

* Uses native byte-streaming interop to ensure efficient transfer of the file to the client.
* Has a method named `GetFileStream` to retrieve a `System.IO.Stream` for the file that's downloaded to clients. Alternative approaches include retrieving a file from storage or generating a file dynamically in C# code. For this demonstration, the app creates a 50 KB file of random data from a new byte array (`new byte[]`). The bytes are wrapped with a `System.IO.MemoryStream` to serve as the example's dynamically-generated binary file.
* The `DownloadFileFromStream` method:
  * Retrieves the `System.IO.Stream` from `GetFileStream`.
  * Specifies a file name when file is saved on the user's machine. The following example names the file `quote.txt`.
  * Wraps the `System.IO.Stream` in a `Microsoft.JSInterop.DotNetStreamReference`, which allows streaming the file data to the client.
  * Invokes the `downloadFileFromStream` JS function to accept the data on the client.

`FileDownload1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/FileDownload1.razor._
For a component in a server-side app that must return a `System.IO.Stream` for a physical file, the component can call `System.IO.File.OpenRead*`, as the following example demonstrates:

```csharp
private Stream GetFileStream() => File.OpenRead(@"{PATH}");
```

In the preceding example, the `{PATH}` placeholder is the path to the file. The `@` prefix indicates that the string is a *verbatim string literal*, which permits the use of backslashes (`\`) in a Windows OS path and embedded double-quotes (`""`) for a single quote in the path. Alternatively, avoid the string literal (`@`) and use either of the following approaches:

* Use escaped backslashes (`\\`) and quotes (`\"`).
* Use forward slashes (`/`) in the path, which are supported across platforms in ASP.NET Core apps, and escaped quotes (`\"`).

## Download from a URL

*This section applies to files that are relatively large, typically 250 MB or larger.*

The recommended approach for downloading relatively large files (>= 250 MB) with interactively-rendered components or files of any size for statically-rendered components is to use JS to trigger an anchor element with the file's name and URL.

The example in this section uses a download file named `quote.txt`, which is placed in a folder named `files` in the app's web root (`wwwroot` folder). The use of the `files` folder is only for demonstration purposes. You can organize downloadable files in any folder layout within the web root (`wwwroot` folder) that you prefer, including serving the files directly from the `wwwroot` folder.

`wwwroot/files/quote.txt`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/wwwroot/files/quote.txt._
The following `triggerFileDownload` JS function:

* Creates an `HTMLAnchorElement` (`` element).
* Assigns the file's name (`fileName`) and URL (`url`) for the download.
* Triggers the download by firing a `click` event on the anchor element.
* Removes the anchor element.

```html
<script>
  window.triggerFileDownload = (fileName, url) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
  }
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

The following example component downloads the file from the same origin that the app uses. If the file download is attempted from a different origin, configure Cross-Origin Resource Sharing (CORS). For more information, see the Cross-Origin Resource Sharing (CORS) section.

`FileDownload2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/FileDownload2.razor._
For interactive components, the button in the preceding example calls the `DownloadFileFromURL` handler to invoke the JavaScript (JS) function `triggerFileDownload`.

If the component adopts static server-side rendering (static SSR), add an event handler for the button (`addEventListener`) to call `triggerFileDownload` following the guidance in ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR).

## Cross-Origin Resource Sharing (CORS)

Without taking further steps to enable Cross-Origin Resource Sharing (CORS) for files that don't have the same origin as the app, downloading files won't pass CORS checks made by the browser.

For more information on CORS with ASP.NET Core apps and other Microsoft products and services that host files for download, see the following resources:

* Enable Cross-Origin Requests (CORS) in ASP.NET Core
* Using Azure CDN with CORS (Azure documentation)
* Cross-Origin Resource Sharing (CORS) support for Azure Storage (REST documentation)
* Core Cloud Services - Set up CORS for your website and storage assets (Learn module)
* IIS CORS module Configuration Reference (IIS documentation)

## Related content

* ASP.NET Core Blazor static files
* ASP.NET Core Blazor JavaScript interoperability (JS interop)
* JavaScript location in ASP.NET Core Blazor apps
* ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)
* ``: The Anchor element: Security and privacy (MDN documentation)
* ASP.NET Core Blazor file uploads
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
