---
title: "SyntaxCheck class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/SyntaxCheck.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SyntaxCheck class

Namespace: `System.ComponentModel`

```csharp
public static class SyntaxCheck
```

Provides methods to verify the machine name and path conform to a specific syntax. This class cannot be inherited.

To be added.

## SyntaxCheck.CheckMachineName(String) method

```csharp
public static bool CheckMachineName (string value);
```

Checks the syntax of the machine name to confirm that it does not contain "\\".

Parameters:

- `value`: A string containing the machine name to check.

Returns: `true` if `value` matches the proper machine name format; otherwise, `false`.

To be added.

## SyntaxCheck.CheckPath(String) method

```csharp
public static bool CheckPath (string value);
```

Checks the syntax of the path to see whether it starts with "\\\\".

Parameters:

- `value`: A string containing the path to check.

Returns: `true` if `value` matches the proper path format; otherwise, `false`.

To be added.

## SyntaxCheck.CheckRootedPath(String) method

```csharp
public static bool CheckRootedPath (string value);
```

Checks the syntax of the path to see if it starts with "\\" or drive letter "C:".

Parameters:

- `value`: A string containing the path to check.

Returns: `true` if `value` matches the proper path format; otherwise, `false`.

To be added.
