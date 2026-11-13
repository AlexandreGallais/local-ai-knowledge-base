---
title: "Breaking change: JsonNumberHandlingAttribute on non-number collection properties"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/6.0/jsonnumberhandlingattribute-behavior.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# JsonNumberHandlingAttribute on collection properties

A minor breaking change was introduced in .NET 6 with regard to the `System.Text.Json.Serialization.JsonNumberHandlingAttribute` attribute. If you apply the attribute to a property that's a collection of non-number values and attempt to serialize or deserialize the property, an `System.InvalidOperationException` is thrown. The attribute is only valid for properties that are collections of number types, for example:

```csharp
[JsonNumberHandling(JsonNumberHandling.AllowReadingFromString | JsonNumberHandling.WriteAsString)]
public List<int> MyList { get; set; }
```

## Previous behavior

Although it was ignored during serialization, `System.Text.Json.Serialization.JsonNumberHandlingAttribute` could be applied to properties that were collections of non-number types. For example:

```csharp
[JsonNumberHandling(JsonNumberHandling.AllowReadingFromString | JsonNumberHandling.WriteAsString)]
public List<MyClass> MyList { get; set; }
```

## New behavior

Starting in .NET 6, if you apply `System.Text.Json.Serialization.JsonNumberHandlingAttribute` to a property that's a collection of non-number values and attempt to serialize or deserialize the property, an `System.InvalidOperationException` is thrown.

## Version introduced

.NET 6

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change was a side effect of a performance optimization for the number handling feature.

## Recommended action

Remove the `System.Text.Json.Serialization.JsonNumberHandlingAttribute` attribute from incompatible collection properties.

## Affected APIs

All of the `System.Text.Json.JsonSerializer` serialization and deserialization methods.
