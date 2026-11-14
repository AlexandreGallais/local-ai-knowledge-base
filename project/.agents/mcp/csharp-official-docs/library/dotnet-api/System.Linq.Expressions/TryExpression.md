---
title: "TryExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/TryExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TryExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class TryExpression : System.Linq.Expressions.Expression
```

Represents a try/catch/finally/fault block.

#### Remarks
The body block is protected by the try block.

The handlers consist of a set of `CatchBlock` expressions that can be either catch statements or filters.

The fault block runs if an exception is thrown.

The finally block runs regardless of how control exits the body.

Only one of fault or finally blocks can be supplied.

The return type of the try block must match the return type of any associated catch statements.

#### Examples
The following example demonstrates how to create a `TryExpression` object that contains a catch statement by using the `Expression.TryCatch` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## TryExpression.Body property

```csharp
public System.Linq.Expressions.Expression Body { get; }
```

Gets the `Expression` representing the body of the try block.

Returns: The `Expression` representing the body of the try block.

To be added.

## TryExpression.Fault property

```csharp
public System.Linq.Expressions.Expression? Fault { get; }
```

Gets the `Expression` representing the fault block.

Returns: The `Expression` representing the fault block.

To be added.

## TryExpression.Finally property

```csharp
public System.Linq.Expressions.Expression? Finally { get; }
```

Gets the `Expression` representing the finally block.

Returns: The `Expression` representing the finally block.

To be added.

## TryExpression.Handlers property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.CatchBlock> Handlers { get; }
```

Gets the collection of `CatchBlock` expressions associated with the try block.

Returns: The collection of `CatchBlock` expressions associated with the try block.

To be added.

## TryExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## TryExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `TryExpression.Type` that represents the static type of the expression.

To be added.

## TryExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## TryExpression.Update(Expression, CatchBlock>, Expression, Expression) method

```csharp
public System.Linq.Expressions.TryExpression Update (System.Linq.Expressions.Expression body, System.Collections.Generic.IEnumerable<System.Linq.Expressions.CatchBlock>? handlers, System.Linq.Expressions.Expression? finally, System.Linq.Expressions.Expression? fault);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `body`: The `TryExpression.Body` property of the result.
- `handlers`: The `TryExpression.Handlers` property of the result.
- `finally`: The `TryExpression.Finally` property of the result.
- `fault`: The `TryExpression.Fault` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
