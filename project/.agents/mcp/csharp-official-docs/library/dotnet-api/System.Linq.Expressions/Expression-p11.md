---
title: "Expression class (part 11 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 11 of 32)

## Expression.ExclusiveOr(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression ExclusiveOr (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a bitwise `XOR` operation, using `op_ExclusiveOr` for user-defined types. The implementing method can be specified.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ExclusiveOr` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the `XOR` operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the chosen implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the `XOR` operator, the `MethodInfo` that represents that method is the implementing method.

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

## Expression.ExclusiveOrAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ExclusiveOrAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a bitwise XOR assignment operation, using `op_ExclusiveOr` for user-defined types.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ExclusiveOrAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.ExclusiveOrAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression ExclusiveOrAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a bitwise XOR assignment operation, using `op_ExclusiveOr` for user-defined types.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ExclusiveOrAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.ExclusiveOrAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ExclusiveOrAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a bitwise XOR assignment operation, using `op_ExclusiveOr` for user-defined types.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ExclusiveOrAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.

## Expression.Field(Expression, FieldInfo) method

```csharp
public static System.Linq.Expressions.MemberExpression Field (System.Linq.Expressions.Expression? expression, System.Reflection.FieldInfo field);
```

Creates a `MemberExpression` that represents accessing a field.

Parameters:

- `expression`: An `Expression` to set the `MemberExpression.Expression` property equal to. For `static` (`Shared` in Visual Basic), `expression` must be `null`.
- `field`: The `FieldInfo` to set the `MemberExpression.Member` property equal to.

Returns: A `MemberExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberAccess` and the `MemberExpression.Expression` and `MemberExpression.Member` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `field` is `null`.

-or-

The field represented by `field` is not `static` (`Shared` in Visual Basic) and `expression` is `null`.
- `ArgumentException`: `expression`.Type is not assignable to the declaring type of the field represented by `field`.

#### Remarks
The `Type` property of the resulting `MemberExpression` is equal to the `FieldType` property of `field`.

## Expression.Field(Expression, String) method

```csharp
public static System.Linq.Expressions.MemberExpression Field (System.Linq.Expressions.Expression expression, string fieldName);
```

Creates a `MemberExpression` that represents accessing a field given the name of the field.

Parameters:

- `expression`: An `Expression` whose `Expression.Type` contains a field named `fieldName`. This can be null for static fields.
- `fieldName`: The name of a field to be accessed.

Returns: A `MemberExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberAccess`, the `MemberExpression.Expression` property set to `expression`, and the `MemberExpression.Member` property set to the `FieldInfo` that represents the field denoted by `fieldName`.

Exceptions:

- `ArgumentNullException`: `expression` or `fieldName` is `null`.
- `ArgumentException`: No field named `fieldName` is defined in `expression`.Type or its base types.

#### Remarks
The `Type` property of the resulting `MemberExpression` is equal to the `FieldType` property of the `FieldInfo` that represents the field denoted by `fieldName`.

This method searches `expression`.Type and its base types for a field that has the name `fieldName`. Public fields are given preference over non-public fields. If a matching field is found, this method passes `expression` and the `FieldInfo` that represents that field to `Expression.Field`.

#### Examples
The following code example shows how to create an expression that represents accessing a field.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Field(Expression, Type, String) method

```csharp
public static System.Linq.Expressions.MemberExpression Field (System.Linq.Expressions.Expression? expression, Type type, string fieldName);
```

Creates a `MemberExpression` that represents accessing a field.

Parameters:

- `expression`: The containing object of the field. This can be null for static fields.
- `type`: The `Expression.Type` that contains the field.
- `fieldName`: The field to be accessed.

Returns: The created `MemberExpression`.

To be added.

## Expression.GetActionType(Type[]) method

```csharp
public static Type GetActionType (params Type[]? typeArgs);
```

Creates a `Type` object that represents a generic `Action` delegate type that has specific type arguments.

Parameters:

- `typeArgs`: An array of up to sixteen `Type` objects that specify the type arguments for the `Action` delegate type.

Returns: The type of a `Action` delegate that has the specified type arguments.

Exceptions:

- `ArgumentException`: `typeArgs` contains more than sixteen elements.
- `ArgumentNullException`: `typeArgs` is `null`.

#### Remarks

As an example, if the elements of `typeArgs` represent the types `T1…Tn`, the resulting `Type` object represents the constructed delegate type `System.Action<T1,…,Tn>` in C# or `System.Action(Of T1,…,Tn)` in Visual Basic.

## Expression.GetDelegateType(Type[]) method

```csharp
public static Type GetDelegateType (params Type[] typeArgs);
```

Gets a `Expression.Type` object that represents a generic `Func<T>` or `Action` delegate type that has specific type arguments.

Parameters:

- `typeArgs`: The type arguments of the delegate.

Returns: The delegate type.

#### Remarks

The last type argument determines the return type of the delegate. If no `Func` or `Action` is large enough, it will generate a custom delegate type.

As with `Func`, the last argument is the return type. It can be set to `System.Void` to produce an `Action`.

## Expression.GetFuncType(Type[]) method

```csharp
public static Type GetFuncType (params Type[]? typeArgs);
```

Creates a `Expression.Type` object that represents a generic `Func<T>` delegate type that has specific type arguments. The last type argument specifies the return type of the created delegate.

Parameters:

- `typeArgs`: An array of one to seventeen `Type` objects that specify the type arguments for the `System.Func` delegate type.

Returns: The type of a `Func<T>` delegate that has the specified type arguments.

Exceptions:

- `ArgumentException`: `typeArgs` contains fewer than one or more than seventeen elements.
- `ArgumentNullException`: `typeArgs` is `null`.

#### Remarks
`typeArgs` must contain at least one and at most seventeen elements.

As an example, if the elements of `typeArgs` represent the types `T1…Tn`, the resulting `Type` object represents the constructed delegate type `System.Func<T1,…,Tn>` in C# or `System.Func(Of T1,…,Tn)` in Visual Basic.

## Expression.Goto(LabelTarget) method

```csharp
public static System.Linq.Expressions.GotoExpression Goto (System.Linq.Expressions.LabelTarget target);
```

Creates a `GotoExpression` representing a "go to" statement.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Goto, the `GotoExpression.Target` property set to the specified value, and a null value to be passed to the target label upon jumping.

#### Examples
The following example demonstrates how to create an expression that contains a `GotoExpression` object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Goto(LabelTarget, Expression) method

```csharp
public static System.Linq.Expressions.GotoExpression Goto (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? value);
```

Creates a `GotoExpression` representing a "go to" statement. The value passed to the label upon jumping can be specified.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `value`: The value that will be passed to the associated label upon jumping.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Goto, the `GotoExpression.Target` property set to `target`, and `value` to be passed to the target label upon jumping.

To be added.

## Expression.Goto(LabelTarget, Type) method

```csharp
public static System.Linq.Expressions.GotoExpression Goto (System.Linq.Expressions.LabelTarget target, Type type);
```

Creates a `GotoExpression` representing a "go to" statement with the specified type.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `type`: An `Type` to set the `Expression.Type` property equal to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Goto, the `GotoExpression.Target` property set to the specified value, the `Expression.Type` property set to `type`, and a null value to be passed to the target label upon jumping.

To be added.
