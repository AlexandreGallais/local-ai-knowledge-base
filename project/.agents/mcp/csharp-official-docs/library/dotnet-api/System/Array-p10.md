---
title: "Array class (part 10 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 10 of 18)

## Array.GetValue(Int32) method

```csharp
public object? GetValue (int index);
```

Gets the value at the specified position in the one-dimensional `Array`. The index is specified as a 32-bit integer.

Parameters:

- `index`: A 32-bit integer that represents the position of the `Array` element to get.

Returns: The value at the specified position in the one-dimensional `Array`.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly one dimension.
- `IndexOutOfRangeException`: `index` is outside the range of valid indexes for the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether the value of `index` is out of bounds.

This method is an O(1) operation.

## Array.GetValue(Int32[]) method

```csharp
public object? GetValue (params int[] indices);
```

Gets the value at the specified position in the multidimensional `Array`. The indexes are specified as an array of 32-bit integers.

Parameters:

- `indices`: A one-dimensional array of 32-bit integers that represent the indexes specifying the position of the `Array` element to get.

Returns: The value at the specified position in the multidimensional `Array`.

Exceptions:

- `ArgumentNullException`: `indices` is `null`.
- `ArgumentException`: The number of dimensions in the current `Array` is not equal to the number of elements in `indices`.
- `IndexOutOfRangeException`: Any element in `indices` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The number of elements in `indices` must equal the number of dimensions in the `Array`. All elements in the `indices` array must collectively specify the position of the desired element in the multidimensional `Array`.

The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

This method is an O(1) operation.

## Array.GetValue(Int64) method

```csharp
public object? GetValue (long index);
```

Gets the value at the specified position in the one-dimensional `Array`. The index is specified as a 64-bit integer.

Parameters:

- `index`: A 64-bit integer that represents the position of the `Array` element to get.

Returns: The value at the specified position in the one-dimensional `Array`.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly one dimension.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether the value of `index` is out of bounds.

This method is an O(1) operation.

## Array.GetValue(Int64[]) method

```csharp
public object? GetValue (params long[] indices);
```

Gets the value at the specified position in the multidimensional `Array`. The indexes are specified as an array of 64-bit integers.

Parameters:

- `indices`: A one-dimensional array of 64-bit integers that represent the indexes specifying the position of the `Array` element to get.

Returns: The value at the specified position in the multidimensional `Array`.

Exceptions:

- `ArgumentNullException`: `indices` is `null`.
- `ArgumentException`: The number of dimensions in the current `Array` is not equal to the number of elements in `indices`.
- `ArgumentOutOfRangeException`: Any element in `indices` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The number of elements in `indices` must equal the number of dimensions in the `Array`. All elements in the `indices` array must collectively specify the position of the desired element in the multidimensional `Array`.

The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

This method is an O(1) operation.

## Array.GetValue(Int32, Int32) method

```csharp
public object? GetValue (int index1, int index2);
```

Gets the value at the specified position in the two-dimensional `Array`. The indexes are specified as 32-bit integers.

Parameters:

- `index1`: A 32-bit integer that represents the first-dimension index of the `Array` element to get.
- `index2`: A 32-bit integer that represents the second-dimension index of the `Array` element to get.

Returns: The value at the specified position in the two-dimensional `Array`.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly two dimensions.
- `IndexOutOfRangeException`: Either `index1` or `index2` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

This method is an O(1) operation.

## Array.GetValue(Int64, Int64) method

```csharp
public object? GetValue (long index1, long index2);
```

Gets the value at the specified position in the two-dimensional `Array`. The indexes are specified as 64-bit integers.

Parameters:

- `index1`: A 64-bit integer that represents the first-dimension index of the `Array` element to get.
- `index2`: A 64-bit integer that represents the second-dimension index of the `Array` element to get.

Returns: The value at the specified position in the two-dimensional `Array`.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly two dimensions.
- `ArgumentOutOfRangeException`: Either `index1` or `index2` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

This method is an O(1) operation.

## Array.GetValue(Int32, Int32, Int32) method

```csharp
public object? GetValue (int index1, int index2, int index3);
```

Gets the value at the specified position in the three-dimensional `Array`. The indexes are specified as 32-bit integers.

Parameters:

- `index1`: A 32-bit integer that represents the first-dimension index of the `Array` element to get.
- `index2`: A 32-bit integer that represents the second-dimension index of the `Array` element to get.
- `index3`: A 32-bit integer that represents the third-dimension index of the `Array` element to get.

Returns: The value at the specified position in the three-dimensional `Array`.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly three dimensions.
- `IndexOutOfRangeException`: `index1` or `index2` or `index3` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

This method is an O(1) operation.

## Array.GetValue(Int64, Int64, Int64) method

```csharp
public object? GetValue (long index1, long index2, long index3);
```

Gets the value at the specified position in the three-dimensional `Array`. The indexes are specified as 64-bit integers.

Parameters:

- `index1`: A 64-bit integer that represents the first-dimension index of the `Array` element to get.
- `index2`: A 64-bit integer that represents the second-dimension index of the `Array` element to get.
- `index3`: A 64-bit integer that represents the third-dimension index of the `Array` element to get.

Returns: The value at the specified position in the three-dimensional `Array`.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly three dimensions.
- `ArgumentOutOfRangeException`: `index1` or `index2` or `index3` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

