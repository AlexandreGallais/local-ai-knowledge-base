---
title: "Razor syntax reference for ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/views/razor.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor syntax reference for ASP.NET Core (part 2 of 3)

## Directives

Razor directives are represented by implicit expressions with reserved keywords following the `@` symbol. A directive typically changes the way a view is compiled or functions.

Understanding how Razor generates code for a view makes it easier to understand how directives work.

```cshtml
﻿@{
    var quote = "Getting old ain't for wimps! - Anonymous";
}

<div>Quote of the Day: @quote</div>
```

The code generates a class similar to the following:

```csharp
public class _Views_Something_cshtml : RazorPage<dynamic>
{
    public override async Task ExecuteAsync()
    {
        var output = "Getting old ain't for wimps! - Anonymous";

        WriteLiteral("/r/n<div>Quote of the Day: ");
        Write(output);
        WriteLiteral("</div>");
    }
}
```

Later in this article, the section Inspect the Razor C# class generated for a view explains how to view this generated class.

### `@attribute`

The `@attribute` directive adds the given attribute to the class of the generated page or view. The following example adds the `[Authorize]` attribute:

```razor
@attribute [Authorize]
```

The `@attribute` directive can also be used to supply a constant-based route template in a Razor component. In the following example, the `@page` directive in a component is replaced with the `@attribute` directive and the constant-based route template in `Constants.CounterRoute`, which is set elsewhere in the app to "`/counter`":

```diff
- @page "/counter"
+ @attribute [Route(Constants.CounterRoute)]
```

### `@code`

*This scenario only applies to Razor components (`.razor`).*

The `@code` block enables a Razor component to add C# members (fields, properties, and methods) to a component:

```razor
@code {
    // C# members (fields, properties, and methods)
}
```

For Razor components, `@code` is an alias of `@functions` and recommended over `@functions`. More than one `@code` block is permissible.

### `@functions`

The `@functions` directive enables adding C# members (fields, properties, and methods) to the generated class:

```razor
@functions {
    // C# members (fields, properties, and methods)
}
```

In Razor components, use `@code` over `@functions` to add C# members.

For example:

```cshtml
﻿@functions {
    public string GetHello()
    {
        return "Hello";
    }
}

<div>From method: @GetHello()</div> 
```

The code generates the following HTML markup:

```html
<div>From method: Hello</div>
```

The following code is the generated Razor C# class:

```csharp
﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor;

public class _Views_Home_Test_cshtml : RazorPage<dynamic>
{
    // Functions placed between here 
    public string GetHello()
    {
        return "Hello";
    }
    // And here.
#pragma warning disable 1998
    public override async Task ExecuteAsync()
    {
        WriteLiteral("\r\n<div>From method: ");
        Write(GetHello());
        WriteLiteral("</div>\r\n");
    }
#pragma warning restore 1998
```

`@functions` methods serve as templating methods when they have markup:

```razor
@{
    RenderName("Mahatma Gandhi");
    RenderName("Martin Luther King, Jr.");
}

@functions {
    private void RenderName(string name)
    {
        <p>Name: <strong>@name</strong></p>
    }
}
```

The code renders the following HTML:

```html
<p>Name: <strong>Mahatma Gandhi</strong></p>
<p>Name: <strong>Martin Luther King, Jr.</strong></p>
```

### `@implements`

The `@implements` directive implements an interface for the generated class.

The following example implements `System.IDisposable` so that the `System.IDisposable.Dispose*` method can be called:

```razor
@implements IDisposable

<h1>Example</h1>

@functions {
    private bool _isDisposed;

    ...

    public void Dispose() => _isDisposed = true;
}
```

### `@inherits`

The `@inherits` directive provides full control of the class the view inherits:

```razor
@inherits TypeNameOfClassToInheritFrom
```

The following code is a custom Razor page type:

```csharp
﻿using Microsoft.AspNetCore.Mvc.Razor;

public abstract class CustomRazorPage<TModel> : RazorPage<TModel>
{
    public string CustomText { get; } = 
        "Gardyloo! - A Scottish warning yelled from a window before dumping" +
        "a slop bucket on the street below.";
}
```

The `CustomText` is displayed in a view:

```cshtml
﻿@inherits CustomRazorPage<TModel>

<div>Custom text: @CustomText</div>
```

The code renders the following HTML:

```html
<div>
    Custom text: Gardyloo! - A Scottish warning yelled from a window before dumping
    a slop bucket on the street below.
</div>
```

 `@model` and `@inherits` can be used in the same view. `@inherits` can be in a `_ViewImports.cshtml` file that the view imports:

