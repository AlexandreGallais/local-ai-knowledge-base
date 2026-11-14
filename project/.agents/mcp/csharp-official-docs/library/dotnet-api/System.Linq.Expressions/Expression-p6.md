---
title: "Expression class (part 6 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 6 of 32)

## Expression.Call(MethodInfo, Expression, Expression) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Reflection.MethodInfo method, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1);
```

Creates a `MethodCallExpression` that represents a call to a static method that takes two arguments.

Parameters:

- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.
- `arg0`: The `Expression` that represents the first argument.
- `arg1`: The `Expression` that represents the second argument.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is null.

To be added.

## Expression.Call(Expression, MethodInfo, Expression, Expression) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Linq.Expressions.Expression? instance, System.Reflection.MethodInfo method, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1);
```

Creates a `MethodCallExpression` that represents a call to a method that takes two arguments.

Parameters:

- `instance`: An `Expression` that specifies the instance for an instance call. (pass null for a static (Shared in Visual Basic) method).
- `method`: The `MethodInfo` that represents the target method.
- `arg0`: The `Expression` that represents the first argument.
- `arg1`: The `Expression` that represents the second argument.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

#### Examples
The following code example shows how to create an expression that calls an instance method that has two arguments.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Call(Expression, String, Type[], Expression[]) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Linq.Expressions.Expression instance, string methodName, Type[]? typeArguments, params System.Linq.Expressions.Expression[]? arguments);
```

Creates a `MethodCallExpression` that represents a call to a method by calling the appropriate factory method.

Parameters:

- `instance`: An `Expression` whose `Expression.Type` property value will be searched for a specific method.
- `methodName`: The name of the method.
- `typeArguments`: An array of `Type` objects that specify the type parameters of the generic method. This argument should be null when methodName specifies a non-generic method.
- `arguments`: An array of `Expression` objects that represents the arguments to the method.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call`, the `MethodCallExpression.Object` property equal to `instance`, `MethodCallExpression.Method` set to the `MethodInfo` that represents the specified instance method, and `MethodCallExpression.Arguments` set to the specified arguments.

Exceptions:

- `ArgumentNullException`: `instance` or `methodName` is `null`.
- `InvalidOperationException`: No method whose name is `methodName`, whose type parameters match `typeArguments`, and whose parameter types match `arguments` is found in `instance`.Type or its base types.

-or-

More than one method whose name is `methodName`, whose type parameters match `typeArguments`, and whose parameter types match `arguments` is found in `instance`.Type or its base types.

#### Remarks
The `Type` property of the resulting `MethodCallExpression` is equal to the return type of the method denoted by `methodName`.

## Expression.Call(MethodInfo, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Reflection.MethodInfo method, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2);
```

Creates a `MethodCallExpression` that represents a call to a static method that takes three arguments.

Parameters:

- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.
- `arg0`: The `Expression` that represents the first argument.
- `arg1`: The `Expression` that represents the second argument.
- `arg2`: The `Expression` that represents the third argument.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is null.

To be added.

## Expression.Call(Type, String, Type[], Expression[]) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (Type type, string methodName, Type[]? typeArguments, params System.Linq.Expressions.Expression[]? arguments);
```

Creates a `MethodCallExpression` that represents a call to a `static` (`Shared` in Visual Basic) method by calling the appropriate factory method.

Parameters:

- `type`: The type that contains the specified `static` (`Shared` in Visual Basic) method.
- `methodName`: The name of the method.
- `typeArguments`: An array of `Type` objects that specify the type parameters of the generic method. This argument should be null when methodName specifies a non-generic method.
- `arguments`: An array of `Expression` objects that represent the arguments to the method.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call`, the `MethodCallExpression.Method` property set to the `MethodInfo` that represents the specified `static` (`Shared` in Visual Basic) method, and the `MethodCallExpression.Arguments` property set to the specified arguments.

Exceptions:

- `ArgumentNullException`: `type` or `methodName` is `null`.
- `InvalidOperationException`: No method whose name is `methodName`, whose type parameters match `typeArguments`, and whose parameter types match `arguments` is found in `type` or its base types.

-or-

More than one method whose name is `methodName`, whose type parameters match `typeArguments`, and whose parameter types match `arguments` is found in `type` or its base types.

#### Remarks
The `Type` property of the resulting `MethodCallExpression` is equal to the return type of the method denoted by `methodName`. The `Object` property is `null`.

## Expression.Call(Expression, MethodInfo, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Linq.Expressions.Expression? instance, System.Reflection.MethodInfo method, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2);
```

Creates a `MethodCallExpression` that represents a call to a method that takes three arguments.

Parameters:

- `instance`: An `Expression` that specifies the instance for an instance call. (pass null for a static (Shared in Visual Basic) method).
- `method`: The `MethodInfo` that represents the target method.
- `arg0`: The `Expression` that represents the first argument.
- `arg1`: The `Expression` that represents the second argument.
- `arg2`: The `Expression` that represents the third argument.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

To be added.

