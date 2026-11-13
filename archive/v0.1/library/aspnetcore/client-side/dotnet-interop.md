---
title: "JavaScript `[JSImport]`/`[JSExport]` interop in .NET WebAssembly (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/client-side/dotnet-interop/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# JavaScript `[JSImport]`/`[JSExport]` interop in .NET WebAssembly

-->
-->

By Aaron Shumaker

This article explains how to interact with JavaScript (JS) in client-side WebAssembly using JS `[JSImport]`/`[JSExport]` interop (`System.Runtime.InteropServices.JavaScript` API).

`[JSImport]`/`[JSExport]` interop is applicable when running a .NET WebAssembly module in a JS host in the following scenarios:

* JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop with a WebAssembly Browser App project.
* JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.
* Other .NET WebAssembly platforms that support `[JSImport]`/`[JSExport]` interop.

## Prerequisites

.NET SDK (latest version)

Any of the following project types:

* A WebAssembly Browser App project created according to JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop with a WebAssembly Browser App project.
* A Blazor client-side project created according to JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.
* A project created for a commercial or open-source platform that supports `[JSImport]`/`[JSExport]` interop (`System.Runtime.InteropServices.JavaScript` API).

## Sample app

View or download sample code (how to download): Select an 8.0 or later version folder that matches the version of .NET that you're adopting. Within the version folder, access the sample named `WASMBrowserAppImportExportInterop`.

## JS interop using `[JSImport]`/`[JSExport]` attributes

The `[JSImport]` attribute is applied to a .NET method to indicate that a corresponding JS method should be called when the .NET method is called. This allows .NET developers to define "imports" that enable .NET code to call into JS. Additionally, an `System.Action` can be passed as a parameter, and JS can invoke the action to support a callback or event subscription pattern.

The `[JSExport]` attribute is applied to a .NET method to expose it to JS code. This allows JS code to initiate calls to the .NET method.

## Importing JS methods

The following example imports a standard built-in JS method (`console.log`) into C#. `[JSImport]` is limited to importing methods of globally-accessible objects. For example, `log` is a method defined on the `console` object, which is defined on the globally-accessible object `globalThis`. The `console.log` method is mapped to a C# proxy method, `ConsoleLog`, which accepts a string for the log message:

```csharp
public partial class GlobalInterop
{
    [JSImport("globalThis.console.log")]
    public static partial void ConsoleLog(string text);
}
```

In `Program.Main`, `ConsoleLog` is called with the message to log:

```csharp
GlobalInterop.ConsoleLog("Hello World!");
```

The output appears in the browser's console.

The following demonstrates importing a method declared in JS.

The following custom JS method (`globalThis.callAlert`) spawns an alert dialog (`window.alert`) with the message passed in `text`:

```javascript
globalThis.callAlert = function (text) {
  globalThis.window.alert(text);
}
```

The `globalThis.callAlert` method is mapped to a C# proxy method (`CallAlert`), which accepts a string for the message:

```csharp
using System.Runtime.InteropServices.JavaScript;

public partial class GlobalInterop
{
	[JSImport("globalThis.callAlert")]
	public static partial void CallAlert(string text);
}
```

In `Program.Main`, `CallAlert` is called, passing the text for the alert dialog message:

```csharp
GlobalInterop.CallAlert("Hello World");
```

The C# class declaring the `[JSImport]` method doesn't have an implementation. At compile time, a source-generated partial class contains the .NET code that implements the marshalling of the call and types to invoke the corresponding JS method. In Visual Studio, using the **Go To Definition** or **Go To Implementation** options respectively navigates to either the source-generated partial class or the developer-defined partial class.

In the preceding example, the intermediate `globalThis.callAlert` JS declaration is used to wrap existing JS code. This article informally refers to the intermediate JS declaration as a *JS shim*. JS shims fill the gap between the .NET implementation and existing JS capabilities/libraries. In many cases, such as the preceding trivial example, the JS shim isn't necessary, and methods could be imported directly, as demonstrated in the earlier `ConsoleLog` example. As this article demonstrates in the upcoming sections, a JS shim can:

