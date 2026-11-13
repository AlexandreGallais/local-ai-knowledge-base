---
title: "Use Razor components in JavaScript apps and SPA frameworks (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/js-spa-frameworks.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use Razor components in JavaScript apps and SPA frameworks

-->
-->

This article covers how to render Razor components from JavaScript, use Blazor custom elements, and generate Angular and React components.

> **Note:**
> We recommend using the `blazor.server.js` (Blazor Server) and `blazor.webassembly.js` (Blazor WebAssembly) scripts when integrating Razor components into an existing JavaScript app until better support for the `blazor.web.js` (Blazor Web App) script is added in the future. For more information, see RegisterCustomElement stopped working in Blazor 8 (`dotnet/aspnetcore` #53920).

## Angular sample apps

The following sample apps demonstrate rendering a Razor component as a Blazor custom element in an Angular app:

* CustomElementsBlazorSample (Blazor Server) (`javiercn/CustomElementsBlazorSample` GitHub repository, branch: `blazor-server`)
* CustomElementsBlazorSample (Blazor WebAssembly) (`javiercn/CustomElementsBlazorSample` GitHub repository, branch: `blazor-wasm`)

To migrate either of these .NET 7 samples, see the following resources:

* Migrate from ASP.NET Core in .NET 7 to .NET 8
* Migrate from ASP.NET Core in .NET 8 to ASP.NET Core in .NET 9
* Migrate from ASP.NET Core in .NET 9 to ASP.NET Core in .NET 10

The principal updates to make are:

* Update the target framework monikers (TFMs) to the latest version.
* Update the .NET package references and Angular dependencies to their latest versions.

  > **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

## Render Razor components from JavaScript

Razor components can be dynamically-rendered from JavaScript (JS) for existing JS apps.

The example in this section renders the following Razor component into a page via JS.

`Quote.razor`:

```razor
<div class="m-5 p-5">
    <h2>Quote</h2>
    <p>@Text</p>
</div>

@code {
    [Parameter]
    public string? Text { get; set; }
}
```

In the `Program` file, add the namespace for the location of the component.

Call `Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript*` on the app's root component collection to register a Razor component as a root component for JS rendering.

`Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript*` includes an overload that accepts the name of a JS function that executes initialization logic (`javaScriptInitializer`). The JS function is called once per component registration immediately after the Blazor app starts and before any components are rendered. This function can be used for integration with JS technologies, such as HTML custom elements or a JS-based SPA framework.

One or more initializer functions can be created and called by different component registrations. The typical use case is to reuse the same initializer function for multiple components, which is expected if the initializer function is configuring integration with custom elements or another JS-based SPA framework.

> **Important:**
> Don't confuse the `javaScriptInitializer` parameter of `Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript*` with JavaScript initializers. The name of the parameter and the JS initializers feature is coincidental.

The following example demonstrates the dynamic registration of the preceding `Quote` component with "`quote`" as the identifier.

<!-- HOLD

* In a Blazor Web App, modify the call to `Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents*` in the server-side `Program` file:

  ```csharp
  builder.Services.AddRazorComponents()
      .AddInteractiveServerComponents(options =>
      {
          options.RootComponents.RegisterForJavaScript<Quote>(identifier: "quote",
            javaScriptInitializer: "initializeComponent");
      });
  ```

-->

* In a Blazor Server app, modify the call to `Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor*` in the `Program` file:

  ```csharp
  builder.Services.AddServerSideBlazor(options =>
  {
      options.RootComponents.RegisterForJavaScript<Quote>(identifier: "quote", 
          javaScriptInitializer: "initializeComponent");
  });
  ```

* In a Blazor WebAssembly app, call `Microsoft.AspNetCore.Components.Web.JSComponentConfigurationExtensions.RegisterForJavaScript*` on `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents` in the client-side `Program` file:

  ```csharp
  builder.RootComponents.RegisterForJavaScript<Quote>(identifier: "quote", 
      javaScriptInitializer: "initializeComponent");
  ```

Attach the initializer function with `name` and `parameters` function parameters to the `window` object. For demonstration purposes, the following `initializeComponent` function logs the name and parameters of the registered component.

`wwwroot/jsComponentInitializers.js`:

```javascript
window.initializeComponent = (name, parameters) => {
  console.log({ name: name, parameters: parameters });
}
```

Render the component from JS into a container element using the registered identifier, passing component parameters as needed.

In the following example:

* The `Quote` component (`quote` identifier) is rendered into the `quoteContainer` element when the `showQuote` function is called.
* A quote string is passed to the component's `Text` parameter.

`wwwroot/scripts.js`:

```javascript
window.showQuote = async () => {
  let targetElement = document.getElementById('quoteContainer');
  await Blazor.rootComponents.add(targetElement, 'quote', 
  {
    text: "Crow: I have my doubts that this movie is actually 'starring' " +
      "anybody. More like, 'camera is generally pointed at.'"
  });
}

const btn = document.querySelector("#showQuoteBtn");
btn.addEventListener("click", showQuote);
```

After the Blazor script is loaded, load the preceding scripts into the JS app:

```html
<script src="_framework/{BLAZOR SCRIPT}"></script>
<script src="jsComponentInitializers.js"></script>
<script src="scripts.js"></script>
```

In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script.

In HTML, place the target container element (`quoteContainer`). For the demonstration in this section, a button triggers rendering the `Quote` component by calling the `showQuote` JS function:

```html
<button id="showQuoteBtn">Show Quote</button>

<div id="quoteContainer"></div>
```

On initialization before any components are rendered, the browser's developer tools console logs the `Quote` component's identifier (`name`) and parameters (`parameters`) when `initializeComponent` is called:

```console
Object { name: "quote", parameters: (1) […] }
  name: "quote"
  parameters: Array [ {…} ]
    0: Object { name: "Text", type: "string" }
    length: 1
```

When the **:::no-loc text="Show Quote":::** button is selected, the `Quote` component is rendered with the quote stored in `Text` displayed:

Quote &copy;1988-1999 Satellite of Love LLC: *Mystery Science Theater 3000* (Trace Beaulieu (Crow))

> **Note:**
> `rootComponents.add` returns an instance of the component. Call `dispose` on the instance to release it:
>
> ```javascript
> const rootComponent = await window.Blazor.rootComponents.add(...);
>
> ...
>
> rootComponent.dispose();
> ```

The preceding example dynamically renders the root component when the `showQuote()` JS function is called. To render a root component into a container element when Blazor starts, use a JavaScript initializer to render the component, as the following example demonstrates.

The following example builds on the preceding example, using the `Quote` component, the root component registration in the `Program` file, and the initialization of `jsComponentInitializers.js`. The `showQuote()` function (and the `script.js` file) aren't used.

In HTML, place the target container element, `quoteContainer2` for this example:

```html
<div id="quoteContainer2"></div>
```

Using a JavaScript initializer, add the root component to the target container element.

`wwwroot/{PACKAGE ID/ASSEMBLY NAME}.lib.module.js`:

<!-- HOLD

For a Blazor Web App:

```javascript
export function afterWebStarted(blazor) {
  let targetElement = document.getElementById('quoteContainer2');
  blazor.rootComponents.add(targetElement, 'quote',
    {
      text: "Crow: I have my doubts that this movie is actually 'starring' " +
          "anybody. More like, 'camera is generally pointed at.'"
    });
}
```

For a Blazor Server or Blazor WebAssembly app:

-->

```javascript
export function afterStarted(blazor) {
  let targetElement = document.getElementById('quoteContainer2');
  blazor.rootComponents.add(targetElement, 'quote',
    {
      text: "Crow: I have my doubts that this movie is actually 'starring' " +
          "anybody. More like, 'camera is generally pointed at.'"
    });
}
```

> **Note:**
> For the call to `rootComponents.add`, use the `blazor` parameter (lowercase `b`) provided by the Blazor start event. Although the registration is valid when using the `Blazor` object (uppercase `B`), the preferred approach is to use the parameter.

For an advanced example with additional features, see the example in the `BasicTestApp` of the ASP.NET Core reference source (`dotnet/aspnetcore` GitHub repository):

* `JavaScriptRootComponents.razor`
* `wwwroot/js/jsRootComponentInitializers.js`
* `wwwroot/index.html`

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.
