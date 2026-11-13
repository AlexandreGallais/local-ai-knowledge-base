---
title: "ASP.NET Core Razor components (part 6 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor components (part 6 of 6)

## Whitespace rendering behavior

Unless the `@preservewhitespace` directive is used with a value of `true`, extra whitespace is removed if:

* Leading or trailing within an element.
* Leading or trailing within a `Microsoft.AspNetCore.Components.RenderFragment`/`Microsoft.AspNetCore.Components.RenderFragment`1` parameter (for example, child content passed to another component).
* It precedes or follows a C# code block, such as `@if` or `@foreach`.

Whitespace removal might affect the rendered output when using a CSS rule, such as `white-space: pre`. To disable this performance optimization and preserve the whitespace, take one of the following actions:

* Add the `@preservewhitespace true` directive at the top of the Razor file (`.razor`) to apply the preference to a specific component.
* Add the `@preservewhitespace true` directive inside an imports file (`_Imports.razor`) to apply the preference to a subdirectory or to the entire project.

In most cases, no action is required, as apps typically continue to behave normally (but faster). If stripping whitespace causes a rendering problem for a particular component, use `@preservewhitespace true` in that component to disable this optimization.

## Root component

A *root Razor component* (*root component*) is the first component loaded of any component hierarchy created by the app.

In an app created from the Blazor Web App project template, the `App` component (`App.razor`) is specified as the default root component by the type parameter declared for the call to `MapRazorComponents<TRootComponent>` in the server-side `Program` file. The following example shows the use of the `App` component as the root component, which is the default for an app created from the Blazor project template:

```csharp
app.MapRazorComponents<App>();
```

> **Note:**
> Making a root component interactive, such as the `App` component, isn't supported.

In an app created from the Blazor WebAssembly project template, the `App` component (`App.razor`) is specified as the default root component in the `Program` file:

```csharp
builder.RootComponents.Add<App>("#app");
```

In the preceding code, the CSS selector, `#app`, indicates that the `App` component is specified for the `` in `wwwroot/index.html` with an `id` of `app`:

```html
<div id="app">...</app>
```

MVC and Razor Pages apps can also use the Component Tag Helper to register statically-rendered Blazor WebAssembly root components:

```cshtml
<component type="typeof(App)" render-mode="WebAssemblyPrerendered" />
```

Statically-rendered components can only be added to the app. They can't be removed or updated afterwards.

For more information, see the following resources:

* Component Tag Helper in ASP.NET Core
* Integrate ASP.NET Core Razor components with MVC or Razor Pages
