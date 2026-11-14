---
title: "NotFoundFileInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/NotFoundFileInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotFoundFileInfo class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public class NotFoundFileInfo : Microsoft.Extensions.FileProviders.IFileInfo
```

Represents a nonexistent file.

To be added.

## NotFoundFileInfo.NotFoundFileInfo(String) constructor

```csharp
public NotFoundFileInfo (string name);
```

Initializes a new instance of the `NotFoundFileInfo` class.

Parameters:

- `name`: The name of the file that could not be found.

To be added.

## NotFoundFileInfo.Exists property

```csharp
public bool Exists { get; }
```

Gets a value that's always `false`.

Returns: To be added.

To be added.

## NotFoundFileInfo.IsDirectory property

```csharp
public bool IsDirectory { get; }
```

Gets a value that's always `false`.

Returns: To be added.

To be added.

## NotFoundFileInfo.LastModified property

```csharp
public DateTimeOffset LastModified { get; }
```

Gets `DateTimeOffset.MinValue`.

Returns: To be added.

To be added.

## NotFoundFileInfo.Length property

```csharp
public long Length { get; }
```

Gets a value that's always -1.

Returns: To be added.

To be added.

## NotFoundFileInfo.Name property

```csharp
public string Name { get; }
```

The name of the file or directory, not including any path.

Returns: To be added.

To be added.

## NotFoundFileInfo.PhysicalPath property

```csharp
public string? PhysicalPath { get; }
```

Gets a value that's always `null`.

Returns: To be added.

To be added.

## NotFoundFileInfo.CreateReadStream() method

```csharp
public System.IO.Stream CreateReadStream ();
```

Always throws. A stream cannot be created for a nonexistent file.

Returns: Does not return.

Exceptions:

- `FileNotFoundException`: In all cases.

To be added.
