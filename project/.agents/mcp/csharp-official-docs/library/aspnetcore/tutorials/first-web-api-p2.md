---
title: "Tutorial: Create a controller-based web API with ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/tutorials/first-web-api.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Tutorial: Create a controller-based web API with ASP.NET Core (part 2 of 3)

## Register the database context

In ASP.NET Core, services such as the DB context must be registered with the dependency injection (DI) container. The container provides the service to controllers.

Update `Program.cs` with the following highlighted code:

# Visual Studio

```csharp
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseInMemoryDatabase("TodoList"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
# Visual Studio Code

```csharp
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseInMemoryDatabase("TodoList"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
---

The preceding code:

* Adds `using` directives.
* Adds the database context to the DI container.
* Specifies that the database context will use an in-memory database.

# Visual Studio

* Right-click the `Controllers` folder.
* Select **Add** > **:::no-loc text="New Scaffolded Item":::**.
* Select **API Controller with actions, using Entity Framework**, and then select **Add**.
* In the **Add API Controller with actions, using Entity Framework** dialog:

  * Select **TodoItem (TodoApi.Models)** in the **Model class**.
  * Select **TodoContext (TodoApi.Models)** in the **Data context class**.
  * Select **Add**.

  If the scaffolding operation fails, select **Add** to try scaffolding a second time.

This step adds the `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.Tools` NuGet packages to the project.
These packages are required for scaffolding.

# Visual Studio Code

Make sure that all of your changes so far are saved.

* Right-click (or Command-click on macOS) the **TodoAPI** project and select **Open in Terminal**.  The terminal opens at the `TodoAPI` project folder.
Run the following commands:

```dotnetcli
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool update -g dotnet-aspnet-codegenerator
```

The preceding commands:

* Add NuGet packages required for scaffolding.
* Install the scaffolding engine (`dotnet-aspnet-codegenerator`) after uninstalling any possible previous version.

For Linux, add the .NET tools directory to the system path with the following command:

```bash
echo 'export PATH=$HOME/.dotnet/tools:$PATH' >> ~/.bashrc
source ~/.bashrc
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

Build the project.

Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator controller -name TodoItemsController -async -api -m TodoItem -dc TodoContext -outDir Controllers
  ```

The preceding command scaffolds the `TodoItemsController`.

---

The generated code:

* Marks the class with the `[ApiController]` attribute. This attribute indicates that the controller responds to web API requests. For information about specific behaviors that the attribute enables, see Create web APIs with ASP.NET Core.
* Uses DI to inject the database context (`TodoContext`) into the controller. The database context is used in each of the CRUD methods in the controller.

The ASP.NET Core templates for:

* Controllers with views include `[action]` in the route template.
* API controllers don't include `[action]` in the route template.

When the `[action]` token isn'<example-value>'t included in the endpoint. That is, the action'<example-value>'t used in the matching route.

Open the generated `Controllers/TodoItemsController.cs` file to review the scaffolded code. Scaffolding generates a complete, working controller with action methods that create, read, update, and delete `TodoItem` data:

* `GetTodoItems`: Get all to-do items.
* `GetTodoItem`: Get a to-do item by ID.
* `PostTodoItem`: Create a to-do item.
* `PutTodoItem`: Update an existing to-do item.
* `DeleteTodoItem`: Delete a to-do item.

The following sections examine these generated methods, starting with `PostTodoItem`.

## Examine the `PostTodoItem` create method

Examine the scaffolded `PostTodoItem` method. The generated code already works. The return statement uses the nameof operator so the action name isn't hard-coded as a string. The commented-out line shows the equivalent hard-coded form that `nameof` replaces:

```csharp
[HttpPost]
public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
{
    _context.TodoItems.Add(todoItem);
    await _context.SaveChangesAsync();

    //    return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
    return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
}
```
The preceding code is an `HTTP POST` method, as indicated by the `[HttpPost]` attribute. The method gets the value of the `TodoItem` from the body of the HTTP request.

For more information, see Attribute routing with Http[Verb] attributes.

The `Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction*` method:

* Returns an HTTP 201 status code if successful. `HTTP 201` is the standard response for an `HTTP POST` method that creates a new resource on the server.
* Adds a Location header to the response. The `Location` header specifies the URI of the newly created to-do item. For more information, see 10.2.2 201 Created.
* References the `GetTodoItem` action to create the `Location` header's URI.

# Visual Studio

* Select **View** > **Other Windows** > **Endpoints Explorer**.
* Right-click the **POST** endpoint and select **Generate request**.

  A new file is created in the project folder named `TodoApi.http`, with contents similar to the following example:

  ```
  @TodoApi_HostAddress = https://localhost:49738

  POST {{TodoApi_HostAddress}}/api/todoitems
  Content-Type: application/json

  {
    //TodoItem
  }

  ###
  ```

  * The first line creates a variable that is used for all of the endpoints.
  * The next line defines a POST request.
  * The lines after the POST request line defines the headers, and a placeholder for the request body.
  * The triple hashtag (`###`) line is a request delimiter: what comes after it is for a different request.

* The POST request expects a `TodoItem`. To define the todo, replace the `//TodoItem` comment with the following JSON:

  ```json
  {
    "name": "walk dog",
    "isComplete": true
  }
  ```

  The TodoApi.http file should now look like the following example, but with your port number:

  ```
  @TodoApi_HostAddress = https://localhost:7260

  Post {{TodoApi_HostAddress}}/api/todoitems
  Content-Type: application/json

  {
    "name": "walk dog",
    "isComplete": true
  }

  ###
  ```

* Run the app.

* Select the **Send request** link that is above the `POST` request line.

  The POST request is sent to the app and the response is displayed in the **Response** pane.

# Visual Studio Code

* With the app still running, in the browser, navigate to `https://localhost:<port>/swagger` to display the API testing page generated by Swagger. Click on **TodoItems** to expand the operations.

* On the Swagger API testing page, select **Post /api/todoitems** > **Try it out**.
* Note that the **Request body** field contains a generated example format reflecting the parameters for the API.
* In the request body enter JSON for a to-do item, without specifying the optional `id`:

  ```json
  {
    "name": "walk dog",
    "isComplete": true
  }
  ```

* Select **Execute**.

* Swagger provides a **Responses** pane below the **Execute** button.

Note a few of the useful details:

* cURL: Swagger provides an example cURL command in Unix/Linux syntax, which can be run at the command line with any bash shell that uses Unix/Linux syntax, including Git Bash from Git for Windows.
* Request URL: A simplified representation of the HTTP request made by Swagger UI's JavaScript code for the API call. Actual requests can include details such as headers and query parameters and a request body.
* Server response: Includes the response body and headers. The response body shows the `id` was set to `1`.
* Response Code: A 201 `HTTP` status code was returned, indicating that the request was successfully processed and resulted in the creation of a new resource.

---

# Visual Studio

Test the app by calling the `GET` endpoints from a browser or by using **Endpoints Explorer**. The following steps are for **Endpoints Explorer**.

* In **Endpoints Explorer**, right-click the first **GET** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```
  GET {{TodoApi_HostAddress}}/api/todoitems

  ###
  ```

* Select the **Send request** link that is above the new `GET` request line.

  The GET request is sent to the app and the response is displayed in the **Response** pane.

* The response body is similar to the following JSON:

  ```json
  [
    {
      "id": 1,
      "name": "walk dog",
      "isComplete": true
    }
  ]
  ```

* In **Endpoints Explorer**, right-click the `/api/todoitems/{id}` **GET** endpoint and select **Generate request**.
  The following content is added to the `TodoApi.http` file:

  ```
  @id=0
  GET {{TodoApi_HostAddress}}/api/todoitems/{{id}}

  ###
  ```

* Assign `{@id}` to `1` (instead of `0`).

* Select the **Send request** link that is above the new GET request line.

  The GET request is sent to the app and the response is displayed in the **Response** pane.

* The response body is similar to the following JSON:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```

# Visual Studio Code

Test the app by calling the endpoints from a browser or Swagger.

* In Swagger select **GET /api/todoitems** > **Try it out** > **Execute**.

* Alternatively, call **GET /api/todoitems** from a browser by entering the URI `https://localhost:<port>/api/todoitems`. For example, `https://localhost:7260/api/todoitems`

The call to `GET /api/todoitems` produces a response similar to the following:

```json
[
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
]
```

* Call **GET /api/todoitems/{id}** in Swagger to return data from a specific id:
  * Select **GET /api/todoitems** > **Try it out**.
  * Set the **id** field to `1` and select **Execute**.

* Alternatively, call **GET /api/todoitems** from a browser by entering the URI `https://localhost:<port>/api/todoitems/1`. For example, `https://localhost:7260/api/todoitems/1`

* The response is similar to the following:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```

---

## Examine the GET methods

Two GET endpoints are implemented:

* `GET /api/todoitems`
* `GET /api/todoitems/{id}`

The previous section showed an example of the `/api/todoitems/{id}` route.

Follow the POST instructions to add another todo item, and then test the `/api/todoitems` route using Swagger.

This app uses an in-memory database. If the app is stopped and started, the preceding GET request doesn't return any data. If no data is returned, POST data to the app.

## Routing and URL paths

The `[HttpGet]` attribute denotes a method that responds to an `HTTP GET` request. The URL path for each method is constructed as follows:

* Start with the template string in the controller's `Route` attribute:

```csharp
[Route("api/[controller]")]
[ApiController]
public class TodoItemsController : ControllerBase
```
* Replace `[controller]` with the name of the controller, which by convention is the controller class name minus the "Controller" suffix. For this sample, the controller class name is **TodoItems**Controller, so the controller name is "TodoItems". ASP.NET Core routing is case insensitive.
* If the `[HttpGet]` attribute has a route template (for example, `[HttpGet("products")]`), append that to the path. This sample doesn't use a template. For more information, see Attribute routing with Http[Verb] attributes.

In the following `GetTodoItem` method, `"{id}"` is a placeholder variable for the unique identifier of the to-do item. When `GetTodoItem` is invoked, the value of `"{id}"` in the URL is provided to the method in its `id` parameter.

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
{
    var todoItem = await _context.TodoItems.FindAsync(id);

    if (todoItem == null)
    {
        return NotFound();
    }

    return todoItem;
}
```
## Return values

The return type of the `GetTodoItems` and `GetTodoItem` methods is ActionResult\<T> type. ASP.NET Core automatically serializes the object to JSON and writes the JSON into the body of the response message. The response code for this return type is 200 OK, assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

`ActionResult` return types can represent a wide range of HTTP status codes. For example, `GetTodoItem` can return two different status values:

* If no item matches the requested ID, the method returns a 404 status `Microsoft.AspNetCore.Mvc.ControllerBase.NotFound*` error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an `HTTP 200` response.
