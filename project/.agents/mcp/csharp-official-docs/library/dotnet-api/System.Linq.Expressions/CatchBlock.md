---
title: "CatchBlock class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/CatchBlock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CatchBlock class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class CatchBlock
```

Represents a catch statement in a try block.

#### Remarks
The `Expression.Catch` methods can be used to create a `CatchBlock`.

## CatchBlock.Body property

```csharp
public System.Linq.Expressions.Expression Body { get; }
```

Gets the body of the catch block.

Returns: The `Expression` object representing the catch body.

To be added.

## CatchBlock.Filter property

```csharp
public System.Linq.Expressions.Expression? Filter { get; }
```

Gets the body of the `CatchBlock` filter.

Returns: The `Expression` object representing the body of the `CatchBlock` filter.

To be added.

## CatchBlock.Test property

```csharp
public Type Test { get; }
```

Gets the type of `Exception` this handler catches.

Returns: The `Type` object representing the type of `Exception` this handler catches.

To be added.

## CatchBlock.Variable property

```csharp
public System.Linq.Expressions.ParameterExpression? Variable { get; }
```

Gets a reference to the `Exception` object caught by this handler.

Returns: The `ParameterExpression` object representing a reference to the `Exception` object caught by this handler.

To be added.

## CatchBlock.ToString() method

```csharp
public override string ToString ();
```

Returns a `String` that represents the current `Object`.

Returns: A `String` that represents the current `Object`.

To be added.

## CatchBlock.Update(ParameterExpression, Expression, Expression) method

```csharp
public System.Linq.Expressions.CatchBlock Update (System.Linq.Expressions.ParameterExpression? variable, System.Linq.Expressions.Expression? filter, System.Linq.Expressions.Expression body);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `variable`: The `CatchBlock.Variable` property of the result.
- `filter`: The `CatchBlock.Filter` property of the result.
- `body`: The `CatchBlock.Body` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
