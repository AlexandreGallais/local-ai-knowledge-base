---
title: "Add Sort, Filter, Paging - ASP.NET MVC with EF Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-mvc/sort-filter-page.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Tutorial: Add sorting, filtering, and paging - ASP.NET MVC with EF Core

In the previous tutorial, you implemented a set of web pages for basic CRUD operations for Student entities. In this tutorial, you add sorting, filtering, and paging functionality to the Students Index page. You also create a page that does simple grouping.

In this exercise, you add sorting, filtering, and paging functionality to the Students Index page. You also create a page that does simple grouping. The following illustration shows what the page looks like when you're done. The column headings are links the user can select to sort by that column. Selecting a column heading repeatedly causes the sort order to toggle between ascending and descending.

In this tutorial, you:

> * Add links to support column sorting
> * Add a Search box to support searches
> * Add paging to the Students Index
> * Add links to support the paging action
> * Create an About page for the site

## Prerequisites

* Complete the previous tutorial, Implement basic CRUD functionality - ASP.NET MVC with EF Core

## Add column sort links

To add sorting to the **Students Index** page, you change the `Index` method of the Students controller and add code to the Student Index view.

### Add sorting functionality to the Index method

In the _StudentsController.cs_ file, replace the `Index` method with the following code:

```csharp
public async Task<IActionResult> Index(string sortOrder)
{
    ViewData["NameSortParm"] = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";
    ViewData["DateSortParm"] = sortOrder == "Date" ? "date_desc" : "Date";
    var students = from s in _context.Students
                   select s;
    switch (sortOrder)
    {
        case "name_desc":
            students = students.OrderByDescending(s => s.LastName);
            break;
        case "Date":
            students = students.OrderBy(s => s.EnrollmentDate);
            break;
        case "date_desc":
            students = students.OrderByDescending(s => s.EnrollmentDate);
            break;
        default:
            students = students.OrderBy(s => s.LastName);
            break;
    }
    return View(await students.AsNoTracking().ToListAsync());
}
```

This code receives a `sortOrder` parameter from the query string in the URL. The query string value is provided by ASP.NET Core MVC as a parameter to the action method. The parameter is a string value: "Name" or "Date." The value is optionally followed by an underscore and the string "desc" to specify descending order. The default sort order is ascending.

The first time the **Index** page is requested, there's no query string. The students are displayed in ascending order by last name, which is the default as established by the fall-through case in the `switch` statement. When the user selects a column heading hyperlink, the appropriate `sortOrder` value is provided in the query string.

The two `ViewData` elements (`NameSortParm` and `DateSortParm`) are used by the view to configure the column heading hyperlinks with the appropriate query string values.

```csharp
public async Task<IActionResult> Index(string sortOrder)
{
    ViewData["NameSortParm"] = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";
    ViewData["DateSortParm"] = sortOrder == "Date" ? "date_desc" : "Date";
    var students = from s in _context.Students
                   select s;
    switch (sortOrder)
    {
        case "name_desc":
            students = students.OrderByDescending(s => s.LastName);
            break;
        case "Date":
            students = students.OrderBy(s => s.EnrollmentDate);
            break;
        case "date_desc":
            students = students.OrderByDescending(s => s.EnrollmentDate);
            break;
        default:
            students = students.OrderBy(s => s.LastName);
            break;
    }
    return View(await students.AsNoTracking().ToListAsync());
}
```

These code changes include ternary statements for the elements. The first statement specifies that if the `sortOrder` parameter is null or empty, the `NameSortParm` element is set to "name_desc." Otherwise, the element is set to an empty string. These two statements enable the view to set the column heading hyperlinks as follows:

| Current sort order | Last name hyperlink | Date hyperlink |
|---|---|---|
| Last Name ascending  | Descending          | Ascending      |
| Last Name descending | Ascending           | Ascending      |
| Date ascending       | Ascending           | Descending     |
| Date descending      | Ascending           | Ascending      |

The method uses LINQ to Entities to specify the column to sort by. The code creates an `IQueryable` variable before the `switch` statement, modifies it in the `switch` statement, and calls the `ToListAsync` method after the `switch` statement. When you create and modify `IQueryable` variables, no query is sent to the database. The query isn't executed until you convert the `IQueryable` object into a collection by calling a method such as `ToListAsync`. Therefore, this code results in a single query that isn't executed until the `return View` statement.

This code can get verbose when you work with a large number of columns. The last tutorial in this series, Learn about advanced scenarios > Use dynamic LINQ to simplify code, shows how to write code that lets you pass the name of the `OrderBy` column in a string variable.

### Add column heading hyperlinks to the Student Index view

Replace the code in the _Views/Students/Index.cshtml_ file with the following code that adds column heading hyperlinks. The changed lines are highlighted.

```cshtml
@model IEnumerable<ContosoUniversity.Models.Student>

@{
    ViewData["Title"] = "Index";
}

<h2>Index</h2>

<p>
    <a asp-action="Create">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
                <th>
                    <a asp-action="Index" asp-route-sortOrder="@ViewData["NameSortParm"]">@Html.DisplayNameFor(model => model.LastName)</a>
                </th>
                <th>
                    @Html.DisplayNameFor(model => model.FirstMidName)
                </th>
                <th>
                    <a asp-action="Index" asp-route-sortOrder="@ViewData["DateSortParm"]">@Html.DisplayNameFor(model => model.EnrollmentDate)</a>
                </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model) {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.LastName)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.FirstMidName)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.EnrollmentDate)
            </td>
            <td>
                <a asp-action="Edit" asp-route-id="@item.ID">Edit</a> |
                <a asp-action="Details" asp-route-id="@item.ID">Details</a> |
                <a asp-action="Delete" asp-route-id="@item.ID">Delete</a>
            </td>
        </tr>
}
    </tbody>
</table>
```

