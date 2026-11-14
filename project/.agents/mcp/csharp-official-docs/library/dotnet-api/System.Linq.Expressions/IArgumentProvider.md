---
title: "IArgumentProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/IArgumentProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IArgumentProvider interface

Namespace: `System.Linq.Expressions`

```csharp
public interface IArgumentProvider
```

Provides an internal interface for accessing the arguments of multiple tree nodes (DynamicExpression, ElementInit, MethodCallExpression, InvocationExpression, NewExpression, and IndexExpression).  This API is for internal use only.

#### Remarks

You should not use this API.  It is public only due to assembly refactoring, and it exists only for internal performance optimizations. It enables two optimizations that reduce the size of the trees:

1. It enables the nodes to hold onto an `IList<T>` instead of a `ReadOnlyCollection<T>`.  This saves the cost of allocating the read-only collection for each node.

2. It enables specialized subclasses to be created that hold on to a specific number of arguments (for example, `Block2`, `Block2`, `Block4`).  Therefore, these nodes avoid allocating both a `ReadOnlyCollection<T>` and an array for storing their elements, thus saving 32 bytes per node.  This technique is used by various nodes, including `BlockExpression`, `InvocationExpression`, and `MethodCallExpression`.

The expression tree nodes continue to expose the original LINQ properties of `ReadOnlyCollection<T>` objects. They do this by reusing a field for storing both the array or an element that would normally be stored in the array.

For the array case, the collection is typed to `IList<T>` instead of `ReadOnlyCollection<T>`. When the node is initially constructed, it is an array.  The compiler or utilities in this library access the elements through this interface. Accessing array elements promotes the array to a `ReadOnlyCollection<T>`.

For the object case, the first argument is stored in a field typed to `Object`. When the node is initially constructed, this field holds the `Expression` of the first argument.  When the compiler and utilities in this library access the arguments, they again use this interface, and the accessor for the first argument uses the internal `Expression.ReturnObject<T>(System.Object)` helper method to return the object that handles the `Expression` or `ReadOnlyCollection<T>` case. When the user accesses the `ReadOnlyCollection<T>`, the object field is updated to hold directly onto the `ReadOnlyCollection<T>`.

It is important that `Expression` properties consistently return the same `ReadOnlyCollection<T>`. Otherwise, the rewriter tree walker used by expression visitors will break. It is a breaking change from LINQ v1 to return different `ReadOnlyCollection<T>` from the same `Expression` node. Currently, users can rely on object identity to tell if the node has changed.  Storing the `ReadOnlyCollection<T>` in an overloaded field both reduces memory usage and maintains compatibility for the public API.

## IArgumentProvider.ArgumentCount property

```csharp
public int ArgumentCount { get; }
```

Returns the number of arguments to the expression tree node. This API is for internal use only.

Returns: The number of arguments to the expression tree node as `Int32`.

You should not use this API. It is public only due to assembly refactoring, and it is used internally for performance optimizations.

## IArgumentProvider.GetArgument(Int32) method

```csharp
public System.Linq.Expressions.Expression GetArgument (int index);
```

Returns the argument at `index`, throwing if `index` is out of bounds. This API is for internal use only.

Parameters:

- `index`: The index of the argument.

Returns: The argument at index.

You should not use this API.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.
