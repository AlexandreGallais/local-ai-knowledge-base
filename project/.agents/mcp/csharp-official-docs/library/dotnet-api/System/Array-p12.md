---
title: "Array class (part 12 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 12 of 18)

## Array.LastIndexOf<T>(T[], T) method

```csharp
public static int LastIndexOf<T> (T[] array, T value);
```

Searches for the specified object and returns the index of the last occurrence within the entire `Array`.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `value`: The object to locate in `array`.

Returns: The zero-based index of the last occurrence of `value` within the entire `array`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

#### Remarks
The `Array` is searched backward starting at the last element and ending at the first element.

The elements are compared to the specified value using the `Object.Equals` method. If the element type is a nonintrinsic (user-defined) type, the `Equals` implementation of that type is used.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following code example demonstrates all three generic overloads of the `Array.LastIndexOf` method. An array of strings is created, with one entry that appears twice, at index location 0 and index location 5. The `LastIndexOf<T>` method overload searches the entire array from the end, and finds the second occurrence of the string. The `LastIndexOf<T>` method overload is used to search the array backward beginning with index location 3 and continuing to the beginning of the array, and finds the first occurrence of the string. Finally, the `LastIndexOf<T>` method overload is used to search a range of four entries, beginning at index location 4 and extending backward (that is, it searches the items at locations 4, 3, 2, and 1); this search returns -1 because there are no instances of the search string in that range.

_Code sample not included: ~/snippets/csharp/System/Array/LastIndexOfT/source.cs._

## Array.LastIndexOf<T>(T[], T, Int32) method

```csharp
public static int LastIndexOf<T> (T[] array, T value, int startIndex);
```

Searches for the specified object and returns the index of the last occurrence within the range of elements in the `Array` that extends from the first element to the specified index.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `value`: The object to locate in `array`.
- `startIndex`: The zero-based starting index of the backward search.

Returns: The zero-based index of the last occurrence of `value` within the range of elements in `array` that extends from the first element to `startIndex`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

#### Remarks
The `Array` is searched backward starting at `startIndex` and ending at the first element.

The elements are compared to the specified value using the `Object.Equals` method. If the element type is a nonintrinsic (user-defined) type, the `Equals` implementation of that type is used.

This method is an O(`n`) operation, where `n` is the number of elements from the beginning of `array` to `startIndex`.

#### Examples
The following code example demonstrates all three generic overloads of the `Array.LastIndexOf` method. An array of strings is created, with one entry that appears twice, at index location 0 and index location 5. The `LastIndexOf<T>` method overload searches the entire array from the end, and finds the second occurrence of the string. The `LastIndexOf<T>` method overload is used to search the array backward beginning with index location 3 and continuing to the beginning of the array, and finds the first occurrence of the string. Finally, the `LastIndexOf<T>` method overload is used to search a range of four entries, beginning at index location 4 and extending backward (that is, it searches the items at locations 4, 3, 2, and 1); this search returns -1 because there are no instances of the search string in that range.

_Code sample not included: ~/snippets/csharp/System/Array/LastIndexOfT/source.cs._

## Array.LastIndexOf<T>(T[], T, Int32, Int32) method

```csharp
public static int LastIndexOf<T> (T[] array, T value, int startIndex, int count);
```

Searches for the specified object and returns the index of the last occurrence within the range of elements in the `Array` that contains the specified number of elements and ends at the specified index.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `value`: The object to locate in `array`.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the last occurrence of `value` within the range of elements in `array` that contains the number of elements specified in `count` and ends at `startIndex`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `array`.

#### Remarks
The `Array` is searched backward starting at `startIndex` and ending at `startIndex` minus `count` plus 1, if `count` is greater than 0.

The elements are compared to the specified value using the `Object.Equals` method. If the element type is a nonintrinsic (user-defined) type, the `Equals` implementation of that type is used.

This method is an O(`n`) operation, where `n` is `count`.

#### Examples
The following code example demonstrates all three generic overloads of the `Array.LastIndexOf` method. An array of strings is created, with one entry that appears twice, at index location 0 and index location 5. The `LastIndexOf<T>` method overload searches the entire array from the end, and finds the second occurrence of the string. The `LastIndexOf<T>` method overload is used to search the array backward beginning with index location 3 and continuing to the beginning of the array, and finds the first occurrence of the string. Finally, the `LastIndexOf<T>` method overload is used to search a range of four entries, beginning at index location 4 and extending backward (that is, it searches the items at locations 4, 3, 2, and 1); this search returns -1 because there are no instances of the search string in that range.

_Code sample not included: ~/snippets/csharp/System/Array/LastIndexOfT/source.cs._

## Array.Resize<T>(T[], Int32) method

