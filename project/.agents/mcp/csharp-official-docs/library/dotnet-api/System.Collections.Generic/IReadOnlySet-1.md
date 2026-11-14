---
title: "IReadOnlySet<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IReadOnlySet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IReadOnlySet<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IReadOnlySet<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>
```

Provides a readonly abstraction of a set.

Parameters:

- `T`: The type of elements in the set.

To be added.

## IReadOnlySet<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines if the set contains a specific item.

Parameters:

- `item`: The item to check if the set contains.

Returns: `true` if found; otherwise `false`.

To be added.

## IReadOnlySet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of other; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

To be added.

## IReadOnlySet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the collection is a proper superset of other; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

To be added.

## IReadOnlySet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determine whether the current set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of other; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

To be added.

## IReadOnlySet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determine whether the current set is a super set of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a super set of other; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

To be added.

## IReadOnlySet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true`if the current set and other share at least one common element; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

To be added.

## IReadOnlySet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is equal to other; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

To be added.
