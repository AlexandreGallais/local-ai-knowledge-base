---
title: "ASP.NET Core Razor components (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor components (part 2 of 6)

## Component classes

Components are implemented using a combination of C# and HTML markup in Razor component files with the `.razor` file extension.

`Microsoft.AspNetCore.Components.ComponentBase` is the base class for components described by Razor component files. `Microsoft.AspNetCore.Components.ComponentBase` implements the lowest abstraction of components, the `Microsoft.AspNetCore.Components.IComponent` interface. `Microsoft.AspNetCore.Components.ComponentBase` defines component properties and methods for basic <example-value>, for example, to process a set of built-in component lifecycle events.

`ComponentBase` in `dotnet/aspnetcore` reference source: The reference source contains additional remarks on the built-in lifecycle events. However, keep in mind that the internal implementations of component features are subject to change at any time without notice.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Developers typically create Razor components from Razor component files (`.razor`) or base their components on `Microsoft.AspNetCore.Components.ComponentBase`, but components can also be built by implementing `Microsoft.AspNetCore.Components.IComponent`. Developer-built components that implement `Microsoft.AspNetCore.Components.IComponent` can take low-level control over rendering at the cost of having to manually trigger rendering with events and lifecycle methods that the developer must create and maintain.

Additional conventions adopted by Blazor documentation example code and sample apps is found in ASP.NET Core Blazor fundamentals.

### Razor syntax

Components use Razor syntax. Two Razor features are extensively used by components, *directives* and *directive attributes*. These are reserved keywords prefixed with `@` that appear in Razor markup:

* Directives: Change the way component markup is compiled or functions. For example, the `@page` directive specifies a routable component with a route template that can be reached directly by a user's request in the browser at a specific URL.

  By convention, a component's directives at the top of a component definition (`.razor` file) are placed in a consistent order. For repeated directives, directives are placed alphabetically by namespace or type, except `@using` directives, which have special second-level ordering.

  The following order is adopted by Blazor sample apps and documentation. Components provided by a Blazor project template may differ from the following order and use a different format. For example, Blazor framework Identity components include blank lines between blocks of `@using` directives and blocks of `@inject` directives. You're free to use a custom ordering scheme and format in your own apps.

  Documentation and sample app Razor directive order:

  * `@page`
  * `@rendermode` (.NET 8 or later)
  * `@using`
    * `System` namespaces (alphabetical order)
    * `Microsoft` namespaces (alphabetical order)
    * Third-party API namespaces (alphabetical order)
    * App namespaces (alphabetical order)
  * Other directives (alphabetical order)

  > **Note:**
  > A *render mode* is only applied in Blazor Web Apps and includes modes that establish user interactivity with the rendered component. For more information, see ASP.NET Core Blazor render modes.

  No blank lines appear among the directives. One blank line appears between the directives and the first line of Razor markup.

  Example:

  ```razor
  @page "/doctor-who-episodes/{season:int}"
  @rendermode InteractiveWebAssembly
  @using System.Globalization
  @using System.Text.Json
  @using Microsoft.AspNetCore.Localization
  @using Mandrill
  @using BlazorSample.Components.Layout
  @attribute [Authorize]
  @implements IAsyncDisposable
  @inject IJSRuntime JS
  @inject ILogger<DoctorWhoEpisodes> Logger

  <PageTitle>Doctor Who Episode List</PageTitle>

  ...
  ```

* Directive attributes: Change the way a component element is compiled or functions.

  Example:

  ```razor
  <input @bind="episodeId" />
  ```

  You can prefix directive attribute values with the at symbol (`@`) for non-explicit Razor expressions (`@bind="@episodeId"`), but we don't recommend it, and the docs don't adopt the approach in examples.

Directives and directive attributes used in components are explained further in this article and other articles of the Blazor documentation set. For general information on Razor syntax, see Razor syntax reference for ASP.NET Core.

### Component name, class name, and namespace

