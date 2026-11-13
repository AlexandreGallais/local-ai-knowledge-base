---
title: "Tutorial: Create a Minimal API with ASP.NET Core (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/min-web-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Tutorial: Create a Minimal API with ASP.NET Core (part 3 of 5)

## Create and examine the PATCH endpoint

A PATCH endpoint lets clients send only the fields they want to update, such as renaming a Todo item without resending its completion status. This approach differs from a PUT request, which replaces the entire item, so the client must send every field even if only one is changed.

The next steps add a new file and modify the `Program.cs` file. Stop the `TodoApi` app before making these changes. Leave the Scalar page in the browser running.

# Visual Studio

* To stop the app, select the **Stop** button (the red square) in the Visual Studio toolbar.

# Visual Studio Code

* To stop the app, press `Shift`+`F5`.

---

This sample uses an in-memory database that you must initialize each time the app starts. The database must contain an item before you make a PATCH call. Call POST to ensure the database has an item before making a PATCH call.

The PATCH endpoint uses a `TodoPatchDto` class with nullable properties to properly handle partial updates. By using nullable properties, the endpoint can distinguish between a field that wasn't provided (null) and a field explicitly set to a value (including false for boolean fields). Without nullable properties, a non-nullable bool defaults to false, which could potentially overwrite an existing true value when that field isn't included in the request.

* Create a file named `TodoPatchDto.cs` with the following code:

```csharp
﻿public class TodoPatchDto
{
    public string? Name { get; set; }
    public bool? IsComplete { get; set; }
}
```
The `TodoPatchDto` class uses nullable properties (`string?` and `bool?`) to distinguish between a field that wasn't provided in the request versus a field explicitly set to a value.

* In `Program.cs`, add the following PATCH endpoint immediately after the `MapPut` endpoint:

# Visual Studio

```csharp
app.MapPatch("/todoitems/{id}", async (int id, TodoPatchDto inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    if (inputTodo.Name is not null) todo.Name = inputTodo.Name;
    if (inputTodo.IsComplete is not null) todo.IsComplete = inputTodo.IsComplete.Value;

    await db.SaveChangesAsync();

    return Results.NoContent();
});
```
# Visual Studio Code

```csharp
app.MapPatch("/todoitems/{id}", async (int id, TodoPatchDto inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    if (inputTodo.Name is not null) todo.Name = inputTodo.Name;
    if (inputTodo.IsComplete is not null) todo.IsComplete = inputTodo.IsComplete.Value;

    await db.SaveChangesAsync();

    return Results.NoContent();
});
```
---

This method is similar to the `MapPut` method, but it uses HTTP PATCH and only updates the fields provided in the request. A successful response returns 204 (No Content).

> **Note:**
> PATCH operations allow partial updates to resources. For more advanced partial updates using JSON Patch documents, see JsonPatch in ASP.NET Core web API.

# Visual Studio

* Press `Ctrl`+`F5` to rebuild and run the app with the new PATCH endpoint.

# Visual Studio Code

* Run the app again so it rebuilds with the new PATCH endpoint. In Visual Studio Code, press `Ctrl`+`F5` (Windows) or `control`+`F5` (macOS) to run the app without debugging.

---

This sample uses an in-memory database that you must initialize each time the app starts. The database must contain an item before you make a PATCH call. Call POST to ensure the database has an item before making a PATCH call.

Update only the `name` property of the Todo item that has `Id = 1` and set its name to `"run errands"`.

# Visual Studio

* In **Endpoints Explorer**, select the refresh button. Then, right-click the **PATCH** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

```http
  PATCH {{TodoApi_HostAddress}}/todoitems/{id}

  ###
```

* In the PATCH request line, replace `{id}` with `1`.

* Add the following lines immediately after the PATCH request line:

```http
  Content-Type: application/json

  {
    "name": "run errands"
  }
```

  The preceding code adds a Content-Type header and a JSON request body with only the field to update.

* Select the **Send request** link that is above the new PATCH request line.

# Visual Studio Code

Use the Scalar UI to send a PATCH request:

* Refresh the scalar page in the browser so that the new `PATCH` endpoint appears.

* Select **PATCH /todoitems/{id}**, and then select **Test Request**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

```json
  {
    "name": "run errands"
  }
```

* Select **Send**.

---

The PATCH request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.

## Examine the DELETE endpoint

Your `Program.cs` file includes a single DELETE endpoint, defined with `MapDelete`:

# Visual Studio

```csharp
app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});
```
# Visual Studio Code

```csharp
app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});
```
---

# Visual Studio

* In **Endpoints Explorer**, right-click the **DELETE** endpoint and select **Generate request**.

  A DELETE request is added to `TodoApi.http`.

* Replace `{id}` in the DELETE request line with `1`. The DELETE request should look like the following example:

```http
  DELETE {{TodoApi_HostAddress}}/todoitems/1

  ###
```

* Select the **Send request** link for the DELETE request.

# Visual Studio Code

Use the Scalar UI to send a DELETE request:

* Select **DELETE /todoitems/{id}**, then **Test Request**.
* Set the **id** field to `1` and select **Send**.

---

The DELETE request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.

## Use the MapGroup API

* The next steps modify the `Program.cs` file, so stop the app before making these changes. Leave the scalar page in the browser running.

# Visual Studio

* To stop the app, select the **Stop** button (the red square) in the Visual Studio toolbar.

# Visual Studio Code

* To stop the app, press `Shift`+`F5`.

---

The `Program.cs` file you wrote repeats the `todoitems` URL prefix each time it sets up an endpoint. APIs often have groups of endpoints with a common URL prefix, and the `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup*` method helps organize such groups. It reduces repetitive code and allows you to customize entire groups of endpoints with a single call to methods like `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` and `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata*`.

* Replace the contents of `Program.cs` with the following code:

# Visual Studio

```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddOpenApi();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var todoItems = app.MapGroup("/todoitems");

todoItems.MapGet("/", async (TodoDb db) =>
    await db.Todos.ToListAsync());

todoItems.MapGet("/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).ToListAsync());

todoItems.MapGet("/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

todoItems.MapPost("/", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
});

todoItems.MapPut("/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

todoItems.MapPatch("/{id}", async (int id, TodoPatchDto inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    if (inputTodo.Name is not null) todo.Name = inputTodo.Name;
    if (inputTodo.IsComplete is not null) todo.IsComplete = inputTodo.IsComplete.Value;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

todoItems.MapDelete("/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
```
# Visual Studio Code

```csharp
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddOpenApi();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

var todoItems = app.MapGroup("/todoitems");

todoItems.MapGet("/", async (TodoDb db) =>
    await db.Todos.ToListAsync());

todoItems.MapGet("/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).ToListAsync());

todoItems.MapGet("/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

todoItems.MapPost("/", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
});

todoItems.MapPut("/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

todoItems.MapPatch("/{id}", async (int id, TodoPatchDto inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    if (inputTodo.Name is not null) todo.Name = inputTodo.Name;
    if (inputTodo.IsComplete is not null) todo.IsComplete = inputTodo.IsComplete.Value;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

todoItems.MapDelete("/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
```
---

The preceding code has the following changes:

* Adds `var todoItems = app.MapGroup("/todoitems");` to set up the group using the URL prefix `/todoitems`.
* Changes all the `app.Map<HttpVerb>` methods to `todoItems.Map<HttpVerb>`.
* Removes the URL prefix `/todoitems` from the `Map<HttpVerb>` method calls.

* Runs the app and tests the endpoints to verify that they work the same.
