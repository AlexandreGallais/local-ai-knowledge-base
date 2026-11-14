---
title: "DynamicExpression class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/DynamicExpression.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DynamicExpression class (part 2 of 2)

## DynamicExpression.System.Linq.Expressions.IArgumentProvider.GetArgument(Int32) method

```csharp
System.Linq.Expressions.Expression IArgumentProvider.GetArgument (int index);
```

Returns the argument at index, throwing if index is out of bounds. You should not use this member. It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Parameters:

- `index`: The index of the argument.

Returns: Returns `Expression`.

To be added.

## DynamicExpression.System.Linq.Expressions.IDynamicExpression.CreateCallSite() method

```csharp
object IDynamicExpression.CreateCallSite ();
```

Optionally creates the CallSite and returns the CallSite for the DynamicExpression's polymorphic inline cache. You should not use this member. It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Returns: Returns `Object`.

To be added.

## DynamicExpression.System.Linq.Expressions.IDynamicExpression.Rewrite(Expression[]) method

```csharp
System.Linq.Expressions.Expression IDynamicExpression.Rewrite (System.Linq.Expressions.Expression[] args);
```

Rewrite this node replacing the dynamic expression's arguments with the provided values. The number of `args` needs to match the number of the current expression. You should not use this type. It is only public due to assembly refactoring, and it is used internally for performance optimizations. This helper method allows re-writing of nodes to be independent of the specific implementation class deriving from DynamicExpression that is being used at the call site.

Parameters:

- `args`: The arguments.

Returns: Returns `Expression`, the rewritten expression.

To be added.

## DynamicExpression.Update(Expression>) method

```csharp
public System.Linq.Expressions.DynamicExpression Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression>? arguments);
```

Compares the value sent to the parameter, `arguments`, to the `Arguments` property of the current instance of `DynamicExpression`. If the values of the parameter and the property are equal, the current instance is returned. If they are not equal, a new `DynamicExpression` instance is returned that is identical to the current instance except that the `Arguments` property is set to the value of parameter `arguments`.

Parameters:

- `arguments`: The `DynamicExpression.Arguments` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
