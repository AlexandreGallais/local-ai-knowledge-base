---
title: "Selecting a Collection Class"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/collections/selecting-a-collection-class.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Selecting a Collection Class

Be sure to choose your collection class carefully. Using the wrong type can restrict your use of the collection.

> **Important:**
> Avoid using the types in the `System.Collections` namespace. The generic and concurrent versions of the collections are recommended because of their greater type safety and other improvements.

Consider the following questions:

- Do you need a sequential list where the element is typically discarded after its value is retrieved?

  - If yes, consider using the `System.Collections.Queue` class or the `System.Collections.Generic.Queue`1` generic class if you need first-in, first-out (FIFO) behavior. Consider using the `System.Collections.Stack` class or the `System.Collections.Generic.Stack`1` generic class if you need last-in, first-out (LIFO) behavior. For safe access from multiple threads, use the concurrent versions, `System.Collections.Concurrent.ConcurrentQueue`1` and `System.Collections.Concurrent.ConcurrentStack`1`. For immutability, consider the immutable versions, `System.Collections.Immutable.ImmutableQueue`1` and `System.Collections.Immutable.ImmutableStack`1`.

  - If not, consider using the other collections.

- Do you need to access the elements in a certain order, such as FIFO, LIFO, or random?

  - The `System.Collections.Queue` class, as well as the `System.Collections.Generic.Queue`1`, `System.Collections.Concurrent.ConcurrentQueue`1`, and `System.Collections.Immutable.ImmutableQueue`1` generic classes all offer FIFO access. For more information, see When to Use a Thread-Safe Collection.

  - The `System.Collections.Stack` class, as well as the `System.Collections.Generic.Stack`1`, `System.Collections.Concurrent.ConcurrentStack`1`, and `System.Collections.Immutable.ImmutableStack`1` generic classes all offer LIFO access. For more information, see When to Use a Thread-Safe Collection.

  - The `System.Collections.Generic.LinkedList`1` generic class allows sequential access either from the head to the tail, or from the tail to the head.

- Do you need to access each element by index?

  - The `System.Collections.ArrayList` and `System.Collections.Specialized.StringCollection` classes and the `System.Collections.Generic.List`1` generic class offer access to their elements by the zero-based index of the element. For immutability, consider the immutable generic versions, `System.Collections.Immutable.ImmutableArray`1` and `System.Collections.Immutable.ImmutableList`1`.

  - The `System.Collections.Hashtable`, `System.Collections.SortedList`, `System.Collections.Specialized.ListDictionary`, and `System.Collections.Specialized.StringDictionary` classes, and the `System.Collections.Generic.Dictionary`2` and `System.Collections.Generic.SortedDictionary`2` generic classes offer access to their elements by the key of the element. Additionally, there are immutable versions of several corresponding types: `System.Collections.Immutable.ImmutableHashSet`1`, `System.Collections.Immutable.ImmutableDictionary`2`, `System.Collections.Immutable.ImmutableSortedSet`1`, and `System.Collections.Immutable.ImmutableSortedDictionary`2`.

  - The `System.Collections.Specialized.NameObjectCollectionBase` and `System.Collections.Specialized.NameValueCollection` classes, and the `System.Collections.ObjectModel.KeyedCollection`2` and `System.Collections.Generic.SortedList`2` generic classes offer access to their elements by either the zero-based index or the key of the element.

- Will each element contain one value, a combination of one key and one value, or a combination of one key and multiple values?

  - One value: Use any of the collections based on the `System.Collections.IList` interface or the `System.Collections.Generic.IList`1` generic interface. For an immutable option, consider the `System.Collections.Immutable.IImmutableList`1` generic interface.

  - One key and one value: Use any of the collections based on the `System.Collections.IDictionary` interface or the `System.Collections.Generic.IDictionary`2` generic interface. For an immutable option, consider the `System.Collections.Immutable.IImmutableSet`1` or `System.Collections.Immutable.IImmutableDictionary`2` generic interfaces.

  - One value with embedded key: Use the `System.Collections.ObjectModel.KeyedCollection`2` generic class.

  - One key and multiple values: Use the `System.Collections.Specialized.NameValueCollection` class.

- Do you need to sort the elements differently from how they were entered?

  - The `System.Collections.Hashtable` class sorts its elements by their hash codes.

  - The `System.Collections.SortedList` class, and the `System.Collections.Generic.SortedList`2` and `System.Collections.Generic.SortedDictionary`2` generic classes sort their elements by the key. The sort order is based on the implementation of the `System.Collections.IComparer` interface for the `System.Collections.SortedList` class and on the implementation of the `System.Collections.Generic.IComparer`1` generic interface for the `System.Collections.Generic.SortedList`2` and `System.Collections.Generic.SortedDictionary`2` generic classes. Of the two generic types, `System.Collections.Generic.SortedDictionary`2` offers better performance than `System.Collections.Generic.SortedList`2`, while `System.Collections.Generic.SortedList`2` consumes less memory.

  - `System.Collections.ArrayList` provides a `System.Collections.ArrayList.Sort*` method that takes an `System.Collections.IComparer` implementation as a parameter. Its generic counterpart, the `System.Collections.Generic.List`1` generic class, provides a `System.Collections.Generic.List`1.Sort*` method that takes an implementation of the `System.Collections.Generic.IComparer`1` generic interface as a parameter.

- Do you need fast searches and retrieval of information?

  - `System.Collections.Specialized.ListDictionary` is faster than `System.Collections.Hashtable` for small collections (10 items or fewer). The `System.Collections.Generic.Dictionary`2` generic class provides faster lookup than the `System.Collections.Generic.SortedDictionary`2` generic class. The multi-threaded implementation is `System.Collections.Concurrent.ConcurrentDictionary`2`. `System.Collections.Concurrent.ConcurrentBag`1` provides fast multi-threaded insertion for unordered data. For more information about both multi-threaded types, see When to Use a Thread-Safe Collection.

- Do you need collections that accept only strings?

  - `System.Collections.Specialized.StringCollection` (based on `System.Collections.IList`) and `System.Collections.Specialized.StringDictionary` (based on `System.Collections.IDictionary`) are in the `System.Collections.Specialized` namespace.

  - In addition, you can use any of the generic collection classes in the `System.Collections.Generic` namespace as strongly typed string collections by specifying the `System.String` class for their generic type arguments. For example, you can declare a variable to be of type List\<String> or Dictionary<String,String>.

## LINQ to Objects and PLINQ

LINQ to Objects enables developers to use LINQ queries to access in-memory objects as long as the object type implements `System.Collections.IEnumerable` or `System.Collections.Generic.IEnumerable`1`. LINQ queries provide a common pattern for accessing data, are typically more concise and readable than standard `foreach` loops, and provide filtering, ordering, and grouping capabilities. For more information, see LINQ to Objects (C#) and LINQ to Objects (Visual Basic).

PLINQ provides a parallel implementation of LINQ to Objects that can offer faster query execution in many scenarios, through more efficient use of multi-core computers. For more information, see Parallel LINQ (PLINQ).

## See also

- `System.Collections`
- `System.Collections.Specialized`
- `System.Collections.Generic`
- Thread-Safe Collections
