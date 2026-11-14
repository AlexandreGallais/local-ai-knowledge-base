---
title: "Implement CRUD - ASP.NET MVC with EF Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/data/ef-mvc/crud.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Tutorial: Implement basic CRUD functionality - ASP.NET MVC with EF Core

In the previous tutorial, you created an MVC application that stores and displays data by using the Entity Framework (EF) Core and a SQL Server local database. In this exercise, you review and customize the CRUD (create, read, update, delete) code that the MVC scaffolding automatically creates for you in controllers and views.

> **Note:**
> It's a common practice to implement the repository pattern in order to create an abstraction layer between your controller and the data access layer. To keep the examples simple and focused on demonstrating how to use the Entity Framework itself, the tutorials don't use repositories. For information about repositories with Entity Framework, see the last tutorial in this series.

In this tutorial, you:

> * Customize the Details page by adding enrollment data with eager loading
> * Update the Create page with security and error handling
> * Update the Edit page to prevent overposting
> * Update the Delete page with error reporting
> * Close database connections

## Prerequisites

* Complete the previous tutorial, Get started with EF Core in an ASP.NET MVC web app.

## Customize the Details page

The scaffolded code for the **Students Index** page left out the `Enrollments` property because the property holds a collection. The **Details** page displays the contents of the collection as an HTML table.

In the _Controllers/StudentsController.cs_ file, the action method for the Details view uses the `FirstOrDefaultAsync` method to retrieve a single `Student` entity. You need to add code that calls the `Include`, `ThenInclude`, and `AsNoTracking` methods, as shown in the following highlighted code.

```csharp
public async Task<IActionResult> Details(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var student = await _context.Students
        .Include(s => s.Enrollments)
            .ThenInclude(e => e.Course)
        .AsNoTracking()
        .FirstOrDefaultAsync(m => m.ID == id);

    if (student == null)
    {
        return NotFound();
    }

    return View(student);
}
```

The `Include` and `ThenInclude` methods cause the context to load the `Student.Enrollments` navigation property and the `Enrollment.Course` navigation property within each enrollment. You learn more about these methods in the read related data tutorial.

The `AsNoTracking` method improves performance in scenarios where the returned entities aren't updated in the current context's lifetime. You learn more about the `AsNoTracking` method at the end of this tutorial.

### Configure the route data

The key value passed to the `Details` method comes from the *route data*. Route data is data that the model binder finds in a segment of the URL. For example, the default route specifies `controller`, `action`, and `id` (identifier, ID) segments:

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
```

In the following URL, the default route maps _Instructor_ as the `controller`, _Index_ as the `action`, and 1 as the `id`. These values compose the route data.

```url
http://localhost:1230/Instructor/Index/1?courseID=2021
```

The last part of the URL (`?courseID=2021`) is a query string value. The model binder also passes the ID value to the `Index` method `id` parameter, if you pass it as a query string value:

```url
http://localhost:1230/Instructor/Index?id=1&CourseID=2021
```

In the **Index** page, hyperlink URLs are created by tag helper statements in the Razor view. In the following Razor code, the `id` parameter matches the default route, so the `id` value is added to the route data.

```html
<a asp-action="Edit" asp-route-id="@item.ID">Edit</a>
```

This change generates the following HTML when the `item.ID` value is 6:

```html
<a href="/Students/Edit/6">Edit</a>
```

In the following Razor code, the `studentID` text doesn't match a parameter in the default route, so the text is added as a query string.

```html
<a asp-action="Edit" asp-route-studentID="@item.ID">Edit</a>
```

This change generates the following HTML when the `item.ID` value is 6:

```html
<a href="/Students/Edit?studentID=6">Edit</a>
```

For more information about tag helpers, see Tag Helpers in ASP.NET Core.

### Add enrollments to the Details view

Open the _Views/Students/Details.cshtml_ file. Each field is displayed by using the `DisplayNameFor` and `DisplayFor` helpers, as shown in the following example.

```cshtml
<dt class="col-sm-2">
    @Html.DisplayNameFor(model => model.LastName)
</dt>
<dd class="col-sm-10">
    @Html.DisplayFor(model => model.LastName)
</dd>
```

After the last field, and immediately before the closing `` tag, add the following code to display a list of enrollments:

```cshtml
<dt class="col-sm-2">
    @Html.DisplayNameFor(model => model.Enrollments)
