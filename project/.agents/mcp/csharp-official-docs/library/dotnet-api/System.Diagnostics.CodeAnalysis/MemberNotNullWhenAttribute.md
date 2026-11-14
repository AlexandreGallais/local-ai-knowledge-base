---
title: "MemberNotNullWhenAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/MemberNotNullWhenAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberNotNullWhenAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class MemberNotNullWhenAttribute : Attribute
```

Specifies that the method or property will ensure that the listed field and property members have non-null values when returning with the specified return value condition.

For more information, see Nullable static analysis in the C# guide.

## MemberNotNullWhenAttribute.MemberNotNullWhenAttribute(Boolean, String) constructor

```csharp
public MemberNotNullWhenAttribute (bool returnValue, string member);
```

Initializes the attribute with the specified return value condition and a field or property member.

Parameters:

- `returnValue`: The return value condition. If the method returns this value, the associated parameter will not be `null`.
- `member`: The field or property member that is promised to be non-null.

To be added.

## MemberNotNullWhenAttribute.MemberNotNullWhenAttribute(Boolean, String[]) constructor

```csharp
public MemberNotNullWhenAttribute (bool returnValue, params string[] members);
```

Initializes the attribute with the specified return value condition and list of field and property members.

Parameters:

- `returnValue`: The return value condition. If the method returns this value, the associated parameter will not be `null`.
- `members`: The list of field and property members that are promised to be non-null.

To be added.

## MemberNotNullWhenAttribute.Members property

```csharp
public string[] Members { get; }
```

Gets field or property member names.

Returns: To be added.

To be added.

## MemberNotNullWhenAttribute.ReturnValue property

```csharp
public bool ReturnValue { get; }
```

Gets the return value condition.

Returns: To be added.

To be added.
