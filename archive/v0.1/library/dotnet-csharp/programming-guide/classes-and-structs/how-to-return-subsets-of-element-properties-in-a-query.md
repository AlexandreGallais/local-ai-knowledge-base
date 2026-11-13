---
title: "How to return subsets of element properties in a query (part 1 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/how-to-return-subsets-of-element-properties-in-a-query.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to return subsets of element properties in a query (C# Programming Guide)

Use an anonymous type in a query expression when both of these conditions apply:

- You want to return only some of the properties of each source element.

- You do not have to store the query results outside the scope of the method in which the query is executed.

 If you only want to return one property or field from each source element, then you can just use the dot operator in the `select` clause. For example, to return only the `ID` of each `student`, write the `select` clause as follows:

```csharp
select student.ID;  
```
