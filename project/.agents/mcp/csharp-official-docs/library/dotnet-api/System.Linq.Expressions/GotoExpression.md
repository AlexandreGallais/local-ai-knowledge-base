---
title: "GotoExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/GotoExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GotoExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class GotoExpression : System.Linq.Expressions.Expression
```

Represents an unconditional jump. This includes return statements, break and continue statements, and other jumps.

#### Examples
The following example demonstrates how to create an expression that contains a `GotoExpression` object by using the `Expression.Goto` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## GotoExpression.Kind property

```csharp
public System.Linq.Expressions.GotoExpressionKind Kind { get; }
```

The kind of the "go to" expression. Serves information purposes only.

Returns: The `GotoExpressionKind` object representing the kind of the "go to" expression.

To be added.

## GotoExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## GotoExpression.Target property

```csharp
public System.Linq.Expressions.LabelTarget Target { get; }
```

The target label where this node jumps to.

Returns: The `LabelTarget` object representing the target label for this node.

To be added.

## GotoExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `GotoExpression.Type` that represents the static type of the expression.

To be added.

## GotoExpression.Value property

```csharp
public System.Linq.Expressions.Expression? Value { get; }
```

The value passed to the target, or null if the target is of type System.Void.

Returns: The `Expression` object representing the value passed to the target or null.

To be added.

## GotoExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## GotoExpression.Update(LabelTarget, Expression) method

```csharp
public System.Linq.Expressions.GotoExpression Update (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? value);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `target`: The `GotoExpression.Target` property of the result.
- `value`: The `GotoExpression.Value` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
