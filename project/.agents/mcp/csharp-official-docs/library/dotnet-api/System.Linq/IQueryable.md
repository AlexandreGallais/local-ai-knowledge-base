---
title: "IQueryable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/IQueryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IQueryable interface

Namespace: `System.Linq`

```csharp
public interface IQueryable : System.Collections.IEnumerable
```

Provides functionality to evaluate queries against a specific data source wherein the type of the data is not specified.

#### Remarks
The `IQueryable` interface is intended for implementation by query providers. It is only supposed to be implemented by providers that also implement `IQueryable<T>`. If the provider does not also implement `IQueryable<T>`, the standard query operators cannot be used on the provider's data source.

The `IQueryable` interface inherits the `IEnumerable` interface so that if it represents a query, the results of that query can be enumerated. Enumeration causes the expression tree associated with an `IQueryable` object to be executed. The definition of "executing an expression tree" is specific to a query provider. For example, it may involve translating the expression tree to an appropriate query language for the underlying data source. Queries that do not return enumerable results are executed when the `IQueryProvider.Execute` method is called.

For more information about how to create your own LINQ provider, see LINQ: Building an IQueryable Provider.

## IQueryable.ElementType property

```csharp
public Type ElementType { get; }
```

Gets the type of the element(s) that are returned when the expression tree associated with this instance of `IQueryable` is executed.

Returns: A `Type` that represents the type of the element(s) that are returned when the expression tree associated with this object is executed.

#### Remarks
The `ElementType` property represents the "T" in `IQueryable<T>` or `IQueryable(Of T)`.

## IQueryable.Expression property

```csharp
public System.Linq.Expressions.Expression Expression { get; }
```

Gets the expression tree that is associated with the instance of `IQueryable`.

Returns: The `Expression` that is associated with this instance of `IQueryable`.

#### Remarks
If an instance of `IQueryable` represents a LINQ query against a data source, the associated expression tree represents that query.

## IQueryable.Provider property

```csharp
public System.Linq.IQueryProvider Provider { get; }
```

Gets the query provider that is associated with this data source.

Returns: The `IQueryProvider` that is associated with this data source.

#### Remarks
If an instance of `IQueryable` represents a LINQ query against a data source, the associated query provider is the provider that created the `IQueryable` instance.
