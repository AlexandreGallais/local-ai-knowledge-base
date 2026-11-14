---
title: "Expression class (part 4 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 4 of 32)

## Expression.ArrayIndex(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression ArrayIndex (System.Linq.Expressions.Expression array, System.Linq.Expressions.Expression index);
```

Creates a `BinaryExpression` that represents applying an array index operator to an array of rank one.

Parameters:

- `array`: A `Expression` to set the `BinaryExpression.Left` property equal to.
- `index`: A `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ArrayIndex` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `array` or `index` is `null`.
- `ArgumentException`: `array`.Type does not represent an array type.

-or-

`array`.Type represents an array type whose rank is not 1.

-or-

`index`.Type does not represent the `Int32` type.

#### Remarks
`index` must represent an index of type `Int32`.

The `Method` property of the resulting `BinaryExpression` is `null`, and both `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` are set to `false`. The `Type` property is equal to the element type of `array`.Type. The `Conversion` property is `null`.

## Expression.ArrayIndex(Expression, Expression[]) method

```csharp
public static System.Linq.Expressions.MethodCallExpression ArrayIndex (System.Linq.Expressions.Expression array, params System.Linq.Expressions.Expression[] indexes);
```

Creates a `MethodCallExpression` that represents applying an array index operator to a multidimensional array.

Parameters:

- `array`: An array of `Expression` instances - indexes for the array index operation.
- `indexes`: An array of `Expression` objects to use to populate the `MethodCallExpression.Arguments` collection.

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

## Expression.ArrayLength(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression ArrayLength (System.Linq.Expressions.Expression array);
```

Creates a `UnaryExpression` that represents an expression for obtaining the length of a one-dimensional array.

Parameters:

- `array`: An `Expression` to set the `UnaryExpression.Operand` property equal to.

Returns: A `UnaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ArrayLength` and the `UnaryExpression.Operand` property equal to `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `array`.Type does not represent an array type.

#### Remarks
The `Type` property of `array` must represent an array type.

The `Type` property of the resulting `UnaryExpression` is equal to `Int32`. The `Method` property is `null`, and both `UnaryExpression.IsLifted` and `UnaryExpression.IsLiftedToNull` are set to `false`.

## Expression.Assign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Assign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents an assignment operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Assign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

#### Remarks
The `Assign` expression copies a value for value types, and it copies a reference for reference types.

#### Examples
The following code example shows how to create an expression that represents an assignment operation.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Bind(MemberInfo, Expression) method

```csharp
public static System.Linq.Expressions.MemberAssignment Bind (System.Reflection.MemberInfo member, System.Linq.Expressions.Expression expression);
```

Creates a `MemberAssignment` that represents the initialization of a field or property.

Parameters:

- `member`: A `MemberInfo` to set the `MemberBinding.Member` property equal to.
- `expression`: An `Expression` to set the `MemberAssignment.Expression` property equal to.

Returns: A `MemberAssignment` that has `MemberBinding.BindingType` equal to `MemberBindingType.Assignment` and the `MemberBinding.Member` and `MemberAssignment.Expression` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `member` or `expression` is `null`.
- `ArgumentException`: `member` does not represent a field or property.

-or-

The property represented by `member` does not have a `set` accessor.

-or-

`expression`.Type is not assignable to the type of the field or property that `member` represents.

#### Remarks
The `Type` property of `expression` must be assignable to the type represented by the `FieldInfo.FieldType` or `PropertyType` property of `member`.

## Expression.Bind(MethodInfo, Expression) method

```csharp
public static System.Linq.Expressions.MemberAssignment Bind (System.Reflection.MethodInfo propertyAccessor, System.Linq.Expressions.Expression expression);
```

Creates a `MemberAssignment` that represents the initialization of a member by using a property accessor method.

Parameters:

- `propertyAccessor`: A `MethodInfo` that represents a property accessor method.
- `expression`: An `Expression` to set the `MemberAssignment.Expression` property equal to.

Returns: A `MemberAssignment` that has the `MemberBinding.BindingType` property equal to `MemberBindingType.Assignment`, the `MemberBinding.Member` property set to the `PropertyInfo` that represents the property accessed in `propertyAccessor`, and the `MemberAssignment.Expression` property set to `expression`.

Exceptions:

- `ArgumentNullException`: `propertyAccessor` or `expression` is `null`.
- `ArgumentException`: `propertyAccessor` does not represent a property accessor method.

-or-

The property accessed by `propertyAccessor` does not have a `set` accessor.

-or-

`expression`.Type is not assignable to the type of the field or property that the member represents.

#### Remarks
The `Type` property of `expression` must be assignable to the type represented by the `PropertyType` property of the property accessed in `propertyAccessor`.

## Expression.Block(Expression>) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> expressions);
```

Creates a `BlockExpression` that contains the given expressions and has no variables.

Parameters:

- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.

## Expression.Block(Expression[]) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (params System.Linq.Expressions.Expression[] expressions);
```

Creates a `BlockExpression` that contains the given expressions and has no variables.

Parameters:

- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.

#### Examples
The following code example shows how to create a block expression. The block expression consists of two `MethodCallExpression` objects and one `ConstantExpression` object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Block(ParameterExpression>, Expression>) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? variables, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> expressions);
```

Creates a `BlockExpression` that contains the given variables and expressions.

Parameters:

- `variables`: The variables in the block.
- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.

#### Examples
The following code example shows how to pass a parameter to a block expression and process this parameter within a block.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Block(ParameterExpression>, Expression[]) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? variables, params System.Linq.Expressions.Expression[] expressions);
```

Creates a `BlockExpression` that contains the given variables and expressions.

Parameters:

- `variables`: The variables in the block.
- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.

## Expression.Block(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1);
```

Creates a `BlockExpression` that contains two expressions and has no variables.

Parameters:

- `arg0`: The first expression in the block.
- `arg1`: The second expression in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.

## Expression.Block(Type, Expression>) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (Type type, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> expressions);
```

Creates a `BlockExpression` that contains the given expressions, has no variables and has specific result type.

Parameters:

- `type`: The result type of the block.
- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

To be added.

## Expression.Block(Type, Expression[]) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (Type type, params System.Linq.Expressions.Expression[] expressions);
```

Creates a `BlockExpression` that contains the given expressions, has no variables and has specific result type.

Parameters:

- `type`: The result type of the block.
- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

To be added.

## Expression.Block(Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2);
```

Creates a `BlockExpression` that contains three expressions and has no variables.

Parameters:

- `arg0`: The first expression in the block.
- `arg1`: The second expression in the block.
- `arg2`: The third expression in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.

## Expression.Block(Type, ParameterExpression>, Expression>) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (Type type, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? variables, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> expressions);
```

Creates a `BlockExpression` that contains the given variables and expressions.

Parameters:

- `type`: The result type of the block.
- `variables`: The variables in the block.
- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

To be added.

## Expression.Block(Type, ParameterExpression>, Expression[]) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (Type type, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? variables, params System.Linq.Expressions.Expression[] expressions);
```

Creates a `BlockExpression` that contains the given variables and expressions.

Parameters:

- `type`: The result type of the block.
- `variables`: The variables in the block.
- `expressions`: The expressions in the block.

Returns: The created `BlockExpression`.

To be added.

## Expression.Block(Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3);
```

Creates a `BlockExpression` that contains four expressions and has no variables.

Parameters:

- `arg0`: The first expression in the block.
- `arg1`: The second expression in the block.
- `arg2`: The third expression in the block.
- `arg3`: The fourth expression in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.
