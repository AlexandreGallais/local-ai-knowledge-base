---
title: "UnaryExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/UnaryExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnaryExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class UnaryExpression : System.Linq.Expressions.Expression
```

Represents an expression that has a unary operator.

#### Remarks
The following table summarizes the factory methods that can be used to create a `UnaryExpression` that has a specific node type.

|`Expression.NodeType`|Factory Method|
|----------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
|`ArrayLength`|`Expression.ArrayLength`|
|`Convert`|`Expression.Convert`|
|`ConvertChecked`|`Expression.ConvertChecked`|
|`Negate`|`Expression.Negate`|
|`NegateChecked`|`Expression.NegateChecked`|
|`Not`|`Expression.Not`|
|`Quote`|`Expression.Quote`|
|`TypeAs`|`Expression.TypeAs`|
|`UnaryPlus`|`Expression.UnaryPlus`|

In addition, the `Expression.MakeUnary` methods can also be used to create a `UnaryExpression`. These factory methods can be used to create a `UnaryExpression` of any node type that represents a unary operation. The parameter of these methods that is of type `Expression.NodeType` specifies the desired node type.

#### Examples
The following example creates a `UnaryExpression` object that represents the reference conversion of a non-nullable integer expression to the nullable integer type.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## UnaryExpression.CanReduce property

```csharp
public override bool CanReduce { get; }
```

Gets a value that indicates whether the expression tree node can be reduced.

Returns: `true` if a node can be reduced; otherwise, `false`.

To be added.

## UnaryExpression.IsLifted property

```csharp
public bool IsLifted { get; }
```

Gets a value that indicates whether the expression tree node represents a lifted call to an operator.

Returns: `true` if the node represents a lifted call; otherwise, `false`.

#### Remarks
An operator call is *lifted* if the operator expects a non-nullable operand but a nullable operand is passed to it.

## UnaryExpression.IsLiftedToNull property

```csharp
public bool IsLiftedToNull { get; }
```

Gets a value that indicates whether the expression tree node represents a lifted call to an operator whose return type is lifted to a nullable type.

Returns: `true` if the operator's return type is lifted to a nullable type; otherwise, `false`.

#### Remarks
An operator call is *lifted* if the operator expects a non-nullable operand but a nullable operand is passed to it. If the value of `UnaryExpression.IsLiftedToNull` is `true`, the operator returns a nullable type and if the nullable operand evaluates to `null`, the operator returns `null`.

## UnaryExpression.Method property

```csharp
public System.Reflection.MethodInfo? Method { get; }
```

Gets the implementing method for the unary operation.

Returns: The `MethodInfo` that represents the implementing method.

To be added.

## UnaryExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## UnaryExpression.Operand property

```csharp
public System.Linq.Expressions.Expression Operand { get; }
```

Gets the operand of the unary operation.

Returns: An `Expression` that represents the operand of the unary operation.

To be added.

## UnaryExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `UnaryExpression.Type` that represents the static type of the expression.

To be added.

## UnaryExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## UnaryExpression.Reduce() method

```csharp
public override System.Linq.Expressions.Expression Reduce ();
```

Reduces the expression node to a simpler expression.

Returns: The reduced expression.

#### Remarks
If the `CanReduce` method returns true, this should return a valid expression.

This method can return another node that itself must be reduced.

## UnaryExpression.Update(Expression) method

```csharp
public System.Linq.Expressions.UnaryExpression Update (System.Linq.Expressions.Expression operand);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `operand`: The `UnaryExpression.Operand` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
