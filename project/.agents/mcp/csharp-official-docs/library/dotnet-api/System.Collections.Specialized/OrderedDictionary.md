---
title: "OrderedDictionary class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/OrderedDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderedDictionary class

Namespace: `System.Collections.Specialized`

```csharp
public class OrderedDictionary : System.Collections.IDictionary, System.Collections.Specialized.IOrderedDictionary, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a collection of key/value pairs that are accessible by the key or index.

#### Remarks
Each element is a key/value pair stored in a `DictionaryEntry` object. A key <example-value> be `null`, but a value can be.

The elements of an `OrderedDictionary` are not sorted by the key, unlike the elements of a `SortedDictionary<T1,T2>` class. You can access elements either by the key or by the index.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns objects that are of the type of each element in the collection. Since each element of the `OrderedDictionary` collection is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`. The following code shows the syntax.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

#### Examples
The following code example demonstrates the creation, population and modification of an `OrderedDictionary` collection, as well as two techniques to display the contents of the `OrderedDictionary`: one using the `OrderedDictionary.Keys` and `OrderedDictionary.Values` properties and the other creating an enumerator through the `OrderedDictionary.GetEnumerator` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.OrderedDictionary() constructor

```csharp
public OrderedDictionary ();
```

Initializes a new instance of the `OrderedDictionary` class.

#### Remarks
The comparer determines whether two keys are equal. Every key in a `OrderedDictionary` collection must be unique. The default comparer is the key's implementation of `Object.Equals`.

#### Examples
The following code example demonstrates the creation and population of an `OrderedDictionary` collection. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.OrderedDictionary(IEqualityComparer) constructor

```csharp
public OrderedDictionary (System.Collections.IEqualityComparer? comparer);
```

Initializes a new instance of the `OrderedDictionary` class using the specified comparer.

Parameters:

- `comparer`: The `IComparer` to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

#### Remarks
The comparer determines whether two keys are equal. Every key in a `OrderedDictionary` collection must be unique. The default comparer is the key's implementation of `Object.Equals`.

The custom comparer enables such scenarios as doing lookups with case-insensitive strings.

## OrderedDictionary.OrderedDictionary(Int32) constructor

```csharp
public OrderedDictionary (int capacity);
```

Initializes a new instance of the `OrderedDictionary` class using the specified initial capacity.

Parameters:

- `capacity`: The initial number of elements that the `OrderedDictionary` collection can contain.

#### Remarks
The comparer determines whether two keys are equal. Every key in a `OrderedDictionary` collection must be unique. The default comparer is the key's implementation of `Object.Equals`.

## OrderedDictionary.OrderedDictionary(Int32, IEqualityComparer) constructor

```csharp
public OrderedDictionary (int capacity, System.Collections.IEqualityComparer? comparer);
```

Initializes a new instance of the `OrderedDictionary` class using the specified initial capacity and comparer.

Parameters:

- `capacity`: The initial number of elements that the `OrderedDictionary` collection can contain.
- `comparer`: The `IComparer` to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

#### Remarks
The comparer determines whether two keys are equal. Every key in a `OrderedDictionary` collection must be unique. The default comparer is the key's implementation of `Object.Equals`.

The custom comparer enables such scenarios as doing lookups with case-insensitive strings.

## OrderedDictionary.OrderedDictionary(SerializationInfo, StreamingContext) constructor

```csharp
protected OrderedDictionary (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `OrderedDictionary` class that is serializable using the specified `SerializationInfo` and `StreamingContext` objects.

Parameters:

- `info`: A `SerializationInfo` object containing the information required to serialize the `OrderedDictionary` collection.
- `context`: A `StreamingContext` object containing the source and destination of the serialized stream associated with the `OrderedDictionary`.

To be added.

## OrderedDictionary.Count property

```csharp
public int Count { get; }
```

Gets the number of key/values pairs contained in the `OrderedDictionary` collection.

Returns: The number of key/value pairs contained in the `OrderedDictionary` collection.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `Count` property is used to remove the last item in the `OrderedDictionary`. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `OrderedDictionary` collection is read-only.

Returns: `true` if the `OrderedDictionary` collection is read-only; otherwise, `false`. The default is `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modification of the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `IsReadOnly` property is used to determine whether the `OrderedDictionary` can be modified. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.Item property

