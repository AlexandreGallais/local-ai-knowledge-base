---
title: "Call .NET methods from JavaScript functions in ASP.NET Core Blazor (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/javascript-interoperability/call-dotnet-from-javascript.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Call .NET methods from JavaScript functions in ASP.NET Core Blazor (part 4 of 4)

## Stream from JavaScript to .NET

Blazor supports streaming data directly from JavaScript to .NET. Streams are requested using the `Microsoft.JSInterop.IJSStreamReference` interface.

`Microsoft.JSInterop.IJSStreamReference.OpenReadStreamAsync` returns a `System.IO.Stream` and uses the following parameters:

* `maxAllowedSize`: Maximum number of bytes permitted for the read operation from JavaScript, which defaults to 512,000 bytes if not specified.
* `cancellationToken`: A `System.Threading.CancellationToken` for cancelling the read.

In JavaScript:

```javascript
function streamToDotNet() {
  return new Uint8Array(10000000);
}
```

In C# code:

```csharp
var dataReference = 
    await JS.InvokeAsync<IJSStreamReference>("streamToDotNet");
using var dataReferenceStream = 
    await dataReference.OpenReadStreamAsync(maxAllowedSize: 10_000_000);

var outputPath = Path.Combine(Path.GetTempPath(), "file.txt");
using var outputFileStream = File.OpenWrite(outputPath);
await dataReferenceStream.CopyToAsync(outputFileStream);
```

In the preceding example:

* `JS` is an injected `Microsoft.JSInterop.IJSRuntime` instance. `Microsoft.JSInterop.IJSRuntime` is registered by the Blazor framework.
* The `dataReferenceStream` is written to disk (`file.txt`) at the current user's temporary folder path (`System.IO.Path.GetTempPath*`).

Call JavaScript functions from .NET methods in ASP.NET Core Blazor covers the reverse operation, streaming from .NET to JavaScript using a `Microsoft.JSInterop.DotNetStreamReference`.

ASP.NET Core Blazor file uploads covers how to upload a file in Blazor. For a forms example that streams `<textarea>` data in a server-side component, see Troubleshoot ASP.NET Core Blazor forms.

## JavaScript `[JSImport]`/`[JSExport]` interop

*This section applies to client-side components.*

As an alternative to interacting with JavaScript (JS) in client-side components using Blazor's JS interop mechanism based on the `Microsoft.JSInterop.IJSRuntime` interface, a JS `[JSImport]`/`[JSExport]` interop API is available to apps targeting .NET 7 or later.

For more information, see JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.

## Disposal of JavaScript interop object references

Examples throughout the JavaScript (JS) interop articles demonstrate typical object disposal patterns:

* When calling .NET from JS, as described in this article, dispose of a created `Microsoft.JSInterop.DotNetObjectReference` either from .NET or from JS to avoid leaking .NET memory.

* When calling JS from .NET, as described in Call JavaScript functions from .NET methods in ASP.NET Core Blazor, dispose any created `Microsoft.JSInterop.IJSObjectReference`/`Microsoft.JSInterop.IJSInProcessObjectReference`/`JSObjectReference` either from .NET or from JS to avoid leaking JS memory.

JS interop object references are implemented as a map keyed by an identifier on the side of the JS interop call that creates the reference. When object disposal is initiated from either the .NET or JS side, Blazor removes the entry from the map, and the object can be garbage collected as long as no other strong reference to the object is present.

At a minimum, always dispose objects created on the .NET side to avoid leaking .NET managed memory.

## DOM cleanup tasks during component disposal

For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

## JavaScript interop calls without a circuit

For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

## Related content

* Call JavaScript functions from .NET methods in ASP.NET Core Blazor
* `InteropComponent.razor` example (`dotnet/AspNetCore` GitHub repository `main` branch): The `main` branch represents the product unit's current development for the next release of ASP.NET Core. To select the branch for a different release (for example, `release/{VERSION}`, where the `{VERSION}` placeholder is the release version), use the **Switch branches or tags** dropdown list to select the branch. For a branch that no longer exists, use the **Tags** tab to find the API (for example, `v7.0.0`).
* Interaction with the DOM
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
* Handle errors in ASP.NET Core Blazor apps (*JavaScript interop* section)
* Threat mitigation: .NET methods invoked from the browser
