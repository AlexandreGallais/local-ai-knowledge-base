---
title: "FileSystemName class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Enumeration/FileSystemName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemName class

Namespace: `System.IO.Enumeration`

```csharp
public static class FileSystemName
```

Provides methods for matching file system names.

To be added.

## FileSystemName.MatchesSimpleExpression(Char>, Char>, Boolean) method

```csharp
public static bool MatchesSimpleExpression (ReadOnlySpan<char> expression, ReadOnlySpan<char> name, bool ignoreCase = true);
```

Verifies if the given expression matches the given name. Supports the following wildcards: '*' and '?'. The backslash character '\\' escapes.

Parameters:

- `expression`: The expression to match with.
- `name`: The name to check against the expression.
- `ignoreCase`: `true` to ignore case (default); `false` if the match should be case-sensitive.

Returns: `true` if the given expression matches the given name; otherwise, `false`.

To be added.

## FileSystemName.MatchesWin32Expression(Char>, Char>, Boolean) method

```csharp
public static bool MatchesWin32Expression (ReadOnlySpan<char> expression, ReadOnlySpan<char> name, bool ignoreCase = true);
```

Verifies if the given Win32 expression matches the given name. Supports the following wildcards: '*', '?', '<', '>', '"'. The backslash character '\\' escapes.

Parameters:

- `expression`: The expression to match with, such as "*.foo".
- `name`: The name to check against the expression.
- `ignoreCase`: `true` to ignore case (default), `false` if the match should be case-sensitive.

Returns: `true` if the given expression matches the given name; otherwise, `false`.

#### Remarks

The syntax of the `expression` parameter is based on the syntax used by `FileSystemWatcher`, which is based on RtlIsNameInExpression, which defines the rules for matching DOS wildcards (`'*'`, `'?'`, `'<'`, `'>'`, `'"'`).

Matching will not correspond to Win32 behavior unless you transform the expression using `TranslateWin32Expression`.

## FileSystemName.TranslateWin32Expression(String) method

```csharp
public static string TranslateWin32Expression (string? expression);
```

Translates the given Win32 expression. Change '*' and '?' to '<', '>' and '"' to match Win32 behavior.

Parameters:

- `expression`: The expression to translate.

Returns: A string with the translated Win32 expression.

#### Remarks

For compatibility, Windows changes some wildcards to provide a closer match to historical DOS 8.3 filename matching.
