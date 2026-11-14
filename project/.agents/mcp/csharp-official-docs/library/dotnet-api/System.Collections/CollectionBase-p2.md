---
title: "CollectionBase class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/CollectionBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionBase class (part 2 of 3)

## CollectionBase.OnClear() method

```csharp
protected virtual void OnClear ();
```

Performs additional custom processes when clearing the contents of the `CollectionBase` instance.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the collection is cleared.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

If the process fails, the collection reverts back to its previous state.

The default implementation of this method is an `O(1)` operation.

## CollectionBase.OnClearComplete() method

```csharp
protected virtual void OnClearComplete ();
```

Performs additional custom processes after clearing the contents of the `CollectionBase` instance.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the collection is cleared.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

The default implementation of this method is an `O(1)` operation.

## CollectionBase.OnInsert(Int32, Object) method

```csharp
protected virtual void OnInsert (int index, object? value);
```

Performs additional custom processes before inserting a new element into the `CollectionBase` instance.

Parameters:

- `index`: The zero-based index at which to insert `value`.
- `value`: The new value of the element at `index`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the specified element is inserted.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

If the process fails, the collection reverts back to its previous state.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.OnInsertComplete(Int32, Object) method

```csharp
protected virtual void OnInsertComplete (int index, object? value);
```

Performs additional custom processes after inserting a new element into the `CollectionBase` instance.

Parameters:

- `index`: The zero-based index at which to insert `value`.
- `value`: The new value of the element at `index`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the specified element is inserted.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

The collection reverts back to its previous state if one of the following occurs:

- The process fails.

- This method is overridden to throw an exception.

The default implementation of this method is an `O(1)` operation.

## CollectionBase.OnRemove(Int32, Object) method

```csharp
protected virtual void OnRemove (int index, object? value);
```

Performs additional custom processes when removing an element from the `CollectionBase` instance.

Parameters:

- `index`: The zero-based index at which `value` can be found.
- `value`: The value of the element to remove from `index`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the specified element is removed.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

If the process fails, the collection reverts back to its previous state.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.OnRemoveComplete(Int32, Object) method

```csharp
protected virtual void OnRemoveComplete (int index, object? value);
```

Performs additional custom processes after removing an element from the `CollectionBase` instance.

Parameters:

- `index`: The zero-based index at which `value` can be found.
- `value`: The value of the element to remove from `index`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the specified element is removed.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

The collection reverts back to its previous state if one of the following occurs:

- The process fails.

- This method is overridden to throw an exception.

The default implementation of this method is an `O(1)` operation.

## CollectionBase.OnSet(Int32, Object, Object) method

```csharp
protected virtual void OnSet (int index, object? oldValue, object? newValue);
```

Performs additional custom processes before setting a value in the `CollectionBase` instance.

Parameters:

- `index`: The zero-based index at which `oldValue` can be found.
- `oldValue`: The value to replace with `newValue`.
- `newValue`: The new value of the element at `index`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action before the specified element is set.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

If the process fails, the collection reverts back to its previous state.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.OnSetComplete(Int32, Object, Object) method

```csharp
protected virtual void OnSetComplete (int index, object? oldValue, object? newValue);
```

Performs additional custom processes after setting a value in the `CollectionBase` instance.

Parameters:

- `index`: The zero-based index at which `oldValue` can be found.
- `oldValue`: The value to replace with `newValue`.
- `newValue`: The new value of the element at `index`.

#### Remarks
The default implementation of this method is intended to be overridden by a derived class to perform some action after the specified element is set.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

The collection reverts back to its previous state if one of the following occurs:

- The process fails.

- This method is overridden to throw an exception.

The default implementation of this method is an `O(1)` operation.

## CollectionBase.OnValidate(Object) method

```csharp
protected virtual void OnValidate (object value);
```

Performs additional custom processes when validating a value.

Parameters:

- `value`: The object to validate.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
The default implementation of this method determines whether `value` is `null`, and, if so, throws `ArgumentNullException`. It is intended to be overridden by a derived class to perform additional action when the specified element is validated.

The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

The default implementation of this method is an `O(1)` operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the element at the specified index of the `CollectionBase` instance. This method is not overridable.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `CollectionBase.Count`.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n)` operation, where `n` is `CollectionBase.Count`.

## CollectionBase.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the entire `CollectionBase` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `CollectionBase`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `CollectionBase` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `CollectionBase` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

This method is an `O(n)` operation, where `n` is `CollectionBase.Count`.

## CollectionBase.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an object to the end of the `CollectionBase`.

Parameters:

- `value`: The `Object` to be added to the end of the `CollectionBase`.

Returns: The `CollectionBase` index at which the `value` has been added.

Exceptions:

- `NotSupportedException`: The `CollectionBase` is read-only.

-or-

The `CollectionBase` has a fixed size.

#### Remarks
If `CollectionBase.Count` already equals the capacity, the capacity of the list is doubled by automatically reallocating the internal array and copying the existing elements to the new array before the new element is added.

If `CollectionBase.Count` is less than the capacity, this method is an `O(1)` operation. If the capacity needs to be increased to accommodate the new element, this method becomes an `O(n)` operation, where `n` is `CollectionBase.Count`.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the `CollectionBase` contains a specific element.

Parameters:

- `value`: The `Object` to locate in the `CollectionBase`.

Returns: `true` if the `CollectionBase` contains the specified `value`; otherwise, `false`.

#### Remarks
This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `CollectionBase.Count`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Searches for the specified `Object` and returns the zero-based index of the first occurrence within the entire `CollectionBase`.

Parameters:

- `value`: The `Object` to locate in the `CollectionBase`.

Returns: The zero-based index of the first occurrence of `value` within the entire `CollectionBase`, if found; otherwise, -1.

#### Remarks
This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `CollectionBase.Count`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._
