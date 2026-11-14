---
title: "ASP.NET Core Blazor sections"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/sections.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor sections

This article explains how to control the content in a Razor component from a child Razor component.

## Blazor sections

To control the content in a Razor component from a child Razor component, Blazor supports *sections* using the following built-in components:

* `Microsoft.AspNetCore.Components.Sections.SectionOutlet`: Renders content provided by `Microsoft.AspNetCore.Components.Sections.SectionContent` components with matching `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName` or `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` arguments. Two or more `Microsoft.AspNetCore.Components.Sections.SectionOutlet` components can't have the same `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName` or `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId`.

* `Microsoft.AspNetCore.Components.Sections.SectionContent`: Provides content as a `Microsoft.AspNetCore.Components.RenderFragment` to `Microsoft.AspNetCore.Components.Sections.SectionOutlet` components with a matching `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName` or `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId`. If several `Microsoft.AspNetCore.Components.Sections.SectionContent` components have the same `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName` or `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId`, the matching `Microsoft.AspNetCore.Components.Sections.SectionOutlet` component renders the content of the last rendered `Microsoft.AspNetCore.Components.Sections.SectionContent`.

Sections can be used in both layouts and across nested parent-child components.

Although the argument passed to `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName` can use any type of casing, the documentation adopts kebab casing (for example, `top-bar`), which is a common casing choice for HTML element IDs. `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` receives a static `object` field, and we always recommend Pascal casing for C# field names (for example, `TopbarSection`).

In the following example, the app's main layout component implements an increment counter button for the app's `Counter` component.

If the namespace for sections isn't in the imports file (`_Imports.razor`), add it:

```razor
@using Microsoft.AspNetCore.Components.Sections
```

In the `MainLayout` component (`MainLayout.razor`), place a `Microsoft.AspNetCore.Components.Sections.SectionOutlet` component and pass a string to the `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName` parameter to indicate the section's name. The following example uses the section name `top-bar`:

```razor
<SectionOutlet SectionName="top-bar" />
```

In the `Counter` component (`Counter.razor`), create a `Microsoft.AspNetCore.Components.Sections.SectionContent` component and pass the matching string (`top-bar`) to its `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName` parameter:

```razor
<SectionContent SectionName="top-bar">
    <button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
</SectionContent>
```

When the `Counter` component is accessed at `/counter`, the `MainLayout` component renders the increment count button from the `Counter` component where the `Microsoft.AspNetCore.Components.Sections.SectionOutlet` component is placed. When any other component is accessed, the increment count button isn't rendered.

Instead of using a named section, you can pass a static `object` with the `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` parameter to identify the section. The following example also implements an increment counter button for the app's `Counter` component in the app's main layout.

If you don't want other `Microsoft.AspNetCore.Components.Sections.SectionContent` components to accidentally match the name of a `Microsoft.AspNetCore.Components.Sections.SectionOutlet`, pass an object `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` parameter to identify the section. This can be useful when designing a Razor class library (RCL). When a `Microsoft.AspNetCore.Components.Sections.SectionOutlet` in the RCL uses an object reference with `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` and the consumer places a `Microsoft.AspNetCore.Components.Sections.SectionContent` component with a matching `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` object, an accidental match by name isn't possible when consumers of the RCL implement other `Microsoft.AspNetCore.Components.Sections.SectionContent` components.

The following example also implements an increment counter button for the app's `Counter` component in the app's main layout, using an object reference instead of a section name.

Add a `TopbarSection` static `object` to the `MainLayout` component in an `@code` block:

```razor
@code {
    internal static object TopbarSection = new();
}
```

In the `MainLayout` component's Razor markup, place a `Microsoft.AspNetCore.Components.Sections.SectionOutlet` component and pass `TopbarSection` to the `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` parameter to indicate the section:

```razor
<SectionOutlet SectionId="TopbarSection" />
```

Add a `Microsoft.AspNetCore.Components.Sections.SectionContent` component to the app's `Counter` component that renders an increment count button. Use the `MainLayout` component's `TopbarSection` section static `object` as the `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` (`MainLayout.TopbarSection`).

In `Counter.razor`:

```razor
<SectionContent SectionId="MainLayout.TopbarSection">
    <button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
</SectionContent>
```

When the `Counter` component is accessed, the `MainLayout` component renders the increment count button where the `Microsoft.AspNetCore.Components.Sections.SectionOutlet` component is placed.

> **Note:**
> `Microsoft.AspNetCore.Components.Sections.SectionOutlet` and `Microsoft.AspNetCore.Components.Sections.SectionContent` components can only set either `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionId` or `Microsoft.AspNetCore.Components.Sections.SectionOutlet.SectionName`, not both.

## `RenderFragment` caching rules and section rendering behavior

When a `Microsoft.AspNetCore.Components.Sections.SectionContent`'s `Microsoft.AspNetCore.Components.RenderFragment` content changes, which is a different instance than the component where it's rendered, Blazor completely destroys and recreates the section instead of attempting to update the section's content. Unlike normal rendering, the section's content could come from different instances, and it doesn't make sense to attempt processing content from two separate components, which might lead to unexpected results. For a detailed explanation on this behavior, see Inconsistent component initialization with Blazor SectionOutlet/SectionContent and CascadingValue (`dotnet/aspnetcore` #58316).

## Section interaction with other Blazor features

A section interacts with other Blazor features in the following ways:

* Cascading values flow into section content from where the content is defined by the `Microsoft.AspNetCore.Components.Sections.SectionContent` component.
* Unhandled exceptions are handled by error boundaries defined around a `Microsoft.AspNetCore.Components.Sections.SectionContent` component.
* A Razor component configured for streaming rendering also configures section content provided by a `Microsoft.AspNetCore.Components.Sections.SectionContent` component to use streaming rendering.
* A section that contains interactive components is statically rendered (non-functional) in a layout component in a Blazor Web App that adopts per-page/component rendering. For more information, see ASP.NET Core Blazor layouts.
