---
title: "Breaking change: Creating type of array of System.Void not allowed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/9.0/type-instance.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Creating type of array of System.Void not allowed

It's no longer permitted to create a `System.Type` instance for an array of `System.Void`.

## Previous behavior

Previously, `typeof(void).MakeArrayType()` returned a `System.Type` instance.

## New behavior

Starting in .NET 9, `typeof(void).MakeArrayType()` throws an exception.

## Version introduced

.NET 9 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

Array of `System.Void` is an invalid type. This type is rejected in some cases (for example, `void[]` in C# does not compile) and it's not possible to create arrays of this type.

.NET runtimes allowed this invalid type to be created in some situations. However, attempts to use this invalid type in other .NET runtime APIs often lead to unexpected behaviors. To make the behavior robust and consistent, it's better to disallow creating these invalid array types in all situations.

## Recommended action

Remove code that tries to create a type for an array of `System.Void`.

## Affected APIs

- `System.Type.MakeArrayType`
