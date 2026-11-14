---
title: "IQueryProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/IQueryProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IQueryProvider interface

Namespace: `System.Linq`

```csharp
public interface IQueryProvider
```

Defines methods to create and execute queries that are described by an `IQueryable` object.

#### Remarks
The `IQueryProvider` interface is intended for implementation by query providers.

For more information about how to create your own LINQ provider, see LINQ: Building an IQueryable Provider.

## IQueryProvider.CreateQuery(Expression) method

```csharp
public System.Linq.IQueryable CreateQuery (System.Linq.Expressions.Expression expression);
```

Constructs an `IQueryable` object that can evaluate the query represented by a specified expression tree.

Parameters:

- `expression`: An expression tree that represents a LINQ query.

Returns: An `IQueryable` that can evaluate the query represented by the specified expression tree.

#### Remarks

> **Note:**
>  The `Expression` property of the returned `IQueryable` object is equal to `expression`.

The `IQueryProvider.CreateQuery` method is used to create new `IQueryable` objects, given an expression tree. The query that is represented by the returned object is associated with a specific LINQ provider.

Several of the standard query operator methods defined in `Queryable`, such as `Queryable.OfType` and `Queryable.Cast`, call this method. They pass it a `MethodCallExpression` that represents a LINQ query.

## IQueryProvider.CreateQuery<TElement>(Expression) method

```csharp
public System.Linq.IQueryable<TElement> CreateQuery<TElement> (System.Linq.Expressions.Expression expression);
```

Constructs an `IQueryable<T>` object that can evaluate the query represented by a specified expression tree.

Parameters:

- `TElement`: The type of the elements of the `IQueryable<T>` that is returned.
- `expression`: An expression tree that represents a LINQ query.

Returns: An `IQueryable<T>` that can evaluate the query represented by the specified expression tree.

#### Remarks

> **Note:**
>  The `Expression` property of the returned `IQueryable<T>` object is equal to `expression`.

The `IQueryProvider.CreateQuery` method is used to create new `IQueryable<T>` objects, given an expression tree. The query that is represented by the returned object is associated with a specific LINQ provider.

Most of the `Queryable` standard query operator methods that return enumerable results call this method. They pass it a `MethodCallExpression` that represents a LINQ query.

## IQueryProvider.Execute(Expression) method

```csharp
public object? Execute (System.Linq.Expressions.Expression expression);
```

Executes the query represented by a specified expression tree.

Parameters:

- `expression`: An expression tree that represents a LINQ query.

Returns: The value that results from executing the specified query.

#### Remarks
The `IQueryProvider.Execute` method executes queries that return a single value (instead of an enumerable sequence of values). Expression trees that represent queries that return enumerable results are executed when their associated `IQueryable` object is enumerated.

## IQueryProvider.Execute<TResult>(Expression) method

```csharp
public TResult Execute<TResult> (System.Linq.Expressions.Expression expression);
```

Executes the strongly-typed query represented by a specified expression tree.

Parameters:

- `TResult`: The type of the value that results from executing the query.
- `expression`: An expression tree that represents a LINQ query.

Returns: The value that results from executing the specified query.

#### Remarks
The `IQueryProvider.Execute` method executes queries that return a single value (instead of an enumerable sequence of values). Expression trees that represent queries that return enumerable results are executed when the `IQueryable<T>` object that contains the expression tree is enumerated.

The `Queryable` standard query operator methods that return singleton results call `IQueryProvider.Execute`. They pass it a `MethodCallExpression` that represents a LINQ query.
