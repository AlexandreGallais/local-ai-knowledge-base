---
title: "ASP.NET Core Blazor routing (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor routing

-->
-->

This article explains Blazor app request routing with guidance on static versus interactive routing, ASP.NET Core endpoint routing integration, navigation events, and route templates and constraints for Razor components.

Routing in Blazor is achieved by providing a route template to each accessible component in the app with an `@page` directive. When a Razor file with an `@page` directive is compiled, the generated class is given a `Microsoft.AspNetCore.Components.RouteAttribute` specifying the route template. At runtime, the router searches for component classes with a `Microsoft.AspNetCore.Components.RouteAttribute` and renders whichever component has a route template that matches the requested URL.

The following `HelloWorld` component uses a route template of `/hello-world`, and the rendered webpage for the component is reached at the relative URL `/hello-world`.

`HelloWorld.razor`:

```razor
@page "/hello-world"

<h1>Hello World!</h1>
```

The preceding component loads in the browser at `/hello-world` regardless of whether or not you add the component to the app's UI navigation as a link.

## Static versus interactive routing

*This section applies to Blazor Web Apps.*

If prerendering is enabled, the Blazor router (`Router` component, `<Router>` in `Routes.razor`) performs static routing to components during static server-side rendering (static SSR). This type of routing is called *static routing*.

When an interactive render mode is assigned to the `Routes` component, the Blazor router becomes interactive after static SSR with static routing on the server. This type of routing is called *interactive routing*.

Static routers use endpoint routing and the HTTP request path to determine which component to render. When the router becomes interactive, it uses the document's URL (the URL in the browser's address bar) to determine which component to render. This means that the interactive router can dynamically change which component is rendered if the document's URL dynamically changes to another valid internal URL, and it can do so without performing an HTTP request to fetch new page content.

Interactive routing also prevents prerendering because new page content isn't requested from the server with a normal page request. For more information, see ASP.NET Core Blazor prerendered state persistence.

## ASP.NET Core endpoint routing integration

*This section applies to Blazor Web Apps operating over a circuit.*

A Blazor Web App is integrated into ASP.NET Core Endpoint Routing. An ASP.NET Core app is configured with endpoints for routable components and the root component to render for those endpoints with `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` in the `Program` file.  The default root component (first component loaded) is the `App` component (`App.razor`):

```csharp
app.MapRazorComponents<App>();
```

## Route templates

The `Microsoft.AspNetCore.Components.Routing.Router` component enables routing to Razor components and is located in the app's `Routes` component (`Components/Routes.razor`).

When a Razor component (`.razor`) with an `@page` directive is compiled, the generated component class is provided a `Microsoft.AspNetCore.Components.RouteAttribute` specifying the component's route template.

When the app starts, the assembly specified as the Router's `AppAssembly` is scanned to gather route information for the app's components that have a `Microsoft.AspNetCore.Components.RouteAttribute`.

At runtime, the `Microsoft.AspNetCore.Components.RouteView` component:

* Receives the `Microsoft.AspNetCore.Components.RouteData` from the `Microsoft.AspNetCore.Components.Routing.Router` along with any route parameters.
* Renders the specified component with its layout, including any further nested layouts.

Optionally specify a `Microsoft.AspNetCore.Components.RouteView.DefaultLayout` parameter with a layout class for components that don't specify a layout with the `@layout` directive. The framework's Blazor project templates specify the `MainLayout` component (`MainLayout.razor`) as the app's default layout. For more information on layouts, see ASP.NET Core Blazor layouts.

Components support multiple route templates using multiple `@page` directives. The following example component loads on requests for `/blazor-route` and `/different-blazor-route`.

`BlazorRoute.razor`:

```razor
@page "/blazor-route"
@page "/different-blazor-route"

<h1>Routing Example</h1>

<p>
    This page is reached at either <code>/blazor-route</code> or 
    <code>/different-blazor-route</code>.
</p>
```

> **Important:**
> For URLs to resolve correctly, the app must include a `<base>` tag (location of `<head>` content) with the app base path specified in the `href` attribute. For more information, see ASP.NET Core Blazor app base path.

