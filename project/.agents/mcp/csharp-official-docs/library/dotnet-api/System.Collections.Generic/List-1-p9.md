---
title: "List<T> class (part 9 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 9 of 9)

## List<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection` is greater than the available space from `arrayIndex` to the end of the destination `array`.

-or-

The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks

> **Note:**
> If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the nongeneric implementations of `ICollection.CopyTo` throw `InvalidCastException`, whereas the generic implementations throw `ArgumentException`.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

The `Current` property returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.

## List<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object item);
```

Adds an item to the `IList`.

Parameters:

- `item`: The `Object` to add to the `IList`.

Returns: The position into which the new element was inserted.

Exceptions:

- `ArgumentException`: `item` is of a type that is not assignable to the `IList`.

#### Remarks
If `List<T>.Count` is less than `List<T>.Capacity`, this method is an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object item);
```

Determines whether the `IList` contains a specific value.

Parameters:

- `item`: The `Object` to locate in the `IList`.

Returns: `true` if `item` is found in the `IList`; otherwise, `false`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object item);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `item`: The object to locate in the `IList`.

Returns: The index of `item` if found in the list; otherwise, -1.

Exceptions:

- `ArgumentException`: `item` is of a type that is not assignable to the `IList`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object item);
```

Inserts an item to the `IList` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the `IList`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `ArgumentException`: `item` is of a type that is not assignable to the `IList`.

#### Remarks
If `index` equals the number of items in the `IList`, then `item` is appended to the end.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object item);
```

Removes the first occurrence of a specific object from the `IList`.

Parameters:

- `item`: The object to remove from the `IList`.

Exceptions:

- `ArgumentException`: `item` is of a type that is not assignable to the `IList`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the elements of the `List<T>` to a new array.

Returns: An array containing copies of the elements of the `List<T>`.

#### Remarks
The elements are copied using `Array.Copy`, which is an O(*n*) operation, where *n* is `List<T>.Count`.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.ToArray` method and other methods of the `List<T>` class that act on ranges. At the end of the example, the `List<T>.GetRange` method is used to get three items from the list, beginning with index location 2. The `List<T>.ToArray` method is called on the resulting `List<T>`, creating an array of three elements. The elements of the array are displayed.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source1.cs._

## List<T>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity to the actual number of elements in the `List<T>`, if that number is less than a threshold value.

#### Remarks
This method can be used to minimize a collection's memory overhead if no new elements will be added to the collection. The cost of reallocating and copying a large `List<T>` can be considerable, however, so the `List<T>.TrimExcess` method does nothing if the list is at more than 90 percent of capacity. This avoids incurring a large reallocation cost for a relatively small gain.

> **Note:**
> The current threshold of 90 percent might change in future releases.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

To reset a `List<T>` to its initial state, call the `List<T>.Clear` method before calling the `List<T>.TrimExcess` method. Trimming an empty `List<T>` sets the capacity of the `List<T>` to the default capacity.

The capacity can also be set using the `Capacity` property.

#### Examples

The following example demonstrates how to check the capacity and count of a  `List<T>` that contains a simple business object, and illustrates using the `List<T>.TrimExcess` method to remove extra capacity.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Capacity/program.cs._

The following example demonstrates the `List<T>.TrimExcess` method. Several properties and methods of the `List<T>` class are used to add, insert, and remove items from a list of strings. Then the `List<T>.TrimExcess` method is used to reduce the capacity to match the count, and the `List<T>.Capacity` and `List<T>.Count` properties are displayed. If the unused capacity had been less than 10 percent of total capacity, the list would not have been resized. Finally, the contents of the list are cleared.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.TrueForAll(Predicate<T>) method

```csharp
public bool TrueForAll (Predicate<T> match);
```

Determines whether every element in the `List<T>` matches the conditions defined by the specified predicate.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions to check against the elements.

Returns: `true` if every element in the `List<T>` matches the conditions defined by the specified predicate; otherwise, `false`. If the list has no elements, the return value is `true`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate, and processing is stopped when the delegate returns `false` for any element. The elements are processed in order, and all calls are made on a single thread.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.TrueForAll` method and several other methods that use `Predicate<T>` generic delegate.

A `List<T>` of strings is created, containing 8 dinosaur names, two of which (at positions 1 and 5) end with "saurus". The example also defines a search predicate method named `EndsWithSaurus`, which accepts a string parameter and returns a Boolean value indicating whether the input string ends in "saurus".

The `List<T>.TrueForAll` method traverses the list from the beginning, passing each element in turn to the `EndsWithSaurus` method. The search stops when the `EndsWithSaurus` method returns `false`.

> **Note:**
> In C# and Visual Basic, it is not necessary to create the `Predicate<string>` delegate (`Predicate(Of String)` in Visual Basic) explicitly. These languages infer the correct delegate from context and create it automatically.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Exists/source.cs._
