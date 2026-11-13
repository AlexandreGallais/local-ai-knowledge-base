---
title: "Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/concurrency.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency (part 5 of 5)

### Test concurrency conflicts with the Edit page

Open two browsers instances of Edit on the English department:

* Run the app and select Departments.
* Right-click the **Edit** hyperlink for the English department and select **Open in new tab**.
* In the first tab, click the **Edit** hyperlink for the English department.

The two browser tabs display the same information.

Change the name in the first browser tab and click **Save**.

The browser shows the Index page with the changed value and updated `ConcurrencyToken`indicator. Note the updated `ConcurrencyToken`indicator, it's displayed on the second postback in the other tab.

Change a different field in the second browser tab.

Click **Save**. You see error messages for all fields that don't match the database values:

This browser window didn't intend to change the Name field. Copy and paste the current value (Languages) into the Name field. Tab out. Client-side validation removes the error message.

Click **Save** again. The value you entered in the second browser tab is saved. You see the saved values in the Index page.

## Update the Delete page model

Update `Pages/Departments/Delete.cshtml.cs` with the following code:

```csharp
using ContosoUniversity.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ContosoUniversity.Pages.Departments
{
    public class DeleteModel : PageModel
    {
        private readonly ContosoUniversity.Data.SchoolContext _context;

        public DeleteModel(ContosoUniversity.Data.SchoolContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Department Department { get; set; }
        public string ConcurrencyErrorMessage { get; set; }

        public async Task<IActionResult> OnGetAsync(int id, bool? concurrencyError)
        {
            Department = await _context.Departments
                .Include(d => d.Administrator)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.DepartmentID == id);

            if (Department == null)
            {
                 return NotFound();
            }

            if (concurrencyError.GetValueOrDefault())
            {
                ConcurrencyErrorMessage = "The record you attempted to delete "
                  + "was modified by another user after you selected delete. "
                  + "The delete operation was canceled and the current values in the "
                  + "database have been displayed. If you still want to delete this "
                  + "record, click the Delete button again.";
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int id)
        {
            try
            {
                if (await _context.Departments.AnyAsync(
                    m => m.DepartmentID == id))
                {
                    // Department.ConcurrencyToken value is from when the entity
                    // was fetched. If it doesn't match the DB, a
                    // DbUpdateConcurrencyException exception is thrown.
                    _context.Departments.Remove(Department);
                    await _context.SaveChangesAsync();
                }
                return RedirectToPage("./Index");
            }
            catch (DbUpdateConcurrencyException)
            {
                return RedirectToPage("./Delete",
                    new { concurrencyError = true, id = id });
            }
        }
    }
}
```

The Delete page detects concurrency conflicts when the entity has changed after it was fetched. `Department.ConcurrencyToken` is the row version when the entity was fetched. When EF Core creates the `SQL DELETE` command, it includes a WHERE clause with `ConcurrencyToken`. If the `SQL DELETE` command results in zero rows affected:

* The `ConcurrencyToken` in the `SQL DELETE` command doesn't match `ConcurrencyToken` in the database.
* A `DbUpdateConcurrencyException` exception is thrown.
* `OnGetAsync` is called with the `concurrencyError`.

### Update the Delete Razor page

Update `Pages/Departments/Delete.cshtml` with the following code:

```cshtml
@page "{id:int}"
@model ContosoUniversity.Pages.Departments.DeleteModel

@{
    ViewData["Title"] = "Delete";
}

<h1>Delete</h1>

<p class="text-danger">@Model.ConcurrencyErrorMessage</p>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Department</h4>
    <hr />
    <dl class="row">
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Department.Name)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Department.Name)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Department.Budget)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Department.Budget)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Department.StartDate)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Department.StartDate)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Department.ConcurrencyToken)
        </dt>
        <dd class="col-sm-10">
            @Utility.GetLastChars(Model.Department.ConcurrencyToken)
        </dd>
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Department.Administrator)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Department.Administrator.FullName)
        </dd>
    </dl>

    <form method="post">
        <input type="hidden" asp-for="Department.DepartmentID" />
        <input type="hidden" asp-for="Department.ConcurrencyToken" />
        <input type="submit" value="Delete" class="btn btn-danger" /> |
        <a asp-page="./Index">Back to List</a>
    </form>
</div>
```

The preceding code makes the following changes:

* Updates the `page` directive from `@page` to `@page "{id:int}"`.
* Adds an error message.
* Replaces FirstMidName with FullName in the **Administrator** field.
* Changes `ConcurrencyToken` to display the last byte.
* Adds a hidden row version. `ConcurrencyToken` must be added so postback binds the value.

### Test concurrency conflicts

Create a test department.

Open two browsers instances of Delete on the test department:

* Run the app and select Departments.
* Right-click the **Delete** hyperlink for the test department and select **Open in new tab**.
* Click the **Edit** hyperlink for the test department.

The two browser tabs display the same information.

Change the budget in the first browser tab and click **Save**.

The browser shows the Index page with the changed value and updated `ConcurrencyToken`indicator. Note the updated `ConcurrencyToken`indicator, it's displayed on the second postback in the other tab.

Delete the test department from the second tab. A concurrency error is display with the current values from the database. Clicking **Delete** deletes the entity, unless `ConcurrencyToken` has been updated.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see Enterprise web app patterns. A complete production-quality sample web app that implements the patterns is available.

## Related content

* Concurrency Tokens in EF Core
* Handle concurrency in EF Core
* Debugging ASP.NET Core 2.x source

## Next steps

This is the last tutorial in the series. Additional topics are covered in the MVC version of this tutorial series.

> Previous tutorial
