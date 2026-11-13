---
title: "Routing in ASP.NET Core (part 7 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 7 of 10)

## URL generation reference

This section contains a reference for the algorithm implemented by URL generation. In practice, most complex examples of URL generation use controllers or Razor Pages. See routing in controllers for additional information.

The URL generation process begins with a call to `Microsoft.AspNetCore.Routing.LinkGenerator.GetPathByAddress*` or a similar method. The method is provided with an address, a set of route values, and optionally information about the current request from `HttpContext`.

The first step is to use the address to resolve a set of candidate endpoints using an `Microsoft.AspNetCore.Routing.IEndpointAddressScheme`1` that matches the address's type.

Once the set of candidates is found by the address scheme, the endpoints are ordered and processed iteratively until a URL generation operation succeeds. URL generation does **not** check for ambiguities, the first result returned is the final result.

### Troubleshooting URL generation with logging

The first step in troubleshooting URL generation is setting the logging level of `Microsoft.AspNetCore.Routing` to `TRACE`. `LinkGenerator` logs many details about its processing which can be useful to troubleshoot problems.

See URL generation reference for details on URL generation.

### Addresses

Addresses are the concept in URL generation used to bind a call into the link generator to a set of candidate endpoints.

Addresses are an extensible concept that come with two implementations by default:

* Using *endpoint name* (`string`) as the address:
  * Provides similar functionality to MVC's route name.
  * Uses the `Microsoft.AspNetCore.Routing.IEndpointNameMetadata` metadata type.
  * Resolves the provided string against the metadata of all registered endpoints.
  * Throws an exception on startup if multiple endpoints use the same name.
  * Recommended for general-purpose use outside of controllers and Razor Pages.
* Using *route values* (`Microsoft.AspNetCore.Routing.RouteValuesAddress`) as the address:
  * Provides similar functionality to controllers and Razor Pages legacy URL generation.
  * Very complex to extend and debug.
  * Provides the implementation used by `IUrlHelper`, Tag Helpers, HTML Helpers, Action Results, etc.

The role of the address scheme is to make the association between the address and matching endpoints by arbitrary criteria:

* The endpoint name scheme performs a basic <example-value> lookup.
* The route values scheme has a complex best subset of set algorithm.

### Ambient values and explicit values

From the current request, routing accesses the route values of the current request `HttpContext.Request.RouteValues`. The values associated with the current request are referred to as the **ambient values**. For the purpose of clarity, the documentation refers to the route values passed in to methods as **explicit values**.

The following example shows ambient values and explicit values. It provides ambient values from the current request and explicit values:

```csharp
public class WidgetController : ControllerBase
{
    private readonly LinkGenerator _linkGenerator;

    public WidgetController(LinkGenerator linkGenerator) =>
        _linkGenerator = linkGenerator;

    public IActionResult Index()
    {
        var indexPath = _linkGenerator.GetPathByAction(
            HttpContext, values: new { id = 17 })!;

        return Content(indexPath);
    }

