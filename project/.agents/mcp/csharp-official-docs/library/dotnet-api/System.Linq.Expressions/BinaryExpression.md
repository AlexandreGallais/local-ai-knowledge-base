---
title: "BinaryExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/BinaryExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class BinaryExpression : System.Linq.Expressions.Expression
```

Represents an expression that has a binary operator.

The `BinaryExpression` class represents an expression that has a binary operator.

The following tables summarize the factory methods that can be used to create a `BinaryExpression` that has a specific node type, represented by the `NodeType` property. Each table contains information for a specific class of operations such as arithmetic or bitwise.

#### Binary arithmetic operations

|Node Type|Factory Method|
|---------------|--------------------|
|`Add`|`Expression.Add`|
|`AddChecked`|`Expression.AddChecked`|
|`Divide`|`Expression.Divide`|
|`Modulo`|`Expression.Modulo`|
|`Multiply`|`Expression.Multiply`|
|`MultiplyChecked`|`Expression.MultiplyChecked`|
|`Power`|`Expression.Power`|
|`Subtract`|`Expression.Subtract`|
|`SubtractChecked`|`Expression.SubtractChecked`|

#### Bitwise operations

|Node Type|Factory Method|
|---------------|--------------------|
|`And`|`Expression.And`|
|`Or`|`Expression.Or`|
|`ExclusiveOr`|`Expression.ExclusiveOr`|

#### Shift operations

|Node Type|Factory Method|
|---------------|--------------------|
|`LeftShift`|`Expression.LeftShift`|
|`RightShift`|`Expression.RightShift`|

#### Conditional Boolean operations

|Node Type|Factory Method|
|---------------|--------------------|
|`AndAlso`|`Expression.AndAlso`|
|`OrElse`|`Expression.OrElse`|

#### Comparison operations

|Node Type|Factory Method|
|---------------|--------------------|
|`Equal`|`Expression.Equal`|
|`NotEqual`|`Expression.NotEqual`|
|`GreaterThanOrEqual`|`Expression.GreaterThanOrEqual`|
|`GreaterThan`|`Expression.GreaterThan`|
|`LessThan`|`Expression.LessThan`|
|`LessThanOrEqual`|`Expression.LessThanOrEqual`|

#### Coalescing operations

|Node Type|Factory Method|
|---------------|--------------------|
|`Coalesce`|`Expression.Coalesce`|

#### Array indexing operations

|Node Type|Factory Method|
|---------------|--------------------|
|`ArrayIndex`|`Expression.ArrayIndex`|

In addition, the `Expression.MakeBinary` methods can also be used to create a `BinaryExpression`. These factory methods can be used to create a `BinaryExpression` of any node type that represents a binary operation. The parameter of these methods that is of type `NodeType` specifies the desired node type.

The following example creates a `BinaryExpression` object that represents the subtraction of one number from another.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## BinaryExpression.CanReduce property

```csharp
public override bool CanReduce { get; }
```

Gets a value that indicates whether the expression tree node can be reduced.

Returns: `true` if the expression tree node can be reduced; otherwise, `false`.

To be added.

## BinaryExpression.Conversion property

```csharp
public System.Linq.Expressions.LambdaExpression? Conversion { get; }
```

Gets the type conversion function that is used by a coalescing or compound assignment operation.

Returns: A `LambdaExpression` that represents a type conversion function.

#### Remarks
The `Conversion` property is `null` for any `BinaryExpression` whose `NodeType` property is not `Coalesce`.

## BinaryExpression.IsLifted property

```csharp
public bool IsLifted { get; }
```

Gets a value that indicates whether the expression tree node represents a *lifted* call to an operator.

Returns: `true` if the node represents a lifted call; otherwise, `false`.

#### Remarks
An operator call is lifted if the operator expects non-nullable operands but nullable operands are passed to it.

## BinaryExpression.IsLiftedToNull property

```csharp
public bool IsLiftedToNull { get; }
```

Gets a value that indicates whether the expression tree node represents a *lifted* call to an operator whose return type is lifted to a nullable type.

Returns: `true` if the operator's return type is lifted to a nullable type; otherwise, `false`.

#### Remarks
An operator call is lifted if the operator expects non-nullable operands but nullable operands are passed to it. If the value of `BinaryExpression.IsLiftedToNull` is `true`, the operator returns a nullable type, and if a nullable operand evaluates to `null`, the operator returns `null`.

## BinaryExpression.Left property

```csharp
public System.Linq.Expressions.Expression Left { get; }
```

Gets the left operand of the binary operation.

Returns: An `Expression` that represents the left operand of the binary operation.

To be added.

## BinaryExpression.Method property

```csharp
public System.Reflection.MethodInfo? Method { get; }
```

Gets the implementing method for the binary operation.

Returns: The `MethodInfo` that represents the implementing method.

#### Remarks
If a `BinaryExpression` represents an operation that uses a predefined operator, the `Method` property is `null`.

## BinaryExpression.Right property

```csharp
public System.Linq.Expressions.Expression Right { get; }
```

Gets the right operand of the binary operation.

Returns: An `Expression` that represents the right operand of the binary operation.

To be added.

## BinaryExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## BinaryExpression.Reduce() method

```csharp
public override System.Linq.Expressions.Expression Reduce ();
```

Reduces the binary expression node to a simpler expression.

Returns: The reduced expression.

#### Remarks
If CanReduce returns true, this should return a valid expression.

This method can return another node that itself must be reduced.

## BinaryExpression.Update(Expression, LambdaExpression, Expression) method

```csharp
public System.Linq.Expressions.BinaryExpression Update (System.Linq.Expressions.Expression left, System.Linq.Expressions.LambdaExpression? conversion, System.Linq.Expressions.Expression right);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `left`: The `BinaryExpression.Left` property of the result.
- `conversion`: The `BinaryExpression.Conversion` property of the result.
- `right`: The `BinaryExpression.Right` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
