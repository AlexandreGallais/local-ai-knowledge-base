---
title: "Call JavaScript functions from .NET methods in ASP.NET Core Blazor (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/javascript-interoperability/call-javascript-from-dotnet.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Call JavaScript functions from .NET methods in ASP.NET Core Blazor

This article explains how to invoke JavaScript (JS) functions from .NET.

For information on how to call .NET methods from JS, see Call .NET methods from JavaScript functions in ASP.NET Core Blazor.

## Invoke JS functions

`Microsoft.JSInterop.IJSRuntime` is registered by the Blazor framework. To call into JS from .NET, inject the `Microsoft.JSInterop.IJSRuntime` abstraction and call one of the following methods:

* `Microsoft.JSInterop.IJSRuntime.InvokeAsync*`
* `Microsoft.JSInterop.JSRuntimeExtensions.InvokeAsync*`
* `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*`

For the preceding .NET methods that invoke JS functions:

* The function identifier (`String`) is relative to the global scope (`window`). To call `window.someScope.someFunction`, the identifier is `someScope.someFunction`. There's no need to register the function before it's called.
* Pass any number of JSON-serializable arguments in `Object[]` to a JS function.
* The cancellation token (`CancellationToken`) propagates a notification that operations should be canceled.
* `TimeSpan` represents a time limit for a JS operation.
* The `TValue` return type must also be JSON serializable. `TValue` should match the .NET type that best maps to the JSON type returned.
* A JS `Promise` is returned for `InvokeAsync` methods. `InvokeAsync` unwraps the `Promise` and returns the value awaited by the `Promise`.
* C# union types are supported.

For Blazor apps with prerendering enabled, which is the default for server-side apps, calling into JS isn't possible during prerendering. For more information, see the Prerendering section.

The following example is based on `TextDecoder`, a JS-based decoder. The example demonstrates how to invoke a JS function from a C# method that offloads a requirement from developer code to an existing JS API. The JS function accepts a byte array from a C# method, decodes the array, and returns the text to the component for display.

```html
<script>
  window.convertArray = (win1251Array) => {
    var win1251decoder = new TextDecoder('windows-1251');
    var bytes = new Uint8Array(win1251Array);
    var decodedArray = win1251decoder.decode(bytes);
    return decodedArray;
  };
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

The following component:

* Invokes the `convertArray` JS function with `Microsoft.JSInterop.JSRuntimeExtensions.InvokeAsync*` when selecting a button (**`Convert Array`**).
* After the JS function is called, the passed array is converted into a string. The string is returned to the component for display (`text`).

`CallJs1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs1.razor._
## JavaScript API restricted to user gestures

*This section applies to server-side components.*

Some browser JavaScript (JS) APIs can only be executed in the context of a user gesture, such as using the `Fullscreen API`. These APIs can't be called through the JS interop mechanism in server-side components because UI event handling is performed asynchronously and generally no longer in the context of the user gesture. The app must handle the UI event completely in JavaScript, so use `onclick` instead of Blazor's `@onclick` directive attribute.

## Invoke JavaScript functions without reading a returned value (`InvokeVoidAsync`)

Use `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*` when:

* .NET isn't required to read the result of a JavaScript (JS) call.
* JS functions return void(0)/void 0 or undefined.

Provide a `displayTickerAlert1` JS function. The function is called with `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*` and doesn't return a value:

```html
<script>
  window.displayTickerAlert1 = (symbol, price) => {
    alert(`${symbol}: $${price}!`);
  };
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

### Component (`.razor`) example (`InvokeVoidAsync`)

The following component:

* Invokes the `displayTickerAlert1` JS function with `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*` with two JSON-serializable parameters, a string in `stockSymbol` and a decimal in `price`, when selecting a button (**`Set Stock`**).
* The JS function receives the two arguments in strictly-typed parameters and displays a modal alert box with a specified message.

`CallJs2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs2.razor._
### Class (`.cs`) example (`InvokeVoidAsync`)

`JsInteropClasses1.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/JsInteropClasses1.cs._
`TickerChanged` calls the `displayTickerAlert1` method in the following component.

`CallJs3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs3.razor._
## Invoke JavaScript functions and read a returned value (`InvokeAsync`)

Use `Microsoft.JSInterop.JSRuntimeExtensions.InvokeAsync*` when .NET should read the result of a JavaScript (JS) call.

Provide a `displayTickerAlert2` JS function. The following example returns a string for display by the caller:

```html
<script>
  window.displayTickerAlert2 = (symbol, price) => {
    if (price < 20) {
      alert(`${symbol}: $${price}!`);
      return "User alerted in the browser.";
    } else {
      return "User NOT alerted.";
    }
  };
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

### Component (`.razor`) example (`InvokeAsync`)

The following component:

* Invokes the `displayTickerAlert2` JS function with `Microsoft.JSInterop.JSRuntimeExtensions.InvokeAsync*` with two JSON-serializable parameters, a string in `stockSymbol` and a decimal in `price`, when selecting a button (**`Set Stock`**).
* The JS function receives the two arguments in strictly-typed parameters and displays a modal alert box with a specified message.

`CallJs4.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs4.razor._
### Class (`.cs`) example (`InvokeAsync`)

`JsInteropClasses2.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/JsInteropClasses2.cs._
`TickerChanged` calls the `displayTickerAlert2` method and displays the returned string in the following component.

`CallJs5.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs5.razor._
## Dynamic content generation scenarios

For dynamic content generation with BuildRenderTree, use the `[Inject]` attribute:

```razor
[Inject]
IJSRuntime JS { get; set; }
```

## Prerendering

