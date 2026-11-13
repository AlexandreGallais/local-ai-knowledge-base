---
title: "View components in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/view-components.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# View components in ASP.NET Core

By Rick Anderson

## View components

View components are similar to partial views, but they're much more powerful. View components don't use model binding. They depend on the data passed when calling the view component. This article was written using controllers and views, but view components work with Razor Pages.

A view component:

* Renders a chunk rather than a whole response.
* Includes the same separation-of-concerns and testability benefits found between a controller and view.
* Can have parameters and business logic.
* Is typically invoked from a layout page.

View components are intended anywhere reusable rendering logic that's too complex for a partial view, such as:

* Dynamic navigation menus.
* Tag cloud, where it queries the database.
* Sign in panel.
* Shopping cart.
* Recently published articles.
* Sidebar content on a blog.
* A sign in panel that would be rendered on every page and show either the links to sign out or sign in, depending on the sign in state of the user.

A view component consists of two parts:

* The class, typically derived from `Microsoft.AspNetCore.Mvc.ViewComponent`.
* The result it returns, typically a view.

Like controllers, a view component can be a POCO, but most developers take advantage of the methods and properties available by deriving from `Microsoft.AspNetCore.Mvc.ViewComponent`.

When considering if view components meet an app's specifications, consider using Razor components instead. Razor components also combine markup with C# code to produce reusable UI units. Razor components are designed for developer productivity when providing client-side UI logic and composition. For more information, see ASP.NET Core Razor components. For information on how to incorporate Razor components into an MVC or Razor Pages app, see Integrate ASP.NET Core Razor components with MVC or Razor Pages.

## Create a view component

This section contains the high-level requirements to create a view component. Later in the article, we'll examine each step in detail and create a view component.

### The view component class

Any of the following can create a view component class:

* Deriving from `Microsoft.AspNetCore.Mvc.ViewComponent`.
* Decorating a class with the `[ViewComponent]` attribute, or deriving from a class with the `[ViewComponent]` attribute.
* Creating a class where the name ends with the suffix `ViewComponent`.

Like controllers, view components must be public, non-nested, and non-abstract classes. The view component name is the class name with the `ViewComponent` suffix removed. It can also be explicitly specified using the `Microsoft.AspNetCore.Mvc.ViewComponentAttribute.Name` property.

A view component class:

* Supports constructor dependency injection.
* Doesn't take part in the controller lifecycle, therefore filters can't be used in a view component.

To prevent a class that has a case-insensitive `ViewComponent` suffix from being treated as a view component, decorate the class with the `[NonViewComponent]` attribute:

```csharp
using Microsoft.AspNetCore.Mvc;

[NonViewComponent]
public class ReviewComponent
{
    public string Status(string name) => JobStatus.GetCurrentStatus(name);
}
```

### View component methods

A view component defines its logic in an:

* `InvokeAsync` method that returns `Task<IViewComponentResult>`.
* `Invoke` synchronous method that returns an `Microsoft.AspNetCore.Mvc.IViewComponentResult`.

Parameters come directly from invocation of the view component, not from model binding. A view component never directly handles a request. Typically, a view component initializes a model and passes it to a view by calling the `View` method. In summary, view component methods:

* Define an `InvokeAsync` method that returns a `Task<IViewComponentResult>` or a synchronous `Invoke` method that returns an `IViewComponentResult`.
* Typically initializes a model and passes it to a view by calling the ViewComponent.View method.
* Parameters come from the calling method, not HTTP. There's no model binding.
* Aren't reachable directly as an HTTP endpoint. They're typically invoked in a view. A view component never handles a request.
* Are overloaded on the signature rather than any details from the current HTTP request.

### View search path

The runtime searches for the view in the following paths:

* /Views/{Controller Name}/Components/{View Component Name}/{View Name}
* /Views/Shared/Components/{View Component Name}/{View Name}
* /Pages/Shared/Components/{View Component Name}/{View Name}
* /Areas/{Area Name}/Views/Shared/Components/{View Component Name}/{View Name}

