---
title: "Expression class (part 32 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 32 of 32)

## Expression.UnaryPlus(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression UnaryPlus (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that represents a unary plus operation.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.UnaryPlus` and the `UnaryExpression.Operand` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.
- `InvalidOperationException`: The unary plus operator is not defined for `expression`.Type.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are false.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `expression`.Type is a user-defined type that defines the unary plus operator, the `MethodInfo` that represents that operator is the implementing method.

- Otherwise, if `expression`.Type is a numeric type, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `expression`.Type is assignable to the argument type of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `expression`.Type is a nullable value type and the corresponding non-nullable value type is equal to the argument type of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`, the type of the node is `expression`.Type. If `expression`.Type is non-nullable, the node is not lifted. Otherwise, the node is lifted.

## Expression.UnaryPlus(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression UnaryPlus (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents a unary plus operation.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `method`: A `MethodInfo` to set the `UnaryExpression.Method` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.UnaryPlus` and the `UnaryExpression.Operand` and `UnaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly one argument.
- `InvalidOperationException`: `method` is `null` and the unary plus operator is not defined for `expression`.Type.

-or-

`expression`.Type (or its corresponding non-nullable type if it is a nullable value type) is not assignable to the argument type of the method represented by `method`.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are false.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes one argument, it is the implementing method for the node.

- If `expression`.Type is a user-defined type that defines the unary plus operator, the `MethodInfo` that represents that operator is the implementing method.

- Otherwise, if `expression`.Type is a numeric type, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `expression`.Type is assignable to the argument type of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `expression`.Type is a nullable value type and the corresponding non-nullable value type is equal to the argument type of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`, the type of the node is `expression`.Type. If `expression`.Type is non-nullable, the node is not lifted. Otherwise, the node is lifted.

## Expression.Unbox(Expression, Type) method

```csharp
public static System.Linq.Expressions.UnaryExpression Unbox (System.Linq.Expressions.Expression expression, Type type);
```

Creates a `UnaryExpression` that represents an explicit unboxing.

Parameters:

- `expression`: An `Expression` to unbox.
- `type`: The new `Type` of the expression.

Returns: An instance of `UnaryExpression`.

To be added.

## Expression.Variable(Type) method

```csharp
public static System.Linq.Expressions.ParameterExpression Variable (Type type);
```

Creates a `ParameterExpression` node that can be used to identify a parameter or a variable in an expression tree.

Parameters:

- `type`: The type of the parameter or variable.

Returns: A `ParameterExpression` node with the specified name and type.

To be added.

## Expression.Variable(Type, String) method

```csharp
public static System.Linq.Expressions.ParameterExpression Variable (Type type, string? name);
```

Creates a `ParameterExpression` node that can be used to identify a parameter or a variable in an expression tree.

Parameters:

- `type`: The type of the parameter or variable.
- `name`: The name of the parameter or variable. This name is used for debugging or printing purpose only.

Returns: A `ParameterExpression` node with the specified name and type.

To be added.

## Expression.VisitChildren(ExpressionVisitor) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitChildren (System.Linq.Expressions.ExpressionVisitor visitor);
```

Reduces the node and then calls the visitor delegate on the reduced expression. The method throws an exception if the node is not reducible.

Parameters:

- `visitor`: An instance of `Func<T1,T2>`.

Returns: The expression being visited, or an expression which should replace it in the tree.

#### Remarks
Override this method to provide logic to walk the node's children. A typical implementation will call visitor.Visit on each of its children, and if any of them change, should return a new copy of itself with the modified children.
