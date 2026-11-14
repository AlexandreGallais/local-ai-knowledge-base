---
title: "DebugInfoExpression class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/DebugInfoExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebugInfoExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class DebugInfoExpression : System.Linq.Expressions.Expression
```

Emits or clears a sequence point for debug information. This allows the debugger to highlight the correct source code when debugging.

To be added.

## DebugInfoExpression.Document property

```csharp
public System.Linq.Expressions.SymbolDocumentInfo Document { get; }
```

Gets the `SymbolDocumentInfo` that represents the source file.

Returns: The `SymbolDocumentInfo` that represents the source file.

To be added.

## DebugInfoExpression.EndColumn property

```csharp
public virtual int EndColumn { get; }
```

Gets the end column of this `DebugInfoExpression`.

Returns: The number of the end column of the code that was used to generate the wrapped expression.

To be added.

## DebugInfoExpression.EndLine property

```csharp
public virtual int EndLine { get; }
```

Gets the end line of this `DebugInfoExpression`.

Returns: The number of the end line of the code that was used to generate the wrapped expression.

To be added.

## DebugInfoExpression.IsClear property

```csharp
public virtual bool IsClear { get; }
```

Gets the value to indicate if the `DebugInfoExpression` is for clearing a sequence point.

Returns: `true` if the `DebugInfoExpression` is for clearing a sequence point; otherwise, `false`.

To be added.

## DebugInfoExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this `Expression`.

Returns: The `ExpressionType` that represents this expression.

To be added.

## DebugInfoExpression.StartColumn property

```csharp
public virtual int StartColumn { get; }
```

Gets the start column of this `DebugInfoExpression`.

Returns: The number of the start column of the code that was used to generate the wrapped expression.

To be added.

## DebugInfoExpression.StartLine property

```csharp
public virtual int StartLine { get; }
```

Gets the start line of this `DebugInfoExpression`.

Returns: The number of the start line of the code that was used to generate the wrapped expression.

To be added.

## DebugInfoExpression.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `DebugInfoExpression.Type` that represents the static type of the expression.

To be added.

## DebugInfoExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.
