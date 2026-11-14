---
title: "Implement CRUD - ASP.NET MVC with EF Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/data/ef-mvc/crud.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Implement CRUD - ASP.NET MVC with EF Core (part 2 of 3)

## Update the Edit page

In the _StudentController.cs_ file, the HttpGet `Edit` method (the one without the `HttpPost` attribute) uses the `FirstOrDefaultAsync` method to retrieve the selected `Student` entity, as you reviewed earlier in the `Details` method. You don't need to change this method.

### Use recommended HttpPost Edit code: Read and update

Replace the HttpPost `Edit` method with the following code.

```csharp
[HttpPost, ActionName("Edit")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> EditPost(int? id)
{
    if (id == null)
    {
        return NotFound();
    }
    var studentToUpdate = await _context.Students.FirstOrDefaultAsync(s => s.ID == id);
    if (await TryUpdateModelAsync<Student>(
        studentToUpdate,
        "",
        s => s.FirstMidName, s => s.LastName, s => s.EnrollmentDate))
    {
        try
        {
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        catch (DbUpdateException /* ex */)
        {
            //Log the error (uncomment ex variable name and write a log.)
            ModelState.AddModelError("", "Unable to save changes. " +
                "Try again, and if the problem persists, " +
                "see your system administrator.");
        }
    }
    return View(studentToUpdate);
}
```

These changes implement a security best practice to prevent overposting. The scaffolder generated a `Bind` attribute and added the entity created by the model binder to the entity set with a `Modified` flag. That code isn't recommended for many scenarios because the `Bind` attribute clears out any preexisting data in fields not listed in the `Include` parameter.

The new code reads the existing entity and calls the `TryUpdateModel` method to update fields in the retrieved entity based on user input in the posted form data. (For more information, see Model Binding in ASP.NET Core.) The Entity Framework's automatic change tracking sets the `Modified` flag on fields that the form input updates. When the `SaveChanges` method is called, the Entity Framework creates SQL statements to update the database row. Concurrency conflicts are ignored, and only the table columns updated by the user are also updated in the database. (A later tutorial shows how to handle concurrency conflicts.)

As a best practice to prevent overposting, the fields that you want to be updateable by the **Edit** page are declared in the `TryUpdateModel` parameters. (The empty string preceding the list of fields in the parameter list is for a prefix to use with the form fields names.) Currently, there are no extra fields that you're protecting. If you list the fields you want the model binder to bind, you can prevent overposting for fields added in the future. The fields in the list are automatically protected until you explicitly add them.

As a result of these changes, the method signature of the HttpPost `Edit` method is the same as the HttpGet `Edit` method. The changes basically rename the method to `EditPost`.

### Use alternate HttpPost Edit code: Create and attach

The recommended HttpPost `Edit` code ensures that only changed columns are updated and preserves data in properties that you don't want included for model binding. However, the read-first approach requires an extra database read, and can result in more complex code for handling concurrency conflicts. An alternative is to attach an entity created by the model binder to the Entity Framework context and mark it as modified. (Don't update your project with the following code. The code illustrates an optional approach.)

```csharp
public async Task<IActionResult> Edit(int id, [Bind("ID,EnrollmentDate,FirstMidName,LastName")] Student student)
{
    if (id != student.ID)
    {
        return NotFound();
    }
    if (ModelState.IsValid)
    {
        try
        {
            _context.Update(student);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        catch (DbUpdateException /* ex */)
        {
            //Log the error (uncomment ex variable name and write a log.)
            ModelState.AddModelError("", "Unable to save changes. " +
                "Try again, and if the problem persists, " +
                "see your system administrator.");
        }
    }
    return View(student);
}
```

You can use this approach when the web page UI includes all of the fields in the entity and can update any of them.

The scaffolded code uses the _create-and-attach_ approach but only catches `DbUpdateConcurrencyException` exceptions and returns 404 error codes. The example shown catches any database update exception and displays an error message.

### Understand entity states

The database context keeps track of whether entities in memory are in sync with their corresponding rows in the database. This information determines what happens when you call the `SaveChanges` method. For example, when you pass a new entity to the `Add` method, that entity's state is set to `Added`. When you call the `SaveChanges` method, the database context issues a SQL INSERT command.

An entity can be in one of the following states:

* `Added`: The entity doesn't yet exist in the database. The `SaveChanges` method issues an `INSERT` statement.

* `Unchanged`: Nothing needs to be done with this entity by the `SaveChanges` method. When you read an entity from the database, the entity starts out with this status.

* `Modified`: Some or all of the entity's property values are modified. The `SaveChanges` method issues an `UPDATE` statement.

* `Deleted`: The entity is marked for deletion. The `SaveChanges` method issues a `DELETE` statement.

* `Detached`: The database context doesn't track the entity.

In a desktop application, state changes are typically set automatically. You read an entity and make changes to some of its property values. This behavior causes its entity state to automatically change to `Modified`. When you call the `SaveChanges` method, the Entity Framework generates a SQL `UPDATE` statement that updates only the actual properties that you changed.

In a web app, the `DbContext` object that initially reads an entity and displays its data to be edited is disposed after a page is rendered. When the HttpPost `Edit` action method is called, a new web request is made and you have a new instance of the `DbContext` class. If you re-read the entity in that new context, you simulate desktop processing.

If you don't want to do the extra read operation, you have to use the entity object created by the model binder. The easiest approach is to set the entity state to `Modified` as is done in the alternative HttpPost `Edit` code shown earlier. When you call the `SaveChanges` method, the Entity Framework updates all columns of the database row because the context has no way to know which properties you changed.

