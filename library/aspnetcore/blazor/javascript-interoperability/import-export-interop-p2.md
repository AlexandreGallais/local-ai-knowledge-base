---
title: "JavaScript JSImport/JSExport interop with ASP.NET Core Blazor (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/javascript-interoperability/import-export-interop.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# JavaScript JSImport/JSExport interop with ASP.NET Core Blazor (part 2 of 2)

## Multiple module import calls

After a JS module is loaded, the module's JS functions are available to the app's components and classes as long as the app is running in the browser window or tab without the user manually reloading the app. `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` can be called multiple times on the same module without a significant performance penalty when:

* The user visits a component that calls `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` to import a module, navigates away from the component, and then returns to the component where `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` is called again for the same module import.
* The same module is used by different components and loaded by `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` in each of the components.

## Use of a single JavaScript module across components

*Before following the guidance in this section, read the Call JavaScript from .NET and Call .NET from JavaScript sections of this article, which provide general guidance on `[JSImport]`/`[JSExport]` interop.*

The example in this section shows how to use JS interop from a shared JS module in a client-side app. The guidance in this section isn't applicable to Razor class libraries (RCLs).

The following components, classes, C# methods, and JS functions are used:

* `Interop` class (`Interop.cs`): Sets up import and export JS interop with the `[JSImport]` and `[JSExport]` attributes for a module named `Interop`.
  * `GetWelcomeMessage`: .NET method that calls the imported `getMessage` JS function.
  * `SetWelcomeMessage`: .NET method that calls the imported `setMessage` JS function.
  * `GetMessageFromDotnet`: An exported C# method that returns a welcome message string when called from JS.
* `wwwroot/js/interop.js` file: Contains the JS functions.
  * `getMessage`: Returns a welcome message when called by C# code in a component.
  * `setMessage`: Calls the `GetMessageFromDotnet` C# method and assigns the returned welcome message to a DOM `` element.
* `Program.cs` calls `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` to load the module from `wwwroot/js/interop.js`.
* `CallJavaScript2` component (`CallJavaScript2.razor`): Calls `GetWelcomeMessage` and displays the returned welcome message in the component's UI.
* `CallDotNet2` component (`CallDotNet2.razor`): Calls `SetWelcomeMessage`.

`Interop.cs`:

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.JavaScriptInterop;

[SupportedOSPlatform("browser")]
public partial class Interop
{
    [JSImport("getMessage", "Interop")]
    internal static partial string GetWelcomeMessage();

    [JSImport("setMessage", "Interop")]
    internal static partial void SetWelcomeMessage();

    [JSExport]
    internal static string GetMessageFromDotnet() => "Olá do Blazor!";
}
```

In the preceding example, the app's namespace is `BlazorSample`, and the full namespace for C# interop classes is `BlazorSample.JavaScriptInterop`.

`wwwroot/js/interop.js`:

```javascript
export function getMessage() {
  return 'Olá do Blazor!';
}

export async function setMessage() {
  const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
  var exports = await getAssemblyExports("BlazorSample.dll");

  document.getElementById("result").innerText =
    exports.BlazorSample.JavaScriptInterop.Interop.GetMessageFromDotnet();
}
```

Make the `System.Runtime.InteropServices.JavaScript` namespace available at the top of the `Program.cs` file:

```csharp
using System.Runtime.InteropServices.JavaScript;
```

Load the module in `Program.cs` before `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost.RunAsync*` is called:

```csharp
if (OperatingSystem.IsBrowser())
{
    await JSHost.ImportAsync("Interop", "../js/interop.js");
}
```

`CallJavaScript2.razor`:

```razor
@page "/call-javascript-2"
@rendermode InteractiveWebAssembly
@using BlazorSample.JavaScriptInterop

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call JS Example 2)
</h1>

@(message is not null ? message : string.Empty)

@code {
    private string? message;

    protected override void OnInitialized()
    {
        message = Interop.GetWelcomeMessage();
    }
}
```

`CallDotNet2.razor`:

```razor
@page "/call-dotnet-2"
@rendermode InteractiveWebAssembly
@using BlazorSample.JavaScriptInterop

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop  
    (Call .NET Example 2)
</h1>

<p>
    <span id="result">.NET method not executed</span>
</p>

@code {
    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            Interop.SetWelcomeMessage();
        }
    }
}
```

> **Important:**
> In this section's example, JS interop is used to mutate a DOM element *purely for demonstration purposes* after the component is rendered in `OnAfterRender`. Typically, you should only mutate the DOM with JS when the object doesn't interact with Blazor. The approach shown in this section is similar to cases where a third-party JS library is used in a Razor component, where the component interacts with the JS library via JS interop, the third-party JS library interacts with part of the DOM, and Blazor isn't involved directly with the DOM updates to that part of the DOM. For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

## Related content

* JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop in .NET WebAssembly
* JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop with a WebAssembly Browser App project
* API documentation
  * `[JSImport]` attribute
  * `[JSExport]` attribute
* In the `dotnet/runtime` GitHub repository:
  * Configuring and hosting .NET WebAssembly applications
  * .NET WebAssembly runtime
  * `dotnet.d.ts` file (.NET WebAssembly runtime configuration)
