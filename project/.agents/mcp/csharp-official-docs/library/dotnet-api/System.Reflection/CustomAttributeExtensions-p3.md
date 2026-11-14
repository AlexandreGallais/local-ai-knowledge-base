---
title: "CustomAttributeExtensions class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeExtensions class (part 3 of 3)

## CustomAttributeExtensions.IsDefined(ParameterInfo, Type) method

```csharp
public static bool IsDefined (this System.Reflection.ParameterInfo element, Type attributeType);
```

Indicates whether custom attributes of a specified type are applied to a specified parameter.

Parameters:

- `element`: The parameter to inspect.
- `attributeType`: The type of attribute to search for.

Returns: `true` if an attribute of the specified type is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

To be added.

## CustomAttributeExtensions.IsDefined(MemberInfo, Type, Boolean) method

```csharp
public static bool IsDefined (this System.Reflection.MemberInfo element, Type attributeType, bool inherit);
```

Indicates whether custom attributes of a specified type are applied to a specified member, and, optionally, applied to its ancestors.

Parameters:

- `element`: The member to inspect.
- `attributeType`: The type of the attribute to search for.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: `true` if an attribute of the specified type is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.

To be added.

## CustomAttributeExtensions.IsDefined(ParameterInfo, Type, Boolean) method

```csharp
public static bool IsDefined (this System.Reflection.ParameterInfo element, Type attributeType, bool inherit);
```

Indicates whether custom attributes of a specified type are applied to a specified parameter, and, optionally, applied to its ancestors.

Parameters:

- `element`: The parameter to inspect.
- `attributeType`: The type of attribute to search for.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: `true` if an attribute of the specified type is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

To be added.
