---
title: "System.Collections.Specialized namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Collections.Specialized.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Collections.Specialized namespace

Contains specialized and strongly-typed collections; for example, a linked list dictionary, a bit vector, and collections that contain only strings.

#### Remarks
Specialized collections are collections with highly specific purposes. `NameValueCollection` is based on `NameObjectCollectionBase`; however, `NameValueCollection` accepts multiple values per key, whereas `NameObjectCollectionBase` accepts only one value per key.

Some strongly typed collections in the `Specialized` namespace are `StringCollection` and `StringDictionary`, both of which contain values that are exclusively strings.

The `CollectionsUtil` class creates instances of case-insensitive collections.

Some collections transform.  For example, the `HybridDictionary` class starts as a `ListDictionary` and becomes a `Hashtable` when it becomes large.  The `KeyedCollection<T1,T2>` is a list but it also creates a lookup dictionary when the number of elements reaches a specified threshold.