```cshtml
﻿@inherits CustomRazorPage<TModel>
```

The following code is an example of a strongly-typed view:

```cshtml
﻿@inherits CustomRazorPage<TModel>

<div>The Login Email: @Model.Email</div>
<div>Custom text: @CustomText</div>
```

If "user@example.com" is passed in the model, the view generates the following HTML markup:

```html
<div>The Login Email: user@example.com</div>
<div>
    Custom text: Gardyloo! - A Scottish warning yelled from a window before dumping
    a slop bucket on the street below.
</div>
```

### `@inject`

The `@inject` directive enables the Razor Page to inject a service from the service container into a view. For more information, see Dependency injection into views.

### `@layout`

*This scenario only applies to Razor components (`.razor`).*

The `@layout` directive specifies a layout for routable Razor components that have an `@page` directive. Layout components are used to avoid code duplication and inconsistency. For more information, see ASP.NET Core Blazor layouts.

### `@model`

*This scenario only applies to MVC views and Razor Pages (`.cshtml`).*

The `@model` directive specifies the type of the model passed to a view or page:

```razor
@model TypeNameOfModel
```

In an ASP.NET Core MVC or Razor Pages app created with individual accounts, `Views/Account/Login.cshtml` contains the following model declaration:

```razor
@model LoginViewModel
```

The class generated inherits from `RazorPage<LoginViewModel>`:

```csharp
public class _Views_Account_Login_cshtml : RazorPage<LoginViewModel>
```

Razor exposes a `Model` property for accessing the model passed to the view:

```razor
<div>The Login Email: @Model.Email</div>
```

The `@model` directive specifies the type of the `Model` property. The directive specifies the `T` in `RazorPage<T>` that the generated class that the view derives from. If the `@model` directive isn't specified, the `Model` property is of type `dynamic`. For more information, see Strongly typed models and the @model keyword.

### `@namespace`

The `@namespace` directive:

* Sets the namespace of the class of the generated Razor page, MVC view, or Razor component.
* Sets the root derived namespaces of a pages, views, or components classes from the closest imports file in the directory tree, `_ViewImports.cshtml` (views or pages) or `_Imports.razor` (Razor components).

```razor
@namespace Your.Namespace.Here
```

For the Razor Pages example shown in the following table.

* Each page imports `Pages/_ViewImports.cshtml`.
* `Pages/_ViewImports.cshtml` contains `@namespace Hello.World`.
* Each page has `Hello.World` as the root of it's namespace.

| Page                                        | Namespace                             |
| ------------------------------------------- | ------------------------------------- |
| `Pages/Index.cshtml`                        | `Hello.World`                         |
| `Pages/MorePages/Page.cshtml`               | `Hello.World.MorePages`               |
| `Pages/MorePages/EvenMorePages/Page.cshtml` | `Hello.World.MorePages.EvenMorePages` |

The preceding relationships apply to import files used with MVC views and Razor components.

When multiple import files have a `@namespace` directive, the file closest to the page, view, or component in the directory tree is used to set the root namespace.

If the `EvenMorePages` folder in the preceding example has an imports file with `@namespace Another.Planet` (or the `Pages/MorePages/EvenMorePages/Page.cshtml` file contains `@namespace Another.Planet`), the result is shown in the following table.

| Page                                        | Namespace               |
| ------------------------------------------- | ----------------------- |
| `Pages/Index.cshtml`                        | `Hello.World`           |
| `Pages/MorePages/Page.cshtml`               | `Hello.World.MorePages` |
| `Pages/MorePages/EvenMorePages/Page.cshtml` | `Another.Planet`        |

### `@page`

The `@page` directive has different effects depending on the type of the file where it appears. The directive:

* In a `.cshtml` file indicates that the file is a Razor Page. For more information, see Custom routes and Razor Pages architecture and concepts in ASP.NET Core.
* Specifies that a Razor component should handle requests directly. For more information, see ASP.NET Core Blazor routing.

### `@preservewhitespace`

*This scenario only applies to Razor components (`.razor`).*

When set to `false` (default), whitespace in the rendered markup from Razor components (`.razor`) is removed if:

* Leading or trailing within an element.
* Leading or trailing within a `RenderFragment` parameter. For example, child content passed to another component.
* It precedes or follows a C# code block, such as `@if` or `@foreach`.

### `@rendermode`

*This scenario only applies to Razor components (`.razor`).*

Sets the render mode of a Razor component:

