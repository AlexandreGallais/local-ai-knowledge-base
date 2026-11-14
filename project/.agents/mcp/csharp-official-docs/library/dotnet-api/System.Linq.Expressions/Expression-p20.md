---
title: "Expression class (part 20 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 20 of 32)

## Expression.MemberBind(MethodInfo, MemberBinding[]) method

```csharp
public static System.Linq.Expressions.MemberMemberBinding MemberBind (System.Reflection.MethodInfo propertyAccessor, params System.Linq.Expressions.MemberBinding[] bindings);
```

Creates a `MemberMemberBinding` that represents the recursive initialization of members of a member that is accessed by using a property accessor method.

Parameters:

- `propertyAccessor`: The `MethodInfo` that represents a property accessor method.
- `bindings`: An array of `MemberBinding` objects to use to populate the `MemberMemberBinding.Bindings` collection.

Returns: A `MemberMemberBinding` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.MemberBinding`, the `MemberBinding.Member` property set to the `PropertyInfo` that represents the property accessed in `propertyAccessor`, and `MemberMemberBinding.Bindings` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `propertyAccessor` or `bindings` is `null`.
- `ArgumentException`: `propertyAccessor` does not represent a property accessor method.

-or-

The `MemberBinding.Member` property of an element of `bindings` does not represent a member of the type of the property accessed by the method that `propertyAccessor` represents.

To be added.

## Expression.MemberInit(NewExpression, MemberBinding>) method

```csharp
public static System.Linq.Expressions.MemberInitExpression MemberInit (System.Linq.Expressions.NewExpression newExpression, System.Collections.Generic.IEnumerable<System.Linq.Expressions.MemberBinding> bindings);
```

Represents an expression that creates a new object and initializes a property of the object.

Parameters:

- `newExpression`: A `NewExpression` to set the `MemberInitExpression.NewExpression` property equal to.
- `bindings`: An `IEnumerable<T>` that contains `MemberBinding` objects to use to populate the `MemberInitExpression.Bindings` collection.

Returns: A `MemberInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberInit` and the `MemberInitExpression.NewExpression` and `MemberInitExpression.Bindings` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `newExpression` or `bindings` is `null`.
- `ArgumentException`: The `MemberBinding.Member` property of an element of `bindings` does not represent a member of the type that `newExpression`.Type represents.

#### Remarks
The `Type` property of the resulting `MemberInitExpression` is equal to the `Type` property of `newExpression`.

#### Examples
The following example demonstrates an expression that creates a new object and initializes a property of the object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.MemberInit(NewExpression, MemberBinding[]) method

```csharp
public static System.Linq.Expressions.MemberInitExpression MemberInit (System.Linq.Expressions.NewExpression newExpression, params System.Linq.Expressions.MemberBinding[] bindings);
```

Creates a `MemberInitExpression`.

Parameters:

- `newExpression`: A `NewExpression` to set the `MemberInitExpression.NewExpression` property equal to.
- `bindings`: An array of `MemberBinding` objects to use to populate the `MemberInitExpression.Bindings` collection.

Returns: A `MemberInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberInit` and the `MemberInitExpression.NewExpression` and `MemberInitExpression.Bindings` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `newExpression` or `bindings` is `null`.
- `ArgumentException`: The `MemberBinding.Member` property of an element of `bindings` does not represent a member of the type that `newExpression`.Type represents.

#### Remarks
The `Type` property of the resulting `MemberInitExpression` is equal to the `Type` property of `newExpression`.

#### Examples
The following example demonstrates how to use the `MemberInit` method to create a `MemberInitExpression` that represents the initialization of two members of a new object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.Modulo(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Modulo (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an arithmetic remainder operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Modulo` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The modulus operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the selected implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the modulus operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined modulus operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined modulus operator.

## Expression.Modulo(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression Modulo (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an arithmetic remainder operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Modulo` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the modulus operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The implementing method for the operation is chosen based on the following rules:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the modulus operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are numeric types, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined modulus operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined modulus operator.

## Expression.ModuloAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ModuloAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a remainder assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ModuloAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.ModuloAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression ModuloAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a remainder assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ModuloAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.ModuloAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ModuloAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a remainder assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ModuloAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.
