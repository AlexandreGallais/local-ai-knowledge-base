---
title: "Part 6, Razor Pages with EF Core in ASP.NET Core - Read Related Data (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/read-related-data.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 6, Razor Pages with EF Core in ASP.NET Core - Read Related Data

By Tom Dykstra, Jon P Smith, and Rick Anderson

The Contoso University web app demonstrates how to create Razor Pages web apps using EF Core and Visual Studio. For information about the tutorial series, see the first tutorial.

If you run into problems you can't solve, download the completed app and compare that code to what you created by following the tutorial.

This tutorial shows how to read and display related data. Related data is data that EF Core loads into navigation properties.

The following illustrations show the completed pages for this tutorial:

## Eager, explicit, and lazy loading

EF Core can load related data into the navigation properties of an entity in several ways:

* Eager loading. Eager loading is when a query for one type of entity also loads related entities. When you read an entity, EF Core retrieves its related data. This approach typically results in a single join query that retrieves all of the data you need. EF Core issues multiple queries for some types of eager loading. Issuing multiple queries can be more efficient than a large single query. Specify eager loading with the `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.Include*` and `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.ThenInclude*` methods.

  Eager loading sends multiple queries when a collection navigation is included:

  * One query for the main query
  * One query for each collection "edge" in the load tree.

* Separate queries with `Load`: You can retrieve the data in separate queries, and EF Core "fixes up" the navigation properties. "Fixes up" means that EF Core automatically populates the navigation properties. Separate queries with `Load` is more like explicit loading than eager loading.

  **Note:** EF Core automatically fixes up navigation properties to any other entities that it previously loaded into the context instance. Even if you don't explicitly include the data for a navigation property, the property might still be populated if some or all of the related entities were previously loaded.

* Explicit loading. When you first read the entity, EF Core doesn't retrieve related data. You must write code to retrieve the related data when it's needed. Explicit loading with separate queries results in multiple queries sent to the database. With explicit loading, you specify the navigation properties to load. Use the `Load` method to do explicit loading. For example:

* Lazy loading. When you first read the entity, EF Core doesn't retrieve related data. The first time you access a navigation property, EF Core automatically retrieves the data required for that navigation property. EF Core sends a query to the database each time you access a navigation property for the first time. Lazy loading can hurt performance, for example when developers use N+1 queries. N+1 queries load a parent and enumerate through children.

## Create Course pages

The `Course` entity includes a navigation property that contains the related `Department` entity.

To display the name of the assigned department for a course:

* Load the related `Department` entity into the `Course.Department` navigation property.
* Get the name from the `Department` entity's `Name` property.

# Visual Studio

* Follow the instructions in Scaffold Student pages with the following exceptions:

  * Create a *Pages/Courses* folder.
  * Use `Course` for the model class.
  * Use the existing context class instead of creating a new one.

# Visual Studio Code

* Create a *Pages/Courses* folder.

* Run the following command to scaffold the Course pages.

  **On Windows:**

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Course -dc SchoolContext -udl -outDir Pages\Courses --referenceScriptLibraries
  ```

  **On Linux or macOS:**

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Course -dc SchoolContext -udl -outDir Pages/Courses --referenceScriptLibraries
  ```

---

* Open `Pages/Courses/Index.cshtml.cs` and examine the `OnGetAsync` method. The scaffolding engine specified eager loading for the `Department` navigation property. The `Include` method specifies eager loading.

* Run the app and select the **Courses** link. The department column displays the `DepartmentID`, which isn't useful.

### Display the department name

Update Pages/Courses/Index.cshtml.cs with the following code:

```csharp
﻿using ContosoUniversity.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContosoUniversity.Pages.Courses
{
    public class IndexModel : PageModel
    {
        private readonly ContosoUniversity.Data.SchoolContext _context;

        public IndexModel(ContosoUniversity.Data.SchoolContext context)
        {
            _context = context;
        }

        public IList<Course> Courses { get; set; }

        public async Task OnGetAsync()
        {
            Courses = await _context.Courses
                .Include(c => c.Department)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
```

The preceding code changes the `Course` property to `Courses` and adds `AsNoTracking`.

No-tracking queries are useful when the results are used in a read-only scenario. They're generally quicker to execute because there's no need to set up the change tracking information. If the entities retrieved from the database don't need to be updated, then a no-tracking query is likely to perform better than a tracking query.

In some cases a tracking query is more efficient than a no-tracking query. For more information, see Tracking vs. No-Tracking Queries.
In the preceding code, `AsNoTracking` is called because the entities aren't updated in the current context.

Update `Pages/Courses/Index.cshtml` with the following code.

```cshtml
﻿@page
@model ContosoUniversity.Pages.Courses.IndexModel

@{
    ViewData["Title"] = "Courses";
}

<h1>Courses</h1>

<p>
    <a asp-page="Create">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Courses[0].CourseID)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Courses[0].Title)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Courses[0].Credits)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Courses[0].Department)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model.Courses)
{
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.CourseID)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Title)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Credits)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Department.Name)
            </td>
            <td>
                <a asp-page="./Edit" asp-route-id="@item.CourseID">Edit</a> |
                <a asp-page="./Details" asp-route-id="@item.CourseID">Details</a> |
                <a asp-page="./Delete" asp-route-id="@item.CourseID">Delete</a>
            </td>
        </tr>
}
    </tbody>
</table>
```

The following changes have been made to the scaffolded code:

* Changed the `Course` property name to `Courses`.
* Added a **Number** column that shows the `CourseID` property value. By default, primary keys aren't scaffolded because normally they're meaningless to end users. However, in this case the primary key is meaningful.
* Changed the **Department** column to display the department name. The code displays the `Name` property of the `Department` entity that's loaded into the `Department` navigation property:

  ```html
  @Html.DisplayFor(modelItem => item.Department.Name)
  ```

Run the app and select the **Courses** tab to see the list with department names.

### Loading related data with Select

The `OnGetAsync` method loads related data with the `Include` method. The `Select` method is an alternative that loads only the related data needed. For single items, like the `Department.Name` it uses a `SQL INNER JOIN`. For collections, it uses another database access, but so does the `Include` operator on collections.

> **Note:**
> The `Select` method used here is a LINQ **projection** operator. It transforms each element in the source sequence into a new form—in this case, a `CourseViewModel`. Because the query projects into a non-entity type, EF Core generates a SQL query that retrieves only the columns needed for the projection, and no entity tracking is performed.

The following code loads related data with the `Select` method:

```csharp
public IList<CourseViewModel> CourseVM { get; set; }

public async Task OnGetAsync()
{
    CourseVM = await _context.Courses
    .Select(p => new CourseViewModel
    {
        CourseID = p.CourseID,
        Title = p.Title,
        Credits = p.Credits,
        DepartmentName = p.Department.Name
    }).ToListAsync();
}
```

The preceding code doesn't return any entity types, therefore no tracking is done. For more information about the EF tracking, see Tracking vs. No-Tracking Queries.

The `CourseViewModel`:

```csharp
﻿public class CourseViewModel
{
    public int CourseID { get; set; }
    public string Title { get; set; }
    public int Credits { get; set; }
    public string DepartmentName { get; set; }
}
```

See IndexSelectModel for the complete Razor Pages.
