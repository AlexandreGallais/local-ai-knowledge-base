---
title: "Routing to controller actions in ASP.NET Core (part 1 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/controllers/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing to controller actions in ASP.NET Core

By Ryan Nowak, Kirk Larkin, and Rick Anderson

-->
-->

ASP.NET Core controllers use the Routing middleware to match the URLs of incoming requests and map them to actions.  Route templates:

* Are defined at startup in `Program.cs` or in attributes.
* Describe how URL paths are matched to actions.
* Are used to generate URLs for links. The generated links are typically returned in responses.

Actions are either conventionally-routed or attribute-routed. Placing a route on the controller or action makes it attribute-routed. See Mixed routing for more information.

This document:

* Explains the interactions between MVC and routing:
  * How typical MVC apps make use of routing features.
  * Covers both:
    * Conventional routing typically used with controllers and views.
    * *Attribute routing* used with REST APIs. If you're primarily interested in routing for REST APIs, jump to the Attribute routing for REST APIs section.
  * See Routing for advanced routing details.
* Refers to the default routing system as endpoint routing. You can use controllers with the previous version of routing for compatibility purposes. See the 2.2-3.0 migration guide for instructions.

## Set up conventional route

The ASP.NET Core MVC template generates conventional routing code similar to the following example:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

Use `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*` to create a single route. The single route is the `default` route. Most apps with controllers and views use a route template similar to the `default` route. REST APIs should use attribute routing.

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

The route template `"{controller=Home}/{action=Index}/{id?}"`:

* Matches a URL path like `/Products/Details/5`
* Extracts the route values `{ controller = Products, action = Details, id = 5 }` by tokenizing the path. The extraction of route values results in a match if the app has a controller named `ProductsController` and a `Details` action:

  ```csharp
public class ProductsController : Controller
{
    public IActionResult Details(int id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }
}
```

  MyDisplayRouteInfo is provided by the Rick.Docs.Samples.RouteInfo NuGet package and displays route information.

* `/Products/Details/5` model binds the value of `id = 5` to set the `id` parameter to `5`. For more information, see Model Binding.
* `{controller=Home}` defines `Home` as the default `controller`.
* `{action=Index}` defines `Index` as the default `action`.
* The `?` character in `{id?}` defines `id` as optional.
  * Default and optional route parameters don't need to be present in the URL path for a match. For a detailed description of route template syntax, see Route Template Reference.
* Matches the URL path `/`.
* Produces the route values `{ controller = Home, action = Index }`.

The values for `controller` and `action` make use of the default values. `id` doesn't produce a value since there's no corresponding segment in the URL path. `/` only matches if there exists a `HomeController` and `Index` action:

```csharp
public class HomeController : Controller
{
    public IActionResult Index() { ... }
}
```

Using the preceding controller definition and route template, the `HomeController.Index` action runs for the following URL paths:

* `/Home/Index/17`
* `/Home/Index`
* `/Home`
* `/`

The URL path `/` uses the route template default `Home` controller and `Index` action. The URL path `/Home` uses the route template default `Index` action.

The convenience method `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapDefaultControllerRoute*`:

```csharp
app.MapDefaultControllerRoute();
```

Replaces:

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

> **Important:**
> Routing is configured by using the `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` and `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*` middleware. To use controllers:
>
> * Call `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllers*` to map attribute routed controllers.
> * Call `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*` or `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapAreaControllerRoute*`, to map both conventionally routed controllers and attribute routed controllers.
>
> Apps typically don't need to call `UseRouting` or `UseEndpoints`. `Microsoft.AspNetCore.Builder.WebApplicationBuilder` configures a middleware pipeline that wraps middleware added in `Program.cs` by using `UseRouting` and `UseEndpoints`. For more information, see Routing in ASP.NET Core.

## Conventional routing

Use conventional routing with controllers and views. The `default` route is:

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

The preceding code is an example of a *conventional route*. It's called *conventional routing* because it establishes a *convention* for URL paths:

* The first path segment, `{controller=Home}`, maps to the controller name.
* The second segment, `{action=Index}`, maps to the action name.
* The third segment, `{id?}` is used for an optional `id`. The `?` in `{id?}` makes it optional. `id` maps to a model entity.

Using this `default` route, the URL path:

* `/Products/List` maps to the `ProductsController.List` action.
* `/Blog/Article/17` maps to `BlogController.Article` and typically model binds the `id` parameter to 17.

This mapping:

* Is based on the controller and action names **only**.
* Isn't based on namespaces, source file locations, or method parameters.

By using conventional routing with the default route, you don't need to create a new URL pattern for each action. For an app with CRUD style actions, having consistency for the URLs across controllers:

* Helps simplify the code.
* Makes the UI more predictable.

> **Warning:**
> The route template defines the `id` as optional. Actions can execute without the optional ID provided as part of the URL. Generally, when `id` is omitted from the URL:
>
> * Model binding sets `id` to `0`.
> * No entity is found in the database matching `id == 0`.
>
> Attribute routing provides fine-grained control to make the ID required for some actions and not for others. By convention, the documentation includes optional parameters like `id` when they're likely to appear in correct usage.

Most apps should choose a basic and descriptive routing scheme so that URLs are readable and meaningful. The default conventional route `{controller=Home}/{action=Index}/{id?}`:

