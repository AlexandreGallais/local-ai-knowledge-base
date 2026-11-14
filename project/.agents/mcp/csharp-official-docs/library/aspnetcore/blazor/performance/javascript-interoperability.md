---
title: "ASP.NET Core Blazor JavaScript interoperability (JS interop) performance best practices"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/performance/javascript-interoperability.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor JavaScript interoperability (JS interop) performance best practices

Calls between .NET and JavaScript require additional overhead because:

* Calls are asynchronous.
* Parameters and return values are JSON-serialized to provide an easy-to-understand conversion mechanism between .NET and JavaScript types.

Additionally for server-side Blazor apps, these calls are passed across the network.

## Avoid excessively fine-grained calls

Since each call involves some overhead, it can be valuable to reduce the number of calls. Consider the following code, which stores a collection of items in the browser's `localStorage`:

```csharp
private async Task StoreAllInLocalStorage(IEnumerable<TodoItem> items)
{
    foreach (var item in items)
    {
        await JS.InvokeVoidAsync("localStorage.setItem", item.Id, 
            JsonSerializer.Serialize(item));
    }
}
```

The preceding example makes a separate JS interop call for each item. Instead, the following approach reduces the JS interop to a single call:

```csharp
private async Task StoreAllInLocalStorage(IEnumerable<TodoItem> items)
{
    await JS.InvokeVoidAsync("storeAllInLocalStorage", items);
}
```

The corresponding JavaScript function stores the whole collection of items on the client:

```javascript
function storeAllInLocalStorage(items) {
  items.forEach(item => {
    localStorage.setItem(item.id, JSON.stringify(item));
  });
}
```

For Blazor WebAssembly apps, rolling individual JS interop calls into a single call usually only improves performance significantly if the component makes a large number of JS interop calls.

## Consider the use of synchronous calls

### Call JavaScript from .NET

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

### Call .NET from JavaScript

*This section only applies to client-side components.*

JS interop calls are asynchronous, regardless of whether the called code is synchronous or asynchronous. Calls are asynchronous to ensure that components are compatible across server-side and client-side render modes. On the server, all JS interop calls must be asynchronous because they're sent over a network connection.

If you know for certain that your component only runs on WebAssembly, you can choose to make synchronous JS interop calls. This has slightly less overhead than making asynchronous calls and can result in fewer render cycles because there's no intermediate state while awaiting results.

To make a synchronous call from JavaScript to .NET in a client-side component, use `DotNet.invokeMethod` instead of `DotNet.invokeMethodAsync`.

Synchronous calls work if:

* The component is only rendered for execution on WebAssembly.
* The called function returns a value synchronously. The function isn't an `async` method and doesn't return a .NET `System.Threading.Tasks.Task` or JavaScript `Promise`.

## Use JavaScript `[JSImport]`/`[JSExport]` interop

JavaScript `[JSImport]`/`[JSExport]` interop for Blazor WebAssembly apps offers improved performance and stability over the JS interop API in framework releases prior to ASP.NET Core in .NET 7.

For more information, see JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.
