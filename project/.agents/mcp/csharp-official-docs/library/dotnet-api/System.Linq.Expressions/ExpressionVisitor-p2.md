---
title: "ExpressionVisitor class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ExpressionVisitor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExpressionVisitor class (part 2 of 2)

## ExpressionVisitor.VisitNew(NewExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitNew (System.Linq.Expressions.NewExpression node);
```

Visits the children of the `NewExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitNewArray(NewArrayExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitNewArray (System.Linq.Expressions.NewArrayExpression node);
```

Visits the children of the `NewArrayExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitParameter(ParameterExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitParameter (System.Linq.Expressions.ParameterExpression node);
```

Visits the `ParameterExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitRuntimeVariables(RuntimeVariablesExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitRuntimeVariables (System.Linq.Expressions.RuntimeVariablesExpression node);
```

Visits the children of the `RuntimeVariablesExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitSwitch(SwitchExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitSwitch (System.Linq.Expressions.SwitchExpression node);
```

Visits the children of the `SwitchExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitSwitchCase(SwitchCase) method

```csharp
protected virtual System.Linq.Expressions.SwitchCase VisitSwitchCase (System.Linq.Expressions.SwitchCase node);
```

Visits the children of the `SwitchCase`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitTry(TryExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitTry (System.Linq.Expressions.TryExpression node);
```

Visits the children of the `TryExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitTypeBinary(TypeBinaryExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitTypeBinary (System.Linq.Expressions.TypeBinaryExpression node);
```

Visits the children of the `TypeBinaryExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitUnary(UnaryExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitUnary (System.Linq.Expressions.UnaryExpression node);
```

Visits the children of the `UnaryExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.
