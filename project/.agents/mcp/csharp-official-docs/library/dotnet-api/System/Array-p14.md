---
title: "Array class (part 14 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 14 of 18)

## Array.Sort(Array, IComparer) method

```csharp
public static void Sort (Array array, System.Collections.IComparer? comparer);
```

Sorts the elements in a one-dimensional `Array` using the specified `IComparer`.

Parameters:

- `array`: The one-dimensional array to sort.
- `comparer`: The implementation to use when comparing elements.

-or-

`null` to use the `IComparable` implementation of each element.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `InvalidOperationException`: `comparer` is `null`, and one or more elements in `array` do not implement the `IComparable` interface.
- `ArgumentException`: The implementation of `comparer` caused an error during the sort. For example, `comparer` might not return 0 when comparing an item with itself.

#### Remarks
If `comparer` is `null`, each element of `array` must implement the `IComparable` interface to be capable of comparisons with every other element in `array`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where  *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is the `Array.Length` of `array`.

.NET includes predefined `IComparer` implementations listed in the following table.

|Implementation|Description|
|--------------------|-----------------|
|`CaseInsensitiveComparer`|Compares any two objects, but performs a case-insensitive comparison of strings.|
|`Default`|Compares any two objects by using the sorting conventions of the current culture.|
|`DefaultInvariant`|Compares any two objects by using the sorting conventions of the invariant culture.|
|`Comparer<T>.Default`|Compares two objects of type `T` by using the type's default sort order.|

You can also support custom comparisons by providing an instance of your own `IComparer` implementation to the `comparer` parameter. The example does this by defining a `ReverseComparer` class that reverses the default sort order for instances of a type and performs case-insensitive string comparison.

#### Examples
The following example sorts the values in a string array by using the default comparer. It also defines a custom `IComparer` implementation named `ReverseComparer` that reverses an object's default sort order while performing a case-insensitive string comparison. Note that the output might vary depending on the current culture.

_Code sample not included: ~/snippets/csharp/System/Array/Sort/arraysort.cs._

## Array.Sort(Array, Array, IComparer) method

```csharp
public static void Sort (Array keys, Array? items, System.Collections.IComparer? comparer);
```

Sorts a pair of one-dimensional `Array` objects (one contains the keys and the other contains the corresponding items) based on the keys in the first `Array` using the specified `IComparer`.

Parameters:

- `keys`: The one-dimensional `Array` that contains the keys to sort.
- `items`: The one-dimensional `Array` that contains the items that correspond to each of the keys in the `keys``Array`.

-or-

`null` to sort only the `keys``Array`.
- `comparer`: The `IComparer` implementation to use when comparing elements.

-or-

`null` to use the `IComparable` implementation of each element.

Exceptions:

- `ArgumentNullException`: `keys` is `null`.
- `RankException`: The `keys``Array` is multidimensional.

-or-

The `items``Array` is multidimensional.
- `ArgumentException`: `items` is not `null`, and the length of `keys` is greater than the length of `items`.

-or-

The implementation of `comparer` caused an error during the sort. For example, `comparer` might not return 0 when comparing an item with itself.
- `InvalidOperationException`: `comparer` is `null`, and one or more elements in the `keys``Array` do not implement the `IComparable` interface.

#### Remarks
Each key in the `keys` `Array` has a corresponding item in the `items` `Array`. When a key is repositioned during the sorting, the corresponding item in the `items` `Array` is similarly repositioned. Therefore, the `items` `Array` is sorted according to the arrangement of the corresponding keys in the `keys` `Array`.

If `comparer` is `null`, each key in the `keys` `Array` must implement the `IComparable` interface to be capable of comparisons with every other key.

You can sort if there are more items than keys, but the items that have no corresponding keys will not be sorted. You cannot sort if there are more keys than items; doing this throws an `ArgumentException`.

If the sort is not successfully completed, the results are undefined.

.NET includes predefined `IComparer` implementations listed in the following table.

