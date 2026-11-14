---
title: "MatchCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/MatchCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MatchCollection class

Namespace: `System.Text.RegularExpressions`

```csharp
public class MatchCollection : System.Collections.Generic.ICollection<System.Text.RegularExpressions.Match>, System.Collections.Generic.IEnumerable<System.Text.RegularExpressions.Match>, System.Collections.Generic.IList<System.Text.RegularExpressions.Match>, System.Collections.Generic.IReadOnlyCollection<System.Text.RegularExpressions.Match>, System.Collections.Generic.IReadOnlyList<System.Text.RegularExpressions.Match>, System.Collections.IList
```

Represents the set of successful matches found by iteratively applying a regular expression
pattern to the input string. The collection is immutable (read-only) and has no public
constructor. The `Regex.Matches` method returns a
`MatchCollection` object.

The collection contains zero or more `Match` objects. If the match is successful,
the collection is populated with one `Match` object for each match found in the
input string. If the match is unsuccessful, the collection contains no `Match`
objects, and its `MatchCollection.Count` property equals zero.

When applying a regular expression pattern to a particular input string, the regular expression
engine uses either of two techniques to build the `MatchCollection` object:

- Direct evaluation:
The `MatchCollection` object is populated all at once,
with all matches resulting from a particular call to the `Regex.Matches`
method. This technique is used when the collection's `MatchCollection.Count` property is accessed.
It typically is the more expensive method of populating the collection and entails a greater
performance hit.

- Lazy evaluation:
The `MatchCollection` object is populated as needed on a
match-by-match basis. It is equivalent to the regular expression engine calling the
`Regex.Match` method repeatedly and adding each match to the collection.
This technique is used when the collection is accessed through its `MatchCollection.GetEnumerator`
method, or when it is accessed using the `foreach` statement.

