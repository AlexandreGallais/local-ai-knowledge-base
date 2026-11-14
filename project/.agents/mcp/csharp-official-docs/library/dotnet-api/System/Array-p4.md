---
title: "Array class (part 4 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 4 of 18)

## Array.BinarySearch<T>(T[], Int32, Int32, T) method

```csharp
public static int BinarySearch<T> (T[] array, int index, int length, T value);
```

Searches a range of elements in a one-dimensional sorted array for a value, using the `IComparable<T>` generic interface implemented by each element of the `Array` and by the specified value.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The sorted one-dimensional, zero-based `Array` to search.
- `index`: The starting index of the range to search.
- `length`: The length of the range to search.
- `value`: The object to search for.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.

-or-

`value` is of a type that is not compatible with the elements of `array`.
- `InvalidOperationException`: `T` does not implement the `IComparable<T>` generic interface.

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If the array does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result  to produce an index. If this index is equal to the size of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

`T` must implement the `IComparable<T>` generic interface, which is used for comparisons. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable<T>` implementation; otherwise, the result might be incorrect.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable<T>` implementation, even if `value` is `null`. That is, the `IComparable<T>` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is `length`.

## Array.BinarySearch<T>(T[], Int32, Int32, T, IComparer<T>) method

```csharp
public static int BinarySearch<T> (T[] array, int index, int length, T value, System.Collections.Generic.IComparer<T>? comparer);
```

Searches a range of elements in a one-dimensional sorted array for a value, using the specified `IComparer<T>` generic interface.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The sorted one-dimensional, zero-based `Array` to search.
- `index`: The starting index of the range to search.
- `length`: The length of the range to search.
- `value`: The object to search for.
- `comparer`: The `IComparer<T>` implementation to use when comparing elements.

-or-

`null` to use the `IComparable<T>` implementation of each element.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.

-or-

`comparer` is `null`, and `value` is of a type that is not compatible with the elements of `array`.
- `InvalidOperationException`: `comparer` is `null`, and `T` does not implement the `IComparable<T>` generic interface.

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If the array does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result  to produce an index. If this index is equal to the size of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` as the comparer to perform case-insensitive string searches.

If `comparer` is not `null`, the elements of `array` are compared to the specified value using the specified `IComparer<T>` generic interface implementation. The elements of `array` must already be sorted in increasing value according to the sort order defined by `comparer`; otherwise, the result might be incorrect.

If `comparer` is `null`, the comparison is done using the `IComparable<T>` generic interface implementation provided for type `T`. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable<T>` implementation; otherwise, the result might be incorrect.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception when using `IComparable<T>`.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable<T>` implementation, even if `value` is `null`. That is, the `IComparable<T>` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is `length`.

## Array.Clear(Array) method

```csharp
public static void Clear (Array array);
```

Clears the contents of an array.

Parameters:

- `array`: The array to clear.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

To be added.

## Array.Clear(Array, Int32, Int32) method

```csharp
public static void Clear (Array array, int index, int length);
```

Sets a range of elements in an array to the default value of each element type.

Parameters:

- `array`: The array whose elements need to be cleared.
- `index`: The starting index of the range of elements to clear.
- `length`: The number of elements to clear.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `IndexOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.

-or-

The sum of `index` and `length` is greater than the size of `array`.

#### Remarks
This method resets each element in an array to the element type's default value. It sets elements of reference types (including `String` elements) to `null`, and sets elements of value types to the default values shown in the following table.

|Type|Value|
|----------|-----------|
|`Boolean`|`false`|
|All integral and floating point numeric types|0 (zero)|
|`DateTime`|`MinValue`|
|Other value types|Default value of the type's fields|

The range of cleared elements wrap from row to row in a multi-dimensional array.

This method only clears the values of the elements; it does not delete the elements themselves. An array has a fixed size; therefore, elements can't be added or removed.

This method is an $O(n)$ operation, where $n$ is `length`.

#### Examples
The following example uses the `Array.Clear` method to reset integer values in a one-dimensional, two-dimensional, and three-dimensional array.

_Code sample not included: ~/snippets/csharp/System/Array/Clear/example.cs._

