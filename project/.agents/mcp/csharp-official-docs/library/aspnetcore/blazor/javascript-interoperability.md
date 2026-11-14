---
title: "ASP.NET Core Blazor JavaScript interoperability (JS interop) (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/javascript-interoperability/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor JavaScript interoperability (JS interop)

A Blazor app can invoke JavaScript (JS) functions from .NET methods and .NET methods from JS functions. These scenarios are called *JavaScript interoperability* (*JS interop*).

Further JS interop guidance is provided in the following articles:

* Call JavaScript functions from .NET methods in ASP.NET Core Blazor
* Call .NET methods from JavaScript functions in ASP.NET Core Blazor
* ASP.NET Core Blazor JavaScript interoperability (JS interop) performance best practices

> **Note:**
> JavaScript `[JSImport]`/`[JSExport]` interop API is available for client-side components in ASP.NET Core in .NET 7 or later.
>
> For more information, see JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.

## Compression for interactive server components with untrusted data

With compression, which is enabled by default, avoid creating secure (authenticated/authorized) interactive server-side components that render data from untrusted sources. Untrusted sources include route parameters, query strings, data from JS interop, and any other source of data that a third-party user can control (databases, external services). For more information, see ASP.NET Core Blazor SignalR guidance and Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering.

## JavaScript interop abstractions and features package

The `@microsoft/dotnet-js-interop` package (`npmjs.com`) (`Microsoft.JSInterop` NuGet package) provides abstractions and features for interop between .NET and JavaScript (JS) code. Reference source is available in the `dotnet/aspnetcore` GitHub repository. For more information, see the GitHub repository's `README.md` file.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Additional resources for writing JS interop scripts in TypeScript:

* TypeScript
* Tutorial: Create an ASP.NET Core app with TypeScript in Visual Studio
* Manage npm packages in Visual Studio

## Interaction with the DOM

Only mutate the DOM with JavaScript (JS) when the object doesn't interact with Blazor. Blazor maintains representations of the DOM and interacts directly with DOM objects. If an element rendered by Blazor is modified externally using JS directly or via JS Interop, the DOM may no longer match Blazor's internal representation, which can result in undefined behavior. Undefined behavior may merely interfere with the presentation of elements or their functions but may also introduce security risks to the app or server.

This guidance not only applies to your own JS interop code but also to any JS libraries that the app uses, including anything provided by a third-party framework, such as Bootstrap JS and jQuery.

In a few documentation examples, JS interop is used to mutate an element *purely for demonstration purposes* as part of an example. In those cases, a warning appears in the text.

For more information, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

## JavaScript class with a field of type function

A JavaScript class with a field of type function isn't supported by Blazor JS interop. Use Javascript functions in classes.

❌Unsupported: `GreetingHelpers.sayHello` in the following class as a field of type function isn't discovered by Blazor's JS interop and can't be executed from C# code:

```javascript
export class GreetingHelpers {
  sayHello = function() {
    ...
  }
}
```

✔️Supported: `GreetingHelpers.sayHello` in the following class as a function is supported:

```javascript
export class GreetingHelpers {
  sayHello() {
    ...
  }
}
```

Arrow functions are also supported:

```javascript
export class GreetingHelpers {
  sayHello = () => {
    ...
  }
}
```

## Avoid inline event handlers

A JavaScript function can be invoked directly from an inline event handler. In the following example, `alertUser` is a JavaScript function called when the button is selected by the user:

```html
<button onclick="alertUser">Click Me!</button>
```

However, the use of inline event handlers is a *poor design choice* for calling JavaScript functions:

* Mixing HTML markup and JavaScript code often leads to unmaintainable code.
* Inline event handler execution may be blocked by a Content Security Policy (CSP) (MDN documentation).

We recommend avoiding inline event handlers in favor of approaches that assign handlers in JavaScript with `addEventListener`, as the following example demonstrates:

`AlertUser.razor.js`:

```javascript
export function alertUser() {
  alert('The button was selected!');
}

export function addHandlers() {
  const btn = document.getElementById("btn");
  btn.addEventListener("click", alertUser);
}
```

`AlertUser.razor`:

```razor
@page "/alert-user"
@implements IAsyncDisposable
@inject IJSRuntime JS

<h1>Alert User</h1>

<p>
    <button id="btn">Click Me!</button>
</p>

@code {
    private IJSObjectReference? module;

    protected async override Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import",
                "./Components/Pages/AlertUser.razor.js");

            await module.InvokeVoidAsync("addHandlers");
        }
    }

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
    }
}
```

In the preceding example, `Microsoft.JSInterop.JSDisconnectedException` is trapped during module disposal in case Blazor's SignalR circuit is lost. If the preceding code is used in a Blazor WebAssembly app, there's no SignalR connection to lose, so you can remove the `try`-`catch` block and leave the line that disposes the module (`await module.DisposeAsync();`). For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

For more information, see the following resources:

* JavaScript location in ASP.NET Core Blazor apps
* Introduction to events (MDN documentation)

## Asynchronous JavaScript calls

JS interop calls are asynchronous, regardless of whether the called code is synchronous or asynchronous. Calls are asynchronous to ensure that components are compatible across server-side and client-side rendering models. When adopting server-side rendering, JS interop calls must be asynchronous because they're sent over a network connection. For apps that exclusively adopt client-side rendering, synchronous JS interop calls are supported.

