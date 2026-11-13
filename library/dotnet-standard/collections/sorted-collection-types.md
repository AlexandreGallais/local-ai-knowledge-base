---
title: "Sorted Collection Types"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/collections/sorted-collection-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Sorted Collection Types

The `System.Collections.SortedList` class, the `System.Collections.Generic.SortedList`2` generic class, and the `System.Collections.Generic.SortedDictionary`2` generic class are similar to the `System.Collections.Hashtable` class and the `System.Collections.Generic.Dictionary`2` generic class in that they implement the `System.Collections.IDictionary` interface, but they maintain their elements in sort order by key, and they do not have the O(1) insertion and retrieval characteristic of hash tables. The three classes have several features in common:

- All three classes implement the `System.Collections.IDictionary` interface. The two generic classes also implement the `System.Collections.Generic.IDictionary`2` generic interface.

- Each element is a key/value pair for enumeration purposes.

   > **Note:**
   > The nongeneric `System.Collections.SortedList` class returns `System.Collections.DictionaryEntry` objects when enumerated, although the two generic types return `System.Collections.Generic.KeyValuePair`2` objects.

- Elements are sorted according to a `System.Collections.IComparer` implementation (for nongeneric `System.Collections.SortedList`) or a `System.Collections.Generic.IComparer`1` implementation (for the two generic classes).

- Each class provides properties that return collections containing only the keys or only the values.

The following table lists some of the differences between the two sorted list classes and the `System.Collections.Generic.SortedDictionary`2` class.

| `System.Collections.SortedList` nongeneric class and `System.Collections.Generic.SortedList`2` generic class | `System.Collections.Generic.SortedDictionary`2` generic class |
|--|--|
| The properties that return keys and values are indexed, allowing efficient indexed retrieval. | No indexed retrieval. |
| Retrieval is O(log `n`). | Retrieval is O(log `n`). |
| Insertion and removal are generally O(`n`); however, insertion is O(log `n`) for data that are already in sort order, so that each element is added to the end of the list. (This assumes that a resize is not required.) | Insertion and removal are O(log `n`). |
| Uses less memory than a `System.Collections.Generic.SortedDictionary`2`. | Uses more memory than the `System.Collections.SortedList` nongeneric class and the `System.Collections.Generic.SortedList`2` generic class. |

For sorted lists or dictionaries that must be accessible concurrently from multiple threads, you can add sorting logic to a class that derives from `System.Collections.Concurrent.ConcurrentDictionary`2`. When considering immutability, the following corresponding immutable types follow similar sorting semantics: `System.Collections.Immutable.ImmutableSortedSet`1` and `System.Collections.Immutable.ImmutableSortedDictionary`2`.

> **Note:**
> For values that contain their own keys (for example, employee records that contain an employee ID number), you can create a keyed collection that has some characteristics of a list and some characteristics of a dictionary by deriving from the `System.Collections.ObjectModel.KeyedCollection`2` generic class.

The `System.Collections.Generic.SortedSet`1` class provides a self-balancing tree that maintains data in sorted order after insertions, deletions, and searches. This class and the `System.Collections.Generic.HashSet`1` class implement the `System.Collections.Generic.ISet`1` interface.

## See also

- `System.Collections.IDictionary`
- `System.Collections.Generic.IDictionary`2`
- `System.Collections.Concurrent.ConcurrentDictionary`2`
- Commonly Used Collection Types
