---
title: "ZipArchiveEntry class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipArchiveEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipArchiveEntry class (part 2 of 2)

## ZipArchiveEntry.OpenAsync(Char>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenAsync (ReadOnlySpan<char> password, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `password`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.OpenAsync(FileAccess, Char>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenAsync (System.IO.FileAccess access, ReadOnlySpan<char> password, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `access`: To be added.
- `password`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.ToString() method

```csharp
public override string ToString ();
```

Retrieves the relative path of the entry in the zip archive.

Returns: The relative path of the entry, which is the value stored in the `ZipArchiveEntry.FullName` property.

To be added.
