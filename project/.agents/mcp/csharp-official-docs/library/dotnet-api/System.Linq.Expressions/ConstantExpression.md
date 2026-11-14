---
title: "ConstantExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ConstantExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConstantExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class ConstantExpression : System.Linq.Expressions.Expression
```

Represents an expression that has a constant value.

#### Remarks
Use the `Expression.Constant` factory methods to create a `ConstantExpression`.

The `Expression.NodeType` of a `ConstantExpression` is `Constant`.

#### Examples
The following code example shows how to create an expression that represents a constant value by using the `Expression.Constant` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## ConstantExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this Expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## ConstantExpression.Type property

```csharp
public override Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `ConstantExpression.Type` that represents the static type of the expression.

To be added.

## ConstantExpression.Value property

```csharp
public object? Value { get; }
```

Gets the value of the constant expression.

Returns: An `Object` equal to the value of the represented expression.

To be added.

## ConstantExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.
