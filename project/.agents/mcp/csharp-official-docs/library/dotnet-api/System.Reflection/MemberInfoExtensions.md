---
title: "MemberInfoExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MemberInfoExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberInfoExtensions class

Namespace: `System.Reflection`

```csharp
public static class MemberInfoExtensions
```

To be added.

To be added.

## MemberInfoExtensions.GetMetadataToken(MemberInfo) method

```csharp
public static int GetMetadataToken (this System.Reflection.MemberInfo member);
```

Gets a metadata token for the given member, if available.

Parameters:

- `member`: The member from which to retrieve the token, as reftype.

Returns: An integer representing the metadata token. The returned token is never nil. If unavailable, an exception is thrown.

Exceptions:

- `InvalidOperationException`: There is no metadata token available.

#### Remarks

This method throws an exception if a metadata token is not available for the specified member. You can call `MemberInfoExtensions.HasMetadataToken` to determine whether a metadata token is available before calling this method.

## MemberInfoExtensions.HasMetadataToken(MemberInfo) method

```csharp
public static bool HasMetadataToken (this System.Reflection.MemberInfo member);
```

Returns a value that indicates whether a metadata token is available for the specified member.

Parameters:

- `member`: The member to analyze, as reftype.

Returns: `true` if there is a metadata token <example-value> for the given member; otherwise, `false`.

#### Remarks

`MemberInfoExtensions.GetMetadataToken` throws an exception if a metadata token is not available for the specified member. So use this method to determine whether a metadata token is available before calling `MemberInfoExtensions.GetMetadataToken`.
