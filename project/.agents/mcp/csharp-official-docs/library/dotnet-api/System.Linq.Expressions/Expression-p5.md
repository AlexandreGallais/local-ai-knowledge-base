---
title: "Expression class (part 5 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 5 of 32)

## Expression.Block(Expression, Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.BlockExpression Block (System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3, System.Linq.Expressions.Expression arg4);
```

Creates a `BlockExpression` that contains five expressions and has no variables.

Parameters:

- `arg0`: The first expression in the block.
- `arg1`: The second expression in the block.
- `arg2`: The third expression in the block.
- `arg3`: The fourth expression in the block.
- `arg4`: The fifth expression in the block.

Returns: The created `BlockExpression`.

#### Remarks
When the block expression is executed, it returns the value of the last expression in the block.

## Expression.Break(LabelTarget) method

```csharp
public static System.Linq.Expressions.GotoExpression Break (System.Linq.Expressions.LabelTarget target);
```

Creates a `GotoExpression` representing a break statement.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Break, the `GotoExpression.Target` property set to `target`, and a null value to be passed to the target label upon jumping.

#### Examples
The following example demonstrates how to create an expression that contains a `LoopExpression` object that uses the `Expression.Break` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Break(LabelTarget, Expression) method

```csharp
public static System.Linq.Expressions.GotoExpression Break (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? value);
```

Creates a `GotoExpression` representing a break statement. The value passed to the label upon jumping can be specified.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `value`: The value that will be passed to the associated label upon jumping.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Break, the `GotoExpression.Target` property set to `target`, and `value` to be passed to the target label upon jumping.

To be added.

## Expression.Break(LabelTarget, Type) method

```csharp
public static System.Linq.Expressions.GotoExpression Break (System.Linq.Expressions.LabelTarget target, Type type);
```

Creates a `GotoExpression` representing a break statement with the specified type.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `type`: An `Type` to set the `Expression.Type` property equal to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Break, the `GotoExpression.Target` property set to `target`, and the `Expression.Type` property set to `type`.

To be added.

## Expression.Break(LabelTarget, Expression, Type) method

```csharp
public static System.Linq.Expressions.GotoExpression Break (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? value, Type type);
```

Creates a `GotoExpression` representing a break statement with the specified type. The value passed to the label upon jumping can be specified.

Parameters:

- `target`: The `LabelTarget` that the `GotoExpression` will jump to.
- `value`: The value that will be passed to the associated label upon jumping.
- `type`: An `Type` to set the `Expression.Type` property equal to.

Returns: A `GotoExpression` with `GotoExpression.Kind` equal to Break, the `GotoExpression.Target` property set to `target`, the `Expression.Type` property set to `type`, and `value` to be passed to the target label upon jumping.

To be added.

## Expression.Call(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Linq.Expressions.Expression? instance, System.Reflection.MethodInfo method);
```

Creates a `MethodCallExpression` that represents a call to a method that takes no arguments.

Parameters:

- `instance`: An `Expression` that specifies the instance for an instance method call (pass `null` for a `static` (`Shared` in Visual Basic) method).
- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is `null`.

-or-

`instance` is `null` and `method` represents an instance method.
- `ArgumentException`: `instance`.Type is not assignable to the declaring type of the method represented by `method`.

#### Remarks
To represent a call to a `static` (`Shared` in Visual Basic) method, pass in `null` for the `instance` parameter when you call this method.

If `method` represents an instance method, the `Type` property of `instance` must be assignable to the declaring type of the method represented by `method`.

The `Arguments` property of the resulting `MethodCallExpression` is empty. The `Type` property is equal to the return type of the method represented by `method`.

#### Examples
The following code example shows how to create an expression that calls a method without arguments.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Call(MethodInfo, Expression>) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Reflection.MethodInfo method, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a `MethodCallExpression` that represents a call to a static (Shared in Visual Basic) method.

Parameters:

- `method`: The `MethodInfo` that represents the target method.
- `arguments`: A collection of `Expression` that represents the call arguments.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

To be added.

## Expression.Call(MethodInfo, Expression) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Reflection.MethodInfo method, System.Linq.Expressions.Expression arg0);
```

Creates a `MethodCallExpression` that represents a call to a `static` (`Shared` in Visual Basic) method that takes one argument.

Parameters:

- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.
- `arg0`: The `Expression` that represents the first argument.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is null.

#### Examples
The following example demonstrates how to create an expression that calls a `static` (`Shared` in Visual Basic) method that takes one argument.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Call(MethodInfo, Expression[]) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Reflection.MethodInfo method, params System.Linq.Expressions.Expression[]? arguments);
```

Creates a `MethodCallExpression` that represents a call to a `static` (`Shared` in Visual Basic) method that has arguments.

Parameters:

