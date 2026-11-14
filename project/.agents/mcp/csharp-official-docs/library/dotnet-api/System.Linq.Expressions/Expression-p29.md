---
title: "Expression class (part 29 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 29 of 32)

## Expression.RightShift(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression RightShift (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a bitwise right-shift operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.RightShift` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the right-shift operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the selected implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the right-shift operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type is an integral type (one of `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, or the corresponding nullable types) and `right`.Type is `Int32`, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined right-shift operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined right-shift operator.

## Expression.RightShiftAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression RightShiftAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a bitwise right-shift assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.RightShiftAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.RightShiftAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression RightShiftAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a bitwise right-shift assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.RightShiftAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.RightShiftAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression RightShiftAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a bitwise right-shift assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.RightShiftAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.

## Expression.RuntimeVariables(ParameterExpression>) method

```csharp
public static System.Linq.Expressions.RuntimeVariablesExpression RuntimeVariables (System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression> variables);
```

Creates an instance of `RuntimeVariablesExpression`.

Parameters:

- `variables`: A collection of `ParameterExpression` objects to use to populate the `RuntimeVariablesExpression.Variables` collection.

Returns: An instance of `RuntimeVariablesExpression` that has the `Expression.NodeType` property equal to `ExpressionType.RuntimeVariables` and the `RuntimeVariablesExpression.Variables` property set to the specified value.

To be added.

## Expression.RuntimeVariables(ParameterExpression[]) method

```csharp
public static System.Linq.Expressions.RuntimeVariablesExpression RuntimeVariables (params System.Linq.Expressions.ParameterExpression[] variables);
```

Creates an instance of `RuntimeVariablesExpression`.

Parameters:

- `variables`: An array of `ParameterExpression` objects to use to populate the `RuntimeVariablesExpression.Variables` collection.

Returns: An instance of `RuntimeVariablesExpression` that has the `Expression.NodeType` property equal to `ExpressionType.RuntimeVariables` and the `RuntimeVariablesExpression.Variables` property set to the specified value.

To be added.

## Expression.Subtract(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Subtract (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an arithmetic subtraction operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: A `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Subtract` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The subtraction operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the selected implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the subtraction operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined subtraction operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined subtraction operator.

#### Examples
The following code example shows how to create an expression that subtracts the argument from the first argument.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Subtract(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression Subtract (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an arithmetic subtraction operation that does not have overflow checking.

Parameters:

- `left`: A `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: A `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Subtract` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the subtraction operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the subtraction operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined subtraction operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined subtraction operator.

## Expression.SubtractAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression SubtractAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a subtraction assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.SubtractAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.
