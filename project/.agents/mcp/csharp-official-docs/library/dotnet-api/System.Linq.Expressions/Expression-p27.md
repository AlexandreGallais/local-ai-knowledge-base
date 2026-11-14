---
title: "Expression class (part 27 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 27 of 32)

## Expression.Power(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression Power (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents raising a number to a power.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Power` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the exponentiation operator is not defined for `left`.Type and `right`.Type.

-or-

`method` is `null` and `left`.Type and/or `right`.Type are not `Double`.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the exponentiation operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type and `right`.Type are both `Double`, the implementing method is `Math.Pow`.

#### Node Type and Lifted versus Non-Lifted

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

## Expression.PowerAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression PowerAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents raising an expression to a power and assigning the result back to the expression.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.PowerAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.PowerAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression PowerAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents raising an expression to a power and assigning the result back to the expression.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.PowerAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.PowerAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression PowerAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents raising an expression to a power and assigning the result back to the expression.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.PowerAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.

## Expression.PreDecrementAssign(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression PreDecrementAssign (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that decrements the expression by 1 and assigns the result back to the expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.PreDecrementAssign(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression PreDecrementAssign (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that decrements the expression by 1 and assigns the result back to the expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.PreIncrementAssign(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression PreIncrementAssign (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that increments the expression by 1 and assigns the result back to the expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.PreIncrementAssign(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression PreIncrementAssign (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that increments the expression by 1 and assigns the result back to the expression.

Parameters:

- `expression`: An `Expression` to apply the operations on.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: A `UnaryExpression` that represents the resultant expression.

To be added.

## Expression.Property(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.MemberExpression Property (System.Linq.Expressions.Expression? expression, System.Reflection.MethodInfo propertyAccessor);
```

Creates a `MemberExpression` that represents accessing a property by using a property accessor method.

Parameters:

- `expression`: An `Expression` to set the `MemberExpression.Expression` property equal to. This can be null for static properties.
- `propertyAccessor`: The `MethodInfo` that represents a property accessor method.

Returns: A `MemberExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberAccess`, the `MemberExpression.Expression` property set to `expression` and the `MemberExpression.Member` property set to the `PropertyInfo` that represents the property accessed in `propertyAccessor`.

Exceptions:

- `ArgumentNullException`: `propertyAccessor` is `null`.

-or-

The method that `propertyAccessor` represents is not `static` (`Shared` in Visual Basic) and `expression` is `null`.
- `ArgumentException`: `expression`.Type is not assignable to the declaring type of the method represented by `propertyAccessor`.

-or-

The method that `propertyAccessor` represents is not a property accessor method.

#### Remarks
The `Type` property of the resulting `MemberExpression` is equal to the `PropertyType` property of `MemberExpression.Member`.

If the method represented by `propertyAccessor` is `static` (`Shared` in Visual Basic), `expression` can be `null`.

## Expression.Property(Expression, PropertyInfo) method

```csharp
public static System.Linq.Expressions.MemberExpression Property (System.Linq.Expressions.Expression? expression, System.Reflection.PropertyInfo property);
```

Creates a `MemberExpression` that represents accessing a property.

Parameters:

- `expression`: An `Expression` to set the `MemberExpression.Expression` property equal to. This can be null for static properties.
- `property`: The `PropertyInfo` to set the `MemberExpression.Member` property equal to.

Returns: A `MemberExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberAccess` and the `MemberExpression.Expression` and `MemberExpression.Member` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `property` is `null`.

-or-

The property that `property` represents is not `static` (`Shared` in Visual Basic) and `expression` is `null`.
- `ArgumentException`: `expression`.Type is not assignable to the declaring type of the property that `property` represents.

#### Remarks
The `Type` property of the resulting `MemberExpression` is equal to the `PropertyType` property of `MemberExpression.Member`.

If the property represented by `property` is `static` (`Shared` in Visual Basic), `expression` can be `null`.

## Expression.Property(Expression, String) method

```csharp
public static System.Linq.Expressions.MemberExpression Property (System.Linq.Expressions.Expression expression, string propertyName);
```

Creates a `MemberExpression` that represents accessing a property.

Parameters:

- `expression`: An `Expression` whose `Expression.Type` contains a property named `propertyName`. This can be `null` for static properties.
- `propertyName`: The name of a property to be accessed.

Returns: A `MemberExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberAccess`, the `MemberExpression.Expression` property set to `expression`, and the `MemberExpression.Member` property set to the `PropertyInfo` that represents the property denoted by `propertyName`.

Exceptions:

- `ArgumentNullException`: `expression` or `propertyName` is `null`.
- `ArgumentException`: No property named `propertyName` is defined in `expression`.Type or its base types.

#### Remarks
The `Type` property of the resulting `MemberExpression` is equal to the `PropertyType` property of the `PropertyInfo` that represents the property denoted by `propertyName`.

This method searches `expression`.Type and its base types for a property that has the name `propertyName`. Public properties are given preference over non-public properties. If a matching property is found, this method passes `expression` and the `PropertyInfo` that represents that property to `Expression.Property`.

#### Examples
The following example shows how to create an expression that represents accessing a property.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Property(Expression, PropertyInfo, Expression>) method

```csharp
public static System.Linq.Expressions.IndexExpression Property (System.Linq.Expressions.Expression? instance, System.Reflection.PropertyInfo indexer, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates an `IndexExpression` representing the access to an indexed property.

Parameters:

- `instance`: The object to which the property belongs. If the property is static/shared, it must be null.
- `indexer`: The `PropertyInfo` that represents the property to index.
- `arguments`: An `IEnumerable<T>` of `Expression` objects that are used to index the property.

Returns: The created `IndexExpression`.

To be added.

## Expression.Property(Expression, PropertyInfo, Expression[]) method

```csharp
public static System.Linq.Expressions.IndexExpression Property (System.Linq.Expressions.Expression? instance, System.Reflection.PropertyInfo indexer, params System.Linq.Expressions.Expression[]? arguments);
```

Creates an `IndexExpression` representing the access to an indexed property.

Parameters:

- `instance`: The object to which the property belongs. If the property is static/shared, it must be null.
- `indexer`: The `PropertyInfo` that represents the property to index.
- `arguments`: An array of `Expression` objects that are used to index the property.

Returns: The created `IndexExpression`.

To be added.

## Expression.Property(Expression, String, Expression[]) method

```csharp
public static System.Linq.Expressions.IndexExpression Property (System.Linq.Expressions.Expression instance, string propertyName, params System.Linq.Expressions.Expression[]? arguments);
```

Creates an `IndexExpression` representing the access to an indexed property.

Parameters:

- `instance`: The object to which the property belongs. If the property is static/shared, it must be null.
- `propertyName`: The name of the indexer.
- `arguments`: An array of `Expression` objects that are used to index the property.

Returns: The created `IndexExpression`.

To be added.
