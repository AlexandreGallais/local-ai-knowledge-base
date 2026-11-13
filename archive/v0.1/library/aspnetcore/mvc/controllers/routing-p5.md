---
title: "Routing to controller actions in ASP.NET Core (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/controllers/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing to controller actions in ASP.NET Core (part 5 of 6)

## URL generation and ambient values

Apps can use routing URL generation features to generate URL links to actions. Generating URLs eliminates hard-coding URLs, making code more robust and maintainable. This section focuses on the URL generation features provided by MVC and only cover basics of how URL generation works. See Routing for a detailed description of URL generation.

The `Microsoft.AspNetCore.Mvc.IUrlHelper` interface is the underlying element of infrastructure between MVC and routing for URL generation. An instance of `IUrlHelper` is available through the `Url` property in controllers, views, and view components.

In the following example, the `IUrlHelper` interface is used through the `Controller.Url` property to generate a URL to another action.

```csharp
public class UrlGenerationController : Controller
{
    public IActionResult Source()
    {
        // Generates /UrlGeneration/Destination
        var url = Url.Action("Destination");
        return ControllerContext.MyDisplayRouteInfo("", $" URL = {url}");
    }

    public IActionResult Destination()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }
}
```

If the app uses the default conventional route, the value of the `url` variable is the URL path string `/UrlGeneration/Destination`. Routing creates this URL path by combining:

* The route values from the current request, which are called **ambient values**.
* The values passed to `Url.Action` and substituting those values into the route template:

```text
ambient values: { controller = "UrlGeneration", action = "Source" }
values passed to Url.Action: { controller = "UrlGeneration", action = "Destination" }
route template: {controller}/{action}/{id?}

result: /UrlGeneration/Destination
```

Each route parameter in the route template has its value substituted by matching names with the values and ambient values. A route parameter that doesn't have a value can:

* Use a default value if it has one.
* Be skipped if it's optional. For example, the `id` from the  route template `{controller}/{action}/{id?}`.

URL generation fails if any required route parameter doesn't have a corresponding value. If URL generation fails for a route, the next route is tried until all routes have been tried or a match is found.

The preceding example of `Url.Action` assumes conventional routing. URL generation works similarly with attribute routing, though the concepts are different. With conventional routing:

* The route values are used to expand a template.
* The route values for `controller` and `action` usually appear in that template. This works because the URLs matched by routing adhere to a convention.

The following example uses attribute routing:

```csharp
public class UrlGenerationAttrController : Controller
{
    [HttpGet("custom")]
    public IActionResult Source()
    {
        var url = Url.Action("Destination");
        return ControllerContext.MyDisplayRouteInfo("", $" URL = {url}");
    }

    [HttpGet("custom/url/to/destination")]
    public IActionResult Destination()
    {
       return ControllerContext.MyDisplayRouteInfo();
    }
}
```

The `Source` action in the preceding code generates `custom/url/to/destination`.

`Microsoft.AspNetCore.Routing.LinkGenerator` was added in ASP.NET Core 3.0 as an alternative to `IUrlHelper`. `LinkGenerator` offers similar but more flexible functionality. Each method on `IUrlHelper` has a corresponding family of methods on `LinkGenerator` as well.

### Generating URLs by action name

Url.Action, LinkGenerator.GetPathByAction, and all related overloads all are designed to generate the target endpoint by specifying a controller name and action name.

When you use `Url.Action`, the runtime provides the current route values for `controller` and `action`:

* The values of `controller` and `action` are part of both ambient values and values. The method `Url.Action` always uses the current values of `action` and `controller` and generates a URL path that routes to the current action.

Routing attempts to use the values in ambient values to fill in information that wasn't provided when generating a URL. Consider a route like `{a}/{b}/{c}/{d}` with ambient values `{ a = Alice, b = Bob, c = Carol, d = David }`:

* Routing has enough information to generate a URL without any additional values.
* Routing has enough information because all route parameters have a value.

If the value `{ d = Donovan }` is added:

* The value `{ d = David }` is ignored.
* The generated URL path is `Alice/Bob/Carol/Donovan`.

**Warning**: URL paths are hierarchical. In the preceding example, if the value `{ c = Cheryl }` is added:

* Both of the values `{ c = Carol, d = David }` are ignored.
* There's no longer a value for `d` and URL generation fails.
* You must specify the desired values of `c` and `d` to generate a URL.

You might expect to hit this problem with the default route `{controller}/{action}/{id?}`. This problem is rare in practice because `Url.Action` always explicitly specifies a `controller` and `action` value.

