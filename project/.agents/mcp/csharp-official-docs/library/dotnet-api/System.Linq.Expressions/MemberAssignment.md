---
title: "MemberAssignment class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MemberAssignment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberAssignment class

Namespace: `System.Linq.Expressions`

```csharp
public sealed class MemberAssignment : System.Linq.Expressions.MemberBinding
```

Represents assignment operation for a field or property of an object.

#### Remarks
Use the `Expression.Bind` factory methods to create a `MemberAssignment`.

A `MemberAssignment` has the `BindingType` property equal to `Assignment`.

## MemberAssignment.Expression property

```csharp
public System.Linq.Expressions.Expression Expression { get; }
```

Gets the expression to assign to the field or property.

Returns: The `Expression` that represents the value to assign to the field or property.

To be added.

## MemberAssignment.Update(Expression) method

```csharp
public System.Linq.Expressions.MemberAssignment Update (System.Linq.Expressions.Expression expression);
```

Creates a new expression that is like this one, but using the supplied children. If all of the children are the same, it will return this expression.

Parameters:

- `expression`: The `MemberAssignment.Expression` property of the result.

Returns: This expression if no children are changed or an expression with the updated children.

To be added.
