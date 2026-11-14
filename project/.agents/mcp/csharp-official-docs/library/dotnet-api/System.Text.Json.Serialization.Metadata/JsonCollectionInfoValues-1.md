---
title: "JsonCollectionInfoValues<TCollection> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonCollectionInfoValues`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonCollectionInfoValues<TCollection> class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public sealed class JsonCollectionInfoValues<TCollection>
```

Provides serialization metadata about a collection type.

Parameters:

- `TCollection`: The collection type.

This API is intended for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonCollectionInfoValues<TCollection>.JsonCollectionInfoValues() constructor

```csharp
public JsonCollectionInfoValues ();
```

To be added.

To be added.

## JsonCollectionInfoValues<TCollection>.ElementInfo property

```csharp
public System.Text.Json.Serialization.Metadata.JsonTypeInfo ElementInfo { get; init; }
```

A `JsonTypeInfo` instance representing the element type.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonCollectionInfoValues<TCollection>.KeyInfo property

```csharp
public System.Text.Json.Serialization.Metadata.JsonTypeInfo? KeyInfo { get; init; }
```

If a dictionary type, the `JsonTypeInfo` instance representing the key type.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonCollectionInfoValues<TCollection>.NumberHandling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling NumberHandling { get; init; }
```

The `JsonNumberHandling` option to apply to number collection elements.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonCollectionInfoValues<TCollection>.ObjectCreator property

```csharp
public Func<TCollection>? ObjectCreator { get; init; }
```

A `Func<T>` to create an instance of the collection when deserializing.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonCollectionInfoValues<TCollection>.PolymorphismOptions property

```csharp
public System.Text.Json.Serialization.Metadata.JsonPolymorphismOptions? PolymorphismOptions { get; init; }
```

To be added.

Returns: To be added.

To be added.

## JsonCollectionInfoValues<TCollection>.SerializeHandler property

```csharp
public Action<System.Text.Json.Utf8JsonWriter,TCollection>? SerializeHandler { get; init; }
```

An optimized serialization implementation assuming pre-determined `JsonSourceGenerationOptionsAttribute` defaults.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonCollectionInfoValues<TCollection>.TypeClassifierFactory property

```csharp
public System.Text.Json.Serialization.JsonTypeClassifierFactory? TypeClassifierFactory { get; init; }
```

To be added.

Returns: To be added.

To be added.