*This section applies to server-side apps that prerender Razor components. Prerendering is covered in Prerender ASP.NET Core Razor components.*

During prerendering, calling into JavaScript (JS) isn't possible. The following example demonstrates how to use JS interop as part of a component's initialization logic in a way that's compatible with prerendering.

The following `scrollElementIntoView` function:

* Scrolls to the passed element with `scrollIntoView`.
* Returns the element's `top` property value from the `getBoundingClientRect` method.

```javascript
window.scrollElementIntoView = (element) => {
  element.scrollIntoView();
  return element.getBoundingClientRect().top;
}
```

Where `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` calls the JS function in component code, the `Microsoft.AspNetCore.Components.ElementReference` is only used in `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` and not in any earlier lifecycle method because there's no HTML DOM element until after the component is rendered.

`StateHasChanged` (reference source) is called to enqueue rerendering of the component with the new state obtained from the JS interop call (for more information, see ASP.NET Core Razor component rendering). An infinite loop isn't created because `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is only called when `scrollPosition` is `null`.

`PrerenderedInterop.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/PrerenderedInterop.razor._
The preceding example pollutes the client with a global function. For a better approach in production apps, see JavaScript isolation in JavaScript modules.

## Synchronous JS interop in client-side components

*This section only applies to client-side components.*

JS interop calls are asynchronous, regardless of whether the called code is synchronous or asynchronous. Calls are asynchronous to ensure that components are compatible across server-side and client-side render modes. On the server, all JS interop calls must be asynchronous because they're sent over a network connection.

If you know for certain that your component only runs on WebAssembly, you can choose to make synchronous JS interop calls. This has slightly less overhead than making asynchronous calls and can result in fewer render cycles because there's no intermediate state while awaiting results.

To make a synchronous call from .NET to JavaScript in a client-side component, cast `Microsoft.JSInterop.IJSRuntime` to `Microsoft.JSInterop.IJSInProcessRuntime` to make the JS interop call:

```razor
@inject IJSRuntime JS

...

@code {
    protected override void HandleSomeEvent()
    {
        var jsInProcess = (IJSInProcessRuntime)JS;
        var value = jsInProcess.Invoke<string>("javascriptFunctionIdentifier");
    }
}
```

When working with `Microsoft.JSInterop.IJSObjectReference` in .NET 5 or later client-side components, you can use `Microsoft.JSInterop.IJSInProcessObjectReference` synchronously instead. `Microsoft.JSInterop.IJSInProcessObjectReference` implements `System.IAsyncDisposable`/`System.IDisposable` and should be disposed for garbage collection to prevent a memory leak, as the following example demonstrates:

```razor
@inject IJSRuntime JS
@implements IDisposable

...

@code {
    ...
    private IJSInProcessObjectReference? module;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var jsInProcess = (IJSInProcessRuntime)JS;
            module = await jsInProcess.Invoke<IJSInProcessObjectReference>("import", 
                "./scripts.js");
            var value = module.Invoke<string>("javascriptFunctionIdentifier");
        }
    }

    ...

    void IDisposable.Dispose()
    {
        if (module is not null)
        {
            await module.Dispose();
        }
    }
}
```

In the preceding example, a `Microsoft.JSInterop.JSDisconnectedException` isn't trapped during module disposal because there's no Blazor-SignalR circuit in a Blazor WebAssembly app to lose. For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

## Create an instance of a JS object using a constructor function

Create an instance of a JS object using a constructor function and get the `Microsoft.JSInterop.IJSObjectReference`/`Microsoft.JSInterop.IJSInProcessObjectReference` .NET handle for referencing the instance with the following API:

* `Microsoft.JSInterop.JSRuntime.InvokeConstructorAsync*` (asynchronous)
* `Microsoft.JSInterop.IJSInProcessObjectReference.InvokeConstructor*` (synchronous)

Examples in this section demonstrate the API calls with the following `TestClass` with a constructor function (`constructor(text)`):

```javascript
window.TestClass = class {
  constructor(text) {
    this.text = text;
  }

  getTextLength() {
    return this.text.length;
  }
}
```

### Asynchronous `InvokeConstructorAsync`

Use `Microsoft.JSInterop.JSRuntime.InvokeConstructorAsync*` on `Microsoft.JSInterop.IJSRuntime` and `Microsoft.JSInterop.IJSObjectReference` to invoke the specified JS constructor function asynchronously. The function is invoked with the `new` operator. In the following example, `TestClass` contains a constructor function, and `classRef` is an `Microsoft.JSInterop.IJSObjectReference`.

```csharp
var classRef = await JSRuntime.InvokeConstructorAsync("TestClass", "Blazor!");
var text = await classRef.GetValueAsync<string>("text");
var textLength = await classRef.InvokeAsync<int>("getTextLength");
```

An overload is available that takes a `System.Threading.CancellationToken` argument or `System.TimeSpan` timeout argument.

### Synchronous `InvokeConstructor`

Use `Microsoft.JSInterop.IJSInProcessObjectReference.InvokeConstructor*` on `Microsoft.JSInterop.IJSInProcessRuntime` and `Microsoft.JSInterop.IJSInProcessObjectReference` to invoke the specified JS constructor function synchronously. The function is invoked with the `new` operator. In the following example, `TestClass` contains a constructor function, and `classRef` is an `Microsoft.JSInterop.IJSInProcessObjectReference`:

```csharp
var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
var classRef = inProcRuntime.InvokeConstructor("TestClass", "Blazor!");
var text = classRef.GetValue<string>("text");
var textLength = classRef.Invoke<int>("getTextLength");
```

An overload is available that takes a `System.Threading.CancellationToken` argument or `System.TimeSpan` timeout argument.