    // ...
```
The preceding code:

* Returns `/Widget/Index/17`
* Gets `Microsoft.AspNetCore.Routing.LinkGenerator` via DI.

The following code provides only explicit values and no ambient values:

```csharp
var subscribePath = _linkGenerator.GetPathByAction(
    "Subscribe", "Home", new { id = 17 })!;
```
The preceding method returns `/Home/Subscribe/17`

The following code in the `WidgetController` returns `/Widget/Subscribe/17`:

```csharp
var subscribePath = _linkGenerator.GetPathByAction(
    HttpContext, "Subscribe", null, new { id = 17 });
```
The following code provides the controller from ambient values in the current request and explicit values:

```csharp
public class GadgetController : ControllerBase
{
    public IActionResult Index() =>
        Content(Url.Action("Edit", new { id = 17 })!);
}
```
In the preceding code:

* `/Gadget/Edit/17` is returned.
* `Microsoft.AspNetCore.Mvc.ControllerBase.Url` gets the `Microsoft.AspNetCore.Mvc.IUrlHelper`.
* `Microsoft.AspNetCore.Mvc.UrlHelperExtensions.Action*` generates a URL with an absolute path for an action method. The URL contains the specified `action` name and `route` values.

The following code provides ambient values from the current request and explicit values:

```csharp
public class IndexModel : PageModel
{
    public void OnGet()
    {
        var editUrl = Url.Page("./Edit", new { id = 17 });

        // ...
    }
}
```
The preceding code sets `url` to `/Edit/17` when the Edit Razor Page contains the following page directive:

`@page "{id:int}"`

If the Edit page doesn't contain the `"{id:int}"` route template, `url` is `/Edit?id=17`.

The behavior of MVC's `Microsoft.AspNetCore.Mvc.IUrlHelper` adds a layer of complexity in addition to the rules described here:

* `IUrlHelper` always provides the route values from the current request as ambient values.
* IUrlHelper.Action always copies the current `action` and `controller` route values as explicit values unless overridden by the developer.
* IUrlHelper.Page always copies the current `page` route value as an explicit value unless overridden.
* `IUrlHelper.Page` always overrides the current `handler` route value with `null` as an explicit values unless overridden.

Users are often surprised by the behavioral details of ambient values, because MVC doesn't seem to follow its own rules. For historical and compatibility reasons, certain route values such as `action`, `controller`, `page`, and `handler` have their own special-case behavior.

The equivalent functionality provided by `LinkGenerator.GetPathByAction` and `LinkGenerator.GetPathByPage` duplicates these anomalies of `IUrlHelper` for compatibility.

### URL generation process

Once the set of candidate endpoints are found, the URL generation algorithm:

* Processes the endpoints iteratively.
* Returns the first successful result.

The first step in this process is called **route value invalidation**. Route value invalidation is the process by which routing decides which route values from the ambient values should be used and which should be ignored. Each ambient value is considered and either combined with the explicit values, or ignored.

The best way to think about the role of ambient values is that they attempt to save application developers typing, in some common cases. Traditionally, the scenarios where ambient values are helpful are related to MVC:

* When linking to another action in the same controller, the controller name doesn't need to be specified.
* When linking to another controller in the same area, the area name doesn't need to be specified.
* When linking to the same action method, route values don't need to be specified.
* When linking to another part of the app, you don't want to carry over route values that have no meaning in that part of the app.

Calls to `LinkGenerator` or `IUrlHelper` that return `null` are usually caused by not understanding route value invalidation. Troubleshoot route value invalidation by explicitly specifying more of the route values to see if that solves the problem.

Route value invalidation works on the assumption that the app's URL scheme is hierarchical, with a hierarchy formed from left-to-right. Consider the basic <example-value> route template `{controller}/{action}/{id?}` to get an intuitive sense of how this works in practice. A **change** to a value **invalidates** all of the route values that appear to the right. This reflects the assumption about hierarchy. If the app has an ambient value for `id`, and the operation specifies a different value for the `controller`:

* `id` won't be reused because `{controller}` is to the left of `{id?}`.

Some examples demonstrating this principle:

* If the explicit values contain a value for `id`, the ambient value for `id` is ignored. The ambient values for `controller` and `action` can be used.
* If the explicit values contain a value for `action`, any ambient value for `action` is ignored. The ambient values for `controller` can be used. If the explicit value for `action` is different from the ambient value for `action`, the `id` value won't be used. If the explicit value for `action` is the same as the ambient value for `action`, the `id` value can be used.
* If the explicit values contain a value for `controller`, any ambient value for `controller` is ignored. If the explicit value for `controller` is different from the ambient value for `controller`, the `action` and `id` values won't be used. If the explicit value for `controller` is the same as the ambient value for `controller`, the `action` and `id` values can be used.

This process is further complicated by the existence of attribute routes and dedicated conventional routes. Controller conventional routes such as `{controller}/{action}/{id?}` specify a hierarchy using route parameters. For dedicated conventional routes and attribute routes to controllers and Razor Pages:

* There is a hierarchy of route values.
* They don't appear in the template.

For these cases, URL generation defines the **required values** concept. Endpoints created by controllers and Razor Pages have required values specified that allow route value invalidation to work.

The route value invalidation algorithm in detail:

* The required value names are combined with the route parameters, then processed from left-to-right.
* For each parameter, the ambient value and explicit value are compared:
  * If the ambient value and explicit value are the same, the process continues.
  * If the ambient value is present and the explicit value isn't, the ambient value is used when generating the URL.
  * If the ambient value isn't present and the explicit value is, reject the ambient value and all subsequent ambient values.
  * If the ambient value and the explicit value are present, and the two values are different, reject the ambient value and all subsequent ambient values.

At this point, the URL generation operation is ready to evaluate route constraints. The set of accepted values is combined with the parameter default values, which is provided to constraints. If the constraints all pass, the operation continues.

Next, the **accepted values** can be used to expand the route template. The route template is processed:

* From left-to-right.
* Each parameter has its accepted value substituted.
* With the following special cases:
  * If the accepted values is missing a value and the parameter has a default value, the default value is used.
  * If the accepted values is missing a value and the parameter is optional, processing continues.
  * If any route parameter to the right of a missing optional parameter has a value, the operation fails.
  *  Contiguous default-valued parameters and optional parameters are collapsed where possible.

> **Note:**
> For endpoints created by controllers and Razor Pages, `controller`, `action`, `page`, and `area` are part of the endpoint's **required values**, so they're always present in the accepted values. As a result:
>
> * They aren't invalidated by a change to a route value that appears to their left, such as a `culture` parameter.
> * Inline default values in the route template, such as `{controller=DefaultController}`, aren't applied, because default values are used only when the accepted values are *missing* a value.
>
> For example, with the template `{culture}/api1/{controller=DefaultController}/{action=DefaultAction}/{id?}` and a current request of `/en/api1/MyController/Index/111`, the call `Url.RouteUrl("ApiRoute1", new { culture = "ar" })` generates `/ar/api1/MyController/Index`, not `/ar/api1/DefaultController/DefaultAction`. The `id` value isn't used because it has no required value and is to the right of a changed value. To use the template's default values, specify them explicitly:
>
> ```csharp
> Url.RouteUrl("ApiRoute1", new { culture = "ar", controller = "DefaultController", action = "DefaultAction" })
> ```
>
> For a related limitation, see Problems with route value invalidation.

Values explicitly provided that don't match a segment of the route are added to the query string. The following table shows the result when using the route template `{controller}/{action}/{id?}`.

| Ambient Values                     | Explicit Values                        | Result                  |
|------------------------------------|----------------------------------------|-------------------------|
| controller = "Home"                | action = "About"                       | `/Home/About`           |
| controller = "Home"                | controller = "Order", action = "About" | `/Order/About`          |
| controller = "Home", color = "Red" | action = "About"                       | `/Home/About`           |
| controller = "Home"                | action = "About", color = "Red"        | `/Home/About?color=Red` |

### Optional route parameter order

Optional route parameters must come after all required route parameters and literals. In the following code, the `id` and `name` parameters must come after the `color` parameter:

```csharp
﻿using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers;

[Route("api/[controller]")]
public class MyController : ControllerBase
{
    // GET /api/my/red/2/joe
    // GET /api/my/red/2
    // GET /api/my
    [HttpGet("{color}/{id:int?}/{name?}")]
    public IActionResult GetByIdAndOptionalName(string color, int id = 1, string? name = null)
    {
        return Ok($"{color} {id} {name ?? ""}");
    }
}
```
