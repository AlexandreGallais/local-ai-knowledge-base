---
title: "Build a Blazor movie database app (Part 3 - Learn about Razor components) (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/tutorials/movie-database-app/part-3.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 3 - Learn about Razor components)

This article is the third part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

This part of the tutorial series examines the Razor components in the project that were scaffolded into the app. Improvements are made for the display of movie data.

## Razor components

Blazor apps are based on *Razor components*, often referred to as just *components*. A *component* is an element of UI, such as a page, dialog, or data entry form. Components are .NET C# classes built into .NET assemblies.

*Razor* refers to how components are usually written in the form of a Razor markup page (`.razor` file extension) for client-side UI logic and composition. Razor is a syntax for combining HTML markup with C# code designed for developer productivity.

Although developers and online resources use the term "Blazor components," the documentation uses the formal name "Razor components" (or just "components").

The anatomy of a Razor component has the following general pattern:

* At the top of the component definition (`.razor` file), various Razor directives specify how the component markup is compiled or functions.
* Next, Razor markup specifies how HTML is rendered, which includes ordinary HTML elements.
* Finally, an `@code` block contains C# code to define members for the component class, including component parameters and event handlers.

Consider the following `Welcome` component (`Welcome.razor`):

```razor
@page "/welcome"

<PageTitle>Welcome!</PageTitle>

<h1>Welcome to Blazor!</h1>

<p>@welcomeMessage</p>

@code {
    private string welcomeMessage = "We ❤️ Blazor!";
}
```

The first line represents an important Razor construct in Razor components, a *Razor directive*. A Razor directive is a reserved keyword prefixed with `@` that appears in Razor markup that changes the way component markup is compiled or functions. The `@page` Razor directive specifies the route template for the component. This component is reached in a browser at the relative URL `/welcome`. By convention, most of a component's directives are placed at the top of the component definition file.

The `Microsoft.AspNetCore.Components.Web.PageTitle` component is a component built into the framework that specifies a page title.

"`Welcome to Blazor!`" is the first rendered body markup of the component per the content of the H1 heading element (`<h1>`).

Next, a welcome message is displayed using Razor syntax by prefixing the at symbol (`@`) to a C# variable (`welcomeMessage`).

The `@code` block contains the C# code of the component. `welcomeMessage` is a private string initialized with a value.

In the following sections of this article:

* Three components for webpage navigation and layout are described, the `NavMenu`, `Microsoft.AspNetCore.Components.Routing.NavLink`, and `MainLayout` components.
* The components created by scaffolding for CRUD operations on movie database entities are discussed.

## `NavMenu` component for navigation

The `NavMenu` component (`Components/Layout/NavMenu.razor`) implements sidebar navigation using `Microsoft.AspNetCore.Components.Routing.NavLink` components, which render navigation links to other Razor components.

A `Microsoft.AspNetCore.Components.Routing.NavLink` component behaves like an `` element, except it toggles an `active` CSS class based on whether its `href` matches the current URL. The `active` class helps a user understand which page is the active page among the navigation links displayed. `Microsoft.AspNetCore.Components.Routing.NavLinkMatch.All` assigned to the `Microsoft.AspNetCore.Components.Routing.NavLink.Match` parameter configures the component to display an active CSS class when it matches the entire current URL.

The `Microsoft.AspNetCore.Components.Routing.NavLink` component is built into the Blazor framework for any Blazor app to use, while the `NavMenu` component is only part of Blazor project templates.

`Components/Layout/NavMenu.razor`:

```razor
<script type="module" src="@Assets["Components/Layout/NavMenu.razor.js"]"></script>

<div class="top-row ps-3 navbar navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="">BlazorWebAppMovies</a>
    </div>
</div>

<input type="checkbox" title="Navigation menu" class="navbar-toggler" />

<div id="nav-scrollable" class="nav-scrollable">
    <nav class="nav flex-column">
        <div class="nav-item px-3">
            <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
                <span class="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Home
            </NavLink>
        </div>

        <div class="nav-item px-3">
            <NavLink class="nav-link" href="weather">
                <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Weather
            </NavLink>
        </div>
    </nav>
</div>
```

Notice in the `NavMenu` component's first `` element the brand link text (`` element content). Change the brand from `BlazorWebAppMovies` to `Sci-fi Movies`:

```diff
- <a class="navbar-brand" href="">BlazorWebAppMovies</a>
+ <a class="navbar-brand" href="">Sci-fi Movies</a>
```

To allow users to reach the movies `Index` page, add a navigation menu entry to the `NavMenu` component. Immediately after the markup (``) for the `Weather` component's `NavLink`, add the following markup:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="movies">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Movies
    </NavLink>
</div>
```

The final `NavMenu` component after making the preceding changes:

```razor
<script type="module" src="@Assets["Components/Layout/NavMenu.razor.js"]"></script>

<div class="top-row ps-3 navbar navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="">Sci-fi Movies</a>
    </div>
</div>

<input type="checkbox" title="Navigation menu" class="navbar-toggler" />

<div id="nav-scrollable" class="nav-scrollable">
    <nav class="nav flex-column">
        <div class="nav-item px-3">
            <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
                <span class="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Home
            </NavLink>
        </div>

        <div class="nav-item px-3">
            <NavLink class="nav-link" href="weather">
                <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Weather
            </NavLink>
        </div>

        <div class="nav-item px-3">
            <NavLink class="nav-link" href="movies">
                <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Movies
            </NavLink>
        </div>
    </nav>
</div>
```

Run the app to see the updated brand at the top of the sidebar navigation and a link to reach the movies page (**Movies**):

**vs:**

Stop the app by closing the browser's window.

**vsc:**

Stop the app by closing the browser's window and pressing `Shift`+`F5` on the keyboard in VS Code.

**cli:**

Stop the app by closing the browser's window and pressing `Ctrl`+`C` in the command shell.

## `MainLayout` component for layout

The `MainLayout` component is the app's default layout. The `MainLayout` component inherits `Microsoft.AspNetCore.Components.LayoutComponentBase`, which is a base class for components that represent a layout. The app's components that use the layout are rendered where the `Microsoft.AspNetCore.Components.LayoutComponentBase.Body` (`@Body`) appears in the markup.

`Components/Layout/MainLayout.razor`:

```razor
@inherits LayoutComponentBase

<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <main>
        <div class="top-row px-4">
            <a href="https://learn.microsoft.com/aspnet/core/" target="_blank">About</a>
        </div>

        <article class="content px-4">
            @Body
        </article>
    </main>
</div>
```

The `MainLayout` component adopts the following additional specifications:

* The `NavMenu` component is rendered in the sidebar. Notice that you only need to place an HTML tag with the component name to render a component at that location in Razor markup. This allows you to nest components within each other and within any HTML layout that you implement.
* The `` element's content includes:
  * An **:::no-loc text="About":::** link that sends the user to the ASP.NET Core documentation landing page.
  * An `` element with the `Microsoft.AspNetCore.Components.LayoutComponentBase.Body` (`@Body`) parameter, where components that use the layout are rendered.
  * The error UI (``), where a notice about an unhandled error is displayed.

The default layout (`MainLayout` component) is specified in the `Routes` component (`Components/Routes.razor`):

```razor
<RouteView RouteData="routeData" DefaultLayout="typeof(Layout.MainLayout)" />
```

Individual components are free to set their own non-default layout, and a layout can be applied to whole folder of components via an imports file (`_Imports.razor`) in the same folder. These features are covered in detail in the Blazor documentation.
