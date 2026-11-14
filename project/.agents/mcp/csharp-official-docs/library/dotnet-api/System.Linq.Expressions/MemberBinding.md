---
title: "MemberBinding class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq.Expressions/MemberBinding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberBinding class

Namespace: `System.Linq.Expressions`

```csharp
public abstract class MemberBinding
```

Provides the base class from which the classes that represent bindings that are used to initialize members of a newly created object derive.

To be added.

## MemberBinding.MemberBinding(MemberBindingType, MemberInfo) constructor

```csharp
protected MemberBinding (System.Linq.Expressions.MemberBindingType type, System.Reflection.MemberInfo member);
```

Initializes a new instance of the `MemberBinding` class.

Parameters:

- `type`: The `MemberBindingType` that discriminates the type of binding that is represented.
- `member`: The `MemberInfo` that represents a field or property to be initialized.

To be added.

## MemberBinding.BindingType property

```csharp
public System.Linq.Expressions.MemberBindingType BindingType { get; }
```

Gets the type of binding that is represented.

Returns: One of the `MemberBindingType` values.

To be added.

## MemberBinding.Member property

```csharp
public System.Reflection.MemberInfo Member { get; }
```

Gets the field or property to be initialized.

Returns: The `MemberInfo` that represents the field or property to be initialized.

To be added.

## MemberBinding.ToString() method

```csharp
public override string ToString ();
```

Returns a textual representation of the `MemberBinding`.

Returns: A textual representation of the `MemberBinding`.

To be added.
