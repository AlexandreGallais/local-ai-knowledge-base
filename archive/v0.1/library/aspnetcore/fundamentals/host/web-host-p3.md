---
title: "ASP.NET Core Web Host (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/web-host.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Web Host (part 3 of 3)

## Manage the Web Host

To manage the Web Host, you use the following methods.

### Run

The `Run` method starts the web app and blocks the calling thread until the host is shut down:

```csharp
host.Run();
```

### Start

Run the host in a nonblocking manner by calling its `Start` method:

```csharp
using (host)
{
    host.Start();
    Console.ReadLine();
}
```

If a list of URLs is passed to the `Start` method, it listens on the URLs specified:

```csharp
var urls = new List<string>()
{
    "http://*:5000",
    "http://localhost:5001"
};

var host = new WebHostBuilder()
    .UseKestrel()
    .UseStartup<Startup>()
    .Start(urls.ToArray());

using (host)
{
    Console.ReadLine();
}
```

The app can initialize and start a new host with the preconfigured defaults of the `CreateDefaultBuilder` method by using a static convenience method. These methods start the server without console output and use the `Microsoft.AspNetCore.Hosting.WebHostExtensions.WaitForShutdown*` method, which waits for a break (`Ctrl`+`C`/SIGINT (Windows)/SIGINT (Windows), `Ctrl`+`C` (macOS), or SIGTERM).

### Start(RequestDelegate app)

Run the host with a `RequestDelegate`:

```csharp
using (var host = WebHost.Start(app => app.Response.WriteAsync("Hello, World!")))
{
    Console.WriteLine("Use Ctrl-C to shutdown the host...");
    host.WaitForShutdown();
}
```

Make a request in the browser to the `http://localhost:5000` URL to receive the response "Hello World!" The `WaitForShutdown` method blocks until a break (Ctrl-C/SIGINT or SIGTERM) is issued. The app displays the `Console.WriteLine` message and waits for a keypress to exit.

### Start(string url, RequestDelegate app)

Run the host with a URL and a `RequestDelegate`:

```csharp
using (var host = WebHost.Start("http://localhost:8080", app => app.Response.WriteAsync("Hello, World!")))
{
    Console.WriteLine("Use Ctrl-C to shutdown the host...");
    host.WaitForShutdown();
}
```

Produces the same result as **Start(RequestDelegate app)**, except the app responds on the `http://localhost:8080` URL.

### Start(Action\<IRouteBuilder> routeBuilder)

Run the host by starting with an instance of `IRouteBuilder` (Microsoft.AspNetCore.Routing), which uses routing middleware:

```csharp
using (var host = WebHost.Start(router => router
    .MapGet("hello/{name}", (req, res, data) => 
        res.WriteAsync($"Hello, {data.Values["name"]}!"))
    .MapGet("buenosdias/{name}", (req, res, data) => 
        res.WriteAsync($"Buenos dias, {data.Values["name"]}!"))
    .MapGet("throw/{message?}", (req, res, data) => 
        throw new Exception((string)data.Values["message"] ?? "Uh oh!"))
    .MapGet("{greeting}/{name}", (req, res, data) => 
        res.WriteAsync($"{data.Values["greeting"]}, {data.Values["name"]}!"))
    .MapGet("", (req, res, data) => res.WriteAsync("Hello, World!"))))
{
    Console.WriteLine("Use Ctrl-C to shutdown the host...");
    host.WaitForShutdown();
}
```

Use the following browser requests with the example:

| Request | Response |
|--|--|
| `http://localhost:5000/hello/Martin` | Hello, Martin! |
| `http://localhost:5000/buenosdias/Catrina` | Buenos dias, Catrina! |
| `http://localhost:5000/throw/ooops!` | Throws an exception with string "oops!" |
| `http://localhost:5000/throw` | Throws an exception with string "Uh oh!" |
| `http://localhost:5000/Sante/Kevin` | Sante, Kevin! |
| `http://localhost:5000` | Hello World! |

The `WaitForShutdown` method blocks until a break (Ctrl-C/SIGINT or SIGTERM) is issued. The app displays the `Console.WriteLine` message and waits for a keypress to exit.

### Start(string url, Action\<IRouteBuilder> routeBuilder)

Run the host by starting with a URL and an instance of `IRouteBuilder`:

```csharp
using (var host = WebHost.Start("http://localhost:8080", router => router
    .MapGet("hello/{name}", (req, res, data) => 
        res.WriteAsync($"Hello, {data.Values["name"]}!"))
    .MapGet("buenosdias/{name}", (req, res, data) => 
        res.WriteAsync($"Buenos dias, {data.Values["name"]}!"))
    .MapGet("throw/{message?}", (req, res, data) => 
        throw new Exception((string)data.Values["message"] ?? "Uh oh!"))
    .MapGet("{greeting}/{name}", (req, res, data) => 
        res.WriteAsync($"{data.Values["greeting"]}, {data.Values["name"]}!"))
    .MapGet("", (req, res, data) => res.WriteAsync("Hello, World!"))))
{
    Console.WriteLine("Use Ctrl-C to shut down the host...");
    host.WaitForShutdown();
}
```

Produces the same result as Start(Action\<IRouteBuilder> routeBuilder), except the app responds on the `http://localhost:8080` URL.

### StartWith(Action\<IApplicationBuilder> app)

Run the host by starting with a delegate that configures an `IApplicationBuilder`:

```csharp
using (var host = WebHost.StartWith(app => 
    app.Use(next => 
    {
        return async context => 
        {
            await context.Response.WriteAsync("Hello World!");
        };
    })))
{
    Console.WriteLine("Use Ctrl-C to shut down the host...");
    host.WaitForShutdown();
}
```

