---
title: "Generics and Arrays"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/generics/generics-and-arrays.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Generics and Arrays (C# Programming Guide)

Single-dimensional arrays that have a lower bound of zero automatically implement `System.Collections.Generic.IList`1`. This enables you to create generic methods that can use the same code to iterate through arrays and other collection types. This technique is primarily useful for reading data in collections. The `System.Collections.Generic.IList`1` interface cannot be used to add or remove elements from an array. An exception will be thrown if you try to call an `System.Collections.Generic.IList`1` method such as `System.Collections.Generic.IList`1.RemoveAt*` on an array in this context.

 The following code example demonstrates how a single generic method that takes an `System.Collections.Generic.IList`1` input parameter can iterate through both a list and an array, in this case an array of integers.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideGenerics/CS/Generics.cs._

## See also

- `System.Collections.Generic`
- Generics
- Arrays
- Generics
