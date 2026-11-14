---
title: "ElementInit class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/ElementInit.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ElementInit class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class ElementInit : System.Linq.Expressions.IArgumentProvider
```

Represents an initializer for a single element of an `IEnumerable` collection.

#### Examples
The following example creates an `ElementInit` that represents the initialization of an element of a dictionary collection.

_Code sample not included: ~/snippets/csharp/System.Linq.Expressions/BinaryExpression/Overview/Expression.cs._

## ElementInit.AddMethod property

```csharp
public System.Reflection.MethodInfo AddMethod { get; }
```

Gets the instance method that is used to add an element to an `IEnumerable` collection.

Returns: A `MethodInfo` that represents an instance method that adds an element to a collection.

To be added.

## ElementInit.Arguments property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.Expression> Arguments { get; }
```

Gets the collection of arguments that are passed to a method that adds an element to an `IEnumerable` collection.

Returns: A `ReadOnlyCollection<T>` of `Expression` objects that represent the arguments for a method that adds an element to a collection.

To be added.

## ElementInit.System.Linq.Expressions.IArgumentProvider.ArgumentCount property

```csharp
int System.Linq.Expressions.IArgumentProvider.ArgumentCount { get; }
```

Returns the number of arguments to the expression tree node.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Returns: Returns `Int32`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ElementInit` instance is cast to an `IArgumentProvider` interface.

## ElementInit.System.Linq.Expressions.IArgumentProvider.GetArgument(Int32) method

```csharp
System.Linq.Expressions.Expression IArgumentProvider.GetArgument (int index);
```

Returns the argument at index, throwing if index is out of bounds.  You should not use this member.  It is only public due to assembly refactoring, and it is used internally for performance optimizations.

Parameters:

- `index`: The index of the argument.

Returns: Returns `Expression`.

To be added.

## ElementInit.ToString() method

```csharp
public override string ToString ();
```

Returns a textual representation of an `ElementInit` object.

Returns: A textual representation of the `ElementInit` object.

To be added.

## ElementInit.Update(Expression>) method

```csharp
public System.Linq.Expressions.ElementInit Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.Expression> arguments);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `arguments`: The `ElementInit.Arguments` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
