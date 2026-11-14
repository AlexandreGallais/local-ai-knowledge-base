---
title: "MemberListBinding class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MemberListBinding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberListBinding class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class MemberListBinding : System.Linq.Expressions.MemberBinding
```

Represents initializing the elements of a collection member of a newly created object.

#### Remarks
Use the `Expression.ListBind` factory methods to create a `MemberListBinding`.

A `MemberListBinding` has the `BindingType` property equal to `ListBinding`.

## MemberListBinding.Initializers property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.ElementInit> Initializers { get; }
```

Gets the element initializers for initializing a collection member of a newly created object.

Returns: A `ReadOnlyCollection<T>` of `ElementInit` objects to initialize a collection member with.

To be added.

## MemberListBinding.Update(ElementInit>) method

```csharp
public System.Linq.Expressions.MemberListBinding Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.ElementInit> initializers);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `initializers`: The `MemberListBinding.Initializers` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
