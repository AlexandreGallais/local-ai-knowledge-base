---
title: "Call JavaScript functions from .NET methods in ASP.NET Core Blazor (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/javascript-interoperability/call-javascript-from-dotnet.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call JavaScript functions from .NET methods in ASP.NET Core Blazor (part 2 of 4)

## Read or modify the value of a JS object property

Read or modify the value of a JS object property, both data and accessor properties, with the following API:

* `Microsoft.JSInterop.JSRuntime.GetValueAsync*`/`Microsoft.JSInterop.JSRuntime.SetValueAsync*` (asynchronous)
* `GetValue`/`SetValue` (synchronous)

Examples in this section demonstrate the API calls with the following JS object (`testObject`):

```javascript
window.testObject = {
  num: 10
}
```

### Asynchronous `GetValueAsync` and `SetValueAsync`

Use `Microsoft.JSInterop.JSRuntime.GetValueAsync*` to read the value of the specified JS property asynchronously. A `Microsoft.JSInterop.JSException` is thrown if the property doesn't exist or is a `set`-only property. In the following example, the value of `testObject.num` (10) is stored in `valueFromDataPropertyAsync`:

```csharp
var valueFromDataPropertyAsync = 
    await JSRuntime.GetValueAsync<int>("testObject.num");
```

Use `Microsoft.JSInterop.JSRuntime.SetValueAsync*` to update the value of the specified JS property asynchronously. If the property isn't defined on the target object, the property is created. A `Microsoft.JSInterop.JSException` is thrown if the property exists but isn't writable or when a new property can't be added to the object. In the following example, `testObject.num` is set to 20, and `num2` is created with a value of 30 on `testObject`:

```csharp
await JSRuntime.SetValueAsync("testObject.num", 20);
await JSRuntime.SetValueAsync("testObject.num2", 30);
```

### Synchronous `GetValue` and `SetValue`

Use `GetValue` to read the value of the specified JS property synchronously. A `Microsoft.JSInterop.JSException` is thrown if the property doesn't exist or is a `set`-only property. In the following example, the value of `testObject.num` (10) is stored in `valueFromDataProperty`:

```csharp
var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
var valueFromDataProperty = inProcRuntime.GetValue<int>("testObject.num");
```

Use `SetValue` to update the value of the specified JS property synchronously. The property can't be a `get`-only property. If the property isn't defined on the target object, the property is created. A `Microsoft.JSInterop.JSException` is thrown if the property exists but isn't writable or when a new property can't be added to the object. In the following example, `testObject.num` is set to 20, and `num2` is created with a value of 30 on `testObject`:

```csharp
var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
inProcRuntime.SetValue("testObject.num", 20);
inProcRuntime.SetValue("testObject.num2", 30);
```

## JavaScript location

Load JavaScript (JS) code using any of approaches described by the article on JavaScript location:

* Load a script in `<head>` markup (*Not generally recommended*)
* Load a script in `<body>` markup
* Load a script from an external JavaScript file (`.js`) collocated with a component
* Load a script from an external JavaScript file (`.js`)
* Inject a script before or after Blazor starts

For information on isolating scripts in JS modules, see the JavaScript isolation in JavaScript modules section.

> **Warning:**
> Only place a `<script>` tag in a component file (`.razor`) if the component is guaranteed to adopt static server-side rendering (static SSR) because the `<script>` tag can't be updated dynamically.

## JavaScript isolation in JavaScript modules

Blazor enables JavaScript (JS) isolation in standard JavaScript modules (ECMAScript specification). JavaScript module loading works the same way in Blazor as it does for other types of web apps, and you're free to customize how modules are defined in your app. For a guide on how to use JavaScript modules, see MDN Web Docs: JavaScript modules.

JS isolation provides the following benefits:

* Imported JS no longer pollutes the global namespace.
* Consumers of a library and components aren't required to import the related JS.

Dynamic import with the `import()` operator is supported with ASP.NET Core and Blazor:

```javascript
if ({CONDITION}) import("/additionalModule.js");
```

In the preceding example, the `{CONDITION}` placeholder represents a conditional check to determine if the module should be loaded.

For browser compatibility, see Can I use: JavaScript modules: dynamic import.

In server-side scenarios, JS interop calls can't be issued after Blazor's SignalR circuit is disconnected. Without a circuit during component disposal or at any other time that a circuit doesn't exist, the following method calls fail and log a message that the circuit is disconnected as a `Microsoft.JSInterop.JSDisconnectedException`:

* JS interop method calls
  * `Microsoft.JSInterop.IJSRuntime.InvokeAsync*`
  * `Microsoft.JSInterop.JSRuntimeExtensions.InvokeAsync*`
  * `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*`
  * `Microsoft.JSInterop.JSRuntime.InvokeConstructorAsync*`
  * `Microsoft.JSInterop.IJSInProcessObjectReference.InvokeConstructor*`
  * `Microsoft.JSInterop.JSRuntime.GetValueAsync*`
  * `Microsoft.JSInterop.JSRuntime.SetValueAsync*`
