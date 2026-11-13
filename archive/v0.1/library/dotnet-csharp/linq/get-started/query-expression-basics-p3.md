---
title: "Query expression basics (LINQ) (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/get-started/query-expression-basics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Query expression basics (LINQ) (part 3 of 3)

### Subqueries in a query expression

A query clause might itself contain a query expression, which is sometimes referred to as a *subquery*. Each subquery starts with its own `from` clause that doesn't necessarily point to the same data source in the first `from` clause. For example, the following query shows a query expression that is used in the select statement to retrieve the results of a grouping operation.

```csharp
var queryGroupMax =
    from student in students
    group student by student.Year into studentGroup
    select new
    {
        Level = studentGroup.Key,
        HighestScore = (
            from student2 in studentGroup
            select student2.ExamScores.Average()
        ).Max()
    };
```
For more information, see Perform a subquery on a grouping operation.

## See also

- Query keywords (LINQ)
- Standard query operators overview
