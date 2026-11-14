---
title: "DynamicExpressionVisitor class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/DynamicExpressionVisitor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DynamicExpressionVisitor class

Namespace: `System.Linq.Expressions`

```csharp
public abstract class DynamicExpressionVisitor : System.Linq.Expressions.ExpressionVisitor
```

Represents a visitor or rewriter for dynamic expression trees.

#### Remarks
This class is designed to be inherited to create more specialized classes whose functionality requires traversing, examining, or copying a dynamic expression tree.

## DynamicExpressionVisitor.DynamicExpressionVisitor() constructor

```csharp
protected DynamicExpressionVisitor ();
```

Initializes a new instance of `DynamicExpressionVisitor`.

To be added.

## DynamicExpressionVisitor.VisitDynamic(DynamicExpression) method

```csharp
protected internal override System.Linq.Expressions.Expression VisitDynamic (System.Linq.Expressions.DynamicExpression node);
```

Visits the children of the `DynamicExpression`.

Parameters:

- `node`: The expression to visit.

Returns: Returns `Expression`, the modified expression, if it or any subexpression is modified; otherwise, returns the original expression.

To be added.
