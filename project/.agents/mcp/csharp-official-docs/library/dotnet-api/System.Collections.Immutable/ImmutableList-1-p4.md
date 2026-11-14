---
title: "ImmutableList<T> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T> class (part 4 of 4)

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.Replace(T, T, IEqualityComparer<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Replace (T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T> equalityComparer);
```

Replaces an element in the list with the specified element.

Parameters:

- `oldValue`: The element to replace.
- `newValue`: The element to replace the old element with.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The new list.

Exceptions:

- `ArgumentException`: `oldValue` does not exist in the list.

To be added.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.SetItem(Int32, T) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.SetItem (int index, T value);
```

Replaces an element in the list at a given position with the specified element.

Parameters:

- `index`: The position in the list of the element to replace.
- `value`: The element to replace the old element with.

Returns: The new list.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.ToBuilder() method

```csharp
public System.Collections.Immutable.ImmutableList<T>.Builder ToBuilder ();
```

Creates a list that has the same contents as this list and can be efficiently mutated across multiple operations using standard mutable interfaces.

Returns: The created list with the same contents as this list.

#### Remarks
This is an O(1) operation and results in only a single (small) memory allocation. The mutable list that is returned is not thread-safe.

## ImmutableList<T>.TrueForAll(Predicate<T>) method

```csharp
public bool TrueForAll (Predicate<T> match);
```

Determines whether every element in the immutable list matches the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions to check against the elements.

Returns: `true` if every element in the immutable list matches the conditions defined by the specified predicate; otherwise, `false`. If the list has no elements, the return value is `true`.

To be added.

## ImmutableList<T>.Empty field

```csharp
public static readonly System.Collections.Immutable.ImmutableList<T> Empty;
```

Gets an empty immutable list.

To be added.
