---
title: "Expression class (part 7 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 7 of 32)

## Expression.Coalesce(Expression, Expression, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Coalesce (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a coalescing operation, given a conversion function.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Coalesce` and the `BinaryExpression.Left`, `BinaryExpression.Right` and `BinaryExpression.Conversion` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `left`.Type and `right`.Type are not convertible to each other.

-or-

`conversion` is not `null` and `conversion`.Type is a delegate type that does not take exactly one argument.
- `InvalidOperationException`: The `Expression.Type` property of `left` does not represent a reference type or a nullable value type.

-or-

The `Expression.Type` property of `left` represents a type that is not assignable to the parameter type of the delegate type `conversion`.Type.

-or-

The `Expression.Type` property of `right` is not equal to the return type of the delegate type `conversion`.Type.

#### Remarks
The `Method` property of the resulting `BinaryExpression` is `null` and both `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` are set to `false`.

The `Type` property of the resulting `BinaryExpression` is equal to the result type of the coalescing operation.

The following rules determine the result type:

- If `left`.Type represents a nullable type and `right`.Type is implicitly convertible to the corresponding non-nullable type, the result type is the non-nullable equivalent of `left`.Type.

- Otherwise, if `right`.Type is implicitly convertible to `left`.Type, the result type is `left`.Type.

- Otherwise, if the non-nullable equivalent of `left`.Type is implicitly convertible to `right`.Type, the result type is `right`.Type.

## Expression.Condition(Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.ConditionalExpression Condition (System.Linq.Expressions.Expression test, System.Linq.Expressions.Expression ifTrue, System.Linq.Expressions.Expression ifFalse);
```

Creates a `ConditionalExpression` that represents a conditional statement.

Parameters:

- `test`: An `Expression` to set the `ConditionalExpression.Test` property equal to.
- `ifTrue`: An `Expression` to set the `ConditionalExpression.IfTrue` property equal to.
- `ifFalse`: An `Expression` to set the `ConditionalExpression.IfFalse` property equal to.

Returns: A `ConditionalExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Conditional` and the `ConditionalExpression.Test`, `ConditionalExpression.IfTrue`, and `ConditionalExpression.IfFalse` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `test` or `ifTrue` or `ifFalse` is `null`.
- `ArgumentException`: `test`.Type is not `Boolean`.

-or-

`ifTrue`.Type is not equal to `ifFalse`.Type.

#### Remarks
The `Type` property of the resulting `ConditionalExpression` is equal to the `Type` property of `ifTrue`.

#### Examples
The following code example shows how to create an expression that represents a conditional statement. If the first argument evaluates to `true`, the second argument is executed; otherwise, the third argument is executed.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Condition(Expression, Expression, Expression, Type) method

```csharp
public static System.Linq.Expressions.ConditionalExpression Condition (System.Linq.Expressions.Expression test, System.Linq.Expressions.Expression ifTrue, System.Linq.Expressions.Expression ifFalse, Type type);
```

Creates a `ConditionalExpression` that represents a conditional statement.

Parameters:

- `test`: An `Expression` to set the `ConditionalExpression.Test` property equal to.
- `ifTrue`: An `Expression` to set the `ConditionalExpression.IfTrue` property equal to.
- `ifFalse`: An `Expression` to set the `ConditionalExpression.IfFalse` property equal to.
- `type`: A `Expression.Type` to set the `Expression.Type` property equal to.

Returns: A `ConditionalExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Conditional` and the `ConditionalExpression.Test`, `ConditionalExpression.IfTrue`, and `ConditionalExpression.IfFalse` properties set to the specified values.

#### Remarks
This method allows explicitly unifying the result type of the conditional expression in cases where the types of `ifTrue` and `ifFalse` expressions are not equal. Types of both `ifTrue` and `ifFalse` must be implicitly reference assignable to the result type. The `type` is allowed to be `Void`.

## Expression.Constant(Object) method

```csharp
public static System.Linq.Expressions.ConstantExpression Constant (object? value);
```

Creates a `ConstantExpression` that has the `ConstantExpression.Value` property set to the specified value.

Parameters:

- `value`: An `Object` to set the `ConstantExpression.Value` property equal to.

Returns: A `ConstantExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Constant` and the `ConstantExpression.Value` property set to the specified value.

#### Remarks
The `Type` property of the resulting `ConstantExpression` is equal to the type of `value`. If `value` is `null`, `Expression.Type` is equal to `Object`.

To represent `null`, you can also use the `Constant` method, with which you can explicitly specify the type.

#### Examples
The following code example shows how to create an expression that represents a constant value.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Constant(Object, Type) method

```csharp
public static System.Linq.Expressions.ConstantExpression Constant (object? value, Type type);
```

Creates a `ConstantExpression` that has the `ConstantExpression.Value` and `Expression.Type` properties set to the specified values.

Parameters:

- `value`: An `Object` to set the `ConstantExpression.Value` property equal to.
- `type`: A `Type` to set the `Expression.Type` property equal to.

Returns: A `ConstantExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Constant` and the `ConstantExpression.Value` and `Expression.Type` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: `value` is not `null` and `type` is not assignable from the dynamic type of `value`.

#### Remarks
This method can be useful for representing values of nullable types.

#### Examples
The following code example shows how to create an expression that represents a constant of the nullable type and set its value to `null`.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Continue(LabelTarget) method

```csharp
public static System.Linq.Expressions.GotoExpression Continue (System.Linq.Expressions.LabelTarget target);
```

Creates a `GotoExpression` representing a continue statement.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Continue, the `GotoExpression.Target` property set to `target`, and a null value to be passed to the target label upon jumping.

#### Examples
The following example demonstrates how to create a loop expression that uses the `Expression.Continue` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Continue(LabelTarget, Type) method

```csharp
public static System.Linq.Expressions.GotoExpression Continue (System.Linq.Expressions.LabelTarget target, Type type);
```

Creates a `GotoExpression` representing a continue statement with the specified type.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `type`: An `Type` to set the `Expression.Type` property equal to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Continue, the `GotoExpression.Target` property set to `target`, the `Expression.Type` property set to `type`, and a null value to be passed to the target label upon jumping.

To be added.

## Expression.Convert(Expression, Type) method

```csharp
public static System.Linq.Expressions.UnaryExpression Convert (System.Linq.Expressions.Expression expression, Type type);
```

Creates a `UnaryExpression` that represents a type conversion operation.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `type`: A `Type` to set the `Expression.Type` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Convert` and the `UnaryExpression.Operand` and `Expression.Type` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `expression` or `type` is `null`.
- `InvalidOperationException`: No conversion operator is defined between `expression`.Type and `type`.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is set to the implementing method. The `IsLiftedToNull` property is `false`. If the node is lifted, `UnaryExpression.IsLifted` is `true`. Otherwise, it is `false`.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If either `expression`.Type or `type` is a user-defined type that defines an implicit or explicit conversion operator, the `MethodInfo` that represents that operator is the implementing method.

