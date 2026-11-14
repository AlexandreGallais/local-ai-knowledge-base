---
title: "Filters in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/controllers/filters.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Filters in ASP.NET Core (part 3 of 3)

## Result filters

Result filters:

* Implement an interface:
  * `Microsoft.AspNetCore.Mvc.Filters.IResultFilter` or `Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter`
  * `Microsoft.AspNetCore.Mvc.Filters.IAlwaysRunResultFilter` or `Microsoft.AspNetCore.Mvc.Filters.IAsyncAlwaysRunResultFilter`
* Their execution surrounds the execution of action results.

### IResultFilter and IAsyncResultFilter

The following code shows a sample result filter:

```csharp
public class SampleResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Do something before the result executes.
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // Do something after the result executes.
    }
}
```
The kind of result being executed depends on the action. An action returning a view includes all razor processing as part of the `Microsoft.AspNetCore.Mvc.ViewResult` being executed. An API method might perform some serialization as part of the execution of the result. Learn more about action results.

Result filters are only executed when an action or action filter produces an action result. Result filters aren't executed when:

* An authorization filter or resource filter short-circuits the pipeline.
* An exception filter handles an exception by producing an action result.

The `Microsoft.AspNetCore.Mvc.Filters.IResultFilter.OnResultExecuting*` method can short-circuit execution of the action result and subsequent result filters by setting `Microsoft.AspNetCore.Mvc.Filters.ResultExecutingContext.Cancel` to `true`. Write to the response object when short-circuiting to avoid generating an empty response. Throwing an exception in `IResultFilter.OnResultExecuting`:

* Prevents execution of the action result and subsequent filters.
* Is treated as a failure instead of a successful result.

When the `Microsoft.AspNetCore.Mvc.Filters.IResultFilter.OnResultExecuted*` method runs, the response has probably already been sent to the client. If the response has already been sent to the client, it can't be changed.

`ResultExecutedContext.Canceled` is set to `true` if another filter short-circuited the action result execution.

`ResultExecutedContext.Exception` is set to a non-null value if the action result or a subsequent result filter threw an exception. Setting `Exception` to null effectively handles an exception and prevents the exception from being thrown again later in the pipeline. There's no reliable way to write data to a response when handling an exception in a result filter. If the headers have been flushed to the client when an action result throws an exception, there's no reliable mechanism to send a failure code.

For an `Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter`, a call to `await next` on the `Microsoft.AspNetCore.Mvc.Filters.ResultExecutionDelegate` executes any subsequent result filters and the action result. To short-circuit, set `Microsoft.AspNetCore.Mvc.Filters.ResultExecutingContext.Cancel` to `true` and don't call the `ResultExecutionDelegate`:

```csharp
public class SampleAsyncResultFilter : IAsyncResultFilter
{
    public async Task OnResultExecutionAsync(
        ResultExecutingContext context, ResultExecutionDelegate next)
    {
        if (context.Result is not EmptyResult)
        {
            await next();
        }
        else
        {
            context.Cancel = true;
        }
    }
}
```
The framework provides an abstract `ResultFilterAttribute` that can be subclassed. The ResponseHeaderAttribute class shown previously is an example of a result filter attribute.

### IAlwaysRunResultFilter and IAsyncAlwaysRunResultFilter

The `Microsoft.AspNetCore.Mvc.Filters.IAlwaysRunResultFilter` and `Microsoft.AspNetCore.Mvc.Filters.IAsyncAlwaysRunResultFilter` interfaces declare an `Microsoft.AspNetCore.Mvc.Filters.IResultFilter` implementation that runs for all action results. This includes action results produced by:

* Authorization filters and resource filters that short-circuit.
* Exception filters.

For example, the following filter always runs and sets an action result (`Microsoft.AspNetCore.Mvc.ObjectResult`) with a *422 Unprocessable Entity* status code when content negotiation fails:

```csharp
public class UnprocessableResultFilter : IAlwaysRunResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        if (context.Result is StatusCodeResult statusCodeResult
            && statusCodeResult.StatusCode == StatusCodes.Status415UnsupportedMediaType)
        {
            context.Result = new ObjectResult("Unprocessable")
            {
                StatusCode = StatusCodes.Status422UnprocessableEntity
            };
        }
    }

    public void OnResultExecuted(ResultExecutedContext context) { }
}
```
## IFilterFactory

`Microsoft.AspNetCore.Mvc.Filters.IFilterFactory` implements `Microsoft.AspNetCore.Mvc.Filters.IFilterMetadata`. Therefore, an `IFilterFactory` instance can be used as an `IFilterMetadata` instance anywhere in the filter pipeline. When the runtime prepares to invoke the filter, it attempts to cast it to an `IFilterFactory`. If that cast succeeds, the `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory.CreateInstance*` method is called to create the `IFilterMetadata` instance that is invoked. This provides a flexible design, since the precise filter pipeline doesn't need to be set explicitly when the app starts.

