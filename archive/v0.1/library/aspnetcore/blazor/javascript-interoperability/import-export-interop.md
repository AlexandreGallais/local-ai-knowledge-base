---
title: "JavaScript JSImport/JSExport interop with ASP.NET Core Blazor (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/javascript-interoperability/import-export-interop.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# JavaScript `[JSImport]`/`[JSExport]` interop with ASP.NET Core Blazor

-->
-->

This article explains how to interact with JavaScript (JS) in client-side components using JavaScript (JS) `[JSImport]`/`[JSExport]` interop API. For additional information and examples, see JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop in .NET WebAssembly.

For additional guidance, see the Configuring and hosting .NET WebAssembly applications guidance in the .NET Runtime (`dotnet/runtime`) GitHub repository.

Blazor provides its own JS interop mechanism based on the `Microsoft.JSInterop.IJSRuntime` interface. Blazor's JS interop is uniformly supported across Blazor render modes and for Blazor Hybrid apps. `Microsoft.JSInterop.IJSRuntime` also enables library authors to build JS interop libraries for sharing across the Blazor ecosystem and remains the recommended approach for JS interop in Blazor. See the following articles:

* Call JavaScript functions from .NET methods in ASP.NET Core Blazor
* Call .NET methods from JavaScript functions in ASP.NET Core Blazor

This article describes an alternative JS interop approach specific to client-side components executed on WebAssembly. These approaches are appropriate when you only expect to run on client-side WebAssembly. Library authors can use these approaches to optimize JS interop by checking during code execution if the app is running on WebAssembly in a browser (`System.OperatingSystem.IsBrowser*`). The approaches described in this article should be used to replace the obsolete unmarshalled JS interop API when migrating to .NET 7 or later.

> **Note:**
> This article focuses on JS interop in client-side components. For guidance on calling .NET in JavaScript apps, see JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop with a WebAssembly Browser App project.

## Obsolete JavaScript interop API

Unmarshalled JS interop using `Microsoft.JSInterop.IJSUnmarshalledRuntime` API is obsolete in ASP.NET Core in .NET 7 or later. Follow the guidance in this article to replace the obsolete API.

## Prerequisites

Visual Studio with the **ASP.NET and web development** workload.

No further tooling is required if you plan on implementing `[JSImport]`/`[JSExport]` interop in a Blazor WebAssembly app generated from the Blazor WebAssembly project template.

If you plan to use the WebAssembly Browser or WebAssembly Console app project templates, install the `Microsoft.NET.Runtime.WebAssembly.Templates` NuGet package with the following command:

```dotnetcli
dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates
```

For more information, see JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop with a WebAssembly Browser App project.

## Namespace

The JS interop API (`System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*`) described in this article is controlled by attributes in the `System.Runtime.InteropServices.JavaScript` namespace.

## Enable unsafe blocks

Enable the `Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks` property in app's project file, which permits the code generator in the Roslyn compiler to use pointers for JS interop:

```xml
<PropertyGroup>
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
</PropertyGroup>
```

> **Warning:**
> The JS interop API requires enabling `Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks`. Be careful when implementing your own unsafe code in .NET apps, which can introduce security and stability risks. For more information, see Unsafe code, pointer types, and function pointers.

## Razor class library (RCL) collocated JS is unsupported

Generally, the JS location support for `Microsoft.JSInterop.IJSRuntime`-based JS interop (JavaScript location in ASP.NET Core Blazor apps) is also present for the `[JSImport]`/`[JSExport]` interop described by this article. The only unsupported JS location feature is for *collocated JS in a Razor class library (RCL)*.

Instead of using collocated JS in an RCL, place the JS file in the RCL's `wwwroot` folder and reference it using the usual path for RCL static assets:

`_content/{PACKAGE ID}/{PATH}/{FILE NAME}.js`

* The `{PACKAGE ID}` placeholder is the RCL's package identifier (or library name for a class library).
* The `{PATH}` placeholder is the path to the file.
* The `{FILE NAME}` placeholder is the file name.

Although collocated JS in an RCL isn't supported by `[JSImport]`/`[JSExport]` interop, you can keep your JS files organized by taking either or both of the following approaches:

