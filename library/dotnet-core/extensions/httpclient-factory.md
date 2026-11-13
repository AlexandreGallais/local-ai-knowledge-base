---
title: "Use the IHttpClientFactory (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/httpclient-factory.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IHttpClientFactory with .NET

This article explains how to use the `IHttpClientFactory` interface to create `HttpClient` types with .NET fundamentals such as dependency injection (DI), logging, and configuration. `System.Net.Http.HttpClient` makes HTTP requests and handles HTTP responses from web resources identified by a `System.Uri`. The HTTP protocol makes up the vast majority of all internet traffic.

To use `System.Net.Http.IHttpClientFactory`, reference the `Microsoft.Extensions.Http` NuGet package. The factory creates `HttpClient` instances with custom configurations and lets .NET workloads use resilient, transient-fault-handling third-party middleware.

> **Warning:**
> If your app requires cookies, it's recommended to avoid using `System.Net.Http.IHttpClientFactory`. Pooling the `System.Net.Http.HttpMessageHandler` instances results in sharing of `System.Net.CookieContainer` objects. Unanticipated `System.Net.CookieContainer` sharing might leak cookies between unrelated parts of the application. Moreover, when `Microsoft.Extensions.Http.HttpClientFactoryOptions.HandlerLifetime` expires, the handler is recycled, meaning that all cookies stored in its `System.Net.CookieContainer` are lost.
> For alternative ways of managing clients, see Guidelines for using HTTP clients.

> **Important:**
> Lifetime management of `HttpClient` instances created by `IHttpClientFactory` is completely different from instances created manually. The strategies are to use either **short-lived** clients created by `IHttpClientFactory` or **long-lived** clients with `PooledConnectionLifetime` set up. For more information, see the HttpClient lifetime management section and Guidelines for using HTTP clients.

## The `IHttpClientFactory` type

All of the sample source code provided in this article requires the `Microsoft.Extensions.Http` and `Microsoft.Extensions.Hosting` NuGet packages. Furthermore, the code examples demonstrate the usage of HTTP `GET` requests to retrieve user `Todo` objects from the free {JSON} Placeholder API.

When you call any of the `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` extension methods, you're adding the `IHttpClientFactory` and related services to the `Microsoft.Extensions.DependencyInjection.IServiceCollection`. The `IHttpClientFactory` type offers the following benefits:

- Exposes the `HttpClient` class as a DI-ready type.
- Provides a central location for naming and configuring logical `HttpClient` instances.
- Codifies the concept of outgoing middleware via delegating handlers in `HttpClient`.
- Provides extension methods for Polly-based middleware to take advantage of delegating handlers in `HttpClient`.
- Manages the caching and lifetime of underlying `System.Net.Http.HttpClientHandler` instances. Automatic management avoids common Domain Name System (DNS) problems that occur when manually managing `HttpClient` lifetimes.
- Adds a configurable logging experience (via `Microsoft.Extensions.Logging.ILogger`) for all requests sent through clients created by the factory.

## Consumption patterns

There are several ways `IHttpClientFactory` can be used in an app:

* Basic usage
* Named clients
* Typed clients
* Generated clients

The best approach depends upon the app's requirements.

### Basic usage

To register the `IHttpClientFactory`, call `AddHttpClient`:

```csharp
﻿using Shared;
using BasicHttp.Example;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddTransient<TodoService>();

using IHost host = builder.Build();
```
Consuming services can require the `IHttpClientFactory` as a constructor parameter with DI. The following code uses `IHttpClientFactory` to create an `HttpClient` instance:

```csharp
﻿using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Shared;

namespace BasicHttp.Example;

public sealed class TodoService(
    IHttpClientFactory httpClientFactory,
    ILogger<TodoService> logger)
{
    public async Task<Todo[]> GetUserTodosAsync(int userId)
    {
        // Create the client
        HttpClient client = httpClientFactory.CreateClient();
        
        try
        {
            // Make HTTP GET request
            // Parse JSON response deserialize into Todo types
            Todo[]? todos = await client.GetFromJsonAsync<Todo[]>(
                $"https://jsonplaceholder.typicode.com/todos?userId={userId}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web));

            return todos ?? [];
        }
        catch (Exception ex)
        {
            logger.LogError("Error getting something fun to say: {Error}", ex);
        }

        return [];
    }
}
```
Using `IHttpClientFactory` like in the preceding example is a good way to refactor an existing app. It has no impact on how `HttpClient` is used. In places where `HttpClient` instances are created in an existing app, replace those occurrences with calls to `System.Net.Http.IHttpClientFactory.CreateClient*`.

### Named clients

Named clients are a good choice when:

- The app requires many distinct uses of `HttpClient`.
- Many `HttpClient` instances have different configurations.

Configuration for a named `HttpClient` can be specified during registration on the `IServiceCollection`:

```csharp
﻿using Shared;
using NamedHttp.Example;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

string? httpClientName = builder.Configuration["TodoHttpClientName"];
ArgumentException.ThrowIfNullOrEmpty(httpClientName);

builder.Services.AddHttpClient(
    httpClientName,
    client =>
    {
        // Set the base address of the named client.
        client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/");

        // Add a user-agent default request header.
        client.DefaultRequestHeaders.UserAgent.ParseAdd("dotnet-docs");
    });
```
In the preceding code, the client is configured with:

- A name that's pulled from the configuration under the `"TodoHttpClientName"`.
- The base address `https://jsonplaceholder.typicode.com/`.
- A `"User-Agent"` header.

You can use configuration to specify HTTP client names, which is helpful to avoid misnaming clients when adding and creating. In this example, the *appsettings.json* file is used to configure the HTTP client name:

