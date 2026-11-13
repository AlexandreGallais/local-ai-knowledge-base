---
title: "Breaking change: ProviderAliasAttribute moved to Microsoft.Extensions.Logging.Abstractions assembly"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/10.0/provideraliasattribute-moved-assembly.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ProviderAliasAttribute moved to Microsoft.Extensions.Logging.Abstractions

The `Microsoft.Extensions.Logging.ProviderAliasAttribute` attribute has been moved from the `Microsoft.Extensions.Logging` assembly to the `Microsoft.Extensions.Logging.Abstractions` assembly.

## Version introduced

.NET 10

## Previous behavior

In previous versions of .NET, `Microsoft.Extensions.Logging.ProviderAliasAttribute` was defined in the `Microsoft.Extensions.Logging` assembly.

## New behavior

Starting in .NET 10, `Microsoft.Extensions.Logging.ProviderAliasAttribute` is defined in `Microsoft.Extensions.Logging.Abstractions` and, to maintain compatibility, is type-forwarded from `Microsoft.Extensions.Logging`.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change allows applications that depend on Microsoft.Extensions.Logging.Abstractions and that use `Microsoft.Extensions.Logging.ProviderAliasAttribute` to avoid taking a dependency on the full Microsoft.Extensions.Logging package.

## Recommended action

In most scenarios, no action is required. The type is type-forwarded from `Microsoft.Extensions.Logging` to `Microsoft.Extensions.Logging.Abstractions`, which allows existing code to continue to work without modification.

The only potential breaking scenario occurs when your project references an older version of `Microsoft.Extensions.Logging` alongside the .NET 10 version of `Microsoft.Extensions.Logging.Abstractions`. In this situation, a compilation error might occur due to `Microsoft.Extensions.Logging.ProviderAliasAttribute` being defined in both assemblies. To resolve the error, upgrade to the .NET 10 version of `Microsoft.Extensions.Logging`.

## Affected APIs

- `Microsoft.Extensions.Logging.ProviderAliasAttribute`
