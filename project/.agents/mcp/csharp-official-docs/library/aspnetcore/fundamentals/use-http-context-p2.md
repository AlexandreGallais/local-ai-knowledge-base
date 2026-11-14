---
title: "Use HttpContext in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/use-http-context.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use HttpContext in ASP.NET Core (part 2 of 2)

## HttpContext isn't thread safe

This article primarily discusses using `HttpContext` in request and response flow from Blazor Web App components, Razor Pages, controllers, middleware, and so forth. Consider the following when using `HttpContext` outside the request and response flow:

* The `HttpContext` is **NOT** thread safe. Accessing it from multiple threads can result in unpredictable results, such as exceptions and data corruption.
* The `Microsoft.AspNetCore.Http.IHttpContextAccessor` interface should be used with caution. As always, the `HttpContext` must ***not*** be captured outside of the request flow. `IHttpContextAccessor`:
  * Relies on  `System.Threading.AsyncLocal`1`, which can have a negative performance impact on asynchronous calls.
  * Creates a dependency on "ambient state" which can make testing more difficult.
* `Microsoft.AspNetCore.Http.IHttpContextAccessor.HttpContext` might be `null` if accessed outside of the request flow.
* To access information from `HttpContext` outside the request flow, copy the information inside the request flow. Be careful to copy the actual data and not just references. For example, rather than copying a reference to an `IHeaderDictionary`, copy the relevant header values or copy the entire dictionary key by key <example-value> leaving the request flow.
* Don't capture `IHttpContextAccessor.HttpContext` in a constructor.

The following sample logs GitHub branches when requested from the `/branch` endpoint:

```csharp
using System.Text.Json;
using HttpContextInBackgroundThread;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddHostedService<PeriodicBranchesLoggerService>();

builder.Services.AddHttpClient("GitHub", httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.github.com/");

    // The GitHub API requires two headers. The Use-Agent header is added
    // dynamically through UserAgentHeaderHandler
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "application/vnd.github.v3+json");
}).AddHttpMessageHandler<UserAgentHeaderHandler>();

builder.Services.AddTransient<UserAgentHeaderHandler>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/branches", async (IHttpClientFactory httpClientFactory,
                         HttpContext context, Logger<Program> logger) =>
{
    var httpClient = httpClientFactory.CreateClient("GitHub");
    var httpResponseMessage = await httpClient.GetAsync(
        "repos/dotnet/AspNetCore.Docs/branches");

    if (!httpResponseMessage.IsSuccessStatusCode) 
        return Results.BadRequest();

    await using var contentStream =
        await httpResponseMessage.Content.ReadAsStreamAsync();

    var response = await JsonSerializer.DeserializeAsync
        <IEnumerable<GitHubBranch>>(contentStream);

    app.Logger.LogInformation($"/branches request: " +
                              $"{JsonSerializer.Serialize(response)}");

    return Results.Ok(response);
});

app.Run();
```

The GitHub API requires two headers. The `User-Agent` header is added dynamically by the `UserAgentHeaderHandler`:

```csharp
using System.Text.Json;
using HttpContextInBackgroundThread;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddHostedService<PeriodicBranchesLoggerService>();

builder.Services.AddHttpClient("GitHub", httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.github.com/");

    // The GitHub API requires two headers. The Use-Agent header is added
    // dynamically through UserAgentHeaderHandler
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "application/vnd.github.v3+json");
}).AddHttpMessageHandler<UserAgentHeaderHandler>();

builder.Services.AddTransient<UserAgentHeaderHandler>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/branches", async (IHttpClientFactory httpClientFactory,
                         HttpContext context, Logger<Program> logger) =>
{
    var httpClient = httpClientFactory.CreateClient("GitHub");
    var httpResponseMessage = await httpClient.GetAsync(
        "repos/dotnet/AspNetCore.Docs/branches");

    if (!httpResponseMessage.IsSuccessStatusCode) 
        return Results.BadRequest();

    await using var contentStream =
        await httpResponseMessage.Content.ReadAsStreamAsync();

    var response = await JsonSerializer.DeserializeAsync
        <IEnumerable<GitHubBranch>>(contentStream);

    app.Logger.LogInformation($"/branches request: " +
                              $"{JsonSerializer.Serialize(response)}");

    return Results.Ok(response);
});