Several overloads of Url.Action take a route values object to provide values for route parameters other than `controller` and `action`. The route values object is frequently used with `id`. For example, `Url.Action("Buy", "Products", new { id = 17 })`. The route values object:

* By convention is usually an object of anonymous type.
* Can be an `IDictionary<>` or a POCO).

Any additional route values that don't match route parameters go in the query string.

```csharp
public IActionResult Index()
{
    var url = Url.Action("Buy", "Products", new { id = 17, color = "red" });
    return Content(url!);
}
```

The preceding code generates `/Products/Buy/17?color=red`.

The following code generates an absolute URL:

```csharp
public IActionResult Index2()
{
    var url = Url.Action("Buy", "Products", new { id = 17 }, protocol: Request.Scheme);
    // Returns https://localhost:5001/Products/Buy/17
    return Content(url!);
}
```

To create an absolute URL, use one of the following options:

* An overload that accepts a `protocol`. For example, the preceding code.
* LinkGenerator.GetUriByAction, which generates absolute URIs by default.

### Generate URLs by route

The preceding code demonstrated generating a URL by passing in the controller and action name. `IUrlHelper` also provides the Url.RouteUrl family of methods. These methods are similar to Url.Action, but they don't copy the current values of `action` and `controller` to the route values. The most common usage of `Url.RouteUrl`:

* Specifies a route name to generate the URL.
* Generally doesn't specify a controller or action name.

```csharp
public class UrlGeneration2Controller : Controller
{
    [HttpGet("")]
    public IActionResult Source()
    {
        var url = Url.RouteUrl("Destination_Route");
        return ControllerContext.MyDisplayRouteInfo("", $" URL = {url}");
    }
```

The following Razor file generates an HTML link to the `Destination_Route`:

```cshtml
﻿<h1>Test Links</h1>

<ul>
    <li><a href="@Url.RouteUrl("Destination_Route")">Test Destination_Route</a></li>
</ul>
```

### Generate URLs in HTML and Razor

`Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper` provides the `Microsoft.AspNetCore.Mvc.ViewFeatures.HtmlHelper` methods Html.BeginForm and Html.ActionLink to generate `<form>` and `` elements respectively. These methods use the Url.Action method to generate a URL and they accept similar arguments. The `Url.RouteUrl` companions for `HtmlHelper` are `Html.BeginRouteForm` and `Html.RouteLink` which have similar functionality.

TagHelpers generate URLs through the `form` TagHelper and the `` TagHelper. Both of these use `IUrlHelper` for their implementation. For more information, see Tag Helpers in forms.

Inside views, the `IUrlHelper` is available through the `Url` property for any ad-hoc URL generation not covered by the preceding methods.

### URL generation in Action Results

The preceding examples show how to use `IUrlHelper` in a controller. The most common usage in a controller is to generate a URL as part of an action result.

The `Microsoft.AspNetCore.Mvc.ControllerBase` and `Microsoft.AspNetCore.Mvc.Controller` base classes provide convenience methods for action results that reference another action. One typical usage is to redirect after accepting user input:

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Edit(int id, Customer customer)
{
    if (ModelState.IsValid)
    {
        // Update DB with new details.
        ViewData["Message"] = $"Successful edit of customer {id}";
        return RedirectToAction("Index");
    }
    return View(customer);
}
```

The action results factory methods such as `Microsoft.AspNetCore.Mvc.ControllerBase.RedirectToAction*` and `Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction*` follow a similar pattern to the methods on `IUrlHelper`.

### Special case for dedicated conventional routes

Conventional routing can use a special kind of route definition called a dedicated conventional route. In the following example, the route named `blog` is a dedicated conventional route:

```csharp
app.MapControllerRoute(name: "blog",
                pattern: "blog/{*article}",
                defaults: new { controller = "Blog", action = "Article" });
app.MapControllerRoute(name: "default",
               pattern: "{controller=Home}/{action=Index}/{id?}");
```

Using the preceding route definitions, `Url.Action("Index", "Home")` generates the URL path `/` by using the `default` route, but why? You might guess the route values `{ controller = Home, action = Index }` are enough to generate a URL by using `blog`, and the result would be `/blog?action=Index&controller=Home`.

Dedicated conventional routes rely on a special behavior of default values that don't have a corresponding route parameter that prevents the route from being too greedy with URL generation. In this case the default values are `{ controller = Blog, action = Article }`, and neither `controller` nor `action` appears as a route parameter. When routing performs URL generation, the values provided must match the default values. URL generation using `blog` fails because the values `{ controller = Home, action = Index }` don't match `{ controller = Blog, action = Article }`. Routing then falls back to try `default`, which succeeds.
