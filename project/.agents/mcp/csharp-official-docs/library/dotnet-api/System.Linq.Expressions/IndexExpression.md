---
title: "IndexExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/IndexExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IndexExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class IndexExpression : System.Linq.Expressions.Expression, System.Linq.Expressions.IArgumentProvider
```

Represents indexing a property or array.

#### Examples
The following code example shows how to create an object of the `IndexExpression` type and use it to change a value of an array element by using the `Expression.ArrayAccess` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## IndexExpression.Arguments property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Arguments { get; }
```

Gets the arguments that will be used to index the property or array.

Returns: The read-only collection containing the arguments that will be used to index the property or array.

To be added.

## IndexExpression.Indexer property

```csharp
public System.Reflection.PropertyInfo? Indexer { get; }
```

Gets the `PropertyInfo` for the property if the expression represents an indexed property, returns null otherwise.

Returns: The `PropertyInfo` for the property if the expression represents an indexed property, otherwise null.

To be added.

## IndexExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## IndexExpression.Object property

```csharp
public System.Linq.Expressions.Expression? Object { get; }
```

An object to index.

Returns: The `Expression` representing the object to index.

To be added.

## IndexExpression.System.Linq.Expressions.IArgumentProvider.ArgumentCount property

```csharp
int System.Linq.Expressions.IArgumentProvider.ArgumentCount { get; }
```

Returns the number of arguments to the expression tree node.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Returns: Returns `Int32`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `IndexExpression` instance is cast to an `IArgumentProvider` interface.

## IndexExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `IndexExpression.Type` that represents the static type of the expression.

To be added.

## IndexExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## IndexExpression.System.Linq.Expressions.IArgumentProvider.GetArgument(Int32) method

```csharp
System.Linq.Expressions.Expression IArgumentProvider.GetArgument (int index);
```

Returns the argument at index, throwing if index is out of bounds.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Parameters:

- `index`: The index of the argument.

Returns: Returns `Expression`.

To be added.

## IndexExpression.Update(Expression, Expression>) method

```csharp
public System.Linq.Expressions.IndexExpression Update (System.Linq.Expressions.Expression object, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `object`: The `IndexExpression.Object` property of the result.
- `arguments`: The `IndexExpression.Arguments` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