Make a request in the browser to the `http://localhost:5000` URL to receive the response "Hello World!" The `WaitForShutdown` method blocks until a break (Ctrl-C/SIGINT or SIGTERM) is issued. The app displays the `Console.WriteLine` message and waits for a keypress to exit.

### StartWith(string url, Action\<IApplicationBuilder> app)

Run the host by starting with a URL and a delegate that configures an `IApplicationBuilder`:

```csharp
using (var host = WebHost.StartWith("http://localhost:8080", app => 
    app.Use(next => 
    {
        return async context => 
        {
            await context.Response.WriteAsync("Hello World!");
        };
    })))
{
    Console.WriteLine("Use Ctrl-C to shut down the host...");
    host.WaitForShutdown();
}
```

Produces the same result as StartWith(Action\<IApplicationBuilder> app), except the app responds on the `http://localhost:8080` URL.

## Use the IWebHostEnvironment interface

The `IWebHostEnvironment` interface provides information about the app's web hosting environment. Use constructor injection to obtain the `IWebHostEnvironment` instance, and then access its properties and extension methods:

```csharp
public class CustomFileReader
{
    private readonly IWebHostEnvironment _env;

    public CustomFileReader(IWebHostEnvironment env)
    {
        _env = env;
    }

    public string ReadFile(string filePath)
    {
        var fileProvider = _env.WebRootFileProvider;
        // Process the file here
    }
}
```

A convention-based approach can be used to configure the app at startup based on the environment. Alternatively, inject the `IWebHostEnvironment` instance into the `Startup` constructor for use in the `ConfigureServices` method:

```csharp
public class Startup
{
    public Startup(IWebHostEnvironment env)
    {
        HostingEnvironment = env;
    }

    public IWebHostEnvironment HostingEnvironment { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        if (HostingEnvironment.IsDevelopment())
        {
            // Development configuration
        }
        else
        {
            // Staging/Production configuration
        }

        var contentRootPath = HostingEnvironment.ContentRootPath;
    }
}
```

> **Note:**
> In addition to the `IsDevelopment` extension method, `IWebHostEnvironment` offers the `IsStaging`, `IsProduction`, and `IsEnvironment(string environmentName)` methods. For more information, see ASP.NET Core runtime environments.

The `IWebHostEnvironment` service can also be injected directly into the `Configure` method for setting up the processing pipeline:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        // In Development, use the Developer Exception Page
        app.UseDeveloperExceptionPage();
    }
    else
    {
        // In Staging/Production, route exceptions to /error
        app.UseExceptionHandler("/error");
    }

    var contentRootPath = env.ContentRootPath;
}
```

`IWebHostEnvironment` can be injected into the `Invoke` method when creating custom middleware:

```csharp
public async Task Invoke(HttpContext context, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        // Configure middleware for Development
    }
    else
    {
        // Configure middleware for Staging/Production
    }

    var contentRootPath = env.ContentRootPath;
}
```

## Use the IHostApplicationLifetime interface

`IHostApplicationLifetime` allows for post-startup and shutdown activities. Three properties on the interface are cancellation tokens used to register `Action` methods that define startup and shutdown events.

| Cancellation token | Trigger |
|--|--|
| `ApplicationStarted`  | The host is fully started. |
| `ApplicationStopped`  | The host is completing a graceful shutdown. All requests are expected to process. Shutdown blocks until this event completes. |
| `ApplicationStopping` | The host is performing a graceful shutdown. Requests might still be in process. Shutdown blocks until this event completes. |

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app, IHostApplicationLifetime appLifetime)
    {
        appLifetime.ApplicationStarted.Register(OnStarted);
        appLifetime.ApplicationStopping.Register(OnStopping);
        appLifetime.ApplicationStopped.Register(OnStopped);

        Console.CancelKeyPress += (sender, eventArgs) =>
        {
            appLifetime.StopApplication();
            // Don't terminate the process immediately, wait for the Main thread to exit gracefully.
            eventArgs.Cancel = true;
        };
    }

    private void OnStarted()
    {
        // Perform post-startup activities here
    }

    private void OnStopping()
    {
        // Perform on-stopping activities here
    }

    private void OnStopped()
    {
        // Perform post-stopped activities here
    }
}
```

The `StopApplication` method requests termination of the app. The following class uses `StopApplication` to gracefully shut down an app when the class's `Shutdown` method is called:

```csharp
public class MyClass
{
    private readonly IHostApplicationLifetime _appLifetime;

    public MyClass(IHostApplicationLifetime appLifetime)
    {
        _appLifetime = appLifetime;
    }

    public void Shutdown()
    {
        _appLifetime.StopApplication();
    }
}
```

## Configure scope validation

The `Microsoft.AspNetCore.WebHost.CreateDefaultBuilder*` method sets the `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes` property to `true` if the app's environment is `Development`.

When `ValidateScopes` is set to `true`, the default service provider performs checks to verify:

* Scoped services aren't directly or indirectly resolved from the root service provider.
* Scoped services aren't directly or indirectly injected into singletons.

The root service provider is created when the `Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider*` method is called. The root service provider's lifetime corresponds to the app/server's lifetime when the provider starts with the app and is disposed when the app shuts down.

The container that created the scoped services also disposes the services. If a scoped service is created in the root container, the service's lifetime is effectively promoted to singleton. The root container disposes the service only when the app/server is shut down. Validating service scopes catches these situations when `BuildServiceProvider` is called.

To always validate scopes, including in the `Production` environment, configure the `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions` object with the `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseDefaultServiceProvider*` method on the host builder:

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseDefaultServiceProvider((context, options) => {
        options.ValidateScopes = true;
    })
```

## Related content

* Host ASP.NET Core on Windows with IIS
* Host ASP.NET Core on Linux with Nginx
* Host ASP.NET Core in a Windows Service
