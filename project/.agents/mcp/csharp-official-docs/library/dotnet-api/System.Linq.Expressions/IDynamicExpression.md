---
title: "IDynamicExpression interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/IDynamicExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDynamicExpression interface

Namespace: `System.Linq.Expressions`

```csharp
public interface IDynamicExpression : System.Linq.Expressions.IArgumentProvider
```

Provides an internal interface for accessing the arguments of DynamicExpression tree nodes as well as CallSite and Rewriting functionality.  You should not use this API.  It is only public due to DLL refactoring and exists only for internal performance optimizations.

To be added.

## IDynamicExpression.DelegateType property

```csharp
public Type DelegateType { get; }
```

Gets the delegate type used by the CallSite, which is the type of the rules used in the dynamic expression's polymorphic inline cache.

Returns: The delegate type used by the CallSite.

To be added.

## IDynamicExpression.CreateCallSite() method

```csharp
public object CreateCallSite ();
```

Optionally creates the CallSite and returns the CallSite for the DynamicExpression's polymorphic inline cache.  You should not use this type.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Returns: The CallSite for the DynamicExpression's polymorphic inline cache.

To be added.

## IDynamicExpression.Rewrite(Expression[]) method

```csharp
public System.Linq.Expressions.Expression Rewrite (System.Linq.Expressions.Expression[] args);
```

Rewrites this node replacing the dynamic expression's arguments with the provided values.  The number of `args` needs to match the number of the current expression.  You should not use this type.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.  This helper method allows re-writing of nodes to be independent of the specific implementation class deriving from DynamicExpression that is being used at the call site.

Parameters:

- `args`: The arguments used to replace this node.

Returns: The rewritten node, but if no changes were made, then returns the same node.

To be added.
