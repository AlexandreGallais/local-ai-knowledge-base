---
title: "Tutorial: Create a controller-based web API with ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/first-web-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Tutorial: Create a controller-based web API with ASP.NET Core (part 3 of 3)

## The PutTodoItem method

Examine the `PutTodoItem` method:

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
{
    if (id != todoItem.Id)
    {
        return BadRequest();
    }

    _context.Entry(todoItem).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!TodoItemExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }

    return NoContent();
}
```
`PutTodoItem` is similar to `PostTodoItem`, except it uses `HTTP PUT`. The response is 204 (No Content). According to the HTTP specification, a `PUT` request requires the client to send the entire updated entity, not just the changes. To support partial updates, use HTTP PATCH.

### Test the PutTodoItem method

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Use the `PUT` method to update the `TodoItem` that has Id = 1 and set its name to `"feed fish"`. Note the response is `HTTP 204 No Content`.

# Visual Studio

* In **Endpoints Explorer**, right-click the **PUT** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```
  PUT {{TodoApi_HostAddress}}/api/todoitems/{{id}}
  Content-Type: application/json

  {
    //TodoItem
  }

  ###
  ```

* In the PUT request line, replace `{{id}}` with `1`.

* Replace the `//TodoItem` placeholder with the following lines:

  ```
  PUT {{TodoApi_HostAddress}}/api/todoitems/1
  Content-Type: application/json

  {
    "id": 1,
    "name": "feed fish",
    "isComplete": false
  }
  ```

* Select the **Send request** link that is above the new PUT request line.

  The PUT request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.

# Visual Studio Code

Use Swagger to send a PUT request:

* Select **Put /api/todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "id": 1,
    "name": "feed fish",
    "isComplete": false
  }
  ```

* Select **Execute**.

---

## The DeleteTodoItem method

Examine the `DeleteTodoItem` method:

```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteTodoItem(long id)
{
    var todoItem = await _context.TodoItems.FindAsync(id);
    if (todoItem == null)
    {
        return NotFound();
    }

    _context.TodoItems.Remove(todoItem);
    await _context.SaveChangesAsync();

    return NoContent();
}
```
### Test the DeleteTodoItem method

Use the `DELETE` method to delete the `TodoItem` that has Id = 1. Note the response is `HTTP 204 No Content`.

# Visual Studio

* In **Endpoints Explorer**, right-click the **DELETE** endpoint and select **Generate request**.

  A DELETE request is added to `TodoApi.http`.

* Replace `{{id}}` in the DELETE request line with `1`. The DELETE request should look like the following example:

  ```
  DELETE {{TodoApi_HostAddress}}/api/todoitems/{{id}}

  ###
  ```

* Select the **Send request** link for the DELETE request.

  The DELETE request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.

# Visual Studio Code

Use Swagger to send a DELETE request:

* Select **DELETE /api/todoitems/{id}** > **Try it out**.
* Set the **ID** field to `1` and select **Execute**.

  The DELETE request is sent to the app and the response is displayed in the **Responses** pane. The response body is empty, and the **Server response** status code is 204.

---

## Test with other tools

There are many other tools that can be used to test web APIs, for example:

* http-repl
* curl. Swagger uses `curl` and shows the `curl` commands it submits.
* Fiddler

## Prevent over-posting

Currently the sample app exposes the entire `TodoItem` object. Production apps typically limit the data that's input and returned using a subset of the model. There are multiple reasons behind this, and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this tutorial.

A DTO may be used to:

* Prevent over-posting.
* Hide properties that clients are not supposed to view.
* Omit some properties in order to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `TodoItem` class to include a secret field:

```csharp
namespace TodoApi.Models;

public class TodoItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    public string? Secret { get; set; }
}
```
The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a DTO model in a **Models/TodoItemDTO.cs** file:

```csharp
namespace TodoApi.Models;

public class TodoItemDTO
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
```
Update the `TodoItemsController` to use `TodoItemDTO`:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoItemsController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoItemsController(TodoContext context)
    {
        _context = context;
    }

    // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItemDTO>>> GetTodoItems()
    {
        return await _context.TodoItems
            .Select(x => ItemToDTO(x))
            .ToListAsync();
    }

    // GET: api/TodoItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItemDTO>> GetTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return ItemToDTO(todoItem);
    }

    // PUT: api/TodoItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(long id, TodoItemDTO todoDTO)
    {
        if (id != todoDTO.Id)
        {
            return BadRequest();
        }

        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        todoItem.Name = todoDTO.Name;
        todoItem.IsComplete = todoDTO.IsComplete;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }

    // POST: api/TodoItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<TodoItemDTO>> PostTodoItem(TodoItemDTO todoDTO)
    {
        var todoItem = new TodoItem
        {
            IsComplete = todoDTO.IsComplete,
            Name = todoDTO.Name
        };

        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetTodoItem),
            new { id = todoItem.Id },
            ItemToDTO(todoItem));
    }

    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoItemExists(long id)
    {
        return _context.TodoItems.Any(e => e.Id == id);
    }

    private static TodoItemDTO ItemToDTO(TodoItem todoItem) =>
       new TodoItemDTO
       {
           Id = todoItem.Id,
           Name = todoItem.Name,
           IsComplete = todoItem.IsComplete
       };
}
```
Verify you can't post or get the secret field.

## Call the web API with JavaScript

See Tutorial: Call an ASP.NET Core web API with JavaScript.

## Web API video series

See Video: Beginner's Series to: Web APIs.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see Enterprise web app patterns. A complete production-quality sample web app that implements the patterns is available.

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, consider one of the following:

* Microsoft Entra ID
* OpenIddict
* Duende IdentityServer
* Other community-supported authentication solutions

For a comparison of identity solutions, see Identity management solutions for .NET web apps.

Duende IdentityServer is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende IdentityServer enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> Duende Software might require you to pay a license fee for production use of Duende IdentityServer. For more information, see Migrate from ASP.NET Core in .NET 5 to .NET 6.

For more information, see the Duende IdentityServer documentation (Duende Software website).

## Publish to Azure

For information on deploying to Azure, see Quickstart: Deploy an ASP.NET web app.

## Related content

View or download sample code for this tutorial. See how to download.

For more information, see the following resources:

* Create web APIs with ASP.NET Core
* Tutorial: Create a Minimal API with ASP.NET Core
* Use the generated OpenAPI documents
* ASP.NET Core web API documentation with Swagger / OpenAPI
* Razor Pages with Entity Framework Core in ASP.NET Core - Tutorial 1 of 8
* Routing to controller actions in ASP.NET Core
* Controller action return types in ASP.NET Core web API
* Deploy ASP.NET Core apps to Azure App Service
* Host and deploy ASP.NET Core
* Create a web API with ASP.NET Core
