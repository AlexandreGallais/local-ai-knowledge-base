---
title: "Expression class (part 14 of 32)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/Expression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Expression class (part 14 of 32)

## Expression.Lambda(Expression, Boolean, ParameterExpression[]) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (System.Linq.Expressions.Expression body, bool tailCall, params System.Linq.Expressions.ParameterExpression[]? parameters);
```

Creates a `LambdaExpression` by first constructing a delegate type from the expression body, a parameter that indicates whether tail call optimization will be applied, and an array of parameter expressions. It can be used when the delegate type is not known at compile time.

Parameters:

- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An array that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda(Expression, String, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (System.Linq.Expressions.Expression body, string? name, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` by first constructing a delegate type from the expression body, the name for the lambda, and an enumerable collection of parameter expressions. It can be used when the delegate type is not known at compile time.

Parameters:

- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `name`: The name for the lambda. Used for emitting debug information.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda(Type, Expression, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (Type delegateType, System.Linq.Expressions.Expression body, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` where the delegate type is known at compile time, with an enumerable collection of parameter expressions.

Parameters:

- `delegateType`: A `Type` that represents a delegate signature for the lambda.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An object that represents a lambda expression which has the `Expression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `delegateType` or `body` is `null`.

-or-

One or more elements in `parameters` are `null`.
- `ArgumentException`: `delegateType` does not represent a delegate type.

-or-

`body`.Type represents a type that is not assignable to the return type of the delegate type represented by `delegateType`.

-or-

`parameters` does not contain the same number of elements as the list of parameters for the delegate type represented by `delegateType`.

-or-

The `Expression.Type` property of an element of `parameters` is not assignable from the type of the corresponding parameter type of the delegate type represented by `delegateType`.

#### Remarks
The object that is returned from this function is of type `Expression<T>`. The `LambdaExpression` type is used to represent the returned object because the concrete type of the lambda expression is not known at compile time.

The number of parameters for the delegate type represented by`delegateType` must equal the length of `parameters`.

The elements of `parameters` must be reference equal to the parameter expressions in `body`.

The `Type` property of the resulting object is equal to `delegateType`. If `parameters` is `null`, the `Parameters` property of the resulting object is an empty collection.

#### Examples
The following example demonstrates how to create an expression that represents a lambda expression that adds 1 to the passed argument.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## Expression.Lambda(Type, Expression, ParameterExpression[]) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (Type delegateType, System.Linq.Expressions.Expression body, params System.Linq.Expressions.ParameterExpression[]? parameters);
```

Creates a `LambdaExpression` where the delegate type is known at compile time, with an array of parameter expressions.

Parameters:

- `delegateType`: A `Type` that represents a delegate signature for the lambda.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `parameters`: An array of `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An object that represents a lambda expression which has the `Expression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `delegateType` or `body` is `null`.

-or-

One or more elements in `parameters` are `null`.
- `ArgumentException`: `delegateType` does not represent a delegate type.

-or-

`body`.Type represents a type that is not assignable to the return type of the delegate type represented by `delegateType`.

-or-

`parameters` does not contain the same number of elements as the list of parameters for the delegate type represented by `delegateType`.

-or-

The `Expression.Type` property of an element of `parameters` is not assignable from the type of the corresponding parameter type of the delegate type represented by `delegateType`.

#### Remarks
The object that is returned from this function is of type `Expression<T>`. The `LambdaExpression` type is used to represent the returned object because the concrete type of the lambda expression is not known at compile time.

The number of parameters for the delegate type represented by `delegateType` must equal the length of `parameters`.

The elements of `parameters` must be reference equal to the parameter expressions in `body`.

The `Type` property of the resulting object is equal to `delegateType`. If `parameters` is `null`, the `Parameters` property of the resulting object is an empty collection.

## Expression.Lambda(Expression, String, Boolean, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (System.Linq.Expressions.Expression body, string? name, bool tailCall, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` by first constructing a delegate type from the expression body, the name for the lambda, a parameter that indicates whether tail call optimization will be applied, and an enumerable collection of parameter expressions. It can be used when the delegate type is not known at compile time.

Parameters:

- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `name`: The name for the lambda. Used for emitting debug information.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda(Type, Expression, Boolean, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (Type delegateType, System.Linq.Expressions.Expression body, bool tailCall, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` where the delegate type is known at compile time, with a parameter that indicates whether tail call optimization will be applied, and an enumerable collection of parameter expressions.

Parameters:

- `delegateType`: A `Expression.Type` representing the delegate signature for the lambda.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda(Type, Expression, Boolean, ParameterExpression[]) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (Type delegateType, System.Linq.Expressions.Expression body, bool tailCall, params System.Linq.Expressions.ParameterExpression[]? parameters);
```

Creates a `LambdaExpression` where the delegate type is known at compile time, with a parameter that indicates whether tail call optimization will be applied, and an array of parameter expressions.

Parameters:

- `delegateType`: A `Expression.Type` representing the delegate signature for the lambda.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An array that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda(Type, Expression, String, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (Type delegateType, System.Linq.Expressions.Expression body, string? name, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` where the delegate type is known at compile time, with the name for the lambda, and an enumerable collection of parameter expressions.

Parameters:

- `delegateType`: A `Expression.Type` representing the delegate signature for the lambda.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `name`: The name for the lambda. Used for emitting debug information.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda(Type, Expression, String, Boolean, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.LambdaExpression Lambda (Type delegateType, System.Linq.Expressions.Expression body, string? name, bool tailCall, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates a `LambdaExpression` where the delegate type is known at compile time, with the name for the lambda, a parameter that indicates whether tail call optimization will be applied, and an enumerable collection of parameter expressions.

Parameters:

- `delegateType`: A `Expression.Type` representing the delegate signature for the lambda.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `name`: The name for the lambda. Used for emitting debug information.
- `tailCall`: A `Boolean` that indicates if tail call optimization will be applied when compiling the created expression.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: A `LambdaExpression` that has the `LambdaExpression.NodeType` property equal to Lambda and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

To be added.

## Expression.Lambda<TDelegate>(Expression, ParameterExpression>) method

```csharp
public static System.Linq.Expressions.Expression<TDelegate> Lambda<TDelegate> (System.Linq.Expressions.Expression body, System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression>? parameters);
```

Creates an `Expression<T>` where the delegate type is known at compile time, with an enumerable collection of parameter expressions.

Parameters:

- `TDelegate`: A delegate type.
- `body`: An `Expression` to set the `LambdaExpression.Body` property equal to.
- `parameters`: An `IEnumerable<T>` that contains `ParameterExpression` objects to use to populate the `LambdaExpression.Parameters` collection.

Returns: An `Expression<T>` that has the `Expression.NodeType` property equal to `ExpressionType.Lambda` and the `LambdaExpression.Body` and `LambdaExpression.Parameters` properties set to the specified values.

Exceptions:

- `ArgumentNullException`: `body` is `null`.

-or-

One or more elements in `parameters` are `null`.
- `ArgumentException`: `TDelegate` is not a delegate type.

-or-

`body`.Type represents a type that is not assignable to the return type of `TDelegate`.

-or-

`parameters` does not contain the same number of elements as the list of parameters for `TDelegate`.

-or-

The `Expression.Type` property of an element of `parameters` is not assignable from the type of the corresponding parameter type of `TDelegate`.

#### Remarks
The number of parameters for the delegate type `TDelegate` must equal the number of elements in `parameters`.

The elements of `parameters` must be reference equal to the parameter expressions in `body`.

The `Type` property of the resulting object represents the type `TDelegate`. If `parameters` is `null`, the `Parameters` property of the resulting object is an empty collection.