As an alternative to specifying the route template as a string literal with the `@page` directive, constant-based route templates can be specified with the `@attribute` directive.

In the following example, the `@page` directive in a component is replaced with the `@attribute` directive and the constant-based route template in `Constants.CounterRoute`, which is set elsewhere in the app to "`/counter`":

```diff
- @page "/counter"
+ @attribute [Route(Constants.CounterRoute)]
```

## Focus an element on navigation

The `Microsoft.AspNetCore.Components.Routing.FocusOnNavigate` component sets the UI focus to an element based on a CSS selector after navigating from one page to another.

```razor
<FocusOnNavigate RouteData="routeData" Selector="h1" />
```

When the `Microsoft.AspNetCore.Components.Routing.Router` component navigates to a new page, the `Microsoft.AspNetCore.Components.Routing.FocusOnNavigate` component sets the focus to the page's top-level header (`<h1>`). This is a common strategy for ensuring that a page navigation is announced when using a screen reader.

## Provide custom content when content isn't found

For requests where content isn't found, a Razor component can be assigned to `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage`. The parameter works in concert with `NavigationManager.NotFound`, a method called in developer code that triggers a Not Found response.

The Blazor project template includes a `NotFound.razor` page. This page automatically renders whenever `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called, making it possible to handle missing routes with a consistent user experience.

`NotFound.razor`:

```razor
@page "/not-found"
@layout MainLayout

<h3>Not Found</h3>
<p>Sorry, the content you are looking for does not exist.</p>
```

The `NotFound` component is assigned to the router's `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage` parameter, which supports routing that can be used across status code pages re-execution middleware, including non-Blazor middleware.

In the following example, the preceding `NotFound` component is present in the app's `Pages` folder and passed to the `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage` parameter:

```razor
<Router AppAssembly="@typeof(Program).Assembly" NotFoundPage="typeof(Pages.NotFound)">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
</Router>
```

For more information, see the next article on ASP.NET Core Blazor navigation.

## Route to components from multiple assemblies

*This section applies to Blazor Web Apps.*

Use the `Microsoft.AspNetCore.Components.Routing.Router` component's `Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies` parameter and the endpoint convention builder `Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilderExtensions.AddAdditionalAssemblies*` to discover routable components in additional assemblies. The following subsections explain when and how to use each API.

### Static routing

To discover routable components from additional assemblies for static server-side rendering (static SSR), even if the router later becomes interactive for interactive rendering, the assemblies must be disclosed to the Blazor framework. Call the `Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilderExtensions.AddAdditionalAssemblies*` method with the additional assemblies chained to `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` in the server project's `Program` file.

The following example includes the routable components in the `BlazorSample.Client` project's assembly using the project's imports file (`_Imports.razor`):

```csharp
app.MapRazorComponents<App>()
    .AddAdditionalAssemblies(typeof(BlazorSample.Client._Imports).Assembly);
```

> **Note:**
> The preceding guidance also applies in component class library scenarios. Additional important guidance for class libraries and static SSR is found in ASP.NET Core Razor class libraries (RCLs) with static server-side rendering (static SSR).

### Interactive routing

An interactive render mode can be assigned to the `Routes` component (`Routes.razor`) that makes the Blazor router become interactive after static SSR and static routing on the server. For example, `<Routes @rendermode="InteractiveServer" />` assigns interactive server-side rendering (interactive SSR) to the `Routes` component. The `Router` component inherits interactive server-side rendering (interactive SSR) from the `Routes` component. The router becomes interactive after static routing on the server.

Internal navigation for interactive routing doesn't involve requesting new page content from the server. Therefore, prerendering doesn't occur for internal page requests. For more information, see ASP.NET Core Blazor prerendered state persistence.

If the `Routes` component is defined in the server project, the `Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies` parameter of the `Router` component should include the `.Client` project's assembly. This allows the router to work correctly when rendered interactively.

In the following example, the `Routes` component is in the server project, and the imports file (`_Imports.razor`) of the `BlazorSample.Client` project indicates the assembly to search for routable components:

```razor
<Router
    AppAssembly="..."
    AdditionalAssemblies="[ typeof(BlazorSample.Client._Imports).Assembly ]">
    ...
