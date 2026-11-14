---
title: "ParameterExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ParameterExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParameterExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class ParameterExpression : System.Linq.Expressions.Expression
```

Represents a named parameter expression.

#### Remarks
Use the `Expression.Parameter` factory method to create a `ParameterExpression`.

The value of the `NodeType` property of a `ParameterExpression` object is `Parameter`.

#### Examples
The following example demonstrates how to create a `MethodCallExpression` object that prints the value of a `ParameterExpression` object by using the `Expression.Parameter` method.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## ParameterExpression.IsByRef property

```csharp
public bool IsByRef { get; }
```

Indicates that this `ParameterExpression` is to be treated as a `ByRef` parameter.

Returns: `true` if this `ParameterExpression` is a `ByRef` parameter; otherwise, `false`.

To be added.

## ParameterExpression.Name property

```csharp
public string? Name { get; }
```

Gets the name of the parameter or variable.

Returns: A `String` that contains the name of the parameter.

To be added.

## ParameterExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## ParameterExpression.Type property

```csharp
public override Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `ParameterExpression.Type` that represents the static type of the expression.

To be added.

## ParameterExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.