This method is an O(1) operation.

## Array.IndexOf(Array, Object) method

```csharp
public static int IndexOf (Array array, object? value);
```

Searches for the specified object and returns the index of its first occurrence in a one-dimensional array.

Parameters:

- `array`: The one-dimensional array to search.
- `value`: The object to locate in `array`.

Returns: The index of the first occurrence of `value` in `array`, if found; otherwise, the lower bound of the array minus 1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.

#### Remarks
This method searches all the elements of a one-dimensional array for `value`. To determine whether `value` exists in `array`, the method performs an equality comparison by using the default equality comparer `Default`.

Because most arrays have a lower bound of zero, this method generally returns -1 if`value` isn't found. In the rare case that the lower bound of the array is equal to `MinValue`(0x80000000) and `value` isn't found, this method returns `MaxValue` (0x7FFFFFFF).

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The example calls the following three overloads of the `Array.IndexOf` method to find the index of a string in a string array:

- `IndexOf`, to determine the first occurrence of the string "the" in a string array.

- `IndexOf`, to determine the first occurrence of the string "the" in the fourth to the last elements of a string array.

- `IndexOf`, to determine the first occurrence of the string "the" in a string array from the element that follows the last successful match to the end of the array.

_Code sample not included: ~/snippets/csharp/System/Array/IndexOf/source.cs._

## Array.IndexOf(Array, Object, Int32) method

```csharp
public static int IndexOf (Array array, object? value, int startIndex);
```

Searches for the specified object in a range of elements of a one-dimensional array, and returns the index of its first occurrence. The range extends from a specified index to the end of the array.

Parameters:

- `array`: The one-dimensional array to search.
- `value`: The object to locate in `array`.
- `startIndex`: The starting index of the search. 0 (zero) is valid in an empty array.

Returns: The index of the first occurrence of `value`, if it's found, within the range of elements in `array` that extends from `startIndex` to the last element; otherwise, the lower bound of the array minus 1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.
- `RankException`: `array` is multidimensional.

#### Remarks
This method searches a one-dimensional array from the element at index `startIndex` to the last element. To determine whether `value` exists in `array`, the method performs an equality comparison by using the default equality comparer `Default`.

Because most arrays have a lower bound of zero, this method generally returns -1 if `value` isn't found. In the rare case that the lower bound of the array is equal to `MinValue`(0x80000000) and `value` isn't found, this method returns `MaxValue` (0x7FFFFFFF).

If `startIndex` equals `Array.Length`,the method returns -1. If `startIndex` is greater than `Array.Length`, the method throws an `ArgumentOutOfRangeException`.

This method is an O(`n`) operation, where `n` is the number of elements from `startIndex` to the end of `array`.

#### Examples
The example calls the following three overloads of the `Array.IndexOf` method to find the index of a string in a string array:

- `IndexOf`, to determine the first occurrence of the string "the" in a string array.

- `IndexOf`, to determine the first occurrence of the string "the" in the fourth to the last elements of a string array.

- `IndexOf`, to determine the first occurrence of the string "the" in a string array from the element that follows the last successful match to the end of the array.

_Code sample not included: ~/snippets/csharp/System/Array/IndexOf/source.cs._

## Array.IndexOf(Array, Object, Int32, Int32) method

```csharp
public static int IndexOf (Array array, object? value, int startIndex, int count);
```

Searches for the specified object in a range of elements of a one-dimensional array, and returns the index of its first occurrence. The range extends from a specified index for a specified number of elements.

Parameters:

- `array`: The one-dimensional array to search.
- `value`: The object to locate in `array`.
- `startIndex`: The starting index of the search. 0 (zero) is valid in an empty array.
- `count`: The number of elements to search.

Returns: The index of the first occurrence of `value`, if it's found in the `array` from index `startIndex` to `startIndex` + `count` - 1; otherwise, the lower bound of the array minus 1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `array`.
- `RankException`: `array` is multidimensional.

#### Remarks
This method searches the elements of a one-dimensional array from `startIndex` to `startIndex` plus `count` minus 1, if `count` is greater than 0. To determine whether `value` exists in `array`, the method performs an equality comparison by using the default equality comparer `Default`.

Because most arrays have a lower bound of zero, this method generally returns -1 when `value` isn't found. In the rare case that the lower bound of the array is equal to `MinValue` (0x80000000) and `value` isn't found, this method returns `MaxValue` (0x7FFFFFFF).

If `startindex` equals `Array.Length`, the method returns -1. If `startIndex` is greater than `Array.Length`, the method throws an `ArgumentOutOfRangeException`.

This method is an O(`n`) operation, where `n` is `count`.

#### Examples
The example calls the following three overloads of the `Array.IndexOf` method to find the index of a string in a string array:

- `IndexOf`, to determine the first occurrence of the string "the" in a string array.

- `IndexOf`, to determine the first occurrence of the string "the" in the fourth to the last elements of a string array.

- `IndexOf`, to determine the first occurrence of the string "the" in a string array from the element that follows the last successful match to the end of the array. To determine the value of the `count` argument, it subtracts the upper bound of the array from the starting index and adds one.

_Code sample not included: ~/snippets/csharp/System/Array/IndexOf/source.cs._
