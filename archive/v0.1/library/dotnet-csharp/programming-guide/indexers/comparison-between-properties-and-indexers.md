---
title: "Comparison Between Properties and Indexers"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/indexers/comparison-between-properties-and-indexers.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Comparison Between Properties and Indexers (C# Programming Guide)

Indexers are like properties. Except for the differences shown in the following table, all the rules that are defined for property accessors apply to indexer accessors also.

|Property|Indexer|
|--------------|-------------|
|Allows methods to be called as if they were public data members.|Allows elements of an internal collection of an object to be accessed by using array notation on the object itself.|
|Accessed through a simple name.|Accessed through an index.|
|Can be a static or an instance member.|Must be an instance member.|
|A get accessor of a property has no parameters.|A `get` accessor of an indexer has the same formal parameter list as the indexer.|
|A set accessor of a property contains the implicit `value` parameter.|A `set` accessor of an indexer has the same formal parameter list as the indexer, and also to the value parameter.|
|Supports shortened syntax with Automatically implemented properties.|Supports expression bodied members for get only indexers.|

## See also

- Indexers
- Properties
