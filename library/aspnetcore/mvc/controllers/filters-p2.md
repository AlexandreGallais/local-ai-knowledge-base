---
title: "Filters in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/controllers/filters.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Filters in ASP.NET Core (part 2 of 3)

## Cancellation and short-circuiting

The filter pipeline can be short-circuited by setting the `Microsoft.AspNetCore.Mvc.Filters.ResourceExecutingContext.Result` property on the `Microsoft.AspNetCore.Mvc.Filters.ResourceExecutingContext` parameter provided to the filter method. For example, the following Resource filter prevents the rest of the pipeline from executing:

```csharp
public class ShortCircuitingResourceFilterAttribute : Attribute, IResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        context.Result = new ContentResult
        {
            Content = nameof(ShortCircuitingResourceFilterAttribute)
        };
    }

    public void OnResourceExecuted(ResourceExecutedContext context) { }
}
```
In the following code, both the `[ShortCircuitingResourceFilter]` and the `[ResponseHeader]` filter target the `Index` action method. The `ShortCircuitingResourceFilterAttribute` filter:

* Runs first, because it's a Resource Filter and `ResponseHeaderAttribute` is an Action Filter.
* Short-circuits the rest of the pipeline.

Therefore the `ResponseHeaderAttribute` filter never runs for the `Index` action. This behavior would be the same if both filters were applied at the action method level, provided the `ShortCircuitingResourceFilterAttribute` ran first. The `ShortCircuitingResourceFilterAttribute` runs first because of its filter type:

```csharp
[ResponseHeader("Filter-Header", "Filter Value")]
public class ShortCircuitingController : Controller
{
    [ShortCircuitingResourceFilter]
    public IActionResult Index() =>
        Content($"- {nameof(ShortCircuitingController)}.{nameof(Index)}");
}
```
## Dependency injection

Filters can be added by type or by instance. If an instance is added, that instance is used for every request. If a type is added, it's type-activated. A type-activated filter means:

* An instance is created for each request.
* Any constructor dependencies are populated by dependency injection (DI).

Filters that are implemented as attributes and added directly to controller classes or action methods can't have constructor dependencies provided by dependency injection (DI). Constructor dependencies can't be provided by DI because attributes must have their constructor parameters supplied where they're applied.

The following filters support constructor dependencies provided from DI:

* `Microsoft.AspNetCore.Mvc.ServiceFilterAttribute`
* `Microsoft.AspNetCore.Mvc.TypeFilterAttribute`
* `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory` implemented on the attribute.

The preceding filters can be applied to a controller or an action.

Loggers are available from DI. However, avoid creating and using filters purely for logging purposes. The built-in framework logging typically provides what's needed for logging. Logging added to filters:

* Should focus on business domain concerns or behavior specific to the filter.
* Should **not** log actions or other framework events. The built-in filters already log actions and framework events.

### ServiceFilterAttribute

Service filter implementation types are registered in `Program.cs`. A `Microsoft.AspNetCore.Mvc.ServiceFilterAttribute` retrieves an instance of the filter from DI.

The following code shows the `LoggingResponseHeaderFilterService` class, which uses DI:

```csharp
public class LoggingResponseHeaderFilterService : IResultFilter
{
    private readonly ILogger _logger;

    public LoggingResponseHeaderFilterService(
            ILogger<LoggingResponseHeaderFilterService> logger) =>
        _logger = logger;

    public void OnResultExecuting(ResultExecutingContext context)
    {
        _logger.LogInformation(
            $"- {nameof(LoggingResponseHeaderFilterService)}.{nameof(OnResultExecuting)}");

        context.HttpContext.Response.Headers.Add(
            nameof(OnResultExecuting), nameof(LoggingResponseHeaderFilterService));
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        _logger.LogInformation(
            $"- {nameof(LoggingResponseHeaderFilterService)}.{nameof(OnResultExecuted)}");
    }
}
```
In the following code, `LoggingResponseHeaderFilterService` is added to the DI container:

```csharp
builder.Services.AddScoped<LoggingResponseHeaderFilterService>();
```
In the following code, the `ServiceFilter` attribute retrieves an instance of the `LoggingResponseHeaderFilterService` filter from DI:

