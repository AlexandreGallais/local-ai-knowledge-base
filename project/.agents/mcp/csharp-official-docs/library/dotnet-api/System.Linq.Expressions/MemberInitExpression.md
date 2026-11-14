---
title: "MemberInitExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MemberInitExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberInitExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class MemberInitExpression : System.Linq.Expressions.Expression
```

Represents calling a constructor and initializing one or more members of the new object.

#### Remarks
Use the `Expression.MemberInit` factory methods to create a `MemberInitExpression`.

The value of the `NodeType` property of a `MemberInitExpression` is `MemberInit`.

#### Examples
The following example creates a `MemberInitExpression` that represents the initialization of two members of a new object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## MemberInitExpression.Bindings property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.MemberBinding> Bindings { get; }
```

Gets the bindings that describe how to initialize the members of the newly created object.

Returns: A `ReadOnlyCollection<T>` of `MemberBinding` objects which describe how to initialize the members.

To be added.

## MemberInitExpression.CanReduce property

```csharp
public override bool CanReduce { get; }
```

Gets a value that indicates whether the expression tree node can be reduced.

Returns: `true` if the node can be reduced; otherwise, `false`.

To be added.

## MemberInitExpression.NewExpression property

```csharp
public System.Linq.Expressions.NewExpression NewExpression { get; }
```

Gets the expression that represents the constructor call.

Returns: A `NewExpression` that represents the constructor call.

To be added.

## MemberInitExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this Expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## MemberInitExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `MemberInitExpression.Type` that represents the static type of the expression.

To be added.

## MemberInitExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## MemberInitExpression.Reduce() method

```csharp
public override System.Linq.Expressions.Expression Reduce ();
```

Reduces the `MemberInitExpression` to a simpler expression.

Returns: The reduced expression.

#### Remarks
If the `CanReduce` method returns true, this method should return a valid expression.

This method is allowed to return another node that itself must be reduced.

## MemberInitExpression.Update(NewExpression, MemberBinding>) method

```csharp
public System.Linq.Expressions.MemberInitExpression Update (System.Linq.Expressions.NewExpression newExpression, System.Collections.Generic.IEnumerable<System.Linq.Expressions.MemberBinding> bindings);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `newExpression`: The `MemberInitExpression.NewExpression` property of the result.
- `bindings`: The `MemberInitExpression.Bindings` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
