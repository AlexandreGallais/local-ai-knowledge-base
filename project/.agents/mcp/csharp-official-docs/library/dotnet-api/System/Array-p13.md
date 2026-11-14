---
title: "Array class (part 13 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 13 of 18)

## Array.SetValue(Object, Int32[]) method

```csharp
public void SetValue (object? value, params int[] indices);
```

Sets a value to the element at the specified position in the multidimensional `Array`. The indexes are specified as an array of 32-bit integers.

Parameters:

- `value`: The new value for the specified element.
- `indices`: A one-dimensional array of 32-bit integers that represent the indexes specifying the position of the element to set.

Exceptions:

- `ArgumentNullException`: `indices` is `null`.
- `ArgumentException`: The number of dimensions in the current `Array` is not equal to the number of elements in `indices`.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `IndexOutOfRangeException`: Any element in `indices` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The number of elements in `indices` must equal the number of dimensions in the `Array`. All elements in the `indices` array must collectively specify the position of the desired element in the multidimensional `Array`.

The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the values in the `indices` array is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.

## Array.SetValue(Object, Int64) method

```csharp
public void SetValue (object? value, long index);
```

Sets a value to the element at the specified position in the one-dimensional `Array`. The index is specified as a 64-bit integer.

Parameters:

- `value`: The new value for the specified element.
- `index`: A 64-bit integer that represents the position of the `Array` element to set.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly one dimension.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether the value of `index` is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.

## Array.SetValue(Object, Int64[]) method

```csharp
public void SetValue (object? value, params long[] indices);
```

Sets a value to the element at the specified position in the multidimensional `Array`. The indexes are specified as an array of 64-bit integers.

Parameters:

- `value`: The new value for the specified element.
- `indices`: A one-dimensional array of 64-bit integers that represent the indexes specifying the position of the element to set.

Exceptions:

- `ArgumentNullException`: `indices` is `null`.
- `ArgumentException`: The number of dimensions in the current `Array` is not equal to the number of elements in `indices`.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `ArgumentOutOfRangeException`: Any element in `indices` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The number of elements in `indices` must equal the number of dimensions in the `Array`. All elements in the `indices` array must collectively specify the position of the desired element in the multidimensional `Array`.

The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the values in the `indices` array is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.

## Array.SetValue(Object, Int32, Int32) method

```csharp
public void SetValue (object? value, int index1, int index2);
```

Sets a value to the element at the specified position in the two-dimensional `Array`. The indexes are specified as 32-bit integers.

Parameters:

- `value`: The new value for the specified element.
- `index1`: A 32-bit integer that represents the first-dimension index of the `Array` element to set.
- `index2`: A 32-bit integer that represents the second-dimension index of the `Array` element to set.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly two dimensions.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `IndexOutOfRangeException`: Either `index1` or `index2` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.

## Array.SetValue(Object, Int64, Int64) method

```csharp
public void SetValue (object? value, long index1, long index2);
```

Sets a value to the element at the specified position in the two-dimensional `Array`. The indexes are specified as 64-bit integers.

Parameters:

- `value`: The new value for the specified element.
- `index1`: A 64-bit integer that represents the first-dimension index of the `Array` element to set.
- `index2`: A 64-bit integer that represents the second-dimension index of the `Array` element to set.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly two dimensions.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `ArgumentOutOfRangeException`: Either `index1` or `index2` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.

## Array.SetValue(Object, Int32, Int32, Int32) method

```csharp
public void SetValue (object? value, int index1, int index2, int index3);
```

Sets a value to the element at the specified position in the three-dimensional `Array`. The indexes are specified as 32-bit integers.

Parameters:

- `value`: The new value for the specified element.
- `index1`: A 32-bit integer that represents the first-dimension index of the `Array` element to set.
- `index2`: A 32-bit integer that represents the second-dimension index of the `Array` element to set.
- `index3`: A 32-bit integer that represents the third-dimension index of the `Array` element to set.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly three dimensions.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `IndexOutOfRangeException`: `index1` or `index2` or `index3` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.

## Array.SetValue(Object, Int64, Int64, Int64) method

```csharp
public void SetValue (object? value, long index1, long index2, long index3);
```

Sets a value to the element at the specified position in the three-dimensional `Array`. The indexes are specified as 64-bit integers.

Parameters:

- `value`: The new value for the specified element.
- `index1`: A 64-bit integer that represents the first-dimension index of the `Array` element to set.
- `index2`: A 64-bit integer that represents the second-dimension index of the `Array` element to set.
- `index3`: A 64-bit integer that represents the third-dimension index of the `Array` element to set.

Exceptions:

- `ArgumentException`: The current `Array` does not have exactly three dimensions.
- `InvalidCastException`: `value` cannot be cast to the element type of the current `Array`.
- `ArgumentOutOfRangeException`: `index1` or `index2` or `index3` is outside the range of valid indexes for the corresponding dimension of the current `Array`.

#### Remarks
The `Array.GetLowerBound` and `Array.GetUpperBound` methods can determine whether any of the indexes is out of bounds.

For more information about conversions, see `Convert`.

This method is an O(1) operation.

> **Note:**
> If `Array.SetValue` is used to assign `null` to an element of an array of value types, all fields of the element are initialized to zero. The value of the element is not a null reference, and cannot be found by searching for a null reference.

## Array.Sort(Array) method

```csharp
public static void Sort (Array array);
```

Sorts the elements in an entire one-dimensional `Array` using the `IComparable` implementation of each element of the `Array`.

Parameters:

- `array`: The one-dimensional `Array` to sort.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `InvalidOperationException`: One or more elements in `array` do not implement the `IComparable` interface.

#### Remarks
Each element of `array` must implement the `IComparable` interface to be capable of comparisons with every other element in `array`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following code example shows how to sort the values in an `Array` using the default comparer and a custom comparer that reverses the sort order. Note that the result might vary depending on the current `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System/Array/Sort/arraysort.cs._

## Array.Sort(Array, Array) method

```csharp
public static void Sort (Array keys, Array? items);
```

Sorts a pair of one-dimensional `Array` objects (one contains the keys and the other contains the corresponding items) based on the keys in the first `Array` using the `IComparable` implementation of each key.

Parameters:

- `keys`: The one-dimensional `Array` that contains the keys to sort.
- `items`: The one-dimensional `Array` that contains the items that correspond to each of the keys in the `keys``Array`.

-or-

`null` to sort only the `keys``Array`.

Exceptions:

- `ArgumentNullException`: `keys` is `null`.
- `RankException`: The `keys``Array` is multidimensional.

-or-

The `items``Array` is multidimensional.
- `ArgumentException`: `items` is not `null`, and the length of `keys` is greater than the length of `items`.
- `InvalidOperationException`: One or more elements in the `keys``Array` do not implement the `IComparable` interface.

#### Remarks
Each key in the `keys` `Array` has a corresponding item in the `items` `Array`. When a key is repositioned during the sorting, the corresponding item in the `items` `Array` is similarly repositioned. Therefore, the `items` `Array` is sorted according to the arrangement of the corresponding keys in the `keys` `Array`.

Each key in the `keys` `Array` must implement the `IComparable` interface to be capable of comparisons with every other key.

You can sort if there are more items than keys, but the items that have no corresponding keys will not be sorted. You cannot sort if there are more keys than items; doing this throws an `ArgumentException`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is the `Array.Length` of `keys`.

#### Examples
The following example shows how to sort two associated arrays where the first array contains the keys and the second array contains the values. Sorts are done using the default comparer and a custom comparer that reverses the sort order. Note that the result might vary depending on the current `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System/Array/Sort/arraysort2.cs._
