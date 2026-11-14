---
title: "MemberMemberBinding class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MemberMemberBinding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberMemberBinding class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class MemberMemberBinding : System.Linq.Expressions.MemberBinding
```

Represents initializing members of a member of a newly created object.

#### Remarks
Use the `Expression.MemberBind` factory methods to create a `MemberMemberBinding`.

The value of the `BindingType` property of a `MemberMemberBinding` object is `MemberBinding`.

## MemberMemberBinding.Bindings property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.MemberBinding> Bindings { get; }
```

Gets the bindings that describe how to initialize the members of a member.

Returns: A `ReadOnlyCollection<T>` of `MemberBinding` objects that describe how to initialize the members of the member.

To be added.

## MemberMemberBinding.Update(MemberBinding>) method

```csharp
public System.Linq.Expressions.MemberMemberBinding Update (System.Collections.Generic.IEnumerable<System.Linq.Expressions.MemberBinding> bindings);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `bindings`: The `MemberMemberBinding.Bindings` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
