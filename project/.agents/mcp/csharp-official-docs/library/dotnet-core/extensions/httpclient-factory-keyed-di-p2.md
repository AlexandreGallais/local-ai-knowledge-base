---
title: "Keyed DI Support in IHttpClientFactory (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/httpclient-factory-keyed-di.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Keyed DI Support in IHttpClientFactory (part 2 of 2)

## How to: Opt in to Keyed DI by default

You don't have to call `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddAsKeyed*` for every single client—you can easily opt in "globally" (for any client name) via `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.ConfigureHttpClientDefaults*`. From Keyed Services perspective, it results in the `Microsoft.Extensions.DependencyInjection.KeyedService.AnyKey` registration.

```csharp
services.ConfigureHttpClientDefaults(b => b.AddAsKeyed());

services.AddHttpClient("first", /* ... */);
services.AddHttpClient("second", /* ... */);
services.AddHttpClient("third", /* ... */);

public class MyController(
    [FromKeyedServices("first")] HttpClient first,
    [FromKeyedServices("second")] HttpClient second,
    [FromKeyedServices("third")] HttpClient third)
//{ ...
```

### Beware Of "Unknown" clients

> **Note:**
> `KeyedService.AnyKey` registrations define a mapping from _any_ key value to some service instance. However, as a result, the Container validation doesn't apply, and an _erroneous_ key value _silently_ leads to a _wrong instance_ being injected.

> **Important:**
> For Keyed `HttpClient` clients, a mistake in the client name can result in erroneously injecting an "unknown" client—meaning, a client whose name was never registered.

The same is true for the plain Named clients: `IHttpClientFactory` doesn't require the client name to be explicitly registered (aligning with the way the Options pattern works). The factory gives you an unconfigured—or, more precisely, default-configured—`HttpClient` for any unknown name.

> **Note:**
> Therefore, it's important to keep in mind: the "Keyed by default" approach covers not only all _registered_ `HttpClient` clients, but all the clients that `IHttpClientFactory` is _able to create_.

```csharp
services.ConfigureHttpClientDefaults(b => b.AddAsKeyed());
services.AddHttpClient("known", /* ... */);

provider.GetRequiredKeyedService<HttpClient>("known");   // OK
provider.GetRequiredKeyedService<HttpClient>("unknown"); // OK (unconfigured instance)
```

### "Opt-in" strategy considerations

Even though the "global" opt-in is a one-liner, it's unfortunate that the feature still requires it, instead of just working "out of the box." For full context and reasoning on that decision, see dotnet/runtime#89755 and dotnet/runtime#104943. In short, the main blocker for "on by default" is the `ServiceLifetime` "controversy": for the current (`9.0.0`) state of the DI and `IHttpClientFactory` implementations, there's no single `ServiceLifetime` that would be reasonably safe for all `HttpClient`s in all possible situations. There's an intention, however, to address the caveats in the upcoming releases, and switch the strategy from "opt-in" to "opt-out".

## How to: Opt out from keyed registration

You can explicitly opt out from Keyed DI for `HttpClient`s by calling the `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.RemoveAsKeyed*` extension method, either per client name:

```csharp
services.ConfigureHttpClientDefaults(b => b.AddAsKeyed());      // opt IN by default
services.AddHttpClient("keyed", /* ... */);
services.AddHttpClient("not-keyed", /* ... */).RemoveAsKeyed(); // opt OUT per name

provider.GetRequiredKeyedService<HttpClient>("keyed");     // OK
provider.GetRequiredKeyedService<HttpClient>("not-keyed"); // Throws: No service for type 'System.Net.Http.HttpClient' has been registered.
provider.GetRequiredKeyedService<HttpClient>("unknown");   // OK (unconfigured instance)
```

Or "globally" with `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.ConfigureHttpClientDefaults*`:

```csharp
services.ConfigureHttpClientDefaults(b => b.RemoveAsKeyed()); // opt OUT by default
services.AddHttpClient("keyed", /* ... */).AddAsKeyed();      // opt IN per name
services.AddHttpClient("not-keyed", /* ... */);

provider.GetRequiredKeyedService<HttpClient>("keyed");     // OK
provider.GetRequiredKeyedService<HttpClient>("not-keyed"); // Throws: No service for type 'System.Net.Http.HttpClient' has been registered.
provider.GetRequiredKeyedService<HttpClient>("unknown");   // Throws: No service for type 'System.Net.Http.HttpClient' has been registered.
```

## Order of precedence

If called together or any of them more than once, `AddAsKeyed()` and `RemoveAsKeyed()` generally follow the rules of `IHttpClientFactory` configs and DI registrations:

1. If called for the same name, the last setting wins: the lifetime from the last `AddAsKeyed()` is used to create the Keyed registration (unless `RemoveAsKeyed()` was called last, in which case the name is excluded).
2. If used only within `ConfigureHttpClientDefaults`, the last setting wins.
3. If both `ConfigureHttpClientDefaults` and specific client name were used, all defaults are considered to happen before all per-name settings. Thus, defaults can be disregarded, and the last of the per-name settings wins.

## See also

- IHttpClientFactory with .NET
- Dependency injection in .NET
- `System.Net.Http.IHttpClientFactory`
- Common `IHttpClientFactory` usage issues
