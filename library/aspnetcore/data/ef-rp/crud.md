---
title: "Part 2: Razor Pages - EF Core in ASP.NET, CRUD (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/crud.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Tutorial 2: Razor Pages with EF Core in ASP.NET Core - CRUD

-->
-->

By Tom Dykstra, Jeremy Likness, and Jon P Smith

The Contoso University web app demonstrates how to create Razor Pages web apps using EF Core and Visual Studio. For information about the tutorial series, see the first tutorial.

If you run into problems you can't solve, download the completed app and compare that code to what you created by following the tutorial.

This article presents the second tutorial in the eight-part series. In this tutorial, you review and customize the CRUD (create, read, update, delete) code that the scaffolding automatically creates for your Razor pages.

In this tutorial, you:

> * Customize pages: **Details**, **Create**, **Edit**, and **Delete**
> * Explore how to protect against overposting
> * Review different methods to read a single entity
> * Explore the View model

## Prerequisites

* Review the previous tutorial, Razor Pages with Entity Framework Core in ASP.NET Core (Tutorial 1 of 8).

## Review the tutorial approach (no repository)

Some developers use a service layer or repository pattern to create an abstraction layer between the UI (the Razor Pages) and the data access layer. Rather than that approach, this tutorial adds the EF Core code directly to the page model classes. This method helps to minimize complexity and keep the tutorial focused on EF Core.

## Update the Details page

The scaffolded code for the Students pages doesn't include enrollment data. In this section, enrollments are added to the **Details** page.

### Read enrollments

To display a student's enrollment data on the page, the enrollment data must be read. The scaffolded code in the `Pages/Students/Details.cshtml.cs` file reads only the `Student` data without the `Enrollment` data:

```csharp
public async Task<IActionResult> OnGetAsync(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    Student = await _context.Students.FirstOrDefaultAsync(m => m.ID == id);

    if (Student == null)
    {
        return NotFound();
    }
    return Page();
}
```

Replace the `OnGetAsync` method with the following code that reads enrollment data for the selected student. The changes are highlighted.

```csharp
public async Task<IActionResult> OnGetAsync(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    Student = await _context.Students
        .Include(s => s.Enrollments)
        .ThenInclude(e => e.Course)
        .AsNoTracking()
        .FirstOrDefaultAsync(m => m.ID == id);

    if (Student == null)
    {
        return NotFound();
    }
    return Page();
}
```

The `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.Include*` and ThenInclude))
methods cause the context to load the `Student.Enrollments` navigation property, and within each enrollment, the `Enrollment.Course` navigation property. These methods are examined in detail in Read related data (Tutorial 6 of 8).

The `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.AsNoTracking*` method improves performance in scenarios where the entities returned aren't updated in the current context. The `AsNoTracking` setting is discussed later in this tutorial.

### Display enrollments

To display a list of enrollments, replace the code in the _Pages/Students/Details.cshtml_ file with the following code. The changes are highlighted.

```cshtml
﻿@page
@model ContosoUniversity.Pages.Students.DetailsModel

@{
    ViewData["Title"] = "Details";
}

<h1>Details</h1>

<div>
    <h4>Student</h4>
    <hr />
    <dl class="row">
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Student.LastName)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Student.LastName)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Student.FirstMidName)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Student.FirstMidName)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Student.EnrollmentDate)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Student.EnrollmentDate)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Student.Enrollments)
        </dt>
        <dd class="col-sm-10">
            <table class="table">
                <tr>
                    <th>Course Title</th>
                    <th>Grade</th>
                </tr>
                @foreach (var item in Model.Student.Enrollments)
                {
                    <tr>
                        <td>
                            @Html.DisplayFor(modelItem => item.Course.Title)
                        </td>
                        <td>
                            @Html.DisplayFor(modelItem => item.Grade)
                        </td>
                    </tr>
                }
            </table>
        </dd>
    </dl>
</div>
<div>
    <a asp-page="./Edit" asp-route-id="@Model.Student.ID">Edit</a> |
    <a asp-page="./Index">Back to List</a>
</div>
```

This code loops through the entities in the `Enrollments` navigation property. For each enrollment, the code displays the course title and the grade. The course title is retrieved from the `Course` entity stored in the `Course` navigation property of the `Enrollments` entity.

Run the app, select the **Students** tab, and select the **Details** link for a student. The list of courses and grades for the selected student is displayed.

### Use different methods to read one entity

The generated code uses the FirstOrDefaultAsync) method to read one entity. This method returns null if nothing is found. Otherwise, it returns the first row found that satisfies the query filter criteria. The `FirstOrDefaultAsync` method is generally a better choice than the following alternatives:

* The SingleOrDefaultAsync) method throws an exception if there's more than one entity that satisfies the query filter. To determine if the query can return more than one row, the `SingleOrDefaultAsync` method tries to fetch multiple rows. The extra work is unnecessary if the query can only return one entity, as when it searches on a unique key.

* The FindAsync) method locates an entity with the primary key. If the context tracks an entity with the primary key, the key is returned without a request to the database. This method is optimized to look up a single entity, but you can't call the `Include` method with the `FindAsync` method. If related data is needed, the `FirstOrDefaultAsync` method is the better choice.

### Route data vs. query string

The URL for the **Details** page is `https://localhost:<port>/Students/Details?id=1`. The entity's primary key value is in the query string. Some developers prefer to pass the key value in route data: `https://localhost:<port>/Students/Details/1`. For more information, see Update the generated pages (Tutorial 5 of 8).

## Update the Create page

