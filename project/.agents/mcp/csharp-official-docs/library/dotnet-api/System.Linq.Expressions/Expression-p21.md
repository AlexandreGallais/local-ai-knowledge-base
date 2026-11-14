---
title: "Expression class (part 21 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 21 of 32)

## Expression.Multiply(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Multiply (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an arithmetic multiplication operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Multiply` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The multiplication operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the selected implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the multiplication operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined multiplication operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined multiplication operator.

#### Examples
The following code example shows how to create an expression that multiplies two values.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Multiply(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression Multiply (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an arithmetic multiplication operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Multiply` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the multiplication operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the multiplication operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined multiplication operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined multiplication operator.

## Expression.MultiplyAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression MultiplyAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a multiplication assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MultiplyAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.MultiplyAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression MultiplyAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a multiplication assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MultiplyAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.MultiplyAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression MultiplyAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a multiplication assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MultiplyAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.

## Expression.MultiplyAssignChecked(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression MultiplyAssignChecked (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a multiplication assignment operation that has overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MultiplyAssignChecked` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.MultiplyAssignChecked(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression MultiplyAssignChecked (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a multiplication assignment operation that has overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MultiplyAssignChecked` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.MultiplyAssignChecked(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression MultiplyAssignChecked (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a multiplication assignment operation that has overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MultiplyAssignChecked` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.
