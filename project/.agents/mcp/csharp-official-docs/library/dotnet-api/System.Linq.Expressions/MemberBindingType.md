---
title: "MemberBindingType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MemberBindingType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberBindingType enum

Namespace: `System.Linq.Expressions`

```csharp
public enum MemberBindingType
```

Describes the binding types that are used in `MemberInitExpression` objects.

To be added.

## MemberBindingType.Assignment field

```csharp
Assignment
```

A binding that represents initializing a member with the value of an expression.

## MemberBindingType.ListBinding field

```csharp
ListBinding
```

A binding that represents initializing a member of type `IList` or `ICollection<T>` from a list of elements.

## MemberBindingType.MemberBinding field

```csharp
MemberBinding
```

A binding that represents recursively initializing members of a member.
