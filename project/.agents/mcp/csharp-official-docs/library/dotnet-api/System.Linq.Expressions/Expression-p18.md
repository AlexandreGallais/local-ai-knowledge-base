---
title: "Expression class (part 18 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 18 of 32)

## Expression.ListInit(NewExpression, MethodInfo, Expression>) method

```csharp
public static System.Linq.Expressions.ListInitExpression ListInit (System.Linq.Expressions.NewExpression newExpression, System.Reflection.MethodInfo? addMethod, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> initializers);
```

Creates a `ListInitExpression` that uses a specified method to add elements to a collection.

Parameters:

- `newExpression`: A `NewExpression` to set the `ListInitExpression.NewExpression` property equal to.
- `addMethod`: A `MethodInfo` that represents an instance method named "Add" (case insensitive), that adds an element to a collection.
- `initializers`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `ListInitExpression.Initializers` collection.

Returns: A `ListInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ListInit` and the `ListInitExpression.NewExpression` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `newExpression` or `initializers` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `newExpression`.Type does not implement `IEnumerable`.

-or-

`addMethod` is not `null` and it does not represent an instance method named "Add" (case insensitive) that takes exactly one argument.

-or-

`addMethod` is not `null` and the type represented by the `Expression.Type` property of one or more elements of `initializers` is not assignable to the argument type of the method that `addMethod` represents.
- `InvalidOperationException`: `addMethod` is `null` and no instance method named "Add" that takes one type-compatible argument exists on `newExpression`.Type or its base type.

#### Remarks
The `Type` property of `newExpression` must represent a type that implements `IEnumerable`.

If `addMethod` is `null`, `newExpression`.Type or its base type must declare a single method named "Add" (case insensitive) that takes exactly one argument. If `addMethod` is not `null`, it must represent an instance method named "Add" (case insensitive) that has exactly one parameter. The type represented by the `Type` property of each element of `initializers` must be assignable to the argument type of the add method.

The `Initializers` property of the returned `ListInitExpression` contains one element of type `ElementInit` for each element of `initializers`. The `Arguments` property of each element of `ListInitExpression.Initializers` is a singleton collection that contains the corresponding element of `initializers`. The `AddMethod` property of each element of `ListInitExpression.Initializers` is equal to `addMethod`.

The `Type` property of the resulting `ListInitExpression` is equal to `newExpression`.Type.

## Expression.ListInit(NewExpression, MethodInfo, Expression[]) method

```csharp
public static System.Linq.Expressions.ListInitExpression ListInit (System.Linq.Expressions.NewExpression newExpression, System.Reflection.MethodInfo? addMethod, params System.Linq.Expressions.Expression[] initializers);
```

Creates a `ListInitExpression` that uses a specified method to add elements to a collection.

Parameters:

- `newExpression`: A `NewExpression` to set the `ListInitExpression.NewExpression` property equal to.
- `addMethod`: A `MethodInfo` that represents an instance method that takes one argument, that adds an element to a collection.
- `initializers`: An array of `Expression` objects to use to populate the `ListInitExpression.Initializers` collection.

Returns: A `ListInitExpression` that has the `Expression.NodeType` property equal to `ExpressionType.ListInit` and the `ListInitExpression.NewExpression` property set to the specified value.

Exceptions:

- `ArgumentNullException`: `newExpression` or `initializers` is `null`.

-or-

One or more elements of `initializers` are `null`.
- `ArgumentException`: `newExpression`.Type does not implement `IEnumerable`.

-or-

`addMethod` is not `null` and it does not represent an instance method named "Add" (case insensitive) that takes exactly one argument.

-or-

`addMethod` is not `null` and the type represented by the `Expression.Type` property of one or more elements of `initializers` is not assignable to the argument type of the method that `addMethod` represents.
- `InvalidOperationException`: `addMethod` is `null` and no instance method named "Add" that takes one type-compatible argument exists on `newExpression`.Type or its base type.

#### Remarks
The `Type` property of `newExpression` must represent a type that implements `IEnumerable`.

If `addMethod` is `null`, `newExpression`.Type or its base type must declare a single method named "Add" (case insensitive) that takes exactly one argument. If `addMethod` is not `null`, it must represent an instance method named "Add" (case insensitive) that has exactly one parameter. The type represented by the `Type` property of each element of `initializers` must be assignable to the argument type of the add method.

The `Initializers` property of the returned `ListInitExpression` contains one element of type `ElementInit` for each element of `initializers`. The `Arguments` property of each element of `ListInitExpression.Initializers` is a singleton collection that contains the corresponding element of `initializers`. The `AddMethod` property of each element of `ListInitExpression.Initializers` is equal to `addMethod`.

The `Type` property of the resulting `ListInitExpression` is equal to `newExpression`.Type.

## Expression.Loop(Expression) method

```csharp
public static System.Linq.Expressions.LoopExpression Loop (System.Linq.Expressions.Expression body);
```

Creates a `LoopExpression` with the given body.

Parameters:

- `body`: The body of the loop.

Returns: The created `LoopExpression`.

To be added.

## Expression.Loop(Expression, LabelTarget) method

```csharp
public static System.Linq.Expressions.LoopExpression Loop (System.Linq.Expressions.Expression body, System.Linq.Expressions.LabelTarget? break);
```

Creates a `LoopExpression` with the given body and break target.

Parameters:

- `body`: The body of the loop.
- `break`: The break target used by the loop body.

Returns: The created `LoopExpression`.

