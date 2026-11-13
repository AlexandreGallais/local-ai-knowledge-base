---
title: "Filter methods for Razor Pages in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/razor-pages/filter.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Filter methods for Razor Pages in ASP.NET Core

By Rick Anderson

Razor Page filters `Microsoft.AspNetCore.Mvc.Filters.IPageFilter` and `Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter` allow Razor Pages to run code before and after a Razor Page handler is run. Razor Page filters are similar to ASP.NET Core MVC action filters, except they can't be applied to individual page handler methods.

Razor Page filters:

* Run code after a handler method has been selected, but before model binding occurs.
* Run code before the handler method executes, after model binding is complete.
* Run code after the handler method executes.
* Can be implemented on a page or globally.
* Cannot be applied to specific page handler methods.
* Can have constructor dependencies populated by Dependency Injection (DI). For more information, see ServiceFilterAttribute and TypeFilterAttribute.

While page constructors and middleware enable executing custom code before a handler method executes, only Razor Page filters enable access to `Microsoft.AspNetCore.Mvc.RazorPages.PageModel.HttpContext` and the page. Middleware has access to the `HttpContext`, but not to the "page context". Filters have a `Microsoft.AspNetCore.Mvc.Filters.FilterContext` derived parameter, which provides access to `HttpContext`. Here's a sample for a page filter: Implement a filter attribute that adds a header to the response, something that can't be done with constructors or middleware. Access to the page context, which includes access to the instances of the page and it's model, are only available when executing filters, handlers, or the body of a Razor Page.

View or download sample code (how to download)

Razor Page filters provide the following methods, which can be applied globally or at the page level:

* Synchronous methods:

  * `Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerSelected*` : Called after a handler method has been selected, but before model binding occurs.
  * `Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuting*` : Called before the handler method executes, after model binding is complete.
  * `Microsoft.AspNetCore.Mvc.Filters.IPageFilter.OnPageHandlerExecuted*` : Called after the handler method executes, before the action result.

* Asynchronous methods:

  * `Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerSelectionAsync*` : Called asynchronously after the handler method has been selected, but before model binding occurs.
  * `Microsoft.AspNetCore.Mvc.Filters.IAsyncPageFilter.OnPageHandlerExecutionAsync*` : Called asynchronously before the handler method is invoked, after model binding is complete.

Implement **either** the synchronous or the async version of a filter interface, **not** both. The framework checks first to see if the filter implements the async interface, and if so, it calls that. If not, it calls the synchronous interface's methods. If both interfaces are implemented, only the async methods are called. The same rule applies to overrides in pages, implement the synchronous or the async version of the override, not both.

## Implement Razor Page filters globally

The following code implements `IAsyncPageFilter`:

```csharp
public class SampleAsyncPageFilter : IAsyncPageFilter
{
    private readonly IConfiguration _config;

    public SampleAsyncPageFilter(IConfiguration config)
    {
        _config = config;
    }

    public Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
    {
        var key = _config["UserAgentID"];
        context.HttpContext.Request.Headers.TryGetValue("user-agent",
                                                        out StringValues value);
        ProcessUserAgent.Write(context.ActionDescriptor.DisplayName,
                               "SampleAsyncPageFilter.OnPageHandlerSelectionAsync",
                               value, key.ToString());

        return Task.CompletedTask;
    }

    public async Task OnPageHandlerExecutionAsync(PageHandlerExecutingContext context,
                                                  PageHandlerExecutionDelegate next)
    {
        // Do post work.
        await next.Invoke();
    }
}
```

In the preceding code, `ProcessUserAgent.Write` is user supplied code that works with the user agent string.

The following code enables the `SampleAsyncPageFilter` in the `Startup` class:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddRazorPages()
        .AddMvcOptions(options =>
        {
            options.Filters.Add(new SampleAsyncPageFilter(Configuration));
        });
}
```

The following code calls `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection.AddFolderApplicationModelConvention*` to apply the `SampleAsyncPageFilter` to only pages in */Movies*:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddRazorPages(options =>
    {
        options.Conventions.AddFolderApplicationModelConvention(
            "/Movies",
            model => model.Filters.Add(new SampleAsyncPageFilter(Configuration)));
    });
}
```

The following code implements the synchronous `IPageFilter`:

```csharp
public class SamplePageFilter : IPageFilter
{
    private readonly IConfiguration _config;

    public SamplePageFilter(IConfiguration config)
    {
        _config = config;
    }

    public void OnPageHandlerSelected(PageHandlerSelectedContext context)
    {
        var key = _config["UserAgentID"];
        context.HttpContext.Request.Headers.TryGetValue("user-agent", out StringValues value);
        ProcessUserAgent.Write(context.ActionDescriptor.DisplayName,
                               "SamplePageFilter.OnPageHandlerSelected",
                               value, key.ToString());
    }

    public void OnPageHandlerExecuting(PageHandlerExecutingContext context)
    {
        Debug.WriteLine("Global sync OnPageHandlerExecuting called.");
    }

    public void OnPageHandlerExecuted(PageHandlerExecutedContext context)
    {
        Debug.WriteLine("Global sync OnPageHandlerExecuted called.");
    }
}
```

The following code enables the `SamplePageFilter`:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddRazorPages()
        .AddMvcOptions(options =>
        {
            options.Filters.Add(new SamplePageFilter(Configuration));
        });
}
```

## Implement Razor Page filters by overriding filter methods

The following code overrides the asynchronous Razor Page filters:

```csharp
public class IndexModel : PageModel
{
    private readonly IConfiguration _config;

    public IndexModel(IConfiguration config)
    {
        _config = config;
    }

    public override Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
    {
        Debug.WriteLine("/IndexModel OnPageHandlerSelectionAsync");
        return Task.CompletedTask;
    }

    public async override Task OnPageHandlerExecutionAsync(PageHandlerExecutingContext context, 
                                                           PageHandlerExecutionDelegate next)
    {
        var key = _config["UserAgentID"];
        context.HttpContext.Request.Headers.TryGetValue("user-agent", out StringValues value);
        ProcessUserAgent.Write(context.ActionDescriptor.DisplayName,
                               "/IndexModel-OnPageHandlerExecutionAsync",
                                value, key.ToString());

        await next.Invoke();
    }
}
```

## Implement a filter attribute

The built-in attribute-based filter `Microsoft.AspNetCore.Mvc.Filters.IAsyncResultFilter.OnResultExecutionAsync*` filter can be subclassed. The following filter adds a header to the response:

```csharp
﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace PageFilter.Filters
{
    public class AddHeaderAttribute  : ResultFilterAttribute
    {
        private readonly string _name;
        private readonly string _value;

        public AddHeaderAttribute (string name, string value)
        {
            _name = name;
            _value = value;
        }

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            context.HttpContext.Response.Headers.Add(_name, new string[] { _value });
        }
    }
}
```

The following code applies the `AddHeader` attribute:

```csharp
﻿using Microsoft.AspNetCore.Mvc.RazorPages;
using PageFilter.Filters;

namespace PageFilter.Movies
{
    [AddHeader("Author", "Rick")]
    public class TestModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}
```

Use a tool such as the browser developer tools to examine the headers. Under **Response Headers**, `author: Rick` is displayed.

See Overriding the default order for instructions on overriding the order.

See Cancellation and short circuiting for instructions to short-circuit the filter pipeline from a filter.

## Authorize filter attribute

The Authorize attribute can be applied to a `PageModel`:

```csharp
﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PageFilter.Pages
{
    [Authorize]
    public class ModelWithAuthFilterModel : PageModel
    {
        public IActionResult OnGet() => Page();
    }
}
```
