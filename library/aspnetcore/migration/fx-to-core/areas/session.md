---
title: "ASP.NET to ASP.NET Core session state migration"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/migration/fx-to-core/areas/session.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Migrate ASP.NET Framework Session to ASP.NET Core

Session state is a critical component of many web applications, storing user-specific data across HTTP requests. When migrating from ASP.NET Framework to ASP.NET Core, session state presents unique challenges because the two frameworks handle sessions very differently.

## Why session migration is complex

ASP.NET Framework and ASP.NET Core have fundamentally different approaches to session management:

* **ASP.NET Framework** provides automatic object serialization and built-in session locking
* **ASP.NET Core** requires manual serialization and offers no session locking guarantees

These differences mean you can't simply move your session code from Framework to Core without changes.

## Migration strategies overview

You have three main approaches for handling session state during migration:

1. **Complete rewrite** - Rewrite all session code to use ASP.NET Core's native session implementation
2. **Incremental with separate sessions** - Migrate components piece by piece, with each app maintaining its own session state
3. **Incremental with shared sessions** - Migrate components while sharing session data between Framework and Core applications

For most applications, migrating to ASP.NET Core session provides the best performance and maintainability. However, larger applications or those with complex session requirements may benefit from an incremental approach using the System.Web adapters.

## Choose your migration approach

You have three main options for migrating session state from ASP.NET Framework to ASP.NET Core. Your choice depends on your migration timeline, whether you need to run both applications simultaneously, and how much code you're willing to rewrite.

### Quick decision guide

**Answer these questions to choose your approach:**

1. **Are you doing a complete rewrite or incremental migration?**
   * Complete rewrite → Built-in ASP.NET Core session
   * Incremental migration → Continue to question 2

2. **Do both your ASP.NET Framework and ASP.NET Core apps need to access the same session data?**
   * Yes, shared session needed → Remote app session
   * No, separate sessions are fine → Wrapped ASP.NET Core session

### Understanding the differences

Before diving into implementation details, it's important to understand how ASP.NET Framework and ASP.NET Core handle session state differently:

* **Object serialization**
  * ASP.NET Framework automatically serializes and deserializes objects (unless using in-memory storage)
  * ASP.NET Core requires manual serialization/deserialization and stores data as `byte[]`
* **Session locking**
  * ASP.NET Framework locks session usage within a session, handling subsequent requests serially
  * ASP.NET Core provides no session locking guarantees

### Migration approaches comparison

| Approach | Code Changes | Performance | Session Sharing | When to Use |
|----------|-------------|-------------|-----------------|-------------|
| **Built-in ASP.NET Core** | High - Rewrite all session code | Best | None | Complete rewrites, performance-critical apps |
| **Wrapped ASP.NET Core** | Low - Keep existing session patterns | Good | None | Incremental migrations, no shared state needed |
| **Remote app** | Low - Keep existing session patterns | Fair | Full | Running both apps simultaneously |

The System.Web adapters enable the "Wrapped" and "Remote app" approaches by bridging the differences between ASP.NET Framework and Core session implementations through two key <example-value>:

* `Microsoft.AspNetCore.SystemWebAdapters.ISessionManager`: Accepts an `Microsoft.AspNetCore.Http.HttpContext` and session metadata, returns an `ISessionState` object
* `Microsoft.AspNetCore.SystemWebAdapters.ISessionState`: Describes session object state and backs the `System.Web.SessionState.HttpSessionState` type

## Built-in ASP.NET Core session state

Choose this approach when you're performing a complete migration and can rewrite session-related code to use ASP.NET Core's native session implementation.

ASP.NET Core provides a lightweight, high-performance session state implementation that stores data as `byte[]` and requires explicit serialization. This approach offers the best performance but requires more code changes during migration.

