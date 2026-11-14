---
title: "SortedSet<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedSet<T> class (part 3 of 3)

## SortedSet<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `IEnumerable` interface.

This method is an `O(log n)` operation.

## SortedSet<T>.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Implements the `IDeserializationCallback` interface, and raises the deserialization event when the deserialization is completed.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `SortedSet<T>` instance is invalid.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `IDeserializationCallback` interface.

## SortedSet<T>.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface, and returns the data that you need to serialize the `SortedSet<T>` instance.

Parameters:

- `info`: A `SerializationInfo` object that contains the information that is required to serialize the `SortedSet<T>` instance.
- `context`: A `StreamingContext` structure that contains the source and destination of the serialized stream associated with the `SortedSet<T>` instance.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `ISerializable` interface.

## SortedSet<T>.TryGetValue(T, T) method

```csharp
public bool TryGetValue (T equalValue, out T actualValue);
```

Searches the set for a given value and returns the equal value it finds, if any.

Parameters:

- `equalValue`: The value to search for.
- `actualValue`: The value from the set that the search found, or the default value of T when the search yielded no match.

Returns: A value indicating whether the search was successful.

#### Remarks
This can be useful when you want to reuse a previously stored reference instead of a newly constructed one (so that more sharing of references can occur) or to look up a value that has more complete data than the value you currently have, although their comparer functions indicate they are equal.

## SortedSet<T>.UnionWith(IEnumerable<T>) method

```csharp
public void UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current `SortedSet<T>` object so that it contains all elements that are present in either the current object or the specified collection.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
Any duplicate elements in `other` are ignored.
