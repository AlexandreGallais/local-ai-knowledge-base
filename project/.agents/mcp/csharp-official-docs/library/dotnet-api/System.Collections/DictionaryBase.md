---
title: "DictionaryBase class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/DictionaryBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DictionaryBase class

Namespace: `System.Collections`

```csharp
public abstract class DictionaryBase : System.Collections.IDictionary
```

Provides the `abstract` base class for a strongly typed collection of key/value pairs.

#### Remarks

> **Important:**
>  We don't recommend that you use the `DictionaryBase` class for new development. Instead, we recommend that you use the generic `Dictionary<T1,T2>` or `KeyedCollection<T1,T2>` class . For more information, see Non-generic collections shouldn't be used on GitHub.

The C# foreach statement and the Visual Basic For Each statement return an object of the type of the elements in the collection. Since each element of the `DictionaryBase` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`.

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

> **Note:**
>  Because keys can be inherited and their behavior changed, their absolute uniqueness cannot be guaranteed by comparisons using the `Type.Equals` method.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.DictionaryBase() constructor

```csharp
protected DictionaryBase ();
```

Initializes a new instance of the `DictionaryBase` class.

#### Remarks
This constructor is an `O(1)` operation.

## DictionaryBase.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `DictionaryBase` instance.

Returns: The number of elements contained in the `DictionaryBase` instance.

#### Remarks
Retrieving the value of this property is an `O(1)` operation.

## DictionaryBase.Dictionary property

```csharp
protected System.Collections.IDictionary Dictionary { get; }
```

Gets the list of elements contained in the `DictionaryBase` instance.

Returns: An `IDictionary` representing the `DictionaryBase` instance itself.

#### Remarks
The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.InnerHashtable property

```csharp
protected System.Collections.Hashtable InnerHashtable { get; }
```

Gets the list of elements contained in the `DictionaryBase` instance.

Returns: A `Hashtable` representing the `DictionaryBase` instance itself.

#### Remarks
The On* methods are invoked only on the instance returned by the `Dictionary` property, but not on the instance returned by the `InnerHashtable` property.

Retrieving the value of this property is an `O(1)` operation.

## DictionaryBase.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to a `DictionaryBase` object is synchronized (thread safe).

Returns: `true` if access to the `DictionaryBase` object is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
A `DictionaryBase` object is not synchronized. Derived classes can provide a synchronized version of the `DictionaryBase` class using the `SyncRoot` property.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## DictionaryBase.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to a `DictionaryBase` object.

Returns: An object that can be used to synchronize access to the `DictionaryBase` object.

#### Remarks
Derived classes can provide their own synchronized version of the `DictionaryBase` class using the `SyncRoot` property. The synchronizing code must perform operations on the `SyncRoot` property of the `DictionaryBase` object, not directly on the `DictionaryBase` object. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `DictionaryBase` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## DictionaryBase.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether a `DictionaryBase` object has a fixed size.

Returns: `true` if the `DictionaryBase` object has a fixed size; otherwise, `false`. The default is `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but does allow the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## DictionaryBase.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value indicating whether a `DictionaryBase` object is read-only.

Returns: `true` if the `DictionaryBase` object is read-only; otherwise, `false`. The default is `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## DictionaryBase.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get or set.

Returns: The value associated with the specified key. If the specified key is not found, attempting to get it returns `null`, and attempting to set it creates a new element using the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The property is set and the `DictionaryBase` is read-only.

-or-

The property is set, `key` does not exist in the collection, and the `DictionaryBase` has a fixed size.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]`.

You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `DictionaryBase`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `DictionaryBase`, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

Retrieving the value of this property is an `O(1)` operation; setting the property is also an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `String.Length` of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` object containing the keys in the `DictionaryBase` object.

Returns: An `ICollection` object containing the keys in the `DictionaryBase` object.

#### Remarks
The order of the keys in the `ICollection` object is unspecified, but is the same order as the associated values in the `ICollection` object returned by the `Values` property.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the keys in the original `DictionaryBase` object. Therefore, changes to the `DictionaryBase` continue to be reflected in the returned `ICollection`.

Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `Length` property of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` object containing the values in the `DictionaryBase` object.

Returns: An `ICollection` object containing the values in the `DictionaryBase` object.

#### Remarks
The order of the values in the `ICollection` object is unspecified, but is the same order as the associated keys in the `ICollection` object returned by the `Keys` property.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the values in the original `DictionaryBase` object. Therefore, changes to the `DictionaryBase` continue to be reflected in the returned `ICollection`.

Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following code example implements the `DictionaryBase` class and uses that implementation to create a dictionary of `String` keys and values that have a `Length` property of 5 characters or less.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryBase/Overview/dictionarybase.cs._

## DictionaryBase.Clear() method

```csharp
public void Clear ();
```

Clears the contents of the `DictionaryBase` instance.

#### Remarks
`DictionaryBase.Count` is set to zero, and references to other objects from elements of the collection are also released.

This method is an `O(n)` operation, where `n` is `DictionaryBase.Count`.

## DictionaryBase.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the `DictionaryBase` elements to a one-dimensional `Array` at the specified index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the `DictionaryEntry` objects copied from the `DictionaryBase` instance. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `DictionaryBase` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `DictionaryBase` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `DictionaryBase`.

This method is an `O(n)` operation, where `n` is `DictionaryBase.Count`.