The scaffolded `OnPostAsync` code for the **Create** page is vulnerable to overposting. Replace the `OnPostAsync` method in the _Pages/Students/Create.cshtml.cs_ file with the following code.

```csharp
public async Task<IActionResult> OnPostAsync()
{
    var emptyStudent = new Student();

    if (await TryUpdateModelAsync<Student>(
        emptyStudent,
        "student",   // Prefix for form value.
        s => s.FirstMidName, s => s.LastName, s => s.EnrollmentDate))
    {
        _context.Students.Add(emptyStudent);
        await _context.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
```

### Use the TryUpdateModelAsync method

The code in the last section creates a `Student` object and then uses posted form fields to update the `Student` object properties. The TryUpdateModelAsync) method:

* Uses the posted form values from the `Microsoft.AspNetCore.Mvc.RazorPages.PageModel.PageContext` property in the `Microsoft.AspNetCore.Mvc.RazorPages.PageModel` class.

* Updates only the properties listed (`s => s.FirstMidName, s => s.LastName, s => s.EnrollmentDate`).

* Looks for form fields with a "student" prefix. For example, `Student.FirstMidName`. It's not case sensitive.

* Uses the model binding system to convert form values from strings to the types in the `Student` model. For example, the `EnrollmentDate` value is converted to a `DateTime` type.

Run the app, and create a student entity to test the **Create** page.

## Prevent overposting

Using the `TryUpdateModel` method to update fields with posted values is a security best practice because it prevents overposting. For example, suppose the `Student` entity includes a `Secret` property that this web page shouldn't update or add:

```csharp
public class Student
{
    public int ID { get; set; }
    public string LastName { get; set; }
    public string FirstMidName { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public string Secret { get; set; }
}
```

Even if the app doesn't have a `Secret` field on the **Create** or **Update** page, a hacker could set the `Secret` value by overposting. A hacker might use a tool such as Fiddler, or write some JavaScript, to post a `Secret` form value. The original code doesn't limit the fields that the model binder uses when it creates a `Student` instance.

Whatever value the hacker specified for the `Secret` form field is updated in the database. The following image shows the Fiddler tool adding the `Secret` field with the value "OverPost" to the posted form values.

The value "OverPost" is successfully added to the `Secret` property of the inserted row. This result occurs even though the app designer never intended to set the `Secret` property with the **Create** page.

### Work with the View model

View models provide an alternative way to prevent overposting.

The application model is often called the _domain model_. The domain model typically contains all the properties required by the corresponding entity in the database. The view model contains only the properties needed for the UI page, for example, the **Create** page.

In addition to the view model, some apps use a binding model or input model to pass data between the Razor Pages page model class and the browser.

Consider the following `StudentVM` view model:

```csharp
public class StudentVM
{
    public int ID { get; set; }
    public string LastName { get; set; }
    public string FirstMidName { get; set; }
    public DateTime EnrollmentDate { get; set; }
}
```

The following code uses the `StudentVM` view model to create a new student:

```csharp
[BindProperty]
public StudentVM StudentVM { get; set; }

public async Task<IActionResult> OnPostAsync()
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    var entry = _context.Add(new Student());
    entry.CurrentValues.SetValues(StudentVM);
    await _context.SaveChangesAsync();
    return RedirectToPage("./Index");
}
```

The SetValues) method sets the values of this object by reading values from another `Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues` object. The `SetValues` method uses property name matching. The view model type:

* Doesn't need to be related to the model type.
* Requires properties that match.

Using the `StudentVM` view model requires that the **Create** page use the `StudentVM` entity rather than a `Student` entity:

```cshtml
﻿@page
@model CreateVMModel

@{
    ViewData["Title"] = "Create";
}

<h1>Create</h1>

<h4>Student</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="StudentVM.LastName" class="control-label"></label>
                <input asp-for="StudentVM.LastName" class="form-control" />
                <span asp-validation-for="StudentVM.LastName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="StudentVM.FirstMidName" class="control-label"></label>
                <input asp-for="StudentVM.FirstMidName" class="form-control" />
                <span asp-validation-for="StudentVM.FirstMidName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="StudentVM.EnrollmentDate" class="control-label"></label>
                <input asp-for="StudentVM.EnrollmentDate" class="form-control" />
                <span asp-validation-for="StudentVM.EnrollmentDate" class="text-danger"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Create" class="btn btn-primary" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="Index">Back to List</a>
</div>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}
```

## Update the Edit page

In the _Pages/Students/Edit.cshtml.cs_ file, replace the `OnGetAsync` and `OnPostAsync` methods with the following code.

```csharp
public async Task<IActionResult> OnGetAsync(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    Student = await _context.Students.FindAsync(id);

    if (Student == null)
    {
        return NotFound();
    }
    return Page();
}

public async Task<IActionResult> OnPostAsync(int id)
{
    var studentToUpdate = await _context.Students.FindAsync(id);

    if (studentToUpdate == null)
    {
        return NotFound();
    }

    if (await TryUpdateModelAsync<Student>(
        studentToUpdate,
        "student",
        s => s.FirstMidName, s => s.LastName, s => s.EnrollmentDate))
    {
        await _context.SaveChangesAsync();
        return RedirectToPage("./Index");
    }

    return Page();
}
```

The code changes are similar to the **Create** page with a few exceptions:

* The `FirstOrDefaultAsync` method is replaced with the `Microsoft.EntityFrameworkCore.DbSet`1.FindAsync*` method. When you don't have to include related data, the `FindAsync` method is more efficient.
* The `OnPostAsync` method has an `id` parameter.
* The current student is fetched from the database, rather than creating an empty student.

Run the app, and test it by creating and editing a student.
