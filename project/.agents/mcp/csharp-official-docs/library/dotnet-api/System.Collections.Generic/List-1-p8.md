---
title: "List<T> class (part 8 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 8 of 9)

## List<T>.Sort() method

```csharp
public void Sort ();
```

Sorts the elements in the entire `List<T>` using the default comparer.

Exceptions:

- `InvalidOperationException`: The default comparer `Comparer<T>.Default` cannot find an implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type `T`.

#### Remarks
This method uses the default comparer `Comparer<T>.Default` for type `T` to determine the order of list elements. The `Default` property checks whether type `T` implements the `IComparable<T>` generic interface and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether type `T` implements the `IComparable` interface.  If type `T` does not implement either interface, `Comparer<T>.Default` throws an `InvalidOperationException`.

This method uses the `Array.Sort` method, which applies the introspective sort as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 log *n*, where *n* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(*n* log *n*) operation, where *n* is `List<T>.Count`.

#### Examples

The following example adds some names to a `List<String>` object, displays the list in unsorted order, calls the `List<T>.Sort` method, and then displays the sorted list.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Sort/Sort1.cs._

The following code demonstrates the `Sort` and `Sort` method overloads on a simple business object. Calling the `Sort` method results in the use of the default comparer for the Part type, and the `Sort` method is implemented by using an anonymous method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Sort/program.cs._

The following example demonstrates the `Sort` method overload and the `BinarySearch` method overload. A `List<T>` of strings is created and populated with four strings, in no particular order. The list is displayed, sorted, and displayed again.

