---
title: "ASP.NET Core Best Practices (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/best-practices.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Best Practices (part 2 of 3)

## Prefer ReadFormAsync over Request.Form

Use `HttpContext.Request.ReadFormAsync` instead of `HttpContext.Request.Form`.
`HttpContext.Request.Form` can be safely read only with the following conditions:

* The form has been read by a call to `ReadFormAsync`, and
* The cached form value is being read using `HttpContext.Request.Form`

**Do not do this:** The following example uses `HttpContext.Request.Form`. `HttpContext.Request.Form` uses sync over async and can lead to thread pool starvation.

```csharp
public class BadReadController : Controller
{
    [HttpPost("/form-body")]
    public IActionResult Post()
    {
        var form =  HttpContext.Request.Form;

        Process(form["id"], form["name"]);

        return Accepted();
    }
```

**Do this:** The following example uses `HttpContext.Request.ReadFormAsync` to read the form body asynchronously.

```csharp
public class GoodReadController : Controller
{
    [HttpPost("/form-body")]
    public async Task<IActionResult> Post()
    {
       var form = await HttpContext.Request.ReadFormAsync();

        Process(form["id"], form["name"]);

        return Accepted();
    }
```

## Avoid reading large request bodies or response bodies into memory

In .NET, every object allocation greater than or equal to 85,000 bytes ends up in the large object heap (LOH). Large objects are expensive in two ways:

* The allocation cost is high because the memory for a newly allocated large object has to be cleared. The CLR guarantees that memory for all newly allocated objects is cleared.
* LOH is collected with the rest of the heap. LOH requires a full garbage collection or Gen2 collection.

This blog post describes the problem succinctly:

> When a large object is allocated, it's marked as Gen 2 object. Not Gen 0 as for small objects. The consequences are that if you run out of memory in LOH, GC cleans up the whole managed heap, not only LOH. So it cleans up Gen 0, Gen 1 and Gen 2 including LOH. This is called full garbage collection and is the most time-consuming garbage collection. For many applications, it can be acceptable. But definitely not for high-performance web servers, where few big memory buffers are needed to handle an average web request (read from a socket, decompress, decode JSON, and more).

Storing a large request or response body into a single `byte[]` or `string`:

* May result in quickly running out of space in the LOH.
* May cause performance issues for the app because of full GCs running.

## Working with a synchronous data processing API

When using a serializer/de-serializer that only supports synchronous reads and writes (for example, Json.NET):

* Buffer the data into memory asynchronously before passing it into the serializer/de-serializer.

> **Warning:**
> If the request is large, it could lead to an out of memory (OOM) condition. OOM can result in a Denial Of Service. For more information, see Avoid reading large request bodies or response bodies into memory in this article.

ASP.NET Core 3.0 uses `System.Text.Json` by default for JSON serialization. `System.Text.Json`:

* Reads and writes JSON asynchronously.
* Is optimized for UTF-8 text.
* Typically is higher performance than `Newtonsoft.Json`.

## Do not store IHttpContextAccessor.HttpContext in a field

The IHttpContextAccessor.HttpContext returns the `HttpContext` of the active request when accessed from the request thread. The `IHttpContextAccessor.HttpContext` should **not** be stored in a field or variable.

**Do not do this:** The following example stores the `HttpContext` in a field and then attempts to use it later.

```csharp
public class MyBadType
{
    private readonly HttpContext _context;
    public MyBadType(IHttpContextAccessor accessor)
    {
        _context = accessor.HttpContext;
    }

    public void CheckAdmin()
    {
        if (!_context.User.IsInRole("admin"))
        {
            throw new UnauthorizedAccessException("The current user isn't an admin");
        }
    }
}
```

The preceding code frequently captures a null or incorrect `HttpContext` in the constructor.

**Do this:** The following example:

* Stores the `Microsoft.AspNetCore.Http.IHttpContextAccessor` in a field.
* Uses the `HttpContext` field at the correct time and checks for `null`.

```csharp
public class MyGoodType
{
    private readonly IHttpContextAccessor _accessor;
    public MyGoodType(IHttpContextAccessor accessor)
    {
        _accessor = accessor;
    }

    public void CheckAdmin()
    {
        var context = _accessor.HttpContext;
        if (context != null && !context.User.IsInRole("admin"))
        {
            throw new UnauthorizedAccessException("The current user isn't an admin");
        }
    }
}
```

