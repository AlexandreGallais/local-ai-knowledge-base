---
title: "Use Razor components in JavaScript apps and SPA frameworks (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/js-spa-frameworks.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use Razor components in JavaScript apps and SPA frameworks (part 2 of 2)

## Blazor custom elements

Use Blazor custom elements to dynamically render Razor components from different JavaScript technologies, such as Angular, React, and Vue.

Blazor custom elements:

* Use standard HTML interfaces to implement custom HTML elements.
* Eliminate the need to manually manage the state and lifecycle of root Razor components using JavaScript APIs.
* Are useful for gradually introducing Razor components into existing projects written in other technologies.

Custom elements don't support child content or templated components.

### Element name

Per the HTML specification, custom element tag names must adopt kebab case:

❌Invalid: `mycounter`
❌Invalid: `MY-COUNTER`
❌Invalid: `MyCounter`
✔️Valid: `my-counter`
✔️Valid: `my-cool-counter`

### Package

Add a package reference for `Microsoft.AspNetCore.Components.CustomElements` to the app's project file.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

### Example component

The following examples are based on the `Counter` component from the Blazor project template.

`Counter.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/Counter.razor._
<!-- HOLD

### Blazor Web App registration

Take the following steps to register a root component as a custom element in a Blazor Web App.

Add the `Microsoft.AspNetCore.Components.Web` namespace to the top of the server-side `Program` file:

```csharp
using Microsoft.AspNetCore.Components.Web;
```

Add a namespace for the app's components. In the following example, the app's namespace is `BlazorSample` and the components are located in the `Components/Pages` folder:

```csharp
using BlazorSample.Components.Pages;
```

Modify the call to `Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents*` to specify the custom element with `Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement*` on the `Microsoft.AspNetCore.Components.Server.CircuitOptions.RootComponents` circuit option. The following example registers the `Counter` component with the custom HTML element `my-counter`:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents(options =>
    {
        options.RootComponents.RegisterCustomElement<Counter>("my-counter");
    });
```

-->

### Blazor Server registration

Take the following steps to register a root component as a custom element in a Blazor Server app.

Add the `Microsoft.AspNetCore.Components.Web` namespace to the top of the `Program` file:

```csharp
using Microsoft.AspNetCore.Components.Web;
```

Add a namespace for the app's components. In the following example, the app's namespace is `BlazorSample` and the components are located in the `Pages` folder:

```csharp
using BlazorSample.Pages;
```

Modify the call to `Microsoft.Extensions.DependencyInjection.ComponentServiceCollectionExtensions.AddServerSideBlazor*`. Specify the custom element with `Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement*` on the `Microsoft.AspNetCore.Components.Server.CircuitOptions.RootComponents` circuit option. The following example registers the `Counter` component with the custom HTML element `my-counter`:

```csharp
builder.Services.AddServerSideBlazor(options =>
{
    options.RootComponents.RegisterCustomElement<Counter>("my-counter");
});
```

### Blazor WebAssembly registration

Register a root component as a custom element in a Blazor WebAssembly app. In the following example, the code:

* Adds a namespace for the app's components. In the example, the app's namespace is `BlazorSample`, and the components are located in the `Pages` folder.
* Provides access to the API in the `Microsoft.AspNetCore.Components.Web` namespace.
* Calls `Microsoft.AspNetCore.Components.Web.CustomElementsJSComponentConfigurationExtensions.RegisterCustomElement*` on `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents` to register the `Counter` component with the custom HTML element `my-counter`.

```csharp
using BlazorSample.Pages;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.RegisterCustomElement<Counter>("my-counter");

await builder.Build().RunAsync();
```

### Use the registered custom element

Use the custom element with any web framework. For example, the preceding `my-counter` custom HTML element that renders the app's `Counter` component is used in a React app with the following markup:

```html
<my-counter></my-counter>
```

For a complete example of how to create custom elements with Blazor, see the `CustomElementsComponent` component in the reference source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### Pass <example-value>

Pass <example-value> to your Razor component either as HTML attributes or as JavaScript properties on the DOM element.

The following `Counter` component uses an `IncrementAmount` parameter to set the increment amount of the **:::no-loc text="Click me":::** button.

`Counter.razor`:

```razor
<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    [Parameter]
    public int IncrementAmount { get; set; } = 1;

    private void IncrementCount()
    {
        currentCount += IncrementAmount;
    }
}
```

Render the `Counter` component with the custom element and pass a value to the `IncrementAmount` parameter as an HTML attribute. The attribute name adopts kebab-case syntax (`increment-amount`, not `IncrementAmount`):

```html
<my-counter increment-amount="10"></my-counter>
```

Alternatively, you can set the parameter's value as a JavaScript property on the element object. The property name adopts camel case syntax (`incrementAmount`, not `IncrementAmount`):

```javascript
const elem = document.querySelector("my-counter");
elem.incrementAmount = 10;
```

You can update parameter values at any time using either attribute or property syntax.

Supported parameter types:

* Using JavaScript property syntax, you can pass <example-value> of any JSON-serializable type.
* Using HTML attributes, you are limited to passing objects of string, boolean, or numerical types.

## Generate Angular and React components

Generate JavaScript (JS) components from Razor components for JavaScript technologies, such as Angular or React. This capability isn't included with .NET, but is enabled by the support for rendering Razor components from JS. The JS component generation sample on GitHub demonstrates how to generate Angular and React components from Razor components. See the GitHub sample app's `README.md` file for additional information.

> **Warning:**
> The Angular and React component features are currently **experimental, unsupported, and subject to change or be removed at any time**. We welcome your feedback on how well this particular approach meets your requirements.

## Related content

Host and deploy ASP.NET Core Blazor
