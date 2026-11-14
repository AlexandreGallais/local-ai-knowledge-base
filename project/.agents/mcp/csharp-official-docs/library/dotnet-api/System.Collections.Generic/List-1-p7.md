---
title: "List<T> class (part 7 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 7 of 9)

## List<T>.InsertRange(Int32, IEnumerable<T>) method

```csharp
public void InsertRange (int index, System.Collections.Generic.IEnumerable<T> collection);
```

Inserts the elements of a collection into the `List<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which the new elements should be inserted.
- `collection`: The collection whose elements should be inserted into the `List<T>`. The collection itself cannot be `null`, but it can contain elements that are `null`, if type `T` is a reference type.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is greater than `List<T>.Count`.

#### Remarks
`List<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

If the new `List<T>.Count` (the current `List<T>.Count` plus the size of the collection) will be greater than `List<T>.Capacity`, the capacity of the `List<T>` is increased by automatically reallocating the internal array to accommodate the new elements, and the existing elements are copied to the new array before the new elements are added.

If `index` is equal to `List<T>.Count`, the elements are added to the end of `List<T>`.

The order of the elements in the collection is preserved in the `List<T>`.

This method is an O(*n* * *m*) operation, where *n* is the number of elements to be added and *m* is `List<T>.Count`.

#### Examples
The following example demonstrates `List<T>.InsertRange` method and various other methods of the `List<T>` class that act on ranges. After the list has been created and populated with the names of several peaceful plant-eating dinosaurs, the `List<T>.InsertRange` method is used to insert an array of three ferocious meat-eating dinosaurs into the list, beginning at index location 3.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source1.cs._

## List<T>.LastIndexOf(T) method

```csharp
public int LastIndexOf (T item);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the entire `List<T>`.

Parameters:

- `item`: The object to locate in the `List<T>`. The value can be `null` for reference types.

Returns: The zero-based index of the last occurrence of `item` within the entire the `List<T>`, if found; otherwise, -1.

#### Remarks
The `List<T>` is searched backward starting at the last element and ending at the first element.

This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.LastIndexOf(T, Int32) method

```csharp
public int LastIndexOf (T item, int index);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the `List<T>` that extends from the first element to the specified index.

Parameters:

- `item`: The object to locate in the `List<T>`. The value can be `null` for reference types.
- `index`: The zero-based starting index of the backward search.

Returns: The zero-based index of the last occurrence of `item` within the range of elements in the `List<T>` that extends from the first element to `index`, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `List<T>`.

#### Remarks
The `List<T>` is searched backward starting at `index` and ending at the first element.

This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is the number of elements from the beginning of the `List<T>` to `index`.

## List<T>.LastIndexOf(T, Int32, Int32) method

```csharp
public int LastIndexOf (T item, int index, int count);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the `List<T>` that contains the specified number of elements and ends at the specified index.

Parameters:

- `item`: The object to locate in the `List<T>`. The value can be `null` for reference types.
- `index`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the last occurrence of `item` within the range of elements in the `List<T>` that contains `count` number of elements and ends at `index`, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `List<T>`.

-or-

`count` is less than 0.

-or-

`index` and `count` do not specify a valid section in the `List<T>`.

#### Remarks
The `List<T>` is searched backward starting at `index` and ending at `index` minus `count` plus 1, if `count` is greater than 0.

This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `count`.

## List<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of a specific object from the `List<T>`.

Parameters:

- `item`: The object to remove from the `List<T>`. The value can be `null` for reference types.

Returns: `true` if `item` is successfully removed; otherwise, `false`.  This method also returns `false` if `item` was not found in the `List<T>`.

#### Remarks
This method determines equality using the default equality comparer `Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples

