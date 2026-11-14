---
title: "LambdaExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/LambdaExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LambdaExpression class

Namespace: `System.Linq.Expressions`

```csharp
public abstract class LambdaExpression : System.Linq.Expressions.Expression
```

Describes a lambda expression. This captures a block of code that is similar to a .NET method body.

#### Remarks
The `LambdaExpression` type represents a lambda expression in the form of an expression tree. The `Expression<T>` type, which derives from `LambdaExpression` and captures the type of the lambda expression more explicitly, can also be used to represent a lambda expression. At runtime, an expression tree node that represents a lambda expression is always of type `Expression<T>`.

The value of the `NodeType` property of a `LambdaExpression` is `Lambda`.

Use the `Expression.Lambda` factory methods to create a `LambdaExpression` object.

#### Examples
The following example demonstrates how to create an expression that represents a lambda expression that adds 1 to the passed argument by using the `Expression.Lambda` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## LambdaExpression.Body property

```csharp
public System.Linq.Expressions.Expression Body { get; }
```

Gets the body of the lambda expression.

Returns: An `Expression` that represents the body of the lambda expression.

To be added.

## LambdaExpression.Name property

```csharp
public string? Name { get; }
```

Gets the name of the lambda expression.

Returns: The name of the lambda expression.

#### Remarks
Used for debugging.

## LambdaExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## LambdaExpression.Parameters property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.ParameterExpression> Parameters { get; }
```

Gets the parameters of the lambda expression.

Returns: A `ReadOnlyCollection<T>` of `ParameterExpression` objects that represent the parameters of the lambda expression.

To be added.

## LambdaExpression.ReturnType property

```csharp
public Type ReturnType { get; }
```

Gets the return type of the lambda expression.

Returns: The `Type` object representing the type of the lambda expression.

To be added.

## LambdaExpression.TailCall property

```csharp
public bool TailCall { get; }
```

Gets the value that indicates if the lambda expression will be compiled with the tail call optimization.

Returns: `true` if the lambda expression will be compiled with the tail call optimization; otherwise, `false`.

To be added.

## LambdaExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `LambdaExpression.Type` that represents the static type of the expression.

To be added.

## LambdaExpression.Compile() method

```csharp
public Delegate Compile ();
```

Produces a delegate that represents the lambda expression.

Returns: A `Delegate` that contains the compiled version of the lambda expression.

#### Remarks
The `LambdaExpression.Compile` method can be used to convert a `LambdaExpression` expression tree into the delegate that it represents.

## LambdaExpression.Compile(Boolean) method

```csharp
public Delegate Compile (bool preferInterpretation);
```

Produces an interpreted or compiled delegate that represents the lambda expression.

Parameters:

- `preferInterpretation`: `true` to indicate that the expression should be compiled to an interpreted form, if it's available; otherwise, `false`.

Returns: A delegate that represents the compiled lambda expression described by the `LambdaExpression` object.

To be added.

## LambdaExpression.Compile(DebugInfoGenerator) method

```csharp
public Delegate Compile (System.Runtime.CompilerServices.DebugInfoGenerator debugInfoGenerator);
```

Produces a delegate that represents the lambda expression.

Parameters:

- `debugInfoGenerator`: Debugging information generator used by the compiler to mark sequence points and annotate local variables.

Returns: A delegate containing the compiled version of the lambda.

To be added.
