---
title: "CollectionsMarshal class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CollectionsMarshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionsMarshal class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class CollectionsMarshal
```

An unsafe class that provides a set of methods to access the underlying data representations of collections.

To be added.

## CollectionsMarshal.AsBytes(BitArray) method

```csharp
public static Span<byte> AsBytes (System.Collections.BitArray? array);
```

Gets a `Span<T>` view over a `BitArray`'s data.

Parameters:

- `array`: The `BitArray` whose backing storage should be viewed.

Returns: To be added.

The `BitArray` may have more capacity than is required to store the number of bits represented by `BitArray.Length`.

The returned span's `Span<T>.Length` will be the smallest number of bytes capable of representing that length. If the `BitArray`'s length is not evenly divisible by 8, the last byte of the span may contain extraneous bits that do not represent elements in the `BitArray`. These can be ignored.

The length of the `BitArray` should not be changed while the resulting `Span<T>` is in use. After such a change, the span may no longer refer to the `BitArray`'s backing storage.

## CollectionsMarshal.AsSpan<T>(List<T>) method

```csharp
public static Span<T> AsSpan<T> (System.Collections.Generic.List<T>? list);
```

Gets a `Span<T>` view over the data in a list.
Items should not be added or removed from the `List<T>` while the `Span<T>` is in use.

Parameters:

- `T`: The type of items in the list.
- `list`: List from which to create the `Span<T>`.

Returns: A `Span<T>` instance over the `List<T>`.

To be added.

## CollectionsMarshal.GetValueRefOrAddDefault<TKey,TValue>(Dictionary<TKey,TValue>, TKey, Boolean) method

```csharp
public static ref TValue? GetValueRefOrAddDefault<TKey,TValue> (System.Collections.Generic.Dictionary<TKey,TValue> dictionary, TKey key, out bool exists);
```

Gets a reference to a `TValue` in the specified dictionary, adding a new entry with a default value if the key does not exist.

Parameters:

- `TKey`: The type of a key.
- `TValue`: The type of a value.
- `dictionary`: The dictionary to get the reference to `TValue` from.
- `key`: The key used for lookup.
- `exists`: When this method returns, contains `true` if `key` already existed in the dictionary, and `false` if a new entry was added.

Returns: A reference to a `TValue` in the specified dictionary.

#### Remarks

Items should not be added to or removed from the `Dictionary<T1,T2>` while the ref `TValue` is in use.

## CollectionsMarshal.GetValueRefOrAddDefault<TKey,TValue,TAlternateKey>(Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>, TAlternateKey, Boolean) method

```csharp
public static ref TValue? GetValueRefOrAddDefault<TKey,TValue,TAlternateKey> (System.Collections.Generic.Dictionary<TKey,TValue>.AlternateLookup<TAlternateKey> dictionary, TAlternateKey key, out bool exists) where TAlternateKey : <example-value> ref struct;
```

Gets a ref to a `TValue` in the `AlternateLookup<T>`, adding a new entry with a default value if it does not exist in the `dictionary`.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `TAlternateKey`: The type of the alternate key in the dictionary lookup.
- `dictionary`: The dictionary to get the ref to `TValue` from.
- `key`: The key used for lookup.
- `exists`: Whether or not a new entry for the given key was added to the dictionary.

Returns: A reference to a `TValue` in the specified `AlternateLookup<T>`.

Items should not be added to or removed from the `AlternateLookup<T>` while the ref `TValue` is in use.

## CollectionsMarshal.GetValueRefOrNullRef<TKey,TValue>(Dictionary<TKey,TValue>, TKey) method

```csharp
public static ref TValue GetValueRefOrNullRef<TKey,TValue> (System.Collections.Generic.Dictionary<TKey,TValue> dictionary, TKey key);
```

Gets either a reference to a `TValue` in the `Dictionary<T1,T2>` or a reference `null` if it does not exist in the `dictionary`.

Parameters:

- `TKey`: The type of a key.
- `TValue`: The type of a value.
- `dictionary`: The dictionary to get the ref to `TValue` from.
- `key`: The key used for lookup.

Returns: A reference to a `TValue` in the `Dictionary<T1,T2>` or a reference `null` if it does not exist in the `dictionary`..

#### Remarks

Items should not be added or removed from the `Dictionary<T1,T2>` while the ref `TValue` is in use.

The ref `null` can be detected by calling `IsNullRef<T>`.

## CollectionsMarshal.GetValueRefOrNullRef<TKey,TValue,TAlternateKey>(Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>, TAlternateKey) method

```csharp
public static ref TValue GetValueRefOrNullRef<TKey,TValue,TAlternateKey> (System.Collections.Generic.Dictionary<TKey,TValue>.AlternateLookup<TAlternateKey> dictionary, TAlternateKey key) where TAlternateKey : <example-value> ref struct;
```

Gets either a ref to a `TValue` in the `Dictionary<T1,T2>` or a ref null if it does not exist in the `dictionary`.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `TAlternateKey`: The type of an alternate key for lookups in the dictionary.
- `dictionary`: The dictionary to get the ref to `TValue` from.
- `key`: The key used for lookup.

Returns: A reference to a `TValue` in the `Dictionary<T1,T2>` or a reference `null` if it does not exist in the `dictionary`..

Items should not be added or removed from the `Dictionary<T1,T2>` while the ref `TValue` is in use.

The ref `null` can be detected by calling `Unsafe.IsNullRef<T>`.

## CollectionsMarshal.SetCount<T>(List<T>, Int32) method

```csharp
public static void SetCount<T> (System.Collections.Generic.List<T> list, int count);
```

Sets the count of the `List<T>` to the specified value.

Parameters:

- `T`: The type of the elements in the list.
- `list`: The list to set the count of.
- `count`: The value to set the list's count to.

Exceptions:

- `NullReferenceException`: `list` is `null`.
- `ArgumentOutOfRangeException`: `count` is negative.

When increasing the count, uninitialized data is being exposed.