The following example demonstrates how to add, remove, and insert a simple business object in a `List<T>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/program.cs._

The following example demonstrates `List<T>.Remove` method. Several properties and methods of the `List<T>` generic class are used to add, insert, and search the list. After these operations, the list contains a duplicate. The `List<T>.Remove` method is used to remove the first instance of the duplicate item, and the contents are displayed. The `List<T>.Remove` method always removes the first instance it encounters.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.RemoveAll(Predicate<T>) method

```csharp
public int RemoveAll (Predicate<T> match);
```

Removes all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the elements to remove.

Returns: The number of elements removed from the `List<T>`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate, and the elements that match the conditions are removed from the `List<T>`.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.RemoveAll` method and several other methods that use the `Predicate<T>` generic delegate.

A `List<T>` of strings is created, containing 8 dinosaur names, two of which (at positions 1 and 5) end with "saurus". The example also defines a search predicate method named `EndsWithSaurus`, which accepts a string parameter and returns a Boolean value indicating whether the input string ends in "saurus".

The `List<T>.Find`, `List<T>.FindLast`, and `List<T>.FindAll` methods are used to search the list with the search predicate method.

The `List<T>.RemoveAll` method is used to remove all entries ending with "saurus". It traverses the list from the beginning, passing each element in turn to the `EndsWithSaurus` method. The element is removed if the `EndsWithSaurus` method returns `true`.

> **Note:**
> In C# and Visual Basic, it is not necessary to create the `Predicate<string>` delegate (`Predicate(Of String)` in Visual Basic) explicitly. These languages infer the correct delegate from context, and create it automatically.

Finally, the `List<T>.Exists` method verifies that there are no strings in the list that end with "saurus".

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Exists/source.cs._

## List<T>.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the element at the specified index of the `List<T>`.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is equal to or greater than `List<T>.Count`.

#### Remarks
When you call `List<T>.RemoveAt` to remove an item, the remaining items in the list are renumbered to replace the removed item. For example, if you remove the item at index 3, the item at index 4 is moved to the 3 position. In addition, the number of items in the list (as represented by the `Count` property) is reduced by 1.

This method is an O(*n*) operation, where *n* is (`List<T>.Count` - `index`).

#### Examples
The following example demonstrates how to add, remove, and insert a simple business object in a `List<T>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/program.cs._

## List<T>.RemoveRange(Int32, Int32) method

```csharp
public void RemoveRange (int index, int count);
```

Removes a range of elements from the `List<T>`.

Parameters:

- `index`: The zero-based starting index of the range of elements to remove.
- `count`: The number of elements to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `index` and `count` do not denote a valid range of elements in the `List<T>`.

#### Remarks
The items are removed and all the elements following them in the `List<T>` have their indexes reduced by `count`.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.RemoveRange` method and various other methods of the `List<T>` class that act on ranges. After the list has been created and modified, the `List<T>.RemoveRange` method is used to remove two elements from the list, beginning at index location 2.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source1.cs._

## List<T>.Reverse() method

```csharp
public void Reverse ();
```

Reverses the order of the elements in the entire `List<T>`.

#### Remarks
This method uses `Array.Reverse` to reverse the order of the elements.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.Reverse(Int32, Int32) method

```csharp
public void Reverse (int index, int count);
```

Reverses the order of the elements in the specified range.

Parameters:

- `index`: The zero-based starting index of the range to reverse.
- `count`: The number of elements in the range to reverse.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `index` and `count` do not denote a valid range of elements in the `List<T>`.

#### Remarks
This method uses `Array.Reverse` to reverse the order of the elements.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.Slice(Int32, Int32) method

```csharp
public System.Collections.Generic.List<T> Slice (int start, int length);
```

Creates a shallow copy of a range of elements in the source `List<T>`.

Parameters:

- `start`: The zero-based `List<T>` index at which the range starts.
- `length`: The length of the range.

Returns: A shallow copy of a range of elements in the source `List<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is less than 0.

-or-

`length` is less than 0.
- `ArgumentException`: `start` and `length` do not denote a valid range of elements in the `List<T>`.

To be added.
