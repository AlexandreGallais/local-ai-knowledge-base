---
title: "How to return subsets of element properties in a query"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/how-to-return-subsets-of-element-properties-in-a-query.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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

## Example

 The following example shows how to use an anonymous type to return only a subset of the properties of each source element that matches the specified condition.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideLINQ/CS/csRef30LangFeatures_2.cs._

 Note that the anonymous type uses the source element's names for its properties if no names are specified. To give new names to the properties in the anonymous type, write the `select` statement as follows:

```csharp
select new { First = student.FirstName, Last = student.LastName };  
```  

 If you try this in the previous example, then the `Console.WriteLine` statement must also change:

```csharp
Console.WriteLine(student.First + " " + student.Last);  
```  

## Compiling the Code

To run this code, copy and paste the class into a C# console application  with a `using` directive for System.Linq.

## See also

- Anonymous Types
- LINQ in C#