A component's name must start with an uppercase character:

✔️Supported: `ProductDetail.razor`

❌Unsupported: `productDetail.razor`

Common Blazor naming conventions used throughout the Blazor documentation include:

* File paths and file names use Pascal case&dagger; and appear before showing code examples. If a path is present, it indicates the typical folder location. For example, `Components/Pages/ProductDetail.razor` indicates that the `ProductDetail` component has a file name of `ProductDetail.razor` and resides in the `Pages` folder of the `Components` folder of the app.
* Component file paths for routable components match their URLs in kebab case&Dagger; with hyphens appearing between words in a component's route template. For example, a `ProductDetail` component with a route template of `/product-detail` (`@page "/product-detail"`) is requested in a browser at the relative URL `/product-detail`.

&dagger;Pascal case (upper camel case) is a naming convention without spaces and punctuation and with the first letter of each word capitalized, including the first word.
&Dagger;Kebab case is a naming convention without spaces and punctuation that uses lowercase letters and dashes between words.

Components are ordinary C# classes and can be placed anywhere within a project. Components that produce webpages usually reside in the `Components/Pages` folder. Non-page components are frequently placed in the `Components` folder or a custom folder added to the project.

Typically, a component's namespace is derived from the app's root namespace and the component's location (folder) within the app. If the app's root namespace is `BlazorSample` and the `Counter` component resides in the `Components/Pages` folder:

* The `Counter` component's namespace is `BlazorSample.Components.Pages`.
* The fully qualified type name of the component is `BlazorSample.Components.Pages.Counter`.

For custom folders that hold components, add an `@using` directive to the parent component or to the app's imports file (`_Imports.razor`). The following example makes components in the `AdminComponents` folder available:

```razor
@using BlazorSample.AdminComponents
```

> **Note:**
> `@using` directives in the imports file (`_Imports.razor`) are only applied to Razor files (`.razor`), not C# files (`.cs`).

Aliased `using` statements are supported. In the following example, the public `WeatherForecast` class of the `GridRendering` component is made available as `WeatherForecast` in a component elsewhere in the app:

```razor
@using WeatherForecast = Components.Pages.GridRendering.WeatherForecast
```

Components can also be referenced using their fully qualified names, which doesn't require an `@using` directive. The following example directly references the `ProductDetail` component in the `AdminComponents/Pages` folder of the app:

```razor
<BlazorSample.AdminComponents.Pages.ProductDetail />
```

The namespace of a component authored with Razor is based on the following (in priority order):

* The `@namespace` directive in the Razor file's markup (for example, `@namespace BlazorSample.CustomNamespace`).
* The project's `RootNamespace` in the project file (for example, `<RootNamespace>BlazorSample</RootNamespace>`).
* The project namespace and the path from the project root to the component. For example, the framework resolves `{PROJECT NAMESPACE}/Components/Pages/Home.razor` with a project namespace of `BlazorSample` to the namespace `BlazorSample.Components.Pages` for the `Home` component. `{PROJECT NAMESPACE}` is the project namespace. Components follow C# name binding rules. For the `Home` component in this example, the components in scope are all of the components:
  * In the same folder, `Components/Pages`.
  * The components in the project's root that don't explicitly specify a different namespace.

The following are **not** supported:

* The `global::` qualification.
* Partially-qualified names. For example, you can't add `@using BlazorSample.Components` to a component and then reference the `NavMenu` component in the app's `Components/Layout` folder (`Components/Layout/NavMenu.razor`) with `<Layout.NavMenu></Layout.NavMenu>`.

### Partial class support

Components are generated as C# partial classes and are authored using either of the following approaches:

* A single file contains C# code defined in one or more `@code` blocks, HTML markup, and Razor markup. Blazor project templates define their components using this single-file approach.
* HTML and Razor markup are placed in a Razor file (`.razor`). C# code is placed in a code-behind file defined as a partial class (`.cs`).

