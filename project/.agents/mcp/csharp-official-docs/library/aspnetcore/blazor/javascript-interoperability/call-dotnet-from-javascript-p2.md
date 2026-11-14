---
title: "Call .NET methods from JavaScript functions in ASP.NET Core Blazor (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/javascript-interoperability/call-dotnet-from-javascript.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Call .NET methods from JavaScript functions in ASP.NET Core Blazor (part 2 of 4)

## Pass a `DotNetObjectReference` to a class with multiple JavaScript functions

The example in this section demonstrates how to pass a `Microsoft.JSInterop.DotNetObjectReference` to a JavaScript (JS) class with multiple functions.

Create and pass a `Microsoft.JSInterop.DotNetObjectReference` from the `OnAfterRenderAsync` lifecycle method to a JS class for multiple functions to use. Make sure that the .NET code disposes of the `Microsoft.JSInterop.DotNetObjectReference`, as the following example shows.

In the following component, the `Trigger JS function` buttons call JS functions by setting the JS `onclick` property, not Blazor's `@onclick` directive attribute.

`CallDotNetExampleOneHelper.razor`:

```razor
@page "/call-dotnet-example-one-helper"
@implements IAsyncDisposable
@inject IJSRuntime JS

<PageTitle>Call .NET Example</PageTitle>

<h1>Pass <code>DotNetObjectReference</code> to a JavaScript class</h1>

<p>
    <label>
        Message: <input @bind="name" />
    </label>
</p>

<p>
    <button id="sayHelloBtn">
        Trigger JS function <code>sayHello</code>
    </button>
</p>

<p>
    <button id="welcomeVisitorBtn">
        Trigger JS function <code>welcomeVisitor</code>
    </button>
</p>

@code {
    private IJSObjectReference? module;
    private string? name;
    private DotNetObjectReference<CallDotNetExampleOneHelper>? dotNetHelper;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import",
                "./Components/Pages/CallDotNetExampleOneHelper.razor.js");

            dotNetHelper = DotNetObjectReference.Create(this);
            await module.InvokeVoidAsync("GreetingHelpers.setDotNetHelper", 
                dotNetHelper);

            await module.InvokeVoidAsync("addHandlers");
        }
    }

    [JSInvokable]
    public string GetHelloMessage() => $"Hello, {name}!";

    [JSInvokable]
    public string GetWelcomeMessage() => $"Welcome, {name}!";

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null)
        {
            try
            {
                await module.DisposeAsync();
            }
            catch (JSDisconnectedException)
            {
            }
        }

        dotNetHelper?.Dispose();
    }
}
```

In the preceding example:

* `JS` is an injected `Microsoft.JSInterop.IJSRuntime` instance. `Microsoft.JSInterop.IJSRuntime` is registered by the Blazor framework.
* The variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.
* The component must explicitly dispose of the `Microsoft.JSInterop.DotNetObjectReference` to permit garbage collection and prevent a memory leak.
* `Microsoft.JSInterop.JSDisconnectedException` is trapped during module disposal in case Blazor's SignalR circuit is lost. If the preceding code is used in a Blazor WebAssembly app, there's no SignalR connection to lose, so you can remove the `try`-`catch` block and leave the line that disposes the module (`await module.DisposeAsync();`). For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

`CallDotNetExampleOneHelper.razor.js`:

```javascript
export class GreetingHelpers {
  static dotNetHelper;

  static setDotNetHelper(value) {
    GreetingHelpers.dotNetHelper = value;
  }

  static async sayHello() {
    const msg =
      await GreetingHelpers.dotNetHelper.invokeMethodAsync('GetHelloMessage');
    alert(`Message from .NET: "${msg}"`);
  }

  static async welcomeVisitor() {
    const msg =
      await GreetingHelpers.dotNetHelper.invokeMethodAsync('GetWelcomeMessage');
    alert(`Message from .NET: "${msg}"`);
  }
}

export function addHandlers() {
  const sayHelloBtn = document.getElementById("sayHelloBtn");
  sayHelloBtn.addEventListener("click", GreetingHelpers.sayHello);

  const welcomeVisitorBtn = document.getElementById("welcomeVisitorBtn");
  welcomeVisitorBtn.addEventListener("click", GreetingHelpers.welcomeVisitor);
}
```

