---
title: "IDictionary interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDictionary interface

Namespace: `System.Collections`

```csharp
public interface IDictionary : System.Collections.ICollection
```

Represents a nongeneric collection of key/value pairs.

#### Remarks
The `IDictionary` interface is the base interface for nongeneric collections of key/value pairs. For the generic version of this interface, see `IDictionary<T1,T2>`.

Each element is a key/value pair stored in a `DictionaryEntry` object.

Each pair must have a unique key. Implementations can vary in whether they allow the key to be null.  The value can be null and does not have to be unique. The `IDictionary` interface allows the contained keys and values to be enumerated, but it does not imply any particular sort order.

`IDictionary` implementations fall into three categories: read-only, fixed-size, variable-size. A read-only `IDictionary` object cannot be modified. A fixed-size `IDictionary` object does not allow the addition or removal of elements, but does allow the modification of existing elements. A variable-size `IDictionary` object allows the addition, removal, and modification of elements.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of the `IDictionary` object is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/remarks.cs._

The `foreach` statement is a wrapper around the enumerator, which allows only reading from but not writing to the collection.

#### Examples
The following code example demonstrates how to define a simple dictionary class that implements the `IDictionary` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.IsFixedSize property

```csharp
public bool IsFixedSize { get; }
```

Gets a value indicating whether the `IDictionary` object has a fixed size.

Returns: `true` if the `IDictionary` object has a fixed size; otherwise, `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but does allow the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

#### Examples
The following code example demonstrates how to implement the `IsFixedSize` property. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `IDictionary` object is read-only.

Returns: `true` if the `IDictionary` object is read-only; otherwise, `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

#### Examples
The following code example demonstrates how to implement the `IsReadOnly` property. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.Item property

```csharp
public object? this[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key, or `null` if the key does not exist.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The property is set and the `IDictionary` object is read-only.

-or-

The property is set, `key` does not exist in the collection, and the `IDictionary` has a fixed size.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]`.

You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary (for example, `myCollection["myNonexistentKey"] = myValue`). However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

Implementations can vary in whether they allow the key to be `null`.

The C# language uses the `this`this keyword to define the indexers instead of implementing the `IDictionary.Item` property. Visual Basic <example-value> `IDictionary.Item` as a default property, which provides the same indexing functionality.

#### Examples
The following code example demonstrates how to implement the `IDictionary.Item` property. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.Keys property

```csharp
public System.Collections.ICollection Keys { get; }
```

Gets an `ICollection` object containing the keys of the `IDictionary` object.

Returns: An `ICollection` object containing the keys of the `IDictionary` object.

#### Remarks
The order of the keys in the returned `ICollection` object is unspecified, but is guaranteed to be the same order as the corresponding values in the `ICollection` returned by the `Values` property.

#### Examples
The following code example demonstrates how to implement the `Keys` property. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.Values property

```csharp
public System.Collections.ICollection Values { get; }
```

Gets an `ICollection` object containing the values in the `IDictionary` object.

Returns: An `ICollection` object containing the values in the `IDictionary` object.

#### Remarks
The order of the values in the returned `ICollection` object is unspecified, but is guaranteed to be the same order as the corresponding keys in the `ICollection` returned by the `Keys` property.

#### Examples
The following code example demonstrates how to implement the `Values` property. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.Add(Object, Object) method

```csharp
public void Add (object key, object? value);
```

Adds an element with the provided key and value to the `IDictionary` object.

Parameters:

- `key`: The `Object` to use as the key of the element to add.
- `value`: The `Object` to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `IDictionary` object.
- `NotSupportedException`: The `IDictionary` is read-only.

-or-

The `IDictionary` has a fixed size.

#### Remarks
You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary (for example, `myCollection["myNonexistentKey"] = myValue`). However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

Implementations can vary in whether they allow the key to be `null`.

#### Examples
The following code example demonstrates how to implement the `IDictionary.Add` method. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `IDictionary` object.

Exceptions:

- `NotSupportedException`: The `IDictionary` object is read-only.

#### Examples
The following code example demonstrates how to implement the `IDictionary.Clear` method. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.Contains(Object) method

```csharp
public bool Contains (object key);
```

Determines whether the `IDictionary` object contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary` object.

Returns: `true` if the `IDictionary` contains an element with the key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
Implementations can vary in whether they allow the key to be `null`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example demonstrates how to implement the `IDictionary.Contains` method. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionary.GetEnumerator() method

```csharp
public System.Collections.IDictionaryEnumerator GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object for the `IDictionary` object.

Returns: An `IDictionaryEnumerator` object for the `IDictionary` object.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, the `Current` property is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

## IDictionary.Remove(Object) method

```csharp
public void Remove (object key);
```

Removes the element with the specified key from the `IDictionary` object.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The `IDictionary` object is read-only.

-or-

The `IDictionary` has a fixed size.

#### Remarks
If the `IDictionary` object does not contain an element with the specified key, the `IDictionary` remains unchanged. No exception is thrown.

#### Examples
The following code example demonstrates how to implement the `IDictionary.Remove` method. This code example is part of a larger example provided for the `IDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._