## Do not access HttpContext from multiple threads

`HttpContext` is **not** thread-safe. Accessing `HttpContext` from multiple threads in parallel can result in unexpected behavior such as the server to stop responding, crashes, and data corruption.

**Do not do this:** The following example makes three parallel requests and logs the incoming request path before and after the outgoing HTTP request. The request path is accessed from multiple threads, potentially in parallel.

```csharp
public class AsyncBadSearchController : Controller
{       
    [HttpGet("/search")]
    public async Task<SearchResults> Get(string query)
    {
        var query1 = SearchAsync(SearchEngine.Google, query);
        var query2 = SearchAsync(SearchEngine.Bing, query);
        var query3 = SearchAsync(SearchEngine.DuckDuckGo, query);

        await Task.WhenAll(query1, query2, query3);

        var results1 = await query1;
        var results2 = await query2;
        var results3 = await query3;

        return SearchResults.Combine(results1, results2, results3);
    }       

    private async Task<SearchResults> SearchAsync(SearchEngine engine, string query)
    {
        var searchResults = _searchService.Empty();
        try
        {
            _logger.LogInformation("Starting search query from {path}.", 
                                    HttpContext.Request.Path);
            searchResults = _searchService.Search(engine, query);
            _logger.LogInformation("Finishing search query from {path}.", 
                                    HttpContext.Request.Path);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed query from {path}", 
                             HttpContext.Request.Path);
        }

        return await searchResults;
    }
```

**Do this:** The following example copies all data from the incoming request before making the three parallel requests.

```csharp
public class AsyncGoodSearchController : Controller
{       
    [HttpGet("/search")]
    public async Task<SearchResults> Get(string query)
    {
        string path = HttpContext.Request.Path;
        var query1 = SearchAsync(SearchEngine.Google, query,
                                 path);
        var query2 = SearchAsync(SearchEngine.Bing, query, path);
        var query3 = SearchAsync(SearchEngine.DuckDuckGo, query, path);

        await Task.WhenAll(query1, query2, query3);

        var results1 = await query1;
        var results2 = await query2;
        var results3 = await query3;

        return SearchResults.Combine(results1, results2, results3);
    }

    private async Task<SearchResults> SearchAsync(SearchEngine engine, string query,
                                                  string path)
    {
        var searchResults = _searchService.Empty();
        try
        {
            _logger.LogInformation("Starting search query from {path}.",
                                   path);
            searchResults = await _searchService.SearchAsync(engine, query);
            _logger.LogInformation("Finishing search query from {path}.", path);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed query from {path}", path);
        }

        return await searchResults;
    }
```

## Do not use the HttpContext after the request is complete

`HttpContext` is only valid as long as there is an active HTTP request in the ASP.NET Core pipeline. The entire ASP.NET Core pipeline is an asynchronous chain of delegates that executes every request. When the `Task` returned from this chain completes, the `HttpContext` is recycled.

**Do not do this:** The following example uses `async void` which makes the HTTP request complete when the first `await` is reached:

* Using `async void` is **ALWAYS** a bad practice in ASP.NET Core apps.
* The example code accesses the `HttpResponse` after the HTTP request is complete.
* The late access crashes the process.

```csharp
public class AsyncBadVoidController : Controller
{
    [HttpGet("/async")]
    public async void Get()
    {
        await Task.Delay(1000);

        // The following line will crash the process because of writing after the 
        // response has completed on a background thread. Notice async void Get()

        await Response.WriteAsync("Hello World");
    }
}
```

**Do this:** The following example returns a `Task` to the framework, so the HTTP request doesn't complete until the action completes.

```csharp
public class AsyncGoodTaskController : Controller
{
    [HttpGet("/async")]
    public async Task Get()
    {
        await Task.Delay(1000);

        await Response.WriteAsync("Hello World");
    }
}
```

## Do not capture the HttpContext in background threads

**Do not do this:** The following example shows a closure is capturing the `HttpContext` from the `Controller` property. This is a bad practice because the work item could:

* Run outside of the request scope.
* Attempt to read the wrong `HttpContext`.

