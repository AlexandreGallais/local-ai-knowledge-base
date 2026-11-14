---
title: "Expression class (part 9 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 9 of 32)

## Expression.Divide(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression Divide (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents an arithmetic division operation. The implementing method can be specified.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Divide` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `ArgumentException`: `method` is not `null` and the method it represents returns `void`, is not `static` (`Shared` in Visual Basic), or does not take exactly two arguments.
- `InvalidOperationException`: `method` is `null` and the division operator is not defined for `left`.Type and `right`.Type.

#### Remarks
The resulting `BinaryExpression` has the `Method` property set to the implementing method. The `Type` property is set to the type of the node. If the node is lifted, the `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` properties are both `true`. Otherwise, they are `false`. The `Conversion` property is `null`.

The following information describes the implementing method, the node type, and whether a node is lifted.

#### Implementing Method
The following rules determine the implementing method for the operation:

- If `method` is not `null` and it represents a non-void, `static` (`Shared` in Visual Basic) method that takes two arguments, it is the implementing method for the node.

- Otherwise, if the `Type` property of either `left` or `right` represents a user-defined type that overloads the division operator, the `MethodInfo` that represents that method is the implementing method.

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

## Expression.DivideAssign(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression DivideAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a division assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.DivideAssign` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

To be added.

## Expression.DivideAssign(Expression, Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression DivideAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression` that represents a division assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.DivideAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, and `BinaryExpression.Method` properties set to the specified values.

To be added.

## Expression.DivideAssign(Expression, Expression, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression DivideAssign (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression` that represents a division assignment operation that does not have overflow checking.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.
- `method`: A `MethodInfo` to set the `BinaryExpression.Method` property equal to.
- `conversion`: A `LambdaExpression` to set the `BinaryExpression.Conversion` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.DivideAssign` and the `BinaryExpression.Left`, `BinaryExpression.Right`, `BinaryExpression.Method`, and `BinaryExpression.Conversion` properties set to the specified values.

To be added.

## Expression.Dynamic(CallSiteBinder, Type, Expression>) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result will be inferred from the types of the arguments and the specified return type.

## Expression.Dynamic(CallSiteBinder, Type, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result will be inferred from the types of the arguments and the specified return type.

## Expression.Dynamic(CallSiteBinder, Type, Expression[]) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, params System.Linq.Expressions.Expression[] arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result will be inferred from the types of the arguments and the specified return type.

## Expression.Dynamic(CallSiteBinder, Type, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result will be inferred from the types of the arguments and the specified return type.

## Expression.Dynamic(CallSiteBinder, Type, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result will be inferred from the types of the arguments and the specified return type.

## Expression.Dynamic(CallSiteBinder, Type, Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.
- `arg3`: The fourth argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result will be inferred from the types of the arguments and the specified return type.

## Expression.ElementInit(MethodInfo, Expression>) method

```csharp
public static System.Linq.Expressions.ElementInit ElementInit (System.Reflection.MethodInfo addMethod, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> arguments);
```

Creates an `ElementInit`, given an `IEnumerable<T>` as the second argument.

Parameters:

- `addMethod`: A `MethodInfo` to set the `ElementInit.AddMethod` property equal to.
- `arguments`: An `IEnumerable<T>` that contains `Expression` objects to set the `ElementInit.Arguments` property equal to.

Returns: An `ElementInit` that has the `ElementInit.AddMethod` and `ElementInit.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `addMethod` or `arguments` is `null`.
- `ArgumentException`: The method that `addMethod` represents is not named "Add" (case insensitive).

-or-

The method that `addMethod` represents is not an instance method.

-or-

`arguments` does not contain the same number of elements as the number of parameters for the method that `addMethod` represents.

-or-

The `Expression.Type` property of one or more elements of `arguments` is not assignable to the type of the corresponding parameter of the method that `addMethod` represents.

#### Remarks
The `addMethod` parameter must represent an instance method named "Add" (case insensitive). The add method must have the same number of parameters as the number of elements in `arguments`. The `Type` property of each element in `arguments` must be assignable to the type of the corresponding parameter of the add method, possibly after *quoting*.

> **Note:**
>  An element will be quoted only if the corresponding method parameter is of type `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `arguments`.

#### Examples
The following example demonstrates how to use the `ElementInit` method to create an `ElementInit` that represents calling the `Dictionary<T1,T2>.Add` method to initialize an element of a dictionary collection.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._
