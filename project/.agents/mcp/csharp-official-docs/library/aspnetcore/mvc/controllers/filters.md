---
title: "Filters in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/controllers/filters.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Filters in ASP.NET Core

By Kirk Larkin, Rick Anderson, Tom Dykstra, and Steve Smith

*Filters* in ASP.NET Core allow code to run before or after specific stages in the request processing pipeline.

Built-in filters handle tasks such as:

* Authorization, preventing access to resources a user isn't authorized for.
* Response caching, short-circuiting the request pipeline to return a cached response.

Custom filters can be created to handle cross-cutting concerns. Examples of cross-cutting concerns include error handling, caching, configuration, authorization, and logging. Filters avoid duplicating code. For example, an error handling exception filter could consolidate error handling.

This document applies to Razor Pages, API controllers, and controllers with views. Filters don't work directly with Razor components. A filter can only indirectly affect a component when:

* The component is embedded in a page or view.
* The page or controller and view uses the filter.

## How filters work

Filters run within the *ASP.NET Core action invocation pipeline*, sometimes referred to as the *filter pipeline*. The filter pipeline runs after ASP.NET Core selects the action to execute:

The following diagram shows the filter pipeline execution order for MVC and Razor Pages:

### Filter types

Each filter type is executed at a different stage in the filter pipeline:

* Authorization filters:

  * Run first.
  * Determine whether the user is authorized for the request.
  * Short-circuit the pipeline if the request isn't authorized.

* Resource filters:

  * Run after authorization.
  * `Microsoft.AspNetCore.Mvc.Filters.IResourceFilter.OnResourceExecuting*` runs code before the rest of the filter pipeline. For example, `OnResourceExecuting` runs code before model binding.
  * `Microsoft.AspNetCore.Mvc.Filters.IResourceFilter.OnResourceExecuted*` runs code after the rest of the pipeline has completed.

* Action filters:

  * Run immediately before and after an action method is called.
  * Can change the arguments passed into an action.
  * Can change the result returned from the action.
  * Are **not** supported in Razor Pages.

* Endpoint filters:

  * Run immediately before and after an action method is called.
  * Can change the arguments passed into an action.
  * Can change the result returned from the action.
  * Are **not** supported in Razor Pages.
  * Can be invoked on both actions and route handler-based endpoints.

* Exception filters:
  * Apply global policies to unhandled exceptions that occur before the response body has been written to.
  * Run after model binding and action filters, but before the action result is executed.
  * Run only if an unhandled exception occurs during action execution or action result execution.
  * Don't run for exceptions thrown during middleware execution, routing, or model binding.

* Result filters:

  * Run immediately before and after the execution of action results.
  * Run only when the action method executes successfully.
  * Are useful for logic that must surround view or formatter execution.

Razor Pages also support Razor Page filters, which run before and after a Razor Page handler.

## Implementation

Filters support both synchronous and asynchronous implementations through different interface definitions.

Synchronous filters run before and after their pipeline stage. For example, `Microsoft.AspNetCore.Mvc.Filters.IActionFilter.OnActionExecuting*` is called before the action method is called. `Microsoft.AspNetCore.Mvc.Filters.IActionFilter.OnActionExecuted*` is called after the action method returns:

```csharp
public class SampleActionFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Do something before the action executes.
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Do something after the action executes.
    }
}
```
Asynchronous filters define an `On-Stage-ExecutionAsync` method. For example, `Microsoft.AspNetCore.Mvc.Filters.IAsyncActionFilter.OnActionExecutionAsync*`:

```csharp
public class SampleAsyncActionFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context, ActionExecutionDelegate next)
    {
        // Do something before the action executes.
        await next();
        // Do something after the action executes.
    }
}
```
In the preceding code, the `SampleAsyncActionFilter` has an `Microsoft.AspNetCore.Mvc.Filters.ActionExecutionDelegate`, `next`, which executes the action method.

### Multiple filter stages

Interfaces for multiple filter stages can be implemented in a single class. For example, the `Microsoft.AspNetCore.Mvc.Filters.ActionFilterAttribute` class implements:

* Synchronous: `Microsoft.AspNetCore.Mvc.Filters.IActionFilter` and `Microsoft.AspNetCore.Mvc.Filters.IResultFilter`
* Asynchronous: `Microsoft.AspNetCore.Mvc.Filters.IAsyncActionFilter` and `Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter`
* `Microsoft.AspNetCore.Mvc.Filters.IOrderedFilter`

