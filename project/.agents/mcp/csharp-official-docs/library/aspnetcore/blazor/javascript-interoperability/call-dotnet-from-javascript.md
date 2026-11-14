---
title: "Call .NET methods from JavaScript functions in ASP.NET Core Blazor (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/javascript-interoperability/call-dotnet-from-javascript.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Call .NET methods from JavaScript functions in ASP.NET Core Blazor

This article explains how to invoke .NET methods from JavaScript (JS).

For information on how to call JS functions from .NET, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

> **Note:**
> C# union types are supported.

## Invoke a static .NET method

To invoke a static .NET method from JavaScript (JS), use the JS functions:

* `DotNet.invokeMethodAsync` (*recommended*): Asynchronous for both server-side and client-side components.
* `DotNet.invokeMethod`: Synchronous for client-side components only.

Pass in the name of the assembly containing the method, the identifier of the static .NET method, and any arguments.

In the following example:

* The `{PACKAGE ID/ASSEMBLY NAME}` placeholder is the project's package ID (`<PackageId>` in the project file) for a library or assembly name for an app.
* The `{.NET METHOD ID}` placeholder is the .NET method identifier.
* The `{ARGUMENTS}` placeholder are optional, comma-separated arguments to pass to the method, each of which must be JSON-serializable.

```javascript
DotNet.invokeMethodAsync('{PACKAGE ID/ASSEMBLY NAME}', '{.NET METHOD ID}', {ARGUMENTS});
```

`DotNet.invokeMethodAsync` returns a JS `Promise` representing the result of the operation. `DotNet.invokeMethod` (client-side components) returns the result of the operation.

> **Important:**
> For server-side components, we recommend the asynchronous function (`invokeMethodAsync`) over the synchronous version (`invokeMethod`).

The .NET method must be public, static, and have the `[JSInvokable]` attribute.

In the following example:

* The `{<T>}` placeholder indicates the return type, which is only required for methods that return a value.
* The `{.NET METHOD ID}` placeholder is the method identifier.

```razor
@code {
    [JSInvokable]
    public static Task{<T>} {.NET METHOD ID}()
    {
        ...
    }
}
```

> **Note:**
> Calling open generic methods isn't supported with static .NET methods but is supported with instance methods. For more information, see the Call .NET generic class methods section.

In the following component, the `ReturnArrayAsync` C# method returns an `int` array. The `[JSInvokable]` attribute is applied to the method, which makes the method invokable by JS.

`CallDotnet1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet1.razor._
`CallDotnet1.razor.js`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet1.razor.js._
The `addHandlers` JS function adds a `click` event to the button. The `returnArrayAsync` JS function is assigned as the handler.

The `returnArrayAsync` JS function calls the `ReturnArrayAsync` .NET method of the component, which logs the result to the browser's web developer tools console. `BlazorSample` is the app's assembly name.

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

When the **`Trigger .NET static method`** button is selected, the browser's developer tools console output displays the array data. The format of the output differs slightly among browsers. The following output shows the format used by Microsoft Edge:

```console
Array(3) [ 11, 12, 13 ]
```

Pass data to a .NET method when calling the `invokeMethodAsync` function by passing the data as arguments.

To demonstrate passing data to .NET, pass a starting position to the `ReturnArrayAsync` method where the method is invoked in JS:

```javascript
export function returnArrayAsync() {
  DotNet.invokeMethodAsync('BlazorSample', 'ReturnArrayAsync', 14)
    .then(data => {
      console.log(data);
    });
}
```

The component's invokable `ReturnArrayAsync` method receives the starting position and constructs the array from it. The array is returned for logging to the console:

```csharp
[JSInvokable]
public static Task<int[]> ReturnArrayAsync(int startPosition) => 
    Task.FromResult(Enumerable.Range(startPosition, 3).ToArray());
