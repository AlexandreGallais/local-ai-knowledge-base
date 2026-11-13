---
title: "When to Use Generic Collections"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/collections/when-to-use-generic-collections.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# When to use generic collections

Using generic collections gives you the automatic benefit of type safety without having to derive from a base collection type and implement type-specific members. Generic collection types also generally perform better than the corresponding nongeneric collection types (and better than types that are derived from nongeneric base collection types) when the collection elements are value types, because with generics, there's no need to box the elements.

For programs that target .NET Standard 1.0 or later, use the generic collection classes in the `System.Collections.Concurrent` namespace when multiple threads might be adding or removing items from the collection concurrently. Additionally, when immutability is desired, consider the generic collection classes in the `System.Collections.Immutable` namespace.

The following generic types correspond to existing collection types:

- `System.Collections.Generic.List`1` is the generic class that corresponds to `System.Collections.ArrayList`.

- `System.Collections.Generic.Dictionary`2` and `System.Collections.Concurrent.ConcurrentDictionary`2` are the generic classes that correspond to `System.Collections.Hashtable`.

- `System.Collections.ObjectModel.Collection`1` is the generic class that corresponds to `System.Collections.CollectionBase`. `System.Collections.ObjectModel.Collection`1` can be used as a base class, but unlike `System.Collections.CollectionBase`, it is not abstract, which makes it much easier to use.

- `System.Collections.ObjectModel.ReadOnlyCollection`1` is the generic class that corresponds to `System.Collections.ReadOnlyCollectionBase`. `System.Collections.ObjectModel.ReadOnlyCollection`1` is not abstract and has a constructor that makes it easy to expose an existing `System.Collections.Generic.List`1` as a read-only collection.

- The `System.Collections.Generic.Queue`1`, `System.Collections.Concurrent.ConcurrentQueue`1`, `System.Collections.Immutable.ImmutableQueue`1`, `System.Collections.Immutable.ImmutableArray`1`, `System.Collections.Generic.SortedList`2`, and `System.Collections.Immutable.ImmutableSortedSet`1` generic classes correspond to the respective nongeneric classes with the same names.

## Additional Types

Several generic collection types do not have nongeneric counterparts. They include the following:

- `System.Collections.Generic.LinkedList`1` is a general-purpose linked list that provides O(1) insertion and removal operations.

- `System.Collections.Generic.SortedDictionary`2` is a sorted dictionary with O(log `n`) insertion and retrieval operations, which makes it a useful alternative to `System.Collections.Generic.SortedList`2`.

- `System.Collections.ObjectModel.KeyedCollection`2` is a hybrid between a list and a dictionary, which provides a way to store objects that contain their own keys.

- `System.Collections.Concurrent.BlockingCollection`1` implements a collection class with bounding and blocking functionality.

- `System.Collections.Concurrent.ConcurrentBag`1` provides fast insertion and removal of unordered elements.

### Immutable builders

When you desire immutability functionality in your app, the `System.Collections.Immutable` namespace offers generic collection types you can use. All of the immutable collection types offer `Builder` classes that can optimize performance when you're performing multiple mutations. The `Builder` class batches operations in a mutable state. When all mutations have been completed, call the `ToImmutable` method to "freeze" all nodes and create an immutable generic collection, for example, an `System.Collections.Immutable.ImmutableList`1`.

The `Builder` object can be created by calling the nongeneric `CreateBuilder()` method. From a `Builder` instance, you can call `ToImmutable()`. Likewise, from the `Immutable*` collection, you can call `ToBuilder()` to create a builder instance from the generic immutable collection. The following are the various `Builder` types.

- `System.Collections.Immutable.ImmutableArray`1.Builder`
- `System.Collections.Immutable.ImmutableDictionary`2.Builder`
- `System.Collections.Immutable.ImmutableHashSet`1.Builder`
- `System.Collections.Immutable.ImmutableList`1.Builder`
- `System.Collections.Immutable.ImmutableSortedDictionary`2.Builder`
- `System.Collections.Immutable.ImmutableSortedSet`1.Builder`

## LINQ to Objects

The LINQ to Objects feature enables you to use LINQ queries to access in-memory objects as long as the object type implements the `System.Collections.IEnumerable` or `System.Collections.Generic.IEnumerable`1` interface. LINQ queries provide a common pattern for accessing data; are typically more concise and readable than standard `foreach` loops; and provide filtering, ordering, and grouping capabilities. LINQ queries can also improve performance. For more information, see LINQ to Objects (C#), LINQ to Objects (Visual Basic), and Parallel LINQ (PLINQ).

## Additional Functionality

Some of the generic types have functionality that is not found in the nongeneric collection types. For example, the `System.Collections.Generic.List`1` class, which corresponds to the nongeneric `System.Collections.ArrayList` class, has a number of methods that accept generic delegates, such as the `System.Predicate`1` delegate that allows you to specify methods for searching the list, the `System.Action`1` delegate that represents methods that act on each element of the list, and the `System.Converter`2` delegate that lets you define conversions between types.

The `System.Collections.Generic.List`1` class allows you to specify your own `System.Collections.Generic.IComparer`1` generic interface implementations for sorting and searching the list. The `System.Collections.Generic.SortedDictionary`2` and `System.Collections.Generic.SortedList`2` classes also have this capability. In addition, these classes let you specify comparers when the collection is created. In similar fashion, the `System.Collections.Generic.Dictionary`2` and `System.Collections.ObjectModel.KeyedCollection`2` classes let you specify your own equality comparers.

## See also

- Collections and Data Structures
- Commonly Used Collection Types
- Generics
