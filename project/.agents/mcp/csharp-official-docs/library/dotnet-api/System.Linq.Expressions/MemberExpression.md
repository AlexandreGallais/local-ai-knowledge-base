---
title: "MemberExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MemberExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class MemberExpression : System.Linq.Expressions.Expression
```

Represents accessing a field or property.

#### Remarks
Use the `Expression.Field`, `Expression.Property` or `Expression.PropertyOrField` factory methods to create a `MemberExpression`.

The value of the `NodeType` property of a `MemberExpression` is `MemberAccess`.

#### Examples
The following example creates a `MemberExpression` that represents getting the value of a field member.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## MemberExpression.Expression property

```csharp
public System.Linq.Expressions.Expression? Expression { get; }
```

Gets the containing object of the field or property.

Returns: An `Expression` that represents the containing object of the field or property.

To be added.

## MemberExpression.Member property

```csharp
public System.Reflection.MemberInfo Member { get; }
```

Gets the field or property to be accessed.

Returns: The `MemberInfo` that represents the field or property to be accessed.

To be added.

## MemberExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `MemberExpression.Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## MemberExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## MemberExpression.Update(Expression) method

```csharp
public System.Linq.Expressions.MemberExpression Update (System.Linq.Expressions.Expression? expression);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `expression`: The `MemberExpression.Expression` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
