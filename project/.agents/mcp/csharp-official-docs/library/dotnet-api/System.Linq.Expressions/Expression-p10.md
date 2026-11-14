---
title: "Expression class (part 10 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 10 of 32)

## Expression.ElementInit(MethodInfo, Expression[]) method

```csharp
public static System.Linq.Expressions.ElementInit ElementInit (System.Reflection.MethodInfo addMethod, params System.Linq.Expressions.Expression[] arguments);
```

Creates an `ElementInit`, given an array of values as the second argument.

Parameters:

- `addMethod`: A `MethodInfo` to set the `ElementInit.AddMethod` property equal to.
- `arguments`: An array of `Expression` objects to set the `ElementInit.Arguments` property equal to.

Returns: An `ElementInit` that has the `ElementInit.AddMethod` and `ElementInit.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `addMethod` or `arguments` is `null`.
- `ArgumentException`: The method that addMethod represents is not named "Add" (case insensitive).

-or-

The method that addMethod represents is not an instance method.

-or-

arguments does not contain the same number of elements as the number of parameters for the method that addMethod represents.

-or-

The `Expression.Type` property of one or more elements of `arguments` is not assignable to the type of the corresponding parameter of the method that `addMethod` represents.

#### Remarks
The `addMethod` parameter must represent an instance method named "Add" (case insensitive). The add method must have the same number of parameters as the number of elements in `arguments`. The `Type` property of each element in `arguments` must be assignable to the type of the corresponding parameter of the add method, possibly after *quoting*.

> **Note:**
>  An element will be quoted only if the corresponding method parameter is of type `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `arguments`.

#### Examples
The following example demonstrates how to use the `ElementInit` method to create an `ElementInit` that represents calling the `Dictionary<T1,T2>.Add` method to initialize an element of a dictionary collection.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.Empty() method

```csharp
public static System.Linq.Expressions.DefaultExpression Empty ();
```

Creates an empty expression that has `Void` type.

Returns: A `DefaultExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Default` and the `Expression.Type` property set to `Void`.

#### Remarks
An empty expression can be used where an expression is expected but no action is desired. For example, you can use an empty expression as the last expression in a block expression. In this case, the block expression's return value is void.

#### Examples
The following code example shows how to create an empty expression and add it to a block expression.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Equal(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Equal (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an equality comparison.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Equal` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The equality operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `IsLifted` property is `true`. Otherwise, it is `false`. The `IsLiftedToNull` property is always `false`. The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the equality operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is `Boolean`:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is `Boolean`.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is `Boolean`.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is `Boolean`.

#### Examples
The following code example shows how to create an expression that checks whether the values of its two arguments are equal.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Equal(Expression, Expression, Boolean, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression Equal (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, bool liftToNull, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an equality comparison. The implementing method can be specified.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `liftToNull`: `true` to set `BinaryExpression.IsLiftedToNull` to `true`; `false` to set `BinaryExpression.IsLiftedToNull` to `false`.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Equal` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.IsLiftedToNull`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the equality operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `IsLifted` property is `true` and the `IsLiftedToNull` property is equal to `liftToNull`. Otherwise, they are both `false`. The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the equality operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted; also, the type of the node is nullable `Boolean` if `liftToNull` is `true` or `Boolean` if `liftToNull` is `false`:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is `Boolean`.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is `Boolean`.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is nullable `Boolean` if `liftToNull` is `true` or `Boolean` if `liftToNull` is `false`.

## Expression.ExclusiveOr(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ExclusiveOr (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a bitwise `XOR` operation, using `op_ExclusiveOr` for user-defined types.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ExclusiveOr` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The `XOR` operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the `XOR` operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are integral or Boolean types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined `XOR` operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined `XOR` operator.

#### Examples
The following code example shows how to create an expression that represents the logical XOR operation.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._
