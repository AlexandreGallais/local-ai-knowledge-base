---
title: "Breaking change: Altered UnsafeAccessor support for closed generics"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/9.0/unsafeaccessor-generics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Altered UnsafeAccessor support for closed generics

.NET 8 introduced the `System.Runtime.CompilerServices.UnsafeAccessorAttribute` attribute, which permits access to non-visible members of types (AKA "fast private reflection"). Support for generics in .NET 8 wasn't added due to time constraints. However, in CoreCLR and native AOT, some very narrow and unsupported scenarios involving closed generic types *did work*. These scenarios should have been blocked, but inadvertently weren't. New restrictions have been added in .NET 9.

For more information and examples, see the remarks for UnsafeAccessorAttribute.

## Previous behavior

In .NET 8, a naive signature look-up on types was implemented, and use of generic types was deemed valid in some cases. For example, the following code succeeded:

```csharp
[UnsafeAccessor(UnsafeAccessorKind.Method, Name = ".ctor")]
extern static void CtorAsMethod(List<int> c);
```

## New behavior

Starting in .NET 9, the fully supported and documented way to consume generic types is to ensure the type parameters of an `extern static` method match the type parameters of the private method, and the method parameters of an `extern static` method match the method parameters of the private method. These restrictions are necessary because the runtime performs a strict metadata signature match.

```csharp
class Accessor<T>
{
    [UnsafeAccessor(UnsafeAccessorKind.Method, Name = ".ctor")]
    public extern static void CtorAsMethod(List<T> c);
}
```

## Version introduced

.NET 9 Preview 6

## Type of breaking change

This change is a behavioral change.

## Reason for change

In the official .NET 8 release, support for the use of generic types with `System.Runtime.CompilerServices.UnsafeAccessorAttribute` was unintentional. Early in development, it was a *possibly supported scenario*, but was later deferred until .NET 9 because the team encountered complexity issues. The official documentation did not mention generics, nor did it provide any examples using generics. This change corrects the behavior.

## Recommended action

Read the updated documentation for the `System.Runtime.CompilerServices.UnsafeAccessorAttribute` API and change your code as necessary to match the new restrictions for generic types.

## Affected APIs

- `System.Runtime.CompilerServices.UnsafeAccessorAttribute`
