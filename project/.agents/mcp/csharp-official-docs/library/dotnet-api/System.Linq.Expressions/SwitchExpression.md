---
title: "SwitchExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/SwitchExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SwitchExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class SwitchExpression : System.Linq.Expressions.Expression
```

Represents a control expression that handles multiple selections by passing control to `SwitchCase`.

#### Examples
The following example demonstrates how to create an expression that represents a switch statement that has a default case by using the `Expression.Switch` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## SwitchExpression.Cases property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.SwitchCase> Cases { get; }
```

Gets the collection of `SwitchCase` objects for the switch.

Returns: The collection of `SwitchCase` objects.

To be added.

## SwitchExpression.Comparison property

```csharp
public System.Reflection.MethodInfo? Comparison { get; }
```

Gets the equality comparison method, if any.

Returns: The `MethodInfo` object representing the equality comparison method.

To be added.

## SwitchExpression.DefaultBody property

```csharp
public System.Linq.Expressions.Expression? DefaultBody { get; }
```

Gets the test for the switch.

Returns: The `Expression` object representing the test for the switch.

To be added.

## SwitchExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this Expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## SwitchExpression.SwitchValue property

```csharp
public System.Linq.Expressions.Expression SwitchValue { get; }
```

Gets the test for the switch.

Returns: The `Expression` object representing the test for the switch.

To be added.

## SwitchExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `SwitchExpression.Type` that represents the static type of the expression.

To be added.

## SwitchExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## SwitchExpression.Update(Expression, SwitchCase>, Expression) method

```csharp
public System.Linq.Expressions.SwitchExpression Update (System.Linq.Expressions.Expression switchValue, System.Collections.Generic.IEnumerable<System.Linq.Expressions.SwitchCase>? cases, System.Linq.Expressions.Expression? defaultBody);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `switchValue`: The `SwitchExpression.SwitchValue` property of the result.
- `cases`: The `SwitchExpression.Cases` property of the result.
- `defaultBody`: The `SwitchExpression.DefaultBody` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
