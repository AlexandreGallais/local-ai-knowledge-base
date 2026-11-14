---
title: "Expression class (part 8 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 8 of 32)

## Expression.ConvertChecked(Expression, Type) method

```csharp
public static System.Linq.Expressions.UnaryExpression ConvertChecked (System.Linq.Expressions.Expression expression, Type type);
```

Creates a `UnaryExpression` that represents a conversion operation that throws an exception if the target type is overflowed.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `type`: A `Type` to set the `Expression.Type` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ConvertChecked` and the `UnaryExpression.Operand` and `Expression.Type` properties set to the specified values.

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

- If either or both of `expression`.Type or `type` are a nullable value type and the corresponding non-nullable value types are equal to the argument type and the return type of the implementing method respectively, the node is lifted.

If the implementing method is `null`:

- If both `expression`.Type and `type` are non-nullable, the node is not lifted.

- Otherwise the node is lifted.

## Expression.ConvertChecked(Expression, Type, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression ConvertChecked (System.Linq.Expressions.Expression expression, Type type, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents a conversion operation that throws an exception if the target type is overflowed and for which the implementing method is specified.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `type`: A `Type` to set the `Expression.Type` property equal to.
- `method`: A `MethodInfo` to set the `UnaryExpression.Method` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ConvertChecked` and the `UnaryExpression.Operand`, `Expression.Type`, and `UnaryExpression.Method` properties set to the specified values.

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

## Expression.DebugInfo(SymbolDocumentInfo, Int32, Int32, Int32, Int32) method

```csharp
public static System.Linq.Expressions.DebugInfoExpression DebugInfo (System.Linq.Expressions.SymbolDocumentInfo document, int startLine, int startColumn, int endLine, int endColumn);
```

Creates a `DebugInfoExpression` with the specified span.

Parameters:

- `document`: The `SymbolDocumentInfo` that represents the source file.
- `startLine`: The start line of this `DebugInfoExpression`. Must be greater than 0.
- `startColumn`: The start column of this `DebugInfoExpression`. Must be greater than 0.
- `endLine`: The end line of this `DebugInfoExpression`. Must be greater or equal than the start line.
- `endColumn`: The end column of this `DebugInfoExpression`. If the end line is the same as the start line, it must be greater or equal than the start column. In any case, must be greater than 0.

Returns: An instance of `DebugInfoExpression`.

To be added.

## Expression.Decrement(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression Decrement (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that represents the decrementing of the expression by 1.

Parameters:

- `expression`: An `Expression` to decrement.

Returns: A `UnaryExpression` that represents the decremented expression.

#### Remarks
This expression is functional and does not change the value of the object passed to it.

#### Examples
The following code example shows how to create an expression that subtracts 1 from a given value.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Decrement(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression Decrement (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents the decrementing of the expression by 1.

Parameters:

- `expression`: An `Expression` to decrement.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: A `UnaryExpression` that represents the decremented expression.

#### Remarks
This expression is functional and does not change the value of the object passed to it.

## Expression.Default(Type) method

```csharp
public static System.Linq.Expressions.DefaultExpression Default (Type type);
```

Creates a `DefaultExpression` that has the `Expression.Type` property set to the specified type.

Parameters:

- `type`: A `Type` to set the `Expression.Type` property equal to.

Returns: A `DefaultExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Default` and the `Expression.Type` property set to the specified type.

#### Examples
The following code example shows how to create an expression that represents a default value for a given type.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Divide(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Divide (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an arithmetic division operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Divide` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The division operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the division operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined division operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined division operator.

#### Examples
The following code example shows how to create an expression that divides its first argument by its second argument.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._
