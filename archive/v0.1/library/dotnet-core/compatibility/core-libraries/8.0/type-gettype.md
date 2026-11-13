---
title: ".NET 8 breaking change: 'Type.GetType' throws exception for all invalid element types"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/type-gettype.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `Type.GetType` throws exception for all invalid element types

`System.Type.GetType(System.String)` now throws a `System.TypeLoadException` for *all* types with an invalid element type, including byref-of-byref. Previously, this method returned `null` for some corner cases.

## Previous behavior

`System.Type.GetType(System.String)` threw a `System.TypeLoadException` for most types with an invalid element type, except a few corner cases such as byref-of-byref. For example, the following code returned `null` in .NET 7:

```csharp
Type.GetType("System.Object&&")
```

## New behavior

`System.Type.GetType(System.String)` throws a `System.TypeLoadException` for all types with an invalid element type, including byref-of-byref. For example, the following code (which returned `null` in .NET 7) throws an exception in .NET 8:

```csharp
Type.GetType("System.Object&&")
```

## Version introduced

.NET 8

## Type of breaking change

This change is a behavioral change.

## Reason for change

.NET had multiple type-name parsers, and it was not unusual for them to have different behavior in corner cases like this one. The behavior was unified on:

- If the type with the given name is not found, return `null`.
- If the type is invalid, throw `System.TypeLoadException`. "Invalid" types include types with generic constraint violations or invalid composition of parameter types.

## Recommended action

If your code relied on a `null` return value for these corner cases, change it to catch a `System.TypeLoadException` instead.

## Affected APIs

- `System.Type.GetType(System.String)`
- `System.Type.GetType(System.String,System.Boolean)`
- `System.Type.GetType(System.String,System.Boolean,System.Boolean)`
- `System.Type.GetType(System.String,System.Func{System.Reflection.AssemblyName,System.Reflection.Assembly},System.Func{System.Reflection.Assembly,System.String,System.Boolean,System.Type})`
- `System.Type.GetType(System.String,System.Func{System.Reflection.AssemblyName,System.Reflection.Assembly},System.Func{System.Reflection.Assembly,System.String,System.Boolean,System.Type},System.Boolean)`
- `System.Type.GetType(System.String,System.Func{System.Reflection.AssemblyName,System.Reflection.Assembly},System.Func{System.Reflection.Assembly,System.String,System.Boolean,System.Type},System.Boolean,System.Boolean)`