Implement **either** the synchronous or the async version of a filter interface, **not** both. The runtime checks first to see if the filter implements the async interface, and if so, it calls that. If not, it calls the synchronous interface's methods. If both asynchronous and synchronous interfaces are implemented in one class, only the async method is called. When using abstract classes like `Microsoft.AspNetCore.Mvc.Filters.ActionFilterAttribute`, override only the synchronous methods or the asynchronous methods for each filter type.

### Built-in filter attributes

ASP.NET Core includes built-in attribute-based filters that can be subclassed and customized. For example, the following result filter adds a header to the response:

```csharp
public class ResponseHeaderAttribute : ActionFilterAttribute
{
    private readonly string _name;
    private readonly string _value;

    public ResponseHeaderAttribute(string name, string value) =>
        (_name, _value) = (name, value);

    public override void OnResultExecuting(ResultExecutingContext context)
    {
        context.HttpContext.Response.Headers.Add(_name, _value);

        base.OnResultExecuting(context);
    }
}
```
Attributes allow filters to accept arguments, as shown in the preceding example. Apply the `ResponseHeaderAttribute` to a controller or action method and specify the name and value of the HTTP header:

```csharp
[ResponseHeader("Filter-Header", "Filter Value")]
public class ResponseHeaderController : ControllerBase
{
    public IActionResult Index() =>
        Content("Examine the response headers using the F12 developer tools.");

    // ...
```
Use a tool such as the browser developer tools to examine the headers. Under **Response Headers**, `filter-header: Filter Value` is displayed.

The following code applies `ResponseHeaderAttribute` to both a controller and an action:

```csharp
[ResponseHeader("Filter-Header", "Filter Value")]
public class ResponseHeaderController : ControllerBase
{
    public IActionResult Index() =>
        Content("Examine the response headers using the F12 developer tools.");

    // ...

    [ResponseHeader("Another-Filter-Header", "Another Filter Value")]
    public IActionResult Multiple() =>
        Content("Examine the response headers using the F12 developer tools.");
}
```
Responses from the `Multiple` action include the following headers:

* `filter-header: Filter Value`
* `another-filter-header: Another Filter Value`

Several of the filter interfaces have corresponding attributes that can be used as base classes for custom implementations.

Filter attributes:

* `Microsoft.AspNetCore.Mvc.Filters.ActionFilterAttribute`
* `Microsoft.AspNetCore.Mvc.Filters.ExceptionFilterAttribute`
* `Microsoft.AspNetCore.Mvc.Filters.ResultFilterAttribute`
* `Microsoft.AspNetCore.Mvc.FormatFilterAttribute`
* `Microsoft.AspNetCore.Mvc.ServiceFilterAttribute`
* `Microsoft.AspNetCore.Mvc.TypeFilterAttribute`

Filters can't be applied to Razor Page handler methods. They can be applied either to the Razor Page model or globally.

## Applying filters

Filters can be applied using one of several approaches, depending on whether the filter requires dependencies and the desired scope:

* **Filter attributes**: Custom filter classes that inherit from filter attribute base classes, such as `Microsoft.AspNetCore.Mvc.Filters.ActionFilterAttribute` or `Microsoft.AspNetCore.Mvc.Filters.ResultFilterAttribute`, can be applied directly to controllers or actions:

  ```csharp
  [MyActionFilter]
  public IActionResult Index() => View();
  ```

* **`[TypeFilter]` attribute**: `Microsoft.AspNetCore.Mvc.TypeFilterAttribute` applies a filter class that requires constructor dependencies without needing to register the filter itself in the dependency injection (DI) container:

  ```csharp
  [TypeFilter(typeof(MyLoggingFilter))]
  public IActionResult Index() => View();
  ```

* **`[ServiceFilter]` attribute**: `Microsoft.AspNetCore.Mvc.ServiceFilterAttribute` applies a filter that is registered as a service in the DI container:

  ```csharp
  [ServiceFilter(typeof(MyLoggingFilter))]
  public IActionResult Index() => View();
  ```

* **Global registration**: Filters can be applied globally to all controllers, actions, and Razor Pages by adding them to `Microsoft.AspNetCore.Mvc.MvcOptions.Filters` in `Program.cs`:

  ```csharp
  builder.Services.AddControllersWithViews(options =>
  {
      options.Filters.Add<MyGlobalActionFilter>();
  });
  ```

For more information on managing filter dependencies with `[TypeFilter]` and `[ServiceFilter]`, see the Dependency injection section.

## Filter scopes and order of execution

