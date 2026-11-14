---
title: "IQueryable<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/IQueryable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IQueryable<T> interface

Namespace: `System.Linq`

```csharp
public interface IQueryable<out T> : System.Collections.Generic.IEnumerable<out T>, System.Linq.IQueryable
```

Provides functionality to evaluate queries against a specific data source wherein the type of the data is known.

Parameters:

- `T`: The type of the data in the data source.

#### Remarks
The `IQueryable<T>` interface is intended for implementation by query providers.

This interface inherits the `IEnumerable<T>` interface so that if it represents a query, the results of that query can be enumerated. Enumeration forces the expression tree associated with an `IQueryable<T>` object to be executed. Queries that do not return enumerable results are executed when the `Execute<T>` method is called.

The definition of "executing an expression tree" is specific to a query provider. For example, it may involve translating the expression tree to a query language appropriate for an underlying data source.

The `IQueryable<T>` interface enables queries to be polymorphic. That is, because a query against an `IQueryable` data source is represented as an expression tree, it can be executed against different types of data sources.

The `static` (`Shared` in Visual Basic) methods defined in the class `Queryable` (except for `Queryable.AsQueryable`, `Queryable.ThenBy`, and `Queryable.ThenByDescending`) extend objects of types that implement the `IQueryable<T>` interface.

For more information about how to create your own LINQ provider, see LINQ: Building an IQueryable Provider.
