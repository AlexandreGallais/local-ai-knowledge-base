---
title: "ASP.NET Core Best Practices (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/best-practices.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Best Practices

By Mike Rousos

This article provides guidelines for maximizing performance and reliability of ASP.NET Core apps.

## Cache aggressively

Caching is discussed in several parts of this article. For more information, see Overview of caching in ASP.NET Core.

## Understand hot code paths

In this article, a *hot code path* is defined as a code path that is frequently called and where much of the execution time occurs. Hot code paths typically limit app scale-out and performance and are discussed in several parts of this article.

## Avoid blocking calls

ASP.NET Core apps should be designed to process many requests simultaneously. Asynchronous APIs allow a small pool of threads to handle thousands of concurrent requests by not waiting on blocking calls. Rather than waiting on a long-running synchronous task to complete, the thread can work on another request.

A common performance problem in ASP.NET Core apps is blocking calls that could be asynchronous. Many synchronous blocking calls lead to Thread Pool starvation and degraded response times.

**Do not** block asynchronous execution by calling `System.Threading.Tasks.Task.Wait*` or `System.Threading.Tasks.Task`1.Result`.
**Do not** acquire locks in common code paths. ASP.NET Core apps perform best when architected to run code in parallel.
**Do not** call `System.Threading.Tasks.Task.Run*` and immediately await it. ASP.NET Core already runs app code on normal Thread Pool threads, so calling `Task.Run` only results in extra unnecessary Thread Pool scheduling. Even if the scheduled code would block a thread, `Task.Run` does not prevent that.

* **Do** make hot code paths asynchronous.
* **Do** call data access, I/O, and long-running operations APIs asynchronously if an asynchronous API is available.
* **Do not** use `System.Threading.Tasks.Task.Run*` to make a synchronous API asynchronous.
* **Do** make controller/Razor Page actions asynchronous. The entire call stack is asynchronous in order to benefit from async/await patterns.
* **Consider** using message brokers like Azure Service Bus to offload long-running calls

A profiler, such as PerfView, can be used to find threads frequently added to the Thread Pool. The `Microsoft-Windows-DotNETRuntime/ThreadPoolWorkerThread/Start` event indicates a thread added to the thread pool.

## Return large collections across multiple smaller pages

A webpage shouldn't load large amounts of data all at once. When returning a collection of objects, consider whether it could lead to performance issues. Determine if the design could produce the following poor outcomes:

* `System.OutOfMemoryException` or high memory consumption
* Thread pool starvation (see the following remarks on `System.Collections.Generic.IAsyncEnumerable`1`)
* Slow response times
* Frequent garbage collection

**Do** add pagination to mitigate the preceding scenarios. Using page size and page index parameters, developers should favor the design of returning a partial result. When an exhaustive result is required, pagination should be used to asynchronously populate batches of results to avoid locking server resources.

For more information on paging and limiting the number of returned records, see:

* Performance considerations
* Add paging to an ASP.NET Core app

### Return `IEnumerable<T>` or `IAsyncEnumerable<T>`

Returning `IEnumerable<T>` from an action results in synchronous collection iteration by the serializer. The result is the blocking of calls and a potential for thread pool starvation. To avoid synchronous enumeration, use `ToListAsync` before returning the enumerable.

Beginning with ASP.NET Core 3.0, `IAsyncEnumerable<T>` can be used as an alternative to `IEnumerable<T>` that enumerates asynchronously. For more information, see Controller action return types.

## Minimize large object allocations

The .NET garbage collector manages allocation and release of memory automatically in ASP.NET Core apps. Automatic garbage collection generally means that developers don't need to worry about how or when memory is freed. However, cleaning up unreferenced objects takes CPU time, so developers should minimize allocating objects in hot code paths. Garbage collection is especially expensive on large objects (>= 85,000 bytes). Large objects are stored on the large object heap and require a full (generation 2) garbage collection to clean up. Unlike generation 0 and generation 1 collections, a generation 2 collection requires a temporary suspension of app execution. Frequent allocation and de-allocation of large objects can cause inconsistent performance.