In the preceding example, the variable name `dotNetHelper` is arbitrary and can be changed to any preferred name.

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

## Call .NET generic class methods

JavaScript (JS) functions can call .NET generic class methods, where a JS function calls a .NET method of a generic class.

In the following generic type class (`GenericType<TValue>`):

* The class has a single type parameter (`TValue`) with a single generic `Value` property.
* The class has two non-generic methods marked with the `[JSInvokable]` attribute, each with a generic type parameter named `newValue`:
  * `Update` synchronously updates the value of `Value` from `newValue`.
  * `UpdateAsync` asynchronously updates the value of `Value` from `newValue` after creating an awaitable task with `System.Threading.Tasks.Task.Yield*` that asynchronously yields back to the current context when awaited.
* Each of the class methods write the type of `TValue` and the value of `Value` to the console. Writing to the console is only for demonstration purposes. Production apps usually avoid writing to the console in favor of app *logging*. For more information, see ASP.NET Core Blazor logging and Logging in .NET and ASP.NET Core.

> **Note:**
> *Open generic types and methods* don't specify types for type placeholders. Conversely, *closed generics* supply types for all type placeholders. The examples in this section demonstrate closed generics, but invoking JS interop *instance methods* with open generics ***is supported***. Use of open generics isn't supported for static .NET method invocations, which were described earlier in this article.

For more information, see the following articles:

