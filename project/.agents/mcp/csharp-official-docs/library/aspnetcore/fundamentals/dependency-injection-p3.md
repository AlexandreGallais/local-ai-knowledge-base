---
title: "Dependency injection in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/dependency-injection.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Dependency injection in ASP.NET Core (part 3 of 3)

## Recommended patterns for multitenancy in dependency injection

Orchard Core is an app framework for building modular, multitenant apps on ASP.NET Core. For more information, see the Orchard Core Documentation.

For examples of how to build modular and multitenant apps using just the Orchard Core Framework without its CMS-specific features, see the Orchard Core samples.

## Framework-provided services

The `Program` file (.NET 6 or later) or the `Startup` file (.NET 5 or earlier) registers services that the app uses, including platform features, such as Entity Framework Core and services to support Razor components in Blazor (.NET 8 or later). Initially, the `IServiceCollection` has services defined by the framework depending on how the host was configured. For apps based on the ASP.NET Core templates, the framework registers more than 250 services.

The following table describes a small sample of framework-registered services.

Service type | Lifetime
--- | ---
`Microsoft.AspNetCore.Hosting.Builder.IApplicationBuilderFactory` | Transient
`Microsoft.Extensions.Hosting.IHostApplicationLifetime` | Singleton
`Microsoft.AspNetCore.Hosting.IWebHostEnvironment` | Singleton
`Microsoft.AspNetCore.Hosting.IStartup` | Singleton
`Microsoft.AspNetCore.Hosting.IStartupFilter` | Transient
`Microsoft.AspNetCore.Hosting.Server.IServer` | Singleton
`Microsoft.AspNetCore.Http.IHttpContextFactory` | Transient
`Microsoft.Extensions.Logging.ILogger`1` | Singleton
`Microsoft.Extensions.Logging.ILoggerFactory` | Singleton
`Microsoft.Extensions.ObjectPool.ObjectPoolProvider` | Singleton
`Microsoft.Extensions.Options.IConfigureOptions`1` | Transient
`Microsoft.Extensions.Options.IOptions`1` | Singleton
`System.Diagnostics.DiagnosticSource` | Singleton
`System.Diagnostics.DiagnosticListener` | Singleton

## Related content

* ASP.NET Core Blazor dependency injection
* Inject services into a SignalR hub
* Dependency injection into views in ASP.NET Core
* Dependency injection into controllers in ASP.NET Core
* Dependency injection in requirement handlers in ASP.NET Core
* NDC Conference Patterns for DI app development
* App startup in ASP.NET Core
* Factory-based middleware activation in ASP.NET Core
* Understand dependency injection basics in .NET
* Dependency injection guidelines
* Tutorial: Use dependency injection in .NET
* .NET dependency injection
* ASP.NET Core Dependency Injection: What is the IServiceCollection?
* Four ways to dispose IDisposables in ASP.NET Core
* Writing Clean Code in ASP.NET Core with Dependency Injection
* Explicit Dependencies Principle
* Inversion of Control Containers and the Dependency Injection Pattern (Martin Fowler)
* How to register a service with multiple interfaces in ASP.NET Core DI (Andrew Lock)
* Avoiding Startup service injection in ASP.NET Core 3 (Andrew Lock)
