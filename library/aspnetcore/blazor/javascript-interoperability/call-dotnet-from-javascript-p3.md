---
title: "Call .NET methods from JavaScript functions in ASP.NET Core Blazor (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/javascript-interoperability/call-dotnet-from-javascript.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call .NET methods from JavaScript functions in ASP.NET Core Blazor (part 3 of 4)

## Class instance examples

The following `sayHello1` JS function:

* Calls the `GetHelloMessage` .NET method on the passed `Microsoft.JSInterop.DotNetObjectReference`.
* Returns the message from `GetHelloMessage` to the `sayHello1` caller.

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

The following `HelloHelper` class has a JS-invokable .NET method named `GetHelloMessage`. When `HelloHelper` is created, the name in the `Name` property is used to return a message from `GetHelloMessage`.

`HelloHelper.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/HelloHelper.cs._
The `CallHelloHelperGetHelloMessage` method in the following `JsInteropClasses3` class invokes the JS function `sayHello1` with a new instance of `HelloHelper`.

`JsInteropClasses3.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/JsInteropClasses3.cs._
To avoid a memory leak and allow garbage collection, the .NET object reference created by `Microsoft.JSInterop.DotNetObjectReference` is disposed when the object reference goes out of scope with `using var` syntax.

When the **`Trigger .NET instance method`** button is selected in the following component, `JsInteropClasses3.CallHelloHelperGetHelloMessage` is called with the value of `name`.

`CallDotnet4.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet4.razor._
The following image shows the rendered component with the name `Amy Pond` in the `Name` field. After the button is selected, `Hello, Amy Pond!` is displayed in the UI:

The preceding pattern shown in the `JsInteropClasses3` class can also be implemented entirely in a component.

`CallDotnet5.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet5.razor._
To avoid a memory leak and allow garbage collection, the .NET object reference created by `Microsoft.JSInterop.DotNetObjectReference` is disposed when the object reference goes out of scope with `using var` syntax.

The output displayed by the component is `Hello, Amy Pond!` when the name `Amy Pond` is provided in the `name` field.

In the preceding component, the .NET object reference is disposed. If a class or component doesn't dispose the `Microsoft.JSInterop.DotNetObjectReference`, dispose it from the client by calling `dispose` on the passed `Microsoft.JSInterop.DotNetObjectReference`:

```javascript
window.{JS FUNCTION NAME} = (dotNetHelper) => {
  dotNetHelper.invokeMethodAsync('{.NET METHOD ID}');
  dotNetHelper.dispose();
}
```

In the preceding example:

* The `{JS FUNCTION NAME}` placeholder is the JS function's name.
* The variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.
* The `{.NET METHOD ID}` placeholder is the .NET method identifier.

## Component instance .NET method helper class

A helper class can invoke a .NET instance method as an `System.Action`. Helper classes are useful in scenarios where using static .NET methods aren't applicable:

* When several components of the same type are rendered on the same page.
* In server-side apps with multiple users concurrently using the same component.

In the following example:

* The component contains several `ListItem1` components.
* Each `ListItem1` component is composed of a message and a button.
* When a `ListItem1` component button is selected, that `ListItem1`'s `UpdateMessage` method changes the list item text and hides the button.

The following `MessageUpdateInvokeHelper` class maintains a JS-invokable .NET method, `UpdateMessageCaller`, to invoke the `System.Action` specified when the class is instantiated.

`MessageUpdateInvokeHelper.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/MessageUpdateInvokeHelper.cs._
The following `updateMessageCaller` JS function invokes the `UpdateMessageCaller` .NET method.

```html
<script>
  window.updateMessageCaller = (dotNetHelper) => {
    dotNetHelper.invokeMethodAsync('UpdateMessageCaller');
    dotNetHelper.dispose();
  }
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

In the preceding example, the variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.

The following `ListItem1` component is a shared component that can be used any number of times in a parent component and creates list items (`...`) for an HTML list (`...` or `...`). Each `ListItem1` component instance establishes an instance of `MessageUpdateInvokeHelper` with an `System.Action` set to its `UpdateMessage` method.

When a `ListItem1` component's **`InteropCall`** button is selected, `updateMessageCaller` is invoked with a created `Microsoft.JSInterop.DotNetObjectReference` for the `MessageUpdateInvokeHelper` instance. This permits the framework to call `UpdateMessageCaller` on that `ListItem1`'s `MessageUpdateInvokeHelper` instance. The passed `Microsoft.JSInterop.DotNetObjectReference` is disposed in JS (`dotNetHelper.dispose()`).

`ListItem1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListItem1.razor._
`StateHasChanged` is called to update the UI when `message` is set in `UpdateMessage`. If `StateHasChanged` isn't called, Blazor has no way of knowing that the UI should be updated when the `System.Action` is invoked.

The following parent component includes four list items, each an instance of the `ListItem1` component.

`CallDotnet6.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet6.razor._
The following image shows the rendered parent component after the second **`InteropCall`** button is selected:

* The second `ListItem1` component has displayed the `UpdateMessage Called!` message.
* The **`InteropCall`** button for the second `ListItem1` component isn't visible because the button's CSS `display` property is set to `none`.

## Component instance .NET method called from `DotNetObjectReference` assigned to an element property

The assignment of a `Microsoft.JSInterop.DotNetObjectReference` to a property of an HTML element permits calling .NET methods on a component instance:

* An element reference is captured (`Microsoft.AspNetCore.Components.ElementReference`).
* In the component's `OnAfterRender{Async}` method, a JavaScript (JS) function is invoked with the element reference and the component instance as a `Microsoft.JSInterop.DotNetObjectReference`. The JS function attaches the `Microsoft.JSInterop.DotNetObjectReference` to the element in a property.
* When an element event is invoked in JS (for example, `onclick`), the element's attached `Microsoft.JSInterop.DotNetObjectReference` is used to call a .NET method.

Similar to the approach described in the Component instance .NET method helper class section, this approach is useful in scenarios where using static .NET methods aren't applicable:

* When several components of the same type are rendered on the same page.
* In server-side apps with multiple users concurrently using the same component.
* The .NET method is invoked from a JS event (for example, `onclick`), not from a Blazor event (for example, `@onclick`).

In the following example:

* The component contains several `ListItem2` components, which is a shared component.
* Each `ListItem2` component is composed of a list item message `` and a second `` with a `display` CSS property set to `inline-block` for display.
* When a `ListItem2` component list item is selected, that `ListItem2`'s `UpdateMessage` method changes the list item text in the first `` and hides the second `` by setting its `display` property to `none`.

The following `assignDotNetHelper` JS function assigns the `Microsoft.JSInterop.DotNetObjectReference` to an element in a property named `dotNetHelper`. The following `interopCall` JS function uses the `Microsoft.JSInterop.DotNetObjectReference` for the passed element to invoke a .NET method named `UpdateMessage`.

`ListItem2.razor.js`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListItem2.razor.js._
> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

In the preceding example, the variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.

The following `ListItem2` component is a shared component that can be used any number of times in a parent component and creates list items (`...`) for an HTML list (`...` or `...`).

Each `ListItem2` component instance invokes the `assignDotNetHelper` JS function in `OnAfterRenderAsync` with an element reference (the first `` element of the list item) and the component instance as a `Microsoft.JSInterop.DotNetObjectReference`.

When a `ListItem2` component's message `` is selected, `interopCall` is invoked passing the `` element as a parameter (`this`), which invokes the `UpdateMessage` .NET method. In `UpdateMessage`, `StateHasChanged` is called to update the UI when `message` is set and the `display` property of the second `` is updated. If `StateHasChanged` isn't called, Blazor has no way of knowing that the UI should be updated when the method is invoked.

The `Microsoft.JSInterop.DotNetObjectReference` is disposed when the component is disposed.

`ListItem2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ListItem2.razor._
The following parent component includes four list items, each an instance of the `ListItem2` component.

`CallDotnet7.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet7.razor._
## Synchronous JS interop in client-side components

*This section only applies to client-side components.*

JS interop calls are asynchronous, regardless of whether the called code is synchronous or asynchronous. Calls are asynchronous to ensure that components are compatible across server-side and client-side render modes. On the server, all JS interop calls must be asynchronous because they're sent over a network connection.

If you know for certain that your component only runs on WebAssembly, you can choose to make synchronous JS interop calls. This has slightly less overhead than making asynchronous calls and can result in fewer render cycles because there's no intermediate state while awaiting results.

To make a synchronous call from JavaScript to .NET in a client-side component, use `DotNet.invokeMethod` instead of `DotNet.invokeMethodAsync`.

Synchronous calls work if:

* The component is only rendered for execution on WebAssembly.
* The called function returns a value synchronously. The function isn't an `async` method and doesn't return a .NET `System.Threading.Tasks.Task` or JavaScript `Promise`.

## JavaScript location

Load JavaScript (JS) code using any of approaches described by the article on JavaScript location:

* Load a script in `<head>` markup (*Not generally recommended*)
* Load a script in `<body>` markup
* Load a script from an external JavaScript file (`.js`) collocated with a component
* Load a script from an external JavaScript file (`.js`)
* Inject a script before or after Blazor starts

Using JS modules to load JS is described in this article in the JavaScript isolation in JavaScript modules section.

> **Warning:**
> Only place a `<script>` tag in a component file (`.razor`) if the component is guaranteed to adopt static server-side rendering (static SSR) because the `<script>` tag can't be updated dynamically.

## JavaScript isolation in JavaScript modules

Blazor enables JavaScript (JS) isolation in standard JavaScript modules (ECMAScript specification). JavaScript module loading works the same way in Blazor as it does for other types of web apps, and you're free to customize how modules are defined in your app. For a guide on how to use JavaScript modules, see MDN Web Docs: JavaScript modules.

JS isolation provides the following benefits:

* Imported JS no longer pollutes the global namespace.
* Consumers of a library and components aren't required to import the related JS.

For more information, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

Dynamic import with the `import()` operator is supported with ASP.NET Core and Blazor:

```javascript
if ({CONDITION}) import("/additionalModule.js");
```

In the preceding example, the `{CONDITION}` placeholder represents a conditional check to determine if the module should be loaded.

For browser compatibility, see Can I use: JavaScript modules: dynamic import.

## Avoid circular object references

Objects that contain circular references can't be serialized on the client for either:

* .NET method calls.
* JavaScript method calls from C# when the return type has circular references.

## Byte array support

Blazor supports optimized byte array JavaScript (JS) interop that avoids encoding/decoding byte arrays into Base64. The following example uses JS interop to pass a byte array to .NET.

Provide a `sendByteArray` JS function. The function is called statically, which includes the assembly name parameter in the `invokeMethodAsync` call, by a button in the component and doesn't return a value:

`CallDotnet8.razor.js`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet8.razor.js._
> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

`CallDotnet8.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallDotnet8.razor._
For information on using a byte array when calling JavaScript from .NET, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.