#### Examples
The following example demonstrates how to create a block expression that contains a `LoopExpression` object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Loop(Expression, LabelTarget, LabelTarget) method

```csharp
public static System.Linq.Expressions.LoopExpression Loop (System.Linq.Expressions.Expression body, System.Linq.Expressions.LabelTarget? break, System.Linq.Expressions.LabelTarget? continue);
```

Creates a `LoopExpression` with the given body.

Parameters:

- `body`: The body of the loop.
- `break`: The break target used by the loop body.
- `continue`: The continue target used by the loop body.

Returns: The created `LoopExpression`.

To be added.

## Expression.MakeBinary(ExpressionType, Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression MakeBinary (System.Linq.Expressions.ExpressionType binaryType, System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression`, given the left and right operands, by calling an appropriate factory method.

Parameters:

- `binaryType`: The `ExpressionType` that specifies the type of binary operation.
- `left`: An `Expression` that represents the left operand.
- `right`: An `Expression` that represents the right operand.

Returns: The `BinaryExpression` that results from calling the appropriate factory method.

Exceptions:

- `ArgumentException`: `binaryType` does not correspond to a binary expression node.
- `ArgumentNullException`: `left` or `right` is `null`.

#### Remarks
The `binaryType` parameter determines which `BinaryExpression` factory method this method calls. For example, if `binaryType` is `Subtract`, this method invokes `Expression.Subtract`.

#### Examples
The following example demonstrates how to use the `MakeBinary` method to create a `BinaryExpression` that represents the subtraction of one number from another.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.MakeBinary(ExpressionType, Expression, Expression, Boolean, MethodInfo) method

```csharp
public static System.Linq.Expressions.BinaryExpression MakeBinary (System.Linq.Expressions.ExpressionType binaryType, System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, bool liftToNull, System.Reflection.MethodInfo? method);
```

Creates a `BinaryExpression`, given the left operand, right operand and implementing method, by calling the appropriate factory method.

Parameters:

- `binaryType`: The `ExpressionType` that specifies the type of binary operation.
- `left`: An `Expression` that represents the left operand.
- `right`: An `Expression` that represents the right operand.
- `liftToNull`: `true` to set `BinaryExpression.IsLiftedToNull` to `true`; `false` to set `BinaryExpression.IsLiftedToNull` to `false`.
- `method`: A `MethodInfo` that specifies the implementing method.

Returns: The `BinaryExpression` that results from calling the appropriate factory method.

Exceptions:

- `ArgumentException`: `binaryType` does not correspond to a binary expression node.
- `ArgumentNullException`: `left` or `right` is `null`.

#### Remarks
The `binaryType` parameter determines which `BinaryExpression` factory method this method will call. For example, if `binaryType` is `Subtract`, this method invokes `Expression.Subtract`. The `liftToNull` and `method` parameters are ignored if the appropriate factory method does not have a corresponding parameter.

## Expression.MakeBinary(ExpressionType, Expression, Expression, Boolean, MethodInfo, LambdaExpression) method

```csharp
public static System.Linq.Expressions.BinaryExpression MakeBinary (System.Linq.Expressions.ExpressionType binaryType, System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right, bool liftToNull, System.Reflection.MethodInfo? method, System.Linq.Expressions.LambdaExpression? conversion);
```

Creates a `BinaryExpression`, given the left operand, right operand, implementing method and type conversion function, by calling the appropriate factory method.

Parameters:

- `binaryType`: The `ExpressionType` that specifies the type of binary operation.
- `left`: An `Expression` that represents the left operand.
- `right`: An `Expression` that represents the right operand.
- `liftToNull`: `true` to set `BinaryExpression.IsLiftedToNull` to `true`; `false` to set `BinaryExpression.IsLiftedToNull` to `false`.
- `method`: A `MethodInfo` that specifies the implementing method.
- `conversion`: A `LambdaExpression` that represents a type conversion function. This parameter is used only if `binaryType` is `ExpressionType.Coalesce` or compound assignment.

Returns: The `BinaryExpression` that results from calling the appropriate factory method.

Exceptions:

- `ArgumentException`: `binaryType` does not correspond to a binary expression node.
- `ArgumentNullException`: `left` or `right` is `null`.

#### Remarks
The `binaryType` parameter determines which `BinaryExpression` factory method this method will call. For example, if `binaryType` is `Subtract`, this method invokes `Expression.Subtract`. The `liftToNull`, `method` and `conversion` parameters are ignored if the appropriate factory method does not have a corresponding parameter.

## Expression.MakeCatchBlock(Type, ParameterExpression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.CatchBlock MakeCatchBlock (Type type, System.Linq.Expressions.ParameterExpression? variable, System.Linq.Expressions.Expression body, System.Linq.Expressions.Expression? filter);
```

Creates a `CatchBlock` representing a catch statement with the specified elements.

Parameters:

- `type`: The `Expression.Type` of `Exception` this `CatchBlock` will handle.
- `variable`: A `ParameterExpression` representing a reference to the `Exception` object caught by this handler.
- `body`: The body of the catch statement.
- `filter`: The body of the `Exception` filter.

Returns: The created `CatchBlock`.

#### Remarks
`type` must be non-null and match the type of `variable` (if it is supplied).

## Expression.MakeDynamic(Type, CallSiteBinder, Expression>) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## Expression.MakeDynamic(Type, CallSiteBinder, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and one argument.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The argument to the dynamic operation.

Returns: A `DynamicExpression` that has `Expression.NodeType` equal to `ExpressionType.Dynamic` and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.
