---
title: "Part 2: Razor Pages - EF Core in ASP.NET, CRUD (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/crud.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 2: Razor Pages - EF Core in ASP.NET, CRUD (part 2 of 2)

## Use Entity States

The database context keeps track of whether entities in memory are in sync with their corresponding rows in the database. The tracking information determines what happens when the SaveChangesAsync) method is called. For example, when a new entity is passed to the `Microsoft.EntityFrameworkCore.DbContext.AddAsync*` method, that entity's state is set to `Microsoft.EntityFrameworkCore.EntityState.Added`. When the `SaveChangesAsync` method is called, the database context issues a SQL `INSERT` command.

An entity can be in one of the following states:

* `Added`: The entity doesn't yet exist in the database. The `SaveChanges` method issues an `INSERT` statement.

* `Unchanged`: No changes need to be saved with this entity. An entity has this status when read from the database.

* `Modified`: Some or all of the entity's property values are modified. The `SaveChanges` method issues an `UPDATE` statement.

* `Deleted`: The entity is marked for deletion. The `SaveChanges` method issues a `DELETE` statement.

* `Detached`: The database context doesn't track the entity.

In a desktop app, state changes are typically set automatically. An entity is read, changes are made, and the entity state is automatically changed to `Modified`. Calling the `SaveChanges` method generates a SQL `UPDATE` statement that updates only the changed properties.

In a web app, the `DbContext` object that reads an entity and displays the data is disposed after a page is rendered. When a page's `OnPostAsync` method is called, a new web request is made with a new instance of the `DbContext` object. Rereading the entity in the new context simulates desktop processing.

## Update the Delete page

In this section, a custom error message is implemented when the call to `SaveChanges` fails.

Replace the code in the _Pages/Students/Delete.cshtml.cs_ file with the following code.

```csharp
﻿using ContosoUniversity.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ContosoUniversity.Pages.Students
{
    public class DeleteModel : PageModel
    {
        private readonly ContosoUniversity.Data.SchoolContext _context;
        private readonly ILogger<DeleteModel> _logger;

        public DeleteModel(ContosoUniversity.Data.SchoolContext context,
                           ILogger<DeleteModel> logger)
        {
            _context = context;
            _logger = logger;
        }

        [BindProperty]
        public Student Student { get; set; }
        public string ErrorMessage { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id, bool? saveChangesError = false)
        {
            if (id == null)
            {
                return NotFound();
            }

            Student = await _context.Students
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.ID == id);

            if (Student == null)
            {
                return NotFound();
            }

            if (saveChangesError.GetValueOrDefault())
            {
                ErrorMessage = String.Format("Delete {ID} failed. Try again", id);
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            try
            {
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
                return RedirectToPage("./Index");
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, ErrorMessage);

                return RedirectToAction("./Delete",
                                     new { id, saveChangesError = true });
            }
        }
    }
}
```

This code adds the following functionality:

* Logging for .NET and ASP.NET Core.
* The optional parameter `saveChangesError` to the `OnGetAsync` method signature. The `saveChangesError` parameter indicates whether the method call occurs after a failure to delete the `Student` object.

The delete operation might fail because of transient network problems. Transient network errors are more likely when the database is in the cloud. The `saveChangesError` parameter is `false` when the **Delete** page `OnGetAsync` method is called from the UI. When the `OnGetAsync` method is called by the `OnPostAsync` method because the delete operation failed, the `saveChangesError` parameter is true.

The `OnPostAsync` method retrieves the selected entity, then calls the Remove) method to set the entity status to `Deleted`. When `SaveChanges` is called, a SQL `DELETE` command is generated. If call to the `Remove` method fails:

* The database exception is caught.
* The **Delete** page `OnGetAsync` method is called with the `saveChangesError=true` parameter.

Add an error message to the **Delete** page (_Pages/Students/Delete.cshtml_).

```cshtml
﻿@page
@model ContosoUniversity.Pages.Students.DeleteModel

@{
    ViewData["Title"] = "Delete";
}

<h1>Delete</h1>

<p class="text-danger">@Model.ErrorMessage</p>

<h3>Are you sure you want to delete this?</h3>
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
    </dl>

    <form method="post">
        <input type="hidden" asp-for="Student.ID" />
        <input type="submit" value="Delete" class="btn btn-danger" /> |
        <a asp-page="./Index">Back to List</a>
    </form>
</div>
```

Run the app and delete a student to test the **Delete** page.

## Next step

> Tutorial 3: Razor Pages with EF Core in ASP.NET Core - Sort, Filter, Paging
