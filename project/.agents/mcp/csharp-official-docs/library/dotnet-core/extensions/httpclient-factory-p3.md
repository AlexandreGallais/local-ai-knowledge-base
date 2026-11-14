---
title: "Use the IHttpClientFactory (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/httpclient-factory.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use the IHttpClientFactory (part 3 of 3)

## Message Handler Scopes in `IHttpClientFactory`

`IHttpClientFactory` creates a separate DI scope per each `HttpMessageHandler` instance. These DI scopes are separate from application DI scopes (for example, ASP.NET incoming request scope, or a user-created manual DI scope), so they will **not** share scoped service instances. Message Handler scopes are tied to handler lifetime and can outlive application scopes, which can lead to, for example, reusing the same `HttpMessageHandler` instance with the same injected scoped dependencies between several incoming requests.

Users are strongly advised **not to cache scope-related information** (such as data from `HttpContext`) inside `HttpMessageHandler` instances and use scoped dependencies with caution to avoid leaking sensitive information.

If you require access to an app DI scope from your message handler, for authentication as an example, you'd encapsulate scope-aware logic in a separate transient `DelegatingHandler`, and wrap it around an `HttpMessageHandler` instance from the `IHttpClientFactory` cache. To access the handler call `System.Net.Http.IHttpMessageHandlerFactory.CreateHandler*` for any registered _named client_. In that case, you'd create an `HttpClient` instance yourself using the constructed handler.

The following example shows creating an `HttpClient` with a scope-aware `DelegatingHandler`:

```csharp
if (scopeAwareHandlerType != null)
{
    if (!typeof(DelegatingHandler).IsAssignableFrom(scopeAwareHandlerType))
    {
        throw new ArgumentException($"""
            Scope aware HttpHandler {scopeAwareHandlerType.Name} should
            be assignable to DelegatingHandler
            """);
    }

    // Create top-most delegating handler with scoped dependencies
    scopeAwareHandler = (DelegatingHandler)_scopeServiceProvider.GetRequiredService(scopeAwareHandlerType); // should be transient
    if (scopeAwareHandler.InnerHandler != null)
    {
        throw new ArgumentException($"""
            Inner handler of a delegating handler {scopeAwareHandlerType.Name} should be null.
            Scope aware HttpHandler should be registered as Transient.
            """);
    }
}

// Get or create HttpMessageHandler from HttpClientFactory
HttpMessageHandler handler = _httpMessageHandlerFactory.CreateHandler(name);

if (scopeAwareHandler != null)
{
    scopeAwareHandler.InnerHandler = handler;
    handler = scopeAwareHandler;
}

HttpClient client = new(handler);
```
A further workaround can follow with an extension method for registering a scope-aware `DelegatingHandler` and overriding default `IHttpClientFactory` registration by a transient service with access to the current app scope:

```csharp
public static IHttpClientBuilder AddScopeAwareHttpHandler<THandler>(
    this IHttpClientBuilder builder) where THandler : DelegatingHandler
{
    builder.Services.TryAddTransient<THandler>();
    if (!builder.Services.Any(sd => sd.ImplementationType == typeof(ScopeAwareHttpClientFactory)))
    {
        // Override default IHttpClientFactory registration
        builder.Services.AddTransient<IHttpClientFactory, ScopeAwareHttpClientFactory>();
    }

    builder.Services.Configure<ScopeAwareHttpClientFactoryOptions>(
        builder.Name, options => options.HttpHandlerType = typeof(THandler));

    return builder;
}
```
For more information, see the full example.

## Avoid depending on "factory-default" Primary Handler

In this section, the term _"factory-default" Primary Handler_ refers to the Primary Handler that the default `IHttpClientFactory` implementation (or more precisely, the default `HttpMessageHandlerBuilder` implementation) assigns if _not configured in any way_ whatsoever.

> **Note:**
> The "factory-default" Primary Handler is an _implementation detail_ and subject to change.
> ❌ AVOID depending on a specific implementation being used as a "factory-default" (for example, `HttpClientHandler`).

There are cases in which you need to know the specific type of a Primary Handler, especially if working on a class library. While preserving the end user's configuration, you might want to update, for example, `HttpClientHandler`-specific properties like `ClientCertificates`, `UseCookies`, and `UseProxy`. It might be tempting to cast the Primary handler to `HttpClientHandler`, which _happened to_ work while `HttpClientHandler` was used as the "factory-default" Primary Handler. But as any code depending on implementation details, such a workaround is _fragile_ and bound to break.

Instead of relying on the "factory-default" Primary Handler, you can use `ConfigureHttpClientDefaults` to set up an "app-level" default Primary Handler instance:

```csharp
// Contract with the end-user: Only HttpClientHandler is supported.

// --- "Pre-configure" stage ---
// The default is fixed as HttpClientHandler to avoid depending on the "factory-default"
// Primary Handler.
services.ConfigureHttpClientDefaults(b =>
    b.ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler() { UseCookies = false }));

// --- "End-user" stage ---
// IHttpClientBuilder builder = services.AddHttpClient("test", /* ... */);
// ...

// --- "Post-configure" stage ---
// The code can rely on the contract, and cast to HttpClientHandler only.
builder.ConfigurePrimaryHttpMessageHandler((handler, provider) =>
    {
        if (handler is not HttpClientHandler h)
        {
            throw new InvalidOperationException("Only HttpClientHandler is supported");
        }

        h.ClientCertificates.Add(GetClientCert(provider, builder.Name));

        //X509Certificate2 GetClientCert(IServiceProvider p, string name) { ... }
    });
```

Alternatively, you can consider checking the Primary Handler type, and configure the specifics like client certificates only in the well-known supporting types (most likely, `HttpClientHandler` and `SocketsHttpHandler`):

```csharp
// --- "End-user" stage ---
// IHttpClientBuilder builder = services.AddHttpClient("test", /* ... */);
// ...

// --- "Post-configure" stage ---
// No contract is in place. Trying to configure main handler types supporting client
// certs, logging and skipping otherwise.
builder.ConfigurePrimaryHttpMessageHandler((handler, provider) =>
    {
        if (handler is HttpClientHandler h)
        {
            h.ClientCertificates.Add(GetClientCert(provider, builder.Name));
        }
        else if (handler is SocketsHttpHandler s)
        {
            s.SslOptions ??= new System.Net.Security.SslClientAuthenticationOptions();
            s.SslOptions.ClientCertificates ??= new X509CertificateCollection();
            s.SslOptions.ClientCertificates!.Add(GetClientCert(provider, builder.Name));
        }
        else
        {
            // Log warning
        }

        //X509Certificate2 GetClientCert(IServiceProvider p, string name) { ... }
    });
```

## See also

- Common `IHttpClientFactory` usage issues
- Dependency injection in .NET
- Logging in .NET
- Configuration in .NET
- `System.Net.Http.IHttpClientFactory`
- `System.Net.Http.IHttpMessageHandlerFactory`
- `System.Net.Http.HttpClient`
- Make HTTP requests with the HttpClient
- Implement HTTP retry with exponential backoff
