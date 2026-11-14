---
title: "Query expression basics (LINQ) (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/get-started/query-expression-basics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