```csharp
public object? this[int index] { get; set; }
```

Gets or sets the value at the specified index.

Parameters:

- `index`: The zero-based index of the value to get or set.

Returns: The value of the item at the specified index.

Exceptions:

- `NotSupportedException`: The property is being set and the `OrderedDictionary` collection is read-only.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `OrderedDictionary.Count`.

#### Remarks
This property allows you to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `OrderedDictionary.Item` property. Visual Basic <example-value> `OrderedDictionary.Item` as a default property, which provides the same indexing functionality.

## OrderedDictionary.Item property

```csharp
public object? this[object key] { get; set; }
```

Gets or sets the value with the specified key.

Parameters:

- `key`: The key of the value to get or set.

Returns: The value associated with the specified key. If the specified key is not found, attempting to get it returns `null`, and attempting to set it creates a new element using the specified key.

Exceptions:

- `NotSupportedException`: The property is being set and the `OrderedDictionary` collection is read-only.

#### Remarks
This property allows you to access a specific element in the collection by using the following syntax: `myCollection[key]`.

You can also use the `OrderedDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `OrderedDictionary` collection (for example, `myCollection["myNonexistentKey"] = myValue`). However, if the specified key <example-value> exists in the `OrderedDictionary`, setting the `OrderedDictionary.Item` property overwrites the old value. In contrast, the `OrderedDictionary.Add` method does not modify existing elements.

A key <example-value> be `null`, but a value can be. To distinguish between `null` that is returned because the specified key is not found and `null` that is returned because the value of the specified key is `null`, use the `Hashtable.Contains` method to determine if the key <example-value> in the `OrderedDictionary`.

#### Examples
The following code example demonstrates the modification of an `OrderedDictionary` collection. In this example, the `OrderedDictionary.Item` property is used to modify the dictionary entry with the key `"testKey2"`. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.Keys property

```csharp
public System.Collections.ICollection Keys { get; }
```

Gets an `ICollection` object containing the keys in the `OrderedDictionary` collection.

Returns: An `ICollection` object containing the keys in the `OrderedDictionary` collection.

#### Remarks
The returned `ICollection` object is not a static copy; instead, the `ICollection` refers back to the keys in the original `OrderedDictionary` collection. Therefore, changes to the `OrderedDictionary` continue to be reflected in the `ICollection`.

#### Examples
The following code example demonstrates the creation and population of an `OrderedDictionary` collection, and then prints the contents to the console. In this example, the `OrderedDictionary.Keys` and `OrderedDictionary.Values` properties are passed to a method that displays the contents. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

## OrderedDictionary.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `OrderedDictionary` object is synchronized (thread-safe).

Returns: This method always returns `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `OrderedDictionary` instance is cast to an `ICollection` interface.

## OrderedDictionary.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `OrderedDictionary` object.

Returns: An object that can be used to synchronize access to the `OrderedDictionary` object.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `OrderedDictionary` instance is cast to an `ICollection` interface.

## OrderedDictionary.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether the `OrderedDictionary` has a fixed size.

Returns: `true` if the `OrderedDictionary` has a fixed size; otherwise, `false`. The default is `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `OrderedDictionary` instance is cast to an `IDictionary` interface.

## OrderedDictionary.Values property

```csharp
public System.Collections.ICollection Values { get; }
```

Gets an `ICollection` object containing the values in the `OrderedDictionary` collection.

Returns: An `ICollection` object containing the values in the `OrderedDictionary` collection.

#### Remarks
The returned `ICollection` object is not a static copy; instead, the `ICollection` refers back to the values in the original `OrderedDictionary` collection. Therefore, changes to the `OrderedDictionary` continue to be reflected in the `ICollection`.

#### Examples
The following code example demonstrates the creation and population of an `OrderedDictionary` collection, and then prints the contents to the console. In this example, the `OrderedDictionary.Keys` and `OrderedDictionary.Values` properties are passed to a method that displays the contents. This code is part of a larger code example that can be viewed at `OrderedDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/OrderedDictionary/Overview/OrderedDictionary1.cs._
