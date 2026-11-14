---
title: "Persist Component State Tag Helper in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/views/tag-helpers/built-in/persist-component-state.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Persist Component State Tag Helper in ASP.NET Core

The Persist Component State Tag Helper saves the state of non-routable Razor components rendered in a page or view of a Razor Pages or MVC app.

## Prerequisites

Follow the guidance in the *Use non-routable components in pages or views* section of the Integrate ASP.NET Core Razor components with MVC or Razor Pages article.

## Persist state for prerendered components

To persist state for prerendered components, use the Persist Component State Tag Helper (reference source). Add the Tag Helper's tag, `<persist-component-state />`, inside the closing `</body>` tag of the layout in an app that prerenders components.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

In `Pages/Shared/_Layout.cshtml` for embedded components that are either WebAssembly prerendered (`WebAssemblyPrerendered`) or server prerendered (`ServerPrerendered`):

```cshtml
<body>
    ...

    <persist-component-state />
</body>
```

Decide what state to persist using the `Microsoft.AspNetCore.Components.PersistentComponentState` service. `PersistentComponentState.RegisterOnPersisting` registers a callback to persist the component state before the app is paused. The state is retrieved when the application resumes.

For more information and examples, see ASP.NET Core Blazor prerendered state persistence.

## Related content

* Component Tag Helper in ASP.NET Core
* Prerender ASP.NET Core Razor components
* `Microsoft.AspNetCore.Mvc.TagHelpers.ComponentTagHelper`
* Tag Helpers in ASP.NET Core
* ASP.NET Core Razor components