`IFilterFactory.IsReusable`:

* Is a hint by the factory that the filter instance created by the factory might be reused outside of the request scope it was created within.
* Should ***not*** be used with a filter that depends on services with a lifetime other than singleton.

The ASP.NET Core runtime doesn't guarantee:

* That a single instance of the filter will be created.
* The filter won't be re-requested from the DI container at some later point.

> **Warning:**
> Only configure `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory.IsReusable` to return `true` if the source of the filters is unambiguous, the filters are stateless, and the filters are safe to use across multiple HTTP requests. For instance, don't return filters from DI that are registered as scoped or transient if `IFilterFactory.IsReusable` returns `true`.

`IFilterFactory` can be implemented using custom attribute implementations as another approach to creating filters:

```csharp
public class ResponseHeaderFilterFactory : Attribute, IFilterFactory
{
    public bool IsReusable => false;

    public IFilterMetadata CreateInstance(IServiceProvider serviceProvider) =>
        new InternalResponseHeaderFilter();

    private class InternalResponseHeaderFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context) =>
            context.HttpContext.Response.Headers.Add(
                nameof(OnActionExecuting), nameof(InternalResponseHeaderFilter));

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
```
The filter is applied in the following code:

```csharp
[ResponseHeaderFilterFactory]
public IActionResult Index() =>
    Content($"- {nameof(FilterFactoryController)}.{nameof(Index)}");
```
### IFilterFactory implemented on an attribute

Filters that implement `IFilterFactory` are useful for filters that:

* Don't require passing parameters.
* Have constructor dependencies that need to be filled by DI.

`Microsoft.AspNetCore.Mvc.TypeFilterAttribute` implements `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory`. `IFilterFactory` exposes the `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory.CreateInstance*` method for creating an `Microsoft.AspNetCore.Mvc.Filters.IFilterMetadata` instance. `CreateInstance` loads the specified type from the services container (DI).

```csharp
public class SampleActionTypeFilterAttribute : TypeFilterAttribute
{
    public SampleActionTypeFilterAttribute()
         : base(typeof(InternalSampleActionFilter)) { }

    private class InternalSampleActionFilter : IActionFilter
    {
        private readonly ILogger<InternalSampleActionFilter> _logger;

        public InternalSampleActionFilter(ILogger<InternalSampleActionFilter> logger) =>
            _logger = logger;

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation(
                $"- {nameof(InternalSampleActionFilter)}.{nameof(OnActionExecuting)}");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation(
                $"- {nameof(InternalSampleActionFilter)}.{nameof(OnActionExecuted)}");
        }
    }
}
```
The following code shows three approaches to applying the filter:

```csharp
[SampleActionTypeFilter]
public IActionResult WithDirectAttribute() =>
    Content($"- {nameof(FilterFactoryController)}.{nameof(WithDirectAttribute)}");

[TypeFilter<SampleActionTypeFilterAttribute>]
public IActionResult WithTypeFilterAttribute() =>
    Content($"- {nameof(FilterFactoryController)}.{nameof(WithTypeFilterAttribute)}");

[ServiceFilter<SampleActionTypeFilterAttribute>]
public IActionResult WithServiceFilterAttribute() =>
    Content($"- {nameof(FilterFactoryController)}.{nameof(WithServiceFilterAttribute)}");
```
In the preceding code, the first approach to applying the filter is preferred.

## Use middleware in the filter pipeline

Resource filters work like middleware in that they surround the execution of everything that comes later in the pipeline. But filters differ from middleware in that they're part of the runtime, which means that they have access to context and constructs.

To use middleware as a filter, create a type with a `Configure` method that specifies the middleware to inject into the filter pipeline. The following example uses middleware to set a response header:

```csharp
public class FilterMiddlewarePipeline
{
    public void Configure(IApplicationBuilder app)
    {
        app.Use(async (context, next) =>
        {
            context.Response.Headers.Add("Pipeline", "Middleware");

            await next();
        });
    }
}
```
Use the `Microsoft.AspNetCore.Mvc.MiddlewareFilterAttribute` to run the middleware:

```csharp
[MiddlewareFilter<FilterMiddlewarePipeline>]
public class FilterMiddlewareController : Controller
{
    public IActionResult Index() =>
        Content($"- {nameof(FilterMiddlewareController)}.{nameof(Index)}");
}
```
Middleware filters run at the same stage of the filter pipeline as Resource filters, before model binding and after the rest of the pipeline.

## Thread safety

When passing an *instance* of a filter into `Add`, instead of its `Type`, the filter is a singleton and is **not** thread-safe.

## Related content

* View or download sample (how to download).
* Filter methods for Razor Pages in ASP.NET Core
