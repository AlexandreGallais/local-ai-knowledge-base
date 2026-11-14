---
title: "Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/data/ef-rp/concurrency.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency (part 4 of 5)

### The concurrency updates

`Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.OriginalValue` is updated with the `ConcurrencyToken` value from the entity when it was fetched in the `OnGetAsync` method. EF Core generates a `SQL UPDATE` command with a `WHERE` clause containing the original `ConcurrencyToken` value. If no rows are affected by the `UPDATE` command, a `DbUpdateConcurrencyException` exception is thrown. No rows are affected by the `UPDATE` command when no rows have the original `ConcurrencyToken` value.

# Visual Studio

```csharp
public async Task<IActionResult> OnPostAsync(int id)
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    // Fetch current department from DB.
    // ConcurrencyToken may have changed.
    var departmentToUpdate = await _context.Departments
        .Include(i => i.Administrator)
        .FirstOrDefaultAsync(m => m.DepartmentID == id);

    if (departmentToUpdate == null)
    {
        return HandleDeletedDepartment();
    }

    // Set ConcurrencyToken to value read in OnGetAsync
    _context.Entry(departmentToUpdate).Property(
         d => d.ConcurrencyToken).OriginalValue = Department.ConcurrencyToken;
```

# Visual Studio Code

```csharp
public async Task<IActionResult> OnPostAsync(int id)
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    // Fetch current department from DB.
    // ConcurrencyToken may have changed.
    var departmentToUpdate = await _context.Departments
        .Include(i => i.Administrator)
        .FirstOrDefaultAsync(m => m.DepartmentID == id);

    if (departmentToUpdate == null)
    {
        return HandleDeletedDepartment();
    }

    departmentToUpdate.ConcurrencyToken = Guid.NewGuid();

    // Set ConcurrencyToken to value read in OnGetAsync
    _context.Entry(departmentToUpdate).Property(d => d.ConcurrencyToken)
                           .OriginalValue = Department.ConcurrencyToken;
```

---

In the preceding highlighted code:

* The value in `Department.ConcurrencyToken` is the value when the entity was fetched in the `Get` request for the `Edit` page. The value is provided to the `OnPost` method by a hidden field in the Razor page that displays the entity to be edited. The hidden field value is copied to `Department.ConcurrencyToken` by the model binder.
* `OriginalValue` is what EF Core uses in the `WHERE` clause. Before the highlighted line of code executes:
  * `OriginalValue` has the value that was in the database when `FirstOrDefaultAsync` was called in this method.
  * This value  might be different from what was displayed on the Edit page.
* The highlighted code makes sure that EF Core uses the original `ConcurrencyToken`  value from the displayed `Department` entity in the SQL `UPDATE` statement's `WHERE` clause.

The following code shows the `Department` model. `Department` is initialized in the:

  * `OnGetAsync` method by the EF query.
  * `OnPostAsync` method by the hidden field in the Razor page using model binding:

# Visual Studio

```csharp
public class EditModel : PageModel
{
    private readonly ContosoUniversity.Data.SchoolContext _context;

    public EditModel(ContosoUniversity.Data.SchoolContext context)
    {
        _context = context;
    }

    [BindProperty]
    public Department Department { get; set; }
    // Replace ViewData["InstructorID"] 
    public SelectList InstructorNameSL { get; set; }

    public async Task<IActionResult> OnGetAsync(int id)
    {
        Department = await _context.Departments
            .Include(d => d.Administrator)  // eager loading
            .AsNoTracking()                 // tracking not required
            .FirstOrDefaultAsync(m => m.DepartmentID == id);

        if (Department == null)
        {
            return NotFound();
        }

        // Use strongly typed data rather than ViewData.
        InstructorNameSL = new SelectList(_context.Instructors,
            "ID", "FirstMidName");

        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int id)
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        // Fetch current department from DB.
        // ConcurrencyToken may have changed.
        var departmentToUpdate = await _context.Departments
            .Include(i => i.Administrator)
            .FirstOrDefaultAsync(m => m.DepartmentID == id);

        if (departmentToUpdate == null)
        {
            return HandleDeletedDepartment();
        }

        // Set ConcurrencyToken to value read in OnGetAsync
        _context.Entry(departmentToUpdate).Property(
             d => d.ConcurrencyToken).OriginalValue = Department.ConcurrencyToken;
```

