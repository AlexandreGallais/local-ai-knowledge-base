---
title: "ASP.NET Core Blazor templated components"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/templated-components.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor templated components

By Robert Haken

This article explains how templated components can accept one or more UI templates as parameters, which can then be used as part of the component's rendering logic.

## Templated components

Templated components are components that receive one or more UI templates as parameters, which can be utilized in the rendering logic of the component. By using templated components, you can create higher-level components that are more reusable. Examples include:

* A table component that allows a user to specify templates for the table's header, rows, and footer.
* A list component that allows a user to specify a template for rendering items in a list.
* A navigation bar component that allows a user to specify a template for start content and navigation links.

A templated component is defined by specifying one or more component parameters of type `Microsoft.AspNetCore.Components.RenderFragment` or `Microsoft.AspNetCore.Components.RenderFragment`1`. A render fragment represents a segment of UI to render. `Microsoft.AspNetCore.Components.RenderFragment`1` takes a type parameter that can be specified when the render fragment is invoked.

> **Note:**
> For more information on `Microsoft.AspNetCore.Components.RenderFragment`, see ASP.NET Core Razor components.

Often, templated components are generically typed, as the following `TemplatedNavBar` component (`TemplatedNavBar.razor`) demonstrates. The generic type (`<T>`) in the following example is used to render `System.Collections.Generic.IReadOnlyList`1` values, which in this case is a list of pets for a component that displays a navigation bar with links to a pet detail component.

`TemplatedNavBar.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/TemplatedNavBar.razor._
When using a templated component, the template parameters can be specified using child elements that match the names of the parameters. In the following example, `<StartContent>...</StartContent>` and `<ItemTemplate>...</ItemTemplate>` supply `Microsoft.AspNetCore.Components.RenderFragment`1` templates for `StartContent` and `ItemTemplate` of the `TemplatedNavBar` component.

Specify the `Context` attribute on the component element when you want to specify the content parameter name for implicit child content (without any wrapping child element). In the following example, the `Context` attribute appears on the `TemplatedNavBar` element and applies to all `Microsoft.AspNetCore.Components.RenderFragment`1` template parameters.

`Pets1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Pets1.razor._
Alternatively, you can change the parameter name using the `Context` attribute on the `Microsoft.AspNetCore.Components.RenderFragment`1` child element. In the following example, the `Context` is set on `ItemTemplate` rather than `TemplatedNavBar`.

`Pets2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Pets2.razor._
Component arguments of type `Microsoft.AspNetCore.Components.RenderFragment`1` have an implicit parameter named `context`, which can be used. In the following example, `Context` isn't set. `@context.{PROPERTY}` supplies pet values to the template, where `{PROPERTY}` is a `Pet` property:

`Pets3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Pets3.razor._
When using generic-typed components, the type parameter is inferred if possible. However, you can explicitly specify the type with an attribute that has a name matching the type parameter, which is `TItem` in the preceding example:

`Pets4.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Pets4.razor._
The example provided in the `TemplatedNavBar` component (`TemplatedNavBar.razor`) assumes that the `Items` collection doesn't change after the initial render; or that if it does change, maintaining the state of components/elements used in `ItemTemplate` isn't necessary. For templated components where such usage can't be anticipated, see the Preserve relationships with `@key` section.

## Preserve relationships with `@key`

Templated components are often used to render collections of items, such as tables or lists. In such general scenarios, we can't assume that the user will avoid stateful components/elements in the item template definition or that there won't be additional changes to the `Items` collection. For such templated components, it's necessary to preserve the relationships with the `@key` directive attribute.

> **Note:**
> For more information on the `@key` directive attribute, see Retain element, component, and model relationships in ASP.NET Core Blazor.

The following `TableTemplate` component (`TableTemplate.razor`) demonstrates a templated component that preserves relationships with `@key`.

`TableTemplate.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/TableTemplate.razor._
Consider the following `Pets5` component (`Pets5.razor`), which demonstrates the importance of keying data to preserve model relationships. In the component, each iteration of adding a pet in `OnAfterRenderAsync` results in Blazor rerendering the `TableTemplate` component.

`Pets5.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Pets5.razor._
This demonstration allows you to:

* Select an `` from among several rendered table rows.
* Study the behavior of the page's focus as the pets collection automatically grows.

Without using the `@key` directive attribute in the `TableTemplate` component, the page's focus remains on the same index position (row) of the table, causing the focus to shift each time a pet is added. To demonstrate this, remove the `@key` directive attribute and value, restart the app, and attempt to modify a field value as items are added.

## Related content

* ASP.NET Core Blazor rendering performance best practices
* Retain element, component, and model relationships in ASP.NET Core Blazor
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