The search path applies to projects using controllers + views and Razor Pages.

The default view name for a view component is `Default`, which means view files will typically be named `Default.cshtml`. A different view name can be specified when creating the view component result or when calling the `View` method.

We recommend naming the view file `Default.cshtml` and using the *Views/Shared/Components/{View Component Name}/{View Name}* path. The `PriorityList` view component used in this sample uses `Views/Shared/Components/PriorityList/Default.cshtml` for the view component view.

### Customize the view search path

To customize the view search path, modify Razor's `Microsoft.AspNetCore.Mvc.Razor.RazorViewEngineOptions.ViewLocationFormats` collection. For example, to search for views within the path `/Components/{View Component Name}/{View Name}`, add a new item to the collection:

```csharp
using Microsoft.EntityFrameworkCore;
using ViewComponentSample.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
    .AddRazorOptions(options =>
    {
        options.ViewLocationFormats.Add("/{0}.cshtml");
    });

builder.Services.AddDbContext<ToDoContext>(options =>
        options.UseInMemoryDatabase("db"));

var app = builder.Build();

// Remaining code removed for brevity.
```

In the preceding code, the placeholder `{0}` represents the path `Components/{View Component Name}/{View Name}`.

## Invoke a view component

To use the view component, call the following inside a view:

```cshtml
@await Component.InvokeAsync("Name of view component",
                             {Anonymous Type Containing Parameters})
```

The parameters are passed to the `InvokeAsync` method. The `PriorityList` view component developed in the article is invoked from the `Views/ToDo/Index.cshtml` view file. In the following code, the `InvokeAsync` method is called with two parameters:

```cshtml
</table>

<div>
    Maximum Priority: @ViewData["maxPriority"] <br />
    Is Complete:  @ViewData["isDone"]
    @await Component.InvokeAsync("PriorityList",
                     new { 
                         maxPriority =  ViewData["maxPriority"],
                         isDone = ViewData["isDone"]  }
                     )
</div>
```

## Invoke a view component as a Tag Helper

A View Component can be invoked as a Tag Helper:

```cshtml
<div>
       Maxium Priority: @ViewData["maxPriority"] <br />
       Is Complete:  @ViewData["isDone"]
    @{
        int maxPriority = Convert.ToInt32(ViewData["maxPriority"]);
        bool isDone = Convert.ToBoolean(ViewData["isDone"]);
    }
    <vc:priority-list max-priority=maxPriority is-done=isDone>
    </vc:priority-list>
</div>
```

Pascal-cased class and method parameters for Tag Helpers are translated into their kebab case. The Tag Helper to invoke a view component uses the `<vc></vc>` element. The view component is specified as follows:

```cshtml
<vc:[view-component-name]
  parameter1="parameter1 value"
  parameter2="parameter2 value">
</vc:[view-component-name]>
```

To use a view component as a Tag Helper, register the assembly containing the view component using the `@addTagHelper` directive. If the view component is in an assembly called `MyWebApp`, add the following directive to the `_ViewImports.cshtml` file:

```cshtml
@addTagHelper *, MyWebApp
```

A view component can be registered as a Tag Helper to any file that references the view component. See Managing Tag Helper Scope for more information on how to register Tag Helpers.

The `InvokeAsync` method used in this tutorial:

```cshtml
@await Component.InvokeAsync("PriorityList",
                 new { 
                     maxPriority =  ViewData["maxPriority"],
                     isDone = ViewData["isDone"]  }
                 )
```

In the preceding markup, the `PriorityList` view component becomes `priority-list`. The parameters to the view component are passed as attributes in kebab case.

### Invoke a view component directly from a controller

View components are typically invoked from a view, but they can be invoked directly from a controller method. While view components don't define endpoints like controllers, a controller action that returns the content of a `ViewComponentResult` can be implemented.

In the following example, the view component is called directly from the controller:

```csharp
public IActionResult IndexVC(int maxPriority = 2, bool isDone = false)
{
    return ViewComponent("PriorityList",
        new { 
           maxPriority = maxPriority,
           isDone = isDone
        });
}
```
