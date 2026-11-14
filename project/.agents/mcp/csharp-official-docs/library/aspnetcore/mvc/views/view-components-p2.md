---
title: "View components in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/views/view-components.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# View components in ASP.NET Core (part 2 of 2)

## Create a basic view component

Download, build, and test the starter code. It's a basic <example-value> with a `ToDo` controller that displays a list of *ToDo* items.

### Update the controller to pass in priority and completion status

Update the `Index` method to use priority and completion status parameters:

```csharp
using Microsoft.AspNetCore.Mvc;
using ViewComponentSample.Models;

namespace ViewComponentSample.Controllers;
public class ToDoController : Controller
{
    private readonly ToDoContext _ToDoContext;

    public ToDoController(ToDoContext context)
    {
        _ToDoContext = context;
        _ToDoContext.Database.EnsureCreated();
    }

    public IActionResult Index(int maxPriority = 2, bool isDone = false)
    {
        var model = _ToDoContext!.ToDo!.ToList();
        ViewData["maxPriority"] = maxPriority;
        ViewData["isDone"] = isDone;
        return View(model);
    }
```

### Add a ViewComponent class

Add a ViewComponent class to `ViewComponents/PriorityListViewComponent.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewComponentSample.Models;

namespace ViewComponentSample.ViewComponents;

public class PriorityListViewComponent : ViewComponent
{
    private readonly ToDoContext db;

    public PriorityListViewComponent(ToDoContext context) => db = context;

    public async Task<IViewComponentResult> InvokeAsync(
                                            int maxPriority, bool isDone)
    {
        var items = await GetItemsAsync(maxPriority, isDone);
        return View(items);
    }

    private Task<List<TodoItem>> GetItemsAsync(int maxPriority, bool isDone)
    {
        return db!.ToDo!.Where(x => x.IsDone == isDone &&
                             x.Priority <= maxPriority).ToListAsync();
    }
}
```

Notes on the code:

* View component classes can be contained in **any** folder in the project.
* Because the class name PriorityList**ViewComponent** ends with the suffix **ViewComponent**, the runtime uses the string `PriorityList` when referencing the class component from a view.
* The  `[ViewComponent]` attribute can change the name used to reference a view component. For example, the class could have been named `XYZ` with the following `[ViewComponent]` attribute:

  ```csharp
  [ViewComponent(Name = "PriorityList")]
     public class XYZ : ViewComponent
     ```

* The `[ViewComponent]` attribute in the preceding code tells the view component selector to use:
  * The name `PriorityList` when looking for the views associated with the component.
  * The string "PriorityList" when referencing the class component from a view.
* The component uses dependency injection to make the data context available.
* `InvokeAsync` exposes a method that can be called from a view, and it can take an arbitrary number of arguments.
* The `InvokeAsync` method returns the set of `ToDo` items that satisfy the `isDone` and `maxPriority` parameters.

### Create the view component Razor view

* Create the *Views/Shared/Components* folder. This folder **must** be named *Components*.
* Create the *Views/Shared/Components/PriorityList* folder. This folder name must match the name of the view component class, or the name of the class minus the suffix. If the `ViewComponent` attribute is used, the class name would need to match the attribute designation.
* Create a `Views/Shared/Components/PriorityList/Default.cshtml` Razor view:

  ```cshtml
﻿@model IEnumerable<ViewComponentSample.Models.TodoItem>

<h3>Priority Items</h3>
<ul>
    @foreach (var todo in Model)
    {
        <li>@todo.Name</li>
    }
</ul>
```

   The Razor view takes a list of `TodoItem` and displays them. If the view component `InvokeAsync` method doesn't pass the name of the view, *Default* is used for the view name by convention. To override the default styling for a specific controller, add a view to the controller-specific view folder (for example *Views/ToDo/Components/PriorityList/Default.cshtml)*.

    If the view component is controller-specific, it can be added to the controller-specific folder. For example, `Views/ToDo/Components/PriorityList/Default.cshtml` is controller-specific.
* Add a `div` containing a call to the priority list component to the bottom of the `Views/ToDo/index.cshtml` file:

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

The markup `@await Component.InvokeAsync` shows the syntax for calling view components. The first argument is the name of the component we want to invoke or call. Subsequent parameters are passed to the component. `InvokeAsync` can take an arbitrary number of arguments.

Test the app. The following image shows the ToDo list and the priority items:

The view component can be called directly from the controller:

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

### Specify a view component name

A complex view component might need to specify a non-default view under some conditions. The following code shows how to specify the "PVC" view  from the `InvokeAsync` method. Update the `InvokeAsync` method in the `PriorityListViewComponent` class.

```csharp
public async Task<IViewComponentResult> InvokeAsync(
                                           int maxPriority, bool isDone)
{
    string MyView = "Default";
    // If asking for all completed tasks, render with the "PVC" view.
    if (maxPriority > 3 && isDone == true)
    {
        MyView = "PVC";
    }
    var items = await GetItemsAsync(maxPriority, isDone);
    return View(MyView, items);
}
```

Copy the `Views/Shared/Components/PriorityList/Default.cshtml` file to a view named `Views/Shared/Components/PriorityList/PVC.cshtml`. Add a heading to indicate the PVC view is being used.

