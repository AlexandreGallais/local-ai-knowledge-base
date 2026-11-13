---
title: "Part 2, add a controller to an ASP.NET Core MVC app"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/first-mvc-app/adding-controller.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 2, add a controller to an ASP.NET Core MVC app

-->
-->

The Model-View-Controller (MVC) architectural pattern separates an app into three main components: **M**odel, **V**iew, and **C**ontroller. The MVC pattern helps you create apps that are more testable and easier to update than traditional monolithic apps.

MVC-based apps contain:

* **M**odels: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a `Movie` model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* **V**iews: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* **C**ontrollers: Classes that:
  * Handle browser requests.
  * Invoke model logic to retrieve or modify data.
  * Call view templates that return a response.

In an MVC app, the view only displays information. The controller handles and responds to user input and interaction. For example, the controller handles URL segments and query-string values, and passes these values to the model. The model might use these values to query the database. For example:

* `https://localhost:5001/Home/Privacy`: specifies the `Home` controller and the `Privacy` action.
* `https://localhost:5001/Movies/Edit/5`: is a request to edit the movie with ID=5 using the `Movies` controller and the `Edit` action, which are detailed later in the tutorial.

Route data is explained later in the tutorial.

The MVC architectural pattern separates an app into three main groups of components: Models, Views, and Controllers. This pattern helps to achieve separation of concerns: The UI logic belongs in the view. Input logic belongs in the controller. Business logic belongs in the model. This separation helps manage complexity when building an app, because it enables work on one aspect of the implementation at a time without impacting the code of another. For example, you can work on the view code without depending on the business logic code.

These concepts are introduced and demonstrated in this tutorial series while building a movie app. The MVC project contains folders for the *Controllers* and *Views*.

# Visual Studio

In **Solution Explorer**, right-click **Controllers > Add > Controller**.

In the **Add New Scaffolded Item** dialog box, select **MVC Controller - Empty** > **Add**.

In the **Add New Item - MvcMovie** dialog, enter *`HelloWorldController.cs`* and select **Add**.

# Visual Studio Code

Select the **EXPLORER** icon and then control-click (right-click) **Controllers > New File** and name the new file `HelloWorldController.cs`.

---

Replace the contents of `Controllers/HelloWorldController.cs` with the following code:

  ```csharp
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace MvcMovie.Controllers;

public class HelloWorldController : Controller
{
    // 
    // GET: /HelloWorld/
    public string Index()
    {
        return "This is my default action...";
    }
    // 
    // GET: /HelloWorld/Welcome/ 
    public string Welcome()
    {
        return "This is the Welcome action method...";
    }
}
```

Every `public` method in a controller is callable as an HTTP endpoint. In the sample above, both methods return a string. Note the comments preceding each method.

An HTTP endpoint:

* Is a targetable URL in the web application, such as `https://localhost:5001/HelloWorld`.
* Combines:
  * The protocol used: `HTTPS`.
  * The network location of the web server, including the TCP port: `localhost:5001`.
  * The target URI: `HelloWorld`.

The first comment states this is an HTTP GET method that's invoked by appending `/HelloWorld/` to the base URL.

The second comment specifies an HTTP GET method that's invoked by appending `/HelloWorld/Welcome/` to the URL. Later on in the tutorial, the scaffolding engine is used to generate `HTTP POST` methods, which update data.

Run the app without the debugger by pressing `Ctrl`+`F5`.

Append `/HelloWorld` to the path in the address bar. The `Index` method returns a string.

MVC invokes controller classes, and the action methods within them, depending on the incoming URL. The default URL routing logic used by MVC, uses a format like this to determine what code to invoke:

`/[Controller]/[ActionName]/[Parameters]`

The routing format is set in the `Program.cs` file.

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();
```

When you browse to the app and don't supply any URL segments, it defaults to the "Home" controller and the "Index" method specified in the template line highlighted above.  In the preceding URL segments:

* The first URL segment determines the controller class to run. So `localhost:5001/HelloWorld` maps to the **HelloWorld** Controller class.
* The second part of the URL segment determines the action method on the class. So `localhost:5001/HelloWorld/Index` causes the `Index` method of the `HelloWorldController` class to run. Notice that you only had to browse to `localhost:5001/HelloWorld` and the `Index` method was called by default. `Index` is the default method that will be called on a controller if a method name isn't explicitly specified.
* The third part of the URL segment ( `id`) is for route data. Route data is explained later in the tutorial.

Browse to: `https://localhost:{PORT}/HelloWorld/Welcome`. Replace `{PORT}` with your port number.

The `Welcome` method runs and returns the string `This is the Welcome action method...`. For this URL, the controller is `HelloWorld` and `Welcome` is the action method. You haven't used the `[Parameters]` part of the URL yet.

Modify the code to pass some parameter information from the URL to the controller. For example, `/HelloWorld/Welcome?name=Rick&numtimes=4`.

Change the `Welcome` method to include two parameters as shown in the following code.

```csharp
// GET: /HelloWorld/Welcome/ 
// Requires using System.Text.Encodings.Web;
public string Welcome(string name, int numTimes = 1)
{
    return HtmlEncoder.Default.Encode($"Hello {name}, NumTimes is: {numTimes}");
}
```

The preceding code:

* Uses the C# optional-parameter feature to indicate that the `numTimes` parameter defaults to 1 if no value is passed for that parameter.
* Uses `HtmlEncoder.Default.Encode` to protect the app from malicious input, such as through JavaScript.
* Uses Interpolated Strings in `$"Hello {name}, NumTimes is: {numTimes}"`.

Run the app and browse to: `https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4`. Replace `{PORT}` with your port number.

Try different values for `name` and `numtimes` in the URL. The MVC model binding system automatically maps the named parameters from the query string to parameters in the method. See Model Binding for more information.

In the previous image:

* The URL segment `Parameters` isn't used.
* The `name` and `numTimes` parameters are passed in the query string.
* The `?` (question mark) in the above URL is a separator, and the query string follows.
* The `&` character separates field-value pairs.

Replace the `Welcome` method with the following code:

  ```csharp
public string Welcome(string name, int ID = 1)
{
    return HtmlEncoder.Default.Encode($"Hello {name}, ID: {ID}");
}
```

Run the app and enter the following URL: `https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick`

In the preceding URL:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` starts the query string.

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();
```

In the preceding example:

* The third URL segment matched the route parameter `id` as defined in the routing template in the `Program.cs` file.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` (in `id?`) indicates the `id` parameter is optional.

> Previous: Get Started
> Next: Add a View
