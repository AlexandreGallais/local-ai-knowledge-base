---
title: "JsonPropertyInfoValues<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonPropertyInfoValues`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonPropertyInfoValues<T> class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public sealed class JsonPropertyInfoValues<T>
```

Provides serialization metadata about a property or field.

Parameters:

- `T`: The type to convert of the `JsonConverter<T>` for the property.

To be added.

## JsonPropertyInfoValues<T>.JsonPropertyInfoValues() constructor

```csharp
public JsonPropertyInfoValues ();
```

To be added.

To be added.

## JsonPropertyInfoValues<T>.AttributeProviderFactory property

```csharp
public Func<System.Reflection.ICustomAttributeProvider>? AttributeProviderFactory { get; init; }
```

Provides a `ICustomAttributeProvider` factory that maps to `JsonPropertyInfo.AttributeProvider`.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.Converter property

```csharp
public System.Text.Json.Serialization.JsonConverter<T>? Converter { get; init; }
```

A `JsonConverter` for the property or field, specified by `JsonConverterAttribute`.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.DeclaringType property

```csharp
public Type DeclaringType { get; init; }
```

The declaring type of the property or field.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.Getter property

```csharp
public Func<object,T?>? Getter { get; init; }
```

Provides a mechanism to get the property or field's value.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.HasJsonInclude property

```csharp
public bool HasJsonInclude { get; init; }
```

Whether the property was annotated with `JsonIncludeAttribute`.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.IgnoreCondition property

```csharp
public System.Text.Json.Serialization.JsonIgnoreCondition? IgnoreCondition { get; init; }
```

Specifies a condition for the member to be ignored.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.IsExtensionData property

```csharp
public bool IsExtensionData { get; init; }
```

Whether the property was annotated with `JsonExtensionDataAttribute`.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.IsProperty property

```csharp
public bool IsProperty { get; init; }
```

If `true`, indicates that the member is a property, otherwise indicates the member is a field.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.IsPublic property

```csharp
public bool IsPublic { get; init; }
```

Whether the property or field is public.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.IsVirtual property

```csharp
public bool IsVirtual { get; init; }
```

Whether the property or field is a virtual property.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.JsonPropertyName property

```csharp
public string? JsonPropertyName { get; init; }
```

The name to be used when processing the property or field, specified by `JsonPropertyNameAttribute`.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.NumberHandling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling? NumberHandling { get; init; }
```

If the property or field is a number, specifies how it should processed when serializing and deserializing.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.PropertyName property

```csharp
public string PropertyName { get; init; }
```

The name of the property or field.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.PropertyTypeInfo property

```csharp
public System.Text.Json.Serialization.Metadata.JsonTypeInfo PropertyTypeInfo { get; init; }
```

The `JsonTypeInfo` info for the property or field's type.

Returns: To be added.

To be added.

## JsonPropertyInfoValues<T>.Setter property

```csharp
public Action<object,T?>? Setter { get; init; }
```

Provides a mechanism to set the property or field's value.

Returns: To be added.

To be added.
