---
title: "MatchType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/MatchType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MatchType enum

Namespace: `System.IO`

```csharp
public enum MatchType
```

Specifies the type of wildcard matching to use.

To be added.

## MatchType.Simple field

```csharp
Simple
```

Matches using '*' and '?' wildcards.

`*` matches from zero to any amount of characters. `?` matches exactly one character. `*.*` matches any name with a period in it (with `MatchType.Win32`, this would match all items).

## MatchType.Win32 field

```csharp
Win32
```

Match using Win32 DOS style matching semantics.

'*', '?', '<', '>', and '"' are all considered wildcards. Matches in a traditional DOS `/` Windows command prompt way. `*.*` matches all files. `?` matches collapse to periods. `file.??t` will match `file.t`, `file.at`, and `file.txt`.
