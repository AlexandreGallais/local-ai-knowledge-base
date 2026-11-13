---
title: "Deferred execution and lazy evaluation - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/deferred-execution-lazy-evaluation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Deferred execution and lazy evaluation (LINQ to XML)

Query and axis operations are often implemented to use deferred execution. This article explains the requirements and advantages of deferred execution, and some implementation considerations.

## Deferred execution

Deferred execution means that the evaluation of an expression is delayed until its *realized* value is actually required. Deferred execution can greatly improve performance when you have to manipulate large data collections, especially in programs that contain a series of chained queries or manipulations. In the best case, deferred execution enables only a single iteration through the source collection.

The LINQ technologies make extensive use of deferred execution in both the members of core `System.Linq` classes and in the extension methods in the various LINQ namespaces, such as `System.Xml.Linq.Extensions`.

Deferred execution is supported directly in the C# language by the yield (C# Reference) keyword (in the form of the `yield-return` statement) when used within an iterator block. Such an iterator must return a collection of type `System.Collections.IEnumerator` or `System.Collections.Generic.IEnumerator`1` (or a derived type).

## Eager vs. lazy evaluation

When you write a method that implements deferred execution, you also have to decide whether to implement the method using lazy evaluation or eager evaluation.

- In *lazy evaluation*, a single element of the source collection is processed during each call to the iterator. This is the typical way in which iterators are implemented.
- In *eager evaluation*, the first call to the iterator will result in the entire collection being processed. A temporary copy of the source collection might also be required. For example, the `System.Linq.Enumerable.OrderBy*` method has to sort the entire collection before it returns the first element.

Lazy evaluation usually yields better performance because it distributes overhead processing evenly throughout the evaluation of the collection and minimizes the use of temporary data. Of course, for some operations, there is no other option than to materialize intermediate results.

See Deferred execution example for an example of programming deferred execution in C# and Visual Basic.

## See also

- Tutorial: Chain Queries Together in C#
- Concepts and terminology (functional transformation)
- Aggregation Operations (C#)
- Aggregation Operations (Visual Basic)
- yield (C# Reference)