A filter can be added to the pipeline at one of three *scopes*:

* Using an attribute on a controller or Razor Page.
* Using an attribute on a controller action. Filter attributes can't be applied to Razor Pages handler methods.
* Globally for all controllers, actions, and Razor Pages as shown in the following code:
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add<GlobalSampleActionFilter>();
});
```
### Default order of execution

When there are multiple filters for a particular stage of the pipeline, scope determines the default order of filter execution. Global filters surround class filters, which in turn surround method filters.

As a result of filter nesting, the *after* code of filters runs in the reverse order of the *before* code. The filter sequence:

* The *before* code of global filters.
  * The *before* code of controller filters.
    * The *before* code of action method filters.
    * The *after* code of action method filters.
  * The *after* code of controller filters.
* The *after* code of global filters.

The following example illustrates the order in which filter methods run for synchronous action filters:

| Sequence | Filter scope | Filter method       |
|:--------:|:------------:|:-------------------:|
| 1        | Global       | `OnActionExecuting` |
| 2        | Controller   | `OnActionExecuting` |
| 3        | Action       | `OnActionExecuting` |
| 4        | Action       | `OnActionExecuted`  |
| 5        | Controller   | `OnActionExecuted`  |
| 6        | Global       | `OnActionExecuted`  |

### Controller level filters

Every controller that inherits from `Microsoft.AspNetCore.Mvc.Controller` includes the `Microsoft.AspNetCore.Mvc.Controller.OnActionExecuting*`, `Microsoft.AspNetCore.Mvc.Controller.OnActionExecutionAsync*`, and `Microsoft.AspNetCore.Mvc.Controller.OnActionExecuted*` methods. These methods wrap the filters that run for a given action:

* `OnActionExecuting` runs before any of the action's filters.
* `OnActionExecuted` runs after all of the action's filters.
* `OnActionExecutionAsync` runs before any of the action's filters. Code after a call to `next` runs after the action's filters.

The following `ControllerFiltersController` class:

* Applies the `SampleActionFilterAttribute` (`[SampleActionFilter]`) to the controller.
* Overrides `OnActionExecuting` and `OnActionExecuted`.

```csharp
[SampleActionFilter]
public class ControllerFiltersController : Controller
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        Console.WriteLine(
            $"- {nameof(ControllerFiltersController)}.{nameof(OnActionExecuting)}");

        base.OnActionExecuting(context);
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        Console.WriteLine(
            $"- {nameof(ControllerFiltersController)}.{nameof(OnActionExecuted)}");

        base.OnActionExecuted(context);
    }

    public IActionResult Index()
    {
        Console.WriteLine(
            $"- {nameof(ControllerFiltersController)}.{nameof(Index)}");

        return Content("Check the Console.");
    }
}
```
Navigating to `https://localhost:<port>/ControllerFilters` runs the following code:

* `ControllerFiltersController.OnActionExecuting`
  * `GlobalSampleActionFilter.OnActionExecuting`
    * `SampleActionFilterAttribute.OnActionExecuting`
      * `ControllerFiltersController.Index`
    * `SampleActionFilterAttribute.OnActionExecuted`
  * `GlobalSampleActionFilter.OnActionExecuted`
* `ControllerFiltersController.OnActionExecuted`

Controller level filters set the Order property to `int.MinValue`. Controller level filters can **not** be set to run after filters applied to methods. Order is explained in the next section.

For Razor Pages, see Implement Razor Page filters by overriding filter methods.

### Override the default order

The default sequence of execution can be overridden by implementing `Microsoft.AspNetCore.Mvc.Filters.IOrderedFilter`. `IOrderedFilter` exposes the `Microsoft.AspNetCore.Mvc.Filters.IOrderedFilter.Order` property that takes precedence over scope to determine the order of execution. A filter with a lower `Order` value:

* Runs the *before* code before that of a filter with a higher value of `Order`.
* Runs the *after* code after that of a filter with a higher `Order` value.

In the Controller level filters example, `GlobalSampleActionFilter` has global scope so it runs before `SampleActionFilterAttribute`, which has controller scope. To make `SampleActionFilterAttribute` run first, set its order to `int.MinValue`:

```csharp
[SampleActionFilter(Order = int.MinValue)]
public class ControllerFiltersController : Controller
{
    // ...
}
```
To make the global filter `GlobalSampleActionFilter` run first, set its `Order` to `int.MinValue`:

```csharp
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add<GlobalSampleActionFilter>(int.MinValue);
});
```
