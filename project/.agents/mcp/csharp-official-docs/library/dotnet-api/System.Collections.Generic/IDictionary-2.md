---
title: "IDictionary<TKey,TValue> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDictionary<TKey,TValue> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IDictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>
```

Represents a generic collection of key/value pairs.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.

#### Remarks
The `IDictionary<T1,T2>` interface is the base interface for generic collections of key/value pairs.

Each element is a key/value pair stored in a `KeyValuePair<T1,T2>` object.

Each pair must have a unique key. Implementations can vary in whether they allow `key` to be `null`. The value can be `null` and does not have to be unique. The `IDictionary<T1,T2>` interface allows the contained keys and values to be enumerated, but it does not imply any particular sort order.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of the `IDictionary<T1,T2>` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `KeyValuePair<T1,T2>`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

> **Note:**
>  Because keys can be inherited and their behavior changed, their absolute uniqueness cannot be guaranteed by comparisons using the `Type.Equals` method.

#### Examples
The following code example creates an empty `Dictionary<T1,T2>` of strings, with string keys, and accesses it through the `IDictionary<T1,T2>` interface.

The code example uses the `IDictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `IDictionary<T1,T2>.Add` method throws `ArgumentException` when attempting to add a duplicate key.

The example uses the `IDictionary<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example shows how to use the `IDictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the dictionary, and how to use the `IDictionary<T1,T2>.ContainsKey` method to test whether a key <example-value> prior to calling the `IDictionary<T1,T2>.Add` method.

Finally, the example shows how to enumerate the keys and values in the dictionary, and how to enumerate the values alone using the `Values` property.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

## IDictionary<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and `key` is not found.
- `NotSupportedException`: The property is set and the `IDictionary<T1,T2>` is read-only.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]` (`myCollection(key)` in Visual Basic).

You can also use the `IDictionary<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue` in C# (`myCollection("myNonexistentKey") = myValue` in Visual Basic). However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary<T1,T2>.Item` property overwrites the old value. In contrast, the `IDictionary<T1,T2>.Add` method does not modify existing elements.

Implementations can vary in how they determine equality of objects; for example, the `List<T>` class uses `Comparer<T>.Default`, whereas the `Dictionary<T1,T2>` class allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

The C# language uses the this keyword to define the indexers instead of implementing the `IDictionary<T1,T2>.Item` property. Visual Basic <example-value> `IDictionary<T1,T2>.Item` as a default property, which provides the same indexing functionality.

Implementations can vary in whether they allow `key` to be `null`.

#### Examples
The following code example uses the `IDictionary<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example also shows how to use the `IDictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the dictionary.

This code is part of a larger example that can be compiled and executed. See `IDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

## IDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.ICollection<TKey> Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

#### Remarks
The order of the keys in the returned `ICollection<T>` is unspecified, but it is guaranteed to be the same order as the corresponding values in the `ICollection<T>` returned by the `Values` property.

#### Examples
The following code example shows how to enumerate keys alone using the `Keys` property.

This code is part of a larger example that can be compiled and executed. See `IDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

## IDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.ICollection<TValue> Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

#### Remarks
The order of the values in the returned `ICollection<T>` is unspecified, but it is guaranteed to be the same order as the corresponding keys in the `ICollection<T>` returned by the `Keys` property.

#### Examples
The following code example shows how to enumerate values alone using the `Values` property.

This code is part of a larger example that can be compiled and executed. See `IDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

## IDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
public void Add (TKey key, TValue value);
```

Adds an element with the provided key and value to the `IDictionary<T1,T2>`.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `IDictionary<T1,T2>`.
- `NotSupportedException`: The `IDictionary<T1,T2>` is read-only.

#### Remarks
You can also use the `IDictionary<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue` in C# (`myCollection("myNonexistentKey") = myValue` in Visual Basic). However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary<T1,T2>.Item` property overwrites the old value. In contrast, the `IDictionary<T1,T2>.Add` method does not modify existing elements.

Implementations can vary in how they determine equality of objects; for example, the `List<T>` class uses `Comparer<T>.Default`, whereas the `Dictionary<T1,T2>` class allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

Implementations can vary in whether they allow `key` to be `null`.

#### Examples
The following code example creates an empty `Dictionary<T1,T2>` of strings, with integer keys, and accesses it through the `IDictionary<T1,T2>` interface. The code example uses the `IDictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `IDictionary<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

This code is part of a larger example that can be compiled and executed. See `IDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

## IDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the `IDictionary<T1,T2>` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary<T1,T2>`.

Returns: `true` if the `IDictionary<T1,T2>` contains an element with the key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
Implementations can vary in how they determine equality of objects; for example, the `List<T>` class uses `Comparer<T>.Default`, whereas the `Dictionary<T1,T2>` class allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

Implementations can vary in whether they allow `key` to be `null`.

#### Examples
The following code example shows how to use the `IDictionary<T1,T2>.ContainsKey` method to test whether a key <example-value> prior to calling the `IDictionary<T1,T2>.Add` method. It also shows how to use the `IDictionary<T1,T2>.TryGetValue` method, which can be a more efficient way to retrieve values if a program frequently tries key <example-value> that are not in the dictionary. Finally, it shows how to insert items using `IDictionary<T1,T2>.Item` property (the indexer in C#).

This code is part of a larger example that can be compiled and executed. See `IDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

## IDictionary<TKey,TValue>.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes the element with the specified key from the `IDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` was not found in the original `IDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The `IDictionary<T1,T2>` is read-only.

#### Remarks
Implementations can vary in how they determine equality of objects; for example, the `List<T>` class uses `Comparer<T>.Default`, whereas the `Dictionary<T1,T2>` class allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

#### Examples
The following code example shows how to remove a key/value pair from a dictionary using the `IDictionary<T1,T2>.Remove` method.

This code is part of a larger example that can be compiled and executed. See `IDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

## IDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get.
- `value`: When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the object that implements `IDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method combines the functionality of the `IDictionary<T1,T2>.ContainsKey` method and the `IDictionary<T1,T2>.Item` property.

If the key is not found, then the `value` parameter gets the appropriate default value for the type `TValue`; for example, zero (0) for integer types, `false` for Boolean types, and `null` for reference types.

#### Examples
The example shows how to use the `IDictionary<T1,T2>.TryGetValue` method to retrieve values. If a program frequently tries key <example-value> that are not in a dictionary, the `IDictionary<T1,T2>.TryGetValue` method can be more efficient than using the `IDictionary<T1,T2>.Item` property (the indexer in C#), which throws exceptions when attempting to retrieve nonexistent keys.

This code is part of a larger example that can be compiled and executed. See `IDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IDictionaryTKey,TValue/Overview/source.cs._
