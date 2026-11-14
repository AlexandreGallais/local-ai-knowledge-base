---
title: "Expression class (part 24 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 24 of 32)

## Expression.NewArrayBounds(Type, Expression>) method

```csharp
public static System.Linq.Expressions.NewArrayExpression NewArrayBounds (Type type, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> bounds);
```

Creates a `NewArrayExpression` that represents creating an array that has a specified rank.

Parameters:

- `type`: A `Type` that represents the element type of the array.
- `bounds`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `NewArrayExpression.Expressions` collection.

Returns: A `NewArrayExpression` that has the `Expression.NodeType` property equal to `ExpressionType.NewArrayBounds` and the `NewArrayExpression.Expressions` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `type` or `bounds` is `null`.

-or-

An element of `bounds` is `null`.
- `ArgumentException`: The `Expression.Type` property of an element of `bounds` does not represent an integral type.

#### Remarks
The `Type` property of the resulting `NewArrayExpression` represents an array type whose rank is equal to the length of `bounds` and whose element type is `type`.

The `Type` property of each element of `bounds` must represent an integral type.

#### Examples
The following example demonstrates how to use the `Expression.NewArrayBounds` method to create an expression tree that represents creating a string array that has a rank of 2.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.NewArrayBounds(Type, Expression[]) method

```csharp
public static System.Linq.Expressions.NewArrayExpression NewArrayBounds (Type type, params System.Linq.Expressions.Expression[] bounds);
```

Creates a `NewArrayExpression` that represents creating an array that has a specified rank.

Parameters:

- `type`: A `Type` that represents the element type of the array.
- `bounds`: An array of `Expression` objects to use to populate the `NewArrayExpression.Expressions` collection.

Returns: A `NewArrayExpression` that has the `Expression.NodeType` property equal to `ExpressionType.NewArrayBounds` and the `NewArrayExpression.Expressions` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `type` or `bounds` is `null`.

-or-

An element of `bounds` is `null`.
- `ArgumentException`: The `Expression.Type` property of an element of `bounds` does not represent an integral type.

#### Remarks
The `Type` property of the resulting `NewArrayExpression` represents an array type whose rank is equal to the length of `bounds` and whose element type is `type`.

The `Type` property of each element of `bounds` must represent an integral type.

#### Examples
The following example demonstrates how to use the `Expression.NewArrayBounds` method to create an expression tree that represents creating a string array that has a rank of 2.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.NewArrayInit(Type, Expression>) method

```csharp
public static System.Linq.Expressions.NewArrayExpression NewArrayInit (Type type, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> initializers);
```

Creates a `NewArrayExpression` that represents creating a one-dimensional array and initializing it from a list of elements.

Parameters:

- `type`: A `Type` that represents the element type of the array.
- `initializers`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `NewArrayExpression.Expressions` collection.

Returns: A `NewArrayExpression` that has the `Expression.NodeType` property equal to `ExpressionType.NewArrayInit` and the `NewArrayExpression.Expressions` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `type` or `initializers` is `null`.

-or-

An element of `initializers` is `null`.
- `InvalidOperationException`: The `Expression.Type` property of an element of `initializers` represents a type that is not assignable to the type that `type` represents.

#### Remarks
The `Type` property of each element of `initializers` must represent a type that is assignable to the type represented by `type`, possibly after it is *quoted*.

> **Note:**
>  An element will be quoted only if `type` is `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `initializers`.

The `Type` property of the resulting `NewArrayExpression` represents an array type whose rank is 1 and whose element type is `type`.

#### Examples
The following example demonstrates how to use the `Expression.NewArrayInit` method to create an expression tree that represents creating a one-dimensional string array that is initialized with a list of string expressions.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.NewArrayInit(Type, Expression[]) method

```csharp
public static System.Linq.Expressions.NewArrayExpression NewArrayInit (Type type, params System.Linq.Expressions.Expression[] initializers);
```

Creates a `NewArrayExpression` that represents creating a one-dimensional array and initializing it from a list of elements.

Parameters:

- `type`: A `Type` that represents the element type of the array.
- `initializers`: An array of `Expression` objects to use to populate the `NewArrayExpression.Expressions` collection.

Returns: A `NewArrayExpression` that has the `Expression.NodeType` property equal to `ExpressionType.NewArrayInit` and the `NewArrayExpression.Expressions` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `type` or `initializers` is `null`.

-or-

An element of `initializers` is `null`.
- `InvalidOperationException`: The `Expression.Type` property of an element of `initializers` represents a type that is not assignable to the type `type`.

#### Remarks
The `Type` property of each element of `initializers` must represent a type that is assignable to the type represented by `type`, possibly after it is *quoted*.

> **Note:**
>  An element will be quoted only if `type` is `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `initializers`.

The `Type` property of the resulting `NewArrayExpression` represents an array type whose rank is 1 and whose element type is `type`.

#### Examples
The following example demonstrates how to use the `Expression.NewArrayInit` method to create an expression tree that represents creating a one-dimensional string array that is initialized with a list of string expressions.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.Not(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression Not (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that represents a bitwise complement operation.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Not` and the `UnaryExpression.Operand` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.
- `InvalidOperationException`: The unary not operator is not defined for `expression`.Type.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `expression`.Type is a user-defined type that defines the unary not operator, the `MethodInfo` that represents that operator is the implementing method.

- Otherwise, if `expression`.Type is a numeric or Boolean type, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `expression`.Type is assignable to the argument type of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `expression`.Type is a nullable value type and the corresponding non-nullable type is equal to the argument type of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`, the type of the node is `expression`.Type. If `expression`.Type is non-nullable, the node is not lifted. Otherwise, the node is lifted.

#### Examples
The following example demonstrates how to create an expression that represents a logical NOT operation.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Not(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression Not (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents a bitwise complement operation. The implementing method can be specified.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.
- `method`: A `MethodInfo` to set the `UnaryExpression.Method` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Not` and the `UnaryExpression.Operand` and `UnaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly one argument.
- `InvalidOperationException`: `method` is `null` and the unary not operator is not defined for `expression`.Type.

-or-

`expression`.Type (or its corresponding non-nullable type if it is a nullable value type) is not assignable to the argument type of the method represented by `method`.

#### Remarks
The `Method` property of the resulting `UnaryExpression` is set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes one argument, it is the implementing method for the node.

- If `expression`.Type is a user-defined type that defines the unary not operator, the `MethodInfo` that represents that operator is the implementing method.

- Otherwise, if `expression`.Type is a numeric type, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `expression`.Type is assignable to the argument type of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `expression`.Type is a nullable value type and the corresponding non-nullable value type is equal to the argument type of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`, the type of the node is `expression`.Type. If `expression`.Type is non-nullable, the node is not lifted. Otherwise, the node is lifted.

## Expression.NotEqual(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression NotEqual (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an inequality comparison.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.NotEqual` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The inequality operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `IsLifted` property is `true`. Otherwise, it is `false`. The `IsLiftedToNull` property is always `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the inequality operator, the `MethodInfo` that represents that method is the implementing method.

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