* Name the JS file the same as the component where the JS is used. For a component in the RCL named `CallJavaScriptFromLib` (`CallJavaScriptFromLib.razor`), name the file `CallJavaScriptFromLib.js` in the `wwwroot` folder.
* Place component-specific JS files in a `Components` folder inside the RCL's `wwwroot` folder and use "`Components`" in the path to the file: `_content/{PACKAGE ID}/Components/CallJavaScriptFromLib.js`.

## Call JavaScript from .NET

This section explains how to call JS functions from .NET.

In the following `CallJavaScript1` component:

* The `CallJavaScript1` module is imported asynchronously from the collocated JS file with `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*`.
* The imported `getMessage` JS function is called by `GetWelcomeMessage`.
* The returned welcome message string is displayed in the UI via the `message` field.

`CallJavaScript1.razor`:

```razor
@page "/call-javascript-1"
@rendermode InteractiveWebAssembly
@using System.Runtime.InteropServices.JavaScript

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call JS Example 1)
</h1>

@(message is not null ? message : string.Empty)

@code {
    private string? message;

    protected override async Task OnInitializedAsync()
    {
        await JSHost.ImportAsync("CallJavaScript1", 
            "../Components/Pages/CallJavaScript1.razor.js");

        message = GetWelcomeMessage();
    }
}
```

> **Note:**
> Include a conditional check in code with `System.OperatingSystem.IsBrowser*` to ensure that the JS interop is only called by a component rendered on the client. This is important for libraries/NuGet packages that target server-side components, which can't execute the code provided by this JS interop API.

To import a JS function to call it from C#, use the `[JSImport]` attribute on a C# method signature that matches the JS function's signature. The first parameter to the `[JSImport]` attribute is the name of the JS function to import, and the second parameter is the name of the JS module.

In the following example, `getMessage` is a JS function that returns a `string` for a module named `CallJavaScript1`. The C# method signature matches: No parameters are passed to the JS function, and the JS function returns a `string`. The JS function is called by `GetWelcomeMessage` in C# code.

`CallJavaScript1.razor.cs`:

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.Components.Pages;

[SupportedOSPlatform("browser")]
public partial class CallJavaScript1
{
    [JSImport("getMessage", "CallJavaScript1")]
    internal static partial string GetWelcomeMessage();
}
```

The app's namespace for the preceding `CallJavaScript1` partial class is `BlazorSample`. The component's namespace is `BlazorSample.Components.Pages`. If using the preceding component in a local test app, update the namespace to match the app. For example, the namespace is `ContosoApp.Components.Pages` if the app's namespace is `ContosoApp`. For more information, see ASP.NET Core Razor components.

In the imported method signature, you can use .NET types for parameters and return values, which are marshalled automatically by the runtime. Use `System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute`1` to control how the imported method parameters are marshalled. For example, you might choose to marshal a `long` as `System.Runtime.InteropServices.JavaScript.JSType.Number` or `System.Runtime.InteropServices.JavaScript.JSType.BigInt`. You can pass `System.Action`/`System.Func`1` callbacks as parameters, which are marshalled as callable JS functions. You can pass both JS and managed object references, and they are marshaled as proxy objects, keeping the object alive across the boundary until the proxy is garbage collected. You can also import and export asynchronous methods with a `System.Threading.Tasks.Task` result, which are marshaled as JS promises. Most of the marshalled types work in both directions, as parameters and as return values, on both imported and exported methods, which are covered in the Call .NET from JavaScript section later in this article.

For additional type mapping information and examples, see JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop in .NET WebAssembly.

The module name in the `[JSImport]` attribute and the call to load the module in the component with `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` must match and be unique in the app. When authoring a library for deployment in a NuGet package, we recommend using the NuGet package namespace as a prefix in module names. In the following example, the module name reflects the `Contoso.InteropServices.JavaScript` package and a folder of user message interop classes (`UserMessages`):

```csharp
[JSImport("getMessage", 
    "Contoso.InteropServices.JavaScript.UserMessages.CallJavaScript1")]
