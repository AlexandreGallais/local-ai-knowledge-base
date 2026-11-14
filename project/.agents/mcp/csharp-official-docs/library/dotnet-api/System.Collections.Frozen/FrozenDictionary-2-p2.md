---
title: "FrozenDictionary<TKey,TValue> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Frozen/FrozenDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FrozenDictionary<TKey,TValue> class (part 2 of 2)

## FrozenDictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the `IDictionary` object.

Parameters:

- `key`: The `Object` to use as the key of the element to add.
- `value`: The `Object` to use as the value of the element to add.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.Clear() method

```csharp
void IDictionary.Clear ();
```

Removes all elements from the `IDictionary` object.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the `IDictionary` object contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary` object.

Returns: `true` if the `IDictionary` contains an element with the key; otherwise, `false`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object for the `IDictionary` object.

Returns: An `IDictionaryEnumerator` object for the `IDictionary` object.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `IDictionary` object.

Parameters:

- `key`: The key of the element to remove.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

To be added.

## FrozenDictionary<TKey,TValue>.TryGetAlternateLookup<TAlternateKey>(FrozenDictionary<TKey,TValue>+AlternateLookup<TAlternateKey>) method

```csharp
public bool TryGetAlternateLookup<TAlternateKey> (out System.Collections.Frozen.FrozenDictionary<TKey,TValue>.AlternateLookup<TAlternateKey> lookup) where TAlternateKey : <example-value> ref struct;
```

Gets an instance of a type that may be used to perform operations on a `FrozenDictionary<T1,T2>`
using a `TAlternateKey` as a key <example-value> of a `TKey`.

Parameters:

- `TAlternateKey`: The alternate type of a key for performing lookups.
- `lookup`: The created lookup instance when the method returns `true`, or a default instance that should not be used if the method returns `false`.

Returns: `true` if a lookup could be created; otherwise, `false`.

This instance must be using a comparer that implements `IAlternateEqualityComparer<T1,T2>` with
`TAlternateKey` and `TKey`. If it doesn't, the method will return `false`.

## FrozenDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, the default value for the type of `value`.

Returns: `true` if the dictionary contains an element with the specified key; otherwise, `false`.

To be added.
