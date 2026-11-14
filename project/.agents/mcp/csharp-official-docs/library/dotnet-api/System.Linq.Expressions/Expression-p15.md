---
title: "Expression class (part 15 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 15 of 32)

## Expression.Lambda<TDelegate>(Expression, ParameterExpression[]) method

```csharp
public static System.Linq.Expressions.Expression<TDelegate> Lambda<TDelegate> (System.Linq.Expressions.Expression body, params System.Linq.Expressions.ParameterExpression[]? parameters);
```

Creates an `Expression<T>` where the delegate type is known at compile time, with an array of parameter expressions.

Parameters:

- `TDelegate`: A delegate type.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `parameters`: An array of `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An `Expression<T>` that has the `Expression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `body` is `null`.

-or-

One or more elements in `parameters` are `null`.
- `ArgumentException`: `TDelegate` is not a delegate type.

-or-

`body`.Type represents a type that is not assignable to the return type of `TDelegate`.

-or-

`parameters` does not contain the same number of elements as the list of parameters for `TDelegate`.

-or-

The `Expression.Type` property of an element of `parameters` is not assignable from the type of the corresponding parameter type of `TDelegate`.

#### Remarks
The number of parameters for the delegate type `TDelegate` must equal the number of elements in `parameters`.

The elements of `parameters` must be reference equal to the parameter expressions in`body`.

The `Type` property of the resulting object represents the type `TDelegate`. If `parameters` is `null`, the `Parameters` property of the resulting object is an empty collection.

## Expression.Lambda<TDelegate>(Expression, Boolean, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.Expression<TDelegate> Lambda<TDelegate> (System.Linq.Expressions.Expression body, bool tailCall, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates an `Expression<T>` where the delegate type is known at compile time, with a parameter that indicates whether tail call optimization will be applied, and an enumerable collection of parameter expressions.

Parameters:

- `TDelegate`: The delegate type.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An `Expression<T>` that has the `LambdaExpression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda<TDelegate>(Expression, Boolean, ParameterExpression[]) method

```csharp
public static System.Linq.Expressions.Expression<TDelegate> Lambda<TDelegate> (System.Linq.Expressions.Expression body, bool tailCall, params System.Linq.Expressions.ParameterExpression[]? parameters);
```

Creates an `Expression<T>` where the delegate type is known at compile time, with a parameter that indicates whether tail call optimization will be applied, and an array of parameter expressions.

Parameters:

- `TDelegate`: The delegate type.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An array that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An `Expression<T>` that has the `Expression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda<TDelegate>(Expression, String, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.Expression<TDelegate> Lambda<TDelegate> (System.Linq.Expressions.Expression body, string? name, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates an `Expression<T>` where the delegate type is known at compile time, with the name for the lambda, and an enumerable collection of parameter expressions.

Parameters:

- `TDelegate`: The delegate type.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `name`: The name of the lambda. Used for generating debugging information.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An `Expression<T>` that has the `Expression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda<TDelegate>(Expression, String, Boolean, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.Expression<TDelegate> Lambda<TDelegate> (System.Linq.Expressions.Expression body, string? name, bool tailCall, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates an `Expression<T>` where the delegate type is known at compile time, with the name for the lambda, a parameter that indicates whether tail call optimization will be applied, and an enumerable collection of parameter expressions.

Parameters:

- `TDelegate`: The delegate type.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `name`: The name of the lambda. Used for generating debugging info.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An `Expression<T>` that has the `LambdaExpression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.LeftShift(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression LeftShift (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a bitwise left-shift operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.LeftShift` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The left-shift operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the selected implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the left-shift operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type is an integral type (one of `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, or the corresponding nullable types) and `right`.Type is `Int32`, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined left-shift operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined left-shift operator.

## Expression.LeftShift(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression LeftShift (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a bitwise left-shift operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.LeftShift` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the left-shift operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the selected implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the left-shift operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type is an integral type (one of `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, or the corresponding nullable types) and `right`.Type is `Int32`, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined left-shift operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined left-shift operator.

## Expression.LeftShiftAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression LeftShiftAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a bitwise left-shift assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.LeftShiftAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.LeftShiftAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression LeftShiftAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a bitwise left-shift assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.LeftShiftAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.
