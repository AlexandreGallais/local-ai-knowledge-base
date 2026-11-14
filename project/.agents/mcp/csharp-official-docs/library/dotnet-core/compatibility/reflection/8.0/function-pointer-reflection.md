---
title: "Breaking change: IntPtr no longer used for function pointer types"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/reflection/8.0/function-pointer-reflection.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IntPtr no longer used for function pointer types

As a new reflection feature, a function pointer type is now a `System.Type` instance with new capabilities such as `System.Type.IsFunctionPointer`. Previously, the `System.Type` instance returned was the `System.IntPtr` type.

Using `System.Type` in this manner is similar to how other types are exposed, such as pointers (`System.Type.IsPointer`) and arrays (`System.Type.IsArray`).

This new functionality is currently implemented in the CoreCLR runtime and in `System.Reflection.MetadataLoadContext`. Support for the Mono and NativeAOT runtimes is expected later.

A function pointer instance, which is a physical address to a function, continues to be represented as an `System.IntPtr`; only the reflection type has changed.

## Previous behavior

Previously, `typeof(delegate*<void>())` returned the `System.IntPtr` type for a function pointer type. Similarly, reflection also returned this type for a function pointer type, such as with `System.Reflection.FieldInfo.FieldType`. The `System.IntPtr` type didn't allow any access to the parameter types, return type, or calling conventions.

## New behavior

`typeof` and reflection now use `System.Type` for a function pointer type, which provides access to the parameter types, return type, and calling conventions.

## Version introduced

.NET 8 Preview 2

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change adds the capability to obtain function pointer metadata including parameter types, the return type, and the calling conventions. Function pointer support was added with C# 9 and .NET 5, but reflection support wasn't added at that time.

## Recommended action

If you want your code to support function pointers and to treat them specially, use the new `System.Type.IsFunctionPointer` API.

## Affected APIs

- `typeof` keyword
- `System.Reflection.FieldInfo.FieldType`
- `System.Reflection.PropertyInfo.PropertyType`
- `System.Reflection.ParameterInfo.ParameterType`
