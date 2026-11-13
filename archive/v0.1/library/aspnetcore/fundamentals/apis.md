---
title: "APIs overview"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/apis.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# APIs overview

-->
-->

ASP.NET Core provides two approaches for building HTTP APIs: **Minimal APIs** and controller-based APIs. **For new projects, we recommend using Minimal APIs** as they provide a simplified, high-performance approach for building APIs with minimal code and configuration.

## Minimal APIs - Recommended for new projects

Minimal APIs are the recommended approach for building fast HTTP APIs with ASP.NET Core. They allow you to build fully functioning REST endpoints with minimal code and configuration. Skip traditional scaffolding and avoid unnecessary controllers by fluently declaring API routes and actions.

Here's a simple example that creates an API at the root of the web app:

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World!");

app.Run();
```

Most APIs accept parameters as part of the route:

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/users/{userId}/books/{bookId}",
    (int userId, int bookId) => $"The user id is {userId} and book id is {bookId}");

app.Run();
```

Minimal APIs support the configuration and customization needed to scale to multiple APIs, handle complex routes, apply authorization rules, and control the content of API responses.

### Getting started with Minimal APIs

* **Tutorial**: Tutorial: Create a Minimal API with ASP.NET Core
* **Quick reference**: Minimal APIs quick reference
* **Examples**: For a full list of common scenarios with code examples, see Minimal APIs quick reference

## Controller-based APIs - Alternative approach

ASP.NET Core also supports a controller-based approach where controllers are classes that derive from `Microsoft.AspNetCore.Mvc.ControllerBase`. This approach follows traditional object-oriented patterns and may be preferred for:

* Large applications with complex business logic
* Teams familiar with the MVC pattern
* Applications requiring specific MVC features

Here's sample code for an API based on controllers:

```csharp

namespace APIWithControllers;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        var app = builder.Build();

        app.UseHttpsRedirection();

        app.MapControllers();

        app.Run();
    }
}
```
```csharp
using Microsoft.AspNetCore.Mvc;

namespace APIWithControllers.Controllers;
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
```
The following code provides the same functionality using the recommended Minimal API approach:

```csharp

namespace MinimalAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var app = builder.Build();

        app.UseHttpsRedirection();

        var summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        app.MapGet("/weatherforecast", (HttpContext httpContext) =>
        {
            var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = summaries[Random.Shared.Next(summaries.Length)]
                })
                .ToArray();
            return forecast;
        });

        app.Run();
    }
}
```
Both API projects refer to the following class:

```csharp
namespace APIWithControllers;

public class WeatherForecast
{
    public DateOnly Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}
```
## Choosing between approaches

**Start with Minimal APIs** for new projects. They offer:

* **Simpler syntax** - Less boilerplate code
* **Better performance** - Reduced overhead compared to controllers
* **Easier testing** - Simplified unit and integration testing
* **Modern approach** - Leverages the latest .NET features

**Consider controller-based APIs** if you need:

* Model binding extensibility (`Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinderProvider`, `Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinder`)
* Advanced validation features (`Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IModelValidator`)
* Application parts or the application model
* OData support

Most of these features can be implemented in Minimal APIs with custom solutions, but controllers provide them out of the box.

## See also

* Tutorial: Create a Minimal API with ASP.NET Core - Minimal API tutorial
* Minimal APIs quick reference - Minimal APIs quick reference
* Create web APIs with ASP.NET Core - Controller-based APIs overview
* Tutorial: Create a controller-based web API with ASP.NET Core - Controller-based API tutorial
