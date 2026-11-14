---
title: "ASP.NET Core Blazor layouts"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/layouts.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor layouts

This article explains how to create reusable layout components for Blazor apps.

## Usefulness of Blazor layouts

Some app elements, such as menus, copyright messages, and company logos, are usually part of app's overall presentation. Placing a copy of the markup for these elements into all of the components of an app isn't efficient. Every time that one of these elements is updated, every component that uses the element must be updated. This approach is costly to maintain and can lead to inconsistent content if an update is missed. *Layouts* solve these problems.

A Blazor layout is a Razor component that shares markup with components that reference it. Layouts can use data binding, dependency injection, and other features of components.

## Create a layout component

To create a layout component:

* Create a Razor component defined by a Razor template or C# code. Layout components based on a Razor template use the `.razor` file extension just like ordinary Razor components. Because layout components are shared across an app's components, they're usually placed in the app's `Shared` or `Layout` folder. However, layouts can be placed in any location accessible to the components that use it. For example, a layout can be placed in the same folder as the components that use it.
* Inherit the component from `Microsoft.AspNetCore.Components.LayoutComponentBase`. The `Microsoft.AspNetCore.Components.LayoutComponentBase` defines a `Microsoft.AspNetCore.Components.LayoutComponentBase.Body` property (`Microsoft.AspNetCore.Components.RenderFragment` type) for the rendered content inside the layout.
* Use the Razor syntax `@Body` to specify the location in the layout markup where the content is rendered.

> **Note:**
> For more information on `Microsoft.AspNetCore.Components.RenderFragment`, see ASP.NET Core Razor components.

The following `DoctorWhoLayout` component shows the Razor template of a layout component. The layout inherits `Microsoft.AspNetCore.Components.LayoutComponentBase` and sets the `@Body` between the navigation bar (`...`) and the footer (`...`).

`DoctorWhoLayout.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Layout/DoctorWhoLayout.razor._
## `MainLayout` component

In an app created from a Blazor project template, the `MainLayout` component is the app's default layout. Blazor's layout adopts the :::no-loc text="Flexbox"::: layout model (W3C specification).

Blazor's CSS isolation feature applies isolated CSS styles to the `MainLayout` component. By convention, the styles are provided by the accompanying stylesheet of the same name, `MainLayout.razor.css`. The ASP.NET Core framework implementation of the stylesheet is available for inspection in the ASP.NET Core reference source (`dotnet/aspnetcore` GitHub repository):

* Blazor Web App: Locate `MainLayout.razor.css` in the `Components/Layout` folder of the server project in the project template.
* Blazor WebAssembly `MainLayout.razor.css`.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Apply a layout

### Make the layout namespace available

Layout file locations and namespaces changed over time for the Blazor framework. Depending on the version of Blazor and type of Blazor app that you're building, you may need to indicate the layout's namespace when using it. When referencing a layout implementation and the layout isn't found without indicating the layout's namespace, take any of the following approaches:

* Add an `@using` directive to the imports file (`_Imports.razor`) for the location of the layouts. In the following example, a folder of layouts with the name `Layout` is inside a `Components` folder, and the app's namespace is `BlazorSample`:

  ```razor
  @using BlazorSample.Components.Layout
  ```

* Add an `@using` directive at the top of the component definition where the layout is used:

  ```razor
  @using BlazorSample.Components.Layout
  @layout DoctorWhoLayout
  ```

* Fully qualify the namespace of the layout where it's used:

  ```razor
  @layout BlazorSample.Components.Layout.DoctorWhoLayout
  ```

### Apply a layout to a component

Use the `@layout` Razor directive to apply a layout to a routable Razor component that has an `@page` directive. The compiler converts `@layout` into a `Microsoft.AspNetCore.Components.LayoutAttribute` and applies the attribute to the component class.

The content of the following `Episodes` component is inserted into the `DoctorWhoLayout` at the position of `@Body`.

`Episodes.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Episodes.razor._
The following rendered HTML markup is produced by the preceding `DoctorWhoLayout` and `Episodes` component. Extraneous markup doesn't appear in order to focus on the content provided by the two components involved:

* The H1 "database" heading (`<h1>...</h1>`) in the header (`...`), navigation bar (`...`), and trademark information in the footer (`...`) come from the `DoctorWhoLayout` component.
* The H2 "episodes" heading (`<h2>...</h2>`) and episode list (`...`) come from the `Episodes` component.

```html
<header>
    <h1 ...>...</h1>
</header>

<nav>
    ...
</nav>

<h2>...</h2>

<ul>
    <li>...</li>
    <li>...</li>
    <li>...</li>
</ul>

<footer>
    ...
</footer>
```

Specifying the layout directly in a component overrides a *default layout*:

* Set by an `@layout` directive imported from an imports file (`_Imports.razor`), as described in the following Apply a layout to a folder of components section.
* Set as the app's default layout, as described in the Apply a default layout to an app section later in this article.

### Apply a layout to a folder of components

Every folder of an app can optionally contain an imports file named `_Imports.razor`. The compiler includes the directives specified in the imports file in all of the Razor templates in the same folder and recursively in all of its subfolders. Therefore, an imports file containing `@layout DoctorWhoLayout` ensures that all of the components in a folder use the `DoctorWhoLayout` component. There's no need to repeatedly add `@layout DoctorWhoLayout` to all of the Razor components (`.razor`) within the folder and subfolders.

