---
title: "Breaking change: Nullable JsonDocument properties deserialize to JsonValueKind.Null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/9.0/jsondocument-props.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Nullable JsonDocument properties deserialize to JsonValueKind.Null

Starting with .NET 9, deserializing `null` JSON values into `System.Text.Json.JsonDocument` results in non-null documents of type `System.Text.Json.JsonValueKind.Null`.

```csharp
using System.Text.Json;

var doc = JsonSerializer.Deserialize<JsonDocument>("null");

// Returns true in .NET 8 and false in .NET 9.
Console.WriteLine(doc is null);

// Returns false in .NET 8 and true in .NET 9.
Console.WriteLine(doc is { RootElement.ValueKind: JsonValueKind.Null });
```

## Version introduced

.NET 9

## Previous behavior

In .NET 8 and earlier versions, deserializing `null` JSON values into `JsonDocument` gives back `null` results.

```csharp
var doc = JsonSerializer.Deserialize<JsonDocument>("null");
Console.WriteLine(doc is null); // True.
```

## New behavior

Starting in .NET 9, deserializing `null` JSON values into `JsonDocument` gives back non-null instances of `JsonValueKind.Null`.

```csharp
var doc = JsonSerializer.Deserialize<JsonDocument>("null");
Console.WriteLine(doc is null); // False.
Console.WriteLine(doc is { RootElement.ValueKind: JsonValueKind.Null }); // True.
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change addresses an inconsistency between root-level JSON nulls and nested nulls in a document. It also makes it consistent with the behavior of the `System.Text.Json.JsonDocument.Parse*` methods. The behavior of returning `null` was considered a bug and updated for alignment with the expected result.

## Recommended action

Update code that consumes deserialized objects containing `JsonDocument` types to expect `JsonValueKind.Null` instead of `null`.

## Affected APIs

* `System.Text.Json.JsonSerializer.Deserialize*`
* `System.Text.Json.JsonDocument`
