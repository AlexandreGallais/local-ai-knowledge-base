---
title: "TypeBinaryExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/TypeBinaryExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeBinaryExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class TypeBinaryExpression : System.Linq.Expressions.Expression
```

Represents an operation between an expression and a type.

#### Remarks
A type test is an example of an operation between an expression and a type.

Use the `Expression.TypeIs` factory method to create a `TypeBinaryExpression`.

The value of the `NodeType` property of a `TypeBinaryExpression` object is `TypeIs`.

#### Examples
The following example creates a `TypeBinaryExpression` object that represents a type test of a string value against the `Int32` type.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## TypeBinaryExpression.Expression property

```csharp
public System.Linq.Expressions.Expression Expression { get; }
```

Gets the expression operand of a type test operation.

Returns: An `Expression` that represents the expression operand of a type test operation.

To be added.

## TypeBinaryExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this Expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## TypeBinaryExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `TypeBinaryExpression.Expression` represents.

Returns: The `TypeBinaryExpression.Type` that represents the static type of the expression.

To be added.

## TypeBinaryExpression.TypeOperand property

```csharp
public Type TypeOperand { get; }
```

Gets the type operand of a type test operation.

Returns: A `Type` that represents the type operand of a type test operation.

To be added.

## TypeBinaryExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## TypeBinaryExpression.Update(Expression) method

```csharp
public System.Linq.Expressions.TypeBinaryExpression Update (System.Linq.Expressions.Expression expression);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `expression`: The `TypeBinaryExpression.Expression` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