This code uses the information in the `ViewData` properties to set up hyperlinks with the appropriate query string values.

Run the app, select the **Students** tab, and select the **Last Name** and **Enrollment Date** column headings to verify sorting works.

## Add a Search box

To add filtering to the **Students Index** page, you add a text box and a **Submit** button to the view and make corresponding changes in the `Index` method. In the text box, you can enter a string to search for in the Student first name and last name fields.

### Add filtering support to the Index method

In the _StudentsController.cs_ file, replace the `Index` method with the following code (the changes are highlighted).

```csharp
public async Task<IActionResult> Index(string sortOrder, string searchString)
{
    ViewData["NameSortParm"] = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";
    ViewData["DateSortParm"] = sortOrder == "Date" ? "date_desc" : "Date";
    ViewData["CurrentFilter"] = searchString;

    var students = from s in _context.Students
                   select s;
    if (!String.IsNullOrEmpty(searchString))
    {
        students = students.Where(s => s.LastName.Contains(searchString)
                               || s.FirstMidName.Contains(searchString));
    }
    switch (sortOrder)
    {
        case "name_desc":
            students = students.OrderByDescending(s => s.LastName);
            break;
        case "Date":
            students = students.OrderBy(s => s.EnrollmentDate);
            break;
        case "date_desc":
            students = students.OrderByDescending(s => s.EnrollmentDate);
            break;
        default:
            students = students.OrderBy(s => s.LastName);
            break;
    }
    return View(await students.AsNoTracking().ToListAsync());
}
```

You added a `searchString` parameter to the `Index` method. The search string value is received from a text box that you add to the Index view. You also added a `where` clause to the `LINQ` statement that selects only students whose first name or last name match the search string. The statement that adds the `where` clause is executed only if there's a searchable value.

#### Determine how to use the Where method

In this scenario, you call the `Where` method on an `IQueryable` object, and the filter is processed on the server. In some scenarios, you might call the `Where` method as an extension method on an in-memory collection. Suppose you change the reference to `_context.Students`. Instead of calling the Entity Framework `DbSet` method, it references a repository method that returns an `IEnumerable` collection. The result is normally the same, but some cases might be different.

For example, the .NET Framework implementation of the `Contains` method performs a case-sensitive comparison by default. In SQL Server, the determination occurs by the collation setting of the SQL Server instance. The setting defaults to case-insensitive. You might call the `ToUpper` method to make the test explicitly case-insensitive: `Where(s => s.LastName.ToUpper().Contains(searchString.ToUpper())`. This option ensures the results stay the same if you change the code later to use a repository that returns an `IEnumerable` collection rather than an `IQueryable` object. (When you call the `Contains` method on an `IEnumerable` collection, you get the .NET Framework implementation. When you call it on an `IQueryable` object, you get the database provider implementation.)

However, there's a performance penalty for this solution. The `ToUpper` code puts a function in the `WHERE` clause of the `TSQL SELECT` statement. This behavior prevents the optimizer from using an index. Given that SQL is mostly installed as case-insensitive, it's best to avoid the `ToUpper` code until you migrate to a case-insensitive data store.

### Add a Search Box to the Student Index view

In the _Views/Student/Index.cshtml_ file, add the highlighted code immediately before the opening table tag `` in order to create a caption, a text box, and a **Search** button.

```cshtml
<p>
    <a asp-action="Create">Create New</a>
</p>

<form asp-action="Index" method="get">
    <div class="form-actions no-color">
        <p>
            <label>Find by name: <input type="text" name="SearchString" value="@ViewData["CurrentFilter"]" /></label>
            <input type="submit" value="Search" class="btn btn-default" /> |
            <a asp-action="Index">Back to Full List</a>
        </p>
    </div>
</form>

<table class="table">
```

This code uses the `<form>` tag helper to add the search text box and button. By default, the `<form>` tag helper submits form data with a `POST`, which means the parameters are passed in the HTTP message body and not in the URL as query strings. When you specify HTTP `GET`, the form data is passed in the URL as query strings, which enables users to bookmark the URL. The W3C guidelines recommend using `GET` when the action doesn't result in an update.

Run the app, select the **Students** tab, enter a search string, and select **Search** to verify filtering is working.

Notice that the URL contains the search string.

```html
http://localhost:5813/Students?SearchString=an
```

If you bookmark this page, you get the filtered list when you use the bookmark. Adding the `method="get"` clause to the `form` tag causes creation of the query string.

At this stage in your development, if you select a column heading sort link, you lose the filter value that you entered in the **Search** box. You discover how to address that situation in the next section.

## Add paging to the Students Index

To add paging to the **Students Index** page, you create a `PaginatedList` class that uses `Skip` and `Take` statements to filter data on the server instead of always retrieving all table rows. Then you make more changes in the `Index` method and add paging buttons to the `Index` view. The following image shows the paging buttons.

In the project folder, create the _PaginatedList.cs_ file. Replace the template code with the following code.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ContosoUniversity
{
    public class PaginatedList<T> : List<T>
    {
        public int PageIndex { get; private set; }
        public int TotalPages { get; private set; }

        public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);

            this.AddRange(items);
        }

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PaginatedList<T>(items, count, pageIndex, pageSize);
        }
    }
}
```

The `CreateAsync` method in this code takes page size and page number and applies the appropriate `Skip` and `Take` statements to the `IQueryable` object. When the `ToListAsync` method is called on the `IQueryable` object, the method returns a `List` containing only the requested page. The `HasPreviousPage` and `HasNextPage` properties can be used to enable or disable **Previous** and **Next** paging buttons.

A `CreateAsync` method is used instead of a constructor to create the `PaginatedList<T>` object because constructors can't run asynchronous code.
