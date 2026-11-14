---
title: "LoopExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/LoopExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoopExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class LoopExpression : System.Linq.Expressions.Expression
```

Represents an infinite loop. It can be exited with "break".

#### Examples
The following example demonstrates how to create a block expression that contains a `LoopExpression` object by using the `Expression.Loop` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## LoopExpression.Body property

```csharp
public System.Linq.Expressions.Expression Body { get; }
```

Gets the `Expression` that is the body of the loop.

Returns: The `Expression` that is the body of the loop.

To be added.

## LoopExpression.BreakLabel property

```csharp
public System.Linq.Expressions.LabelTarget? BreakLabel { get; }
```

Gets the `LabelTarget` that is used by the loop body as a break statement target.

Returns: The `LabelTarget` that is used by the loop body as a break statement target.

To be added.

## LoopExpression.ContinueLabel property

```csharp
public System.Linq.Expressions.LabelTarget? ContinueLabel { get; }
```

Gets the `LabelTarget` that is used by the loop body as a continue statement target.

Returns: The `LabelTarget` that is used by the loop body as a continue statement target.

To be added.

## LoopExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## LoopExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `LoopExpression.Type` that represents the static type of the expression.

To be added.

## LoopExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## LoopExpression.Update(LabelTarget, LabelTarget, Expression) method

```csharp
public System.Linq.Expressions.LoopExpression Update (System.Linq.Expressions.LabelTarget? breakLabel, System.Linq.Expressions.LabelTarget? continueLabel, System.Linq.Expressions.Expression body);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `breakLabel`: The `LoopExpression.BreakLabel` property of the result.
- `continueLabel`: The `LoopExpression.ContinueLabel` property of the result.
- `body`: The `LoopExpression.Body` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