- `method`: A `MethodInfo` that represents a `static` (`Shared` in Visual Basic) method to set the `MethodCallExpression.Method` property equal to.
- `arguments`: An array of `Expression` objects to use to populate the `MethodCallExpression.Arguments` collection.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Method` and `MethodCallExpression.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is `null`.
- `ArgumentException`: The number of elements in `arguments` does not equal the number of parameters for the method represented by `method`.

-or-

One or more of the elements of `arguments` is not assignable to the corresponding parameter for the method represented by `method`.

#### Remarks
If `arguments` is not `null`, it must have the same number of elements as the number of parameters for the method represented by `method`. Each element in `arguments` must not be `null` and must be assignable to the corresponding parameter of `method`, possibly after *quoting*.

> **Note:**
>  An element will be quoted only if the corresponding method parameter is of type `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `arguments`.

The `Arguments` property of the resulting `MethodCallExpression` is empty if `arguments` is `null`. Otherwise, it contains the same elements as `arguments`, some of which may be quoted.

The `Type` property of the resulting `MethodCallExpression` is equal to the return type of the method represented by `method`. The `Object` property is `null`.

## Expression.Call(Expression, MethodInfo, Expression>) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Linq.Expressions.Expression? instance, System.Reflection.MethodInfo method, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a `MethodCallExpression` that represents a call to a method that takes arguments.

Parameters:

- `instance`: An `Expression` to set the `MethodCallExpression.Object` property equal to (pass `null` for a `static` (`Shared` in Visual Basic) method).
- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.
- `arguments`: An `IEnumerable<T>` that contains `Expression` objects to use to populate the `MethodCallExpression.Arguments` collection.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object`, `MethodCallExpression.Method`, and `MethodCallExpression.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is `null`.

-or-

`instance` is `null` and `method` represents an instance method.
- `ArgumentException`: `instance`.Type is not assignable to the declaring type of the method represented by `method`.

-or-

The number of elements in `arguments` does not equal the number of parameters for the method represented by `method`.

-or-

One or more of the elements of `arguments` is not assignable to the corresponding parameter for the method represented by `method`.

#### Remarks
To represent a call to a `static` (`Shared` in Visual Basic) method, pass in `null` for the `instance` parameter when you call this method, or call `Expression.Call` instead.

If `method` represents an instance method, the `Type` property of `instance` must be assignable to the declaring type of the method represented by `method`.

If `arguments` is not `null`, it must have the same number of elements as the number of parameters for the method represented by `method`. Each element in `arguments` must not be `null` and must be assignable to the corresponding parameter of `method`, possibly after *quoting*.

> **Note:**
>  An element will be quoted only if the corresponding method parameter is of type `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `arguments`.

The `Arguments` property of the resulting `MethodCallExpression` is empty if `arguments` is `null`. Otherwise, it contains the same elements as `arguments`, some of which may be quoted.

The `Type` property of the resulting `MethodCallExpression` is equal to the return type of the method represented by `method`.

## Expression.Call(Expression, MethodInfo, Expression[]) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Linq.Expressions.Expression? instance, System.Reflection.MethodInfo method, params System.Linq.Expressions.Expression[]? arguments);
```

Creates a `MethodCallExpression` that represents a call to a method that takes arguments.

Parameters:

- `instance`: An `Expression` that specifies the instance for an instance method call (pass `null` for a `static` (`Shared` in Visual Basic) method).
- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.
- `arguments`: An array of `Expression` objects to use to populate the `MethodCallExpression.Arguments` collection.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object`, `MethodCallExpression.Method`, and `MethodCallExpression.Arguments` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is `null`.

-or-

`instance` is `null` and `method` represents an instance method.

-or-

`arguments` is not `null` and one or more of its elements is `null`.
- `ArgumentException`: `instance`.Type is not assignable to the declaring type of the method represented by `method`.

-or-

The number of elements in `arguments` does not equal the number of parameters for the method represented by `method`.

-or-

One or more of the elements of `arguments` is not assignable to the corresponding parameter for the method represented by `method`.

#### Remarks
To represent a call to a `static` (`Shared` in Visual Basic) method, pass in `null` for the `instance` parameter when you call this method, or call `Expression.Call` instead.

If `method` represents an instance method, the `Type` property of `instance` must be assignable to the declaring type of the method represented by `method`.

If `arguments` is not `null`, it must have the same number of elements as the number of parameters for the method represented by `method`. Each element in `arguments` must not be `null` and must be assignable to the corresponding parameter of `method`, possibly after *quoting*.

> **Note:**
>  An element will be quoted only if the corresponding method parameter is of type `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `arguments`.

The `Arguments` property of the resulting `MethodCallExpression` is empty if `arguments` is `null`. Otherwise, it contains the same elements as `arguments`, some of which may be quoted.

The `Type` property of the resulting `MethodCallExpression` is equal to the return type of the method represented by `method`.
