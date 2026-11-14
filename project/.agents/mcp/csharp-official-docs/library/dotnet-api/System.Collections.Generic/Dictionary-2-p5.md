---
title: "Dictionary<TKey,TValue> class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue> class (part 5 of 5)

## Dictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds the specified key and value to the dictionary.

Parameters:

- `key`: The object to use as the key.
- `value`: The object to use as the value.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` is of a type that is not assignable to the key type `TKey` of the `Dictionary<T1,T2>`.

-or-

`value` is of a type that is not assignable to `TValue`, the type of values in the `Dictionary<T1,T2>`.

-or-

A value with the same key <example-value> exists in the `Dictionary<T1,T2>`.

#### Remarks

You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method throws an exception if the specified key <example-value> exists.

If `Dictionary<T1,T2>.Count` is less than the capacity, this method approaches an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `Dictionary<T1,T2>.Count`.

#### Examples

The following code example shows how to access the `Dictionary<T1,T2>` class through the `IDictionary` interface. The code example creates an empty `Dictionary<T1,T2>` of strings with string keys and uses the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method to add some elements. The example demonstrates that the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method throws an `ArgumentException` when attempting to add a duplicate key, or when a key or value of the wrong data type is supplied.

The code example demonstrates the use of several other members of the `IDictionary` interface.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## Dictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the `IDictionary` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary`.

Returns: `true` if the `IDictionary` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method returns `false` if `key` is of a type that is not assignable to the key type `TKey` of the `Dictionary<T1,T2>`.

This method approaches an O(1) operation.

#### Examples
The following code example shows how to use the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Contains` method of the `IDictionary` interface with a `Dictionary<T1,T2>`. The example demonstrates that the method returns `false` if a key of the wrong data type is supplied.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/System.Collections.IDictionary.Contains/source.cs._

## Dictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` for the `IDictionary`.

Returns: An `IDictionaryEnumerator` for the `IDictionary`.

#### Remarks
For purposes of enumeration, each item is a `DictionaryEntry` structure.

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. The `IEnumerator.Reset` method also brings the enumerator back to this position.  At this position, `IDictionaryEnumerator.Entry` is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IDictionaryEnumerator.Entry`.

The `Entry` property returns the same element until either the `IEnumerator.MoveNext` or `IEnumerator.Reset` method is called. `IEnumerator.MoveNext` sets `IDictionaryEnumerator.Entry` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IDictionaryEnumerator.Entry` is undefined. To set `IDictionaryEnumerator.Entry` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding elements or changing the capacity, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The only mutating methods that do not invalidate enumerators are `Dictionary<T1,T2>.Remove` and `Dictionary<T1,T2>.Clear`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.

#### Examples
The following code example shows how to enumerate the key/value pairs in the dictionary by using the `foreach` statement (`For Each` in Visual Basic), which hides the use of the enumerator. In particular, note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/System.Collections.IDictionary.GetEnumerator/source.cs._

## Dictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `IDictionary`.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method approaches an O(1) operation.

#### Examples
The following code example shows how to use the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Remove` of the `IDictionary` interface with a `Dictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/System.Collections.IDictionary.Remove/source.cs._

## Dictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. The `IEnumerator.Reset` method also brings the enumerator back to this position.  At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

The `Current` property returns the same element until either the `IEnumerator.MoveNext` or `IEnumerator.Reset` method is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding elements or changing the capacity, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The only mutating methods that do not invalidate enumerators are `Dictionary<T1,T2>.Remove` and `Dictionary<T1,T2>.Clear`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.

## Dictionary<TKey,TValue>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity of this dictionary to what it would be if it had been originally initialized with all its entries.

This method can be used to minimize memory overhead once it is known that no new elements will be added to the dictionary. To allocate  a minimum size storage array, execute the following statements:

```csharp
dictionary.Clear();
dictionary.TrimExcess();
```

## Dictionary<TKey,TValue>.TrimExcess(Int32) method

```csharp
public void TrimExcess (int capacity);
```

Sets the capacity of this dictionary to hold up a specified number of entries without any further expansion of its backing storage.

Parameters:

- `capacity`: The new capacity.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than `Dictionary<T1,T2>.Count`.

This method can be used to minimize the memory overhead once it is known that no new elements will be added.

## Dictionary<TKey,TValue>.TryAdd(TKey, TValue) method

```csharp
public bool TryAdd (TKey key, TValue value);
```

Attempts to add the specified key and value to the dictionary.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. It can be `null`.

Returns: `true` if the key/value pair was added to the dictionary successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks

Unlike the `Dictionary<T1,T2>.Add` method, this method doesn't throw an exception if the element with the given key <example-value> in the dictionary. Unlike the Dictionary indexer, `TryAdd` doesn't override the element if the element with the given key <example-value> in the dictionary. If the key <example-value> exists, `TryAdd` does nothing and returns `false`.

## Dictionary<TKey,TValue>.TryGetAlternateLookup<TAlternateKey>(Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>) method

```csharp
public bool TryGetAlternateLookup<TAlternateKey> (out System.Collections.Generic.Dictionary<TKey,TValue>.AlternateLookup<TAlternateKey> lookup) where TAlternateKey : <example-value> ref struct;
```

Gets an instance of a type that can be used to perform operations on the current `Dictionary<T1,T2>` using a `TAlternateKey` as a key <example-value> of a `TKey`.

Parameters:

- `TAlternateKey`: The alternate type of a key for performing lookups.
- `lookup`: The created lookup instance when the method returns true, or a default instance that should not be used if the method returns false.

Returns: `true` if a lookup could be created; otherwise, `false`.

The dictionary must use a comparer that implements `IAlternateEqualityComparer<T1,T2>` with `TAlternateKey` and `TKey`. If it doesn't, the method returns `false`.

## Dictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the `Dictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method combines the functionality of the `Dictionary<T1,T2>.ContainsKey` method and the `Dictionary<T1,T2>.Item` property.

If the key is not found, then the `value` parameter gets the appropriate default value for the type `TValue`; for example, 0 (zero) for integer types, `false` for Boolean types, and `null` for reference types.

Use the `Dictionary<T1,T2>.TryGetValue` method if your code frequently attempts to access keys that are not in the dictionary. Using this method is more efficient than catching the `KeyNotFoundException` thrown by the `Dictionary<T1,T2>.Item` property.

This method approaches an O(1) operation.

#### Examples
The example shows how to use the `Dictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values in a program that frequently tries keys that are not in the dictionary. For contrast, the example also shows how the `Dictionary<T1,T2>.Item` property (the indexer in C#) throws exceptions when attempting to retrieve nonexistent keys.

This code example is part of a larger example provided for the `Dictionary<T1,T2>` class (`openWith` is the name of the Dictionary used in this example).

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._
