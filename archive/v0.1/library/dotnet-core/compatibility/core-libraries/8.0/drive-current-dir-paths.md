---
title: "Breaking change: Drive's current directory path enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/drive-current-dir-paths.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Drive's current directory path enumeration

File system entries obtained using a path argument in the shape of a "drive's current directory", for example, `C:`, were incorrectly formed by combining `directory path + separator + entry name`. To return the correct path for the entries, the separator is no longer added with such paths.

## Previous behavior

Previously, a separator character was added such that the enumerated file system entries appeared to be in the drive's root.

```csharp
string pathToEnumerate = "C:";

Console.WriteLine($"Full path of \"{pathToEnumerate}\" is {Path.GetFullPath(pathToEnumerate)}.");
Path.GetFullPath(pathToEnumerate);

Console.WriteLine($"Enumerating files and folders in \"{pathToEnumerate}\".");
foreach (string entry in Directory.GetFileSystemEntries(pathToEnumerate))
{
    Console.WriteLine(entry);
}
```

The output from running this code snippet was as follows.

```output
Full path of "C:" is C:\Users\myalias\consoleapps\Program

Enumerating files and folders in "C:".
C:\Program.csproj
C:\Program.sln
C:\bin
C:\obj
C:\Program.cs
```

## New behavior

Running the same code snippet in .NET 8 and later versions produces output without a separator character in each path.

```output
Full path of "C:" is C:\Users\myalias\consoleapps\Program.

Enumerating files and folders in "C:".
C:Program.csproj
C:Program.sln
C:bin
C:obj
C:Program.cs
```

## Version introduced

.NET 8

## Type of breaking change

This change is a behavioral change.

## Reason for change

Users reported that the previous behavior was incorrect. It was also a regression from .NET Framework.

## Recommended action

If you're a Windows user who relies on enumeration of paths like `C:`, you should re-evaluate your application's I/O operations. This is an unusual scenario that's unlikely to be used in production. Most users who want to enumerate the current directory use `System.Environment.CurrentDirectory` instead.

## Affected APIs

- `System.IO.Directory.EnumerateFiles*`
- `System.IO.Directory.EnumerateDirectories*`
- `System.IO.Directory.EnumerateFileSystemEntries*`
- `System.IO.Directory.GetFiles*`
- `System.IO.Directory.GetDirectories*`
- `System.IO.Directory.GetFileSystemEntries*`
- `System.IO.DirectoryInfo.EnumerateFiles*`
- `System.IO.DirectoryInfo.EnumerateDirectories*`
- `System.IO.DirectoryInfo.EnumerateFileSystemInfos*`
- `System.IO.DirectoryInfo.GetFiles*`
- `System.IO.DirectoryInfo.GetDirectories*`
- `System.IO.DirectoryInfo.GetFileSystemInfos*`
- `System.IO.Enumeration.FileSystemEnumerable`1.#ctor(System.String,System.IO.Enumeration.FileSystemEnumerable{`0}.FindTransform,System.IO.EnumerationOptions)`
