---
title: "EnumerableQuery<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/EnumerableQuery`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnumerableQuery<T> class

Namespace: `System.Linq`

```csharp
public class EnumerableQuery<T> : System.Linq.EnumerableQuery, System.Collections.Generic.IEnumerable<T>, System.Linq.IOrderedQueryable<T>, System.Linq.IQueryable<T>, System.Linq.IQueryProvider
```

Represents an `IEnumerable<T>` collection as an `IQueryable<T>` data source.

Parameters:

- `T`: The type of the data in the collection.

To be added.

## EnumerableQuery<T>.EnumerableQuery(IEnumerable<T>) constructor

```csharp
public EnumerableQuery (System.Collections.Generic.IEnumerable<T> enumerable);
```

Initializes a new instance of the `EnumerableQuery<T>` class and associates it with an `IEnumerable<T>` collection.

Parameters:

- `enumerable`: A collection to associate with the new instance.

To be added.

## EnumerableQuery<T>.EnumerableQuery(Expression) constructor

```csharp
public EnumerableQuery (System.Linq.Expressions.Expression expression);
```

Initializes a new instance of the `EnumerableQuery<T>` class and associates the instance with an expression tree.

Parameters:

- `expression`: An expression tree to associate with the new instance.

To be added.

## EnumerableQuery<T>.System.Linq.IQueryable.ElementType property

```csharp
Type System.Linq.IQueryable.ElementType { get; }
```

Gets the type of the data in the collection that this instance represents.

Returns: The type of the data in the collection that this instance represents.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `EnumerableQuery<T>` instance is cast to an `IQueryable` interface.

## EnumerableQuery<T>.System.Linq.IQueryable.Expression property

```csharp
System.Linq.Expressions.Expression System.Linq.IQueryable.Expression { get; }
```

Gets the expression tree that is associated with or that represents this instance.

Returns: The expression tree that is associated with or that represents this instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `EnumerableQuery<T>` instance is cast to an `IQueryable` interface.

## EnumerableQuery<T>.System.Linq.IQueryable.Provider property

```csharp
System.Linq.IQueryProvider System.Linq.IQueryable.Provider { get; }
```

Gets the query provider that is associated with this instance.

Returns: The query provider that is associated with this instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `EnumerableQuery<T>` instance is cast to an `IQueryable` interface.

## EnumerableQuery<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that can iterate through the associated `IEnumerable<T>` collection, or, if it is null, through the collection that results from rewriting the associated expression tree as a query on an `IEnumerable<T>` data source and executing it.

Returns: An enumerator that can be used to iterate through the associated data source.

To be added.

## EnumerableQuery<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that can iterate through the associated `IEnumerable<T>` collection, or, if it is null, through the collection that results from rewriting the associated expression tree as a query on an `IEnumerable<T>` data source and executing it.

Returns: An enumerator that can be used to iterate through the associated data source.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `EnumerableQuery<T>` instance is cast to an `IEnumerable` interface.

## EnumerableQuery<T>.System.Linq.IQueryProvider.CreateQuery(Expression) method

```csharp
System.Linq.IQueryable IQueryProvider.CreateQuery (System.Linq.Expressions.Expression expression);
```

Constructs a new `EnumerableQuery<T>` object and associates it with a specified expression tree that represents an `IQueryable` collection of data.

Parameters:

- `expression`: An expression tree that represents an `IQueryable` collection of data.

Returns: An `EnumerableQuery<T>` object that is associated with `expression`.

To be added.

## EnumerableQuery<T>.System.Linq.IQueryProvider.CreateQuery<TElement>(Expression) method

```csharp
System.Linq.IQueryable<S> IQueryProvider.CreateQuery<S> (System.Linq.Expressions.Expression expression);
```

Constructs a new `EnumerableQuery<T>` object and associates it with a specified expression tree that represents an `IQueryable<T>` collection of data.

Parameters:

- `S`: The type of the data in the collection that `expression` represents.
- `TElement`: The type of the elements of the `IQueryable<T>` that is returned.
- `expression`: An expression tree to execute.

Returns: An EnumerableQuery object that is associated with `expression`.

To be added.

## EnumerableQuery<T>.System.Linq.IQueryProvider.Execute(Expression) method

```csharp
object IQueryProvider.Execute (System.Linq.Expressions.Expression expression);
```

Executes an expression after rewriting it to call `Enumerable` methods instead of `Queryable` methods on any enumerable data sources that cannot be queried by `Queryable` methods.

Parameters:

- `expression`: An expression tree to execute.

Returns: The value that results from executing `expression`.

To be added.

## EnumerableQuery<T>.System.Linq.IQueryProvider.Execute<TElement>(Expression) method

```csharp
S IQueryProvider.Execute<S> (System.Linq.Expressions.Expression expression);
```

Executes an expression after rewriting it to call `Enumerable` methods instead of `Queryable` methods on any enumerable data sources that cannot be queried by `Queryable` methods.

Parameters:

- `S`: The type of the data in the collection that `expression` represents.
- `TElement`: To be added.
- `expression`: An expression tree to execute.

Returns: The value that results from executing `expression`.

To be added.

## EnumerableQuery<T>.ToString() method

```csharp
public override string? ToString ();
```

Returns a textual representation of the enumerable collection or, if it is null, of the expression tree that is associated with this instance.

Returns: A textual representation of the enumerable collection or, if it is null, of the expression tree that is associated with this instance.

To be added.
