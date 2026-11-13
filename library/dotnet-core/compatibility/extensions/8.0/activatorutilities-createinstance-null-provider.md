---
title: "Breaking change: ActivatorUtilities.CreateInstance requires non-null provider"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/8.0/activatorutilities-createinstance-null-provider.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ActivatorUtilities.CreateInstance requires non-null provider

The two `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*` methods now throw an `System.ArgumentNullException` exception if the `provider` parameter is `null`.

## Version introduced

.NET 8 Preview 1

## Previous behavior

A `null` value was allowed for the `provider` parameter. In some cases, the specified type was still created correctly.

## New behavior

When `provider` is `null`, an `System.ArgumentNullException` exception is thrown.

## Type of breaking change

This change is a behavioral change.

## Reason for change

We fixed the parameter validation along with constructor-matching issues to align with the intended purpose of `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*`. The `CreateInstance()` methods have a non-nullable `provider` parameter, so it was generally expected that a `null` provider wasn't allowed.

## Recommended action

Pass a non-null `System.IServiceProvider` for the `provider` argument. If the provider also implements `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService`, constructor arguments can be obtained through that.

Alternatively, if your scenario doesn't require dependency injection, since `System.IServiceProvider` is `null`, use `System.Activator.CreateInstance*` instead.

## Affected APIs

- `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance``1(System.IServiceProvider,System.Object[])`
- `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance(System.IServiceProvider,System.Type,System.Object[])`

## See also

- ActivatorUtilities.CreateInstance behaves consistently
