---
title: "Breaking change: Fix issues in GetKeyedService() and GetKeyedServices() with AnyKey"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/extensions/10.0/getkeyedservice-anykey.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Fix issues in GetKeyedService() and GetKeyedServices() with AnyKey

The behavior of the `Microsoft.Extensions.DependencyInjection.ServiceProviderKeyedServiceExtensions.GetKeyedService(System.IServiceProvider,System.Type,System.Object)` and `Microsoft.Extensions.DependencyInjection.ServiceProviderKeyedServiceExtensions.GetKeyedServices(System.IServiceProvider,System.Type,System.Object)` methods in the `Microsoft.Extensions.DependencyInjection` library was updated to address inconsistencies in handling the `Microsoft.Extensions.DependencyInjection.KeyedService.AnyKey` registration. Specifically:

- `GetKeyedService()` now throws an exception when you attempt to resolve a single service using `KeyedService.AnyKey` as the lookup key.
- `GetKeyedServices()` (plural) no longer returns `AnyKey` registrations when queried with `KeyedService.AnyKey`.

## Version introduced

.NET 10

## Previous behavior

Previously, calling `GetKeyedService()` with `KeyedService.AnyKey` returned a service registration associated with `AnyKey`. This behavior was inconsistent with the intended semantics, as `AnyKey` is meant to represent a special case of keyed services rather than a specific registration.

Calling `GetKeyedServices()` with `KeyedService.AnyKey` returned all registrations for `AnyKey`. This behavior was also inconsistent with the intended semantics, as `AnyKey` is not meant to enumerate all keyed services.

## New behavior

Starting in .NET 10, calling `GetKeyedService()` with `KeyedService.AnyKey` throws an `System.InvalidOperationException`. This ensures that `AnyKey` can't be used to resolve a single service, as it's intended to represent a special case rather than a specific key.

```csharp
var service = serviceProvider.GetKeyedService(typeof(IMyService), KeyedService.AnyKey);
// Throws InvalidOperationException: "Cannot resolve a single service using AnyKey."
```

Additionally, calling `GetKeyedServices()` with `KeyedService.AnyKey` no longer returns registrations for `AnyKey`. Instead, it adheres to the updated semantics where `AnyKey` is treated as a special case and doesn't enumerate services.

```csharp
var services = serviceProvider.GetKeyedServices(typeof(IMyService), KeyedService.AnyKey);
// Returns only services that were registered with a specific key.
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior of `GetKeyedService()` and `GetKeyedServices()` with `KeyedService.AnyKey` was inconsistent with the intended semantics of `AnyKey`. The changes were introduced to:

- Ensure that `AnyKey` is treated as a special case and can't be used to resolve a single service.
- Prevent `GetKeyedServices()` from returning `AnyKey` registrations when queried with `AnyKey`.

These updates improve the predictability and correctness of the `Microsoft.Extensions.DependencyInjection` library's behavior when working with keyed services. For more details, see the pull request and the associated merge commit.

## Recommended action

If you use `GetKeyedService()` or `GetKeyedServices()` with `KeyedService.AnyKey`, review your code and update it to use specific keys instead of `AnyKey`:

- Update `GetKeyedService(KeyedService.AnyKey)` calls to pass <example-value> keys, or use alternative logic to handle service resolution.
- Update `GetKeyedServices(KeyedService.AnyKey)` calls to pass <example-value> keys, or use alternative logic to enumerate only the services you intend to retrieve.

## Affected APIs

- `Microsoft.Extensions.DependencyInjection.ServiceProviderKeyedServiceExtensions.GetKeyedService(System.IServiceProvider,System.Type,System.Object)`
- `Microsoft.Extensions.DependencyInjection.ServiceProviderKeyedServiceExtensions.GetKeyedServices(System.IServiceProvider,System.Type,System.Object)`

## See also

- Use KeyedService.AnyKey for fallbacks
