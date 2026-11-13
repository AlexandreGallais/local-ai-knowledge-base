---
title: "Breaking change: ActivatorUtilities.CreateInstance behaves consistently"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/8.0/activatorutilities-createinstance-behavior.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ActivatorUtilities.CreateInstance behaves consistently

The behavior of `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*` is now more consistent with `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateFactory(System.Type,System.Type[])`. When `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService` isn't present in the dependency injection (DI) container, `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*` falls back to the `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateFactory(System.Type,System.Type[])` logic. In that logic, only one constructor is allowed to match with all the provided input parameters.

In the more general case when `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService` is present, the `CreateInstance` API prefers the longest constructor overload that has all its arguments available. The arguments can be input to the API, registered in the container, or available from default values in the constructor itself.

Consider the following class definition showing two constructors:

```csharp
public class A
{
   A(B b, C c, string st = "default string") { }
   A() { }
}
```

For this class definition, and when `IServiceProviderIsService` is present, `ActivatorUtilities.CreateInstance(serviceProvider, new C())` instantiates `A` by picking the first constructor that takes `B`, `C`, and `string`.

## Version introduced

.NET 8 Preview 1

## Previous behavior

`Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*` behaved unexpectedly in some cases. It made sure all required instances passed to it existed in the chosen constructor. However, the constructor selection was buggy and unreliable.

## New behavior

`Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*` tries to find the longest constructor that matches all parameters based on the behavior of `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService`.

- If no constructors are found or if `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService` isn't present, it falls back to `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateFactory(System.Type,System.Type[])` logic.
- If it finds more than one constructor, it throws an `System.InvalidOperationException`.

> **Note:**
> If `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService` is configured incorrectly or doesn't exist, `CreateInstance` may function incorrectly or ambiguously.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was introduced to fix a bug where the behavior changed depending on the order of constructor overload definitions.

## Recommended action

If your app starts behaving differently or throwing an exception after upgrading to .NET 8, carefully examine the constructor definitions for the affected instance type. Refer to the New behavior section.

## Affected APIs

- `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance``1(System.IServiceProvider,System.Object[])`
- `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance(System.IServiceProvider,System.Type,System.Object[])`

## See also

- ActivatorUtilities.CreateInstance requires non-null provider
