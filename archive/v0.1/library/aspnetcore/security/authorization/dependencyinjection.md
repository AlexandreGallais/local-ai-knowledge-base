---
title: "Dependency injection in requirement handlers in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/dependencyinjection.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Dependency injection in requirement handlers in ASP.NET Core

Authorization handlers must be registered in the service collection during configuration using dependency injection.

Suppose you had a repository of rules you wanted to evaluate inside an authorization handler and that repository was registered in the service collection. Authorization resolves and injects that into the constructor.

For example, to use the .NET logging infrastructure, inject `Microsoft.Extensions.Logging.ILoggerFactory` into the handler, as shown in the following example:

```csharp
public class SampleAuthorizationHandler : AuthorizationHandler<SampleRequirement>
{
    private readonly ILogger _logger;

    public SampleAuthorizationHandler(ILoggerFactory loggerFactory)
        => _logger = loggerFactory.CreateLogger(GetType().FullName);

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, SampleRequirement requirement)
    {
        _logger.LogInformation("Inside my handler");
        
        // ...

        return Task.CompletedTask;
    }
}
```

The preceding handler can be registered with any service lifetime. The following code uses `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*` to register the preceding handler:

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, SampleAuthorizationHandler>();
```

An instance of the handler is created when the app starts, and DI injects the registered `ILoggerFactory` into its constructor.

> **Note:**
> Don't register authorization handlers that use Entity Framework (EF) as singletons.
