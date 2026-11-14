---
title: "RuntimeVariablesExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/RuntimeVariablesExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeVariablesExpression class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class RuntimeVariablesExpression : System.Linq.Expressions.Expression
```

An expression that provides runtime read/write permission for variables.

#### Remarks
This type is necessary for implementing "eval" in dynamic languages. It evaluates to an instance of `IList<T>` at run time.

## RuntimeVariablesExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this Expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## RuntimeVariablesExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `RuntimeVariablesExpression.Type` that represents the static type of the expression.

To be added.

## RuntimeVariablesExpression.Variables property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.ParameterExpression> Variables { get; }
```

The variables or parameters to which to provide runtime access.

Returns: The read-only collection containing parameters that will be provided the runtime access.

To be added.

## RuntimeVariablesExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

To be added.

## RuntimeVariablesExpression.Update(ParameterExpression>) method

```csharp
public System.Linq.Expressions.RuntimeVariablesExpression Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.ParameterExpression> variables);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `variables`: The `RuntimeVariablesExpression.Variables` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