app.Run();
```

The `UserAgentHeaderHandler`:

```csharp
using Microsoft.Net.Http.Headers;

namespace HttpContextInBackgroundThread;

public class UserAgentHeaderHandler : DelegatingHandler
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger _logger;

    public UserAgentHeaderHandler(IHttpContextAccessor httpContextAccessor,
                                  ILogger<UserAgentHeaderHandler> logger)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    protected override async Task<HttpResponseMessage> 
                                    SendAsync(HttpRequestMessage request, 
                                    CancellationToken <example-value>)
    {
        var contextRequest = _httpContextAccessor.HttpContext?.Request;
        string? userAgentString = contextRequest?.Headers["user-agent"].ToString();
        
        if (string.IsNullOrEmpty(userAgentString))
        {
            userAgentString = "Unknown";
        }

        request.Headers.Add(HeaderNames.UserAgent, userAgentString);
        _logger.LogInformation($"User-Agent: {userAgentString}");

        return await base.SendAsync(request, cancellationToken);
    }
}
```

In the preceding code, when the `HttpContext` is `null`, the `userAgent` string is set to `"Unknown"`. If possible, `HttpContext` should be explicitly passed to the service. Explicitly passing in `HttpContext` data:

* Makes the service API more useable outside the request flow.
* Is better for performance.
* Makes the code easier to understand and reason about than relying on ambient state.

When the service must access `HttpContext`, it should account for the possibility of `HttpContext` being `null` when not called from a request thread.

The application also includes `PeriodicBranchesLoggerService`, which logs the open GitHub branches of the specified repository every 30 seconds:

```csharp
using System.Text.Json;

namespace HttpContextInBackgroundThread;

public class PeriodicBranchesLoggerService : BackgroundService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger _logger;
    private readonly PeriodicTimer _timer;

    public PeriodicBranchesLoggerService(IHttpClientFactory httpClientFactory,
                                         ILogger<PeriodicBranchesLoggerService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _timer = new PeriodicTimer(TimeSpan.FromSeconds(30));
    }

    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        while (await _timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                // Cancel sending the request to sync branches if it takes too long
                // rather than miss sending the next request scheduled 30 seconds from now.
                // Having a single loop prevents this service from sending an unbounded
                // number of requests simultaneously.
                using var syncTokenSource = CancellationTokenSource.CreateLinkedTokenSource(stoppingToken);
                syncTokenSource.CancelAfter(TimeSpan.FromSeconds(30));
                
                var httpClient = _httpClientFactory.CreateClient("GitHub");
                var httpResponseMessage = await httpClient.GetAsync("repos/dotnet/AspNetCore.Docs/branches",
                                                                    stoppingToken);

                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    await using var contentStream =
                        await httpResponseMessage.Content.ReadAsStreamAsync(stoppingToken);

                    // Sync the response with preferred datastore.
                    var response = await JsonSerializer.DeserializeAsync<
                        IEnumerable<GitHubBranch>>(contentStream, cancellationToken: <example-value>);

                    _logger.LogInformation(
                        $"Branch sync successful! Response: {JsonSerializer.Serialize(response)}");
                }
                else
                {
                    _logger.LogError(1, $"Branch sync failed! HTTP status code: {httpResponseMessage.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Branch sync failed!");
            }
        }
    }

    public override Task StopAsync(CancellationToken <example-value>)
    {
        // This will cause any active call to WaitForNextTickAsync() to return false immediately.
        _timer.Dispose();
        // This will cancel the stoppingToken and await ExecuteAsync(stoppingToken).
        return base.StopAsync(stoppingToken);
    }
}
```

`PeriodicBranchesLoggerService` is a hosted service, which runs outside the request and response flow. Logging from the `PeriodicBranchesLoggerService` has a null `HttpContext`. The `PeriodicBranchesLoggerService` was written to not depend on the `HttpContext`.

```csharp
using System.Text.Json;
using HttpContextInBackgroundThread;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddHostedService<PeriodicBranchesLoggerService>();

builder.Services.AddHttpClient("GitHub", httpClient =>
{
```

## Related content

For more information about accessing `HttpContext`, see Access HttpContext in ASP.NET Core.