The `BinarySearch` method overload is then used to search for two strings that are not in the list, and the `List<T>.Insert` method is used to insert them. The return value of the `List<T>.BinarySearch` method is negative in each case, because the strings are not in the list. Taking the bitwise complement (the ~ operator in C#, `Xor` -1 in Visual Basic) of this negative number produces the index of the first element in the list that is larger than the search string, and inserting at this location preserves the sort order. The second search string is larger than any element in the list, so the insertion position is at the end of the list.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/BinarySearch/source.cs._

## List<T>.Sort(IComparer<T>) method

```csharp
public void Sort (System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements in the entire `List<T>` using the specified comparer.

Parameters:

- `comparer`: The `IComparer<T>` implementation to use when comparing elements, or `null` to use the default comparer `Comparer<T>.Default`.

Exceptions:

- `InvalidOperationException`: `comparer` is `null`, and the default comparer `Comparer<T>.Default` cannot find implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type `T`.
- `ArgumentException`: The implementation of `comparer` caused an error during the sort. For example, `comparer` might not return 0 when comparing an item with itself.

#### Remarks
If `comparer` is provided, the elements of the `List<T>` are sorted using the specified `IComparer<T>` implementation.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` checks whether type `T` implements the `IComparable<T>` generic interface and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether type `T` implements the `IComparable` interface.  If type `T` does not implement either interface, `Comparer<T>.Default` throws an `InvalidOperationException`.

This method uses the `Array.Sort` method, which applies the introspective sort as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 log *n*, where *n* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(*n* log *n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `Sort` method overload and the `BinarySearch` method overload.

The example defines an alternative comparer for strings named DinoCompare, which implements the `IComparer<string>` (`IComparer(Of String)` in Visual Basic) generic interface. The comparer works as follows: First, the comparands are tested for `null`, and a null reference is treated as less than a non-null. Second, the string lengths are compared, and the longer string is deemed to be greater. Third, if the lengths are equal, ordinary string comparison is used.

A `List<T>` of strings is created and populated with four strings, in no particular order. The list is displayed, sorted using the alternate comparer, and displayed again.

The `BinarySearch` method overload is then used to search for several strings that are not in the list, employing the alternate comparer. The `List<T>.Insert` method is used to insert the strings. These two methods are located in the function named `SearchAndInsert`, along with code to take the bitwise complement (the ~ operator in C#, `Xor` -1 in Visual Basic) of the negative number returned by `BinarySearch` and use it as an index for inserting the new string.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/BinarySearch/source1.cs._

## List<T>.Sort(Comparison<T>) method

```csharp
public void Sort (Comparison<T> comparison);
```

Sorts the elements in the entire `List<T>` using the specified `Comparison<T>`.

Parameters:

- `comparison`: The `Comparison<T>` to use when comparing elements.

Exceptions:

- `ArgumentNullException`: `comparison` is `null`.
- `ArgumentException`: The implementation of `comparison` caused an error during the sort. For example, `comparison` might not return 0 when comparing an item with itself.

#### Remarks
If `comparison` is provided, the elements of the `List<T>` are sorted using the method represented by the delegate.

If `comparison` is `null`, an `ArgumentNullException` is thrown.

This method uses `Array.Sort`, which applies the introspective sort as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm

- If the number of partitions exceeds 2 log *n*, where *n* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(*n* log *n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following code demonstrates the `List<T>.Sort` and `List<T>.Sort` method overloads on a simple business object. Calling the `List<T>.Sort` method results in the use of the default comparer for the Part type, and the `List<T>.Sort` method is implemented using an anonymous method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Sort/program.cs._

The following example demonstrates the `Sort` method overload.

The example defines an alternative comparison method for strings, named `CompareDinosByLength`. This method works as follows: First, the comparands are tested for `null`, and a null reference is treated as less than a non-null. Second, the string lengths are compared, and the longer string is deemed to be greater. Third, if the lengths are equal, ordinary string comparison is used.

A `List<T>` of strings is created and populated with four strings, in no particular order. The list also includes an empty string and a null reference. The list is displayed, sorted using a `Comparison<T>` generic delegate representing the `CompareDinosByLength` method, and displayed again.

_Code sample not included: ~/snippets/csharp/System/ComparisonT/Overview/source.cs._

## List<T>.Sort(Int32, Int32, IComparer<T>) method

```csharp
public void Sort (int index, int count, System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements in a range of elements in `List<T>` using the specified comparer.

Parameters:

- `index`: The zero-based starting index of the range to sort.
- `count`: The length of the range to sort.
- `comparer`: The `IComparer<T>` implementation to use when comparing elements, or `null` to use the default comparer `Comparer<T>.Default`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `index` and `count` do not specify a valid range in the `List<T>`.

-or-

The implementation of `comparer` caused an error during the sort. For example, `comparer` might not return 0 when comparing an item with itself.
- `InvalidOperationException`: `comparer` is `null`, and the default comparer `Comparer<T>.Default` cannot find implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type `T`.

#### Remarks
If `comparer` is provided, the elements of the `List<T>` are sorted using the specified `IComparer<T>` implementation.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` checks whether type `T` implements the `IComparable<T>` generic interface and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether type `T` implements the `IComparable` interface.  If type `T` does not implement either interface, `Comparer<T>.Default` throws an `InvalidOperationException`.

This method uses `Array.Sort`, which applies the introspective sort as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm

- If the number of partitions exceeds 2 log *n*, where *n* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(*n* log *n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `Sort` method overload and the `BinarySearch` method overload.

The example defines an alternative comparer for strings named DinoCompare, which implements the `IComparer<string>` (`IComparer(Of String)` in Visual Basic) generic interface. The comparer works as follows: First, the comparands are tested for `null`, and a null reference is treated as less than a non-null. Second, the string lengths are compared, and the longer string is deemed to be greater. Third, if the lengths are equal, ordinary string comparison is used.

A `List<T>` of strings is created and populated with the names of five herbivorous dinosaurs and three carnivorous dinosaurs. Within each of the two groups, the names are not in any particular sort order. The list is displayed, the range of herbivores is sorted using the alternate comparer, and the list is displayed again.

The `BinarySearch` method overload is then used to search only the range of herbivores for "Brachiosaurus". The string is not found, and the bitwise complement (the ~ operator in C#, `Xor` -1 in Visual Basic) of the negative number returned by the `BinarySearch` method is used as an index for inserting the new string.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/BinarySearch/source2.cs._

## List<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator<T>` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

The `Current` property returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.
