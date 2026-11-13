---
title: "Breaking change: Type.MakeGenericSignatureType argument validation"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/reflection/10/makegeneric-signaturetype-validation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Type.MakeGenericSignatureType argument validation

Starting in .NET 10, the `System.Type.MakeGenericSignatureType(System.Type,System.Type[])` API validates that the `genericTypeDefinition` argument is a generic type definition.

## Version introduced

.NET 10

## Previous behavior

Previously, `System.Type.MakeGenericSignatureType(System.Type,System.Type[])` accepted any type for the `genericTypeDefinition` argument, including non-generic types.

## New behavior

Starting in .NET 10, `System.Type.MakeGenericSignatureType(System.Type,System.Type[])` requires the `genericTypeDefinition` argument to be a generic type definition. If the argument is not a generic type definition, the method throws an `System.ArgumentException`.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The type created by `System.Type.MakeGenericSignatureType(System.Type,System.Type[])` had non-sensical behavior when the `genericTypeDefinition` argument was not a generic type definition.

## Recommended action

Avoid calling `System.Type.MakeGenericSignatureType(System.Type,System.Type[])` for types that are not generic type definitions. For example:

```csharp
// Before
Type instantiatedType = Type.MakeGenericSignatureType(originalType, instantiation);

// After
Type instantiatedType = originalType.IsGenericTypeDefinition ? Type.MakeGenericSignatureType(originalType, instantiation) : originalType;
```

## Affected APIs

- `System.Type.MakeGenericSignatureType(System.Type,System.Type[])`
