---
title: "ValidateObjectMembersAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ValidateObjectMembersAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidateObjectMembersAttribute class

Namespace: `Microsoft.Extensions.Options`

```csharp
public sealed class ValidateObjectMembersAttribute : Attribute
```

Marks a field or property to be validated transitively.

To be added.

## ValidateObjectMembersAttribute.ValidateObjectMembersAttribute() constructor

```csharp
public ValidateObjectMembersAttribute ();
```

Initializes a new instance of the `ValidateObjectMembersAttribute` class.

Using this constructor for a field or property tells the code generator to
generate validation for the individual members of the field/property's type.

## ValidateObjectMembersAttribute.ValidateObjectMembersAttribute(Type) constructor

```csharp
public ValidateObjectMembersAttribute (Type validator);
```

Initializes a new instance of the `ValidateObjectMembersAttribute` class.

Parameters:

- `validator`: A type that implements `IValidateOptions<T>` for the field/property's type.

Using this constructor for a field or property tells the code generator to use the given type to validate
the object held by the field or property.

## ValidateObjectMembersAttribute.Validator property

```csharp
public Type? Validator { get; }
```

Gets the type to use to validate a field or property.

Returns: To be added.

To be added.