# Visual Studio Code

```csharp
public class EditModel : PageModel
{
    private readonly ContosoUniversity.Data.SchoolContext _context;

    public EditModel(ContosoUniversity.Data.SchoolContext context)
    {
        _context = context;
    }

    [BindProperty]
    public Department Department { get; set; }
    // Replace ViewData["InstructorID"] 
    public SelectList InstructorNameSL { get; set; }

    public async Task<IActionResult> OnGetAsync(int id)
    {
        Department = await _context.Departments
            .Include(d => d.Administrator)  // eager loading
            .AsNoTracking()                 // tracking not required
            .FirstOrDefaultAsync(m => m.DepartmentID == id);

        if (Department == null)
        {
            return NotFound();
        }

        // Use strongly typed data rather than ViewData.
        InstructorNameSL = new SelectList(_context.Instructors,
            "ID", "FirstMidName");

        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int id)
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        // Fetch current department from DB.
        // ConcurrencyToken may have changed.
        var departmentToUpdate = await _context.Departments
            .Include(i => i.Administrator)
            .FirstOrDefaultAsync(m => m.DepartmentID == id);

        if (departmentToUpdate == null)
        {
            return HandleDeletedDepartment();
        }

        departmentToUpdate.ConcurrencyToken = Guid.NewGuid();

        // Set ConcurrencyToken to value read in OnGetAsync
        _context.Entry(departmentToUpdate).Property(d => d.ConcurrencyToken)
                               .OriginalValue = Department.ConcurrencyToken;
```

---

The preceding code shows the `ConcurrencyToken` value  of the `Department` entity from the `HTTP POST` request is set to the `ConcurrencyToken` value from the `HTTP GET` request.

When a concurrency error happens, the following highlighted code gets the client values (the values posted to this method) and the database values.

```csharp
if (await TryUpdateModelAsync<Department>(
    departmentToUpdate,
    "Department",
    s => s.Name, s => s.StartDate, s => s.Budget, s => s.InstructorID))
{
    try
    {
        await _context.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
    catch (DbUpdateConcurrencyException ex)
    {
        var exceptionEntry = ex.Entries.Single();
        var clientValues = (Department)exceptionEntry.Entity;
        var databaseEntry = exceptionEntry.GetDatabaseValues();
        if (databaseEntry == null)
        {
            ModelState.AddModelError(string.Empty, "Unable to save. " +
                "The department was deleted by another user.");
            return Page();
        }

        var dbValues = (Department)databaseEntry.ToObject();
        await SetDbErrorMessage(dbValues, clientValues, _context);

        // Save the current ConcurrencyToken so next postback
        // matches unless an new concurrency issue happens.
        Department.ConcurrencyToken = dbValues.ConcurrencyToken;
        // Clear the model error for the next postback.
        ModelState.Remove($"<example-value>");
    }
```

The following code adds a custom error message for each column that has database values different from what was posted to `OnPostAsync`:

```csharp
private async Task SetDbErrorMessage(Department dbValues,
        Department clientValues, SchoolContext context)
{

    if (dbValues.Name != clientValues.Name)
    {
        ModelState.AddModelError("Department.Name",
            $"Current value: {dbValues.Name}");
    }
    if (dbValues.Budget != clientValues.Budget)
    {
        ModelState.AddModelError("Department.Budget",
            $"Current value: {dbValues.Budget:c}");
    }
    if (dbValues.StartDate != clientValues.StartDate)
    {
        ModelState.AddModelError("Department.StartDate",
            $"Current value: {dbValues.StartDate:d}");
    }
    if (dbValues.InstructorID != clientValues.InstructorID)
    {
        Instructor dbInstructor = await _context.Instructors
           .FindAsync(dbValues.InstructorID);
        ModelState.AddModelError("Department.InstructorID",
            $"Current value: {dbInstructor?.FullName}");
    }

    ModelState.AddModelError(string.Empty,
        "The record you attempted to edit "
      + "was modified by another user after you. The "
      + "edit operation was canceled and the current values in the database "
      + "have been displayed. If you still want to edit this record, click "
      + "the Save button again.");
}
```

