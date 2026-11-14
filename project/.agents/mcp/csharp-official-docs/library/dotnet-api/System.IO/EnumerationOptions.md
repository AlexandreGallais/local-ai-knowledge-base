---
title: "EnumerationOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/EnumerationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnumerationOptions class

Namespace: `System.IO`

```csharp
public class EnumerationOptions
```

Provides file and directory enumeration options.

To be added.

## EnumerationOptions.EnumerationOptions() constructor

```csharp
public EnumerationOptions ();
```

Initializes a new instance of the `EnumerationOptions` class with the recommended default options.

To be added.

## EnumerationOptions.AttributesToSkip property

```csharp
public System.IO.FileAttributes AttributesToSkip { get; set; }
```

Gets or sets the attributes to skip.

Returns: The attributes to skip. The default is `FileAttributes.Hidden | FileAttributes.System`.

To be added.

## EnumerationOptions.BufferSize property

```csharp
public int BufferSize { get; set; }
```

Gets or sets the suggested buffer size, in bytes.

Returns: The buffer size. The default is 0 (no suggestion).

#### Remarks

Not all platforms use user allocated buffers, and some require either fixed buffers or a buffer that has enough space to return a full result.
One scenario where this option is useful is with remote share enumeration on Windows. Having a large buffer may result in better performance as more results can be batched over the wire (for example, over a network share).
A "large" buffer, for example, would be 16K. Typical is 4K.

The suggested buffer size will not be used if it has no meaning for the native APIs on the current platform or if it would be too small for getting at least a single result.

## EnumerationOptions.IgnoreInaccessible property

```csharp
public bool IgnoreInaccessible { get; set; }
```

Gets or sets a value that indicates whether to skip files or directories when access is denied (for example, `UnauthorizedAccessException` or `SecurityException`).

Returns: `true` to skip innacessible files or directories; otherwise, `false`. The default is `true`.

To be added.

## EnumerationOptions.MatchCasing property

```csharp
public System.IO.MatchCasing MatchCasing { get; set; }
```

Gets or sets the case-matching behavior.

Returns: One of the enumeration values that indicates the case-matching behavior. The default is `MatchCasing.PlatformDefault`.

#### Remarks

For APIs that allow specifying a match expression, this property allows you to specify the case matching behavior.
The default is to match platform defaults, which are gleaned from the case sensitivity of the temporary folder.

## EnumerationOptions.MatchType property

```csharp
public System.IO.MatchType MatchType { get; set; }
```

Gets or sets the match type.

Returns: One of the enumeration values that indicates the match type. The default is `MatchType.Simple`.

#### Remarks

For APIs that allow specifying a match expression, this property allows you to specify how to interpret the match expression.
The default is simple matching where '*' is always 0 or more characters and '?' is a single character.

## EnumerationOptions.MaxRecursionDepth property

```csharp
public int MaxRecursionDepth { get; set; }
```

Gets or sets a value that indicates the maximum directory depth to recurse while enumerating, when `EnumerationOptions.RecurseSubdirectories` is set to `true`.

Returns: A number that represents the maximum directory depth to recurse while enumerating. The default is <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

If `MaxRecursionDepth` is set to a negative number, the default value `MaxValue` is used.
If `MaxRecursionDepth` is set to zero, enumeration returns the contents of the initial directory.

## EnumerationOptions.RecurseSubdirectories property

```csharp
public bool RecurseSubdirectories { get; set; }
```

Gets or sets a value that indicates whether to recurse into subdirectories while enumerating.

Returns: `true` to recurse into subdirectories; otherwise, `false`. The default is `false`.

To be added.

## EnumerationOptions.ReturnSpecialDirectories property

```csharp
public bool ReturnSpecialDirectories { get; set; }
```

Gets or sets a value that indicates whether to return the special directory entries "." and "..".

Returns: `true` to return the special directory entries "." and ".."; otherwise, `false`.

To be added.
