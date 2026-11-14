---
title: "DefaultExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/DefaultExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class DefaultExpression : System.Linq.Expressions.Expression
```

Represents the default value of a type or an empty expression.

#### Examples
The following code example shows how to create an expression that represents a default value for a given type by using the `Expression.Default` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## DefaultExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## DefaultExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `DefaultExpression.Type` that represents the static type of the expression.

To be added.

## DefaultExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.