</dt>
<dd class="col-sm-10">
    <table class="table">
        <tr>
            <th>Course Title</th>
            <th>Grade</th>
        </tr>
        @foreach (var item in Model.Enrollments)
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
```

If the code indentation is misaligned after you paste the snippet, use the **CTRL**+**K**+**D** keyboard shortcut to correct it.

The new code loops through the entities in the `Enrollments` navigation property. For each enrollment, the code displays the course title and the grade. The course title is retrieved from the `Course` entity stored in the `Course` navigation property of the `Enrollments` entity.

Run the app, select the **Students** tab, and select the **Details** link for a student. You see the list of courses and grades for the selected student:

## Update the Create page

In the _StudentsController.cs_ file, modify the HttpPost `Create` method by adding a `try-catch` block and removing the `ID` property from the `Bind` attribute.

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create(
    [Bind("EnrollmentDate,FirstMidName,LastName")] Student student)
{
    try
    {
        if (ModelState.IsValid)
        {
            _context.Add(student);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
    catch (DbUpdateException /* ex */)
    {
        //Log the error (uncomment ex variable name and write a log.
        ModelState.AddModelError("", "Unable to save changes. " +
            "Try again, and if the problem persists " +
            "see your system administrator.");
    }
    return View(student);
}
```

This code adds the `Student` entity created by the ASP.NET Core MVC model binder to the `Students` entity set, and then saves the changes to the database.

_Model binder_ refers to the ASP.NET Core MVC functionality that makes it easier for you to work with data submitted by a form. A model binder converts posted form values to CLR types and passes them to the action method in parameters. In this case, the model binder instantiates a `Student` entity for you by using property values from the `Form` collection.

You removed the `ID` property from the `Bind` attribute because the ID is the primary key value that SQL Server sets automatically when it inserts the row. Input from the user doesn't set the ID value.

Other than the `Bind` attribute, the `try-catch` block is the only change made to the scaffolded code. If an exception that derives from `DbUpdateException` is caught while the changes are being saved, a generic error message is displayed. The cause for a `DbUpdateException` exception can be external to the application rather than a programming error, so the user is advised to try again. A production quality application logs such exception, but that functionality isn't implemented in this sample. For more information, see Logging in .NET and ASP.NET Core.

The `ValidateAntiForgeryToken` attribute helps prevent cross-site request forgery (CSRF) attacks. The Form Tag Helper method automatically injects the token into the view. The token is also included when the user submits the form. The `ValidateAntiForgeryToken` attribute checks the token. For more information, see Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core and FormTagHelper Class reference.

### Protect against overposting

The `Bind` attribute that the scaffolded code includes on the `Create` method is one way to protect against overposting in create scenarios. For example, suppose the `Student` entity includes a `Secret` property that you don't want this web page to set.

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

Even if you don't have a `Secret` field on the web page, a hacker might use a tool such as Fiddler, or write some JavaScript, to post a `Secret` form value. Without the `Bind` attribute limiting the fields that the model binder uses when it creates a `Student` instance, the model binder can pick up that `Secret` form value and use it to create the `Student` entity instance. Then, whatever value the hacker specified for the `Secret` form field is updated in your database. The following image shows the Fiddler tool adding the `Secret` field (with the value "<example-value>") to the posted form values.

The value "<example-value>" is then successfully added to the `Secret` property of the inserted row, although you never intended that the web page set the property.

You can prevent overposting in edit scenarios by reading the entity from the database first and then calling the `TryUpdateModel` method. Pass in an explicit allowed properties list, which is how the method is used in these tutorials.

An alternate way to prevent overposting preferred by many developers is to use view models rather than entity classes with model binding. Include only the properties you want to update in the view model. After the MVC model binder completes, copy the view model properties to the entity instance, optionally by using a tool such as AutoMapper. Use the `_context.Entry` setting on the entity instance to set its state to `Unchanged`, and then set the `Property("PropertyName").IsModified` setting to true on each entity property included in the view model. This method works in both edit and create scenarios.

### Test the Create page

The code in the _Views/Students/Create.cshtml_ file uses the `label`, `input`, and `span` (for validation messages) tag helpers for each field.

Run the app, select the **Students** tab, and then select **Create New**.

Enter names and a date. Try entering an invalid date, as your browser allows. (Some browsers force you to use a date picker.) Select **Create** to see the error message.

This scenario demonstrates the default server-side validation. In a later tutorial, you see how to add attributes that generate code for client-side validation. The following highlighted code shows the model validation check in the `Create` method.

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create(
    [Bind("EnrollmentDate,FirstMidName,LastName")] Student student)
{
    try
    {
        if (ModelState.IsValid)
        {
            _context.Add(student);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
    catch (DbUpdateException /* ex */)
    {
        //Log the error (uncomment ex variable name and write a log.
        ModelState.AddModelError("", "Unable to save changes. " +
            "Try again, and if the problem persists " +
            "see your system administrator.");
    }
    return View(student);
}
```

Change the date to a valid value, and select **Create** to see the new student appear in the **Index** page.