* Encapsulate additional logic.
* Manually map types.
* Reduce the number of objects or calls crossing the interop boundary.
* Manually map static calls to instance methods.

## Loading JavaScript declarations

JS declarations which are intended to be imported with `[JSImport]` are typically loaded in the context of the same page or JS host that loaded .NET WebAssembly. This can be accomplished with:

* A `` block declaring inline JS.
* A script source (`src`) declaration (``) that loads an external JS file (`.js`).
* A JS ES6 module (``).
* A JS ES6 module loaded using `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` from .NET WebAssembly.

Examples in this article use `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*`. When calling `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*`, client-side .NET WebAssembly requests the file using the `moduleUrl` parameter, and thus it expects the file to be accessible as a static web asset, much the same way as a `<script>` tag retrieves a file with a `src` URL. For example, the following C# code within a WebAssembly Browser App project maintains the JS file (`.js`) at the path `/wwwroot/scripts/ExampleShim.js`:

```csharp
await JSHost.ImportAsync("ExampleShim", "/scripts/ExampleShim.js");
```

Depending on the platform that's loading WebAssembly, a dot-prefixed URL, such as `./scripts/`, might refer to an incorrect subdirectory, such as `/_framework/scripts/`, because the WebAssembly package is initialized by framework scripts under `/_framework/`. In that case, prefixing the URL with `../scripts/` refers to the correct path. Prefixing with `/scripts/` works if the site is hosted at the root of the domain. A typical approach involves configuring the correct base path for the given environment with an HTML `<base>` tag and using the `/scripts/` prefix to refer to the path relative to the base path. Tilde notation `~/` prefixes aren't supported by `System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*`.

> **Important:**
> If JS is loaded from a JavaScript module, then `[JSImport]` attributes must include the module name as the second parameter. For example, `[JSImport("globalThis.callAlert", "ExampleShim")]` indicates the imported method was declared in a JavaScript module named "`ExampleShim`."

`System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` can take advantage of the following features:

* Import map for module scripts (Blazor Web Apps)
* Fingerprinting client-side static assets (standalone Blazor WebAssembly apps)

`System.Runtime.InteropServices.JavaScript.JSHost.ImportAsync*` can take advantage of an import map for module scripts in a Blazor Web App.

## Type mappings

Parameters and return types in the .NET method signature are automatically converted to or from appropriate JS types at runtime if a unique mapping is supported. This may result in values converted by value or references wrapped in a proxy type. This process is known as *type marshalling*. Use `System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute`1` to control how the imported method parameters and return types are marshalled.

Some types don't have a default type mapping. For example, a `long` can be marshalled as `System.Runtime.InteropServices.JavaScript.JSType.Number` or `System.Runtime.InteropServices.JavaScript.JSType.BigInt`, so the `System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute`1` is required to avoid a compile-time error.

The following type mapping scenarios are supported:

