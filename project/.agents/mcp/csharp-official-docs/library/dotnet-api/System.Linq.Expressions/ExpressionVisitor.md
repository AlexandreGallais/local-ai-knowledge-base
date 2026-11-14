---
title: "ExpressionVisitor class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ExpressionVisitor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExpressionVisitor class

Namespace: `System.Linq.Expressions`

```csharp
public abstract class ExpressionVisitor
```

Represents a visitor or rewriter for expression trees.

#### Remarks
This class is designed to be inherited to create more specialized classes whose functionality requires traversing, examining or copying an expression tree.

## ExpressionVisitor.ExpressionVisitor() constructor

```csharp
protected ExpressionVisitor ();
```

Initializes a new instance of `ExpressionVisitor`.

To be added.

## ExpressionVisitor.Visit(Expression>) method

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Visit (System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> nodes);
```

Dispatches the list of expressions to one of the more specialized visit methods in this class.

Parameters:

- `nodes`: The expressions to visit.

Returns: The modified expression list, if any one of the elements were modified; otherwise, returns the original expression list.

To be added.

## ExpressionVisitor.Visit(Expression) method

```csharp
public virtual System.Linq.Expressions.Expression? Visit (System.Linq.Expressions.Expression? node);
```

Dispatches the expression to one of the more specialized visit methods in this class.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.Visit<T>(ReadOnlyCollection<T>, Func<T,T>) method

```csharp
public static System.Collections.ObjectModel.ReadOnlyCollection<T> Visit<T> (System.Collections.ObjectModel.ReadOnlyCollection<T> nodes, Func<T,T> elementVisitor);
```

Visits all nodes in the collection using a specified element visitor.

Parameters:

- `T`: The type of the nodes.
- `nodes`: The nodes to visit.
- `elementVisitor`: A delegate that visits a single element, optionally replacing it with a new element.

Returns: The modified node list, if any of the elements were modified; otherwise, returns the original node list.

To be added.

## ExpressionVisitor.VisitAndConvert<T>(ReadOnlyCollection<T>, String) method

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<T> VisitAndConvert<T> (System.Collections.ObjectModel.ReadOnlyCollection<T> nodes, string? callerName) where T : System.Linq.Expressions.Expression;
```

Visits all expressions in the collection, casting the results back to the original expression type.

Parameters:

- `T`: The type of the expressions.
- `nodes`: The expressions to visit.
- `callerName`: The name of the calling method; used to report a better error message.

Returns: The modified expression collection, if any expression was modified; otherwise, returns the original expression collection.

Exceptions:

- `InvalidOperationException`: The visit method for one of the expressions returned a different type.

To be added.

## ExpressionVisitor.VisitAndConvert<T>(T, String) method

```csharp
public T? VisitAndConvert<T> (T? node, string? callerName) where T : System.Linq.Expressions.Expression;
```

Visits an expression, casting the result back to the original expression type.

Parameters:

- `T`: The type of the expression.
- `node`: The expression to visit.
- `callerName`: The name of the calling method; used to report to report a better error message.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

Exceptions:

- `InvalidOperationException`: The visit method for this node returned a different type.

To be added.

