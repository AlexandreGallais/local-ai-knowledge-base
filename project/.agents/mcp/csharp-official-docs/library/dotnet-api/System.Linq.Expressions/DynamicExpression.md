---
title: "DynamicExpression class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/DynamicExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DynamicExpression class

Namespace: `System.Linq.Expressions`

```csharp
public class DynamicExpression : System.Linq.Expressions.Expression, System.Linq.Expressions.IDynamicExpression
```

Represents a dynamic operation.

To be added.

## DynamicExpression.Arguments property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Arguments { get; }
```

Gets the arguments to the dynamic operation.

Returns: The read-only collections containing the arguments to the dynamic operation.

To be added.

## DynamicExpression.Binder property

```csharp
public System.Runtime.CompilerServices.CallSiteBinder Binder { get; }
```

Gets the `CallSiteBinder`, which determines the run-time behavior of the dynamic site.

Returns: The `CallSiteBinder`, which determines the run-time behavior of the dynamic site.

To be added.

## DynamicExpression.DelegateType property

```csharp
public Type DelegateType { get; }
```

Gets the type of the delegate used by the `CallSite`.

Returns: The `Type` object representing the type of the delegate used by the `CallSite`.

To be added.

## DynamicExpression.NodeType property

```csharp
public override sealed System.Linq.Expressions.ExpressionType NodeType { get; }
```

Returns the node type of this expression. Extension nodes should return `ExpressionType.Extension` when overriding this method.

Returns: The `ExpressionType` of the expression.

To be added.

## DynamicExpression.System.Linq.Expressions.IArgumentProvider.ArgumentCount property

```csharp
int System.Linq.Expressions.IArgumentProvider.ArgumentCount { get; }
```

Returns the number of arguments to the expression tree node. You should not use this member. It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Returns: Returns `Int32`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `DynamicExpression` instance is cast to an `IArgumentProvider` interface.

## DynamicExpression.Type property

```csharp
public override Type Type { get; }
```

Gets the static type of the expression that this `Expression` represents.

Returns: The `DynamicExpression.Type` that represents the static type of the expression.

To be added.

## DynamicExpression.Accept(ExpressionVisitor) method

```csharp
protected internal override System.Linq.Expressions.Expression Accept (System.Linq.Expressions.ExpressionVisitor visitor);
```

Dispatches to the specific visit method for this node type. For example, `MethodCallExpression` calls the `ExpressionVisitor.VisitMethodCall`.

Parameters:

- `visitor`: The visitor to visit this node with.

Returns: The result of visiting this node.

#### Remarks
This default implementation for `Extension` nodes calls `ExpressionVisitor.VisitExtension`. Override this method to call into a more specific method on a derived visitor class of the `ExpressionVisitor` class. However, it should still support unknown visitors by calling `ExpressionVisitor.VisitExtension`.

## DynamicExpression.Dynamic(CallSiteBinder, Type, Expression>) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`,  and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result is inferred from the types of the arguments and the specified return type.

## DynamicExpression.Dynamic(CallSiteBinder, Type, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`,  and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result is inferred from the types of the arguments and the specified return type.

## DynamicExpression.Dynamic(CallSiteBinder, Type, Expression[]) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, params System.Linq.Expressions.Expression[] arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result is inferred from the types of the arguments and the specified return type.

## DynamicExpression.Dynamic(CallSiteBinder, Type, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result is inferred from the types of the arguments and the specified return type.

## DynamicExpression.Dynamic(CallSiteBinder, Type, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result is inferred from the types of the arguments and the specified return type.

## DynamicExpression.Dynamic(CallSiteBinder, Type, Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression Dynamic (System.Runtime.CompilerServices.CallSiteBinder binder, Type returnType, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `binder`: The runtime binder for the dynamic operation.
- `returnType`: The result type of the dynamic expression.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.
- `arg3`: The fourth argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.Binder` and `DynamicExpression.Arguments` set to the specified values.

#### Remarks
The `DelegateType` property of the result is inferred from the types of the arguments and the specified return type.

## DynamicExpression.MakeDynamic(Type, CallSiteBinder, Expression>) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## DynamicExpression.MakeDynamic(Type, CallSiteBinder, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and one argument.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## DynamicExpression.MakeDynamic(Type, CallSiteBinder, Expression[]) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, params System.Linq.Expressions.Expression[]? arguments);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder`.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arguments`: The arguments to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## DynamicExpression.MakeDynamic(Type, CallSiteBinder, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and two arguments.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## DynamicExpression.MakeDynamic(Type, CallSiteBinder, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and three arguments.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.

## DynamicExpression.MakeDynamic(Type, CallSiteBinder, Expression, Expression, Expression, Expression) method

```csharp
public static System.Linq.Expressions.DynamicExpression MakeDynamic (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder, System.Linq.Expressions.Expression arg0, System.Linq.Expressions.Expression arg1, System.Linq.Expressions.Expression arg2, System.Linq.Expressions.Expression arg3);
```

Creates a `DynamicExpression` that represents a dynamic operation bound by the provided `CallSiteBinder` and four arguments.

Parameters:

- `delegateType`: The type of the delegate used by the `CallSite`.
- `binder`: The runtime binder for the dynamic operation.
- `arg0`: The first argument to the dynamic operation.
- `arg1`: The second argument to the dynamic operation.
- `arg2`: The third argument to the dynamic operation.
- `arg3`: The fourth argument to the dynamic operation.

Returns: A `DynamicExpression` that has `DynamicExpression.NodeType` equal to `ExpressionType.Dynamic`, and has the `DynamicExpression.DelegateType`, `DynamicExpression.Binder`, and `DynamicExpression.Arguments` set to the specified values.

To be added.