* Supports a basic and descriptive routing scheme.
* Is a useful starting point for UI-based apps.
* Is the only route template needed for many web UI apps. For larger web UI apps, another route using Areas is frequently all that's needed.

`Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*` and `Microsoft.AspNetCore.Builder.MvcAreaRouteBuilderExtensions.MapAreaRoute*` :

* Automatically assign an **order** value to their endpoints based on the order they are invoked.

Endpoint routing in ASP.NET Core:

* Doesn't have a concept of routes.
* Doesn't provide ordering guarantees for the execution of extensibility. All endpoints are processed at once.

Enable Logging to see how the built-in routing implementations, such as `Microsoft.AspNetCore.Routing.Route`, match requests.

Attribute routing is explained later in this document.

### Multiple conventional routes

You can configure multiple conventional routes by adding more calls to `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*` and `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapAreaControllerRoute*`. When you add these calls, you can define multiple conventions or add conventional routes that are dedicated to a specific action, such as:

```csharp
app.MapControllerRoute(name: "blog",
                pattern: "blog/{*article}",
                defaults: new { controller = "Blog", action = "Article" });
app.MapControllerRoute(name: "default",
               pattern: "{controller=Home}/{action=Index}/{id?}");
```

The `blog` route in the preceding code is a **dedicated conventional route**. It's a dedicated conventional route because:

* It uses conventional routing.
* It's dedicated to a specific action.

Because the route template `"blog/{*article}"` doesn't include `controller` and `action` as parameters:

* They can only have the default values `{ controller = "Blog", action = "Article" }`.
* This route always maps to the action `BlogController.Article`.

`/Blog`, `/Blog/Article`, and `/Blog/{any-string}` are the only URL paths that match the blog route.

In the preceding example:

* The `blog` route has a higher priority for matches than the `default` route because you add it first.
* It's an example of Slug style routing where it's typical to have an article name as part of the URL.

> **Warning:**
> In ASP.NET Core, routing doesn't:
> * Define a concept called a *route*. `UseRouting` adds route matching to the middleware pipeline. The `UseRouting` middleware looks at the set of endpoints defined in the app, and selects the best endpoint match based on the request.
> * Provide guarantees about the execution order of extensibility like `Microsoft.AspNetCore.Routing.IRouteConstraint` or `Microsoft.AspNetCore.Mvc.ActionConstraints.IActionConstraint`.
>
>See Routing for reference material on routing.

### Conventional routing order

Conventional routing only matches a combination of action and controller that the app defines. This approach simplifies cases where conventional routes overlap.
When you add routes by using `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*`, `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapDefaultControllerRoute*`, and `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapAreaControllerRoute*`, the endpoints automatically get an order value based on the order you invoke these methods. Matches from a route that appears earlier in the list have a higher priority. Conventional routing depends on order. In general, place routes with areas earlier because they're more specific than routes without an area. Dedicated conventional routes with catch-all route parameters, such as `{*article}`, can make a route too greedy. A greedy route matches URLs that you intended to be matched by other routes. Put the greedy routes later in the route table to prevent greedy matches.

### Resolving ambiguous actions

When two endpoints match through routing, routing must do one of the following steps:

* Choose the best candidate.
* Throw an exception.

For example:

```csharp
public class Products33Controller : Controller
{
    public IActionResult Edit(int id)
    {
        return ControllerContext.MyDisplayRouteInfo(id);
    }

    [HttpPost]
    public IActionResult Edit(int id, Product product)
    {
        return ControllerContext.MyDisplayRouteInfo(id, product.name);
    }
}
```

The preceding controller defines two actions that match:

* The URL path `/Products33/Edit/17`
* Route data `{ controller = Products33, action = Edit, id = 17 }`.

This is a typical pattern for MVC controllers:

* `Edit(int)` displays a form to edit a product.
* `Edit(int, Product)` processes  the posted form.

To resolve the correct route:

* `Edit(int, Product)` is selected when the request is an HTTP `POST`.
* `Edit(int)` is selected when the HTTP verb is anything else. `Edit(int)` is generally called via `GET`.

The `Microsoft.AspNetCore.Mvc.HttpPostAttribute`, `[HttpPost]`, is provided to routing so that it can choose based on the HTTP method of the request. The `HttpPostAttribute` makes `Edit(int, Product)` a better match than `Edit(int)`.

It's important to understand the role of attributes like `HttpPostAttribute`. Similar attributes are defined for other HTTP verbs. In conventional routing, actions often use the same action name when they're part of a show form, submit form workflow. For example, see Examine the two Edit action methods.

If routing can't choose the best candidate, it throws an `System.Reflection.AmbiguousMatchException` and lists the multiple matched endpoints.

### Conventional route names

The strings  `"blog"` and `"default"` in the following examples are conventional route names:

```csharp
app.MapControllerRoute(name: "blog",
                pattern: "blog/{*article}",
                defaults: new { controller = "Blog", action = "Article" });
app.MapControllerRoute(name: "default",
               pattern: "{controller=Home}/{action=Index}/{id?}");
```

The route names give the route a logical name. The named route can be used for URL generation. Using a named route simplifies URL creation when the ordering of routes could make URL generation complicated. Route names must be unique application wide.

Route names:

* Have no impact on URL matching or handling of requests.
* Are used only for URL generation.

The route name concept is represented in routing as IEndpointNameMetadata. The terms **route name** and **endpoint name**:

* Are interchangeable.
* Which one is used in documentation and code depends on the API being described.
