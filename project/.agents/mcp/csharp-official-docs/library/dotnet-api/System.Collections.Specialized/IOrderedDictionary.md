---
title: "IOrderedDictionary interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/IOrderedDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOrderedDictionary interface

Namespace: `System.Collections.Specialized`

```csharp
public interface IOrderedDictionary : System.Collections.IDictionary
```

Represents an indexed collection of key/value pairs.

#### Remarks

`IOrderedDictionary` elements can be accessed either with the key or with the index.

Each element is a key/value pair stored in a `DictionaryEntry` structure.

Each pair must have a unique key that is not `null`, but the value can be `null` and does not have to be unique. The `IOrderedDictionary` interface allows the contained keys and values to be enumerated, but it does not imply any particular sort order.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Because each element of the `IDictionary` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/IOrderedDictionary/Overview/iordereddictionary.cs._

The `foreach` statement is a wrapper around the enumerator, which allows only reading from, not writing to, the collection.

#### Examples

The following code example demonstrates the implementation of a simple `IOrderedDictionary` based on the `ArrayList` class. The implemented `IOrderedDictionary` stores first names as the keys and last names as the values, with the added requirement that each first name is unique.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/IOrderedDictionary/Overview/iordereddictionary.cs._

## IOrderedDictionary.Item property

```csharp
public object? this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is equal to or greater than `ICollection.Count`.

#### Remarks

`IOrderedDictionary` accepts `null` as a valid value and allows duplicate elements.

The C# language uses the this keyword to define the indexers instead of implementing the `IOrderedDictionary.Item` property. Visual Basic <example-value> `IOrderedDictionary.Item` as a default property, which provides the same indexing functionality.

This property allows you to access a specific element in the collection by using the following syntax:

```csharp
obj = myOrderedDictionary[index];
```

```vb
obj = myOrderedDictionary(index)
```

#### Examples

The following code example demonstrates the implementation of a simple `IOrderedDictionary` based on the `ArrayList` class. The implemented `IOrderedDictionary` stores first names as the keys and last names as the values, with the added requirement that each first name is unique. This code is part of a larger code example provided for the `IOrderedDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/IOrderedDictionary/Overview/iordereddictionary.cs._

## IOrderedDictionary.GetEnumerator() method

```csharp
public System.Collections.IDictionaryEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `IOrderedDictionary` collection.

Returns: An `IDictionaryEnumerator` for the entire `IOrderedDictionary` collection.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, the `Current` property is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

#### Examples
The following code example demonstrates the implementation of a simple `IOrderedDictionary` based on the `ArrayList` class. The implemented `IOrderedDictionary` stores first names as the keys and last names as the values, with the added requirement that each first name is unique. This code is part of a larger code example provided for the `IOrderedDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/IOrderedDictionary/Overview/iordereddictionary.cs._

## IOrderedDictionary.Insert(Int32, Object, Object) method

```csharp
public void Insert (int index, object key, object? value);
```

Inserts a key/value pair into the collection at the specified index.

Parameters:

- `index`: The zero-based index at which the key/value pair should be inserted.
- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.  The value can be `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is greater than `ICollection.Count`.
- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `IOrderedDictionary` collection.
- `NotSupportedException`: The `IOrderedDictionary` collection is read-only.

-or-

The `IOrderedDictionary` collection has a fixed size.

#### Remarks
`IOrderedDictionary` accepts `null` as a valid value and allows duplicate elements.

If the `index` parameter is equal to `ICollection.Count`, the `value` parameter is added to the end of the `IOrderedDictionary` collection.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped together, such as a hash table.

#### Examples
The following code example demonstrates the implementation of a simple `IOrderedDictionary` based on the `ArrayList` class. The implemented `IOrderedDictionary` stores first names as the keys and last names as the values, with the added requirement that each first name is unique. This code is part of a larger code example provided for the `IOrderedDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/IOrderedDictionary/Overview/iordereddictionary.cs._

## IOrderedDictionary.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is equal to or greater than `ICollection.Count`.
- `NotSupportedException`: The `IOrderedDictionary` collection is read-only.

-or-

The `IOrderedDictionary` collection has a fixed size.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped together, such as a hash table.

#### Examples
The following code example demonstrates the implementation of a simple `IOrderedDictionary` based on the `ArrayList` class. The implemented `IOrderedDictionary` stores first names as the keys and last names as the values, with the added requirement that each first name is unique. This code is part of a larger code example provided for the `IOrderedDictionary` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/IOrderedDictionary/Overview/iordereddictionary.cs._
