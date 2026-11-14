---
title: "List<T> class (part 3 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 3 of 9)

## List<T>.BinarySearch(T) method

```csharp
public int BinarySearch (T item);
```

Searches the entire sorted `List<T>` for an element using the default comparer and returns the zero-based index of the element.

Parameters:

- `item`: The object to locate. The value can be `null` for reference types.

Returns: The zero-based index of `item` in the sorted `List<T>`, if `item` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `item` or, if there is no larger element, the bitwise complement of `List<T>.Count`.

Exceptions:

- `InvalidOperationException`: The default comparer `Comparer<T>.Default` cannot find an implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type `T`.

#### Remarks
This method uses the default comparer `Comparer<T>.Default` for type `T` to determine the order of list elements. The `Default` property checks whether type `T` implements the `IComparable<T>` generic interface and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether type `T` implements the `IComparable` interface.  If type `T` does not implement either interface, `Comparer<T>.Default` throws an `InvalidOperationException`.

The `List<T>` must already be sorted according to the comparer implementation; otherwise, the result is incorrect.

Comparing `null` with any reference type is allowed and does not generate an exception when using the `IComparable<T>` generic interface. When sorting, `null` is considered to be less than any other object.

If the `List<T>` contains more than one element with the same value, the method returns only one of the occurrences, and it might return any one of the occurrences, not necessarily the first one.

If the `List<T>` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `List<T>`, this index should be used as the insertion point to maintain the sort order.

This method is an O(log *n*) operation, where *n* is the number of elements in the range.

#### Examples
The following example demonstrates the `Sort` method overload and the `BinarySearch` method overload. A `List<T>` of strings is created and populated with four strings, in no particular order. The list is displayed, sorted, and displayed again.

