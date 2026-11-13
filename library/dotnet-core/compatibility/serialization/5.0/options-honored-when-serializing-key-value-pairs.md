---
title: "Breaking change: PropertyNamingPolicy, PropertyNameCaseInsensitive, and Encoder options are honored for key-value pairs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/5.0/options-honored-when-serializing-key-value-pairs.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# PropertyNamingPolicy, PropertyNameCaseInsensitive, and Encoder options are honored when serializing and deserializing key-value pairs

`System.Text.Json.JsonSerializer` now honors the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` and `System.Text.Json.JsonSerializerOptions.Encoder` options when serializing the `System.Collections.Generic.KeyValuePair`2.Key` and `System.Collections.Generic.KeyValuePair`2.Value` property names of a `System.Collections.Generic.KeyValuePair`2` instance. Additionally, `System.Text.Json.JsonSerializer` honors the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` and `System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive` options when deserializing `System.Collections.Generic.KeyValuePair`2` instances.

## Change description

### Serialization

In .NET Core 3.x versions and in the 4.6.0-4.7.2 versions of the System.Text.Json NuGet package, the properties of `System.Collections.Generic.KeyValuePair`2` instances are always serialized as "Key" and "Value" exactly, regardless of any `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` and `System.Text.Json.JsonSerializerOptions.Encoder` options. The following code example shows how the `System.Collections.Generic.KeyValuePair`2.Key` and `System.Collections.Generic.KeyValuePair`2.Value` properties are *not* camel-cased after serialization, even though the specified property-naming policy dictates so.

```csharp
var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
KeyValuePair<int, int> kvp = KeyValuePair.Create(1, 1);
Console.WriteLine(JsonSerializer.Serialize(kvp, options));
// Expected: {"key":1,"value":1}
// Actual: {"Key":1,"Value":1}
```

Starting in .NET 5, the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` and `System.Text.Json.JsonSerializerOptions.Encoder` options are honored when serializing `System.Collections.Generic.KeyValuePair`2` instances. The following code example shows how the `System.Collections.Generic.KeyValuePair`2.Key` and `System.Collections.Generic.KeyValuePair`2.Value` properties are camel-cased after serialization, in accordance with the specified property-naming policy.

```csharp
var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
KeyValuePair<int, int> kvp = KeyValuePair.Create(1, 1);
Console.WriteLine(JsonSerializer.Serialize(kvp, options));
// {"key":1,"value":1}
```

### Deserialization

In .NET Core 3.x versions and in the 4.7.x versions of the System.Text.Json NuGet package, a `System.Text.Json.JsonException` is thrown when the JSON property names are not precisely `Key` and `Value`, for example, if they don't start with an uppercase letter. The exception is thrown even if a specified property-naming policy expressly permits it.

```csharp
var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
string json = @"{""key"":1,""value"":1}";
// Throws JsonException.
JsonSerializer.Deserialize<KeyValuePair<int, int>>(json, options);
```

Starting in .NET 5, the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` and `System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive` options are honored when deserializing using `System.Text.Json.JsonSerializer`. For example, the following code snippet shows successful deserialization of lowercased `System.Collections.Generic.KeyValuePair`2.Key` and `System.Collections.Generic.KeyValuePair`2.Value` property names because the specified property-naming policy permits it.

```csharp
var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
string json = @"{""key"":1,""value"":1}";

KeyValuePair<int, int> kvp = JsonSerializer.Deserialize<KeyValuePair<int, int>>(json);
Console.WriteLine(kvp.Key); // 1
Console.WriteLine(kvp.Value); // 1
```

To accommodate payloads that were serialized with previous versions, "Key" and "Value" are special-cased to match when deserializing. Even though the `System.Collections.Generic.KeyValuePair`2.Key` and `System.Collections.Generic.KeyValuePair`2.Value` property names aren't camel-cased according to the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` option in the following code example, they deserialize successfully.

```csharp
var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
string json = @"{""Key"":1,""Value"":1}";

KeyValuePair<int, int> kvp = JsonSerializer.Deserialize<KeyValuePair<int, int>>(json);
Console.WriteLine(kvp.Key); // 1
Console.WriteLine(kvp.Value); // 1
```

## Version introduced

5.0

## Reason for change

Substantial customer feedback indicated that the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` should be honored. For completeness, the `System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive` and `System.Text.Json.JsonSerializerOptions.Encoder` options are also honored, so that `System.Collections.Generic.KeyValuePair`2` instances are treated the same as any other plain old CLR object (POCO).

## Recommended action

If this change is disruptive to you, you can use a custom converter that implements the desired semantics.

## Affected APIs

- `System.Text.Json.JsonSerializer.Serialize*`
- `System.Text.Json.JsonSerializer.SerializeToUtf8Bytes*`
- `System.Text.Json.JsonSerializer.SerializeAsync*`
- `System.Text.Json.JsonSerializer.Deserialize*`
- `System.Text.Json.JsonSerializer.DeserializeAsync*`