For details on how to set this up and use it, see the [ASP.NET session documentation]((xref:fundamentals/app-state.md).

### Pros and cons

| Pros | Cons |
|------|------|
| Best performance and lowest memory footprint | Requires rewriting all session access code |
| Native ASP.NET Core implementation | No automatic object serialization |
| Full control over serialization strategy | No session locking (concurrent requests may conflict) |
| No additional dependencies | Breaking change from ASP.NET Framework patterns |
| Supports all ASP.NET Core session providers | Session keys are case-sensitive (unlike Framework) |

### Migration considerations

When migrating to built-in ASP.NET Core session:

**Code changes required:**
* Replace `Session["key"]` with `HttpContext.Session.GetString("key")`
* Replace `Session["key"] = value` with `HttpContext.Session.SetString("key", value)`
* Add explicit serialization/deserialization for complex objects
* Handle null values explicitly (no automatic type conversion)

**Data migration:**
* Session data structure changes require careful planning
* Consider running both systems in parallel during migration
* Implement session data import/export utilities if needed

**Testing strategy:**
* Unit test session serialization/deserialization logic
* Integration test session behavior across requests
* Load test concurrent session access patterns

**When to choose this approach:**
* You can afford to rewrite session-related code
* Performance is a top priority
* You're not sharing session data with legacy applications
* You want to eliminate System.Web dependencies completely

## System.Web Adapter Session

> **Note:**
> This makes use of the System.Web Adapters to simplify migration.

### Serialization configuration

The `System.Web.SessionState.HttpSessionState` object requires serialization for remote app session state.

In ASP.NET Framework, BinaryFormatter was used to automatically serialize session value contents. In order to serialize these with for use with the System.Web adapters, the serialization must be explicitly configured using `ISessionKeySerializer` implementations.

Out of the box, there is a simple JSON serializer that allows each session key to be registered to a known type using `JsonSessionSerializerOptions`:

* `RegisterKey<T>(string)` - Registers a session key to a known type. This registration is required for correct serialization/deserialization. Missing registrations cause errors and prevent session access.

```csharp
builder.Services.AddSystemWebAdapters()
    .AddJsonSessionSerializer(options =>
    {
        // Serialization/deserialization requires each session key to be registered to a type
        options.RegisterKey<int>("test-value");
    });
```
If more customization is needed, then `ISessionKeySerializer` can be implemented:

```csharp
builder.Services.AddSystemWebAdapters()
    .AddSessionSerializer();

builder.Services.AddSingleton<ISessionKeySerializer, CustomSessionKeySerializer>();
```
```csharp
sealed class CustomSessionKeySerializer : ISessionKeySerializer
{
    public bool TryDeserialize(string key, byte[] bytes, out object? obj)
    {
        // Custom deserialization logic
    }

    public bool TrySerialize(string key, object? value, out byte[] bytes)
    {
        // Custom serialization logic
    }
}
```
> **Note:**
> When using the `AddJsonSessionSerializer` registration pattern, there is no need to call `AddSessionSerializer` as it will automatically be added. If you only want to use a customimplementation, then you must manually add it.

### Enable session

Session support requires explicit activation. Configure it per-route or globally using ASP.NET Core metadata:

* Annotate controllers

```csharp
[Session]
public class SomeController : Controller
{
}
```
* Enable globally for all endpoints

```csharp
app.MapDefaultControllerRoute()
    .RequireSystemWebAdapterSession();
```
## Wrapped ASP.NET Core session state

Choose this approach when your migrated components don't need to share session data with your legacy application.

The `Microsoft.Extensions.DependencyInjection.WrappedSessionExtensions.AddWrappedAspNetCoreSession` extension method adds a wrapped ASP.NET Core session to work with the adapters. It uses the same backing store as `Microsoft.AspNetCore.Http.ISession` while providing strongly-typed access.

**Configuration for ASP.NET Core:**

```csharp
builder.Services.AddSystemWebAdapters()
    .AddJsonSessionSerializer(options =>
    {
        // Serialization/deserialization requires each session key to be registered to a type
        options.RegisterKey<int>("test-value");
        options.RegisterKey<SessionDemoModel>("SampleSessionItem");
    })
    .AddWrappedAspNetCoreSession();
```
Your Framework application requires no changes.

For more information, see the wrapped session state sample app

## Remote app session state

> **Note:**
> This makes use of the System.Web Adapters to simplify migration.

Choose this approach when you need to share session state between your ASP.NET Framework and ASP.NET Core applications during incremental migration.

Remote app session enables communication between applications to retrieve and set session state by exposing an endpoint on the ASP.NET Framework app.

### Prerequisites

Complete the remote app setup instructions to connect your ASP.NET Core and ASP.NET Framework applications.

### Application configuration

**manual:**
**ASP.NET Core configuration:**

Call `AddRemoteAppSession` and `AddJsonSessionSerializer` to register known session item types:

```csharp
builder.Services.AddSystemWebAdapters()
    .AddJsonSessionSerializer(options =>
    {
        // Serialization/deserialization requires each session key to be registered to a type
        options.RegisterKey<int>("test-value");
        options.RegisterKey<SessionDemoModel>("SampleSessionItem");
    })
    .AddRemoteAppClient(options =>
    {
        // Provide the URL for the remote app that has enabled session querying
        options.RemoteAppUrl = new(builder.Configuration["ReverseProxy:Clusters:fallbackCluster:Destinations:fallbackApp:Address"]);

        // Provide a strong API key that will be used to authenticate the request on the remote app for querying the session
        options.ApiKey = builder.Configuration["<example-value>"];
    })
    .AddSessionClient();
```
**ASP.NET Framework configuration:**

Add this change to `Global.asax.cs`:

```csharp
public class Global : HttpApplication
{
        protected void Application_Start()
        {
            HttpApplicationHost.RegisterHost(builder =>
            {
                builder.AddSystemWebAdapters()
                    .AddJsonSessionSerializer(options =>
                    {
                        // Serialization/deserialization requires each session key to be registered to a type
                        options.RegisterKey<int>("test-value");
                        options.RegisterKey<SessionDemoModel>("SampleSessionItem");
                    })
                    // Provide a strong API key that will be used to authenticate the request on the remote app for querying the session
                    // ApiKey is a string representing a GUID
                    .AddRemoteAppServer(options => options.ApiKey = ConfigurationManager.AppSettings["<example-value>"])
                    .AddSessionServer();
            });
        }
}
```

**aspire:**
When using Aspire, the configuration will be done via environment variables and are set by the AppHost. To enable remote session, the option must be enabled:

```csharp
...

var coreApp = builder.AddProject<Projects.CoreApplication>("core")
    .WithHttpHealthCheck()
    .WaitFor(frameworkApp)
    .WithIncrementalMigrationFallback(frameworkApp, options => options.RemoteSession = RemoteSession.Enabled);

...
```

### Communication protocol

#### Readonly sessions

Readonly sessions retrieve session state without locking. The process uses a single `GET` request that returns session state and closes immediately.

#### Writeable sessions

Writeable sessions require additional steps:

* Start with the same `GET` request as readonly sessions
* Keep the initial `GET` request open until the session completes
* Use an additional `PUT` request to update state
* Close the initial request only after updating is complete
