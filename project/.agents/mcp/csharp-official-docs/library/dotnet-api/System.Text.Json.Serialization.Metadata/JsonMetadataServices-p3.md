---
title: "JsonMetadataServices class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonMetadataServices.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonMetadataServices class (part 3 of 3)

## JsonMetadataServices.CreateIReadOnlySetInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIReadOnlySetInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.IReadOnlySet<TElement>;
```

To be added.

Parameters:

- `TCollection`: To be added.
- `TElement`: To be added.
- `options`: To be added.
- `collectionInfo`: To be added.

Returns: To be added.

To be added.

## JsonMetadataServices.CreateISetInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateISetInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.ISet<TElement>;
```

Creates metadata for types assignable to `ISet<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateListInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateListInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.List<TElement>;
```

Creates metadata for types assignable to `List<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateMemoryInfo<TElement>(JsonSerializerOptions, Memory<TElement>>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<Memory<TElement>> CreateMemoryInfo<TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<Memory<TElement>> collectionInfo);
```

Creates serialization metadata for `Memory<T>`.

Parameters:

- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateObjectInfo<T>(JsonSerializerOptions, JsonObjectInfoValues<T>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> CreateObjectInfo<T> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<T> objectInfo);
```

Creates metadata for a complex class or struct.

Parameters:

- `T`: The type of the class or struct.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `objectInfo`: Provides serialization metadata about an object type with constructors, properties, and fields.

Returns: A `JsonTypeInfo<T>` instance representing the class or struct.

Exceptions:

- `ArgumentNullException`: `options` or `objectInfo` is `null`.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreatePropertyInfo<T>(JsonSerializerOptions, JsonPropertyInfoValues<T>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonPropertyInfo CreatePropertyInfo<T> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<T> propertyInfo);
```

Creates metadata for a property or field.

Parameters:

- `T`: The type that the converter for the property returns or accepts when converting JSON data.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `propertyInfo`: Provides serialization metadata about the property or field.

Returns: A `JsonPropertyInfo` instance initialized with the provided metadata.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateQueueInfo<TCollection>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>, Object>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateQueueInfo<TCollection> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo, Action<TCollection,object?> addFunc) where TCollection : System.Collections.IEnumerable;
```

Creates metadata for types assignable to `Queue`.

Parameters:

- `TCollection`: The generic definition of the type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.
- `addFunc`: A method for adding elements to the collection when using the serializer's code-paths.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateQueueInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateQueueInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.Queue<TElement>;
```

Creates metadata for types assignable to `Queue<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateReadOnlyMemoryInfo<TElement>(JsonSerializerOptions, ReadOnlyMemory<TElement>>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<ReadOnlyMemory<TElement>> CreateReadOnlyMemoryInfo<TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<ReadOnlyMemory<TElement>> collectionInfo);
```

Creates serialization metadata for `ReadOnlyMemory<T>`.

Parameters:

- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateStackInfo<TCollection>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>, Object>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateStackInfo<TCollection> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo, Action<TCollection,object?> addFunc) where TCollection : System.Collections.IEnumerable;
```

Creates metadata for types assignable to `Stack`.

Parameters:

- `TCollection`: The generic definition of the type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.
- `addFunc`: A method for adding elements to the collection when using the serializer's code-paths.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateStackInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateStackInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.Stack<TElement>;
```

Creates metadata for types assignable to `Stack<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateUnionInfo<T>(JsonSerializerOptions, JsonUnionInfoValues<T>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> CreateUnionInfo<T> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonUnionInfoValues<T> unionInfo);
```

To be added.

Parameters:

- `T`: To be added.
- `options`: To be added.
- `unionInfo`: To be added.

Returns: To be added.

To be added.

## JsonMetadataServices.CreateValueInfo<T>(JsonSerializerOptions, JsonConverter) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> CreateValueInfo<T> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.JsonConverter converter);
```

Creates metadata for a primitive or a type with a custom converter.

Parameters:

- `T`: The generic type definition.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `converter`: To be added.

Returns: A `JsonTypeInfo<T>` instance representing the type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.GetEnumConverter<T>(JsonSerializerOptions) method

```csharp
public static System.Text.Json.Serialization.JsonConverter<T> GetEnumConverter<T> (System.Text.Json.JsonSerializerOptions options) where T : struct;
```

Creates a `JsonConverter<T>` instance that converts `T` values.

Parameters:

- `T`: The generic definition for the enum type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.

Returns: A `JsonConverter<T>` instance that converts `T` values.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.GetNullableConverter<T>(JsonSerializerOptions) method

```csharp
public static System.Text.Json.Serialization.JsonConverter<T?> GetNullableConverter<T> (System.Text.Json.JsonSerializerOptions options) where T : struct;
```

Creates a `JsonConverter<T>` instance that converts `T??` values.

Parameters:

- `T`: The generic definition for the underlying nullable type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.

Returns: A `JsonConverter<T>` instance that converts `T??` values

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.GetNullableConverter<T>(JsonTypeInfo<T>) method

```csharp
public static System.Text.Json.Serialization.JsonConverter<T?> GetNullableConverter<T> (System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> underlyingTypeInfo) where T : struct;
```

Creates a `JsonConverter<T>` instance that converts `T??` values.

Parameters:

- `T`: The generic definition for the underlying nullable type.
- `underlyingTypeInfo`: Serialization metadata for the underlying nullable type.

Returns: A `JsonConverter<T>` instance that converts `T??` values

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.GetUnsupportedTypeConverter<T>() method

```csharp
public static System.Text.Json.Serialization.JsonConverter<T> GetUnsupportedTypeConverter<T> ();
```

Gets a type converter that throws a `NotSupportedException`.

Parameters:

- `T`: The generic definition for the type.

Returns: A `JsonConverter<T>` instance that throws `NotSupportedException`

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.