## ExpressionVisitor.VisitBinary(BinaryExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitBinary (System.Linq.Expressions.BinaryExpression node);
```

Visits the children of the `BinaryExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitBlock(BlockExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitBlock (System.Linq.Expressions.BlockExpression node);
```

Visits the children of the `BlockExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitCatchBlock(CatchBlock) method

```csharp
protected virtual System.Linq.Expressions.CatchBlock VisitCatchBlock (System.Linq.Expressions.CatchBlock node);
```

Visits the children of the `CatchBlock`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitConditional(ConditionalExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitConditional (System.Linq.Expressions.ConditionalExpression node);
```

Visits the children of the `ConditionalExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitConstant(ConstantExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitConstant (System.Linq.Expressions.ConstantExpression node);
```

Visits the `ConstantExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitDebugInfo(DebugInfoExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitDebugInfo (System.Linq.Expressions.DebugInfoExpression node);
```

Visits the `DebugInfoExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitDefault(DefaultExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitDefault (System.Linq.Expressions.DefaultExpression node);
```

Visits the `DefaultExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitDynamic(DynamicExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitDynamic (System.Linq.Expressions.DynamicExpression node);
```

Visits the children of the `DynamicExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitElementInit(ElementInit) method

```csharp
protected virtual System.Linq.Expressions.ElementInit VisitElementInit (System.Linq.Expressions.ElementInit node);
```

Visits the children of the `ElementInit`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitExtension(Expression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitExtension (System.Linq.Expressions.Expression node);
```

Visits the children of the extension expression.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

#### Remarks
This can be overridden to visit or rewrite specific extension nodes.

If it is not overridden, this method will call `Expression.VisitChildren`, which gives the node a chance to walk its children. By default, `Expression.VisitChildren` will try to reduce the node.

## ExpressionVisitor.VisitGoto(GotoExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitGoto (System.Linq.Expressions.GotoExpression node);
```

Visits the children of the `GotoExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitIndex(IndexExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitIndex (System.Linq.Expressions.IndexExpression node);
```

Visits the children of the `IndexExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitInvocation(InvocationExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitInvocation (System.Linq.Expressions.InvocationExpression node);
```

Visits the children of the `InvocationExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitLabel(LabelExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitLabel (System.Linq.Expressions.LabelExpression node);
```

Visits the children of the `LabelExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitLabelTarget(LabelTarget) method

```csharp
protected virtual System.Linq.Expressions.LabelTarget? VisitLabelTarget (System.Linq.Expressions.LabelTarget? node);
```

Visits the `LabelTarget`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitLambda<T>(Expression<T>) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitLambda<T> (System.Linq.Expressions.Expression<T> node);
```

Visits the children of the `Expression<T>`.

Parameters:

- `T`: The type of the delegate.
- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitListInit(ListInitExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitListInit (System.Linq.Expressions.ListInitExpression node);
```

Visits the children of the `ListInitExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitLoop(LoopExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitLoop (System.Linq.Expressions.LoopExpression node);
```

Visits the children of the `LoopExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitMember(MemberExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitMember (System.Linq.Expressions.MemberExpression node);
```

Visits the children of the `MemberExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitMemberAssignment(MemberAssignment) method

```csharp
protected virtual System.Linq.Expressions.MemberAssignment VisitMemberAssignment (System.Linq.Expressions.MemberAssignment node);
```

Visits the children of the `MemberAssignment`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitMemberBinding(MemberBinding) method

```csharp
protected virtual System.Linq.Expressions.MemberBinding VisitMemberBinding (System.Linq.Expressions.MemberBinding node);
```

Visits the children of the `MemberBinding`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitMemberInit(MemberInitExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitMemberInit (System.Linq.Expressions.MemberInitExpression node);
```

Visits the children of the `MemberInitExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitMemberListBinding(MemberListBinding) method

```csharp
protected virtual System.Linq.Expressions.MemberListBinding VisitMemberListBinding (System.Linq.Expressions.MemberListBinding node);
```

Visits the children of the `MemberListBinding`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitMemberMemberBinding(MemberMemberBinding) method

```csharp
protected virtual System.Linq.Expressions.MemberMemberBinding VisitMemberMemberBinding (System.Linq.Expressions.MemberMemberBinding node);
```

Visits the children of the `MemberMemberBinding`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.

## ExpressionVisitor.VisitMethodCall(MethodCallExpression) method

```csharp
protected internal virtual System.Linq.Expressions.Expression VisitMethodCall (System.Linq.Expressions.MethodCallExpression node);
```

Visits the children of the `MethodCallExpression`.

Parameters:

- `node`: The expression to visit.

Returns: The modified expression, if it or any subexpression was modified; otherwise, returns the original expression.

To be added.
