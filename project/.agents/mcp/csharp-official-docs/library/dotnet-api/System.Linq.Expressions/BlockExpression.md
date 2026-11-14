---
title: "BlockExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/BlockExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BlockExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class BlockExpression : System.Linq.Expressions.Expression
```

Represents a block that contains a sequence of expressions where variables can be defined.

#### Remarks
The `Expression.Block` methods can be used to create a `BlockExpression`.

#### Examples
The following code example shows how to create a block expression. The block expression consists of two `MethodCallExpression` objects and one `ConstantExpression` object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## BlockExpression.Expressions property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Expressions { get; }
```

Gets the expressions in this block.

Returns: The read-only collection containing all the expressions in this block.

To be added.

## BlockExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## BlockExpression.Result property

```csharp
public System.Linq.Expressions.Expression Result { get; }
```

Gets the last expression in this block.

Returns: The `Expression` object representing the last expression in this block.

To be added.

## BlockExpression.Type property

```csharp
public override Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `BlockExpression.Type` that represents the static type of the expression.

To be added.

## BlockExpression.Variables property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.ParameterExpression> Variables { get; }
```

Gets the variables defined in this block.

Returns: The read-only collection containing all the variables defined in this block.

To be added.

## BlockExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## BlockExpression.Update(ParameterExpression>, Expression>) method

```csharp
public System.Linq.Expressions.BlockExpression Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? variables, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> expressions);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `variables`: The `BlockExpression.Variables` property of the result.
- `expressions`: The `BlockExpression.Expressions` property of the result.

Returns: This expression if no children changed, or an expression with the updated children.

To be added.
