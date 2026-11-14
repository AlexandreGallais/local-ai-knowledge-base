---
title: "IOrderedQueryable<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/IOrderedQueryable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOrderedQueryable<T> interface

Namespace: `System.Linq`

```csharp
public interface IOrderedQueryable<out T> : System.Collections.Generic.IEnumerable<out T>, System.Linq.IOrderedQueryable, System.Linq.IQueryable<out T>
```

Represents the result of a sorting operation.

Parameters:

- `T`: The type of the content of the data source.

#### Remarks
The `IOrderedQueryable<T>` interface is intended for implementation by query providers.

This interface represents the result of a sorting query that calls the method(s) `Queryable.OrderBy`, `Queryable.OrderByDescending`, `Queryable.ThenBy` or `Queryable.ThenByDescending`. When `CreateQuery<T>` is called and passed an expression tree that represents a sorting query, the resulting `IQueryable<T>` object must be of a type that implements `IOrderedQueryable<T>`.

For more information about how to create your own LINQ provider, see LINQ: Building an IQueryable Provider.