```csharp
[HttpGet("/fire-and-forget-1")]
public IActionResult BadFireAndForget()
{
    _ = Task.Run(async () =>
    {
        await Task.Delay(1000);

        var path = HttpContext.Request.Path;
        Log(path);
    });

    return Accepted();
}
```

**Do this:** The following example:

* Copies the data required in the background task during the request.
* Doesn't reference anything from the controller.

```csharp
[HttpGet("/fire-and-forget-3")]
public IActionResult GoodFireAndForget()
{
    string path = HttpContext.Request.Path;
    _ = Task.Run(async () =>
    {
        await Task.Delay(1000);

        Log(path);
    });

    return Accepted();
}
```

Background tasks should be implemented as hosted services. For more information, see Background tasks with hosted services.

## Do not capture services injected into the controllers on background threads

**Do not do this:** The following example shows a closure that is capturing the `DbContext` from the `Controller` action parameter. This is a bad practice. The work item could run outside of the request scope. The `ContosoDbContext` is scoped to the request, resulting in an `ObjectDisposedException`.

```csharp
[HttpGet("/fire-and-forget-1")]
public IActionResult FireAndForget1([FromServices]ContosoDbContext context)
{
    _ = Task.Run(async () =>
    {
        await Task.Delay(1000);

        context.Contoso.Add(new Contoso());
        await context.SaveChangesAsync();
    });

    return Accepted();
}
```

**Do this:** The following example:

* Injects an `Microsoft.Extensions.DependencyInjection.IServiceScopeFactory` in order to create a scope in the background work item. `IServiceScopeFactory` is a singleton.
* Creates a new dependency injection scope in the background thread.
* Doesn't reference anything from the controller.
* Doesn't capture the `ContosoDbContext` from the incoming request.

```csharp
[HttpGet("/fire-and-forget-3")]
public IActionResult FireAndForget3([FromServices]IServiceScopeFactory 
                                    serviceScopeFactory)
{
    _ = Task.Run(async () =>
    {
        await Task.Delay(1000);

        using (var scope = serviceScopeFactory.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ContosoDbContext>();

            context.Contoso.Add(new Contoso());

            await context.SaveChangesAsync();                                        
        }
    });

    return Accepted();
}
```

The following highlighted code:

* Creates a scope for the lifetime of the background operation and resolves services from it.
* Uses `ContosoDbContext` from the correct scope.

```csharp
[HttpGet("/fire-and-forget-3")]
public IActionResult FireAndForget3([FromServices]IServiceScopeFactory 
                                    serviceScopeFactory)
{
    _ = Task.Run(async () =>
    {
        await Task.Delay(1000);

        using (var scope = serviceScopeFactory.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ContosoDbContext>();

            context.Contoso.Add(new Contoso());

            await context.SaveChangesAsync();                                        
        }
    });

    return Accepted();
}
```

## Do not modify the status code or headers after the response body has started

ASP.NET Core does not buffer the HTTP response body. The first time the response is written:

* The headers are sent along with that chunk of the body to the client.
* It's no longer possible to change response headers.

**Do not do this:** The following code tries to add response headers after the response has already started:

```csharp
app.Use(async (context, next) =>
{
    await next();

    context.Response.Headers["test"] = "test value";
});
```

In the preceding code, `context.Response.Headers["test"] = "test value";` will throw an exception if `next()` has written to the response.

**Do this:** The following example checks if the HTTP response has started before modifying the headers.

```csharp
app.Use(async (context, next) =>
{
    await next();

    if (!context.Response.HasStarted)
    {
        context.Response.Headers["test"] = "test value";
    }
});
```

**Do this:** The following example uses `HttpResponse.OnStarting` to set the headers before the response headers are flushed to the client.

Checking if the response has not started allows registering a callback that will be invoked just before response headers are written. Checking if the response has not started:

* Provides the ability to append or override headers just in time.
* Doesn't require knowledge of the next middleware in the pipeline.

```csharp
app.Use(async (context, next) =>
{
    context.Response.OnStarting(() =>
    {
        context.Response.Headers["someheader"] = "somevalue";
        return Task.CompletedTask;
    });

    await next();
});
```

## Do not call next() if you have already started writing to the response body

Components only expect to be called if it's possible for them to handle and manipulate the response.
