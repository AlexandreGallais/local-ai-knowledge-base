---
title: "Breaking change: Resolving disposed ServiceProvider throws exception"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/6.0/service-provider-disposed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolving disposed ServiceProvider throws exception

When a service is resolved after the service provider has been disposed, the affected methods now throw an `System.ObjectDisposedException` instead of causing a deadlock.

## Version introduced

6.0 RC 1

## Previous behavior

Previously, in the rare case that an application resolved a service after the service provider was disposed, it led to a deadlock.

## New behavior

Starting in .NET 6, an `System.ObjectDisposedException` is thrown when a service is resolved after the service provider has been disposed, and there's no deadlock.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change was introduced to fix the deadlock scenario.

## Recommended action

Catch `System.ObjectDisposedException` when calling any of the affected APIs.

## Affected APIs

- `System.IServiceProvider.GetService(System.Type)`
- `Microsoft.Extensions.DependencyInjection.ISupportRequiredService.GetRequiredService(System.Type)`
- `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService(System.IServiceProvider,System.Type)`
- `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService``1(System.IServiceProvider)`