If you want to avoid the _read-first_ approach, but you also want the SQL `UPDATE` statement to update only the fields the user changes, the code is more complex. You have to save the original values in some way, such as by using hidden fields. The values must be available when the HttpPost `Edit` method is called. You can create a `Student` entity by using the original values, call the `Attach` method with the original version of the entity, update the entity's values to the new values, and then call the `SaveChanges` method.

### Test the Edit page

Run the app, select the **Students** tab, then select an **Edit** hyperlink.

Change some of the data and select **Save**. The **Index** page opens and you see the changed data.

## Update the Delete page

In the _StudentController.cs_ file, the template code for the HttpGet `Delete` method uses the `FirstOrDefaultAsync` method to retrieve the selected `Student` entity, as you saw in the `Details` and `Edit` methods. However, to implement a custom error message when the call to the `SaveChanges` method fails, you need to add some functionality to this method and its corresponding view.

As you saw for the update and create operations, delete operations require two action methods. The method called in response to a GET request displays a view that gives the user a chance to approve or cancel the delete operation. If the user approves, a POST request is created. The HttpPost `Delete` method is then called and this method actually performs the delete operation.

You need to add a try-catch block to the HttpPost `Delete` method to handle any errors that might occur when the database is updated. If an error occurs, the HttpPost `Delete` method calls the HttpGet `Delete` method, passing a parameter that indicates an error. The HttpGet `Delete` method redisplays the confirmation page along with the error message, giving the user an opportunity to cancel or try again.

Replace the HttpGet `Delete` action method with the following code, which manages error reporting.

```csharp
public async Task<IActionResult> Delete(int? id, bool? saveChangesError = false)
{
    if (id == null)
    {
        return NotFound();
    }

    var student = await _context.Students
        .AsNoTracking()
        .FirstOrDefaultAsync(m => m.ID == id);
    if (student == null)
    {
        return NotFound();
    }

    if (saveChangesError.GetValueOrDefault())
    {
        ViewData["ErrorMessage"] =
            "Delete failed. Try again, and if the problem persists " +
            "see your system administrator.";
    }

    return View(student);
}
```

This code accepts an optional parameter that indicates whether the method call is after a failure to save changes. This parameter is false when the HttpGet `Delete` method is called without a previous failure. When the method is called by the HttpPost `Delete` method in response to a database update error, the parameter is true and an error message is passed to the view.

### Use read-first approach to HttpPost Delete

Replace the HttpPost `Delete` action method (named `DeleteConfirmed`) with the following code. This code performs the actual delete operation and catches any database update errors.

```csharp
[HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> DeleteConfirmed(int id)
{
    var student = await _context.Students.FindAsync(id);
    if (student == null)
    {
        return RedirectToAction(nameof(Index));
    }

    try
    {
        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    catch (DbUpdateException /* ex */)
    {
        //Log the error (uncomment ex variable name and write a log.)
        return RedirectToAction(nameof(Delete), new { id = id, saveChangesError = true });
    }
}
```

The code retrieves the selected entity, and then calls the `Remove` method to set the entity's status to `Deleted`. When the `SaveChanges` method is called, a SQL DELETE command is generated.

### Use create-and-attach approach to HttpPost Delete

If improving performance in a high-volume application is a priority, you might avoid an unnecessary SQL query by instantiating a `Student` entity by using only the primary key value and setting the entity state to `Deleted`. This information is all the Entity Framework needs to delete the entity. (Don't update your project with the following code. The code illustrates an alternate approach.)

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> DeleteConfirmed(int id)
{
    try
    {
        Student studentToDelete = new Student() { ID = id };
        _context.Entry(studentToDelete).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    catch (DbUpdateException /* ex */)
    {
        //Log the error (uncomment ex variable name and write a log.)
        return RedirectToAction(nameof(Delete), new { id = id, saveChangesError = true });
    }
}
```

If the entity also contains related data to delete, make sure that cascade delete is configured in the database. With this approach to entity deletion, Entity Framework might not realize there are related entities to delete.

### Update the Delete view

In the _Views/Student/Delete.cshtml_ file, add an error message between the h2 heading and the h3 heading, as shown in the following example:

```cshtml
<h2>Delete</h2>
<p class="text-danger">@ViewData["ErrorMessage"]</p>
<h3>Are you sure you want to delete this?</h3>
```

Run the app, select the **Students** tab, and select a **Delete** hyperlink:

Select **Delete**. The **Index** page displays without the deleted student. (You see an example of the error handling code in action in the concurrency tutorial.)

## Close database connections

To free up the resources that a database connection holds, the context instance must be disposed as soon as possible when you're finished. The ASP.NET Core built-in dependency injection takes care of the clean-up task.

In the _Startup.cs_ file, you call the AddDbContext extension method to create the `DbContext` class in the ASP.NET Core DI container. The method sets the service lifetime to `Scoped` by default. `Scoped` means the context object lifetime coincides with the web request life time, and the `Dispose` method is called automatically at the end of the web request.

## Handle transactions

By default, the Entity Framework implicitly implements transactions. In scenarios where you make changes to multiple rows or tables and then call the `SaveChanges` method, the Entity Framework automatically makes sure that either all of your changes succeed or they all fail. If some changes are finished first and then an error occurs, the completed changes are automatically rolled back. In scenarios where you need more control, see Transactions. The examples cover how to include operations completed outside of Entity Framework in a transaction.