The `BinarySearch` method overload is then used to search for two strings that are not in the list, and the `List<T>.Insert` method is used to insert them. The return value of the `BinarySearch` method is negative in each case, because the strings are not in the list. Taking the bitwise complement (the ~ operator in C#, `Xor` -1 in Visual Basic) of this negative number produces the index of the first element in the list that is larger than the search string, and inserting at this location preserves the sort order. The second search string is larger than any element in the list, so the insertion position is at the end of the list.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/BinarySearch/source.cs._

## List<T>.BinarySearch(T, IComparer<T>) method

```csharp
public int BinarySearch (T item, System.Collections.Generic.IComparer<T>? comparer);
```

Searches the entire sorted `List<T>` for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `item`: The object to locate. The value can be `null` for reference types.
- `comparer`: The `IComparer<T>` implementation to use when comparing elements.

-or-

`null` to use the default comparer `Comparer<T>.Default`.

Returns: The zero-based index of `item` in the sorted `List<T>`, if `item` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `item` or, if there is no larger element, the bitwise complement of `List<T>.Count`.

Exceptions:

- `InvalidOperationException`: `comparer` is `null`, and the default comparer `Comparer<T>.Default` cannot find an implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type `T`.

#### Remarks
The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` instance as the comparer to perform case-insensitive string searches.

If `comparer` is provided, the elements of the `List<T>` are compared to the specified value using the specified `IComparer<T>` implementation.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` checks whether type `T` implements the `IComparable<T>` generic interface and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether type `T` implements the `IComparable` interface.  If type `T` does not implement either interface, `Comparer<T>.Default` throws `InvalidOperationException`.

The `List<T>` must already be sorted according to the comparer implementation; otherwise, the result is incorrect.

Comparing `null` with any reference type is allowed and does not generate an exception when using the `IComparable<T>` generic interface. When sorting, `null` is considered to be less than any other object.

If the `List<T>` contains more than one element with the same value, the method returns only one of the occurrences, and it might return any one of the occurrences, not necessarily the first one.

If the `List<T>` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `List<T>`, this index should be used as the insertion point to maintain the sort order.

This method is an O(log *n*) operation, where *n* is the number of elements in the range.

#### Examples
The following example demonstrates the `Sort` method overload and the `BinarySearch` method overload.

The example defines an alternative comparer for strings named DinoCompare, which implements the `IComparer<string>` (`IComparer(Of String)` in Visual Basic) generic interface. The comparer works as follows: First, the comparands are tested for `null`, and a null reference is treated as less than a non-null. Second, the string lengths are compared, and the longer string is deemed to be greater. Third, if the lengths are equal, ordinary string comparison is used.

A `List<T>` of strings is created and populated with four strings, in no particular order. The list is displayed, sorted using the alternate comparer, and displayed again.

The `BinarySearch` method overload is then used to search for several strings that are not in the list, employing the alternate comparer. The `List<T>.Insert` method is used to insert the strings. These two methods are located in the function named `SearchAndInsert`, along with code to take the bitwise complement (the ~ operator in C#, `Xor` -1 in Visual Basic) of the negative number returned by `BinarySearch` and use it as an index for inserting the new string.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/BinarySearch/source1.cs._

## List<T>.BinarySearch(Int32, Int32, T, IComparer<T>) method

```csharp
public int BinarySearch (int index, int count, T item, System.Collections.Generic.IComparer<T>? comparer);
```

Searches a range of elements in the sorted `List<T>` for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `index`: The zero-based starting index of the range to search.
- `count`: The length of the range to search.
- `item`: The object to locate. The value can be `null` for reference types.
- `comparer`: The `IComparer<T>` implementation to use when comparing elements, or `null` to use the default comparer `Comparer<T>.Default`.

Returns: The zero-based index of `item` in the sorted `List<T>`, if `item` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `item` or, if there is no larger element, the bitwise complement of `List<T>.Count`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `index` and `count` do not denote a valid range in the `List<T>`.
- `InvalidOperationException`: `comparer` is `null`, and the default comparer `Comparer<T>.Default` cannot find an implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type `T`.

#### Remarks
The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` instance as the comparer to perform case-insensitive string searches.

If `comparer` is provided, the elements of the `List<T>` are compared to the specified value using the specified `IComparer<T>` implementation.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` checks whether type `T` implements the `IComparable<T>` generic interface and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether type `T` implements the `IComparable` interface.  If type `T` does not implement either interface, `Comparer<T>.Default` throws `InvalidOperationException`.

The `List<T>` must already be sorted according to the comparer implementation; otherwise, the result is incorrect.

Comparing `null` with any reference type is allowed and does not generate an exception when using the `IComparable<T>` generic interface. When sorting, `null` is considered to be less than any other object.

If the `List<T>` contains more than one element with the same value, the method returns only one of the occurrences, and it might return any one of the occurrences, not necessarily the first one.

If the `List<T>` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `List<T>`, this index should be used as the insertion point to maintain the sort order.

This method is an O(log *n*) operation, where *n* is the number of elements in the range.

#### Examples
The following example demonstrates the `Sort` method overload and the `BinarySearch` method overload.

The example defines an alternative comparer for strings named DinoCompare, which implements the `IComparer<string>` (`IComparer(Of String)` in Visual Basic) generic interface. The comparer works as follows: First, the comparands are tested for `null`, and a null reference is treated as less than a non-null. Second, the string lengths are compared, and the longer string is deemed to be greater. Third, if the lengths are equal, ordinary string comparison is used.

A `List<T>` of strings is created and populated with the names of five herbivorous dinosaurs and three carnivorous dinosaurs. Within each of the two groups, the names are not in any particular sort order. The list is displayed, the range of herbivores is sorted using the alternate comparer, and the list is displayed again.

The `BinarySearch` method overload is then used to search only the range of herbivores for "Brachiosaurus". The string is not found, and the bitwise complement (the ~ operator in C#, `Xor` -1 in Visual Basic) of the negative number returned by the `BinarySearch` method is used as an index for inserting the new string.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/BinarySearch/source2.cs._

## List<T>.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `List<T>`.

#### Remarks
`List<T>.Count` is set to 0, and references to other objects from elements of the collection are also released.

`List<T>.Capacity` remains unchanged. To reset the capacity of the `List<T>`, call the `List<T>.TrimExcess` method or set the `Capacity` property directly. Decreasing the capacity reallocates memory and copies all the elements in the `List<T>`. Trimming an empty `List<T>` sets the capacity of the `List<T>` to the default capacity.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples

The following example demonstrates the `List<T>.Clear` method and various other properties and methods of the `List<T>` generic class. The `List<T>.Clear` method is used at the end of the program, to remove all items from the list, and the `List<T>.Capacity` and `List<T>.Count` properties are then displayed.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether an element is in the `List<T>`.

Parameters:

- `item`: The object to locate in the `List<T>`. The value can be `null` for reference types.

Returns: `true` if `item` is found in the `List<T>`; otherwise, `false`.

#### Remarks
This method determines equality using the default equality comparer `Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.Contains` and `List<T>.Exists` methods on a `List<T>` that contains a simple business object that implements `IEquatable<T>.Equals`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Contains/program1.cs._

The following example contains a list of complex objects of type `Cube`. The `Cube` class implements the `IEquatable<T>.Equals` method so that two cubes are considered equal if their dimensions are the same. In this example, the `List<T>.Contains` method returns `true`, because a cube that has the specified dimensions is already in the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Contains/program.cs._
