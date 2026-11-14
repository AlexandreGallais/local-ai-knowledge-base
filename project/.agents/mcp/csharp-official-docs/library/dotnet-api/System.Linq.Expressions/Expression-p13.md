---
title: "Expression class (part 13 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 13 of 32)

## Expression.IfThenElse(Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.ConditionalExpression IfThenElse (System.Linq.Expressions.Expression test, System.Linq.Expressions.Expression ifTrue, System.Linq.Expressions.Expression ifFalse);
```

Creates a `ConditionalExpression` that represents a conditional block with `if` and `else` statements.

Parameters:

- `test`: An `Expression` to set the `ConditionalExpression.Test` property equal to.
- `ifTrue`: An `Expression` to set the `ConditionalExpression.IfTrue` property equal to.
- `ifFalse`: An `Expression` to set the `ConditionalExpression.IfFalse` property equal to.

Returns: A `ConditionalExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Conditional` and the `ConditionalExpression.Test`, `ConditionalExpression.IfTrue`, and `ConditionalExpression.IfFalse` properties set to the specified values. The type of the resulting `ConditionalExpression` returned by this method is `Void`.

#### Examples
The following code example shows how to create an expression that represents a conditional block.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Increment(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression Increment (System.Linq.Expressions.Expression expression);
```

Creates a `UnaryExpression` that represents the incrementing of the expression value by 1.

Parameters:

- `expression`: An `Expression` to increment.

Returns: A `UnaryExpression` that represents the incremented expression.

#### Remarks
This expression is functional and does not change the value of the object that is passed to it.

