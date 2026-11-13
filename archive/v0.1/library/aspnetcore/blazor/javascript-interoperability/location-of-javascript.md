---
title: "JavaScript location in ASP.NET Core Blazor apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/javascript-interoperability/location-of-javascript.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# JavaScript location in ASP.NET Core Blazor apps

-->
-->

Load JavaScript (JS) code using any of the following approaches:

* Load a script in `<head>` markup (*Not generally recommended*)
* Load a script in `<body>` markup
* Load a script from an external JavaScript file (`.js`) collocated with a component
* Load a script from an external JavaScript file (`.js`)
* Inject a script before or after Blazor starts

Inline JavaScript isn't recommended for Blazor apps. We recommend using JS collocation combined with JS modules.

## Location of ``) in the `<head>` element markup:

```html
<head>
    ...

    <script>
      window.jsMethod = (methodParameter) => {
        ...
      };
    </script>
</head>
```

Loading JS from the `<head>` isn't the best approach for the following reasons:

* JS interop may fail if the script depends on Blazor. We recommend loading scripts using one of the other approaches, not via the `<head>` markup.
* The page may become interactive slower due to the time it takes to parse the JS in the script.

In component markup, scripts can be loaded via a `HeadContent` component with the usual caveat that the approach slows down page load on the client, which we recommend avoiding. When a script is loaded with a `HeadContent` component in a Blazor Server app, Blazor WebAssembly app, or a Blazor Web App using either an interactive render mode (interactive SSR, CSR) or static SSR with enhanced navigation, navigating away from the component's page removes the ``) inside the closing `</body>` element after the Blazor script reference:

```html
<body>
    ...

    <script src="{BLAZOR SCRIPT}"></script>
    <script>
      window.jsMethod = (methodParameter) => {
        ...
      };
    </script>
</body>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

## Load a script from an external JavaScript file (`.js`) collocated with a component

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

For more information on RCLs, see Consume ASP.NET Core Razor components from a Razor class library (RCL).

### Load a script from an external JavaScript file (`.js`)

Place the JavaScript (JS) tags (``) with a script source (`src`) path inside the closing `</body>` element after the Blazor script reference:

```html
<body>
    ...

    <script src="{BLAZOR SCRIPT}"></script>
    <script src="{SCRIPT PATH AND FILE NAME (.js)}"></script>
</body>
```

For the placeholders in the preceding example:

* The `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name. For the location of the script, see ASP.NET Core Blazor project structure.
* The `{SCRIPT PATH AND FILE NAME (.js)}` placeholder is the path and script file name under `wwwroot`.

In the following example of the preceding `<script>` tag, the `scripts.js` file is in the `wwwroot/js` folder of the app:

```html
<script src="js/scripts.js"></script>
```

You can also serve scripts directly from the `wwwroot` folder if you prefer not to keep all of your scripts in a separate folder under `wwwroot`:

```html
<script src="scripts.js"></script>
```

When the external JS file is supplied by a Razor class library, specify the JS file using its stable static web asset path: `_content/{PACKAGE ID}/{SCRIPT PATH AND FILE NAME (.js)}`:

* The `{PACKAGE ID}` placeholder is the library's package ID. The package ID defaults to the project's assembly name if `<PackageId>` isn't specified in the project file.
* The `{SCRIPT PATH AND FILE NAME (.js)}` placeholder is the path and file name under `wwwroot`.

```html
<body>
    ...

    <script src="{BLAZOR SCRIPT}"></script>
    <script src="_content/{PACKAGE ID}/{SCRIPT PATH AND FILE NAME (.js)}"></script>
</body>
```

In the following example of the preceding `<script>` tag:

* The Razor class library has an assembly name of `ComponentLibrary`, and a `<PackageId>` isn't specified in the library's project file.
* The `scripts.js` file is in the class library's `wwwroot` folder.

```html
<script src="_content/ComponentLibrary/scripts.js"></script>
```

For more information, see Consume ASP.NET Core Razor components from a Razor class library (RCL).

## Inject a script before or after Blazor starts

To ensure scripts load before or after Blazor starts, use a JavaScript initializer. For more information and examples, see ASP.NET Core Blazor startup.

## JavaScript isolation in JavaScript modules

Blazor enables JavaScript (JS) isolation in standard JS modules (ECMAScript specification).

JS isolation provides the following benefits:

* Imported JS no longer pollutes the global namespace.
* Consumers of a library and components aren't required to import the related JS.

In server-side scenarios, always trap `Microsoft.JSInterop.JSDisconnectedException` in case loss of Blazor's SignalR circuit prevents a JS interop call from disposing a module, which results in an unhandled exception. Blazor WebAssembly apps don't use a SignalR connection during JS interop, so there's no need to trap `Microsoft.JSInterop.JSDisconnectedException` in Blazor WebAssembly apps for module disposal.

For more information, see the following resources:

* JavaScript isolation in JavaScript modules
* JavaScript interop calls without a circuit
