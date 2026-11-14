---
title: "StringCollection class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/StringCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringCollection class

Namespace: `System.Collections.Specialized`

```csharp
public class StringCollection : System.Collections.IList
```

Represents a collection of strings.

#### Remarks
`StringCollection` accepts `null` as a valid value and allows duplicate elements.

String comparisons are case-sensitive.

Elements in this collection can be accessed using an integer index.  Indexes in this collection are zero-based.

#### Examples
The following code example demonstrates several of the properties and methods of `StringCollection`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Overview/stringcollection.cs._

## StringCollection.StringCollection() constructor

```csharp
public StringCollection ();
```

Initializes a new instance of the `StringCollection` class.

#### Remarks
This constructor is an O(1) operation.

## StringCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of strings contained in the `StringCollection`.

Returns: The number of strings contained in the `StringCollection`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example copies a `StringCollection` to an array.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/CopyTo/stringcollectioncopyto.cs._

## StringCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `StringCollection` is read-only.

Returns: This property always returns `false`.

#### Remarks
`StringCollection` implements the `IsReadOnly` property because it is required by the `IList` interface.

A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

A `StringCollection` instance is always writable.

Retrieving the value of this property is an O(1) operation.

## StringCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `StringCollection` is synchronized (thread safe).

Returns: This property always returns `false`.

#### Remarks
`StringCollection` implements the `IsSynchronized` property because it is required by the `ICollection` interface.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `StringCollection.SyncRoot` during the entire enumeration:

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Overview/remarks.cs._

Retrieving the value of this property is an O(1) operation.

## StringCollection.Item property

```csharp
public string? this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the entry to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `StringCollection.Count`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

`StringCollection` accepts `null` as a valid value and allows duplicate elements.

The C# language uses the this keyword to define the indexers instead of implementing the `StringCollection.Item` property. Visual Basic <example-value> `StringCollection.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

## StringCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `StringCollection`.

Returns: An object that can be used to synchronize access to the `StringCollection`.

#### Remarks
Derived classes can provide their own synchronized version of the `StringCollection` using the `SyncRoot` property. The synchronizing code must perform operations on the `StringCollection.SyncRoot` of the `StringCollection`, not directly on the `StringCollection`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `StringCollection` object.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `StringCollection.SyncRoot` during the entire enumeration:

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Overview/remarks.cs._

Retrieving the value of this property is an O(1) operation.

## StringCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `StringCollection` object has a fixed size.

Returns: `true` if the `StringCollection` object has a fixed size; otherwise, `false`. The default is `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but does allow the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## StringCollection.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `StringCollection` object is read-only.

Returns: `true` if the `StringCollection` object is read-only; otherwise, `false`. The default is `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## StringCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `StringCollection.Count`.

#### Remarks
This method provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `StringCollection.System%23Collections%23IList%23Item` property. Visual Basic <example-value> `StringCollection.System%23Collections%23IList%23Item` as a default property, which provides the same indexing functionality.

`StringCollection` accepts `null` as a valid value and allows duplicate elements.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

## StringCollection.Add(String) method

```csharp
public int Add (string? value);
```

Adds a string to the end of the `StringCollection`.

Parameters:

- `value`: The string to add to the end of the `StringCollection`. The value can be `null`.

Returns: The zero-based index at which the new element is inserted.

#### Remarks
`StringCollection` accepts `null` as a valid value and allows duplicate elements.

If `StringCollection.Count` is less than the capacity, this method is an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `StringCollection.Count`.

#### Examples
The following code example adds new elements to the `StringCollection`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Add/stringcollectionadd.cs._

## StringCollection.AddRange(String[]) method

```csharp
public void AddRange (string?[] value);
```

Copies the elements of a string array to the end of the `StringCollection`.

Parameters:

- `value`: An array of strings to add to the end of the `StringCollection`. The array itself can not be `null` but it can contain elements that are `null`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
`StringCollection` accepts `null` as a valid value and allows duplicate elements.

If the `StringCollection` can accommodate the new elements without increasing the capacity, this method is an O(`n`) operation, where `n` is the number of elements to be added. If the capacity needs to be increased to accommodate the new elements, this method becomes an O(`n` + `m`) operation, where `n` is the number of elements to be added and `m` is `StringCollection.Count`.

#### Examples
The following code example adds new elements to the `StringCollection`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Add/stringcollectionadd.cs._

## StringCollection.Clear() method

```csharp
public void Clear ();
```

Removes all the strings from the `StringCollection`.

#### Remarks
`StringCollection.Count` is set to zero, and references to other objects from elements of the collection are also released.

This method is an O(`n`) operation, where `n` is `StringCollection.Count`.

#### Examples
The following code example removes elements from the `StringCollection`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Clear/stringcollectionremove.cs._

## StringCollection.Contains(String) method

```csharp
public bool Contains (string? value);
```

Determines whether the specified string is in the `StringCollection`.

Parameters:

- `value`: The string to locate in the `StringCollection`. The value can be `null`.

Returns: `true` if `value` is found in the `StringCollection`; otherwise, `false`.

#### Remarks
The `StringCollection.Contains` method can confirm the existence of a string before performing further operations.

This method determines equality by calling `Object.Equals`. String comparisons are case-sensitive.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `StringCollection.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example searches the `StringCollection` for an element.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Contains/stringcollectioncontains.cs._

## StringCollection.CopyTo(String[], Int32) method

```csharp
public void CopyTo (string?[] array, int index);
```

Copies the entire `StringCollection` values to a one-dimensional array of strings, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional array of strings that is the destination of the elements copied from `StringCollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `StringCollection` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `StringCollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

The elements are copied to the `Array` in the same order in which the enumerator of the `StringCollection` iterates through the `StringCollection`.

This method is an O(`n`) operation, where `n` is `StringCollection.Count`.

#### Examples
The following code example copies a `StringCollection` to an array.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/CopyTo/stringcollectioncopyto.cs._
