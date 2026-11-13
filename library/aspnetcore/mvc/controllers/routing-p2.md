---
title: "Routing to controller actions in ASP.NET Core (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/controllers/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing to controller actions in ASP.NET Core (part 2 of 6)

## Attribute routing for REST APIs

REST APIs should use attribute routing to model the app's functionality as a set of resources where operations are represented by HTTP verbs.

Attribute routing uses a set of attributes to map actions directly to route templates. The following code is typical for a REST API and is used in the next sample:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

In the preceding code, you call `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllers*` to map attribute routed controllers.

In the following example:

* `HomeController` matches a set of URLs similar to what the default conventional route `{controller=Home}/{action=Index}/{id?}` matches.

```csharp
public class HomeController : Controller
{
    [Route("")]
    [Route("Home")]
    [Route("Home/Index")]
    [Route("Home/Index/{id?}")]
    public IActionResult Index(int? id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }

    [Route("Home/About")]
    [Route("Home/About/{id?}")]
    public IActionResult About(int? id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }
}
```

The `HomeController.Index` action runs for any of the URL paths `/`, `/Home`, `/Home/Index`, or `/Home/Index/3`.

This example highlights a key programming difference between attribute routing and conventional routing. Attribute routing requires more input to specify a route. The conventional default route handles routes more succinctly. However, attribute routing allows and requires precise control of which route templates apply to each action.

With attribute routing, the controller and action names play no part in which action is matched, unless token replacement is used. The following example matches the same URLs as the previous example:

```csharp
public class MyDemoController : Controller
{
    [Route("")]
    [Route("Home")]
    [Route("Home/Index")]
    [Route("Home/Index/{id?}")]
    public IActionResult MyIndex(int? id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }

    [Route("Home/About")]
    [Route("Home/About/{id?}")]
    public IActionResult MyAbout(int? id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }
}
```

The following code uses token replacement for `action` and `controller`:

```csharp
public class HomeController : Controller
{
    [Route("")]
    [Route("Home")]
    [Route("[controller]/[action]")]
    public IActionResult Index()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }

    [Route("[controller]/[action]")]
    public IActionResult About()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }
}
```

The following code applies `[Route("[controller]/[action]")]` to the controller:

```csharp
[Route("[controller]/[action]")]
public class HomeController : Controller
{
    [Route("~/")]
    [Route("/Home")]
    [Route("~/Home/Index")]
    public IActionResult Index()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }

    public IActionResult About()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }
}
```

In the preceding code, the `Index` method templates must prepend `/` or `~/` to the route templates. Route templates applied to an action that begin with `/` or `~/` don't get combined with route templates applied to the controller.

See Route template precedence for information on route template selection.

## Reserved routing names

The following keywords are reserved route parameter names when you use Controllers or Razor Pages:

* `action`
* `area`
* `controller`
* `handler`
* `page`

Using `page` as a route parameter with attribute routing is a common error. This choice results in inconsistent and confusing behavior with URL generation.

```csharp
public class MyDemo2Controller : Controller
{
    [Route("/articles/{page}")]
    public IActionResult ListArticles(int page)
    {
        return ControllerContext.MyDisplayRouteInfo(page);
    }
}
```

URL generation uses these special parameter names to determine if a URL generation operation refers to a Razor Page or to a Controller.

The following keywords are reserved in the context of a Razor view or a Razor Page:

* `page`
* `using`
* `namespace`
* `inject`
* `section`
* `inherits`
* `model`
* `addTagHelper`
* `removeTagHelper`

Don't use these keywords for link generations, model bound parameters, or top level properties.

## HTTP verb templates

ASP.NET Core includes the following HTTP verb templates:

* [HttpGet]
* [HttpPost]
* [HttpPut]
* [HttpDelete]
* [HttpHead]
* [HttpPatch]

### Route templates

ASP.NET Core includes the following route templates:

* All the HTTP verb templates are route templates.
* [Route]

### Attribute routing with HTTP verb attributes

Consider the following controller:

```csharp
[Route("api/[controller]")]
[ApiController]
public class Test2Controller : ControllerBase
{
    [HttpGet]   // GET /api/test2
    public IActionResult ListProducts()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }

    [HttpGet("{id}")]   // GET /api/test2/xyz
    public IActionResult GetProduct(string id)
    {
       return ControllerContext.MyDisplayRouteInfo(id);
    }
```

In the preceding code:

