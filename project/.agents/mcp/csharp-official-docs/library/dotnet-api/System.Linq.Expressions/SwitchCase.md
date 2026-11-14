---
title: "SwitchCase class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/SwitchCase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SwitchCase class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class SwitchCase
```

Represents one case of a `SwitchExpression`.

#### Examples
The following example demonstrates how to create an expression that represents a switch statement without a default case by using the `Expression.SwitchCase` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## SwitchCase.Body property

```csharp
public System.Linq.Expressions.Expression Body { get; }
```

Gets the body of this case.

Returns: The `Expression` object that represents the body of the case block.

To be added.

## SwitchCase.TestValues property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> TestValues { get; }
```

Gets the values of this case. This case is selected for execution when the `SwitchExpression.SwitchValue` matches any of these values.

Returns: The read-only collection of the values for this case block.

To be added.

## SwitchCase.ToString() method

```csharp
public override string ToString ();
```

Returns a `String` that represents the current `Object`.

Returns: A `String` that represents the current `Object`.

To be added.

## SwitchCase.Update(Expression>, Expression) method

```csharp
public System.Linq.Expressions.SwitchCase Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> testValues, System.Linq.Expressions.Expression body);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `testValues`: The `SwitchCase.TestValues` property of the result.
- `body`: The `SwitchCase.Body` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
