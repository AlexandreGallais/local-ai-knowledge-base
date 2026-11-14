---
title: "Expression class (part 26 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 26 of 32)

## Expression.OrElse(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression OrElse (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a conditional `OR` operation that evaluates the second operand only if the first operand evaluates to `false`.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.OrElse` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The bitwise `OR` operator is not defined for `left`.Type and `right`.Type.

-or-

`left`.Type and `right`.Type are not the same Boolean type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the bitwise `OR` operator, the `MethodInfo` that represents that method is the implementing method.

> **Note:**
>  The conditional `OR` operator cannot be overloaded in C# or Visual Basic. However, the conditional `OR` operator is evaluated by using the bitwise `OR` operator. Thus, a user-defined overload of the bitwise `OR` operator can be the implementing method for this node type.

- Otherwise, if `left`.Type and `right`.Type are Boolean types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable, and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- `left`.Type and `right`.Type are the same Boolean type.

- If `left`.Type and `right`.Type are non-nullable, the node is not lifted. The type of the node is the result type of the predefined conditional `OR` operator.

- If `left`.Type and `right`.Type are nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined conditional `OR` operator.

#### Examples
The following code example shows how to create an expression that represents a logical `OR` operation that evaluates the second operand only if the first operand evaluates to `false`.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.OrElse(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression OrElse (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a conditional `OR` operation that evaluates the second operand only if the first operand evaluates to `false`.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.OrElse` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the bitwise `OR` operator is not defined for `left`.Type and `right`.Type.

-or-

`method` is `null` and `left`.Type and `right`.Type are not the same Boolean type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the bitwise `OR` operator, the `MethodInfo` that represents that method is the implementing method.

> **Note:**
>  The conditional `OR` operator cannot be overloaded in C# or Visual Basic. However, the conditional `OR` operator is evaluated by using the bitwise `OR` operator. Thus, a user-defined overload of the bitwise `OR` operator can be the implementing method for this node type.

- Otherwise, if `left`.Type and `right`.Type are Boolean types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable, and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- `left`.Type and `right`.Type are the same Boolean type.

- If `left`.Type and `right`.Type are non-nullable, the node is not lifted. The type of the node is the result type of the predefined conditional `OR` operator.

- If `left`.Type and `right`.Type are nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined conditional `OR` operator.

## Expression.Parameter(Type) method

```csharp
public static System.Linq.Expressions.ParameterExpression Parameter (Type type);
```

Creates a `ParameterExpression` node that can be used to identify a parameter or a variable in an expression tree.

Parameters:

- `type`: The type of the parameter or variable.

Returns: A `ParameterExpression` node with the specified name and type.

#### Examples
The following example demonstrates how to create a `MethodCallExpression` object that prints the value of a `ParameterExpression` object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Parameter(Type, String) method

```csharp
public static System.Linq.Expressions.ParameterExpression Parameter (Type type, string? name);
```

Creates a `ParameterExpression` node that can be used to identify a parameter or a variable in an expression tree.

Parameters:

- `type`: The type of the parameter or variable.
- `name`: The name of the parameter or variable, used for debugging or printing purpose only.

Returns: A `ParameterExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Parameter` and the `Expression.Type` and `ParameterExpression.Name` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

To be added.

## Expression.PostDecrementAssign(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression PostDecrementAssign (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that represents the assignment of the expression followed by a subsequent decrement by 1 of the original expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.PostDecrementAssign(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression PostDecrementAssign (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents the assignment of the expression followed by a subsequent decrement by 1 of the original expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.PostIncrementAssign(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression PostIncrementAssign (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that represents the assignment of the expression followed by a subsequent increment by 1 of the original expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.PostIncrementAssign(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression PostIncrementAssign (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents the assignment of the expression followed by a subsequent increment by 1 of the original expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.Power(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Power (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents raising a number to a power.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Power` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The exponentiation operator is not defined for `left`.Type and `right`.Type.

-or-

`left`.Type and/or `right`.Type are not `Double`.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the exponentiation operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are both `Double`, the implementing method is `Math.Pow`.

#### Node Type and Lifted versus Non-Lifted

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.
