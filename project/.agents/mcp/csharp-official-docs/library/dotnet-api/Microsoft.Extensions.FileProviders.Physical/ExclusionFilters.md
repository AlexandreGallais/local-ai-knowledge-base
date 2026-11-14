---
title: "ExclusionFilters enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders.Physical/ExclusionFilters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExclusionFilters enum

Namespace: `Microsoft.Extensions.FileProviders.Physical`

```csharp
public enum ExclusionFilters
```

Specifies filtering behavior for files or directories.

To be added.

## ExclusionFilters.DotPrefixed field

```csharp
DotPrefixed
```

Exclude files and directories when the name begins with period.

## ExclusionFilters.Hidden field

```csharp
Hidden
```

Exclude files and directories when `FileAttributes.Hidden` is set on `FileSystemInfo.Attributes`.

## ExclusionFilters.None field

```csharp
None
```

Do not exclude any files.

## ExclusionFilters.Sensitive field

```csharp
Sensitive
```

Equivalent to `DotPrefixed | Hidden | System`. Exclude files and directories when the name begins with a period, or has either `FileAttributes.Hidden` or `FileAttributes.System` is set on `FileSystemInfo.Attributes`.

## ExclusionFilters.System field

```csharp
System
```

Exclude files and directories when `FileAttributes.System` is set on `FileSystemInfo.Attributes`.
