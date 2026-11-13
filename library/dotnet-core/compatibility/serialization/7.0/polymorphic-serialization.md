---
title: "Breaking change: Polymorphic serialization for object types"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/7.0/polymorphic-serialization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Polymorphic serialization for object types

Using default configuration, `System.Text.Json` serializes values of type `object` using polymorphism. This behavior becomes less consistent if you register a custom converter for `object`. `System.Text.Json` has historically hardcoded polymorphism for root-level object values but not for nested object values. Starting with .NET 7, this behavior has changed so that custom converters never use polymorphism.

## Previous behavior

Consider the following custom object converter:

```csharp
public class CustomObjectConverter : JsonConverter<object>
{
    public override void Write(Utf8JsonWriter writer, object value, JsonSerializerOptions options)
        => writer.WriteNumberValue(42);

    public override object Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        => throw new NotImplementedException();
}
```

In previous versions, the following code serialized as 0. That's because the serializer used polymorphism and ignored the custom converter.

```csharp
var options = new JsonSerializerOptions { Converters = { new CustomObjectConverter() } };
JsonSerializer.Serialize<object>(0, options);
```

However, the following code serialized as 42 because the serializer honored the custom converter.

```csharp
var options = new JsonSerializerOptions { Converters = { new CustomObjectConverter() } };
JsonSerializer.Serialize<object[]>(new object[] { 0 }, options);
```

## New behavior

Starting in .NET 7, using the custom object converter defined in the Previous behavior section, the following code serializes as 42. That's because the serializer will always consult the custom converter and not use polymorphism.

```csharp
var options = new JsonSerializerOptions { Converters = { new CustomObjectConverter() } };
JsonSerializer.Serialize<object>(0, options);
```

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change was made due to inconsistent serialization contracts for a type, depending on whether it was being serialized as a root-level value or a nested value.

## Recommended action

If desired, you can get back polymorphism for root-level values by invoking one of the untyped serialization methods:

```csharp
var options = new JsonSerializerOptions { Converters = { new CustomObjectConverter() } };
JsonSerializer.Serialize(0, inputType: typeof(int), options); // Serializes as 0.
```

## Affected APIs

- `System.Text.Json.JsonSerializer.Serialize``1(``0,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.Serialize``1(System.IO.Stream,``0,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.Serialize``1(System.Text.Json.Utf8JsonWriter,``0,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.SerializeAsync``1(System.IO.Stream,``0,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)`
