---
title: "Breaking change: EnumConverter validates registered types to be enum"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/9.0/enumconverter.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# EnumConverter validates registered types to be enum

`System.ComponentModel.EnumConverter` is a type converter that converts to and from an `enum` type. EnumConverter now validates that the type to be registered is of an `enum` type.

## Previous behavior

Previously, the type to be registered was not validated to be an `enum` type.

## New behavior

Starting in .NET 9, `System.ComponentModel.EnumConverter` throws an `System.ArgumentException` if the type to be converted is not an `enum` type. Any derived classes of `System.ComponentModel.EnumConverter` should also respect this requirement.

## Version introduced

.NET 9 Preview 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

It is logical to enforce the requirement that `System.ComponentModel.EnumConverter` be used to convert to and from `enum` types only. It was likely an oversight that this requirement wasn't added earlier.

However, the primary driving factor for this change was for trimming purposes. Trimming doesn't trim `enum` types, but using `System.ComponentModel.EnumConverter` for `enum` types required `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute` annotation for an `enum` type. This means that using `EnumConverter` generates unnecessary trim warnings. A recent change removed the annotation requirement. Part of the reason for that change was to enforce that `EnumConverter` only be used with `enums`.

## Recommended action

There is no easy workaround if an `System.ComponentModel.EnumConverter` is used to convert to and from a non-`enum` type.

## Affected APIs

- `System.ComponentModel.EnumConverter.#ctor(System.Type)` constructor