* Generic classes and methods (C# documentation)
* Generic Classes (C# Programming Guide)
* Generics in .NET (.NET documentation)

`GenericType.cs`:

```csharp
using Microsoft.JSInterop;

public class GenericType<TValue>
{
    public TValue? Value { get; set; }

    [JSInvokable]
    public void Update(TValue newValue)
    {
        Value = newValue;

        Console.WriteLine($"Update: GenericType<{typeof(TValue)}>: {Value}");
    }

    [JSInvokable]
    public async Task UpdateAsync(TValue newValue)
    {
        await Task.Yield();
        Value = newValue;

        Console.WriteLine($"UpdateAsync: GenericType<{typeof(TValue)}>: {Value}");
    }
}
```

In the following `invokeMethodsAsync` function:

* The generic type class's `Update` and `UpdateAsync` methods are called with arguments representing strings and numbers.
* Client-side components support calling .NET methods synchronously with `invokeMethod`. `syncInterop` receives a boolean value indicating if the JS interop is occurring on the client. When `syncInterop` is `true`, `invokeMethod` is safely called. If the value of `syncInterop` is `false`, only the asynchronous function `invokeMethodAsync` is called because the JS interop is executing in a server-side component.
* For demonstration purposes, the `Microsoft.JSInterop.DotNetObjectReference` function call (`invokeMethod` or `invokeMethodAsync`), the .NET method called (`Update` or `UpdateAsync`), and the argument are written to the console. The arguments use a random number to permit matching the JS function call to the .NET method invocation (also written to the console on the .NET side). Production code usually doesn't write to the console, either on the client or the server. Production apps usually rely upon app *logging*. For more information, see ASP.NET Core Blazor logging and Logging in .NET and ASP.NET Core.

```html
<script>
  const randomInt = () => Math.floor(Math.random() * 99999);

  window.invokeMethodsAsync = async (syncInterop, dotNetHelper1, dotNetHelper2) => {
    var n = randomInt();
    console.log(`JS: invokeMethodAsync:Update('string ${n}')`);
    await dotNetHelper1.invokeMethodAsync('Update', `string ${n}`);

    n = randomInt();
    console.log(`JS: invokeMethodAsync:UpdateAsync('string ${n}')`);
    await dotNetHelper1.invokeMethodAsync('UpdateAsync', `string ${n}`);

    if (syncInterop) {
      n = randomInt();
      console.log(`JS: invokeMethod:Update('string ${n}')`);
      dotNetHelper1.invokeMethod('Update', `string ${n}`);
    }

    n = randomInt();
    console.log(`JS: invokeMethodAsync:Update(${n})`);
    await dotNetHelper2.invokeMethodAsync('Update', n);

    n = randomInt();
    console.log(`JS: invokeMethodAsync:UpdateAsync(${n})`);
    await dotNetHelper2.invokeMethodAsync('UpdateAsync', n);

    if (syncInterop) {
      n = randomInt();
      console.log(`JS: invokeMethod:Update(${n})`);
      dotNetHelper2.invokeMethod('Update', n);
    }
  };
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

In the following `GenericsExample` component:

* The JS function `invokeMethodsAsync` is called when the **`Invoke Interop`** button is selected.
* A pair of `Microsoft.JSInterop.DotNetObjectReference` types are created and passed to the JS function for instances of the `GenericType` as a `string` and an `int`.

`GenericsExample.razor`:

```razor
@page "/generics-example"
@implements IDisposable
@inject IJSRuntime JS

<p>
    <button @onclick="InvokeInterop">Invoke Interop</button>
</p>

<ul>
    <li>genericType1: @genericType1?.Value</li>
    <li>genericType2: @genericType2?.Value</li>
</ul>

@code {
    private GenericType<string> genericType1 = new() { Value = "string 0" };
    private GenericType<int> genericType2 = new() { Value = 0 };
    private DotNetObjectReference<GenericType<string>>? objRef1;
    private DotNetObjectReference<GenericType<int>>? objRef2;

    protected override void OnInitialized()
    {
        objRef1 = DotNetObjectReference.Create(genericType1);
        objRef2 = DotNetObjectReference.Create(genericType2);
    }

    public async Task InvokeInterop()
    {
        var syncInterop = OperatingSystem.IsBrowser();

        await JS.InvokeVoidAsync(
            "invokeMethodsAsync", syncInterop, objRef1, objRef2);
    }

    public void Dispose()
    {
        objRef1?.Dispose();
        objRef2?.Dispose();
    }
}
```

In the preceding example, `JS` is an injected `Microsoft.JSInterop.IJSRuntime` instance. `Microsoft.JSInterop.IJSRuntime` is registered by the Blazor framework.

The following demonstrates typical output of the preceding example when the **`Invoke Interop`** button is selected in a client-side component:

> JS: invokeMethodAsync:Update('string 37802')
> .NET: Update: GenericType<System.String>: string 37802
> JS: invokeMethodAsync:UpdateAsync('string 53051')
> JS: invokeMethod:Update('string 26784')
> .NET: Update: GenericType<System.String>: string 26784
> JS: invokeMethodAsync:Update(14107)
> .NET: Update: GenericType<System.Int32>: 14107
> JS: invokeMethodAsync:UpdateAsync(48995)
> JS: invokeMethod:Update(12872)
> .NET: Update: GenericType<System.Int32>: 12872
> .NET: UpdateAsync: GenericType<System.String>: string 53051
> .NET: UpdateAsync: GenericType<System.Int32>: 48995

If the preceding example is implemented in a server-side component, the synchronous calls with `invokeMethod` are avoided. For server-side components, we recommend the asynchronous function (`invokeMethodAsync`) over the synchronous version (`invokeMethod`).

Typical output of a server-side component:

> JS: invokeMethodAsync:Update('string 34809')
> .NET: Update: GenericType<System.String>: string 34809
> JS: invokeMethodAsync:UpdateAsync('string 93059')
> JS: invokeMethodAsync:Update(41997)
> .NET: Update: GenericType<System.Int32>: 41997
> JS: invokeMethodAsync:UpdateAsync(24652)
> .NET: UpdateAsync: GenericType<System.String>: string 93059
> .NET: UpdateAsync: GenericType<System.Int32>: 24652

The preceding output examples demonstrate that asynchronous methods execute and complete in an *arbitrary order* depending on several factors, including thread scheduling and the speed of method execution. It isn't possible to reliably predict the order of completion for asynchronous method calls.
