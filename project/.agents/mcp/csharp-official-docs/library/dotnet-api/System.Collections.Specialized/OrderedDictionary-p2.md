---
title: "OrderedDictionary class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/OrderedDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderedDictionary class (part 2 of 2)

## OrderedDictionary.Add(Object, Object) method

```csharp
public void Add (object key, object? value);
```

Adds an entry with the specified key and value into the `OrderedDictionary` collection with the lowest available index.

Parameters:

- `key`: The key of the entry to add.
- `value`: The value of the entry to add. This value can be `null`.

Exceptions:

- `NotSupportedException`: The `OrderedDictionary` collection is read-only.
- `ArgumentException`: An element with the same key <example-value> exists in the `OrderedDictionary` collection.

#### Remarks
A key <example-value> be `null`, but a value can be.

You can also use the `OrderedDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `OrderedDictionary` collection; however, if the specified key <example-value> exists in the `OrderedDictionary`, setting the `OrderedDictionary.Item` property overwrites the old value. In contrast, the `OrderedDictionary.Add` method does not modify existing elements but instead throws `ArgumentException`.

#### Examples
The following code example demonstrates the creation and population of an `OrderedDictionary` collection. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.AsReadOnly() method

```csharp
public System.Collections.Specialized.OrderedDictionary AsReadOnly ();
```

Returns a read-only copy of the current `OrderedDictionary` collection.

Returns: A read-only copy of the current `OrderedDictionary` collection.

#### Remarks
The `OrderedDictionary.AsReadOnly` method creates a read-only wrapper around the current `OrderedDictionary` collection. Changes made to the `OrderedDictionary` collection are reflected in the read-only copy.

## OrderedDictionary.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `OrderedDictionary` collection.

Exceptions:

- `NotSupportedException`: The `OrderedDictionary` collection is read-only.

#### Remarks
After calling the `OrderedDictionary.Clear` method, the `Count` property is set to zero and references to other objects from elements of the collection are also released. The capacity is not changed as a result of calling this method.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `OrderedDictionary.Clear` method is used to empty the `OrderedDictionary`, and then the `OrderedDictionary` is repopulated. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.Contains(Object) method

```csharp
public bool Contains (object key);
```

Determines whether the `OrderedDictionary` collection contains a specific key.

Parameters:

- `key`: The key to locate in the `OrderedDictionary` collection.

Returns: `true` if the `OrderedDictionary` collection contains an element with the specified key; otherwise, `false`.

#### Remarks
Using the `OrderedDictionary.Item` property can return a null value if the key does not exist or if the key is `null`. Use the `OrderedDictionary.Contains` method to determine if a specific key <example-value> in the `OrderedDictionary` collection.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `OrderedDictionary.Contains` method is used to determine if an entry exists before attempting to remove it. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the `OrderedDictionary` elements to a one-dimensional `Array` object at the specified index.

Parameters:

- `array`: The one-dimensional `Array` object that is the destination of the `DictionaryEntry` objects copied from `OrderedDictionary` collection. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

#### Remarks
The `OrderedDictionary.CopyTo` method is not guaranteed to preserve the order of the elements in the `OrderedDictionary` collection.

## OrderedDictionary.GetEnumerator() method

```csharp
public virtual System.Collections.IDictionaryEnumerator GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object that iterates through the `OrderedDictionary` collection.

Returns: An `IDictionaryEnumerator` object for the `OrderedDictionary` collection.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an O(1) operation.

#### Examples
The following code example demonstrates the use of the `OrderedDictionary.GetEnumerator` method to display the contents of the `OrderedDictionary` collection to the console. In this example, the `OrderedDictionary.GetEnumerator` method is used to obtain an `IDictionaryEnumerator` object that is passed to a method that displays the contents. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize the `OrderedDictionary` collection.

Parameters:

- `info`: A `SerializationInfo` object containing the information required to serialize the `OrderedDictionary` collection.
- `context`: A `StreamingContext` object containing the source and destination of the serialized stream associated with the `OrderedDictionary`.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## OrderedDictionary.Insert(Int32, Object, Object) method

```csharp
public void Insert (int index, object key, object? value);
```

Inserts a new entry into the `OrderedDictionary` collection with the specified key and value at the specified index.

Parameters:

- `index`: The zero-based index at which the element should be inserted.
- `key`: The key of the entry to add.
- `value`: The value of the entry to add. The value can be `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is out of range.
- `NotSupportedException`: This collection is read-only.

#### Remarks
If the `index` parameter is equal to the number of entries in the `OrderedDictionary` collection, the `key` and `value` parameters are appended to the end of the collection.

Entries that follow the insertion point move down to accommodate the new entry and the indexes of the moved entries are also updated.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `OrderedDictionary.Insert` method is used to add a new entry to the beginning of the `OrderedDictionary`, moving the rest of the entries down. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.OnDeserialization(Object) method

```csharp
protected virtual void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and is called back by the deserialization event when deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `OrderedDictionary` collection is invalid.

#### Remarks
This method can be overridden.

## OrderedDictionary.Remove(Object) method

```csharp
public void Remove (object key);
```

Removes the entry with the specified key from the `OrderedDictionary` collection.

Parameters:

- `key`: The key of the entry to remove.

Exceptions:

- `NotSupportedException`: The `OrderedDictionary` collection is read-only.
- `ArgumentNullException`: `key` is `null`.

#### Remarks
The entries that follow the removed entry move up to occupy the vacated spot and the indexes of the entries that move are also updated.

If the `OrderedDictionary` collection does not contain an entry with the specified key, the `OrderedDictionary` remains unchanged and no exception is thrown.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `OrderedDictionary.Remove` method is used to remove the entry with the key `"keyToDelete"` from the `OrderedDictionary`. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the entry at the specified index from the `OrderedDictionary` collection.

Parameters:

- `index`: The zero-based index of the entry to remove.

Exceptions:

- `NotSupportedException`: The `OrderedDictionary` collection is read-only.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `OrderedDictionary.Count`.

#### Remarks
The entries that follow the removed entry move up to occupy the vacated spot and the indexes of the entries that move are also updated.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `OrderedDictionary.RemoveAt` method is used with the `Count` property to remove the last entry from the `OrderedDictionary`. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object that iterates through the `OrderedDictionary` collection.

Returns: An `IDictionaryEnumerator` object for the `OrderedDictionary` collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `OrderedDictionary` instance is cast to an `IEnumerable` interface.

## OrderedDictionary.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Implements the `ISerializable` interface and is called back by the deserialization event when deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

To be added.
