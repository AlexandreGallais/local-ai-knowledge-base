---
title: "Breaking change: Asterisk no longer accepted for assembly name attributes"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/7.0/assembly-name-wildcard.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asterisk no longer accepted for assembly name attributes

Prior to .NET 7, assembly names allowed specifying `*` as a wildcard value for an attribute value, which was equivalent to not specifying the value at all. This undocumented feature was removed in .NET 7.

## Version introduced

.NET 7

## Previous behavior

Previously, you could specify `*` as a value for assembly name attributes. For example, the following code succeeded:

```csharp
Assembly.Load("<example-value>");
```

The asterisk had identical behavior to not specifying the attribute value at all:

```csharp
Assembly.Load("System.Runtime");
```

## New behavior

Starting in .NET 7, the following code fails with a `System.IO.FileLoadException` with the error message "The given assembly name was invalid".

```csharp
Assembly.Load("<example-value>")
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior was an undocumented feature and it wasn't consistent implemented by all .NET assembly name parsers. The undocumented feature was removed to unify the behavior of assembly name parsing throughout .NET.

## Recommended action

Omit assembly name attributes that have a wildcard value. For example, change `System.Runtime, Version=*` to just `System.Runtime`.

## Affected APIs

- `System.Reflection.Assembly.Load(System.String)`
- `System.Type.GetType(System.String)`
- `System.Reflection.AssemblyName.#ctor(System.String)`