```

Functions accessible on the global namespace can be imported by using the `globalThis` prefix in the function name and by using the `[JSImport]` attribute without providing a module name. In the following example, `console.log` is prefixed with `globalThis`. The imported function is called by the C# `Log` method, which accepts a C# string message (`message`) and marshalls the C# string to a JS `String` for `console.log`:

```csharp
[JSImport("globalThis.console.log")]
internal static partial void Log([JSMarshalAs<JSType.String>] string message);
```

Export scripts from a standard JavaScript module either collocated with a component or placed with other JavaScript static assets in a JS file (for example, `wwwroot/js/{FILE NAME}.js`, where JS static assets are maintained in a folder named `js` in the app's `wwwroot` folder and the `{FILE NAME}` placeholder is the file name).

In the following example, a JS function named `getMessage` is exported from a collocated JS file that returns a welcome message, "Hello from Blazor!" in Portuguese:

`CallJavaScript1.razor.js`:

```javascript
export function getMessage() {
  return 'Olá do Blazor!';
}
```

## Call .NET from JavaScript

This section explains how to call .NET methods from JS.

The following `CallDotNet1` component calls JS that directly interacts with the DOM to render the welcome message string:

* The `CallDotNet` JS module is imported asynchronously from the collocated JS file for this component.
* The imported `setMessage` JS function is called by `SetWelcomeMessage`.
* The returned welcome message is displayed by `setMessage` in the UI via the `message` field.

> **Important:**
> In this section's example, JS interop is used to mutate a DOM element *purely for demonstration purposes* after the component is rendered in `OnAfterRender`. Typically, you should only mutate the DOM with JS when the object doesn't interact with Blazor. The approach shown in this section is similar to cases where a third-party JS library is used in a Razor component, where the component interacts with the JS library via JS interop, the third-party JS library interacts with part of the DOM, and Blazor isn't involved directly with the DOM updates to that part of the DOM. For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

`CallDotNet1.razor`:

```razor
@page "/call-dotnet-1"
@rendermode InteractiveWebAssembly
@using System.Runtime.InteropServices.JavaScript

<h1>
    JS <code>[JSImport]</code>/<code>[JSExport]</code> Interop 
    (Call .NET Example 1)
</h1>

<p>
    <span id="result">.NET method not executed yet</span>
</p>

@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JSHost.ImportAsync("CallDotNet1", 
                "../Components/Pages/CallDotNet1.razor.js");

            SetWelcomeMessage();
        }
    }
}
```

To export a .NET method so that it can be called from JS, use the `[JSExport]` attribute.

In the following example:

* `SetWelcomeMessage` calls a JS function named `setMessage`. The JS function calls into .NET to receive the welcome message from `GetMessageFromDotnet` and displays the message in the UI.
* `GetMessageFromDotnet` is a .NET method with the `[JSExport]` attribute that returns a welcome message, "Hello from Blazor!" in Portuguese.

`CallDotNet1.razor.cs`:

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorSample.Components.Pages;

[SupportedOSPlatform("browser")]
public partial class CallDotNet1
{
    [JSImport("setMessage", "CallDotNet1")]
    internal static partial void SetWelcomeMessage();

    [JSExport]
    internal static string GetMessageFromDotnet() => "Olá do Blazor!";
}
```

The app's namespace for the preceding `CallDotNet1` partial class is `BlazorSample`. The component's namespace is `BlazorSample.Components.Pages`. If using the preceding component in a local test app, update the app's namespace to match the app. For example, the component namespace is `ContosoApp.Components.Pages` if the app's namespace is `ContosoApp`. For more information, see ASP.NET Core Razor components.

In the following example, a JS function named `setMessage` is imported from a collocated JS file.

The `setMessage` method:

* Calls `globalThis.getDotnetRuntime(0)` to expose the WebAssembly .NET runtime instance for calling exported .NET methods.
* Obtains the app assembly's JS exports. The name of the app's assembly in the following example is `BlazorSample`.
* Calls the `BlazorSample.Components.Pages.CallDotNet1.GetMessageFromDotnet` method from the exports (`exports`). The returned value, which is the welcome message, is assigned to the `CallDotNet1` component's `` text. The app's namespace is `BlazorSample`, and the `CallDotNet1` component's namespace is `BlazorSample.Components.Pages`.

`CallDotNet1.razor.js`:

```javascript
export async function setMessage() {
  const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
  var exports = await getAssemblyExports("BlazorSample.dll");

  document.getElementById("result").innerText = 
    exports.BlazorSample.Components.Pages.CallDotNet1.GetMessageFromDotnet();
}
```

> **Note:**
> Calling `getAssemblyExports` to obtain the exports can occur in a JavaScript initializer for availability across the app.
