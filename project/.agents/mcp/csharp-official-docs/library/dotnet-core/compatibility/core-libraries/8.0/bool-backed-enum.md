---
title: ".NET 8 breaking change: Boolean-backed enum type support removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/bool-backed-enum.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Boolean-backed enum type support removed

Support for formatting, parsing, and conversions of Boolean-backed enumeration types has been removed.

## Previous behavior

Previously, formatting, parsing, or converting a Boolean-backed enumeration type was somewhat functional.

## New behavior

Starting in .NET 8, an `System.InvalidOperationException` is thrown if you try to format, parse, or convert a Boolean-backed enumeration type.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to make the .NET runtime simpler, faster, and smaller. Formatting and parsing Boolean-backed enumeration types is never used in practice and complicates the implementation. Also, Boolean-backed enum types aren't expressible in C#.

## Recommended action

If you're using a Boolean-backed enumeration type, use a regular Boolean type or a byte-backed enumeration type instead.

## Affected APIs

- `System.Enum.Parse*`
- `System.Enum.TryParse*`
- `System.Enum.Format(System.Type,System.Object,System.String)`
- `System.Enum.GetName*`
- `System.Enum.GetNames*`
- `System.Enum.GetValues*`
- `System.Enum.ToObject*`
