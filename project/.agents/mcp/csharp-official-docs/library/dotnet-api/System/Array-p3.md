---
title: "Array class (part 3 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 3 of 18)

## Array.BinarySearch(Array, Int32, Int32, Object, IComparer) method

```csharp
public static int BinarySearch (Array array, int index, int length, object? value, System.Collections.IComparer? comparer);
```

Searches a range of elements in a one-dimensional sorted array for a value, using the specified `IComparer` interface.

Parameters:

- `array`: The sorted one-dimensional `Array` to search.
- `index`: The starting index of the range to search.
- `length`: The length of the range to search.
- `value`: The object to search for.
- `comparer`: The `IComparer` implementation to use when comparing elements.

-or-

`null` to use the `IComparable` implementation of each element.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.

-or-

`comparer` is `null`, and `value` is of a type that is not compatible with the elements of `array`.
- `InvalidOperationException`: `comparer` is `null`, `value` does not implement the `IComparable` interface, and the search encounters an element that does not implement the `IComparable` interface.

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If the `Array` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result  to produce an index. If this index is one greater than the upper bound of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` as the comparer to perform case-insensitive string searches.

If `comparer` is not `null`, the elements of `array` are compared to the specified value using the specified `IComparer` implementation. The elements of `array` must already be sorted in increasing value according to the sort order defined by `comparer`; otherwise, the result might be incorrect.

If `comparer` is `null`, the comparison is done using the `IComparable` implementation provided by the element itself or by the specified value. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable` implementation; otherwise, the result might be incorrect.

> **Note:**
> If `comparer` is `null` and `value` does not implement the `IComparable` interface, the elements of `array` are not tested for `IComparable` before the search begins. An exception is thrown if the search encounters an element that does not implement `IComparable`.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception when using `IComparable`.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable` implementation, even if `value` is `null`. That is, the `IComparable` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is `length`.

## Array.BinarySearch<T>(T[], T) method

```csharp
public static int BinarySearch<T> (T[] array, T value);
```

Searches an entire one-dimensional sorted array for a specific element, using the `IComparable<T>` generic interface implemented by each element of the `Array` and by the specified object.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The sorted one-dimensional, zero-based `Array` to search.
- `value`: The object to search for.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `InvalidOperationException`: `T` does not implement the `IComparable<T>` generic interface.

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If `array` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result  to produce an index. If this index is equal to the size of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

`T` must implement the `IComparable<T>` generic interface, which is used for comparisons. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable<T>` implementation; otherwise, the result might be incorrect.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable<T>` implementation, even if `value` is `null`. That is, the `IComparable<T>` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following code example demonstrates the `Sort<T>` generic method overload and the `BinarySearch<T>` generic method overload. An array of strings is created, in no particular order.

The array is displayed, sorted, and displayed again. Arrays must be sorted in order to use the `Array.BinarySearch` method.

> **Note:**
> The calls to the `Array.Sort` and `Array.BinarySearch` generic methods do not look any different from calls to their nongeneric counterparts, because Visual Basic, F#, C#, and C++ infer the type of the generic type parameter from the type of the first argument. If you use the Ildasm.exe (IL Disassembler) to examine the Microsoft intermediate language (MSIL), you can see that the generic methods are being called.

The `BinarySearch<T>` generic method overload is then used to search for two strings, one that is not in the array and one that is. The array and the return value of the `Array.BinarySearch` method are passed to the `ShowWhere` generic method (the `showWhere` function in the F# example), which displays the index value if the string is found, and otherwise the elements the search string would fall between if it were in the array. The index is negative if the string is not in the array, so the `ShowWhere` method takes the bitwise complement (the ~ operator in C#, the ~~~ operator in F#, `Xor`-1 in Visual Basic) to obtain the index of the first element in the list that is larger than the search string.

_Code sample not included: ~/snippets/csharp/System/Array/BinarySearchT/source.cs._

## Array.BinarySearch<T>(T[], T, IComparer<T>) method

```csharp
public static int BinarySearch<T> (T[] array, T value, System.Collections.Generic.IComparer<T>? comparer);
```

Searches an entire one-dimensional sorted array for a value using the specified `IComparer<T>` generic interface.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The sorted one-dimensional, zero-based `Array` to search.
- `value`: The object to search for.
- `comparer`: The `IComparer<T>` implementation to use when comparing elements.

-or-

`null` to use the `IComparable<T>` implementation of each element.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `comparer` is `null`, and `value` is of a type that is not compatible with the elements of `array`.
- `InvalidOperationException`: `comparer` is `null`, and `T` does not implement the `IComparable<T>` generic interface

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If the `Array` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result to produce an index. If this index is equal to the size of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` as the comparer to perform case-insensitive string searches.

If `comparer` is not `null`, the elements of `array` are compared to the specified value using the specified `IComparer<T>` generic interface implementation. The elements of `array` must already be sorted in increasing value according to the sort order defined by `comparer`; otherwise, the result might be incorrect.

If `comparer` is `null`, the comparison is done using the `IComparable<T>` generic interface implementation provided by `T`. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable<T>` implementation; otherwise, the result might be incorrect.

> **Note:**
> If `comparer` is `null` and `value` does not implement the `IComparable<T>` generic interface, the elements of `array` are not tested for `IComparable<T>` before the search begins. An exception is thrown if the search encounters an element that does not implement `IComparable<T>`.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable<T>` implementation, even if `value` is `null`. That is, the `IComparable<T>` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following example demonstrates the `Sort<T>` generic method overload and the `BinarySearch<T>` generic method overload.

The code example defines an alternative comparer for strings, named `ReverseCompare`, which implements the `IComparer<string>` (`IComparer(Of String)` in Visual Basic) generic interface. The comparer calls the `CompareTo` method, reversing the order of the comparands so that the strings sort high-to-low instead of low-to-high.

The array is displayed, sorted, and displayed again. Arrays must be sorted in order to use the `Array.BinarySearch` method.

> **Note:**
> The calls to the `Sort<T>` and `BinarySearch<T>` generic methods do not look any different from calls to their nongeneric counterparts, because Visual Basic, C#, and C++ infer the type of the generic type parameter from the type of the first argument. If you use the Ildasm.exe (IL Disassembler) to examine the Microsoft intermediate language (MSIL), you can see that the generic methods are being called.

The `BinarySearch<T>` generic method overload is then used to search for two strings, one that is not in the array and one that is. The array and the return value of the `BinarySearch<T>` method are passed to the `ShowWhere` generic method (the `showWhere` function in the F# example), which displays the index value if the string is found, and otherwise the elements the search string would fall between if it were in the array. The index is negative if the string is not n the array, so the `ShowWhere` method takes the bitwise complement (the ~ operator in C#, the ~~~ operator in F#, `Xor` -1 in Visual Basic) to obtain the index of the first element in the list that is larger than the search string.

_Code sample not included: ~/snippets/csharp/System/Array/BinarySearchT/source1.cs._
