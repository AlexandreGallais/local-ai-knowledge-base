---
title: "StringDictionary class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/StringDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringDictionary class (part 2 of 2)

## StringDictionary.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the string dictionary.

Returns: An `IEnumerator` that iterates through the string dictionary.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Count/stringdictionary_enumeration.cs._

## StringDictionary.Remove(String) method

```csharp
public virtual void Remove (string key);
```

Removes the entry with the specified key from the string dictionary.

Parameters:

- `key`: The key of the entry to remove.

Exceptions:

- `ArgumentNullException`: The key is `null`.
- `NotSupportedException`: The `StringDictionary` is read-only.

#### Remarks
If the `StringDictionary` does not contain an element with the specified key, the `StringDictionary` remains unchanged. No exception is thrown.

The key is handled in a case-insensitive manner; it is translated to lowercase before it is used to find the entry to remove from the string dictionary.

This method is an O(1) operation.

#### Examples
The following code example demonstrates how to add and remove elements from a `StringDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringDictionary/Add/stringdictionary_addremove.cs._