</Router>
```

Additional assemblies are scanned in addition to the assembly specified to `Microsoft.AspNetCore.Components.Routing.Router.AppAssembly`.

> **Note:**
> The preceding guidance also applies in component class library scenarios.

Alternatively, routable components only exist in the `.Client` project with global Interactive WebAssembly or Auto rendering applied, and the `Routes` component is defined in the `.Client` project, not the server project. In this case, there aren't external assemblies with routable components, so it isn't necessary to specify a value for `Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies`.

## Route parameters

The router uses route parameters to populate the corresponding component parameters with the same name. Route parameter names are case insensitive. In the following example, the `text` parameter assigns the value of the route segment to the component's `Text` property. When a request is made for `/route-parameter-1/amazing`, the content is rendered as `Blazor is amazing!`.

`RouteParameter1.razor`:

```razor
@page "/route-parameter-1/{text}"

<h1>Route Parameter Example 1</h1>

<p>Blazor is @Text!</p>

@code {
    [Parameter]
    public string? Text { get; set; }
}
```

Optional parameters are supported. In the following example, the `text` optional parameter assigns the value of the route segment to the component's `Text` property. If the segment isn't present, the value of `Text` is set to `fantastic`.

`RouteParameter2.razor`:

```razor
@page "/route-parameter-2/{text?}"

<h1>Route Parameter Example 2</h1>

<p>Blazor is @Text!</p>

@code {
    [Parameter]
    public string? Text { get; set; }

    protected override void OnParametersSet() => Text = Text ?? "fantastic";
}
```

When the `OnInitialized{Async}` lifecycle method is used instead of the `OnParametersSet{Async}` lifecycle method, the default assignment of the `Text` property to `fantastic` doesn't occur if the user navigates within the same component. For example, this situation arises when the user navigates from `/route-parameter-2/amazing` to `/route-parameter-2`. As the component instance persists and accepts new parameters, the `OnInitialized` method isn't invoked again.

> **Note:**
> Route parameters can't be typed as a C# union. The router parses route segments as strings and converts them to the target type without JSON parsing, so it can't dispatch to a union case.

## Route constraints

A route constraint enforces type matching on a route segment to a component.

In the following example, the route to the `User` component only matches if:

* An `Id` route segment is present in the request URL.
* The `Id` segment is an integer (`int`) type.

`User.razor`:

```razor
@page "/user/{Id:int}"

<h1>User Example</h1>

<p>User Id: @Id</p>

@code {
    [Parameter]
    public int Id { get; set; }
}
```

The route constraints shown in the following table are available. For the route constraints that match the invariant culture, see the warning below the table for more information.

Constraint | Example | Example Matches | Invariantculturematching
--- | --- | --- | :---:
`bool` | `{active:bool}` | `true`, `FALSE` | No
`datetime` | `{dob:datetime}` | `2016-12-31`, `2016-12-31 7:32pm` | Yes
`decimal` | `{price:decimal}` | `49.99`, `-1,000.01` | Yes
`double` | `{weight:double}` | `1.234`, `-1,001.01e8` | Yes
`float` | `{weight:float}` | `1.234`, `-1,001.01e8` | Yes
`guid` | `{id:guid}` | `00001111-aaaa-2222-bbbb-3333cccc4444`, `{00001111-aaaa-2222-bbbb-3333cccc4444}` | No
`int` | `{id:int}` | `123456789`, `-123456789` | Yes
`long` | `{ticks:long}` | `123456789`, `-123456789` | Yes
`nonfile` | `{parameter:nonfile}` | Not `BlazorSample.styles.css`, not `favicon.ico` | Yes

> **Warning:**
> Route constraints that verify the URL and are converted to a CLR type (such as `int` or `System.DateTime`) always use the invariant culture. These constraints assume that the URL is non-localizable.

Route constraints also work with optional parameters. In the following example, `Id` is required, but `Option` is an optional boolean route parameter.

`User.razor`:

```razor
@page "/user/{id:int}/{option:bool?}"

<p>
    Id: @Id
</p>

<p>
    Option: @Option
</p>

@code {
    [Parameter]
    public int Id { get; set; }

    [Parameter]
    public bool Option { get; set; }
}
```
