---
title: "ListInitExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ListInitExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListInitExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class ListInitExpression : System.Linq.Expressions.Expression
```

Represents a constructor call that has a collection initializer.

#### Remarks
Use the `Expression.ListInit` factory methods to create a `ListInitExpression`.

The value of the `NodeType` property of a `ListInitExpression` is `ListInit`.

#### Examples
The following example creates a `ListInitExpression` that represents the initialization of a new dictionary instance that has two key-value pairs.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## ListInitExpression.CanReduce property

```csharp
public override bool CanReduce { get; }
```

Gets a value that indicates whether the expression tree node can be reduced.

Returns: `true` if the node can be reduced; otherwise, `false`.

To be added.

## ListInitExpression.Initializers property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.ElementInit> Initializers { get; }
```

Gets the element initializers that are used to initialize a collection.

Returns: A `ReadOnlyCollection<T>` of `ElementInit` objects which represent the elements that are used to initialize the collection.

To be added.

## ListInitExpression.NewExpression property

```csharp
public System.Linq.Expressions.NewExpression NewExpression { get; }
```

Gets the expression that contains a call to the constructor of a collection type.

Returns: A `NewExpression` that represents the call to the constructor of a collection type.

To be added.

## ListInitExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## ListInitExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `ListInitExpression.Type` that represents the static type of the expression.

To be added.

## ListInitExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## ListInitExpression.Reduce() method

```csharp
public override System.Linq.Expressions.Expression Reduce ();
```

Reduces the binary expression node to a simpler expression.

Returns: The reduced expression.

#### Remarks
If the `CanReduce` method returns true, this method should return a valid expression.

This method is allowed to return another node that itself must be reduced.

## ListInitExpression.Update(NewExpression, ElementInit>) method

```csharp
public System.Linq.Expressions.ListInitExpression Update (System.Linq.Expressions.NewExpression newExpression, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ElementInit> initializers);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `newExpression`: The `ListInitExpression.NewExpression` property of the result.
- `initializers`: The `ListInitExpression.Initializers` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