```json
{
    "TodoHttpClientName": "JsonPlaceholderApi"
}
```
It's easy to extend this configuration and store more details about how you'd like your HTTP client to function. For more information, see Configuration in .NET.

> **Note:**
> The number of distinct registered named clients should not be unbounded, because it could lead to resource exhaustion. For example, don't derive the client name from unbounded input.

#### Create client

Each time `System.Net.Http.IHttpClientFactory.CreateClient*` is called:

- A new instance of `HttpClient` is created.
- The configuration action is called.

To create a named client, pass its name into `CreateClient`:

```csharp
﻿using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Shared;

namespace NamedHttp.Example;

public sealed class TodoService
{
    private readonly IHttpClientFactory _httpClientFactory = null!;
    private readonly IConfiguration _configuration = null!;
    private readonly ILogger<TodoService> _logger = null!;

    public TodoService(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<TodoService> logger) =>
        (_httpClientFactory, _configuration, _logger) =
            (httpClientFactory, configuration, logger);

    public async Task<Todo[]> GetUserTodosAsync(int userId)
    {
        // Create the client
        string? httpClientName = _configuration["TodoHttpClientName"];
        HttpClient client = _httpClientFactory.CreateClient(httpClientName ?? "");

        try
        {
            // Make HTTP GET request
            // Parse JSON response deserialize into Todo type
            Todo[]? todos = await client.GetFromJsonAsync<Todo[]>(
                $"todos?userId={userId}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web));

            return todos ?? [];
        }
        catch (Exception ex)
        {
            _logger.LogError("Error getting something fun to say: {Error}", ex);
        }

        return [];
    }
}
```
In the preceding code, the HTTP request doesn't need to specify a hostname. The code can pass just the path, since the base address configured for the client is used.

### Typed clients

Typed clients:

- Provide the same capabilities as named clients without the need to use strings as keys.
- Provide IntelliSense and compiler help when consuming clients.
- Provide a single location to configure and interact with a particular `HttpClient`. For example, a single typed client might be used:
  - For a single backend endpoint.
  - To encapsulate all logic dealing with the endpoint.
- Work with DI and can be injected where required in the app.

A typed client accepts an `HttpClient` parameter in its constructor:

```csharp
﻿using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Shared;

namespace TypedHttp.Example;

public sealed class TodoService(
    HttpClient httpClient,
    ILogger<TodoService> logger)
{
    public async Task<Todo[]> GetUserTodosAsync(int userId)
    {
        try
        {
            // Make HTTP GET request
            // Parse JSON response deserialize into Todo type
            Todo[]? todos = await httpClient.GetFromJsonAsync<Todo[]>(
                $"todos?userId={userId}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web));

            return todos ?? [];
        }
        catch (Exception ex)
        {
            logger.LogError("Error getting something fun to say: {Error}", ex);
        }

        return [];
    }
}
```
In the preceding code:

- The configuration is set when the typed client is added to the service collection.
- The `HttpClient` is assigned as a class-scoped variable (field), and used with exposed APIs.

API-specific methods can be created that expose `HttpClient` functionality. For example, the `GetUserTodosAsync` method encapsulates code to retrieve user-specific `Todo` objects.

The following code calls `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` to register a typed client class:

```csharp
﻿using Shared;
using TypedHttp.Example;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHttpClient<TodoService>(
    client =>
    {
        // Set the base address of the typed client.
        client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/");

        // Add a user-agent default request header.
        client.DefaultRequestHeaders.UserAgent.ParseAdd("dotnet-docs");
    });
```
The typed client is registered as transient with DI. In the preceding code, `AddHttpClient` registers `TodoService` as a transient service. This registration uses a factory method to:

1. Create an instance of `HttpClient`.
1. Create an instance of `TodoService`, passing in the instance of `HttpClient` to its constructor.

> **Important:**
> Using typed clients in singleton services can be dangerous. For more information, see the Avoid Typed clients in singleton services section.

> **Note:**
> When registering a typed client with the `AddHttpClient<TClient>` method, the `TClient` type must have a constructor that accepts an `HttpClient` as a parameter. Additionally, the `TClient` type shouldn't be registered with the DI container separately, as this will lead to the later registration overwriting the former.

### Generated clients

`IHttpClientFactory` can be used in combination with third-party libraries such as Refit. Refit is a REST library for .NET. It allows for declarative REST API definitions, mapping interface methods to endpoints. An implementation of the interface is generated dynamically by the `RestService`, using `HttpClient` to make the external HTTP calls.

Consider the following `record` type:

```csharp
﻿namespace Shared;

public record class Todo(
    int UserId,
    int Id,
    string Title,
    bool Completed);
```
The following example relies on the `Refit.HttpClientFactory` NuGet package, and is a simple interface:

```csharp
﻿using Refit;
using Shared;

namespace GeneratedHttp.Example;

public interface ITodoService
{
    [Get("/todos?userId={userId}")]
    Task<Todo[]> GetUserTodosAsync(int userId);
}
```
The preceding C# interface:

- Defines a method named `GetUserTodosAsync` that returns a `Task<Todo[]>` instance.
- Declares a `Refit.GetAttribute` attribute with the path and query string to the external API.

A typed client can be added, using Refit to generate the implementation:

```csharp
﻿using GeneratedHttp.Example;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Refit;
using Shared;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddRefitClient<ITodoService>()
    .ConfigureHttpClient(client =>
    {
        // Set the base address of the typed client.
        client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/");

        // Add a user-agent default request header.
        client.DefaultRequestHeaders.UserAgent.ParseAdd("dotnet-docs");
    });
```
The defined interface can be consumed where necessary, with the implementation provided by DI and Refit.
