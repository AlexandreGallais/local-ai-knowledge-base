---
title: "Consume ASP.NET Core Razor components from a Razor class library (RCL) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/class-libraries.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Consume ASP.NET Core Razor components from a Razor class library (RCL) (part 2 of 2)

## Create an RCL with JavaScript files collocated with components

Collocation of JavaScript (JS) files for Razor components is a convenient way to organize scripts in an app.

Razor components of Blazor apps collocate JS files using the `.razor.js` extension and are publicly addressable using the path to the file in the project:

`{PATH}/{COMPONENT}.razor.js`

* The `{PATH}` placeholder is the path to the component.
* The `{COMPONENT}` placeholder is the component.

When the app is published, the framework automatically moves the script to the web root. Scripts are moved to `bin/Release/{TARGET FRAMEWORK MONIKER}/publish/wwwroot/{PATH}/{COMPONENT}.razor.js`, where the placeholders are:

* `{TARGET FRAMEWORK MONIKER}` is the Target Framework Moniker (TFM).
* `{PATH}` is the path to the component.
* `{COMPONENT}` is the component name.

No change is required to the script's relative URL, as Blazor takes care of placing the JS file in published static assets for you.

This section and the following examples are primarily focused on explaining JS file collocation. The first example demonstrates a collocated JS file with an ordinary JS function. The second example demonstrates the use of a module to load a function, which is the recommended approach for most production apps. Calling JS from .NET is fully covered in Call JavaScript functions from .NET methods in ASP.NET Core Blazor, where there are further explanations of the Blazor JS API with additional examples. Component disposal, which is present in the second example, is covered in ASP.NET Core Razor component disposal.

The following `JsCollocation1` component loads a script via a `HeadContent` component and calls a JS function with `Microsoft.JSInterop.IJSRuntime.InvokeAsync*`. The `{PATH}` placeholder is the path to the component.

> **Important:**
> If you use the following code for a demonstration in a test app, change the `{PATH}` placeholder to the path of the component (example: `Components/Pages` in .NET 8 or later or `Pages` in .NET 7 or earlier). In a Blazor Web App (.NET 8 or later), the component requires an interactive render mode applied either globally to the app or to the component definition.

Add the following script after the Blazor script (location of the Blazor start script):

```html
<script src="{PATH}/JsCollocation1.razor.js"></script>
```

`JsCollocation1` component (`{PATH}/JsCollocation1.razor`):

```razor
@page "/js-collocation-1"
@inject IJSRuntime JS

<PageTitle>JS Collocation 1</PageTitle>

<h1>JS Collocation Example 1</h1>

<button @onclick="ShowPrompt">Call showPrompt1</button>

@if (!string.IsNullOrEmpty(result))
{
    <p>
        Hello @result!
    </p>
}

@code {
    private string? result;

    public async Task ShowPrompt()
    {
        result = await JS.InvokeAsync<string>(
            "showPrompt1", "What's your name?");
        StateHasChanged();
    }
}
```

The collocated JS file is placed next to the `JsCollocation1` component file with the file name `JsCollocation1.razor.js`. In the `JsCollocation1` component, the script is referenced at the path of the collocated file. In the following example, the `showPrompt1` function accepts the user's name from a `Window prompt()` and returns it to the `JsCollocation1` component for display.

`{PATH}/JsCollocation1.razor.js`:

```javascript
function showPrompt1(message) {
  return prompt(message, 'Type your name here');
}
```

The preceding approach isn't recommended for general use in production apps because the approach pollutes the client with global functions. A better approach for production apps is to use JS modules. The same general principles apply to loading a JS module from a collocated JS file, as the next example demonstrates.

The following `JsCollocation2` component's `OnAfterRenderAsync` method loads a JS module into `module`, which is an `Microsoft.JSInterop.IJSObjectReference` of the component class. `module` is used to call the `showPrompt2` function. The `{PATH}` placeholder is the path to the component.

> **Important:**
> If you use the following code for a demonstration in a test app, change the `{PATH}` placeholder to the path of the component. In a Blazor Web App (.NET 8 or later), the component requires an interactive render mode applied either globally to the app or to the component definition.

`JsCollocation2` component (`{PATH}/JsCollocation2.razor`):

```razor
@page "/js-collocation-2"
@implements IAsyncDisposable
@inject IJSRuntime JS

<PageTitle>JS Collocation 2</PageTitle>

<h1>JS Collocation Example 2</h1>

<button @onclick="ShowPrompt">Call showPrompt2</button>

@if (!string.IsNullOrEmpty(result))
{
    <p>
        Hello @result!
    </p>
}

@code {
    private IJSObjectReference? module;
    private string? result;

    protected async override Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            /*
                Change the {PATH} placeholder in the next line to the path of
                the collocated JS file in the app. Examples:

                ./Components/Pages/JsCollocation2.razor.js (.NET 8 or later)
                ./Pages/JsCollocation2.razor.js (.NET 7 or earlier)
            */
            module = await JS.InvokeAsync<IJSObjectReference>("import",
                "./{PATH}/JsCollocation2.razor.js");
        }
    }

    public async Task ShowPrompt()
    {
        if (module is not null)
        {
            result = await module.InvokeAsync<string>(
                "showPrompt2", "What's your name?");
            StateHasChanged();
        }
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null)
        {
            try
            {
                await module.DisposeAsync();
            }
            catch (JSDisconnectedException)
            {
            }
        }
    }
}
```

