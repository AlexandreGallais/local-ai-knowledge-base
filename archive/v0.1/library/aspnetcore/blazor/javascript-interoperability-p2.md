---
title: "ASP.NET Core Blazor JavaScript interoperability (JS interop) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/javascript-interoperability/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor JavaScript interoperability (JS interop) (part 2 of 2)

## JavaScript interop calls without a circuit

*This section only applies to server-side apps.*

JavaScript (JS) interop calls can't be issued after Blazor's SignalR circuit is disconnected. Without a circuit during component disposal or at any other time that a circuit doesn't exist, the following method calls fail and log a message that the circuit is disconnected as a `Microsoft.JSInterop.JSDisconnectedException`:

* JS interop method calls
  * `Microsoft.JSInterop.IJSRuntime.InvokeAsync*`
  * `Microsoft.JSInterop.JSRuntimeExtensions.InvokeAsync*`
  * `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*`
  * `Microsoft.JSInterop.IJSObjectReference.InvokeConstructorAsync*`
  * `Microsoft.JSInterop.IJSInProcessObjectReference.InvokeConstructor*`
  * `Microsoft.JSInterop.IJSObjectReference.GetValueAsync*`
  * `Microsoft.JSInterop.IJSObjectReference.SetValueAsync*`
* `Dispose`/`DisposeAsync` calls on any `Microsoft.JSInterop.IJSObjectReference`.

In order to avoid logging `Microsoft.JSInterop.JSDisconnectedException` or to log custom information, catch the exception in a `try-catch` statement.

For the following component disposal example:

* The server-side component implements `System.IAsyncDisposable`.
* `module` is an `Microsoft.JSInterop.IJSObjectReference` for a JS module.
* `Microsoft.JSInterop.JSDisconnectedException` is caught and not logged.
* Optionally, you can log custom information in the `catch` statement at whatever log level you prefer. The following example doesn't log custom information because it assumes the developer doesn't care about when or where circuits are disconnected during component disposal.

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

If you must clean up your own JS objects or execute other JS code on the client after a circuit is lost in a server-side Blazor app, use the `MutationObserver` pattern in JS on the client. The `MutationObserver` pattern allows you to run a function when an element is removed from the DOM.

For more information, see the following articles:

* Handle errors in ASP.NET Core Blazor apps: The *JavaScript interop* section discusses error handling in JS interop scenarios.
* ASP.NET Core Razor component disposal: The article describes how to implement disposal patterns in Razor components.

## Cached JavaScript files

JavaScript (JS) files and other static assets aren't generally cached on clients during development in the `Development` environment. During development, static asset requests include the `Cache-Control` header with a value of `no-cache` or `max-age` with a value of zero (`0`).

During production in the `Production` environment, JS files are usually cached by clients.

To disable client-side caching in browsers, developers usually adopt one of the following approaches:

* Disable caching when the browser's developer tools console is open. Guidance can be found in the developer tools documentation of each browser maintainer:
  * Chrome DevTools
  * Microsoft Edge Developer Tools overview
* Perform a manual browser refresh of any webpage of the Blazor app to reload JS files from the server. ASP.NET Core's HTTP response caching middleware always honors a valid no-cache `Cache-Control` header sent by a client.

For more information, see:

* Response caching in ASP.NET Core
* ASP.NET Core Blazor environments

## Size limits on JavaScript interop calls

*This section only applies to interactive components in server-side apps. For client-side components, the framework doesn't impose a limit on the size of JavaScript (JS) interop inputs and outputs.*

For interactive components in server-side apps, JS interop calls passing data from the client to the server are limited in size by the maximum incoming SignalR message size permitted for hub methods, which is enforced by `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize` (default: 32 KB). JS to .NET SignalR messages larger than `Microsoft.AspNetCore.SignalR.HubOptions.MaximumReceiveMessageSize` throw an error. The framework doesn't impose a limit on the size of a SignalR message from the hub to a client. For more information on the size limit, error messages, and guidance on dealing with message size limits, see ASP.NET Core Blazor SignalR guidance.

## Determine where the app is running

If it's relevant for the app to know where code is running for JS interop calls, use `System.OperatingSystem.IsBrowser*` to determine if the component is executing in the context of browser on WebAssembly.
