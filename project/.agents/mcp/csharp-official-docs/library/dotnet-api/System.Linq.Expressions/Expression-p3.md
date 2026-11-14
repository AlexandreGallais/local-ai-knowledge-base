---
title: "Expression class (part 3 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 3 of 32)

## Expression.AndAlso(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression AndAlso (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a conditional `AND` operation that evaluates the second operand only if the first operand evaluates to `true`.

Parameters:

- `left`: A `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: A `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AndAlso` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The bitwise `AND` operator is not defined for `left`.Type and `right`.Type.

-or-

`left`.Type and `right`.Type are not the same Boolean type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the bitwise `AND` operator, the `MethodInfo` that represents that method is the implementing method.

> **Note:**
>  The conditional `AND` operator cannot be overloaded in C# or Visual Basic. However, the conditional `AND` operator is evaluated by using the bitwise `AND` operator. Thus, a user-defined overload of the bitwise `AND` operator can be the implementing method for this node type.

- Otherwise, if `left`.Type and `right`.Type are Boolean types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable, and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- `left`.Type and `right`.Type are the same Boolean type.

- If `left`.Type and `right`.Type are non-nullable, the node is not lifted. The type of the node is the result type of the predefined conditional `AND` operator.

- If `left`.Type and `right`.Type are nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined conditional `AND` operator.

#### Examples
The following code example shows how to create an expression that performs a logical AND operation on its two operands only if the first operand evaluates to `true`.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.AndAlso(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression AndAlso (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a conditional `AND` operation that evaluates the second operand only if the first operand is resolved to true. The implementing method can be specified.

Parameters:

- `left`: A `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: A `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AndAlso` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the bitwise `AND` operator is not defined for `left`.Type and `right`.Type.

-or-

`method` is `null` and `left`.Type and `right`.Type are not the same Boolean type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The implementing method for the operation is chosen based on the following rules:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the bitwise `AND` operator, the `MethodInfo` that represents that method is the implementing method.

> **Note:**
>  The conditional `AND` operator cannot be overloaded in C# or Visual Basic. However, the conditional `AND` operator is evaluated by using the bitwise `AND` operator. Thus, a user-defined overload of the bitwise `AND` operator can be the implementing method for this node type.

- Otherwise, if `left`.Type and `right`.Type are Boolean types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable, and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- `left`.Type and `right`.Type are the same Boolean type.

- If `left`.Type and `right`.Type are non-nullable, the node is not lifted. The type of the node is the result type of the predefined conditional `AND` operator.

- If `left`.Type and `right`.Type are nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined conditional `AND` operator.

## Expression.AndAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression AndAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a bitwise AND assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AndAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.AndAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression AndAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a bitwise AND assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AndAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.AndAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression AndAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a bitwise AND assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.AndAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.

## Expression.ArrayAccess(Expression, Expression>) method

```csharp
public static System.Linq.Expressions.IndexExpression ArrayAccess (System.Linq.Expressions.Expression array, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? indexes);
```

Creates an `IndexExpression` to access a multidimensional array.

Parameters:

- `array`: An expression that represents the multidimensional array.
- `indexes`: An `IEnumerable<T>` containing expressions used to index the array.

Returns: The created `IndexExpression`.

#### Remarks
The expression that represents the array can be obtained by using the `Expression.MakeMemberAccess` method, or through `Expression.NewArrayBounds` or `Expression.NewArrayInit`.

#### Examples
The following code example shows how to change the value of an element in a multidimensional array by using the `ArrayAccess` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.ArrayAccess(Expression, Expression[]) method

```csharp
public static System.Linq.Expressions.IndexExpression ArrayAccess (System.Linq.Expressions.Expression array, params System.Linq.Expressions.Expression[]? indexes);
```

Creates an `IndexExpression` to access an array.

Parameters:

- `array`: An expression representing the array to index.
- `indexes`: An array that contains expressions used to index the array.

Returns: The created `IndexExpression`.

#### Remarks
The expression that represents the array can be obtained by using the `Expression.MakeMemberAccess` method, or through `Expression.NewArrayBounds` or `Expression.NewArrayInit`.

For multidimensional arrays, use the `Expression.ArrayAccess` method.

#### Examples
The following code example shows how to change a value of an array element by using the `ArrayAccess` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.ArrayIndex(Expression, Expression>) method

```csharp
public static System.Linq.Expressions.MethodCallExpression ArrayIndex (System.Linq.Expressions.Expression array, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> indexes);
```

Creates a `MethodCallExpression` that represents applying an array index operator to an array of rank more than one.

Parameters:

- `array`: An `Expression` to set the `MethodCallExpression.Object` property equal to.
- `indexes`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `MethodCallExpression.Arguments` collection.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `array` or `indexes` is `null`.
- `ArgumentException`: `array`.Type does not represent an array type.

-or-

The rank of `array`.Type does not match the number of elements in `indexes`.

-or-

The `Expression.Type` property of one or more elements of `indexes` does not represent the `Int32` type.

#### Remarks
Each element of `indexes` must have `Expression.Type` equal to `Int32`. The `Type` property of `array` must represent an array type whose rank matches the number of elements in `indexes`.

If the rank of `array`.Type is 1, this method returns a `BinaryExpression`. The `Left` property is set to `array` and the `Right` property is set to the single element of `indexes`. The `Type` property of the `BinaryExpression` represents the element type of `array`.Type.

If the rank of `array`.Type is more than one, this method returns a `MethodCallExpression`. The `Method` property is set to the `MethodInfo` that describes the public instance method `Get` on the type represented by the `Type` property of `array`.

#### Examples
The following example demonstrates how to use the `ArrayIndex` method to create a `MethodCallExpression` that represents indexing into a two-dimensional array.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._
