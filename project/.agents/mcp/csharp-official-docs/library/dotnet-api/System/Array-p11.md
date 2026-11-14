---
title: "Array class (part 11 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 11 of 18)

## Array.IndexOf<T>(T[], T) method

```csharp
public static int IndexOf<T> (T[] array, T value);
```

Searches for the specified object and returns the index of its first occurrence in a one-dimensional array.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based array to search.
- `value`: The object to locate in `array`.

Returns: The zero-based index of the first occurrence of `value` in the entire `array`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

#### Remarks
This method searches all the elements of a one-dimensional array for `value`. To determine whether `value` exists in `array`, the method performs an equality comparison by using the default equality comparer `Default`.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following example demonstrates all three generic overloads of the `Array.IndexOf` method. An array of strings is created, with one entry that appears twice, at index location 0 and index location 5. The `IndexOf<T>` method overload searches the array from the beginning, and finds the first occurrence of the string. The `IndexOf<T>` method overload is used to search the array beginning with index location 3 and continuing to the end of the array, and finds the second occurrence of the string. Finally, the `IndexOf<T>` method overload is used to search a range of two entries, beginning at index location two; it returns -1 because there are no instances of the search string in that range.

_Code sample not included: ~/snippets/csharp/System/Array/IndexOfT/source.cs._

## Array.IndexOf<T>(T[], T, Int32) method

```csharp
public static int IndexOf<T> (T[] array, T value, int startIndex);
```

Searches for the specified object in a range of elements of a one dimensional array, and returns the index of its first occurrence. The range extends from a specified index to the end of the array.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based array to search.
- `value`: The object to locate in `array`.
- `startIndex`: The zero-based starting index of the search. 0 (zero) is valid in an empty array.

Returns: The zero-based index of the first occurrence of `value` within the range of elements in `array` that extends from `startIndex` to the last element, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

#### Remarks
This method searches a one-dimensional array from the element at `startIndex` to the end of the array. To determine whether `value` exists in `array`, the method performs an equality comparison by using the default equality comparer `Default`.

If `startIndex` equals `Array.Length`,the method returns -1. If `startIndex` is greater than `Array.Length`, the method throws an `ArgumentOutOfRangeException`.

This method is an O(`n`) operation, where `n` is the number of elements from `startIndex` to the end of `array`.

#### Examples
The following example demonstrates all three generic overloads of the `Array.IndexOf` method. An array of strings is created, with one entry that appears twice, at index location 0 and index location 5. The `IndexOf<T>` method overload searches the array from the beginning, and finds the first occurrence of the string. The `IndexOf<T>` method overload is used to search the array beginning with index location 3 and continuing to the end of the array, and finds the second occurrence of the string. Finally, the `IndexOf<T>` method overload is used to search a range of two entries, beginning at index location two; it returns -1 because there are no instances of the search string in that range.

_Code sample not included: ~/snippets/csharp/System/Array/IndexOfT/source.cs._

## Array.IndexOf<T>(T[], T, Int32, Int32) method

```csharp
public static int IndexOf<T> (T[] array, T value, int startIndex, int count);
```

Searches for the specified object in a range of elements of a one-dimensional array, and returns the index of its first occurrence. The range extends from a specified index for a specified number of elements.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based array to search.
- `value`: The object to locate in `array`.
- `startIndex`: The zero-based starting index of the search. 0 (zero) is valid in an empty array.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the first occurrence of `value` within the range of elements in `array` that starts at `startIndex` and contains the number of elements specified in `count`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `array`.

#### Remarks
This method searches the elements of a one-dimensional array from `startIndex` to `startIndex` plus `count` minus 1, if `count` is greater than 0. To determine whether `value` exists in `array`, the method performs an equality comparison by using the default equality comparer `Default`.

If `startIndex` equals `Array.Length`, the method returns -1.  If `startIndex` is greater than `Array.Length`, the method throws an `ArgumentOutOfRangeException`.

This method is an O(`n`) operation, where `n` is `count`.

#### Examples
The following example demonstrates all three generic overloads of the `Array.IndexOf` method. An array of strings is created, with one entry that appears twice, at index location 0 and index location 5. The `IndexOf<T>` method overload searches the array from the beginning, and finds the first occurrence of the string. The `IndexOf<T>` method overload is used to search the array beginning with index location 3 and continuing to the end of the array, and finds the second occurrence of the string. Finally, the `IndexOf<T>` method overload is used to search a range of two entries, beginning at index location two; it returns -1 because there are no instances of the search string in that range.

_Code sample not included: ~/snippets/csharp/System/Array/IndexOfT/source.cs._

## Array.Initialize() method

```csharp
public void Initialize ();
```

Initializes every element of the value-type `Array` by calling the parameterless constructor of the value type.