- Otherwise:

- If both `expression`.Type and `type` represent numeric or Boolean types, or nullable or non-nullable enumeration types, the implementing method is `null`.

- If either `expression`.Type or `type` is a reference type and an explicit boxing, unboxing, or reference conversion exists from `expression`.Type to `type`, the implementing method is `null`.

#### Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `expression`.Type is assignable to the argument type of the implementing method and the return type of the implementing method is assignable to `type`, the node is not lifted.

- If one or both of `expression`.Type or `type` is a nullable value type and the corresponding non-nullable value types are equal to the argument type and the return type of the implementing method respectively, the node is lifted.

If the implementing method is `null`:

- If both `expression`.Type and `type` are non-nullable, the node is not lifted.

- Otherwise the node is lifted.

#### Examples
The following code example shows how to create an expression that represents a type conversion operation.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Convert(Expression, Type, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression Convert (System.Linq.Expressions.Expression expression, Type type, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents a conversion operation for which the implementing method is specified.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `type`: A `Type` to set the `Expression.Type` property equal to.
- `method`: A `MethodInfo` to set the `UnaryExpression.Method` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Convert` and the `UnaryExpression.Operand`, `Expression.Type`, and `UnaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `expression` or `type` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly one argument.
- `InvalidOperationException`: No conversion operator is defined between `expression`.Type and `type`.

-or-

`expression`.Type is not assignable to the argument type of the method represented by `method`.

-or-

The return type of the method represented by `method` is not assignable to `type`.

-or-

`expression`.Type or `type` is a nullable value type and the corresponding non-nullable value type does not equal the argument type or the return type, respectively, of the method represented by `method`.
- `AmbiguousMatchException`: More than one method that matches the `method` description was found.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is set to the implementing method. The `IsLiftedToNull` property is `false`. If the node is lifted, `UnaryExpression.IsLifted` is `true`. Otherwise, it is `false`.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If method is not `null`, it is the implementing method. It must represent a non-void, `static` (`Shared` in Visual Basic) method that takes one argument.

- Otherwise, if either `expression`.Type or `type` is a user-defined type that defines an implicit or explicit conversion operator, the `MethodInfo` that represents that operator is the implementing method.

- Otherwise:

- If both `expression`.Type and `type` represent numeric or Boolean types, or nullable or non-nullable enumeration types, the implementing method is `null`.

- If either `expression`.Type or `type` is a reference type and an explicit boxing, unboxing, or reference conversion exists from `expression`.Type to `type`, the implementing method is `null`.

#### Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `expression`.Type is assignable to the argument type of the implementing method and the return type of the implementing method is assignable to `type`, the node is not lifted.

- If either or both of `expression`.Type or `type` are a nullable value type and the corresponding non-nullable value types are equal to the argument type and the return type of the implementing method respectively, the node is lifted.

If the implementing method is `null`:

- If both `expression`.Type and `type` are non-nullable, the node is not lifted.

- Otherwise the node is lifted.
