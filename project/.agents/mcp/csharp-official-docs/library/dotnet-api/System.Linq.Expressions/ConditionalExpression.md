---
title: "ConditionalExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ConditionalExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConditionalExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class ConditionalExpression : System.Linq.Expressions.Expression
```

Represents an expression that has a conditional operator.

#### Remarks
Use the `Expression.Condition` factory method to create a `ConditionalExpression`.

The `Expression.NodeType` of a `ConditionalExpression` is `Conditional`.

#### Examples
The following code example shows how to create an expression that represents a conditional statement. If the first argument evaluates to `true`, the second argument is executed; otherwise, the third argument is executed.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BlockExpression/Overview/program.cs._

## ConditionalExpression.IfFalse property

```csharp
public System.Linq.Expressions.Expression IfFalse { get; }
```

Gets the expression to execute if the test evaluates to `false`.

Returns: An `Expression` that represents the expression to execute if the test is `false`.

To be added.

## ConditionalExpression.IfTrue property

```csharp
public System.Linq.Expressions.Expression IfTrue { get; }
```

Gets the expression to execute if the test evaluates to `true`.

Returns: An `Expression` that represents the expression to execute if the test is `true`.

To be added.

## ConditionalExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## ConditionalExpression.Test property

```csharp
public System.Linq.Expressions.Expression Test { get; }
```

Gets the test of the conditional operation.

Returns: An `Expression` that represents the test of the conditional operation.

To be added.

## ConditionalExpression.Type property

```csharp
public override Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `ConditionalExpression.Type` that represents the static type of the expression.

To be added.

## ConditionalExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## ConditionalExpression.Update(Expression, Expression, Expression) method

```csharp
public System.Linq.Expressions.ConditionalExpression Update (System.Linq.Expressions.Expression test, System.Linq.Expressions.Expression ifTrue, System.Linq.Expressions.Expression ifFalse);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `test`: The `ConditionalExpression.Test` property of the result.
- `ifTrue`: The `ConditionalExpression.IfTrue` property of the result.
- `ifFalse`: The `ConditionalExpression.IfFalse` property of the result.

Returns: This expression if no children changed, or an expression with the updated children.

To be added.