```cshtml
﻿@model IEnumerable<ViewComponentSample.Models.TodoItem>

<h2> PVC Named Priority Component View</h2>
<h4>@ViewBag.PriorityMessage</h4>
<ul>
    @foreach (var todo in Model)
    {
        <li>@todo.Name</li>
    }
</ul>
```

<!-- TODO zz delete me
Update `Views/ToDo/Index.cshtml`:

```cshtml
<div>
    @await Component.InvokeAsync("PriorityList", 
      new { maxPriority = 4, isDone = true })
</div>
```

-->

Run the app and verify PVC view.

If the PVC view isn't rendered, verify the view component with a priority of 4 or higher is called.

### Examine the view path

* Change the priority parameter to three or less so the priority view isn't returned.
* Temporarily rename the `Views/ToDo/Components/PriorityList/Default.cshtml` to `1Default.cshtml`.
* Test the app, the following error occurs:

   ```txt
   An unhandled exception occurred while processing the request.
   InvalidOperationException: The view 'Components/PriorityList/Default' wasn't found. The following locations were searched:
   /Views/ToDo/Components/PriorityList/Default.cshtml
   /Views/Shared/Components/PriorityList/Default.cshtml
   ```

* Copy `Views/ToDo/Components/PriorityList/1Default.cshtml` to `Views/Shared/Components/PriorityList/Default.cshtml`.
* Add some markup to the *Shared* ToDo view component view to indicate the view is from the *Shared* folder.
* Test the **Shared** component view.

### Avoid hard-coded strings

For compile time safety, replace the hard-coded view component name with the class name. Update the *PriorityListViewComponent.cs* file to not use the "ViewComponent" suffix:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewComponentSample.Models;

namespace ViewComponentSample.ViewComponents;

public class PriorityList : ViewComponent
{
    private readonly ToDoContext db;

    public PriorityList(ToDoContext context)
    {
        db = context;
    }

    public async Task<IViewComponentResult> InvokeAsync(
                                               int maxPriority, bool isDone)
    {
        var items = await GetItemsAsync(maxPriority, isDone);
        return View(items);
    }

    private Task<List<TodoItem>> GetItemsAsync(int maxPriority, bool isDone)
    {
        return db!.ToDo!.Where(x => x.IsDone == isDone &&
                             x.Priority <= maxPriority).ToListAsync();
    }
}
```

The view file:

```cshtml
</table>

<div>
    Testing nameof(PriorityList) <br />

    Maxium Priority: @ViewData["maxPriority"] <br />
    Is Complete:  @ViewData["isDone"]
    @await Component.InvokeAsync(nameof(PriorityList),
                     new { 
                         maxPriority =  ViewData["maxPriority"],
                         isDone = ViewData["isDone"]  }
                     )
</div>
```

An overload of `Component.InvokeAsync` method that takes a CLR type uses the `typeof` operator:

```cshtml
</table>

<div>
    Testing typeof(PriorityList) <br />

    Maxium Priority: @ViewData["maxPriority"] <br />
    Is Complete:  @ViewData["isDone"]
    @await Component.InvokeAsync(typeof(PriorityList),
                     new { 
                         maxPriority =  ViewData["maxPriority"],
                         isDone = ViewData["isDone"]  }
                     )
</div>
```

## Perform synchronous work

The framework handles invoking a synchronous `Invoke` method if asynchronous work isn't required. The following method creates a synchronous `Invoke` view component:

```csharp
using Microsoft.AspNetCore.Mvc;
using ViewComponentSample.Models;

namespace ViewComponentSample.ViewComponents
{
    public class PriorityListSync : ViewComponent
    {
        private readonly ToDoContext db;

        public PriorityListSync(ToDoContext context)
        {
            db = context;
        }

        public IViewComponentResult Invoke(int maxPriority, bool isDone)
        {
 
            var x = db!.ToDo!.Where(x => x.IsDone == isDone &&
                                  x.Priority <= maxPriority).ToList();
            return View(x);
        }
    }
}
```

The view component's Razor file:

```cshtml
<div>
    Testing nameof(PriorityList) <br />

    Maxium Priority: @ViewData["maxPriority"] <br />
    Is Complete:  @ViewData["isDone"]
    @await Component.InvokeAsync(nameof(PriorityListSync),
                     new { 
                         maxPriority =  ViewData["maxPriority"],
                         isDone = ViewData["isDone"]  }
                     )
</div>
```

The view component is invoked in a Razor file (for example, `Views/Home/Index.cshtml`) using one of the following approaches:

* `Microsoft.AspNetCore.Mvc.IViewComponentHelper`
* Tag Helper

To use the `Microsoft.AspNetCore.Mvc.IViewComponentHelper` approach, call `Component.InvokeAsync`:

```cshtml
@await Component.InvokeAsync(nameof(PriorityList),
                             new { maxPriority = 4, isDone = true })
```

To use the Tag Helper, register the assembly containing the View Component using the `@addTagHelper` directive (the view component is in an assembly called `MyWebApp`):

```cshtml
@addTagHelper *, MyWebApp
```

Use the view component Tag Helper in the Razor markup file:

```cshtml
<vc:priority-list max-priority="999" is-done="false">
</vc:priority-list>
```

The method signature of `PriorityList.Invoke` is synchronous, but Razor finds and calls the method with `Component.InvokeAsync` in the markup file.

## Additional resources

* View or download sample code (how to download)
* Dependency injection into views
* View Components in Razor Pages
* Why You Should Use View Components, not Partial Views, in ASP.NET Core