`_Imports.razor`:

```razor
@layout DoctorWhoLayout
...
```

The imports file is similar to the _ViewImports.cshtml file for Razor views and pages but applied specifically to Razor component files.

Specifying a layout in the imports file overrides a layout specified as the router's default app layout, which is described in the following section.

> **Warning:**
> Do **not** add a Razor `@layout` directive to the root imports file, which results in an infinite loop of layouts. To control the default app layout, specify the layout in the `Microsoft.AspNetCore.Components.Routing.Router` component. For more information, see the following Apply a default layout to an app section.
>
> The same condition results when using an imports file to apply a layout to a folder of components with the `@layout` directive and the layout component itself is in the same folder or folder hierarchy of the imports file. An infinite loop of applying the layout occurs because the `@layout` directive is also applied to the layout component. To avoid recursion problems, we recommend storing layout components in their own folder (for example, `Layouts`), away from where imports files are applying them.

> **Note:**
> The `@layout` Razor directive only applies a layout to routable Razor components with an `@page` directive.

### Apply a default layout to an app

Specify the default app layout in the `Microsoft.AspNetCore.Components.Routing.Router` component's `Microsoft.AspNetCore.Components.RouteView` component. Use the `Microsoft.AspNetCore.Components.RouteView.DefaultLayout` parameter to set the layout type:

```razor
<RouteView RouteData="routeData" DefaultLayout="typeof({LAYOUT})" />
```

In the preceding example, the `{LAYOUT}` placeholder is the layout (for example, `DoctorWhoLayout` if the layout file name is `DoctorWhoLayout.razor`). You may need to identify the layout's namespace depending on the .NET version and type of Blazor app. For more information, see the Make the layout namespace available section.

Specifying the layout as a default layout in the `Microsoft.AspNetCore.Components.Routing.Router` component's `Microsoft.AspNetCore.Components.RouteView` is a useful practice because you can override the layout on a per-component or per-folder basis, as described in the preceding sections of this article. We recommend using the `Microsoft.AspNetCore.Components.Routing.Router` component to set the app's default layout because it's the most general and flexible approach for using layouts.

### Apply a layout to arbitrary content (`LayoutView` component)

To set a layout for arbitrary Razor template content, specify the layout with a `Microsoft.AspNetCore.Components.LayoutView` component. You can use a `Microsoft.AspNetCore.Components.LayoutView` in any Razor component. The following example sets a layout component named `ErrorLayout` for the component that includes the following Razor markup.

```razor
<LayoutView Layout="typeof(ErrorLayout)">
    <h1>Page not found</h1>
    <p>Sorry, there's nothing at this address.</p>
</LayoutView>
```

You may need to identity the layout's namespace depending on the .NET version and type of Blazor app. For more information, see the Make the layout namespace available section.

## Nested layouts

A component can reference a layout that in turn references another layout. For example, nested layouts are used to create a multi-level menu structures.

The following example shows how to use nested layouts. The `Episodes` component shown in the Apply a layout to a component section is the component to display. The component references the `DoctorWhoLayout` component.

The following `DoctorWhoLayout` component is a modified version of the example shown earlier in this article. The header and footer elements are removed, and the layout references another layout, `ProductionsLayout`. The `Episodes` component is rendered where `@Body` appears in the `DoctorWhoLayout`.

`DoctorWhoLayout.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Layout/DoctorWhoLayout2.razor._
The `ProductionsLayout` component contains the top-level layout elements, where the header (`...`) and footer (`...`) elements now reside. The `DoctorWhoLayout` with the `Episodes` component is rendered where `@Body` appears.

`ProductionsLayout.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Layout/ProductionsLayout.razor._
The following rendered HTML markup is produced by the preceding nested layout. Extraneous markup doesn't appear in order to focus on the nested content provided by the three components involved:

* The header (`...`), production navigation bar (`...`), and footer (`...`) elements and their content come from the `ProductionsLayout` component.
* The H1 "database" heading (`<h1>...</h1>`), episode navigation bar (`...`), and trademark information (`...`) come from the `DoctorWhoLayout` component.
* The H2 "episodes" heading (`<h2>...</h2>`) and episode list (`...`) come from the `Episodes` component.

```html
<header>
    ...
</header>

<nav>
    <a href="main-production-list">Main Production List</a>
    <a href="production-search">Search</a>
    <a href="new-production">Add Production</a>
</nav>

<h1>...</h1>

<nav>
    <a href="main-episode-list">Main Episode List</a>
    <a href="episode-search">Search</a>
    <a href="new-episode">Add Episode</a>
</nav>

<h2>...</h2>

<ul>
    <li>...</li>
    <li>...</li>
    <li>...</li>
</ul>

<div>
    ...
</div>

<footer>
    ...
</footer>
```

## Share a Razor Pages layout with integrated components

When routable components are integrated into a Razor Pages app, the app's shared layout can be used with the components. For more information, see Integrate ASP.NET Core Razor components with MVC or Razor Pages.

## Sections

To control the content in a layout from a child Razor component, see ASP.NET Core Blazor sections.

## Related content

* Layout in ASP.NET Core
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