For more information, see the following articles:

* Call JavaScript functions from .NET methods in ASP.NET Core Blazor
* Call .NET methods from JavaScript functions in ASP.NET Core Blazor

## Object serialization

Blazor uses `System.Text.Json` for serialization with the following requirements and default behaviors:

* Types must have a default constructor, `get`/`set` accessors must be public, and fields are never serialized.
* Global default serialization isn't customizable to avoid breaking existing component libraries, impacts on performance and security, and reductions in reliability.
* Serializing .NET member names results in lowercase JSON key names.
* JSON is deserialized as `System.Text.Json.JsonElement` C# instances, which permit mixed casing. Internal casting for assignment to C# model properties works as expected in spite of any case differences between JSON key names and C# property names.
* Complex framework types might be trimmed away by the IL Trimmer on publish and not present for JS interop or JSON serialization/deserialization. We recommend creating custom types for types that the IL Trimmer trims away.
* Blazor always relies on reflection for JSON serialization, including when using C# source generation. Setting `JsonSerializerIsReflectionEnabledByDefault` to `false` in the app's project file results in an error when serialization is attempted.

`System.Text.Json.Serialization.JsonConverter` API is available for custom serialization. Properties can be annotated with a `[JsonConverter]` attribute to override default serialization for an existing data type.

For more information, see the following resources in the .NET documentation:

* JSON serialization and deserialization (marshalling and unmarshalling) in .NET
* How to customize property names and values with `System.Text.Json`
* How to write custom converters for JSON serialization (marshalling) in .NET

Blazor supports optimized byte array JS interop that avoids encoding/decoding byte arrays into Base64. The app can apply custom serialization and pass the resulting bytes. For more information, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

## DOM cleanup tasks during component disposal

Don't execute JS interop code for DOM cleanup tasks during component disposal. Instead, use the `MutationObserver` pattern in JavaScript (JS) on the client for the following reasons:

* The component may have been removed from the DOM by the time your cleanup code executes in `Dispose{Async}`.
* During server-side rendering, the Blazor renderer may have been disposed by the framework by the time your cleanup code executes in `Dispose{Async}`.

The `MutationObserver` pattern allows you to run a function when an element is removed from the DOM.

In the following example, the `DOMCleanup` component:

* Contains a `` with an `id` of `cleanupDiv`. The `` element is removed from the DOM along with the rest of the component's DOM markup when the component is removed from the DOM.
* Loads the `DOMCleanup` JS class from the `DOMCleanup.razor.js` file and calls its `createObserver` function to set up the `MutationObserver` callback. These tasks are accomplished in the `OnAfterRenderAsync` lifecycle method.

`DOMCleanup.razor`:

```razor
@page "/dom-cleanup"
@implements IAsyncDisposable
@inject IJSRuntime JS

<h1>DOM Cleanup Example</h1>

<div id="cleanupDiv"></div>

@code {
    private IJSObjectReference? module;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>(
                "import", "./Components/Pages/DOMCleanup.razor.js");

            await module.InvokeVoidAsync("DOMCleanup.createObserver");
        }
    }

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
    }
}
```

In the preceding example, `Microsoft.JSInterop.JSDisconnectedException` is trapped during module disposal in case Blazor's SignalR circuit is lost. If the preceding code is used in a Blazor WebAssembly app, there's no SignalR connection to lose, so you can remove the `try`-`catch` block and leave the line that disposes the module (`await module.DisposeAsync();`). For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

In the following example, the `MutationObserver` callback is executed each time a DOM change occurs. Execute your cleanup code when the `if` statement confirms that the target element (`cleanupDiv`) was removed (`if (targetRemoved) { ... }`). It's important to disconnect and delete the `MutationObserver` to avoid a memory leak after your cleanup code executes.

`DOMCleanup.razor.js` placed side-by-side with the preceding `DOMCleanup` component:

```javascript
export class DOMCleanup {
  static observer;

  static createObserver() {
    const target = document.querySelector('#cleanupDiv');

    this.observer = new MutationObserver(function (mutations) {
      const targetRemoved = mutations.some(function (mutation) {
        const nodes = Array.from(mutation.removedNodes);
        return nodes.indexOf(target) !== -1;
      });

      if (targetRemoved) {
        // Cleanup resources here
        // ...

        // Disconnect and delete MutationObserver
        this.observer && this.observer.disconnect();
        delete this.observer;
      }
    });

    this.observer.observe(target.parentNode, { childList: true });
  }
}

window.DOMCleanup = DOMCleanup;
```

The preceding approaches attach the `MutationObserver` to `target.parentNode`, which works until `parentNode` itself is removed from the DOM. This is a common scenario, for example, when navigating to a new page, which causes the entire page component to be removed from the DOM. In such cases, any child components observing changes within the page aren't cleaned up properly.

Don't assume that observing `document.body`, instead of `target.parentNode`, is a better target. Observing `document.body` has performance implications because callback logic is executed for *all* DOM updates, whether or not they have anything to do with your element. Use either of the following approaches:

* In cases where you can identify a suitable ancestor node to observe, use `MutationObserver` with it. Ideally, this ancestor is scoped to the changes that you want to observe, rather than `document.body`.
* Instead of using `MutationObserver`, consider using a custom element and `disconnectedCallback`. The event always fires when your custom element is disconnected, no matter where it resides in the DOM relative to the DOM change.
