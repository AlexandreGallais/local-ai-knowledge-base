---
title: "MemberNotNullAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/MemberNotNullAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberNotNullAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class MemberNotNullAttribute : Attribute
```

Specifies that the method or property will ensure that the listed field and property members have values that aren't `null`.

For more information, see Nullable static analysis in the C# guide.

## MemberNotNullAttribute.MemberNotNullAttribute(String) constructor

```csharp
public MemberNotNullAttribute (string member);
```

Initializes the attribute with a field or property member.

Parameters:

- `member`: The field or property member that is promised to be non-null.

To be added.

## MemberNotNullAttribute.MemberNotNullAttribute(String[]) constructor

```csharp
public MemberNotNullAttribute (params string[] members);
```

Initializes the attribute with the list of field and property members.

Parameters:

- `members`: The list of field and property members that are promised to be non-null.

To be added.

## MemberNotNullAttribute.Members property

```csharp
public string[] Members { get; }
```

Gets field or property member names.

Returns: To be added.

To be added.
