---
title: "JsonMetadataServices class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonMetadataServices.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonMetadataServices class (part 2 of 3)

## JsonMetadataServices.CreateConcurrentQueueInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateConcurrentQueueInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Concurrent.ConcurrentQueue<TElement>;
```

Creates metadata for types assignable to `ConcurrentQueue<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The serialization and deserialization options to use.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateConcurrentStackInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateConcurrentStackInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Concurrent.ConcurrentStack<TElement>;
```

Creates metadata for types assignable to `ConcurrentStack<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateDictionaryInfo<TCollection,TKey,TValue>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateDictionaryInfo<TCollection,TKey,TValue> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.Dictionary<TKey,TValue>;
```

Creates metadata for types assignable to `Dictionary<T1,T2>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TKey`: The generic definition of the key type.
- `TValue`: The generic definition of the value type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIAsyncEnumerableInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIAsyncEnumerableInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.IAsyncEnumerable<TElement>;
```

Creates serialization metadata for types assignable to `IAsyncEnumerable<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateICollectionInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateICollectionInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.ICollection<TElement>;
```

Creates metadata for types assignable to `ICollection<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIDictionaryInfo<TCollection>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIDictionaryInfo<TCollection> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.IDictionary;
```

Creates metadata for types assignable to `IDictionary`.

Parameters:

- `TCollection`: The generic definition of the type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIDictionaryInfo<TCollection,TKey,TValue>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIDictionaryInfo<TCollection,TKey,TValue> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.IDictionary<TKey,TValue>;
```

Creates metadata for types assignable to `IDictionary<T1,T2>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TKey`: The generic definition of the key type.
- `TValue`: The generic definition of the value type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIEnumerableInfo<TCollection>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIEnumerableInfo<TCollection> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.IEnumerable;
```

Creates metadata for types assignable to `IEnumerable`.

Parameters:

- `TCollection`: The generic definition of the type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIEnumerableInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIEnumerableInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.IEnumerable<TElement>;
```

Creates metadata for types assignable to `IEnumerable<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIListInfo<TCollection>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIListInfo<TCollection> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.IList;
```

Creates metadata for types assignable to `IList`.

Parameters:

- `TCollection`: The generic definition of the type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIListInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIListInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.IList<TElement>;
```

Creates metadata for types assignable to `IList<T>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateImmutableDictionaryInfo<TCollection,TKey,TValue>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>, KeyValuePair<TKey,TValue>>,TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateImmutableDictionaryInfo<TCollection,TKey,TValue> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo, Func<System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>,TCollection> createRangeFunc) where TCollection : System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>;
```

Creates metadata for `ImmutableDictionary<T1,T2>` and types assignable to `IReadOnlyDictionary<T1,T2>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TKey`: The generic definition of the key type.
- `TValue`: The generic definition of the value type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.
- `createRangeFunc`: A method to create an immutable dictionary instance.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateImmutableEnumerableInfo<TCollection,TElement>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>, IEnumerable<TElement>,TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateImmutableEnumerableInfo<TCollection,TElement> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo, Func<System.Collections.Generic.IEnumerable<TElement>,TCollection> createRangeFunc) where TCollection : System.Collections.Generic.IEnumerable<TElement>;
```

Creates metadata for non-dictionary immutable collection types.

Parameters:

- `TCollection`: The generic definition of the type.
- `TElement`: The generic definition of the element type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.
- `createRangeFunc`: A method to create an immutable dictionary instance.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonMetadataServices.CreateIReadOnlyDictionaryInfo<TCollection,TKey,TValue>(JsonSerializerOptions, JsonCollectionInfoValues<TCollection>) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<TCollection> CreateIReadOnlyDictionaryInfo<TCollection,TKey,TValue> (System.Text.Json.JsonSerializerOptions options, System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<TCollection> collectionInfo) where TCollection : System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>;
```

Creates metadata for types assignable to `IReadOnlyDictionary<T1,T2>`.

Parameters:

- `TCollection`: The generic definition of the type.
- `TKey`: The generic definition of the key type.
- `TValue`: The generic definition of the value type.
- `options`: The `JsonSerializerOptions` to use for serialization and deserialization.
- `collectionInfo`: Provides serialization metadata about the collection type.

Returns: Serialization metadata for the given type.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.
