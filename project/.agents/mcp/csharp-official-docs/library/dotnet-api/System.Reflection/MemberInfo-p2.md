---
title: "MemberInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MemberInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberInfo class (part 2 of 2)

## MemberInfo.IsDefined(Type, Boolean) method

```csharp
public abstract bool IsDefined (Type attributeType, bool inherit);
```

When overridden in a derived class, indicates whether one or more attributes of the specified type or of its derived types is applied to this member.

Parameters:

- `attributeType`: The type of custom attribute to search for. The search includes derived types.
- `inherit`: `true` to search this member's inheritance chain to find the attributes; otherwise, `false`. This parameter is ignored for properties and events.

Returns: `true` if one or more instances of `attributeType` or any of its derived types is applied to this member; otherwise, `false`.

#### Remarks
This method ignores the `inherit` parameter for properties and events. To search the inheritance chain for attributes on properties and events, use the appropriate overloads of the `Attribute.IsDefined` method.

#### Examples
The following example determines whether the specified attribute is applied to the specified member.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberInfo/IsDefined/memberinfo_getcustomattribute_isdefined.cs._

## MemberInfo.op_Equality(MemberInfo, MemberInfo) method

```csharp
public static bool operator == (System.Reflection.MemberInfo? left, System.Reflection.MemberInfo? right);
```

Indicates whether two `MemberInfo` objects are equal.

Parameters:

- `left`: The `MemberInfo` to compare to `right`.
- `right`: The `MemberInfo` to compare to `left`.

Returns: `true` if `left` is equal to `right`; otherwise `false`.

To be added.

## MemberInfo.op_Inequality(MemberInfo, MemberInfo) method

```csharp
public static bool operator != (System.Reflection.MemberInfo? left, System.Reflection.MemberInfo? right);
```

Indicates whether two `MemberInfo` objects are not equal.

Parameters:

- `left`: The `MemberInfo` to compare to `right`.
- `right`: The `MemberInfo` to compare to `left`.

Returns: `true` if `left` is not equal to `right`; otherwise `false`.

To be added.
