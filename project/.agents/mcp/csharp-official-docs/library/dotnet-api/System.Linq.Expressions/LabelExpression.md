---
title: "LabelExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/LabelExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LabelExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class LabelExpression : System.Linq.Expressions.Expression
```

Represents a label, which can be put in any `Expression` context. If it is jumped to, it will get the value provided by the corresponding `GotoExpression`. Otherwise, it receives the value in `LabelExpression.DefaultValue`. If the `Type` equals System.Void, no value should be provided.

To be added.

## LabelExpression.DefaultValue property

```csharp
public System.Linq.Expressions.Expression? DefaultValue { get; }
```

The value of the `LabelExpression` when the label is reached through regular control flow (for example, is not jumped to).

Returns: The Expression object representing the value of the `LabelExpression`.

To be added.

## LabelExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## LabelExpression.Target property

```csharp
public System.Linq.Expressions.LabelTarget Target { get; }
```

The `LabelTarget` that this label is associated with.

Returns: The `LabelTarget` that this label is associated with.

To be added.

## LabelExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `LabelExpression.Type` that represents the static type of the expression.

To be added.

## LabelExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## LabelExpression.Update(LabelTarget, Expression) method

```csharp
public System.Linq.Expressions.LabelExpression Update (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? defaultValue);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `target`: The `LabelExpression.Target` property of the result.
- `defaultValue`: The `LabelExpression.DefaultValue` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