#### Remarks
This method is designed to help compilers support value-type arrays; most users do not need this method. It must not be used on reference-type arrays.

If the `Array` is not a value-type `Array` or if the value type does not have a parameterless constructor, the `Array` is not modified.

The value-type `Array` can have any lower bound and any number of dimensions.

This method is an O(`n`) operation, where `n` is `Array.Length`.

## Array.LastIndexOf(Array, Object) method

```csharp
public static int LastIndexOf (Array array, object? value);
```

Searches for the specified object and returns the index of the last occurrence within the entire one-dimensional `Array`.

Parameters:

- `array`: The one-dimensional `Array` to search.
- `value`: The object to locate in `array`.

Returns: The index of the last occurrence of `value` within the entire `array`, if found; otherwise, the lower bound of the array minus 1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.

#### Remarks
The one-dimensional `Array` is searched backward starting at the last element and ending at the first element.

The elements are compared to the specified value using the `Object.Equals` method. If the element type is a nonintrinsic (user-defined) type, the `Equals` implementation of that type is used.

Since most arrays will have a lower bound of zero, this method would generally return -1 when `value` is not found. In the rare case that the lower bound of the array is equal to `MinValue` and `value` is not found, this method returns `MaxValue`, which is `System.Int32.MinValue - 1`.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

This method uses the `Object.Equals` and `IComparable.CompareTo` methods of the `Array` to determine whether the `Object` specified by the `value` parameter exists.

`IComparable.CompareTo` methods of the `item` parameter on the objects in the collection.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element in an array.

_Code sample not included: ~/snippets/csharp/System/Array/LastIndexOf/source.cs._

## Array.LastIndexOf(Array, Object, Int32) method

```csharp
public static int LastIndexOf (Array array, object? value, int startIndex);
```

Searches for the specified object and returns the index of the last occurrence within the range of elements in the one-dimensional `Array` that extends from the first element to the specified index.

Parameters:

- `array`: The one-dimensional `Array` to search.
- `value`: The object to locate in `array`.
- `startIndex`: The starting index of the backward search.

Returns: The index of the last occurrence of `value` within the range of elements in `array` that extends from the first element to `startIndex`, if found; otherwise, the lower bound of the array minus 1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.
- `RankException`: `array` is multidimensional.

#### Remarks
The one-dimensional `Array` is searched backward starting at `startIndex` and ending at the first element.

The elements are compared to the specified value using the `Object.Equals` method. If the element type is a nonintrinsic (user-defined) type, the `Equals` implementation of that type is used.

Since most arrays will have a lower bound of zero, this method would generally return -1 when `value` is not found. In the rare case that the lower bound of the array is equal to `MinValue` and `value` is not found, this method returns `MaxValue`, which is `System.Int32.MinValue - 1`.

This method is an O(`n`) operation, where `n` is the number of elements from the beginning of `array` to `startIndex`.

This method uses the `Object.Equals` and `IComparable.CompareTo` methods of the `Array` to determine whether the `Object` specified by the `value` parameter exists.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element in an array.

_Code sample not included: ~/snippets/csharp/System/Array/LastIndexOf/source.cs._

## Array.LastIndexOf(Array, Object, Int32, Int32) method

```csharp
public static int LastIndexOf (Array array, object? value, int startIndex, int count);
```

Searches for the specified object and returns the index of the last occurrence within the range of elements in the one-dimensional `Array` that contains the specified number of elements and ends at the specified index.

Parameters:

- `array`: The one-dimensional `Array` to search.
- `value`: The object to locate in `array`.
- `startIndex`: The starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The index of the last occurrence of `value` within the range of elements in `array` that contains the number of elements specified in `count` and ends at `startIndex`, if found; otherwise, the lower bound of the array minus 1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `array`.
- `RankException`: `array` is multidimensional.

#### Remarks
The one-dimensional `Array` is searched backward starting at `startIndex` and ending at `startIndex` minus `count` plus 1, if `count` is greater than 0.

The elements are compared to the specified value using the `Object.Equals` method. If the element type is a nonintrinsic (user-defined) type, the`Equals` implementation of that type is used.

Since most arrays will have a lower bound of zero, this method would generally return -1 when `value` is not found. In the rare case that the lower bound of the array is equal to `MinValue` and `value` is not found, this method returns `MaxValue`, which is `System.Int32.MinValue - 1`.

This method is an O(`n`) operation, where `n` is `count`.

This method uses the `Object.Equals` and `IComparable.CompareTo` methods of the `Array` to determine whether the `Object` specified by the `value` parameter exists.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element in an array. Note that the `Array.LastIndexOf` method is a backward search; therefore, `count` must be less than or equal to (`startIndex` minus the lower bound of the array plus 1).

_Code sample not included: ~/snippets/csharp/System/Array/LastIndexOf/source.cs._
