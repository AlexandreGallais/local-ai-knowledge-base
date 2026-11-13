---
title: "synchronous-js-interop-call-js"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/includes/js-interop/synchronous-js-interop-call-js.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# synchronous-js-interop-call-js

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