```

After the app is recompiled and the browser is refreshed, the following output appears in the browser's console when the button is selected:

```console
Array(3) [ 14, 15, 16 ]
```

The .NET method identifier for the JS call is the .NET method name, but you can specify a different identifier using the `[JSInvokable]` attribute constructor. In the following example, `DifferentMethodName` is the assigned method identifier for the `ReturnArrayAsync` method:

```csharp
[JSInvokable("DifferentMethodName")]
```

In the call to `DotNet.invokeMethodAsync` (server-side or client-side components) or `DotNet.invokeMethod` (client-side components only), call `DifferentMethodName` to execute the `ReturnArrayAsync` .NET method:

* `DotNet.invokeMethodAsync('BlazorSample', 'DifferentMethodName');`
* `DotNet.invokeMethod('BlazorSample', 'DifferentMethodName');` (client-side components only)

> **Note:**
> The `ReturnArrayAsync` method example in this section returns the result of a `System.Threading.Tasks.Task` without the use of explicit C# `async` and `await` keywords. Coding methods with `async` and `await` is typical of methods that use the `await` keyword to return the value of asynchronous operations.
>
> `ReturnArrayAsync` method composed with `async` and `await` keywords:
>
> ```csharp
> [JSInvokable]
> public static async Task<int[]> ReturnArrayAsync() =>
>     await Task.FromResult(new int[] { 11, 12, 13 });
> ```
>
> For more information, see Asynchronous programming with async and await in the C# guide.

## Create JavaScript object and data references to pass to .NET

Call `DotNet.createJSObjectReference(jsObject)` to construct a JS object reference so that it can be passed to .NET, where `jsObject` is the JS `Object` used to create the JS object reference. The following example passes a reference to the non-serializable `window` object to .NET, which receives it in the `ReceiveWindowObject` C# method as an `Microsoft.JSInterop.IJSObjectReference`:

```javascript
DotNet.invokeMethodAsync('{PACKAGE ID/ASSEMBLY NAME}', 'ReceiveWindowObject', 
  DotNet.createJSObjectReference(window));
```

```csharp
[JSInvokable]
public static void ReceiveWindowObject(IJSObjectReference objRef)
{
    ...
}
```

In the preceding example, the `{PACKAGE ID/ASSEMBLY NAME}` placeholder is the project's package ID (`<PackageId>` in the project file) for a library or assembly name for an app.

> **Note:**
> The preceding example doesn't require disposal of the `JSObjectReference`, as a reference to the `window` object isn't held in JS.

Maintaining a reference to a `JSObjectReference` requires disposing of it to avoid leaking JS memory on the client. The following example refactors the preceding code to capture a reference to the `JSObjectReference`, followed by a call to `DotNet.disposeJSObjectReference()` to dispose of the reference:

```javascript
var jsObjectReference = DotNet.createJSObjectReference(window);

DotNet.invokeMethodAsync('{PACKAGE ID/ASSEMBLY NAME}', 'ReceiveWindowObject', jsObjectReference);