> **Note:**
> A component stylesheet that defines component-specific styles is a separate file (`.css`). Blazor CSS isolation is described later in ASP.NET Core Blazor CSS isolation.

The following example shows the default `Counter` component with an `@code` block in an app generated from a Blazor project template. Markup and C# code are in the same file. This is the most common approach taken in component authoring.

`Counter.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Counter.razor._
The following `Counter` component splits presentation HTML and Razor markup from the C# code using a code-behind file with a partial class. Splitting the markup from the C# code is favored by some organizations and developers to organize their component code to suit how they prefer to work. For example, the organization's UI expert can work on the presentation layer independently of another developer working on the component's C# logic. The approach is also useful when working with automatically-generated code or source generators. For more information, see Partial Classes and Methods (C# Programming Guide).

`CounterPartialClass.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CounterPartialClass.razor._
`CounterPartialClass.razor.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CounterPartialClass.razor.cs._
`@using` directives in the imports file (`_Imports.razor`) are only applied to Razor files (`.razor`), not C# files (`.cs`). Add namespaces to a partial class file as needed.

Typical namespaces used by components:

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Sections
using Microsoft.AspNetCore.Components.Web;
using static Microsoft.AspNetCore.Components.Web.RenderMode;
using Microsoft.AspNetCore.Components.Web.Virtualization;
using Microsoft.JSInterop;
```

Typical namespaces also include the namespace of the app and the namespace corresponding to the app's `Components` folder:

```csharp
using BlazorSample;
using BlazorSample.Components;
```

Additional folders can also be included, such as the `Layout` folder:

```razor
using BlazorSample.Components.Layout;
```

### Specify a base class

The `@inherits` directive is used to specify a base class for a component. Unlike using partial classes, which only split markup from C# logic, using a base class allows you to inherit C# code for use across a group of components that share the base class's properties and methods. Using base classes reduce code redundancy in apps and are useful when supplying base code from class libraries to multiple apps. For more information, see Inheritance in C# and .NET.

In the following example, the `BlazorRocksBase1` base class derives from `Microsoft.AspNetCore.Components.ComponentBase`.

`BlazorRocks1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/BlazorRocks1.razor._
`BlazorRocksBase1.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/BlazorRocksBase1.cs._
### Markup

A component's UI is defined using Razor syntax, which consists of Razor markup, C#, and HTML. When an app is compiled, the HTML markup and C# rendering logic are converted into a component class. The name of the generated class matches the name of the file.

Members of the component class are defined in one or more `@code` blocks. In `@code` blocks, component state is specified and processed with C#:

* Property and field initializers.
* Parameter values from arguments passed by parent components and route parameters.
* Methods for user event handling, lifecycle events, and custom component logic.

Component members are used in rendering logic using C# expressions that start with the `@` symbol. For example, a C# field is rendered by prefixing `@` to the field name. The following `Markup` component evaluates and renders:

* `headingFontStyle` for the CSS property value `font-style` of the heading element.
* `headingText` for the content of the heading element.

`Markup.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Markup.razor._
> **Note:**
> Examples throughout the Blazor documentation specify the `private` access modifier for private members. Private members are scoped to a component's class. However, C# assumes the `private` access modifier when no access modifier is present, so explicitly marking members "`private`" in your own code is optional. For more information on access modifiers, see Access Modifiers (C# Programming Guide).

The Blazor framework processes a component internally as a *render tree*, which is the combination of a component's DOM and Cascading Style Sheet Object Model (CSSOM). After the component is initially rendered, the component's render tree is regenerated in response to events. Blazor compares the new render tree against the previous render tree and applies any modifications to the browser's DOM for display. For more information, see ASP.NET Core Razor component rendering.

Razor syntax for C# control structures, directives, and directive attributes are lowercase (examples: `@if`, `@code`, `@bind`). Property names are uppercase (example: `@Body` for `Microsoft.AspNetCore.Components.LayoutComponentBase.Body`).