In the preceding example, `Microsoft.JSInterop.JSDisconnectedException` is trapped during module disposal in case Blazor's SignalR circuit is lost. If the preceding code is used in a Blazor WebAssembly app, there's no SignalR connection to lose, so you can remove the `try`-`catch` block and leave the line that disposes the module (`await module.DisposeAsync();`). For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

`{PATH}/JsCollocation2.razor.js`:

```javascript
export function showPrompt2(message) {
  return prompt(message, 'Type your name here');
}
```

> **Important:**
> Don't place a `<script>` tag for `JsCollocation2.razor.js` after the Blazor script because the module is loaded and cached automatically when the dynamic `import()` is invoked.

Use of scripts and modules for collocated JS in a Razor class library (RCL) is only supported for Blazor's JS interop mechanism based on the `Microsoft.JSInterop.IJSRuntime` interface. If you're implementing JavaScript `[JSImport]`/`[JSExport]` interop, see JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.

For scripts or modules provided by a Razor class library (RCL) using `Microsoft.JSInterop.IJSRuntime`-based JS interop, the following path is used:

`./_content/{PACKAGE ID}/{PATH}/{COMPONENT}.{EXTENSION}.js`

* The path segment for the current directory (`./`) is required in order to create the correct static asset path to the JS file.
* The `{PACKAGE ID}` placeholder is the RCL's package identifier (or library name for a class library referenced by the app).
* The `{PATH}` placeholder is the path to the component. If a Razor component is located at the root of the RCL, the path segment isn't included.
* The `{COMPONENT}` placeholder is the component name.
* The `{EXTENSION}` placeholder matches the extension of component, either `razor` or `cshtml`.

In the following Blazor app example:

* The RCL's package identifier is `AppJS`.
* A module's scripts are loaded for the `JsCollocation3` component (`JsCollocation3.razor`).
* The `JsCollocation3` component is in the `Components/Pages` folder of the RCL.

```csharp
module = await JS.InvokeAsync<IJSObjectReference>("import", 
    "./_content/AppJS/Components/Pages/JsCollocation3.razor.js");
```

## Client-side browser compatibility analyzer

Client-side apps target the full .NET API surface area, but not all .NET APIs are supported on WebAssembly due to browser sandbox constraints. Unsupported APIs throw `System.PlatformNotSupportedException` when running on WebAssembly. A platform compatibility analyzer warns the developer when the app uses APIs that aren't supported by the app's target platforms. For client-side apps, this means checking that APIs are supported in browsers. Annotating .NET framework APIs for the compatibility analyzer is an on-going process, so not all .NET framework API is currently annotated.

Blazor Web Apps that enable Interactive WebAssembly components, Blazor WebAssembly apps, and RCL projects *automatically* enable browser compatibility checks by adding `browser` as a supported platform with the `SupportedPlatform` MSBuild item. Library developers can manually add the `SupportedPlatform` item to a library's project file to enable the feature:

```xml
<ItemGroup>
  <SupportedPlatform Include="browser" />
</ItemGroup>
```

When authoring a library, indicate that a particular API isn't supported in browsers by specifying `browser` to `System.Runtime.Versioning.UnsupportedOSPlatformAttribute`:

```csharp
using System.Runtime.Versioning;

...

[UnsupportedOSPlatform("browser")]
private static string GetLoggingDirectory()
{
    ...
}
```

For more information, see Annotating APIs as unsupported on specific platforms (`dotnet/designs` GitHub repository.

## JavaScript isolation in JavaScript modules

Blazor enables JavaScript isolation in standard JavaScript modules. JavaScript isolation provides the following benefits:

* Imported JavaScript no longer pollutes the global namespace.
* Consumers of the library and components aren't required to manually import the related JavaScript.

For more information, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

## Avoid trimming JavaScript-invokable .NET methods

Runtime relinking trims class instance JavaScript-invokable .NET methods unless they're explicitly preserved. For more information, see Call .NET methods from JavaScript functions in ASP.NET Core Blazor.

## Build, pack, and ship to NuGet

Because Razor class libraries that contain Razor components are standard .NET libraries, packing and shipping them to NuGet is no different from packing and shipping any library to NuGet. Packing is performed using the `dotnet pack` command in a command shell:

```dotnetcli
dotnet pack
```

Upload the package to NuGet using the `dotnet nuget push` command in a command shell.

## Trademarks

*Jeep* and *Jeep YJ* are registered trademarks of FCA US LLC (Stellantis NV).

## Related content

* Reusable Razor UI in class libraries with ASP.NET Core
* Use ASP.NET Core APIs in a class library
* Add an XML Intermediate Language (IL) Trimmer configuration file to a library
* CSS isolation support with Razor class libraries
