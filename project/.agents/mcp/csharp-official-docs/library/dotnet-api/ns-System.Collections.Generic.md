---
title: "System.Collections.Generic namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Collections.Generic.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Collections.Generic namespace

Contains interfaces and classes that define generic collections, which allow users to create strongly typed collections that provide better type safety and performance than non-generic strongly typed collections.

#### Remarks
Many of the generic collection types are direct analogs of nongeneric types. `Dictionary<T1,T2>` is a generic version of `Hashtable`; it uses the generic structure `KeyValuePair<T1,T2>` for enumeration instead of `DictionaryEntry`. `List<T>` is a generic version of `ArrayList`. There are generic `Queue<T>` and `Stack<T>` classes that correspond to the nongeneric versions. There are generic and nongeneric versions of `SortedList<T1,T2>`. Both versions are hybrids of a dictionary and a list. The `SortedDictionary<T1,T2>` generic class is a pure dictionary and has no nongeneric counterpart. The `LinkedList<T>` generic class is a true linked list and has no nongeneric counterpart.