|Implementation|Description|
|--------------------|-----------------|
|`CaseInsensitiveComparer`|Compares any two objects, but performs a case-insensitive comparison of strings.|
|`Default`|Compares any two objects by using the sorting conventions of the current culture.|
|`DefaultInvariant`|Compares any two objects by using the sorting conventions of the invariant culture.|
|`Comparer<T>.Default`|Compares two objects of type `T` by using the type's default sort order.|

You can also support custom comparisons by providing an instance of your own `IComparer` implementation to the `comparer` parameter. The example does this by defining an `IComparer` implementation that reverses the default sort order and performs case-insensitive string comparison.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where  *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is the `Array.Length` of `keys`.

#### Examples
The following example shows how to sort two associated arrays where the first array contains the keys and the second array contains the values. Sorts are done using the default comparer and a custom comparer that reverses the sort order. Note that the result might vary depending on the current `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System/Array/Sort/arraysort2.cs._

## Array.Sort(Array, Int32, Int32) method

```csharp
public static void Sort (Array array, int index, int length);
```

Sorts the elements in a range of elements in a one-dimensional `Array` using the `IComparable` implementation of each element of the `Array`.

Parameters:

- `array`: The one-dimensional `Array` to sort.
- `index`: The starting index of the range to sort.
- `length`: The number of elements in the range to sort.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.
- `InvalidOperationException`: One or more elements in `array` do not implement the `IComparable` interface.

#### Remarks
Each element within the specified range of elements in `array` must implement the `IComparable` interface to be capable of comparisons with every other element in `array`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where  *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is `length`.

#### Examples
The following code example shows how to sort the values in an `Array` using the default comparer and a custom comparer that reverses the sort order. Note that the result might vary depending on the current `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System/Array/Sort/arraysort.cs._

## Array.Sort(Array, Array, Int32, Int32) method

```csharp
public static void Sort (Array keys, Array? items, int index, int length);
```

Sorts a range of elements in a pair of one-dimensional `Array` objects (one contains the keys and the other contains the corresponding items) based on the keys in the first `Array` using the `IComparable` implementation of each key.

Parameters:

- `keys`: The one-dimensional `Array` that contains the keys to sort.
- `items`: The one-dimensional `Array` that contains the items that correspond to each of the keys in the `keys``Array`.

-or-

`null` to sort only the `keys``Array`.
- `index`: The starting index of the range to sort.
- `length`: The number of elements in the range to sort.

Exceptions:

- `ArgumentNullException`: `keys` is `null`.
- `RankException`: The `keys``Array` is multidimensional.

-or-

The `items``Array` is multidimensional.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `keys`.

-or-

`length` is less than zero.
- `ArgumentException`: `items` is not `null`, and the length of `keys` is greater than the length of `items`.

-or-

`index` and `length` do not specify a valid range in the `keys``Array`.

-or-

`items` is not `null`, and `index` and `length` do not specify a valid range in the `items``Array`.
- `InvalidOperationException`: One or more elements in the `keys``Array` do not implement the `IComparable` interface.

#### Remarks
Each key in the `keys` `Array` has a corresponding item in the `items` `Array`. When a key is repositioned during the sorting, the corresponding item in the `items` `Array` is similarly repositioned. Therefore, the `items` `Array` is sorted according to the arrangement of the corresponding keys in the `keys` `Array`.

Each key <example-value> the specified range of elements in the `keys` `Array` must implement the `IComparable` interface to be capable of comparisons with every other key.

You can sort if there are more items than keys, but the items that have no corresponding keys will not be sorted. You cannot sort if there are more keys than items; doing this throws an `ArgumentException`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is `length`.

#### Examples
The following code example shows how to sort two associated arrays where the first array contains the keys and the second array contains the values. Sorts are done using the default comparer and a custom comparer that reverses the sort order. Note that the result might vary depending on the current `CultureInfo`.

_Code sample not included: ~/snippets/csharp/System/Array/Sort/arraysort2.cs._