To iterate through the members of the collection, you should use the collection iteration
construct provided by your language (such as `foreach` in C#) instead of retrieving the
enumerator that is returned by the `MatchCollection.GetEnumerator` method.

## MatchCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of matches.

Returns: The number of matches.

Exceptions:

- `RegexMatchTimeoutException`: A time-out occurred.

Accessing the `MatchCollection.Count` property causes the regular expression engine to populate
the collection using direct evaluation. In contrast, calling the `MatchCollection.GetEnumerator`
method (or using the `foreach` statement) causes the regular expression engine to
populate the collection on an as-needed basis using lazy evaluation. Direct evaluation can be
a much more expensive method of building the collection than lazy evaluation.

Because the `MatchCollection` object is generally populated by using lazy
evaluation, trying to determine the number of elements in the collection before it has been
fully populated may throw a `RegexMatchTimeoutException` exception. This
exception can be thrown if a time-out value for matching operations is in effect, and the
attempt to find a single match exceeds that time-out interval.

## MatchCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether the collection is read only.

Returns: `true` in all cases.

#### Remarks

A collection that is read-only does not allow the addition or removal of elements after the collection is created. Note that read-only in this context does not indicate whether individual elements of the collection can be modified, since the `ICollection<T>` interface only supports addition and removal operations. For example, the `IsReadOnly` property of an array that is cast or converted to an `ICollection<T>` object returns `true`, even though individual array elements can be modified.

## MatchCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether access to the collection is synchronized (thread-safe).

Returns: `false` in all cases.

To be added.

## MatchCollection.Item property

```csharp
public virtual System.Text.RegularExpressions.Match this[int i] { get; }
```

Gets an individual member of the collection.

Parameters:

- `i`: Index into the `Match` collection.

Returns: The captured substring at position `i` in the collection.

Exceptions:

- `ArgumentOutOfRangeException`: `i` is less than 0 or greater than or equal to `MatchCollection.Count`.
- `RegexMatchTimeoutException`: A time-out occurred.

In C#, the `MatchCollection.Item` property is an indexer; it is not explicitly referenced
in code, but instead allows the `MatchCollection` to be accessed as if it were
an array.

Typically, individual items in the `MatchCollection` are accessed by their index
only after the total number of items in the collection has been determined from the
`MatchCollection.Count` property. However, accessing the `MatchCollection.Count` property causes
the regular expression engine to use direct evaluation to build the collection all at once.
This is typically more expensive than iterating the collection using the
`MatchCollection.GetEnumerator` method or the `foreach` statement.

Because the `MatchCollection` object is generally populated by using lazy
evaluation, trying to navigate to a specific match may throw a
`RegexMatchTimeoutException` exception. This exception can be thrown if a
time-out value for matching operations is in effect, and the attempt to find a specific
match exceeds that time-out interval.

## MatchCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the collection.

Returns: An object that can be used to synchronize access to the collection. This property always
returns the object itself.

To be added.

## MatchCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Match>.Item property

```csharp
System.Text.RegularExpressions.Match System.Collections.Generic.IList<System.Text.RegularExpressions.Match>.Item[int index] { get; set; }
```

Gets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

#### Remarks

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.
The C# language uses the this keyword to define the indexers instead of implementing the `IList<T>.Item` property. Visual Basic <example-value> `IList<T>.Item` as a default property, which provides the same indexing functionality.

## MatchCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the collection has a fixed size.

Returns: `true`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `MatchCollection` instance is cast to an `IList` interface.

A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

## MatchCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

#### Remarks

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.
The C# language uses the this keyword to define the indexers instead of implementing the `IList.Item` property. Visual Basic <example-value> `IList.Item` as a default property, which provides the same indexing functionality.

## MatchCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int arrayIndex);
```

Copies all the elements of the collection to the given array starting at the given index.

Parameters:

- `array`: The array the collection is to be copied into.
- `arrayIndex`: The position in the array where copying is to begin.

Exceptions:

- `IndexOutOfRangeException`: `arrayIndex` is outside the bounds of `array`.

-or-

`arrayIndex` plus `MatchCollection.Count` is outside the bounds of `array`.
- `ArgumentException`: `array` is multi-dimensional.
-or-
The number of elements in the source `MatchCollection` is greater than the
available space from `arrayIndex` to the end of `array`.
-or-
The type of the source `MatchCollection` cannot be cast automatically to the
type of the destination `array`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than the lower bound of `array`.
- `RegexMatchTimeoutException`: A time-out occurred.

Because the `MatchCollection` object is generally populated by using lazy
evaluation, trying to copy the collection before it has been fully populated may throw a
`RegexMatchTimeoutException` exception. This exception can be thrown if a
time-out value for matching operations is in effect, and the attempt to find a single match
exceeds that time-out interval.

## MatchCollection.CopyTo(Match[], Int32) method

```csharp
public void CopyTo (System.Text.RegularExpressions.Match[] array, int arrayIndex);
```

Copies the elements of the collection to an `Array`, starting at a particular
`Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from
the collection. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## MatchCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Provides an enumerator that iterates through the collection.

Returns: An object that contains all `Match` objects within the
`MatchCollection`.

Exceptions:

- `RegexMatchTimeoutException`: A time-out occurred.

Instead of calling the `MatchCollection.GetEnumerator` method to retrieve an enumerator that
lets you iterate through the `Match` objects in the collection, you should use
the collection iteration construct provided by your programming language (such as
`foreach` in C#).

Iterating the members of the `MatchCollection` using the
`MatchCollection.GetEnumerator` method (or the `foreach` statement) causes the regular
expression engine to populate the collection on an as-needed basis using lazy evaluation.
In contrast, the regular expression engine uses direct evaluation to populate the collection
all at once when the `MatchCollection.Count` property is accessed. This can be a much more
expensive method of building the collection than lazy evaluation.

Because the `MatchCollection` object is generally populated by using lazy
evaluation, trying to navigate to the next member of the collection may throw a
`RegexMatchTimeoutException` exception. This exception can be thrown if a
time-out value for matching operations is in effect, and the attempt to find the next match
exceeds that time-out interval.

## MatchCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Match>.Add(Match) method

```csharp
void ICollection<Match>.Add (System.Text.RegularExpressions.Match item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `item`: The object to add to the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## MatchCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Match>.Clear() method

```csharp
void ICollection<Match>.Clear ();
```

Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

`ICollection<T>.Count` must be set to 0, and references to other objects from elements of the collection must be released.

## MatchCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Match>.Contains(Match) method

```csharp
bool ICollection<Match>.Contains (System.Text.RegularExpressions.Match item);
```

Determines whether the collection contains a specific value.

Parameters:

- `item`: The object to locate in the collection.

Returns: `true` if `item` is found in the collection; otherwise, `false`.

To be added.

## MatchCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Match>.Remove(Match) method

```csharp
bool ICollection<Match>.Remove (System.Text.RegularExpressions.Match item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `item`: The object to remove from the collection.

Returns: `true` if `item` was successfully removed from the collection; otherwise, `false`. This method also returns `false` if `item` is not found in the original collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.
