---
title: "IDictionaryEnumerator interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IDictionaryEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDictionaryEnumerator interface

Namespace: `System.Collections`

```csharp
public interface IDictionaryEnumerator : System.Collections.IEnumerator
```

Enumerates the elements of a nongeneric dictionary.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. The `IEnumerator.Reset` method also brings the enumerator back to this position. At this position, `IEnumerator.Current` is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
This code example shows how to define a dictionary enumerator that implements the `IDictionaryEnumerator` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## IDictionaryEnumerator.Entry property

```csharp
public System.Collections.DictionaryEntry Entry { get; }
```

Gets both the key and the value of the current dictionary entry.

Returns: A `DictionaryEntry` containing both the key and the value of the current dictionary entry.

Exceptions:

- `InvalidOperationException`: The `IDictionaryEnumerator` is positioned before the first entry of the dictionary or after the last entry.

#### Remarks

`IDictionaryEnumerator.Entry` is undefined under any of the following conditions:

- The enumerator is positioned before the first element in the collection, immediately after the enumerator is created. `IEnumerator.MoveNext` must be called to advance the enumerator to the first element of the collection before reading the value of `IDictionaryEnumerator.Entry`.

- The last call to `IEnumerator.MoveNext` returned `false`, which indicates the end of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`IDictionaryEnumerator.Entry` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IDictionaryEnumerator.Entry` to the next element.

## IDictionaryEnumerator.Key <example-value>

```csharp
public object Key { get; }
```

Gets the key of the current dictionary entry.

Returns: The key of the current element of the enumeration.

Exceptions:

- `InvalidOperationException`: The `IDictionaryEnumerator` is positioned before the first entry of the dictionary or after the last entry.

#### Remarks

`IDictionaryEnumerator.Key` is undefined under any of the following conditions:

- The enumerator is positioned before the first element in the collection, immediately after the enumerator is created. `IEnumerator.MoveNext` must be called to advance the enumerator to the first element of the collection before reading the value of `IDictionaryEnumerator.Key`.

- The last call to `IEnumerator.MoveNext` returned `false`, which indicates the end of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`IDictionaryEnumerator.Key` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IDictionaryEnumerator.Key` to the key of the next element in enumeration.

## IDictionaryEnumerator.Value property

```csharp
public object? Value { get; }
```

Gets the value of the current dictionary entry.

Returns: The value of the current element of the enumeration.

Exceptions:

- `InvalidOperationException`: The `IDictionaryEnumerator` is positioned before the first entry of the dictionary or after the last entry.

#### Remarks
`IDictionaryEnumerator.Value` is undefined under any of the following conditions:

- The enumerator is positioned before the first element in the collection, immediately after the enumerator is created. `IEnumerator.MoveNext` must be called to advance the enumerator to the first element of the collection before reading the value of `IDictionaryEnumerator.Value`.

- The last call to `IEnumerator.MoveNext` returned `false`, which indicates the end of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`IDictionaryEnumerator.Value` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IDictionaryEnumerator.Value` to the value of the next element in enumeration.