```csharp
public static void Resize<T> (ref T[]? array, int newSize);
```

Changes the number of elements of a one-dimensional array to the specified new size.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based array to resize, or `null` to create a new array with the specified size.
- `newSize`: The size of the new array.

Exceptions:

- `ArgumentOutOfRangeException`: `newSize` is less than zero.

#### Remarks
This method allocates a new array with the specified size, copies elements from the old array to the new one, and then replaces the old array with the new one. `array` must be a one-dimensional array.

If `array` is `null`, this method creates a new array with the specified size.

If `newSize` is greater than the `Array.Length` of the old array, a new array is allocated and all the elements are copied from the old array to the new one.  If `newSize` is less than the `Array.Length` of the old array, a new array is allocated and elements are copied from the old array to the new one until the new one is filled; the rest of the elements in the old array are ignored.  If `newSize` is equal to the `Array.Length` of the old array, this method does nothing.

This method is an O(`n`) operation, where `n` is `newSize`.

The `Array.Resize` method resizes a one-dimensional array only. The `Array` class does not include a method for resizing multi-dimensional arrays. To do this, you must either provide your own code or call a special-purpose method in a third-party library. The following code illustrates one possible implementation for a method that resizes an array of *n* dimensions.

_Code sample not included: ~/snippets/csharp/System/Array/ResizeT/resizexd.cs._

#### Examples
The following example shows how resizing affects the array.

_Code sample not included: ~/snippets/csharp/System/Array/ResizeT/arrayresize.cs._

## Array.Reverse(Array) method

```csharp
public static void Reverse (Array array);
```

Reverses the sequence of the elements in the entire one-dimensional `Array`.

Parameters:

- `array`: The one-dimensional `Array` to reverse.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.

#### Remarks
After a call to this method, the element at `myArray[i]`, where `i` is any index in the array, moves to `myArray[j]`, where `j` equals `(myArray.Length + myArray.GetLowerBound(0)) - (i - myArray.GetLowerBound(0)) - 1`.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

In F#, the Array.rev function can be used instead.

As the following example shows, the `Array.Reverse` method can be used to reverse a jagged array. It initializes a jagged array with one element for each month of the current year in the current culture's calendar. Each element contains an array with as many elements as that month has days. The example displays the contents of the array, calls the `Array.Reverse` method, and then displays the contents of the reversed array.

_Code sample not included: ~/snippets/csharp/System/Array/Reverse/reversejagged.cs._

#### Examples
The following code example shows how to reverse the sort of the values in an `Array`.

_Code sample not included: ~/snippets/csharp/System/Array/Reverse/source.cs._

## Array.Reverse(Array, Int32, Int32) method

```csharp
public static void Reverse (Array array, int index, int length);
```

Reverses the sequence of a subset of the elements in the one-dimensional `Array`.

Parameters:

- `array`: The one-dimensional `Array` to reverse.
- `index`: The starting index of the section to reverse.
- `length`: The number of elements in the section to reverse.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.

#### Remarks
After a call to this method, the element at `myArray[i]`, where `i` is any index in the array, moves to `myArray[j]`, where `j` equals `(myArray.Length + myArray.GetLowerBound(0)) - (i - myArray.GetLowerBound(0)) - 1`.

The `Array.Reverse` method can be used to reverse a jagged array.

This method is an O(`n`) operation, where `n` is `length`.

#### Examples
The following code example shows how to reverse the sort of the values in a range of elements in an `Array`.

_Code sample not included: ~/snippets/csharp/System/Array/Reverse/source1.cs._

## Array.Reverse<T>(T[]) method

```csharp
public static void Reverse<T> (T[] array);
```

Reverses the sequence of the elements in the one-dimensional generic array.

Parameters:

- `T`: The type of the elements in `array`.
- `array`: The one-dimensional array of elements to reverse.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.

To be added.

## Array.Reverse<T>(T[], Int32, Int32) method

```csharp
public static void Reverse<T> (T[] array, int index, int length);
```

Reverses the sequence of a subset of the elements in the one-dimensional generic array.

Parameters:

- `T`: The type of the elements in `array`.
- `array`: The one-dimensional array of elements to reverse.
- `index`: The starting index of the section to reverse.
- `length`: The number of elements in the section to reverse.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.

To be added.

## Array.SetValue(Object, Int32) method

```csharp
public void SetValue (object? value, int index);
```

Sets a value to the element at the specified position in the one-dimensional `Array`. The index is specified as a 32-bit integer.

Parameters:

- `value`: The new value for the specified element.
- `index`: A 32-bit integer that represents the position of the `Array` element to set.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly one dimension.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `IndexOutOfRangeException`: `index` is outside the range of valid indexes for the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether the value of `index` is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.