* `InteractiveServer`: Applies interactive server rendering using Blazor Server.
* `InteractiveWebAssembly`: Applies interactive WebAssembly rendering using Blazor WebAssembly.
* `InteractiveAuto`: Initially applies interactive WebAssembly rendering using Blazor Server, and then applies interactive WebAssembly rendering using WebAssembly on subsequent visits after the Blazor bundle is downloaded.

For a component instance:

```razor
<... @rendermode="InteractiveServer" />
```

In the component definition:

```razor
@rendermode InteractiveServer
```

> **Note:**
> Blazor templates include a static `using` directive for `Microsoft.AspNetCore.Components.Web.RenderMode` in the app's imports file (`Components/_Imports.razor`) for shorter `@rendermode` syntax:
>
> ```razor
> @using static Microsoft.AspNetCore.Components.Web.RenderMode
> ```
>
> Without the preceding directive, components must specify the static `Microsoft.AspNetCore.Components.Web.RenderMode` class in `@rendermode` syntax explicitly:
>
> ```razor
> <Dialog @rendermode="RenderMode.InteractiveServer" />
> ```

For more information, including guidance on disabling prerendering with the directive/directive attribute, see ASP.NET Core Blazor render modes.

### `@section`

*This scenario only applies to MVC views and Razor Pages (`.cshtml`).*

The `@section` directive is used in conjunction with MVC and Razor Pages layouts to enable views or pages to render content in different parts of the HTML page. For more information, see Layout in ASP.NET Core.

### `@typeparam`

*This scenario only applies to Razor components (`.razor`).*

The `@typeparam` directive declares a generic type parameter for the generated component class:

```razor
@typeparam TEntity
```

Generic types with `where` type constraints are supported:

```razor
@typeparam TEntity where TEntity : IEntity
```

For more information, see the following articles:

* ASP.NET Core Razor component generic type support
* ASP.NET Core Blazor templated components

### `@using`

The `@using` directive adds the C# `using` directive to the generated view:

```cshtml
﻿@using System.IO
@{
    var dir = Directory.GetCurrentDirectory();
}
<p>@dir</p>
```

In Razor components, `@using` also controls which components are in scope.

## Directive attributes

Razor directive attributes are represented by implicit expressions with reserved keywords following the `@` symbol. A directive attribute typically changes the way an element is compiled or functions.

### `@attributes`

*This scenario only applies to Razor components (`.razor`).*

`@attributes` allows a component to render non-declared attributes. For more information, see ASP.NET Core Blazor attribute splatting and arbitrary parameters.

### `@bind`

*This scenario only applies to Razor components (`.razor`).*

Data binding in components is accomplished with the `@bind` attribute. For more information, see ASP.NET Core Blazor data binding.

### `@bind:culture`

*This scenario only applies to Razor components (`.razor`).*

Use the `@bind:culture` attribute with the `@bind` attribute to provide a `System.Globalization.CultureInfo` for parsing and formatting a value. For more information, see ASP.NET Core Blazor globalization and localization.

### `@formname`

*This scenario only applies to Razor components (`.razor`).*

`@formname` assigns a form name to a Razor component's plain HTML form or a form based on `Microsoft.AspNetCore.Components.Forms.EditForm` (`Editform` documentation). The value of `@formname` should be unique, which prevents form collisions in the following situations:

* A form is placed in a component with multiple forms.
* A form is sourced from an external class library, commonly a NuGet package, for a component with multiple forms, and the app author doesn't control the source code of the library to set a different external form name than a name used by another form in the component.

For more information and examples, see ASP.NET Core Blazor forms overview.

### `@on{EVENT}`

*This scenario only applies to Razor components (`.razor`).*

Razor provides event handling features for components. For more information, see ASP.NET Core Blazor event handling.

### `@on{EVENT}:preventDefault`

*This scenario only applies to Razor components (`.razor`).*

Prevents the default action for the event.

### `@on{EVENT}:stopPropagation`

*This scenario only applies to Razor components (`.razor`).*

Stops event propagation for the event.

### `@key`

*This scenario only applies to Razor components (`.razor`).*

The `@key` directive attribute causes the components diffing algorithm to guarantee preservation of elements or components based on the key's value. For more information, see Retain element, component, and model relationships in ASP.NET Core Blazor.

### `@ref`

*This scenario only applies to Razor components (`.razor`).*

Component references (`@ref`) provide a way to reference a component instance so that you can issue commands to that instance. For more information, see ASP.NET Core Razor components.