```csharp
[ServiceFilter<LoggingResponseHeaderFilterService>]
public IActionResult WithServiceFilter() =>
    Content($"- {nameof(FilterDependenciesController)}.{nameof(WithServiceFilter)}");
```
When using `ServiceFilterAttribute`, setting `Microsoft.AspNetCore.Mvc.ServiceFilterAttribute.IsReusable`:

* Provides a hint that the filter instance *might* be reused outside of the request scope it was created within. The ASP.NET Core runtime doesn't guarantee:
  * That a single instance of the filter will be created.
  * The filter won't be re-requested from the DI container at some later point.
* Shouldn't be used with a filter that depends on services with a lifetime other than singleton.

 `Microsoft.AspNetCore.Mvc.ServiceFilterAttribute` implements `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory`. `IFilterFactory` exposes the `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory.CreateInstance*` method for creating an `Microsoft.AspNetCore.Mvc.Filters.IFilterMetadata` instance. `CreateInstance` loads the specified type from DI.

### TypeFilterAttribute

`Microsoft.AspNetCore.Mvc.TypeFilterAttribute` is similar to `Microsoft.AspNetCore.Mvc.ServiceFilterAttribute`, but its type isn't resolved directly from the DI container. It instantiates the type by using `Microsoft.Extensions.DependencyInjection.ObjectFactory`.

Because `TypeFilterAttribute` types aren't resolved directly from the DI container:

* Types that are referenced using the `TypeFilterAttribute` don't need to be registered with the DI container. They do have their dependencies fulfilled by the DI container.
* `TypeFilterAttribute` can optionally accept constructor arguments for the type.

When using `TypeFilterAttribute`, setting `Microsoft.AspNetCore.Mvc.TypeFilterAttribute.IsReusable`:

* Provides hint that the filter instance *might* be reused outside of the request scope it was created within. The ASP.NET Core runtime provides no guarantees that a single instance of the filter will be created.

* Shouldn't be used with a filter that depends on services with a lifetime other than singleton.

The following example shows how to pass arguments to a type using `TypeFilterAttribute`:

```csharp
[TypeFilter(typeof(LoggingResponseHeaderFilter),
    Arguments = new object[] { "Filter-Header", "Filter Value" })]
public IActionResult WithTypeFilter() =>
    Content($"- {nameof(FilterDependenciesController)}.{nameof(WithTypeFilter)}");
```
## Authorization filters

Authorization filters:

* Are the first filters run in the filter pipeline.
* Control access to action methods.
* Have a before method, but no after method.

Custom authorization filters require a custom authorization framework. Prefer configuring the authorization policies or writing a custom authorization policy over writing a custom filter. The built-in authorization filter:

* Calls the authorization system.
* Doesn't authorize requests.

Do **not** throw exceptions within authorization filters:

* The exception won't be handled.
* Exception filters won't handle the exception.

Consider issuing a challenge when an exception occurs in an authorization filter.

Learn more about Authorization.

## Resource filters

Resource filters:

* Implement either the `Microsoft.AspNetCore.Mvc.Filters.IResourceFilter` or `Microsoft.AspNetCore.Mvc.Filters.IAsyncResourceFilter` interface.
* Execution wraps most of the filter pipeline.
* Only Authorization filters run before resource filters.

Resource filters are useful to short-circuit most of the pipeline. For example, a caching filter can avoid the rest of the pipeline on a cache hit.

Resource filter examples:

* The short-circuiting resource filter shown previously.
* DisableFormValueModelBindingAttribute:

  * Prevents model binding from accessing the form data.
  * Used for large file uploads to prevent the form data from being read into memory.

## Action filters

Action filters do **not** apply to Razor Pages. Razor Pages supports `Microsoft.AspNetCore.Mvc.Filters.IPageFilter` and `Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter`. For more information, see Filter methods for Razor Pages.

Action filters:

* Implement either the `Microsoft.AspNetCore.Mvc.Filters.IActionFilter` or `Microsoft.AspNetCore.Mvc.Filters.IAsyncActionFilter` interface.
* Their execution surrounds the execution of action methods.

The following code shows a sample action filter:

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
The `Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext` provides the following properties:

