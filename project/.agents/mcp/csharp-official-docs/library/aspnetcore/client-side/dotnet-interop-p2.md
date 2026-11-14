---
title: "JavaScript `[JSImport]`/`[JSExport]` interop in .NET WebAssembly (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/client-side/dotnet-interop/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# JavaScript `[JSImport]`/`[JSExport]` interop in .NET WebAssembly (part 2 of 2)

## JS primitives

The following example demonstrates `[JSImport]` leveraging type mappings of several primitive JS types and the use of `JSMarshalAs`, where explicit mappings are required at compile time.

`PrimitivesShim.js`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/PrimitivesShim.js._
`PrimitivesInterop.cs`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/PrimitivesInterop.cs._
In `Program.Main`:

```csharp
await PrimitivesUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> :::no-loc text="Printed from JSImport of console.log()":::
> :::no-loc text="1":::
> :::no-loc text="I'm a string from .NET in your browser!":::
> :::no-loc text="boolean true":::
> :::no-loc text="number 58":::
> :::no-loc text="number 67":::
> :::no-loc text="number 12":::
> :::no-loc text="number <example-card-number>":::
> :::no-loc text="bigint 1234567890123456789n":::
> :::no-loc text="number 3.140000104904175":::
> :::no-loc text="number 3.14":::
> :::no-loc text="string A string":::

## JS `Date` objects

The example in this section demonstrates importing methods which have a JS `Date` object as its return or parameter. Dates are marshalled across interop by-value, meaning they are copied in much the same way as JS primitives.

A `Date` object is timezone agnostic. A .NET `System.DateTime` is adjusted relative to its `System.DateTimeKind` when marshalled to a `Date`, but timezone information isn't preserved. Consider initializing a `System.DateTime` with a `System.DateTimeKind.Utc` or `System.DateTimeKind.Local` consistent with the value it represents.

`DateShim.js`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/DateShim.js._
`DateInterop.cs`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/DateInterop.cs._
In `Program.Main`:

```csharp
await DateUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> :::no-loc text="Date: Sat Dec 21 1968 07:51:00 GMT-0500 (Eastern Standard Time)":::
> :::no-loc text="Date: Sun Dec 22 1968 07:51:00 GMT-0500 (Eastern Standard Time)":::

The preceding timezone information (`GMT-0500 (Eastern Standard Time)`) depends on local timezone of your computer/browser.

## JS object references

Whenever a JS method returns an object reference, it's represented in .NET as a `System.Runtime.InteropServices.JavaScript.JSObject`. The original JS object continues its lifetime within the JS boundary, while .NET code can access and modify it by reference through the `System.Runtime.InteropServices.JavaScript.JSObject`. While the type itself exposes a limited API, the ability to hold a JS object reference and return or pass it across the interop boundary enables support for several interop scenarios.

The `System.Runtime.InteropServices.JavaScript.JSObject` provides methods to access properties, but it doesn't provide direct access to instance methods. As the following `Summarize` method demonstrates, instance methods can be accessed indirectly by implementing a static method that takes the instance as a parameter.

`JSObjectShim.js`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/JSObjectShim.js._
`JSObjectInterop.cs`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/JSObjectInterop.cs._
In `Program.Main`:

