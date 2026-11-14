---
title: "MethodCallExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MethodCallExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodCallExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class MethodCallExpression : System.Linq.Expressions.Expression, System.Linq.Expressions.IArgumentProvider
```

Represents a call to either static or an instance method.

#### Remarks
Use the `Expression.Call`, `Expression.ArrayIndex`, or `Expression.ArrayIndex` factory method to create a `MethodCallExpression`.

The value of the `NodeType` property of a `MethodCallExpression` object is `Call`.

#### Examples
The following example creates a `MethodCallExpression` object that represents indexing into a two-dimensional array.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## MethodCallExpression.Arguments property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Arguments { get; }
```

Gets a collection of expressions that represent arguments of the called method.

Returns: A `ReadOnlyCollection<T>` of `Expression` objects which represent the arguments to the called method.

To be added.

## MethodCallExpression.Method property

```csharp
public System.Reflection.MethodInfo Method { get; }
```

Gets the `MethodInfo` for the method to be called.

Returns: The `MethodInfo` that represents the called method.

To be added.

## MethodCallExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## MethodCallExpression.Object property

```csharp
public System.Linq.Expressions.Expression? Object { get; }
```

Gets the `Expression` that represents the instance for instance method calls or null for static method calls.

Returns: An `Expression` that represents the receiving object of the method.

#### Remarks
If a `MethodCallExpression` object's `Method` property represents a `static` (`Shared` in Visual Basic) method, the `Object` property is `null`.

## MethodCallExpression.System.Linq.Expressions.IArgumentProvider.ArgumentCount property

```csharp
int System.Linq.Expressions.IArgumentProvider.ArgumentCount { get; }
```

Returns the number of arguments to the expression tree node.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Returns: The number of arguments to the expression tree node as  `Int32`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `MethodCallExpression` instance is cast to an `IArgumentProvider` interface.

## MethodCallExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `MethodCallExpression.Type` that represents the static type of the expression.

To be added.

## MethodCallExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## MethodCallExpression.System.Linq.Expressions.IArgumentProvider.GetArgument(Int32) method

```csharp
System.Linq.Expressions.Expression IArgumentProvider.GetArgument (int index);
```

Returns the argument at index, throwing if index is out of bounds.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Parameters:

- `index`: The index of the argument.

Returns: Returns `Expression`.

To be added.

## MethodCallExpression.Update(Expression, Expression>) method

```csharp
public System.Linq.Expressions.MethodCallExpression Update (System.Linq.Expressions.Expression? object, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `object`: The `MethodCallExpression.Object` property of the result.
- `arguments`: The `MethodCallExpression.Arguments` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