* Passing `System.Action` or `System.Func`1` as parameters, which are marshalled as callable JS methods. This allows .NET code to invoke listeners in response to JS callbacks or events.
* Passing JS references and .NET managed object references in either direction, which as marshaled as proxy objects and kept alive across the interop boundary until the proxy is garbage collected.
* Marshalling asynchronous JS methods or a JS `Promise` with a `System.Threading.Tasks.Task` result, and vice versa.

Most of the marshalled types work in both directions, as parameters and as return values, on both imported and exported methods.

The following table indicates the supported type mappings.

| .NET | JavaScript | `Nullable` | `Task` ➔to `Promise` | `JSMarshalAs` optional | `Array of` |
| --- | --- | :---: | :---: | :---: | :---: |
| `Boolean` | `Boolean` | ✅Supported | ✅Supported | ✅Supported | Not supported |
| `Byte` | `Number` | ✅Supported | ✅Supported | ✅Supported | ✅Supported |
| `Char` | `Number` | ✅Supported | ✅Supported | ✅Supported | Not supported |
| `Int16` | `Number` | ✅Supported | ✅Supported | ✅Supported | Not supported |
| `Int32` | `Number` | ✅Supported | ✅Supported | ✅Supported | ✅Supported |
| `Int64` | `Number` | ✅Supported | ✅Supported | Not supported | Not supported |
| `Int64` | `BigInt` | ✅Supported | ✅Supported | Not supported | Not supported |
| `Single` | `Number` | ✅Supported | ✅Supported | ✅Supported | ✅Supported |
| `Double` | `Number` | ✅Supported | ✅Supported | ✅Supported | ✅Supported |
| `IntPtr` | `Number` | ✅Supported | ✅Supported | ✅Supported | Not supported |
| `DateTime` | `Date` | ✅Supported | ✅Supported | Not supported | Not supported |
| `DateTimeOffset` | `Date` | ✅Supported | ✅Supported | Not supported | Not supported |
| `Exception` | `Error` | Not supported | ✅Supported | ✅Supported | Not supported |
| `JSObject` | `Object` | Not supported | ✅Supported | ✅Supported | ✅Supported |
| `String` | `String` | Not supported | ✅Supported | ✅Supported | ✅Supported |
| `Object` | `Any` | Not supported | ✅Supported | Not supported | ✅Supported |
| `Span<Byte>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `Span<Int32>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `Span<Single>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `Span<Double>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `ArraySegment<Byte>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `ArraySegment<Int32>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `ArraySegment<Single>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `ArraySegment<Double>` | `MemoryView` | Not supported | Not supported | Not supported | Not supported |
| `Task` | `Promise` | Not supported | Not supported | ✅Supported | Not supported |
| `Action` | `Function` | Not supported | Not supported | Not supported | Not supported |
| `Action<T1>` | `Function` | Not supported | Not supported | Not supported | Not supported |
| `Action<T1, T2>` | `Function` | Not supported | Not supported | Not supported | Not supported |
| `Action<T1, T2, T3>` | `Function` | Not supported | Not supported | Not supported | Not supported |
| `Func<TResult>` | `Function` | Not supported | Not supported | Not supported | Not supported |
| `Func<T1, TResult>` | `Function` | Not supported | Not supported | Not supported | Not supported |
| `Func<T1, T2, TResult>` | `Function` | Not supported | Not supported | Not supported | Not supported |
| `Func<T1, T2, T3, TResult>` | `Function` | Not supported | Not supported | Not supported | Not supported |

The following conditions apply to type mapping and marshalled values:

* The `Array of` column indicates if the .NET type can be marshalled as a JS `Array`. Example: C# `int[]` (`Int32`) mapped to JS `Array` of `Number`s.
* When passing a JS value to C# with a value of the wrong type, the framework throws an exception in most cases. The framework doesn't perform compile-time type checking in JS.
* `JSObject`, `Exception`, `Task` and `ArraySegment` create `GCHandle` and a proxy. You can trigger disposal in developer code or allow .NET garbage collection (GC) to dispose of the objects later. These types carry significant performance overhead.
* `Array`: Marshaling an array creates a copy of the array in JS or .NET.
* `MemoryView`
  * `MemoryView` is a JS class for the .NET WebAssembly runtime to marshal `Span` and `ArraySegment`.
  * Unlike marshaling an array, marshaling a `Span` or `ArraySegment` doesn't create a copy of the underlying memory.
  * `MemoryView` can only be properly instantiated by the .NET WebAssembly runtime. Therefore, it isn't possible to import a JS method as a .NET method that has a parameter of `Span` or `ArraySegment`.
  * `MemoryView` created for a `Span` is only valid for the duration of the interop call. As `Span` is allocated on the call stack, which doesn't persist after the interop call, it isn't possible to export a .NET method that returns a `Span`.
  * `MemoryView` created for an `ArraySegment` survives after the interop call and is useful for sharing a buffer. Calling `dispose()` on a `MemoryView` created for an `ArraySegment` disposes the proxy and unpins the underlying .NET array. We recommend calling `dispose()` in a `try-finally` block for `MemoryView`.

Some combinations of type mappings that require nested generic types in `JSMarshalAs` aren't currently supported. For example, attempting to materialize an array from a `Promise` such as `[return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>()]` generates a compile-time error. An appropriate workaround varies depending on the scenario, but this specific scenario is further explored in the Type mapping limitations section.