```csharp
await JSObjectUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> :::no-loc text="{name: 'Example JS Object', answer: 41, question: null, Symbol(wasm cs_owned_js_handle): 5, summarize: ƒ}":::
> :::no-loc text="{name: 'Example JS Object', answer: 42, question: null, Symbol(wasm cs_owned_js_handle): 5, summarize: ƒ}":::
> :::no-loc text="{name: 'Example JS Object', answer: 42, question: 'What is the answer?', Symbol(wasm cs_owned_js_handle): 5, summarize: ƒ}":::
> :::no-loc text="Summary: Question: \"What is the answer?\" Answer: 42":::

## Asynchronous interop

Many JS APIs are asynchronous and signal completion through either a callback, a `Promise`, or an async method. Ignoring asynchronous capabilities is often not an option, as subsequent code may depend upon the completion of the asynchronous operation and must be awaited.

JS methods using the `async` keyword or returning a `Promise` can be awaited in C# by a method returning a `System.Threading.Tasks.Task`. As demonstrated below, the `async` keyword isn't used on the C# method with the `[JSImport]` attribute because it doesn't use the `await` keyword within it. However, consuming code calling the method would typically use the `await` keyword and be marked as `async`, as demonstrated in the `PromisesUsage` example.

JS with a callback, such as a `setTimeout`, can be wrapped in a `Promise` before returning from JS. Wrapping a callback in a `Promise`, as demonstrated in the function assigned to `Wait2Seconds`, is only appropriate when the callback is called exactly once. Otherwise, a C# `System.Action` can be passed to listen for a callback that may be called zero or many times, which is demonstrated in the Subscribing to JS events section.

`PromisesShim.js`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/PromisesShim.js._
Don't use the `async` keyword in the C# method signature. Returning `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` is sufficient.

When calling asynchronous JS methods, we often want to wait until the JS method completes execution. If loading a resource or making a request, we likely want the following code to assume the action is completed.

If the JS shim returns a `Promise`, then C# can treat it as an awaitable `System.Threading.Tasks.Task`/`System.Threading.Tasks.Task`1`.

`PromisesInterop.cs`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/PromisesInterop.cs._
In `Program.Main`:

```csharp
await PromisesUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> :::no-loc text="Waited 2.0s.":::
> :::no-loc text="Waited .5s for WaitGetString: 'String From Resolve'":::
> :::no-loc text="Waited .5s for WaitGetDate: '11/24/1988 12:00:00 AM'":::
> :::no-loc text="responseText.Length: 582":::
> :::no-loc text="Waited 2.0s for AsyncFunction.":::
> :::no-loc text="JS Exception Caught: 'Reject: ShouldSucceed == false'":::

## Type mapping limitations

Some type mappings requiring nested generic types in the `JSMarshalAs` definition aren't currently supported. For example, returning a `Promise` for an array such as `[return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>()]` generates a compile-time error. An appropriate workaround varies depending on the scenario, but one option is to represent the array as a `System.Runtime.InteropServices.JavaScript.JSObject` reference. This may be sufficient if accessing individual elements within .NET isn't necessary and the reference can be passed to other JS methods that act on the array. Alternatively, a dedicated method can take the `System.Runtime.InteropServices.JavaScript.JSObject` reference as a parameter and return the materialized array, as demonstrated by the following `UnwrapJSObjectAsIntArray` example. In this case, the JS method has no type checking, and the developer has the responsibility to ensure a `System.Runtime.InteropServices.JavaScript.JSObject` wrapping the appropriate array type is passed.

```javascript
export function waitGetIntArrayAsObject() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]); // Return an array from the Promise
    }, 500);
  });
}

export function unwrapJSObjectAsIntArray(jsObject) {
  return jsObject;
}
```

```csharp
// Not supported, generates compile-time error.
// [JSImport("waitGetArray", "PromisesShim")]
// [return: JSMarshalAs<JSType.Promise<JSType.Array<JSType.Number>>>()]
// public static partial Task<int[]> WaitGetIntArray();

// Workaround, take the return the call and pass it to UnwrapJSObjectAsIntArray.
// Return a JSObject reference to a JS number array.
[JSImport("waitGetIntArrayAsObject", "PromisesShim")]
[return: JSMarshalAs<JSType.Promise<JSType.Object>>()]
public static partial Task<JSObject> WaitGetIntArrayAsObject();

