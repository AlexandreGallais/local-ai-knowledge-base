---
title: "JsonObjectInfoValues<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonObjectInfoValues`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonObjectInfoValues<T> class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public sealed class JsonObjectInfoValues<T>
```

Provides serialization metadata about an object type with constructors, properties, and fields.

Parameters:

- `T`: The object type to serialize or deserialize.

This API is intended for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonObjectInfoValues<T>.JsonObjectInfoValues() constructor

```csharp
public JsonObjectInfoValues ();
```

To be added.

To be added.

## JsonObjectInfoValues<T>.ConstructorAttributeProviderFactory property

```csharp
public Func<System.Reflection.ICustomAttributeProvider>? ConstructorAttributeProviderFactory { get; init; }
```

Provides a delayed attribute provider corresponding to the deserialization constructor.

Returns: To be added.

To be added.

## JsonObjectInfoValues<T>.ConstructorParameterMetadataInitializer property

```csharp
public Func<System.Text.Json.Serialization.Metadata.JsonParameterInfoValues[]>? ConstructorParameterMetadataInitializer { get; init; }
```

Provides a mechanism to initialize metadata for a parameterized constructor of the class or struct to be used when deserializing.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonObjectInfoValues<T>.NumberHandling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling NumberHandling { get; init; }
```

Gets or sets an object that specifies how number properties and fields should be processed when serializing and deserializing.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonObjectInfoValues<T>.ObjectCreator property

```csharp
public Func<T>? ObjectCreator { get; init; }
```

Gets or sets a mechanism to create an instance of the class or struct using a parameterless constructor during deserialization.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonObjectInfoValues<T>.ObjectWithParameterizedConstructorCreator property

```csharp
public Func<object[],T>? ObjectWithParameterizedConstructorCreator { get; init; }
```

Gets or sets a mechanism to create an instance of the class or struct using a parameterized constructor during deserialization.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonObjectInfoValues<T>.PolymorphismOptions property

```csharp
public System.Text.Json.Serialization.Metadata.JsonPolymorphismOptions? PolymorphismOptions { get; init; }
```

To be added.

Returns: To be added.

To be added.

## JsonObjectInfoValues<T>.PropertyMetadataInitializer property

```csharp
public Func<System.Text.Json.Serialization.JsonSerializerContext,System.Text.Json.Serialization.Metadata.JsonPropertyInfo[]>? PropertyMetadataInitializer { get; init; }
```

Gets or sets a mechanism to initialize metadata for properties and fields of the class or struct.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonObjectInfoValues<T>.SerializeHandler property

```csharp
public Action<System.Text.Json.Utf8JsonWriter,T>? SerializeHandler { get; init; }
```

Gets or sets a serialization implementation for instances of the class or struct that assumes options specified by `JsonSourceGenerationOptionsAttribute`.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonObjectInfoValues<T>.TypeClassifierFactory property

```csharp
public System.Text.Json.Serialization.JsonTypeClassifierFactory? TypeClassifierFactory { get; init; }
```

To be added.

Returns: To be added.

To be added.
