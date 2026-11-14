---
title: "HttpHeaderValueCollection<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/HttpHeaderValueCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpHeaderValueCollection<T> class

Namespace: `System.Net.Http.Headers`

```csharp
public sealed class HttpHeaderValueCollection<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T> where T : class
```

Represents a collection of header values.

Parameters:

- `T`: The header collection type.

To be added.

## HttpHeaderValueCollection<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of headers in the `HttpHeaderValueCollection<T>`.

Returns: The number of headers in a collection.

To be added.

## HttpHeaderValueCollection<T>.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `HttpHeaderValueCollection<T>` instance is read-only.

Returns: `true` if the `HttpHeaderValueCollection<T>` instance is read-only; otherwise, `false`.

To be added.

## HttpHeaderValueCollection<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds an entry to the `HttpHeaderValueCollection<T>`.

Parameters:

- `item`: The item to add to the header collection.

To be added.

## HttpHeaderValueCollection<T>.Clear() method

```csharp
public void Clear ();
```

Removes all entries from the `HttpHeaderValueCollection<T>`.

To be added.

## HttpHeaderValueCollection<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines if the `HttpHeaderValueCollection<T>` contains an item.

Parameters:

- `item`: The item to find to the header collection.

Returns: `true` if the entry is contained in the `HttpHeaderValueCollection<T>` instance; otherwise, `false`.

To be added.

## HttpHeaderValueCollection<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the entire `HttpHeaderValueCollection<T>` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `HttpHeaderValueCollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
The specified array must be of a compatible type.

## HttpHeaderValueCollection<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the `HttpHeaderValueCollection<T>`.

Returns: An enumerator for the `HttpHeaderValueCollection<T>` instance.

#### Remarks
This enumerator returns the keys of the collection as strings. The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection.

## HttpHeaderValueCollection<T>.ParseAdd(String) method

```csharp
public void ParseAdd (string? input);
```

Parses and adds an entry to the `HttpHeaderValueCollection<T>`.

Parameters:

- `input`: The entry to add.

To be added.

## HttpHeaderValueCollection<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the specified item from the `HttpHeaderValueCollection<T>`.

Parameters:

- `item`: The item to remove.

Returns: `true` if the `item` was removed from the `HttpHeaderValueCollection<T>` instance; otherwise, `false`.

To be added.

## HttpHeaderValueCollection<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `HttpHeaderValueCollection<T>`.

Returns: An enumerator for the `HttpHeaderValueCollection<T>` instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpHeaderValueCollection<T>` instance is cast to an `IEnumerable` interface.

## HttpHeaderValueCollection<T>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `HttpHeaderValueCollection<T>` object. object.

Returns: A string that represents the current object.

To be added.

## HttpHeaderValueCollection<T>.TryParseAdd(String) method

```csharp
public bool TryParseAdd (string? input);
```

Determines whether the input could be parsed and added to the `HttpHeaderValueCollection<T>`.

Parameters:

- `input`: The entry to validate.

Returns: `true` if the `input` could be parsed and added to the `HttpHeaderValueCollection<T>` instance; otherwise, `false`.

To be added.
