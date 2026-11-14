---
title: "CollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/CollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionExtensions class

Namespace: `System.Collections.Generic`

```csharp
public static class CollectionExtensions
```

Provides extension methods for generic collections.

To be added.

## CollectionExtensions.AddRange<T>(List<T>, ReadOnlySpan<T>) method

```csharp
public static void AddRange<T> (this System.Collections.Generic.List<T> list, scoped ReadOnlySpan<T> source);
```

Adds the elements of the specified span to the end of the `List<T>`.

Parameters:

- `T`: The type of elements in the list.
- `list`: The list to which the elements should be added.
- `source`: The span whose elements should be added to the end of the `List<T>`.

Exceptions:

- `ArgumentNullException`: The `list` is `null`.

To be added.

## CollectionExtensions.AsReadOnly<T>(IList<T>) method

```csharp
public static System.Collections.ObjectModel.ReadOnlyCollection<T> AsReadOnly<T> (this System.Collections.Generic.IList<T> list);
```

Returns a read-only `ReadOnlyCollection<T>` wrapper for the specified list.

Parameters:

- `T`: The type of elements in the collection.
- `list`: The list to wrap.

Returns: An object that acts as a read-only wrapper around the current `IList<T>`.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

To be added.

## CollectionExtensions.AsReadOnly<T>(ISet<T>) method

```csharp
public static System.Collections.ObjectModel.ReadOnlySet<T> AsReadOnly<T> (this System.Collections.Generic.ISet<T> set);
```

Returns a read-only `ReadOnlySet<T>` wrapper for the specified set.

Parameters:

- `T`: The type of elements in the set.
- `set`: The set to wrap.

Returns: An object that acts as a read-only wrapper around the current `ISet<T>`.

Exceptions:

- `ArgumentNullException`: `set` is `null`.

To be added.

## CollectionExtensions.AsReadOnly<TKey,TValue>(IDictionary<TKey,TValue>) method

```csharp
public static System.Collections.ObjectModel.ReadOnlyDictionary<TKey,TValue> AsReadOnly<TKey,TValue> (this System.Collections.Generic.IDictionary<TKey,TValue> dictionary);
```

Returns a read-only `ReadOnlyDictionary<T1,T2>` wrapper for the current dictionary.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.
- `dictionary`: The dictionary to wrap.

Returns: An object that acts as a read-only wrapper around the current `IDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.

## CollectionExtensions.CopyTo<T>(List<T>, Span<T>) method

```csharp
public static void CopyTo<T> (this System.Collections.Generic.List<T> list, Span<T> destination);
```

Copies the entire `List<T>` to a span.

Parameters:

- `T`: The type of elements in the list.
- `list`: The list from which the elements are copied.
- `destination`: The span that is the destination of the elements copied from `list`.

Exceptions:

- `ArgumentNullException`: The `list` is `null`.
- `ArgumentException`: The number of elements in the source `List<T>` is greater than the number of elements that the destination span can contain.

To be added.

## CollectionExtensions.GetValueOrDefault<TKey,TValue>(IReadOnlyDictionary<TKey,TValue>, TKey) method

```csharp
public static TValue? GetValueOrDefault<TKey,TValue> (this System.Collections.Generic.IReadOnlyDictionary<TKey,TValue> dictionary, TKey key);
```

Tries to get the value associated with the specified `key` in the `dictionary`.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `dictionary`: A dictionary with keys of type `TKey` and values of type `TValue`.
- `key`: The key of the value to get.

Returns: A `TValue` instance. When the method is successful, the returned object is the value associated with the specified `key`. When the method fails, it returns the `default` value for `TValue`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.

## CollectionExtensions.GetValueOrDefault<TKey,TValue>(IReadOnlyDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static TValue GetValueOrDefault<TKey,TValue> (this System.Collections.Generic.IReadOnlyDictionary<TKey,TValue> dictionary, TKey key, TValue defaultValue);
```

Tries to get the value associated with the specified `key` in the `dictionary`.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `dictionary`: A dictionary with keys of type `TKey` and values of type `TValue`.
- `key`: The key of the value to get.
- `defaultValue`: The default value to return when the `dictionary` cannot find a value associated with the specified `key`.

Returns: A `TValue` instance. When the method is successful, the returned object is the value associated with the specified `key`. When the method fails, it returns `defaultValue`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.

## CollectionExtensions.InsertRange<T>(List<T>, Int32, ReadOnlySpan<T>) method

```csharp
public static void InsertRange<T> (this System.Collections.Generic.List<T> list, int index, scoped ReadOnlySpan<T> source);
```

Inserts the elements of a span into the `List<T>` at the specified index.

Parameters:

- `T`: The type of elements in the list.
- `list`: The list into which the elements should be inserted.
- `index`: The zero-based index at which the new elements should be inserted.
- `source`: The span whose elements should be added to the `List<T>`.

Exceptions:

- `ArgumentNullException`: The `list` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than `list`'s `List<T>.Count`.

To be added.

## CollectionExtensions.Remove<TKey,TValue>(IDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static bool Remove<TKey,TValue> (this System.Collections.Generic.IDictionary<TKey,TValue> dictionary, TKey key, out TValue value);
```

Tries to remove the value with the specified `key` from the `dictionary`.

Parameters:

- `TKey`: The type of the keys in the `dictionary`.
- `TValue`: The type of the values in the `dictionary`.
- `dictionary`: A dictionary with keys of type `TKey` and values of type `TValue`.
- `key`: The key of the value to remove.
- `value`: When this method returns `true`, the removed value; when this method returns `false`, the `default` value for `TValue`.

Returns: `true` when a value is found in the `dictionary` with the specified `key`; `false` when the `dictionary` cannot find a value associated with the specified `key`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.

## CollectionExtensions.TryAdd<TKey,TValue>(IDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static bool TryAdd<TKey,TValue> (this System.Collections.Generic.IDictionary<TKey,TValue> dictionary, TKey key, TValue value);
```

Tries to add the specified `key` and `value` to the `dictionary`.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `dictionary`: A dictionary with keys of type `TKey` and values of type `TValue`.
- `key`: The key of the value to add.
- `value`: The value to add.

Returns: `true` when the `key` and `value` are successfully added to the `dictionary`; `false` when the `dictionary` already contains the specified `key`, in which case nothing gets added.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.
