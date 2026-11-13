---
title: "Call JavaScript functions from .NET methods in ASP.NET Core Blazor (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/javascript-interoperability/call-javascript-from-dotnet.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call JavaScript functions from .NET methods in ASP.NET Core Blazor (part 4 of 4)

## Byte array support

Blazor supports optimized byte array JavaScript (JS) interop that avoids encoding/decoding byte arrays into Base64. The following example uses JS interop to pass a byte array to JavaScript.

Provide a `receiveByteArray` JS function. The function is called with `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*` and doesn't return a value:

```html
<script>
  window.receiveByteArray = (bytes) => {
    let utf8decoder = new TextDecoder();
    let str = utf8decoder.decode(bytes);
    return str;
  };
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

`CallJs9.razor`:

```razor
@page "/call-js-9"
@inject IJSRuntime JS

<h1>Call JS Example 9</h1>

<p>
    <button @onclick="SendByteArray">Send Bytes</button>
</p>

<p>
    @result
</p>

<p>
    Quote &copy;2005 <a href="https://www.uphe.com">Universal Pictures</a>:
    <a href="https://www.uphe.com/movies/serenity-2005">Serenity</a><br>
    <a href="https://www.imdb.com/name/nm0821612/">Jewel Staite on IMDB</a>
</p>

@code {
    private string? result;

    private async Task SendByteArray()
    {
        var bytes = new byte[] { 0x45, 0x76, 0x65, 0x72, 0x79, 0x74, 0x68, 0x69,
            0x6e, 0x67, 0x27, 0x73, 0x20, 0x73, 0x68, 0x69, 0x6e, 0x79, 0x2c,
            0x20, 0x43, 0x61, 0x70, 0x74, 0x69, 0x61, 0x6e, 0x2e, 0x20, 0x4e,
            0x6f, 0x74, 0x20, 0x74, 0x6f, 0x20, 0x66, 0x72, 0x65, 0x74, 0x2e };

        result = await JS.InvokeAsync<string>("receiveByteArray", bytes);
    }
}
```

## Stream from .NET to JavaScript

Blazor supports streaming data directly from .NET to JavaScript (JS). Streams are created using a `Microsoft.JSInterop.DotNetStreamReference`.

`Microsoft.JSInterop.DotNetStreamReference` represents a .NET stream and uses the following parameters:

* `stream`: The stream sent to JS.
* `leaveOpen`: Determines if the stream is left open after transmission. If a value isn't provided, `leaveOpen` defaults to `false`.

In JS, use an array buffer or a readable stream to receive the data:

* Using an `ArrayBuffer`:

  ```javascript
  async function streamToJavaScript(streamRef) {
    const data = await streamRef.arrayBuffer();
  }
  ```

* Using a `ReadableStream`:

  ```javascript
  async function streamToJavaScript(streamRef) {
    const stream = await streamRef.stream();
  }
  ```

In C# code:

```csharp
var streamRef = new DotNetStreamReference(stream: {STREAM}, leaveOpen: false);
await JS.InvokeVoidAsync("streamToJavaScript", streamRef);
```

In the preceding example:

* The `{STREAM}` placeholder represents the `System.IO.Stream` sent to JS.
* `JS` is an injected `Microsoft.JSInterop.IJSRuntime` instance.

Disposing a `Microsoft.JSInterop.DotNetStreamReference` instance is usually unnecessary. When `leaveOpen` is set to its default value of `false`, the underlying `System.IO.Stream` is automatically disposed after transmission to JS.

If `leaveOpen` is `true`, then disposing a `Microsoft.JSInterop.DotNetStreamReference` doesn't dispose its underlying `System.IO.Stream`. The app's code determines when to dispose the underlying `System.IO.Stream`. When deciding how to dispose the underlying `System.IO.Stream`, consider the following:

* Disposing a `System.IO.Stream` while it's being transmitted to JS is considered an application error and may cause an unhandled exception to occur.
* `System.IO.Stream` transmission begins as soon as the `Microsoft.JSInterop.DotNetStreamReference` is passed as an argument to a JS interop call, regardless of whether the stream is actually used in JS logic.

Given these characteristics, we recommend disposing the underlying `System.IO.Stream` only after it's fully consumed by JS (the promise returned by `arrayBuffer` or `stream` resolves). It follows that a `Microsoft.JSInterop.DotNetStreamReference` should only be passed to JS if it's unconditionally going to be consumed by JS logic.

Call .NET methods from JavaScript functions in ASP.NET Core Blazor covers the reverse operation, streaming from JavaScript to .NET.

ASP.NET Core Blazor file downloads covers how to download a file in Blazor.

## Catch JavaScript exceptions

To catch JS exceptions, wrap the JS interop in a `try`-`catch` block and catch a `Microsoft.JSInterop.JSException`.

In the following example, the `nonFunction` JS function doesn't exist. When the function isn't found, the `Microsoft.JSInterop.JSException` is trapped with a `System.Exception.Message` that indicates the following error:

> `Could not find 'nonFunction' ('nonFunction' was undefined).`

`CallJs11.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs11.razor._
## Abort a long-running JavaScript function