#### Examples
The following code example shows how to create an expression that represents an increment operation.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Increment(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression Increment (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Creates a `UnaryExpression` that represents the incrementing of the expression by 1.

Parameters:

- `expression`: An `Expression` to increment.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: A `UnaryExpression` that represents the incremented expression.

#### Remarks
This expression is functional and does not change the value of the object that is passed to it.

## Expression.Invoke(Expression, Expression>) method

```csharp
public static System.Linq.Expressions.InvocationExpression Invoke (System.Linq.Expressions.Expression expression, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates an `InvocationExpression` that applies a delegate or lambda expression to a list of argument expressions.

Parameters:

- `expression`: An `Expression` that represents the delegate or lambda expression to be applied to.
- `arguments`: An `IEnumerable<T>` that contains `Expression` objects that represent the arguments that the delegate or lambda expression is applied to.

Returns: An `InvocationExpression` that applies the specified delegate or lambda expression to the provided arguments.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.
- `ArgumentException`: `expression`.Type does not represent a delegate type or an `Expression<T>`.

-or-

The `Expression.Type` property of an element of `arguments` is not assignable to the type of the corresponding parameter of the delegate represented by `expression`.
- `InvalidOperationException`: `arguments` does not contain the same number of elements as the list of parameters for the delegate represented by `expression`.

#### Remarks
The `Type` property of the resulting `InvocationExpression` represents the return type of the delegate that is represented by `expression`.Type.

The `Arguments` property of the resulting `InvocationExpression` is empty if `arguments` is `null`. Otherwise, it contains the same elements as `arguments` except that some of these `Expression` objects may be *quoted*.

> **Note:**
>  An element will be quoted only if the corresponding parameter of the delegate represented by `expression` is of type `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `arguments`.

#### Examples
The following example demonstrates how to use the `Invoke` method to create an `InvocationExpression` that represents the invocation of a lambda expression with specified arguments.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.Invoke(Expression, Expression[]) method

```csharp
public static System.Linq.Expressions.InvocationExpression Invoke (System.Linq.Expressions.Expression expression, params System.Linq.Expressions.Expression[]? arguments);
```

Creates an `InvocationExpression` that applies a delegate or lambda expression to a list of argument expressions.

Parameters:

- `expression`: An `Expression` that represents the delegate or lambda expression to be applied.
- `arguments`: An array of `Expression` objects that represent the arguments that the delegate or lambda expression is applied to.

Returns: An `InvocationExpression` that applies the specified delegate or lambda expression to the provided arguments.

Exceptions:

- `ArgumentNullException`: `expression` is `null`.
- `ArgumentException`: `expression`.Type does not represent a delegate type or an `Expression<T>`.

-or-

The `Expression.Type` property of an element of `arguments` is not assignable to the type of the corresponding parameter of the delegate represented by `expression`.
- `InvalidOperationException`: `arguments` does not contain the same number of elements as the list of parameters for the delegate represented by `expression`.

#### Remarks
The `Type` property of the resulting `InvocationExpression` represents the return type of the delegate that is represented by `expression`.Type.

The `Arguments` property of the resulting `InvocationExpression` is empty if `arguments` is `null`. Otherwise, it contains the same elements as `arguments` except that some of these `Expression` objects may be *quoted*.

> **Note:**
>  An element will be quoted only if the corresponding parameter of the delegate represented by `expression` is of type `Expression`. Quoting means the element is wrapped in a `Quote` node. The resulting node is a `UnaryExpression` whose `Operand` property is the element of `arguments`.

#### Examples
The following example demonstrates how to use the `Invoke` method to create an `InvocationExpression` that represents the invocation of a lambda expression with specified arguments.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## Expression.IsFalse(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression IsFalse (System.Linq.Expressions.Expression expression);
```

Returns whether the expression evaluates to false.

Parameters:

- `expression`: An `Expression` to evaluate.

Returns: An instance of `UnaryExpression`.

To be added.

## Expression.IsFalse(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression IsFalse (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Returns whether the expression evaluates to false.

Parameters:

- `expression`: An `Expression` to evaluate.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: An instance of `UnaryExpression`.

To be added.

## Expression.IsTrue(Expression) method

```csharp
public static System.Linq.Expressions.UnaryExpression IsTrue (System.Linq.Expressions.Expression expression);
```

Returns whether the expression evaluates to true.

Parameters:

- `expression`: An `Expression` to evaluate.

Returns: An instance of `UnaryExpression`.

To be added.

## Expression.IsTrue(Expression, MethodInfo) method

```csharp
public static System.Linq.Expressions.UnaryExpression IsTrue (System.Linq.Expressions.Expression expression, System.Reflection.MethodInfo? method);
```

Returns whether the expression evaluates to true.

Parameters:

- `expression`: An `Expression` to evaluate.
- `method`: A `MethodInfo` that represents the implementing method.

Returns: An instance of `UnaryExpression`.

To be added.

## Expression.Label() method

```csharp
public static System.Linq.Expressions.LabelTarget Label ();
```

Creates a `LabelTarget` representing a label with void type and no name.

Returns: The new `LabelTarget`.

#### Examples
The following example demonstrates how to create an expression that contains a `LabelTarget` object.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Label(LabelTarget) method

```csharp
public static System.Linq.Expressions.LabelExpression Label (System.Linq.Expressions.LabelTarget target);
```

Creates a `LabelExpression` representing a label without a default value.

Parameters:

- `target`: The `LabelTarget` that this `LabelExpression` will be associated with.

Returns: A `LabelExpression` without a default value.

To be added.

## Expression.Label(String) method

```csharp
public static System.Linq.Expressions.LabelTarget Label (string? name);
```

Creates a `LabelTarget` representing a label with void type and the given name.

Parameters:

- `name`: The name of the label.

Returns: The new `LabelTarget`.

To be added.

## Expression.Label(Type) method

```csharp
public static System.Linq.Expressions.LabelTarget Label (Type type);
```

Creates a `LabelTarget` representing a label with the given type.

Parameters:

- `type`: The type of value that is passed when jumping to the label.

Returns: The new `LabelTarget`.

#### Examples
The following example demonstrates how to use a `LabelTarget` object in a loop expression.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Label(LabelTarget, Expression) method

```csharp
public static System.Linq.Expressions.LabelExpression Label (System.Linq.Expressions.LabelTarget target, System.Linq.Expressions.Expression? defaultValue);
```

Creates a `LabelExpression` representing a label with the given default value.

Parameters:

- `target`: The `LabelTarget` that this `LabelExpression` will be associated with.
- `defaultValue`: The value of this `LabelExpression` when the label is reached through regular control flow.

Returns: A `LabelExpression` with the given default value.

To be added.

## Expression.Label(Type, String) method

```csharp
public static System.Linq.Expressions.LabelTarget Label (Type type, string? name);
```

Creates a `LabelTarget` representing a label with the given type and name.

Parameters:

- `type`: The type of value that is passed when jumping to the label.
- `name`: The name of the label.

Returns: The new `LabelTarget`.

To be added.

## Expression.Lambda(Expression, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (System.Linq.Expressions.Expression body, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` by first constructing a delegate type from the expression body, and an enumerable collection of parameter expressions. It can be used when the delegate type is not known at compile time.

Parameters:

- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda(Expression, ParameterExpression[]) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (System.Linq.Expressions.Expression body, params System.Linq.Expressions.ParameterExpression[]? parameters);
```

Creates a `LambdaExpression` by first constructing a delegate type from the expression body, and an array of parameter expressions. It can be used when the delegate type is not known at compile time.

Parameters:

- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `parameters`: An array of `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `Expression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `body` is `null`.

-or-

One or more elements of `parameters` are `null`.
- `ArgumentException`: `parameters` contains more than sixteen elements.

#### Remarks
The `parameters` parameter must not have more than sixteen elements.

The elements of `parameters` must be reference equal to the parameter expressions in `body`.

This method constructs an appropriate delegate type from one of the `System.Func` generic delegates. It then passes the delegate type to one of the `Lambda` factory methods to create a `LambdaExpression`.

## Expression.Lambda(Expression, Boolean, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (System.Linq.Expressions.Expression body, bool tailCall, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` by first constructing a delegate type from the expression body, a parameter that indicates whether tail call optimization will be applied, and an enumerable collection of parameter expressions. It can be used when the delegate type is not known at compile time.

Parameters:

- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.
