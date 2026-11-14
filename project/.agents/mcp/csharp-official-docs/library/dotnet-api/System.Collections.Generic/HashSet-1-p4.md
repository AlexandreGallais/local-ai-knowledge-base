---
title: "HashSet<T> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/HashSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashSet<T> class (part 4 of 4)

## HashSet<T>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity of a `HashSet<T>` object to the actual number of elements it contains, rounded up to a nearby, implementation-specific value.

#### Remarks
You can use the `HashSet<T>.TrimExcess` method to minimize a `HashSet<T>` object's memory overhead once it is known that no new elements will be added. To completely clear a `HashSet<T>` object and release all memory referenced by it, call this method after calling the `HashSet<T>.Clear` method.

This method is an O(`n`) operation, where `n` is `HashSet<T>.Count`.

#### Examples
The following example creates and populates a `HashSet<T>` collection, and then clears the collection and releases the memory referenced by it.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Clear/Program.cs._

## HashSet<T>.TrimExcess(Int32) method

```csharp
public void TrimExcess (int capacity);
```

Sets the capacity of a `HashSet<T>` object to the specified number of entries, rounded up to a nearby, implementation-specific value.

Parameters:

- `capacity`: The new capacity.

Exceptions:

- `ArgumentOutOfRangeException`: The specified capacity is lower than the count of entries.

To be added.

## HashSet<T>.TryGetAlternateLookup<TAlternate>(HashSet<T>+AlternateLookup<TAlternate>) method

```csharp
public bool TryGetAlternateLookup<TAlternate> (out System.Collections.Generic.HashSet<T>.AlternateLookup<TAlternate> lookup) where TAlternate : allows ref struct;
```

Gets an instance of a type that can be used to perform operations on the current `HashSet<T>` using a `TAlternate` instead of a `T`.

Parameters:

- `TAlternate`: The alternate type of instance for performing lookups.
- `lookup`: The created lookup instance when the method returns true, or a default instance that should not be used if the method returns false.

Returns: `true` if a lookup could be created; otherwise, `false`.

The set must use a comparer that implements `IAlternateEqualityComparer<T1,T2>` with `TAlternate` and `T`. If it doesn't, the method returns `false`.

## HashSet<T>.TryGetValue(T, T) method

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

## HashSet<T>.UnionWith(IEnumerable<T>) method

```csharp
public void UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current `HashSet<T>` object to contain all elements that are present in itself, the specified collection, or both.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method is an O(`n`) operation, where `n` is the number of elements in the `other` parameter.

#### Examples
The following example demonstrates how to merge two disparate sets. This example creates two `HashSet<T>` objects, and populates them with even and odd numbers, respectively. A third `HashSet<T>` object is created from the set that contains the even numbers. The example then calls the `HashSet<T>.UnionWith` method, which adds the odd number set to the third set.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Overview/Program.cs._