Use a JS AbortController with a `System.Threading.CancellationTokenSource` in the component to abort a long-running JavaScript function from C# code.

The following JS `Helpers` class contains a simulated long-running function, `longRunningFn`, to count continuously until the `AbortController.signal` indicates that `AbortController.abort` has been called. The `sleep` function is for demonstration purposes to simulate slow execution of the long-running function and wouldn't be present in production code. When a component calls `stopFn`, the `longRunningFn` is signalled to abort via the `while` loop conditional check on `AbortSignal.aborted`.

```html
<script>
  class Helpers {
    static #controller = new AbortController();

    static async #sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async longRunningFn() {
      var i = 0;
      while (!this.#controller.signal.aborted) {
        i++;
        console.log(`longRunningFn: ${i}`);
        await this.#sleep(1000);
      }
    }

    static stopFn() {
      this.#controller.abort();
      console.log('longRunningFn aborted!');
    }
  }

  window.Helpers = Helpers;
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

The following component:

* Invokes the JS function `longRunningFn` when the **`Start Task`** button is selected. A `System.Threading.CancellationTokenSource` is used to manage the execution of the long-running function. `System.Threading.CancellationToken.Register*` sets a JS interop call delegate to execute the JS function `stopFn` when the `System.Threading.CancellationTokenSource.Token` is cancelled.
* When the **`Cancel Task`** button is selected, the `System.Threading.CancellationTokenSource.Token` is cancelled with a call to `System.Threading.CancellationTokenSource.Cancel*`.
* The `System.Threading.CancellationTokenSource` is disposed in the `Dispose` method.

`CallJs12.razor`:

```razor
@page "/call-js-12"
@inject IJSRuntime JS

<h1>Cancel long-running JS interop</h1>

<p>
    <button @onclick="StartTask">Start Task</button>
    <button @onclick="CancelTask">Cancel Task</button>
</p>

@code {
    private CancellationTokenSource? cts;

    private async Task StartTask()
    {
        cts = new CancellationTokenSource();
        cts.Token.Register(() => JS.InvokeVoidAsync("<example-value>"));

        await JS.InvokeVoidAsync("Helpers.longRunningFn");
    }

    private void CancelTask()
    {
        cts?.Cancel();
    }

    public void Dispose()
    {
        cts?.Cancel();
        cts?.Dispose();
    }
}
```

A browser's developer tools console indicates the execution of the long-running JS function after the **`Start Task`** button is selected and when the function is aborted after the **`Cancel Task`** button is selected:

```console
longRunningFn: 1
longRunningFn: 2
longRunningFn: 3
longRunningFn aborted!
```

## JavaScript `[JSImport]`/`[JSExport]` interop

*This section applies to client-side components.*

As an alternative to interacting with JavaScript (JS) in client-side components using Blazor's JS interop mechanism based on the `Microsoft.JSInterop.IJSRuntime` interface, a JS `[JSImport]`/`[JSExport]` interop API is available to apps targeting .NET 7 or later.

For more information, see JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.

## Unmarshalled JavaScript interop

*This section applies to client-side components.*

Unmarshalled interop using the `Microsoft.JSInterop.IJSUnmarshalledRuntime` interface is obsolete and should be replaced with JavaScript `[JSImport]`/`[JSExport]` interop.

For more information, see JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.

## Disposal of JavaScript interop object references

Examples throughout the JavaScript (JS) interop articles demonstrate typical object disposal patterns:

* When calling JS from .NET, as described in this article, dispose any created `Microsoft.JSInterop.IJSObjectReference`/`Microsoft.JSInterop.IJSInProcessObjectReference`/`JSObjectReference` either from .NET or from JS to avoid leaking JS memory.

* When calling .NET from JS, as described in Call .NET methods from JavaScript functions in ASP.NET Core Blazor, dispose of a created `Microsoft.JSInterop.DotNetObjectReference` either from .NET or from JS to avoid leaking .NET memory.

JS interop object references are implemented as a map keyed by an identifier on the side of the JS interop call that creates the reference. When object disposal is initiated from either the .NET or JS side, Blazor removes the entry from the map, and the object can be garbage collected as long as no other strong reference to the object is present.

At a minimum, always dispose objects created on the .NET side to avoid leaking .NET managed memory.

## DOM cleanup tasks during component disposal

For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

## JavaScript interop calls without a circuit

For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

## Related content

* Call .NET methods from JavaScript functions in ASP.NET Core Blazor
* `InteropComponent.razor` example (`dotnet/AspNetCore` GitHub repository `main` branch): The `main` branch represents the product unit's current development for the next release of ASP.NET Core. To select the branch for a different release (for example, `release/{VERSION}`, where the `{VERSION}` placeholder is the release version), use the **Switch branches or tags** dropdown list to select the branch. For a branch that no longer exists, use the **Tags** tab to find the API (for example, `v7.0.0`).
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
* Handle errors in ASP.NET Core Blazor apps (*JavaScript interop* section)
* Threat mitigation: JavaScript functions invoked from .NET