Recommendations:

* **Do** consider caching large objects that are frequently used. Caching large objects prevents expensive allocations.
* **Do** pool buffers by using an `System.Buffers.ArrayPool`1` to store large arrays.
* **Do not** allocate many, short-lived large objects on hot code paths.

Memory issues, such as the preceding, can be diagnosed by reviewing garbage collection (GC) stats in PerfView and examining:

* Garbage collection pause time.
* What percentage of the processor time is spent in garbage collection.
* How many garbage collections are generation 0, 1, and 2.

For more information, see Garbage Collection and Performance.

## Optimize data access and I/O

Interactions with a data store and other remote services are often the slowest parts of an ASP.NET Core app. Reading and writing data efficiently is critical for good performance.

Recommendations:

* **Do** call all data access APIs asynchronously.
* **Do not** retrieve more data than is necessary. Write queries to return just the data that's necessary for the current HTTP request.
* **Do** consider caching frequently accessed data retrieved from a database or remote service if slightly out-of-date data is acceptable. Depending on the scenario, use a MemoryCache or a DistributedCache. For more information, see Response caching in ASP.NET Core.
* **Do** minimize network round trips. The goal is to retrieve the required data in a single call rather than several calls.
* **Do** use no-tracking queries in Entity Framework Core when accessing data for read-only purposes. EF Core can return the results of no-tracking queries more efficiently.
* **Do** filter and aggregate LINQ queries (with `.Where`, `.Select`, or `.Sum` statements, for example) so that the filtering is performed by the database.
* **Do** consider that EF Core resolves some query operators on the client, which may lead to inefficient query execution. For more information, see Client evaluation performance issues.
* **Do not** use projection queries on collections, which can result in executing "N + 1" SQL queries. For more information, see Optimization of correlated subqueries.

The following approaches may improve performance in high-scale apps:

* DbContext pooling
* Explicitly compiled queries

We recommend measuring the impact of the preceding high-performance approaches before committing the code base. The additional complexity of compiled queries may not justify the performance improvement.

Query issues can be detected by reviewing the time spent accessing data with Application Insights or with profiling tools. Most databases also make statistics available concerning frequently executed queries.

## Pool HTTP connections with HttpClientFactory

Although `System.Net.Http.HttpClient` implements the `IDisposable` interface, it's designed for reuse. Closed `HttpClient` instances leave sockets open in the `TIME_WAIT` state for a short period of time. If a code path that creates and disposes of `HttpClient` objects is frequently used, the app may exhaust available sockets. `HttpClientFactory` was introduced in ASP.NET Core 2.1 as a solution to this problem. It handles pooling HTTP connections to optimize performance and reliability. For more information, see Use `HttpClientFactory` to implement resilient HTTP requests.

Recommendations:

* **Do not** create and dispose of `HttpClient` instances directly.
* **Do** use HttpClientFactory to retrieve `HttpClient` instances. For more information, see Use HttpClientFactory to implement resilient HTTP requests.

## Keep common code paths fast

You want all of your code to be fast. Frequently-called code paths are the most critical to optimize. These include:

* Middleware components in the app's request processing pipeline, especially middleware run early in the pipeline. These components have a large impact on performance.
* Code that's executed for every request or multiple times per request. For example, custom logging, authorization handlers, or initialization of transient services.

Recommendations:

* **Do not** use custom middleware components with long-running tasks.
* **Do** use performance profiling tools, such as Visual Studio Diagnostic Tools or PerfView), to identify hot code paths.

## Complete long-running Tasks outside of HTTP requests

Most requests to an ASP.NET Core app can be handled by a controller or page model calling necessary services and returning an HTTP response. For some requests that involve long-running tasks, it's better to make the entire request-response process asynchronous.

Recommendations:

* **Do not** wait for long-running tasks to complete as part of ordinary HTTP request processing.
* **Do** consider handling long-running requests with background services or out of process possibly with an Azure Function and/or using a message broker like Azure Service Bus. Completing work out-of-process is especially beneficial for CPU-intensive tasks.
* **Do** use real-time communication options, such as SignalR, to communicate with clients asynchronously.

## Minify client assets

ASP.NET Core apps with complex front-ends frequently serve many JavaScript, CSS, or image files. Performance of initial load requests can be improved by:

* Bundling, which combines multiple files into one.
* Minifying, which reduces the size of files by removing whitespace and comments.

Recommendations:

* **Do** use the bundling and minification guidelines, which mention compatible tools and show how to use ASP.NET Core's `environment` tag to handle both `Development` and `Production` environments.
* **Do** consider other third-party tools, such as Webpack, for complex client asset management.

## Compress responses

 Reducing the size of the response usually increases the responsiveness of an app, often dramatically. One way to reduce payload sizes is to compress an app's responses. For more information, see Response compression.

## Use the latest ASP.NET Core release

Each new release of ASP.NET Core includes performance improvements. Optimizations in .NET and ASP.NET Core mean that newer versions generally outperform older versions. For example, .NET Core 2.1 added support for compiled regular expressions and benefitted from Span\<T>. ASP.NET Core 2.2 added support for HTTP/2. ASP.NET Core 3.0 adds many improvements that reduce memory usage and improve throughput. If performance is a priority, consider upgrading to the current version of ASP.NET Core.

## Minimize exceptions

Exceptions should be rare. Throwing and catching exceptions is slow relative to other code flow patterns. Because of this, exceptions shouldn't be used to control normal program flow.

Recommendations:

* **Do not** use throwing or catching exceptions as a means of normal program flow, especially in hot code paths.
* **Do** include logic in the app to detect and handle conditions that would cause an exception.
* **Do** throw or catch exceptions for unusual or unexpected conditions.

App diagnostic tools, such as Application Insights, can help to identify common exceptions in an app that may affect performance.

## Avoid synchronous read or write on HttpRequest/HttpResponse body

All I/O in ASP.NET Core is asynchronous. Servers implement the `Stream` interface, which has both synchronous and asynchronous overloads. The asynchronous ones should be preferred to avoid blocking thread pool threads. Blocking threads can lead to thread pool starvation.

**Do not do this:** The following example uses the `System.IO.StreamReader.ReadToEnd*`. It blocks the current thread to wait for the result. This is an example of sync over async.

```csharp
public class BadStreamReaderController : Controller
{
    [HttpGet("/contoso")]
    public ActionResult<ContosoData> Get()
    {
        var json = new StreamReader(Request.Body).ReadToEnd();

        return JsonSerializer.Deserialize<ContosoData>(json);
    }
}
```

In the preceding code, `Get` synchronously reads the entire HTTP request body into memory. If the client is slowly uploading, the app is doing sync over async. The app does sync over async because Kestrel does **NOT** support synchronous reads.

**Do this:** The following example uses `System.IO.StreamReader.ReadToEndAsync*` and does not block the thread while reading.

```csharp
public class GoodStreamReaderController : Controller
{
    [HttpGet("/contoso")]
    public async Task<ActionResult<ContosoData>> Get()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        return JsonSerializer.Deserialize<ContosoData>(json);
    }

}
```

The preceding code asynchronously reads the entire HTTP request body into memory.

> **Warning:**
> If the request is large, reading the entire HTTP request body into memory could lead to an out of memory (OOM) condition. OOM can result in a Denial Of Service. For more information, see Avoid reading large request bodies or response bodies into memory in this article.

**Do this:** The following example is fully asynchronous using a non-buffered request body:

```csharp
public class GoodStreamReaderController : Controller
{
    [HttpGet("/contoso")]
    public async Task<ActionResult<ContosoData>> Get()
    {
        return await JsonSerializer.DeserializeAsync<ContosoData>(Request.Body);
    }
}
```

The preceding code asynchronously de-serializes the request body into a C# object.
