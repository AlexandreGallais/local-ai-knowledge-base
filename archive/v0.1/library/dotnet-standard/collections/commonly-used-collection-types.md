---
title: "Commonly Used Collection Types"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/collections/commonly-used-collection-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Commonly used collection types

Collection types represent different ways to collect data, such as hash tables, queues, stacks, bags, dictionaries, and lists.

All collections are based on the `System.Collections.ICollection` or `System.Collections.Generic.ICollection`1` interfaces, either directly or indirectly. `System.Collections.IList` and `System.Collections.IDictionary` and their generic counterparts all derive from these two interfaces.

In collections based on `System.Collections.IList` or directly on `System.Collections.ICollection`, every element contains only a value. These types include:

- `System.Array`
- `System.Collections.ArrayList`
- `System.Collections.Generic.List`1`
- `System.Collections.Queue`
- `System.Collections.Concurrent.ConcurrentQueue`1`
- `System.Collections.Stack`
- `System.Collections.Concurrent.ConcurrentStack`1`
- `System.Collections.Generic.LinkedList`1`

In collections based on the `System.Collections.IDictionary` interface, every element contains both a key and a value. These types include:

- `System.Collections.Hashtable`
- `System.Collections.SortedList`
- `System.Collections.Generic.SortedList`2`
- `System.Collections.Generic.Dictionary`2`
- `System.Collections.Concurrent.ConcurrentDictionary`2`

The `System.Collections.ObjectModel.KeyedCollection`2` class is unique because it is a list of values with keys embedded within the values. As a result, it behaves both like a list and like a dictionary.

When you need efficient multi-threaded collection access, use the generic collections in the `System.Collections.Concurrent` namespace.

The `System.Collections.Queue` and `System.Collections.Generic.Queue`1` classes provide first-in-first-out lists. The `System.Collections.Stack` and `System.Collections.Generic.Stack`1` classes provide last-in-first-out lists.

## Strong typing

Generic collections are the best solution to strong typing. For example, adding an element of any type other than an `System.Int32` to a `List<Int32>` collection causes a compile-time error. However, if your language does not support generics, the `System.Collections` namespace includes abstract base classes that you can extend to create collection classes that are strongly typed. These base classes include:

- `System.Collections.CollectionBase`
- `System.Collections.ReadOnlyCollectionBase`
- `System.Collections.DictionaryBase`

## How collections vary

Collections vary in how they store, sort, and compare elements, and how they perform searches.

The `System.Collections.SortedList` class and the `System.Collections.Generic.SortedList`2` generic class provide sorted versions of the `System.Collections.Hashtable` class and the `System.Collections.Generic.Dictionary`2` generic class.

All collections use zero-based indexes except `System.Array`, which allows arrays that are not zero-based.

You can access the elements of a `System.Collections.SortedList` or a `System.Collections.ObjectModel.KeyedCollection`2` by either the key or the element's index. You can only access the elements of a `System.Collections.Hashtable` or a `System.Collections.Generic.Dictionary`2` by the element's key.

## Use LINQ with collection types

The LINQ to Objects feature provides a common pattern for accessing in-memory objects of any type that implements `System.Collections.IEnumerable` or `System.Collections.Generic.IEnumerable`1`. LINQ queries have several benefits over standard constructs like `foreach` loops:

- They are concise and easier to understand.
- They can filter, order, and group data.
- They can improve performance.

For more information, see LINQ to Objects (C#), LINQ to Objects (Visual Basic), and Parallel LINQ (PLINQ).

## Related topics

|Title|Description|
|-----------|-----------------|
|Collections and Data Structures|Discusses the various collection types available in .NET, including stacks, queues, lists, arrays, and dictionaries.|
|Hashtable and Dictionary Collection Types|Describes the features of generic and nongeneric hash-based dictionary types.|
|Sorted Collection Types|Describes classes that provide sorting functionality for lists and sets.|
|Generics|Describes the generics feature, including the generic collections, delegates, and interfaces provided by .NET. Provides links to feature documentation for C#, Visual Basic, and Visual C++, and to supporting technologies such as reflection.|

## Reference

 `System.Collections`

 `System.Collections.Generic`

 `System.Collections.ICollection`

 `System.Collections.Generic.ICollection`1`

 `System.Collections.IList`

 `System.Collections.Generic.IList`1`

 `System.Collections.IDictionary`

 `System.Collections.Generic.IDictionary`2`