* `Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext.ActionArguments`: Enables reading the inputs to an action method.
* `Microsoft.AspNetCore.Mvc.Controller`: Enables manipulating the controller instance.
* `Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext.Result`: Setting `Result` short-circuits execution of the action method and subsequent action filters.

Throwing an exception in an action method:

* Prevents running of subsequent filters.
* Unlike setting `Result`, is treated as a failure instead of a successful result.

The `Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext` provides `Controller` and `Result` plus the following properties:

* `Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext.Canceled`: True if another filter short-circuited the action execution.
* `Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext.Exception`: Non-null if the action or a previously run action filter threw an exception. Setting this property to null:
  * Effectively handles the exception.
  * `Result` is executed as if it was returned from the action method.

For an `IAsyncActionFilter`, a call to the `Microsoft.AspNetCore.Mvc.Filters.ActionExecutionDelegate`:

* Executes any subsequent action filters and the action method.
* Returns `ActionExecutedContext`.

To short-circuit, assign `Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext.Result` to a result instance and don't call `next` (the `ActionExecutionDelegate`).

The framework provides an abstract `Microsoft.AspNetCore.Mvc.Filters.ActionFilterAttribute` that can be subclassed.

The `OnActionExecuting` action filter can be used to:

* Validate model state.
* Return an error if the state is invalid.

```csharp
public class ValidateModelAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            context.Result = new BadRequestObjectResult(context.ModelState);
        }
    }
}
```
> **Note:**
> Controllers annotated with the `[ApiController]` attribute automatically validate model state and return a 400 response. For more information, see Automatic HTTP 400 responses.

The `OnActionExecuted` method runs after the action method:

* And can see and manipulate the results of the action through the `Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext.Result` property.
* `Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext.Canceled` is set to true if another filter short-circuited the action execution.
* `Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext.Exception` is set to a non-null value if the action or a subsequent action filter threw an exception. Setting `Exception` to null:
  * Effectively handles an exception.
  * `ActionExecutedContext.Result` is executed as if it were returned normally from the action method.

## Exception filters

Exception filters:

* Implement `Microsoft.AspNetCore.Mvc.Filters.IExceptionFilter` or `Microsoft.AspNetCore.Mvc.Filters.IAsyncExceptionFilter`.
* Can be used to implement common error handling policies.

The following sample exception filter displays details about exceptions that occur when the app is in development:

```csharp
public class SampleExceptionFilter : IExceptionFilter
{
    private readonly IHostEnvironment _hostEnvironment;

    public SampleExceptionFilter(IHostEnvironment hostEnvironment) =>
        _hostEnvironment = hostEnvironment;

    public void OnException(ExceptionContext context)
    {
        if (!_hostEnvironment.IsDevelopment())
        {
            // Don't display exception details unless running in Development.
            return;
        }

        context.Result = new ContentResult
        {
            Content = context.Exception.ToString()
        };
    }
}
```
The following code tests the exception filter:

```csharp
[TypeFilter<SampleExceptionFilter>]
public class ExceptionController : Controller
{
    public IActionResult Index() =>
        Content($"- {nameof(ExceptionController)}.{nameof(Index)}");
}
```
Exception filters:

* Don't have before and after events.
* Implement `Microsoft.AspNetCore.Mvc.Filters.IExceptionFilter.OnException*` or `Microsoft.AspNetCore.Mvc.Filters.IAsyncExceptionFilter.OnExceptionAsync*`.
* Handle unhandled exceptions that occur in Razor Page or controller creation, model binding, action filters, or action methods.
* Do **not** catch exceptions that occur in resource filters, result filters, or MVC result execution.

To handle an exception, set the `Microsoft.AspNetCore.Mvc.Filters.ExceptionContext.ExceptionHandled` property to `true` or assign the `Microsoft.AspNetCore.Mvc.Filters.ExceptionContext.Result` property. This stops propagation of the exception. An exception filter can't turn an exception into a "success". Only an action filter can do that.

Exception filters:

* Are good for trapping exceptions that occur within actions.
* Aren't as flexible as error handling middleware.

Prefer middleware for exception handling. Use exception filters only where error handling *differs* based on which action method is called. For example, an app might have action methods for both API endpoints and for views/HTML. The API endpoints could return error information as JSON, while the view-based actions could return an error page as HTML.