* Each action contains the `[HttpGet]` attribute, which constrains matching to HTTP GET requests only.
* The `GetProduct` action includes the `"{id}"` template, so the `id` appends to the `"api/[controller]"` template on the controller. The method's template is `"api/[controller]/{id}"`. Therefore this action only matches GET requests for the form `/api/test2/xyz`, `/api/test2/123`, `/api/test2/{any string}`, and so on.
  ```csharp
[HttpGet("{id}")]   // GET /api/test2/xyz
public IActionResult GetProduct(string id)
{
   return ControllerContext.MyDisplayRouteInfo(id);
}
```
* The `GetIntProduct` action contains the `"int/{id:int}"` template. The `:int` portion of the template constrains the `id` route values to strings that can be converted to an integer. A GET request to `/api/test2/int/abc`:
  * Doesn't match this action.
  * Returns a 404 Not Found error.
    ```csharp
[HttpGet("int/{id:int}")] // GET /api/test2/int/3
public IActionResult GetIntProduct(int id)
{
    return ControllerContext.MyDisplayRouteInfo(id);
}
```
* The `GetInt2Product` action contains `{id}` in the template, but doesn't constrain `id` to values that can be converted to an integer. A GET request to `/api/test2/int2/abc`:
  * Matches this route.
  * Model binding fails to convert `abc` to an integer. The `id` parameter of the method is integer.
  * Returns a 400 Bad Request because model binding failed to convert `abc` to an integer.
      ```csharp
[HttpGet("int2/{id}")]  // GET /api/test2/int2/3
public IActionResult GetInt2Product(int id)
{
    return ControllerContext.MyDisplayRouteInfo(id);
}
```

Attribute routing can use `Microsoft.AspNetCore.Mvc.Routing.HttpMethodAttribute` attributes such as `Microsoft.AspNetCore.Mvc.HttpPostAttribute`, `Microsoft.AspNetCore.Mvc.HttpPutAttribute`, and `Microsoft.AspNetCore.Mvc.HttpDeleteAttribute`. All of the HTTP verb attributes accept a route template. The following example shows two actions that match the same route template:

```csharp
[ApiController]
public class MyProductsController : ControllerBase
{
    [HttpGet("/products3")]
    public IActionResult ListProducts()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }

    [HttpPost("/products3")]
    public IActionResult CreateProduct(MyProduct myProduct)
    {
        return ControllerContext.MyDisplayRouteInfo(myProduct.Name);
    }
}
```

Using the URL path `/products3`:

* The `MyProductsController.ListProducts` action runs when the HTTP verb is `GET`.
* The `MyProductsController.CreateProduct` action runs when the HTTP verb is `POST`.

When building a REST API, it's rare that you need to use `[Route(...)]` on an action method because the action accepts all HTTP methods. Use the more specific HTTP verb attribute to be precise about what your API supports. Clients of REST APIs are expected to know what paths and HTTP verbs map to specific logical operations.

REST APIs should use attribute routing to model the app's functionality as a set of resources where operations are represented by HTTP verbs. This design means that many operations, such as GET and POST on the same logical resource, use the same URL. Attribute routing provides the level of control needed to carefully design an API's public endpoint layout.

Since an attribute route applies to a specific action, it's easy to make parameters required as part of the route template definition. In the following example, `id` is required as part of the URL path:

```csharp
[ApiController]
public class Products2ApiController : ControllerBase
{
    [HttpGet("/products2/{id}", Name = "Products_List")]
    public IActionResult GetProduct(int id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }
}
```

The `Products2ApiController.GetProduct(int)` action:

* Is run with URL path like `/products2/3`
* Isn't run with the URL path `/products2`.

The [Consumes] attribute allows an action to limit the supported request content types. For more information, see Define supported request content types with the Consumes attribute.

 See Routing for a full description of route templates and related options.

For more information on `[ApiController]`, see ApiController attribute.

## Route name

The following code  defines a route name of `Products_List`:

```csharp
[ApiController]
public class Products2ApiController : ControllerBase
{
    [HttpGet("/products2/{id}", Name = "Products_List")]
    public IActionResult GetProduct(int id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }
}
```

Use route names to generate a URL based on a specific route. Route names:

* Have no impact on the URL matching behavior of routing.
* Are only used for URL generation.

Route names must be unique application-wide.

Contrast the preceding code with the conventional default route, which defines the `id` parameter as optional (`{id?}`). The ability to precisely specify APIs has advantages, such as  allowing `/products` and `/products/5` to be dispatched to different actions.
