---
title: "TagList struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TagList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TagList struct

Namespace: `System.Diagnostics`

```csharp
public struct TagList : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IReadOnlyList<System.Collections.Generic.KeyValuePair<string,object>>
```

Represents a list of tags that can be accessed by index. Provides methods to search, sort, and manipulate lists.

#### Remarks

`TagList` can be used in the scenarios that need to optimize for memory allocations. `TagList` avoids allocating any memory when using up to eight tags.
Using more than eight tags will cause allocating memory to store the tags.
Public `static` (`Shared` in Visual Basic) members of this type are thread safe. Any instance members are not guaranteed to be thread safe.

## TagList.TagList(Object>>) constructor

```csharp
public TagList (scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<string,object?>> tagList);
```

Initializes a new instance of `TagList` using the specified `tagList`.

Parameters:

- `tagList`: A span of tags to initialize the list with.

To be added.

## TagList.Count property

```csharp
public int Count { get; }
```

Gets the number of tags contained in the `TagList`.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## TagList.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `TagList` is read-only. This property will always return `false`.

Returns: Always returns `false`.

To be added.

## TagList.Item property

```csharp
public System.Collections.Generic.KeyValuePair<string,object?> this[int index] { get; set; }
```

Gets or sets the tags at the specified index.

Parameters:

- `index`: The item index.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `TagList`.

To be added.

## TagList.Add(Object>) method

```csharp
public void Add (System.Collections.Generic.KeyValuePair<string,object?> tag);
```

Adds a tag to the list.

Parameters:

- `tag`: The key-value pair of the tag to add to the list.

To be added.

## TagList.Add(String, Object) method

```csharp
public void Add (string key, object? value);
```

Adds a tag with the specified `key` and `value` to the list.

Parameters:

- `key`: The tag key.
- `value`: The tag value.

To be added.

## TagList.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `TagList`.

To be added.

## TagList.Contains(Object>) method

```csharp
public readonly bool Contains (System.Collections.Generic.KeyValuePair<string,object?> item);
```

Determines whether a tag is in the `TagList`.

Parameters:

- `item`: The tag to locate in the `TagList`.

Returns: `true` if item is found in the `TagList`; otherwise, `false`.

To be added.

## TagList.CopyTo(Object>>) method

```csharp
public readonly void CopyTo (Span<System.Collections.Generic.KeyValuePair<string,object?>> tags);
```

Copies the contents of this `TagList` into a destination `tags` span.

Parameters:

- `tags`: The destination `Span<T>` object.

Exceptions:

- `ArgumentException`: The number of elements in the source `TagList` is greater than the number of elements that the destination span.

To be added.

## TagList.CopyTo(Object>[], Int32) method

```csharp
public readonly void CopyTo (System.Collections.Generic.KeyValuePair<string,object>[] array, int arrayIndex);
```

Copies the entire `TagList` to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional Array that is the destination of the elements copied from `TagList`. The Array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0 or greater than or equal to the `array` length.

To be added.

## TagList.GetEnumerator() method

```csharp
public readonly System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,object?>> GetEnumerator ();
```

Returns an enumerator that iterates through the `TagList`.

Returns: An enumerator that iterates through the `TagList`.

To be added.

## TagList.IndexOf(Object>) method

```csharp
public readonly int IndexOf (System.Collections.Generic.KeyValuePair<string,object?> item);
```

Searches for the specified tag and returns the zero-based index of the first occurrence within the entire `TagList`.

Parameters:

- `item`: The tag to locate in the `TagList`.

Returns: The zero-based index of the first ocurrence of `item` in the tag list.

To be added.

## TagList.Insert(Int32, Object>) method

```csharp
public void Insert (int index, System.Collections.Generic.KeyValuePair<string,object?> item);
```

Inserts an element into the `TagList` at the specified index.

Parameters:

- `index`: The zero-based index at which the item should be inserted.
- `item`: The tag to insert.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or `index` is greater than `TagList.Count`.

To be added.

## TagList.Remove(Object>) method

```csharp
public bool Remove (System.Collections.Generic.KeyValuePair<string,object?> item);
```

Removes the first occurrence of a specific object from the `TagList`.

Parameters:

- `item`: The tag to remove from the `TagList`.

Returns: `true` if `item` is successfully removed; otherwise, `false`. This method also returns `false` if `item` was not found in the `TagList`.

To be added.

## TagList.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the element at the specified index of the `TagList`.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` index is less than 0 or `index` is greater than `TagList.Count`.

To be added.

## TagList.System.Collections.IEnumerable.GetEnumerator() method

```csharp
readonly System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `TagList`.

Returns: An enumerator that iterates through the `TagList`.

This member is an explicit interface member implementation. It can be used only when the `TagList` instance is cast to an `IEnumerable` interface.
