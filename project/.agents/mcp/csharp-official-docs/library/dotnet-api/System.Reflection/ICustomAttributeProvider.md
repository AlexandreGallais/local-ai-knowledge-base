---
title: "ICustomAttributeProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ICustomAttributeProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICustomAttributeProvider interface

Namespace: `System.Reflection`

```csharp
public interface ICustomAttributeProvider
```

Provides custom attributes for reflection objects that support them.

#### Remarks
Nearly all the Reflection classes can have attributes associated with them. Attributes can be standard (public, private, HelpString) or custom.

## ICustomAttributeProvider.GetCustomAttributes(Boolean) method

```csharp
public object[] GetCustomAttributes (bool inherit);
```

Returns an array of all of the custom attributes defined on this member, excluding named attributes, or an empty array if there are no custom attributes.

Parameters:

- `inherit`: When `true`, look up the hierarchy chain for the inherited custom attribute.

Returns: An array of Objects representing custom attributes, or an empty array.

Exceptions:

- `TypeLoadException`: The custom attribute type cannot be loaded.

#### Remarks
Calling `ICustomAttributeProvider.GetCustomAttributes` on `PropertyInfo` or `EventInfo` when the `inherit` parameter of `GetCustomAttributes` is `true` does not walk the type hierarchy. Use `Attribute` to inherit custom attributes.

This method returns custom attributes defined directly on a non-inherited member only.

## ICustomAttributeProvider.GetCustomAttributes(Type, Boolean) method

```csharp
public object[] GetCustomAttributes (Type attributeType, bool inherit);
```

Returns an array of custom attributes defined on this member, identified by type, or an empty array if there are no custom attributes of that type.

Parameters:

- `attributeType`: The type of the custom attributes.
- `inherit`: When `true`, look up the hierarchy chain for the inherited custom attribute.

Returns: An array of Objects representing custom attributes, or an empty array.

Exceptions:

- `TypeLoadException`: The custom attribute type cannot be loaded.
- `ArgumentNullException`: `attributeType` is `null`.

#### Remarks
If `attributeType` is a base class or interface, this method returns any implementation of that type.

This method returns custom attributes defined directly on a non-inherited member only.

Calling `ICustomAttributeProvider.GetCustomAttributes` on `PropertyInfo` or `EventInfo` when the `inherit` parameter of `GetCustomAttributes` is `true` does not walk the type hierarchy. Use `Attribute` to inherit custom attributes.

## ICustomAttributeProvider.IsDefined(Type, Boolean) method

```csharp
public bool IsDefined (Type attributeType, bool inherit);
```

Indicates whether one or more instance of `attributeType` is defined on this member.

Parameters:

- `attributeType`: The type of the custom attributes.
- `inherit`: When `true`, look up the hierarchy chain for the inherited custom attribute.

Returns: `true` if the `attributeType` is defined on this member; `false` otherwise.

To be added.
