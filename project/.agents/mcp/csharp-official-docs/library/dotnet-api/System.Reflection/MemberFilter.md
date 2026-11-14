---
title: "MemberFilter delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MemberFilter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberFilter delegate

Namespace: `System.Reflection`

```csharp
public delegate bool MemberFilter(MemberInfo m, object? filterCriteria);
```

Represents a delegate that is used to filter a list of members represented in an array of `MemberInfo` objects.

Parameters:

- `m`: The `MemberInfo` object to which the filter is applied.
- `filterCriteria`: An arbitrary object used to filter the list.

Returns: `true` to include the member in the filtered list; otherwise `false`.

#### Remarks
Every derived class of a `Delegate` and `MulticastDelegate` has a constructor and an `Invoke` method. (See the code example in `Delegate`.)

The `Type.FindMembers` method uses this delegate to filter the list of members that it returns.
