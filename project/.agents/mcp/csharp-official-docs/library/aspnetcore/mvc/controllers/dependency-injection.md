---
title: "Dependency injection into controllers in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/controllers/dependency-injection.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Dependency injection into controllers in ASP.NET Core

By Rick Anderson

ASP.NET Core MVC controllers request dependencies explicitly via constructors. ASP.NET Core has built-in support for dependency injection (DI). DI makes apps easier to test and maintain.

View or download sample code (how to download)

## Constructor injection

Services are added as a constructor parameter, and the runtime resolves the service from the service container. Services are typically defined using interfaces. For example, consider an app that requires the current time. The following interface exposes the `IDateTime` service:

```csharp
public interface IDateTime
{
    DateTime Now { get; }
}
```

The following code implements the `IDateTime` interface:

```csharp
public class SystemDateTime : IDateTime
{
    public DateTime Now
    {
        get { return DateTime.Now; }
    }
}
```

Add the service to the service container:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddSingleton<IDateTime, SystemDateTime>();

    services.AddControllersWithViews();
}
```

For more information on `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*`, see DI service lifetimes.

The following code displays a greeting to the user based on the time of day:

```csharp
public class HomeController : Controller
{
    private readonly IDateTime _dateTime;

    public HomeController(IDateTime dateTime)
    {
        _dateTime = dateTime;
    }

    public IActionResult Index()
    {
        var serverTime = _dateTime.Now;
        if (serverTime.Hour < 12)
        {
            ViewData["Message"] = "It's morning here - Good Morning!";
        }
        else if (serverTime.Hour < 17)
        {
            ViewData["Message"] = "It's afternoon here - Good Afternoon!";
        }
        else
        {
            ViewData["Message"] = "It's evening here - Good Evening!";
        }
        return View();
    }
```

Run the app and a message is displayed based on the time.

## Action injection with `FromServices`

The `Microsoft.AspNetCore.Mvc.FromServicesAttribute` enables injecting a service directly into an action method without using constructor injection:

```csharp
public IActionResult About([FromServices] IDateTime dateTime)
{
    return Content( $"Current server time: {dateTime.Now}");
}
```

## Action injection with `FromKeyedServices`

The following code shows how to access keyed services from the DI container by using the `[FromKeyedServices]` attribute:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/KeyServiceController/Program.cs._
## Property injection with `FromServices`

The `Microsoft.AspNetCore.Mvc.FromServicesAttribute` can also be applied to public properties on an MVC controller. The runtime resolves and populates these properties from the DI container during model binding:

```csharp
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [FromServices]
    public required ILogger<WeatherForecastController> Logger { get; set; }

    [FromServices]
    public required IWeatherService WeatherService { get; set; }

    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        Logger.LogInformation("Fetching weather forecast");
        return WeatherService.GetForecast();
    }
}
```

> **Note:**
> Property injection using `[FromServices]` is supported on controller properties with public setters. It isn't supported for services resolved generally through the dependency injection container.

## Access settings from a controller

Accessing app or configuration settings from within a controller is a common pattern. The *options pattern* described in Options pattern in ASP.NET Core is the preferred approach to manage settings. Generally, don't directly inject `Microsoft.Extensions.Configuration.IConfiguration` into a controller.

Create a class that represents the options. For example:

```csharp
public class SampleWebSettings
{
    public string Title { get; set; }
    public int Updates { get; set; }
}
```

Add the configuration class to the services collection:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddSingleton<IDateTime, SystemDateTime>();
    services.Configure<SampleWebSettings>(Configuration);

    services.AddControllersWithViews();
}
```

Configure the app to read the settings from a JSON-formatted file:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config.AddJsonFile("samplewebsettings.json",
                    optional: false,
                    reloadOnChange: true);
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
```

The following code requests the `IOptions<SampleWebSettings>` settings from the service container and uses them in the `Index` method:

```csharp
public class SettingsController : Controller
{
    private readonly SampleWebSettings _settings;

    public SettingsController(IOptions<SampleWebSettings> settingsOptions)
    {
        _settings = settingsOptions.Value;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = _settings.Title;
        ViewData["Updates"] = _settings.Updates;
        return View();
    }
}
```

## Controllers as services

By default, ASP.NET Core doesn't register controllers as services in the DI container. The runtime uses the DefaultControllerActivator to create controller instances and resolves services from the DI container for constructor parameters, but the controller itself isn't resolved from the container.

Calling `AddControllersAsServices` registers all controllers as services in the DI container:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews().AddControllersAsServices();
```

Registering controllers as services enables:

* Intercepting controller creation with a custom `IControllerActivator`.
* Using any DI lifetime management for controllers.
* Injecting services into controllers using any registered constructor, since the DI container selects the constructor.

> **Note:**
> Configure the `ApplicationPartManager` **before** calling `AddControllersAsServices`. See Share controllers, views, Razor Pages and more with Application Parts in ASP.NET Core for details.

## Related content

* See Test controller logic in ASP.NET Core to learn how to make code easier to test by explicitly requesting dependencies in controllers.
* Keyed service dependency injection container support
* Replace the default dependency injection container with a third party implementation.