The following example defines a `TimeZoneTime` structure that includes a `TimeZoneInfo` field and a `DateTimeOffset` field. It then calls the `Array.Clear` method to clear one element in a two-element array of `TimeZoneTime` values. The method sets the value of the cleared element to the default value of a `TimeZoneInfo` object, which is `null`, and the default value of a `DateTimeOffset` object, which is `MinValue`.

_Code sample not included: ~/snippets/csharp/System/Array/Clear/clearstruct1.cs._

## Array.Clone() method

```csharp
public object Clone ();
```

Creates a shallow copy of the `Array`.

Returns: A shallow copy of the `Array`.

#### Remarks
A shallow copy of an `Array` copies only the elements of the `Array`, whether they are reference types or value types, but it does not copy the objects that the references refer to. The references in the new `Array` point to the same objects that the references in the original `Array` point to.

In contrast, a deep copy of an `Array` copies the elements and everything directly or indirectly referenced by the elements.

The clone is of the same `Type` as the original `Array`.

This method is an O(`n`) operation, where `n` is `Array.Length`.

#### Examples
The following code example clones a `CultureInfo` array and demonstrates the behavior of a shallow copy.

_Code sample not included: ~/snippets/csharp/System/Array/Clone/arrayclone.cs._

## Array.ConstrainedCopy(Array, Int32, Array, Int32, Int32) method

```csharp
public static void ConstrainedCopy (Array sourceArray, int sourceIndex, Array destinationArray, int destinationIndex, int length);
```

Copies a range of elements from an `Array` starting at the specified source index and pastes them to another `Array` starting at the specified destination index.  Guarantees that all changes are undone if the copy does not succeed completely.

Parameters:

- `sourceArray`: The `Array` that contains the data to copy.
- `sourceIndex`: A 32-bit integer that represents the index in `sourceArray` at which copying begins.
- `destinationArray`: The `Array` that receives the data.
- `destinationIndex`: A 32-bit integer that represents the index in `destinationArray` at which storing begins.
- `length`: A 32-bit integer that represents the number of elements to copy.

Exceptions:

- `ArgumentNullException`: `sourceArray` is `null`.

-or-

`destinationArray` is `null`.
- `RankException`: `sourceArray` and `destinationArray` have different ranks.
- `ArrayTypeMismatchException`: The `sourceArray` type is neither the same as nor derived from the `destinationArray` type.
- `InvalidCastException`: At least one element in `sourceArray` cannot be cast to the type of `destinationArray`.
- `ArgumentOutOfRangeException`: `sourceIndex` is less than the lower bound of the first dimension of `sourceArray`.

-or-

`destinationIndex` is less than the lower bound of the first dimension of `destinationArray`.

-or-

`length` is less than zero.
- `ArgumentException`: `length` is greater than the number of elements from `sourceIndex` to the end of `sourceArray`.

-or-

`length` is greater than the number of elements from `destinationIndex` to the end of `destinationArray`.

#### Remarks
The `sourceArray` and `destinationArray` parameters must have the same number of dimensions.  The `sourceArray` type must be the same as or derived from the `destinationArray` type; otherwise, an `ArrayTypeMismatchException` is thrown.  Unlike `Array.Copy`, `Array.ConstrainedCopy` verifies the compatibility of the array types before performing any operation.

When copying between multidimensional arrays, the array behaves like a long one-dimensional array, where the rows (or columns) are conceptually laid end-to-end. For example, if an array has three rows (or columns) with four elements each, copying six elements from the beginning of the array would copy all four elements of the first row (or column) and the first two elements of the second row (or column). To start copying from the second element of the third row (or column), `sourceIndex` must be the upper bound of the first row (or column) plus the length of the second row (or column) plus two.

If `sourceArray` and `destinationArray` overlap, this method behaves as if the original values of `sourceArray` were preserved in a temporary location before `destinationArray` is overwritten.

[C++]

This method is equivalent to the standard C/C++ function `memmove`, not `memcpy`.

The arrays can be reference-type or value-type arrays.  If `sourceArray` and `destinationArray` are both reference-type arrays or are both arrays of type `Object`, a shallow copy is performed. A shallow copy of an `Array` is a new `Array` containing references to the same elements as the original `Array`. The elements themselves or anything referenced by the elements are not copied. In contrast, a deep copy of an `Array` copies the elements and everything directly or indirectly referenced by the elements.

If this method throws an exception while copying, the `destinationArray` remains unchanged.

This method is an $O(n)$ operation, where $n$ is `length`.
