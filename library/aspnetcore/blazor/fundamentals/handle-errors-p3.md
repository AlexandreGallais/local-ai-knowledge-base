---
title: "Handle errors in ASP.NET Core Blazor apps (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/handle-errors.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core Blazor apps (part 3 of 3)

## Log errors with a persistent provider

If an unhandled exception occurs, the exception is logged to `Microsoft.Extensions.Logging.ILogger` instances configured in the service container. Blazor apps log console output with the Console Logging Provider. Consider logging to a location on the server (or backend web API for client-side apps) with a provider that manages log size and log rotation. Alternatively, the app can use an Application Performance Management (APM) service, such as Azure Application Insights (Azure Monitor).

> **Note:**
> Native Application Insights features to support client-side apps and native Blazor framework support for Google Analytics might become available in future releases of these technologies. For more information, see Support App Insights in Blazor WASM Client Side (`microsoft/ApplicationInsights-dotnet` #2143) and Web analytics and diagnostics (includes links to community implementations) (`dotnet/aspnetcore` #5461). In the meantime, a client-side app can use the Application Insights JavaScript SDK with JS interop to log errors directly to Application Insights from a client-side app.

During development in a Blazor app operating over a circuit, the app usually sends the full details of exceptions to the browser's console to aid in debugging. In production, detailed errors aren't sent to clients, but an exception's full details are logged on the server.

You must decide which incidents to log and the level of severity of logged incidents. Hostile users might be able to trigger errors deliberately. For example, don't log an incident from an error where an unknown `ProductId` is supplied in the URL of a component that displays product details. Not all errors should be treated as incidents for logging.

For more information, see the following articles:

* ASP.NET Core Blazor logging
* Handle errors in ASP.NET Core&Dagger;
* Create web APIs with ASP.NET Core

&Dagger;Applies to server-side Blazor apps and other server-side ASP.NET Core apps that are web API backend apps for Blazor. Client-side apps can trap and send error information on the client to a web API, which logs the error information to a persistent logging provider.

## Places where errors may occur

Framework and app code may trigger unhandled exceptions in any of the following locations, which are described further in the following sections of this article:

* Component instantiation
* Lifecycle methods
* Rendering logic
* Event handlers
* Component disposal
* JavaScript interop
* Prerendering

### Component instantiation

When Blazor creates an instance of a component:

* The component's constructor is invoked.
* The constructors of DI services supplied to the component's constructor via the `@inject` directive or the `[Inject]` attribute are invoked.

An error in an executed constructor or a setter for any `[Inject]` property results in an unhandled exception and stops the framework from instantiating the component. If the app is operating over a circuit, the circuit fails. If constructor logic may throw exceptions, the app should trap the exceptions using a `try-catch` statement with error handling and logging.

### Lifecycle methods

During the lifetime of a component, Blazor invokes lifecycle methods. If any lifecycle method throws an exception, synchronously or asynchronously, the exception is fatal to a circuit. For components to deal with errors in lifecycle methods, add error handling logic.

In the following example where `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` calls a method to obtain a product:

* An exception thrown in the `ProductRepository.GetProductByIdAsync` method is handled by a `try-catch` statement.
* When the `catch` block is executed:
  * `loadFailed` is set to `true`, which is used to display an error message to the user.
  * The error is logged.

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ProductDetails.razor._
### Rendering logic

The declarative markup in a Razor component file (`.razor`) is compiled into a C# method called `Microsoft.AspNetCore.Components.ComponentBase.BuildRenderTree*`. When a component renders, `Microsoft.AspNetCore.Components.ComponentBase.BuildRenderTree*` executes and builds up a data structure describing the elements, text, and child components of the rendered component.

Rendering logic can throw an exception. An example of this scenario occurs when `@someObject.PropertyName` is evaluated but `@someObject` is `null`. For Blazor apps operating over a circuit, an unhandled exception thrown by rendering logic is fatal to the app's circuit.

To prevent a `System.NullReferenceException` in rendering logic, check for a `null` object before accessing its members. In the following example, `person.Address` properties aren't accessed if `person.Address` is `null`:

```razor
@if (person.Address != null)
{
    <div>@person.Address.Line1</div>
    <div>@person.Address.Line2</div>
    <div>@person.Address.City</div>
    <div>@person.Address.Country</div>
}
```

The preceding code assumes that `person` isn't `null`. Often, the structure of the code guarantees that an object exists at the time the component is rendered. In those cases, it isn't necessary to check for `null` in rendering logic. In the prior example, `person` might be guaranteed to exist because `person` is created when the component is instantiated, as the following example shows:

```razor
@code {
    private Person person = new();

    ...
}
```

### Event handlers

Client-side code triggers invocations of C# code when event handlers are created using:

* `@onclick`
* `@onchange`
* Other `@on...` attributes
* `@bind`

Event handler code might throw an unhandled exception in these scenarios.

If the app calls code that could fail for external reasons, trap exceptions using a `try-catch` statement with error handling and logging.

If an event handler throws an unhandled exception (for example, a database query fails) that isn't trapped and handled by developer code:

* The framework logs the exception.
* In a Blazor app operating over a circuit, the exception is fatal to the app's circuit.

### Component disposal

A component may be removed from the UI, for example, because the user has navigated to another page. When a component that implements `System.IDisposable` is removed from the UI, the framework calls the component's `System.IDisposable.Dispose*` method.

If the component's `Dispose` method throws an unhandled exception in a Blazor app operating over a circuit, the exception is fatal to the app's circuit.

If disposal logic may throw exceptions, the app should trap the exceptions using a `try-catch` statement with error handling and logging.

For more information on component disposal, see ASP.NET Core Razor component disposal.

### JavaScript interop

`Microsoft.JSInterop.IJSRuntime` is registered by the Blazor framework. `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` allows .NET code to make asynchronous calls to the JavaScript (JS) runtime in the user's browser.

The following conditions apply to error handling with `Microsoft.JSInterop.IJSRuntime.InvokeAsync*`:

* If a call to `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` fails synchronously, a .NET exception occurs. A call to `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` may fail, for example, because the supplied arguments can't be serialized. Developer code must catch the exception. If app code in an event handler or component lifecycle method doesn't handle an exception in a Blazor app operating over a circuit, the resulting exception is fatal to the app's circuit.
* If a call to `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` fails asynchronously, the .NET `System.Threading.Tasks.Task` fails. A call to `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` may fail, for example, because the JS-side code throws an exception or returns a `Promise` that completed as `rejected`. Developer code must catch the exception. If using the `await` operator, consider wrapping the method call in a `try-catch` statement with error handling and logging. Otherwise in a Blazor app operating over a circuit, the failing code results in an unhandled exception that's fatal to the app's circuit.
* Calls to `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` must complete within a certain period or else the call times out. The default timeout period is one minute. The timeout protects the code against a loss in network connectivity or JS code that never sends back a completion message. If the call times out, the resulting `System.Threading.Tasks` fails with an `System.OperationCanceledException`. Trap and process the exception with logging.

Similarly, JS code may initiate calls to .NET methods indicated by the `[JSInvokable]` attribute. If these .NET methods throw an unhandled exception:

* In a Blazor app operating over a circuit, the exception isn't treated as fatal to the app's circuit.
* The JS-side `Promise` is rejected.

You have the option of using error handling code on either the .NET side or the JS side of the method call.

For more information, see the following articles:

* Call JavaScript functions from .NET methods in ASP.NET Core Blazor
* Call .NET methods from JavaScript functions in ASP.NET Core Blazor

### Prerendering

Razor components are prerendered by default so that their rendered HTML markup is returned as part of the user's initial HTTP request.

In a Blazor app operating over a circuit, prerendering works by:

* Creating a new circuit for all of the prerendered components that are part of the same page.
* Generating the initial HTML.
* Treating the circuit as `disconnected` until the user's browser establishes a SignalR connection back to the same server. When the connection is established, interactivity on the circuit is resumed and the components' HTML markup is updated.

For prerendered client-side components, prerendering works by:

* Generating initial HTML on the server for all of the prerendered components that are part of the same page.
* Making the component interactive on the client after the browser has loaded the app's compiled code and the .NET runtime (if not already loaded) in the background.

If a component throws an unhandled exception during prerendering, for example, during a lifecycle method or in rendering logic:

* In a Blazor app operating over a circuit, the exception is fatal to the circuit. For prerendered client-side components, the exception prevents rendering the component.
* The exception is thrown up the call stack from the `Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper`.

Under normal circumstances when prerendering fails, continuing to build and render the component doesn't make sense because a working component can't be rendered.

To tolerate errors that may occur during prerendering, error handling logic must be placed inside a component that may throw exceptions. Use `try-catch` statements with error handling and logging. Instead of wrapping the `Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper` in a `try-catch` statement, place error handling logic in the component rendered by the `Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper`.

## Advanced scenarios

### Recursive rendering

Components can be nested recursively. This is useful for representing recursive data structures. For example, a `TreeNode` component can render more `TreeNode` components for each of the node's children.

When rendering recursively, avoid coding patterns that result in infinite recursion:

* Don't recursively render a data structure that contains a cycle. For example, don't render a tree node whose children includes itself.
* Don't create a chain of layouts that contain a cycle. For example, don't create a layout whose layout is itself.
* Don't allow an end user to violate recursion invariants (rules) through malicious data entry or JavaScript interop calls.

Infinite loops during rendering:

* Causes the rendering process to continue forever.
* Is equivalent to creating an unterminated loop.

In these scenarios, Blazor fails and usually attempts to:

* Consume as much CPU time as permitted by the operating system, indefinitely.
* Consume an unlimited amount of memory. Consuming unlimited memory is equivalent to the scenario where an unterminated loop adds entries to a collection on every iteration.

To avoid infinite recursion patterns, ensure that recursive rendering code contains suitable stopping conditions.

### Custom render tree logic

Most Razor components are implemented as Razor component files (`.razor`) and are compiled by the framework to produce logic that operates on a `Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder` to render their output. However, a developer may manually implement `Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder` logic using procedural C# code. For more information, see ASP.NET Core Blazor advanced scenarios (render tree construction).

> **Warning:**
> Use of manual render tree builder logic is considered an advanced and unsafe scenario, not recommended for general component development.

If `Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder` code is written, the developer must guarantee the correctness of the code. For example, the developer must ensure that:

* Calls to `Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder.OpenElement*` and `Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder.CloseElement*` are correctly balanced.
* Attributes are only added in the correct places.

Incorrect manual render tree builder logic can cause arbitrary undefined behavior, including crashes, the app or server to stop responding, and security vulnerabilities.

Consider manual render tree builder logic on the same level of complexity and with the same level of *danger* as writing assembly code or Microsoft Intermediate Language (MSIL) instructions by hand.

## Related content

* Handle caught exceptions outside of a Razor component's lifecycle
* Not Found responses
* ASP.NET Core Blazor logging
* Handle errors in ASP.NET Core&dagger;
* Create web APIs with ASP.NET Core
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)

&dagger;Applies to backend ASP.NET Core web API apps that client-side Blazor apps use for logging.