DotNet.disposeJSObjectReference(jsObjectReference);
```

In the preceding example, the `{PACKAGE ID/ASSEMBLY NAME}` placeholder is the project's package ID (`<PackageId>` in the project file) for a library or assembly name for an app.

Call `DotNet.createJSStreamReference(streamReference)` to construct a JS stream reference so that it can be passed to .NET, where `streamReference` is an `ArrayBuffer`, `Blob`, or any typed array, such as `Uint8Array` or `Float32Array`, used to create the JS stream reference.

## Invoke an instance .NET method

To invoke an instance .NET method from JavaScript (JS):

* Pass the .NET instance by reference to JS by wrapping the instance in a `Microsoft.JSInterop.DotNetObjectReference` and calling `Microsoft.JSInterop.DotNetObjectReference.Create*` on it.
* Invoke a .NET instance method from JS using `invokeMethodAsync` (*recommended*) or `invokeMethod` (client-side components only) from the passed `Microsoft.JSInterop.DotNetObjectReference`. Pass the identifier of the instance .NET method and any arguments. The .NET instance can also be passed as an argument when invoking other .NET methods from JS.

  In the following example:

  * `dotNetHelper` is a `Microsoft.JSInterop.DotNetObjectReference`.
  * The `{.NET METHOD ID}` placeholder is the .NET method identifier.
  * The `{ARGUMENTS}` placeholder are optional, comma-separated arguments to pass to the method, each of which must be JSON-serializable.

  ```javascript
  dotNetHelper.invokeMethodAsync('{.NET METHOD ID}', {ARGUMENTS});
  ```

  > **Note:**
  > `invokeMethodAsync` and `invokeMethod` don't accept an assembly name parameter when invoking an instance method.

  `invokeMethodAsync` returns a JS `Promise` representing the result of the operation. `invokeMethod` (client-side components only) returns the result of the operation.

  > **Important:**
  > For server-side components, we recommend the asynchronous function (`invokeMethodAsync`) over the synchronous version (`invokeMethod`).

* Dispose of the `Microsoft.JSInterop.DotNetObjectReference`.

The following sections of this article demonstrate various approaches for invoking an instance .NET method:

* Pass a `DotNetObjectReference` to an individual JavaScript function
* Pass a `DotNetObjectReference` to a class with multiple JavaScript functions
* Call .NET generic class methods
* Class instance examples
* Component instance .NET method helper class

## Avoid trimming JavaScript-invokable .NET methods

*This section applies to client-side apps with ahead-of-time (AOT) compilation and runtime relinking enabled.*

Several of the examples in the following sections are based on a class instance approach, where the JavaScript-invokable .NET method marked with the `[JSInvokable]` attribute is a member of a class that isn't a Razor component. When such .NET methods are located in a Razor component, they're protected from runtime relinking/trimming. In order to protect the .NET methods from trimming outside of Razor components, implement the methods with the `DynamicDependency` attribute on the class's constructor, as the following example demonstrates:

```csharp
using System.Diagnostics.CodeAnalysis;
using Microsoft.JSInterop;

public class ExampleClass {

    [DynamicDependency(nameof(ExampleJSInvokableMethod))]
    public ExampleClass()
    {
    }

    [JSInvokable]
    public string ExampleJSInvokableMethod()
    {
        ...
    }
}
```

For more information, see Prepare .NET libraries for trimming: DynamicDependency.

## Pass a `DotNetObjectReference` to an individual JavaScript function

The example in this section demonstrates how to pass a `Microsoft.JSInterop.DotNetObjectReference` to an individual JavaScript (JS) function.

The following `sayHello1` JS function receives a `Microsoft.JSInterop.DotNetObjectReference` and calls `invokeMethodAsync` to call the `GetHelloMessage` .NET method of a component:

```html
<script>
  window.sayHello1 = (dotNetHelper) => {
    return dotNetHelper.invokeMethodAsync('GetHelloMessage');
  };
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

In the preceding example, the variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.

For the following component:

* The component has a JS-invokable .NET method named `GetHelloMessage`.
* When the **`Trigger .NET instance method`** button is selected, the JS function `sayHello1` is called with the `Microsoft.JSInterop.DotNetObjectReference`.
* `sayHello1`:
  * Calls `GetHelloMessage` and receives the message result.
  * Returns the message result to the calling `TriggerDotNetInstanceMethod` method.
* The returned message from `sayHello1` in `result` is displayed to the user.
* To avoid a memory leak and allow garbage collection, the .NET object reference created by `Microsoft.JSInterop.DotNetObjectReference` is disposed in the `Dispose` method.

`CallDotnet2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet2.razor._
In the preceding example, the variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.

Use the following guidance to pass <example-value> to an instance method:

Add parameters to the .NET method invocation. In the following example, a name is passed to the method. Add additional parameters to the list as needed.

```html
<script>
  window.sayHello2 = (dotNetHelper, name) => {
    return dotNetHelper.invokeMethodAsync('GetHelloMessage', name);
  };
</script>
```

In the preceding example, the variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.

Provide the parameter list to the .NET method.

`CallDotnet3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet3.razor._
In the preceding example, the variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.
