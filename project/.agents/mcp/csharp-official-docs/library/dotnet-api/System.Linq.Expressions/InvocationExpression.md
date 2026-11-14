---
title: "InvocationExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/InvocationExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvocationExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class InvocationExpression : System.Linq.Expressions.Expression, System.Linq.Expressions.IArgumentProvider
```

Represents an expression that applies a delegate or lambda expression to a list of argument expressions.

#### Remarks
Use the `Expression.Invoke` factory methods to create an `InvocationExpression`.

The `Expression.NodeType` of an `InvocationExpression` is `Invoke`.

#### Examples
The following example creates an `InvocationExpression` that represents invoking a lambda expression with specified arguments.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## InvocationExpression.Arguments property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Arguments { get; }
```

Gets the arguments that the delegate or lambda expression is applied to.

Returns: A `ReadOnlyCollection<T>` of `Expression` objects which represent the arguments that the delegate is applied to.

To be added.

## InvocationExpression.Expression property

```csharp
public System.Linq.Expressions.Expression Expression { get; }
```

Gets the delegate or lambda expression to be applied.

Returns: An `Expression` that represents the delegate to be applied.

To be added.

## InvocationExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## InvocationExpression.System.Linq.Expressions.IArgumentProvider.ArgumentCount property

```csharp
int System.Linq.Expressions.IArgumentProvider.ArgumentCount { get; }
```

Returns the number of arguments to the expression tree node.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Returns: The number of arguments to the expression tree node as `Int32`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `InvocationExpression` instance is cast to an `IArgumentProvider` interface.

## InvocationExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `InvocationExpression.Expression` represents.

Returns: The `InvocationExpression.Type` that represents the static type of the expression.

To be added.

## InvocationExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## InvocationExpression.System.Linq.Expressions.IArgumentProvider.GetArgument(Int32) method

```csharp
System.Linq.Expressions.Expression IArgumentProvider.GetArgument (int index);
```

Returns the argument at index, throwing if index is out of bounds.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Parameters:

- `index`: The index of the argument.

Returns: The argument at index, throwing if index is out of bounds, as `Expression`.

To be added.

## InvocationExpression.Update(Expression, Expression>) method

```csharp
public System.Linq.Expressions.InvocationExpression Update (System.Linq.Expressions.Expression expression, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `expression`: The `InvocationExpression.Expression` property of the result.
- `arguments`: The `InvocationExpression.Arguments` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