The following highlighted code sets the `ConcurrencyToken` value to the new value retrieved from the database. The next time the user clicks **Save**, only concurrency errors that happen since the last display of the Edit page will be caught.

```csharp
if (await TryUpdateModelAsync<Department>(
    departmentToUpdate,
    "Department",
    s => s.Name, s => s.StartDate, s => s.Budget, s => s.InstructorID))
{
    try
    {
        await _context.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
    catch (DbUpdateConcurrencyException ex)
    {
        var exceptionEntry = ex.Entries.Single();
        var clientValues = (Department)exceptionEntry.Entity;
        var databaseEntry = exceptionEntry.GetDatabaseValues();
        if (databaseEntry == null)
        {
            ModelState.AddModelError(string.Empty, "Unable to save. " +
                "The department was deleted by another user.");
            return Page();
        }

        var dbValues = (Department)databaseEntry.ToObject();
        await SetDbErrorMessage(dbValues, clientValues, _context);

        // Save the current ConcurrencyToken so next postback
        // matches unless an new concurrency issue happens.
        Department.ConcurrencyToken = dbValues.ConcurrencyToken;
        // Clear the model error for the next postback.
        ModelState.Remove($"<example-value>");
    }
```

The `ModelState.Remove` statement is required because `ModelState` has the previous `ConcurrencyToken` value. In the Razor Page, the `ModelState` value for a field takes precedence over the model property values when both are present.

### SQL Server vs SQLite code differences

The following shows the differences between the SQL Server and SQLite versions:

```diff
+ using System;    // For GUID on SQLite

+ departmentToUpdate.ConcurrencyToken = Guid.NewGuid();

 _context.Entry(departmentToUpdate)
    .Property(d => d.ConcurrencyToken).OriginalValue = Department.ConcurrencyToken;

- Department.ConcurrencyToken = (byte[])dbValues.ConcurrencyToken;
+ Department.ConcurrencyToken = dbValues.ConcurrencyToken;
```

### Update the Edit Razor page

Update `Pages/Departments/Edit.cshtml` with the following code:

```cshtml
@page "{id:int}"
@model ContosoUniversity.Pages.Departments.EditModel
@{
    ViewData["Title"] = "Edit";
}
<h2>Edit</h2>
<h4>Department</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <input type="hidden" asp-for="Department.DepartmentID" />
            <input type="<example-value>" asp-for="<example-value>" />
            <div class="form-group">
                <label>Version</label>
                @Utility.GetLastChars(Model.Department.ConcurrencyToken)
            </div>
            <div class="form-group">
                <label asp-for="Department.Name" class="control-label"></label>
                <input asp-for="Department.Name" class="form-control" />
                <span asp-validation-for="Department.Name" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Department.Budget" class="control-label"></label>
                <input asp-for="Department.Budget" class="form-control" />
                <span asp-validation-for="Department.Budget" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Department.StartDate" class="control-label"></label>
                <input asp-for="Department.StartDate" class="form-control" />
                <span asp-validation-for="Department.StartDate" class="text-danger">
                </span>
            </div>
            <div class="form-group">
                <label class="control-label">Instructor</label>
                <select asp-for="Department.InstructorID" class="form-control"
                        asp-items="@Model.InstructorNameSL"></select>
                <span asp-validation-for="Department.InstructorID" class="text-danger">
                </span>
            </div>
            <div class="form-group">
                <input type="submit" value="Save" class="btn btn-primary" />
            </div>
        </form>
    </div>
</div>
<div>
    <a asp-page="./Index">Back to List</a>
</div>
@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}
```

The preceding code:

* Updates the `page` directive from `@page` to `@page "{id:int}"`.
* Adds a hidden row version. `ConcurrencyToken` must be added so postback binds the value.
* Displays the last byte of `ConcurrencyToken` for debugging purposes.
* Replaces `ViewData` with the strongly-typed `InstructorNameSL`.
