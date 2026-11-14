---
title: "Array class (part 17 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 17 of 18)

## Array.Sort<TKey,TValue>(TKey[], TValue[], IComparer<TKey>) method

```csharp
public static void Sort<TKey,TValue> (TKey[] keys, TValue[]? items, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts a pair of `Array` objects (one contains the keys and the other contains the corresponding items) based on the keys in the first `Array` using the specified `IComparer<T>` generic interface.

Parameters:

- `TKey`: The type of the elements of the key array.
- `TValue`: The type of the elements of the items array.
- `keys`: The one-dimensional, zero-based `Array` that contains the keys to sort.
- `items`: The one-dimensional, zero-based `Array` that contains the items that correspond to the keys in `keys`, or `null` to sort only `keys`.
- `comparer`: The `IComparer<T>` generic interface implementation to use when comparing elements, or `null` to use the `IComparable<T>` generic interface implementation of each element.

Exceptions:

- `ArgumentNullException`: `keys` is `null`.
- `ArgumentException`: `items` is not `null`, and the lower bound of `keys` does not match the lower bound of `items`.

-or-

`items` is not `null`, and the length of `keys` is greater than the length of `items`.

-or-

The implementation of `comparer` caused an error during the sort. For example, `comparer` might not return 0 when comparing an item with itself.
- `InvalidOperationException`: `comparer` is `null`, and one or more elements in the `keys``Array` do not implement the `IComparable<T>` generic interface.

#### Remarks
Each key in the `keys` `Array` has a corresponding item in the `items` `Array`. When a key is repositioned during the sorting, the corresponding item in the `items` `Array` is similarly repositioned. Therefore, the `items` `Array` is sorted according to the arrangement of the corresponding keys in the `keys` `Array`.

If `comparer` is `null`, each key in the `keys` `Array` must implement the `IComparable<T>` generic interface to be capable of comparisons with every other key.

You can sort if there are more items than keys, but the items that have no corresponding keys will not be sorted. You cannot sort if there are more keys than items; doing this throws an `ArgumentException`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where  *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following code example demonstrates the `Sort<T1,T2>`, [\], `Sort<T1,T2>`, `Sort<T1,T2>`, and `Sort<T1,T2>` generic method overloads, for sorting pairs of arrays that represent keys and values.

The code example defines an alternative comparer for strings, named `ReverseCompare`, which implements the `IComparer<string>` (`IComparer(Of String)` in Visual Basic) generic interface. The comparer calls the `CompareTo` method, reversing the order of the comparands so that the strings sort high-to-low instead of low-to-high.

The code example creates and displays an array of dinosaur names (the keys) and an array of integers representing the maximum length of each dinosaur in meters (the values). The arrays are then sorted and displayed several times:

- The `Sort<T1,T2>` overload is used to sort both arrays in order of the dinosaur names in the first array.
- The `Sort<T1,T2>` overload and an instance of `ReverseCompare` are used to reverse the sort order of the paired arrays.
- The `Sort<T1,T2>` overload is used to sort the last three elements of both arrays.
- The `Sort<T1,T2>` overload is used to sort the last three elements of both arrays in reverse order.

> **Note:**
> The calls to the generic methods do not look any different from calls to their nongeneric counterparts, because Visual Basic, C#, and C++ infer the type of the generic type parameter from the type of the first two arguments. If you use the Ildasm.exe (IL Disassembler) to examine the Microsoft intermediate language (MSIL), you can see that the generic methods are being called.

_Code sample not included: ~/snippets/csharp/System/Array/SortTKey,TValue/source.cs._

## Array.Sort<TKey,TValue>(TKey[], TValue[], Int32, Int32) method

```csharp
public static void Sort<TKey,TValue> (TKey[] keys, TValue[]? items, int index, int length);
```

Sorts a range of elements in a pair of `Array` objects (one contains the keys and the other contains the corresponding items) based on the keys in the first `Array` using the `IComparable<T>` generic interface implementation of each key.

Parameters:

- `TKey`: The type of the elements of the key array.
- `TValue`: The type of the elements of the items array.
- `keys`: The one-dimensional, zero-based `Array` that contains the keys to sort.
- `items`: The one-dimensional, zero-based `Array` that contains the items that correspond to the keys in `keys`, or `null` to sort only `keys`.
- `index`: The starting index of the range to sort.
- `length`: The number of elements in the range to sort.

Exceptions:

- `ArgumentNullException`: `keys` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `keys`.

-or-

`length` is less than zero.
- `ArgumentException`: `items` is not `null`, and the lower bound of `keys` does not match the lower bound of `items`.

-or-

`items` is not `null`, and the length of `keys` is greater than the length of `items`.

-or-

`index` and `length` do not specify a valid range in the `keys``Array`.

-or-

`items` is not `null`, and `index` and `length` do not specify a valid range in the `items``Array`.
- `InvalidOperationException`: One or more elements in the `keys``Array` do not implement the `IComparable<T>` generic interface.

#### Remarks
Each key in the `keys` `Array` has a corresponding item in the `items` `Array`. When a key is repositioned during the sorting, the corresponding item in the `items` `Array` is similarly repositioned. Therefore, the `items` `Array` is sorted according to the arrangement of the corresponding keys in the `keys` `Array`.

Each key <example-value> the specified range of elements in the `keys` `Array` must implement the `IComparable<T>` generic interface to be capable of comparisons with every other key.

You can sort if there are more items than keys, but the items that have no corresponding keys will not be sorted. You cannot sort if there are more keys than items; doing this throws an `ArgumentException`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where  *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is `length`.

#### Examples
The following code example demonstrates the `Sort<T1,T2>`, `Sort<T1,T2>`, `Sort<T1,T2>`, and `Sort<T1,T2>` generic method overloads, for sorting pairs of arrays that represent keys and values.

The code example defines an alternative comparer for strings, named `ReverseCompare`, which implements the `IComparer<string>` (`IComparer(Of String)` in Visual Basic) generic interface. The comparer calls the `CompareTo` method, reversing the order of the comparands so that the strings sort high-to-low instead of low-to-high.

The code example creates and displays an array of dinosaur names (the keys) and an array of integers representing the maximum length of each dinosaur in meters (the values). The arrays are then sorted and displayed several times:

- The `Sort<T1,T2>` overload is used to sort both arrays in order of the dinosaur names in the first array.
- The `Sort<T1,T2>` overload and an instance of `ReverseCompare` are used to reverse the sort order of the paired arrays.
- The `Sort<T1,T2>` overload is used to sort the last three elements of both arrays.
- The `Sort<T1,T2>` overload is used to sort the last three elements of both arrays in reverse order.

> **Note:**
> The calls to the generic methods do not look any different from calls to their nongeneric counterparts, because Visual Basic, C#, and C++ infer the type of the generic type parameter from the type of the first two arguments. If you use the Ildasm.exe (IL Disassembler) to examine the Microsoft intermediate language (MSIL), you can see that the generic methods are being called.

_Code sample not included: ~/snippets/csharp/System/Array/SortTKey,TValue/source.cs._

## Array.Sort<TKey,TValue>(TKey[], TValue[], Int32, Int32, IComparer<TKey>) method

```csharp
public static void Sort<TKey,TValue> (TKey[] keys, TValue[]? items, int index, int length, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts a range of elements in a pair of `Array` objects (one contains the keys and the other contains the corresponding items) based on the keys in the first `Array` using the specified `IComparer<T>` generic interface.

Parameters:

- `TKey`: The type of the elements of the key array.
- `TValue`: The type of the elements of the items array.
- `keys`: The one-dimensional, zero-based `Array` that contains the keys to sort.
- `items`: The one-dimensional, zero-based `Array` that contains the items that correspond to the keys in `keys`, or `null` to sort only `keys`.
- `index`: The starting index of the range to sort.
- `length`: The number of elements in the range to sort.
- `comparer`: The `IComparer<T>` generic interface implementation to use when comparing elements, or `null` to use the `IComparable<T>` generic interface implementation of each element.

Exceptions:

- `ArgumentNullException`: `keys` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `keys`.

-or-

`length` is less than zero.
- `ArgumentException`: `items` is not `null`, and the lower bound of `keys` does not match the lower bound of `items`.

-or-

`items` is not `null`, and the length of `keys` is greater than the length of `items`.

-or-

`index` and `length` do not specify a valid range in the `keys``Array`.

-or-

`items` is not `null`, and `index` and `length` do not specify a valid range in the `items``Array`.

-or-

The implementation of `comparer` caused an error during the sort. For example, `comparer` might not return 0 when comparing an item with itself.
- `InvalidOperationException`: `comparer` is `null`, and one or more elements in the `keys``Array` do not implement the `IComparable<T>` generic interface.

#### Remarks
Each key in the `keys` `Array` has a corresponding item in the `items` `Array`. When a key is repositioned during the sorting, the corresponding item in the `items` `Array` is similarly repositioned. Therefore, the `items` `Array` is sorted according to the arrangement of the corresponding keys in the `keys` `Array`.

If `comparer` is `null`, each key <example-value> the specified range of elements in the `keys` `Array` must implement the `IComparable<T>` generic interface to be capable of comparisons with every other key.

You can sort if there are more items than keys, but the items that have no corresponding keys will not be sorted. You cannot sort if there are more keys than items; doing this throws an `ArgumentException`.

If the sort is not successfully completed, the results are undefined.

This method uses the introspective sort (introsort) algorithm as follows:

- If the partition size is less than or equal to 16 elements, it uses an insertion sort algorithm.

- If the number of partitions exceeds 2 * LogN, where  *N* is the range of the input array, it uses a Heapsort algorithm.

- Otherwise, it uses a Quicksort algorithm.

This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal.

This method is an O(`n` log `n`) operation, where `n` is `length`.

#### Examples
The following code example demonstrates the `Sort<T1,T2>`, `Sort<T1,T2>`, `Sort<T1,T2>`, and `Sort<T1,T2>` generic method overloads, for sorting pairs of arrays that represent keys and values.

The code example defines an alternative comparer for strings, named `ReverseCompare`, which implements the `IComparer<string>`(`IComparer(Of String)` in Visual Basic) generic interface. The comparer calls the `CompareTo` method, reversing the order of the comparands so that the strings sort high-to-low instead of low-to-high.

The code example creates and displays an array of dinosaur names (the keys) and an array of integers representing the maximum length of each dinosaur in meters (the values). The arrays are then sorted and displayed several times:

- The `Sort<T1,T2>` overload is used to sort both arrays in order of the dinosaur names in the first array.
- The `Sort<T1,T2>` overload and an instance of `ReverseCompare` are used to reverse the sort order of the paired arrays.
- The `Sort<T1,T2>` overload is used to sort the last three elements of both arrays.
- The `Sort<T1,T2>` overload is used to sort the last three elements of both arrays in reverse order.

> **Note:**
> The calls to the generic methods do not look any different from calls to their nongeneric counterparts, because Visual Basic, C#, and C++ infer the type of the generic type parameter from the type of the first two arguments. If you use the Ildasm.exe (IL Disassembler) to examine the Microsoft intermediate language (MSIL), you can see that the generic methods are being called.

_Code sample not included: ~/snippets/csharp/System/Array/SortTKey,TValue/source.cs._
