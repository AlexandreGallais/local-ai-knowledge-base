---
title: "Expression class (part 28 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 28 of 32)

## Expression.Property(Expression, Type, String) method

```csharp
public static System.Linq.Expressions.MemberExpression Property (System.Linq.Expressions.Expression? expression, Type type, string propertyName);
```

Creates a `MemberExpression` accessing a property.

Parameters:

- `expression`: The containing object of the property. This can be null for static properties.
- `type`: The `Expression.Type` that contains the property.
- `propertyName`: The property to be accessed.

Returns: The created `MemberExpression`.

To be added.

## Expression.PropertyOrField(Expression, String) method

```csharp
public static System.Linq.Expressions.MemberExpression PropertyOrField (System.Linq.Expressions.Expression expression, string propertyOrFieldName);
```

Creates a `MemberExpression` that represents accessing a property or field.

Parameters:

- `expression`: An `Expression` whose `Expression.Type` contains a property or field named `propertyOrFieldName`.
- `propertyOrFieldName`: The name of a property or field to be accessed.

Returns: A `MemberExpression` that has the `Expression.NodeType` property equal to `ExpressionType.MemberAccess`, the `MemberExpression.Expression` property set to `expression`, and the `MemberExpression.Member` property set to the `PropertyInfo` or `FieldInfo` that represents the property or field denoted by `propertyOrFieldName`.

Exceptions:

- `ArgumentNullException`: `expression` or `propertyOrFieldName` is `null`.
- `ArgumentException`: No property or field named `propertyOrFieldName` is defined in `expression`.Type or its base types.

#### Remarks
The `Type` property of the resulting `MemberExpression` is equal to the `PropertyInfo.PropertyType` or `FieldInfo.FieldType` properties of the `PropertyInfo` or `FieldInfo`, respectively, that represents the property or field denoted by `propertyOrFieldName`.

This method searches `expression`.Type and its base types for an instance property or field that has the name `propertyOrFieldName`. Static properties or fields are not supported. Public properties and fields are given preference over non-public properties and fields. Also, properties are given preference over fields. If a matching property or field is found, this method passes `expression` and the `PropertyInfo` or `FieldInfo` that represents that property or field to `Expression.Property` or `Expression.Field`, respectively.

#### Examples
The following example shows how to create an expression that represents accessing a property or field.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Quote(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression Quote (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that represents an expression that has a constant value of type `Expression`.

Parameters:

- `expression`: An `Expression` to set the `UnaryExpression.Operand` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Quote` and the `UnaryExpression.Operand` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.

#### Remarks
The `Type` property of the resulting `UnaryExpression` represents the constructed type `Expression<T>`, where the type argument is the type represented by `expression`.Type. The `Method` property is `null`. Both `UnaryExpression.IsLifted` and `UnaryExpression.IsLiftedToNull` are `false`.

## Expression.Reduce() method

```csharp
public virtual System.Linq.Expressions.Expression Reduce ();
```

Reduces this node to a simpler expression. If CanReduce returns true, this should return a valid expression. This method can return another node that itself must be reduced.

Returns: The reduced expression.

To be added.

## Expression.ReduceAndCheck() method

```csharp
public System.Linq.Expressions.Expression ReduceAndCheck ();
```

Reduces this node to a simpler expression. If CanReduce returns true, this should return a valid expression. This method can return another node that itself must be reduced.

Returns: The reduced expression.

#### Remarks
Unlike Reduce, this method checks that the reduced node satisfies certain invariants.

## Expression.ReduceExtensions() method

```csharp
public System.Linq.Expressions.Expression ReduceExtensions ();
```

Reduces the expression to a known node type (that is not an Extension node) or just returns the expression if it is already a known type.

Returns: The reduced expression.

To be added.

## Expression.ReferenceEqual(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ReferenceEqual (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a reference equality comparison.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Equal` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.ReferenceNotEqual(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ReferenceNotEqual (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a reference inequality comparison.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.NotEqual` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.Rethrow() method

```csharp
public static System.Linq.Expressions.UnaryExpression Rethrow ();
```

Creates a `UnaryExpression` that represents a rethrowing of an exception.

Returns: A `UnaryExpression` that represents a rethrowing of an exception.

To be added.

## Expression.Rethrow(Type) method

```csharp
public static System.Linq.Expressions.UnaryExpression Rethrow (Type type);
```

Creates a `UnaryExpression` that represents a rethrowing of an exception with a given type.

Parameters:

- `type`: The new `Type` of the expression.

Returns: A `UnaryExpression` that represents a rethrowing of an exception.

To be added.

## Expression.Return(LabelTarget) method

```csharp
public static System.Linq.Expressions.GotoExpression Return (System.Linq.Expressions.LabelTarget target);
```

Creates a `GotoExpression` representing a return statement.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Return, the `GotoExpression.Target` property set to `target`, and a null value to be passed to the target label upon jumping.

To be added.

## Expression.Return(LabelTarget, Expression) method

```csharp
public static System.Linq.Expressions.GotoExpression Return (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? value);
```

Creates a `GotoExpression` representing a return statement. The value passed to the label upon jumping can be specified.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `value`: The value that will be passed to the associated label upon jumping.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Continue, the `GotoExpression.Target` property set to `target`, and `value` to be passed to the target label upon jumping.

#### Examples
The following example demonstrates how to create an expression that contains the `Expression.Return` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Return(LabelTarget, Type) method

```csharp
public static System.Linq.Expressions.GotoExpression Return (System.Linq.Expressions.LabelTarget target, Type type);
```

Creates a `GotoExpression` representing a return statement with the specified type.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `type`: An `Type` to set the `Expression.Type` property equal to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Return, the `GotoExpression.Target` property set to `target`, the `Expression.Type` property set to `type`, and a null value to be passed to the target label upon jumping.

To be added.

## Expression.Return(LabelTarget, Expression, Type) method

```csharp
public static System.Linq.Expressions.GotoExpression Return (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? value, Type type);
```

Creates a `GotoExpression` representing a return statement with the specified type. The value passed to the label upon jumping can be specified.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `value`: The value that will be passed to the associated label upon jumping.
- `type`: An `Type` to set the `Expression.Type` property equal to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Continue, the `GotoExpression.Target` property set to `target`, the `Expression.Type` property set to `type`, and `value` to be passed to the target label upon jumping.

To be added.

## Expression.RightShift(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression RightShift (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a bitwise right-shift operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.RightShift` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The right-shift operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the selected implementing method for the operation:

- If the `Type` property of either `left` or `right` represents a user-defined type that overloads the right-shift operator, the `MethodInfo` that represents that method is the implementing method.

- Otherwise, if `left`.Type is an integral type (one of `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, or the corresponding nullable types) and `right`.Type is `Int32`, the implementing method is `null`.

#### Node Type and Lifted versus Non-Lifted
If the implementing method is not `null`:

- If `left`.Type and `right`.Type are assignable to the corresponding argument types of the implementing method, the node is not lifted. The type of the node is the return type of the implementing method.

- If the following two conditions are satisfied, the node is lifted and the type of the node is the nullable type that corresponds to the return type of the implementing method:

- `left`.Type and `right`.Type are both value types of which at least one is nullable and the corresponding non-nullable types are equal to the corresponding argument types of the implementing method.

- The return type of the implementing method is a non-nullable value type.

If the implementing method is `null`:

- If `left`.Type and `right`.Type are both non-nullable, the node is not lifted. The type of the node is the result type of the predefined right-shift operator.

- If `left`.Type and `right`.Type are both nullable, the node is lifted. The type of the node is the nullable type that corresponds to the result type of the predefined right-shift operator.