## Expression.Call(MethodInfo, Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Reflection.MethodInfo method, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3);
```

Creates a `MethodCallExpression` that represents a call to a static method that takes four arguments.

Parameters:

- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.
- `arg0`: The `Expression` that represents the first argument.
- `arg1`: The `Expression` that represents the second argument.
- `arg2`: The `Expression` that represents the third argument.
- `arg3`: The `Expression` that represents the fourth argument.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is null.

To be added.

## Expression.Call(MethodInfo, Expression, Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.MethodCallExpression Call (System.Reflection.MethodInfo method, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3, System.Linq.Expressions.Expression arg4);
```

Creates a `MethodCallExpression` that represents a call to a static method that takes five arguments.

Parameters:

- `method`: A `MethodInfo` to set the `MethodCallExpression.Method` property equal to.
- `arg0`: The `Expression` that represents the first argument.
- `arg1`: The `Expression` that represents the second argument.
- `arg2`: The `Expression` that represents the third argument.
- `arg3`: The `Expression` that represents the fourth argument.
- `arg4`: The `Expression` that represents the fifth argument.

Returns: A `MethodCallExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Call` and the `MethodCallExpression.Object` and `MethodCallExpression.Method` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `method` is null.

To be added.

## Expression.Catch(ParameterExpression, Expression) method

```csharp
public static System.Linq.Expressions.CatchBlock Catch (System.Linq.Expressions.ParameterExpression variable, System.Linq.Expressions.Expression body);
```

Creates a `CatchBlock` representing a catch statement with a reference to the caught `Exception` object for use in the handler body.

Parameters:

- `variable`: A `ParameterExpression` representing a reference to the `Exception` object caught by this handler.
- `body`: The body of the catch statement.

Returns: The created `CatchBlock`.

To be added.

## Expression.Catch(Type, Expression) method

```csharp
public static System.Linq.Expressions.CatchBlock Catch (Type type, System.Linq.Expressions.Expression body);
```

Creates a `CatchBlock` representing a catch statement.

Parameters:

- `type`: The `Expression.Type` of `Exception` this `CatchBlock` will handle.
- `body`: The body of the catch statement.

Returns: The created `CatchBlock`.

#### Remarks
The `Expression.Type` of `Exception` to be caught can be specified but no reference to the `Exception` object will be available for use in the `CatchBlock`.

## Expression.Catch(ParameterExpression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.CatchBlock Catch (System.Linq.Expressions.ParameterExpression variable, System.Linq.Expressions.Expression body, System.Linq.Expressions.Expression? filter);
```

Creates a `CatchBlock` representing a catch statement with an `Exception` filter and a reference to the caught `Exception` object.

Parameters:

- `variable`: A `ParameterExpression` representing a reference to the `Exception` object caught by this handler.
- `body`: The body of the catch statement.
- `filter`: The body of the `Exception` filter.

Returns: The created `CatchBlock`.

To be added.

## Expression.Catch(Type, Expression, Expression) method

```csharp
public static System.Linq.Expressions.CatchBlock Catch (Type type, System.Linq.Expressions.Expression body, System.Linq.Expressions.Expression? filter);
```

Creates a `CatchBlock` representing a catch statement with an `Exception` filter but no reference to the caught `Exception` object.

Parameters:

- `type`: The `Expression.Type` of `Exception` this `CatchBlock` will handle.
- `body`: The body of the catch statement.
- `filter`: The body of the `Exception` filter.

Returns: The created `CatchBlock`.

To be added.

## Expression.ClearDebugInfo(SymbolDocumentInfo) method

```csharp
public static System.Linq.Expressions.DebugInfoExpression ClearDebugInfo (System.Linq.Expressions.SymbolDocumentInfo document);
```

Creates a `DebugInfoExpression` for clearing a sequence point.

Parameters:

- `document`: The `SymbolDocumentInfo` that represents the source file.

Returns: An instance of `DebugInfoExpression` for clearing a sequence point.

To be added.

## Expression.Coalesce(Expression, Expression) method

```csharp
public static System.Linq.Expressions.BinaryExpression Coalesce (System.Linq.Expressions.Expression left, System.Linq.Expressions.Expression right);
```

Creates a `BinaryExpression` that represents a coalescing operation.

Parameters:

- `left`: An `Expression` to set the `BinaryExpression.Left` property equal to.
- `right`: An `Expression` to set the `BinaryExpression.Right` property equal to.

Returns: A `BinaryExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Coalesce` and the `BinaryExpression.Left` and `BinaryExpression.Right` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `left` or `right` is `null`.
- `InvalidOperationException`: The `Expression.Type` property of `left` does not represent a reference type or a nullable value type.
- `ArgumentException`: `left`.Type and `right`.Type are not convertible to each other.

#### Remarks
The `Method` property of the resulting `BinaryExpression` is `null` and both `BinaryExpression.IsLifted` and `BinaryExpression.IsLiftedToNull` are set to `false`. The `Type` property is equal to the result type of the coalescing operation. The `Conversion` property is `null`.

#### Result Type
The following rules determine the result type:

- If `left`.Type represents a nullable type and `right`.Type is implicitly convertible to the corresponding non-nullable type, the result type is the non-nullable equivalent of `left`.Type.

- Otherwise, if `right`.Type is implicitly convertible to `left`.Type, the result type is `left`.Type.

- Otherwise, if the non-nullable equivalent of `left`.Type is implicitly convertible to `right`.Type, the result type is `right`.Type.
