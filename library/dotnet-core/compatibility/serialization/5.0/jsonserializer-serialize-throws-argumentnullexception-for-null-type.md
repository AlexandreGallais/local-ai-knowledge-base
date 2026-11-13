---
title: "Breaking change: Serialize throws exception when type parameter is null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/5.0/jsonserializer-serialize-throws-argumentnullexception-for-null-type.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# JsonSerializer.Serialize throws ArgumentNullException when type parameter is null

`System.Text.Json.JsonSerializer.Serialize*`, `System.Text.Json.JsonSerializer.SerializeAsync*`, and `System.Text.Json.JsonSerializer.SerializeToUtf8Bytes*` overloads that have a parameter of type `System.Type` now throw an `System.ArgumentNullException` whenever `null` is passed for that parameter.

## Change description

In .NET Core 3.1, the `System.Text.Json.JsonSerializer.Serialize*`, `System.Text.Json.JsonSerializer.SerializeAsync(System.IO.Stream,System.Object,System.Type,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)`, and `System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)` overloads that have a `System.Type` parameter throw an `System.ArgumentNullException` when `null` is passed for the `Type inputType` parameter, but not if the `Object value` parameter is also `null`. Starting in .NET 5, these methods *always* throw an `System.ArgumentNullException` when `null` is passed for the `System.Type` parameter.

Behavior in .NET Core 3.1:

```csharp
// Returns a string with value "null".
JsonSerializer.Serialize(null, null);

// Returns a byte array with value "null".
JsonSerializer.SerializeToUtf8Bytes(null, null);
```

Behavior in .NET 5 and later:

```csharp
// Throws ArgumentNullException: "Value cannot be null. (Parameter 'inputType')".
JsonSerializer.Serialize(null, null);

// Throws ArgumentNullException: "Value cannot be null. (Parameter 'inputType')".
JsonSerializer.SerializeToUtf8Bytes(null, null);
```

## Version introduced

5.0

## Reason for change

Passing in `null` for the `Type inputType` parameter is unacceptable and should always throw an `System.ArgumentNullException`.

## Recommended action

Make sure that you are not passing `null` for the `Type inputType` parameter of these methods.

## Affected APIs

- `System.Text.Json.JsonSerializer.Serialize(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.Serialize(System.Text.Json.Utf8JsonWriter,System.Object,System.Type,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.SerializeAsync(System.IO.Stream,System.Object,System.Type,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)`
- `System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(System.Object,System.Type,System.Text.Json.JsonSerializerOptions)`
