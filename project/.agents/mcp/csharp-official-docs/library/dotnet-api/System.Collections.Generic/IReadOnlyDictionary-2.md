---
title: "IReadOnlyDictionary<TKey,TValue> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IReadOnlyDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IReadOnlyDictionary<TKey,TValue> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IReadOnlyDictionary<TKey,TValue> : System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>
```

Represents a generic read-only collection of key/value pairs.

Parameters:

- `TKey`: The type of keys in the read-only dictionary.
- `TValue`: The type of values in the read-only dictionary.

#### Remarks
Each element is a key/value pair that is stored in a `KeyValuePair<T1,T2>` object.

Each pair must have a unique key. Implementations can vary in whether they allow you to specify a key that is `null`. The value can be `null` and does not have to be unique. The `IReadOnlyDictionary<T1,T2>` interface allows the contained keys and values to be enumerated, but it does not imply any particular sort order.

The `foreach` statement of the C# language (`For Each` in Visual Basic) requires the type of each element in the collection. Because each element of the `IReadOnlyDictionary<T1,T2>` interface is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `KeyValuePair<T1,T2>`, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator; it allows only reading from the collection, not writing to the collection.

## IReadOnlyDictionary<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; }
```

Gets the element that has the specified key in the read-only dictionary.

Parameters:

- `key`: The key to locate.

Returns: The element that has the specified key in the read-only dictionary.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and `key` is not found.

#### Remarks
This property lets you access a specific element in the collection by using the following syntax: `myCollection[key]` (`myCollection(key)` in Visual Basic).

Implementations can vary in how they determine the equality of objects: for example, the class that implements `IReadOnlyDictionary<T1,T2>` might use the `Default` property, or it might implement the `IComparer<T>` method.

Implementations can vary in whether they allow `key` to be `null`.

## IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.IEnumerable<TKey> Keys { get; }
```

Gets an enumerable collection that contains the keys in the read-only dictionary.

Returns: An enumerable collection that contains the keys in the read-only dictionary.

#### Remarks
The order of the keys in the enumerable collection is unspecified, but the implementation must guarantee that the keys are in the same order as the corresponding values in the enumerable collection that is returned by the `Values` property.

## IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.IEnumerable<TValue> Values { get; }
```

Gets an enumerable collection that contains the values in the read-only dictionary.

Returns: An enumerable collection that contains the values in the read-only dictionary.

#### Remarks
The order of the values in the enumerable collection is unspecified, but the implementation must guarantee that the values are in the same order as the corresponding keys in the enumerable collection that is returned by the `Keys` property.

## IReadOnlyDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the read-only dictionary contains an element that has the specified key.

Parameters:

- `key`: The key to locate.

Returns: `true` if the read-only dictionary contains an element that has the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
Implementations can vary in how they determine the equality of objects; for example, the class that implements `IReadOnlyDictionary<T1,T2>` might use the `Default` property, or it might implement the `IComparer<T>` method.

Implementations can vary in whether they allow `key` to be `null`.

## IReadOnlyDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value that is associated with the specified key.

Parameters:

- `key`: The key to locate.
- `value`: When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the object that implements the `IReadOnlyDictionary<T1,T2>` interface contains an element that has the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method combines the functionality of the `IReadOnlyDictionary<T1,T2>.ContainsKey` method and the `IReadOnlyDictionary<T1,T2>.Item` property.

If the key is not found, the `value` parameter gets the appropriate default value for the type `TValue`: for example, 0 (zero) for integer types, `false` for Boolean types, and `null` for reference types.
