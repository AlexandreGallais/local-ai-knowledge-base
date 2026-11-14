---
title: "NewArrayExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/NewArrayExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NewArrayExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class NewArrayExpression : System.Linq.Expressions.Expression
```

Represents creating a new array and possibly initializing the elements of the new array.

#### Remarks
The following table shows the different factory methods that you can use to create a `NewArrayExpression` depending on the `Expression.NodeType` you require.

|`Expression.NodeType`|Factory Methods|
|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
|`NewArrayBounds`|`Expression.NewArrayBounds`|
|`NewArrayInit`|`Expression.NewArrayInit`|

#### Examples
The following example creates a `NewArrayExpression` object that represents creating and initializing a one-dimensional array of strings.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

The next example creates a `NewArrayExpression` object that represents creating a two-dimensional array of strings.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## NewArrayExpression.Expressions property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Expressions { get; }
```

Gets the bounds of the array if the value of the `Expression.NodeType` property is `ExpressionType.NewArrayBounds`, or the values to initialize the elements of the new array if the value of the `Expression.NodeType` property is `ExpressionType.NewArrayInit`.

Returns: A `ReadOnlyCollection<T>` of `Expression` objects which represent either the bounds of the array or the initialization values.

To be added.

## NewArrayExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `NewArrayExpression.Type` that represents the static type of the expression.

To be added.

## NewArrayExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## NewArrayExpression.Update(Expression>) method

```csharp
public System.Linq.Expressions.NewArrayExpression Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> expressions);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `expressions`: The `NewArrayExpression.Expressions` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