// Takes a JSObject reference to a JS number array, and returns the array as a C#
// int array.
[JSImport("unwrapJSObjectAsIntArray", "PromisesShim")]
[return: JSMarshalAs<JSType.Array<JSType.Number>>()]
public static partial int[] UnwrapJSObjectAsIntArray(JSObject intArray);
//...
```

In `Program.Main`:

```csharp
JSObject arrayAsJSObject = await PromisesInterop.WaitGetIntArrayAsObject();
int[] intArray = PromisesInterop.UnwrapJSObjectAsIntArray(arrayAsJSObject);
```

## Performance considerations

Marshalling of calls and the overhead of tracking objects across the interop boundary is more expensive than native .NET operations but should still demonstrate acceptable performance for a typical web app with moderate demand.

Object proxies, such as `System.Runtime.InteropServices.JavaScript.JSObject`, which maintain references across the interop boundary, have additional memory overhead and impact how garbage collection affects these objects. Additionally, available memory might be exhausted without triggering garbage collection in some scenarios because memory pressure from JS and .NET isn't shared. This risk is significant when an excessive number of large objects are referenced across the interop boundary by relatively small JS objects, or vice versa where large .NET objects are referenced by JS proxies. In such cases, we recommend following deterministic disposal patterns with `using` scopes leveraging the `System.IDisposable` interface on JS objects.

The following benchmarks, which leverage earlier example code, demonstrate that interop operations are roughly an order of magnitude slower than those that remain within the .NET boundary, but the interop operations remain relatively fast. Additionally, consider that a user's device capabilities impact performance.

`JSObjectBenchmark.cs`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/JSObjectBenchmark.cs._
In `Program.Main`:

```csharp
JSObjectBenchmark.Run();
```

The preceding example displays the following output in the browser's debug console:

> :::no-loc text="JS interop elapsed time: .2536 seconds at .000254 ms per operation":::
> :::no-loc text=".NET elapsed time: .0210 seconds at .000021 ms per operation":::
> :::no-loc text="Begin Object Creation":::
> :::no-loc text="JS interop elapsed time: 2.1686 seconds at .002169 ms per operation":::
> :::no-loc text=".NET elapsed time: .1089 seconds at .000109 ms per operation":::

## Subscribing to JS events

.NET code can subscribe to JS events and handle JS events by passing a C# `System.Action` to a JS function to act as a handler. The JS shim code handles subscribing to the event.

> **Warning:**
> Interacting with individual properties of the DOM via JS interop, as the guidance in this section demonstrates, is relatively slow and may lead to the creation of many proxies that create high garbage collection pressure. The following pattern isn't generally recommended. Use the following pattern for no more than a few elements. For more information, see the Performance considerations section.

A nuance of `removeEventListener` is that it requires a reference to the function previously passed to `addEventListener`. When a C# `System.Action` is passed across the interop boundary, it's wrapped in a JS proxy object. Therefore, passing the same C# `System.Action` to both `addEventListener` and `removeEventListener` results in generating two different JS proxy objects wrapping the `System.Action`. These references are different, thus `removeEventListener` isn't able to find the event listener to remove. To address this problem, the following examples wrap the C# `System.Action` in a JS function and return the reference as a `System.Runtime.InteropServices.JavaScript.JSObject` from the subscribe call to pass later to the unsubscribe call. Because the C# `System.Action` is returned and passed as a `System.Runtime.InteropServices.JavaScript.JSObject`, the same reference is used for both calls, and the event listener can be removed.

`EventsShim.js`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/wwwroot/EventsShim.js._
`EventsInterop.cs`:

_Code sample not included: ~/../blazor-samples/8.0/WASMBrowserAppImportExportInterop/EventsInterop.cs._
In `Program.Main`:

```csharp
await EventsUsage.Run();
```

The preceding example displays the following output in the browser's debug console:

> :::no-loc text="Subscribed to btn1 & 2.":::
> :::no-loc text="In C# event listener: Event click from ID btn1":::
> :::no-loc text="In C# event listener: Event click from ID btn2":::
> :::no-loc text="Unsubscribed btn2.":::
> :::no-loc text="In C# event listener: Event click from ID btn1":::
> :::no-loc text="Subscribed to btn1.":::
> :::no-loc text="In C# event listener: Event click from ID btn1":::
> :::no-loc text="Unsubscribed btn1.":::

## JS `[JSImport]`/`[JSExport]` interop scenarios

The following articles focus on running a .NET WebAssembly module in a JS host, such as a browser:

* JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop with a WebAssembly Browser App project
* JavaScript JSImport/JSExport interop with ASP.NET Core Blazor