* `Microsoft.JSInterop.JSRuntime.Dispose*`/`DisposeAsync` calls on any `Microsoft.JSInterop.IJSObjectReference`.

In order to avoid logging `Microsoft.JSInterop.JSDisconnectedException` or to log custom information in server-side Blazor, catch the exception in a `try-catch` statement.

For the following component disposal example:

* The server-side component implements `System.IAsyncDisposable`.
* `module` is an `Microsoft.JSInterop.IJSObjectReference` for a JS module.
* `Microsoft.JSInterop.JSDisconnectedException` is caught and not logged.
* Optionally, you can log custom information in the `catch` statement at whatever log level you prefer. The following example doesn't log custom information. The code assumes that the developer doesn't care about when or where circuits are disconnected during component disposal.

```csharp
async ValueTask IAsyncDisposable.DisposeAsync()
{
    try
    {
        if (module is not null)
        {
            await module.DisposeAsync();
        }
    }
    catch (JSDisconnectedException)
    {
    }
}
```

If you must clean up your own JS objects or execute other JS code on the client after a circuit is lost in a server-side Blazor app, use the `MutationObserver` pattern in JS on the client. The `MutationObserver` pattern allows you to execute JS code when an element is removed from the DOM.

For more information, see the following articles:

* ASP.NET Core Blazor JavaScript interoperability (JS interop): Includes a code example of the `MutationObserver` pattern.
* Handle errors in ASP.NET Core Blazor apps: The *JavaScript interop* section discusses error handling in JS interop scenarios.
* ASP.NET Core Razor component disposal: The article describes how to implement disposal patterns in Razor components.

The following JS module exports a JS function for showing a browser window prompt. Place the following JS code in an external JS file.

`wwwroot/scripts.js`:

```javascript
export function showPrompt(message) {
  return prompt(message, 'Type anything here');
}
```

Add the preceding JS module to an app or class library as a static web asset in the `wwwroot` folder and then import the module into the .NET code by calling `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` on the `Microsoft.JSInterop.IJSRuntime` instance.

`Microsoft.JSInterop.IJSRuntime` imports the module as an `Microsoft.JSInterop.IJSObjectReference`, which represents a reference to a JS object from .NET code. Use the `Microsoft.JSInterop.IJSObjectReference` to invoke exported JS functions from the module.

`CallJs6.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs6.razor._
In the preceding example:

* By convention, the `import` identifier is a special identifier used specifically for importing a JS module.
* Specify the module's external JS file using its stable static web asset path: `./{SCRIPT PATH AND FILE NAME (.js)}`, where:
  * The path segment for the current directory (`./`) is required in order to create the correct static asset path to the JS file.
  * The `{SCRIPT PATH AND FILE NAME (.js)}` placeholder is the path and file name under `wwwroot`.
* Disposes the `Microsoft.JSInterop.IJSObjectReference` for garbage collection in `System.IAsyncDisposable.DisposeAsync*`.
* Don't place a `<script>` tag for the script after the Blazor script because the module is loaded and cached automatically when the dynamic `import()` is invoked.

Dynamically importing a module requires a network request, so it can only be achieved asynchronously by calling `Microsoft.JSInterop.IJSRuntime.InvokeAsync*`.

`Microsoft.JSInterop.IJSInProcessObjectReference` represents a reference to a JS object whose functions can be invoked synchronously in client-side components. For more information, see the Synchronous JS interop in client-side components section.

> **Note:**
> When the external JS file is supplied by a Razor class library, specify the module's JS file using its stable static web asset path: `./_content/{PACKAGE ID}/{SCRIPT PATH AND FILE NAME (.js)}`:
>
> * The path segment for the current directory (`./`) is required in order to create the correct static asset path to the JS file.
> * The `{PACKAGE ID}` placeholder is the library's package ID. The package ID defaults to the project's assembly name if `<PackageId>` isn't specified in the project file. In the following example, the library's assembly name is `ComponentLibrary` and the library's project file doesn't specify `<PackageId>`.
> * The `{SCRIPT PATH AND FILE NAME (.js)}` placeholder is the path and file name under `wwwroot`. In the following example, the external JS file (`script.js`) is placed in the class library's `wwwroot` folder.
> * `module` is a private nullable `Microsoft.JSInterop.IJSObjectReference` of the component class (`private IJSObjectReference? module;`).
>
> ```csharp
> module = await js.InvokeAsync<IJSObjectReference>(
>     "import", "./_content/ComponentLibrary/scripts.js");
> ```
>
> For more information, see Consume ASP.NET Core Razor components from a Razor class library (RCL).

Throughout the Blazor documentation, examples use the `.js` file extension for module files, not the newer `.mjs` file extension (RFC 9239). Our documentation continues to use the `.js` file extension for the same reasons the Mozilla Foundation's documentation continues to use the `.js` file extension. For more information, see Aside — .mjs versus .js (MDN documentation).
