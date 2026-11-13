---
title: "File path formats on Windows systems (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/file-path-formats.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# File path formats on Windows systems (part 2 of 2)

## Case and the Windows file system

A peculiarity of the Windows file system that non-Windows users and developers find confusing is that path and directory names are case-insensitive. That is, directory and file names reflect the casing of the strings used when they are created. For example, the method call

```csharp
Directory.Create("TeStDiReCtOrY");
```

```vb
Directory.Create("TeStDiReCtOrY")
```

creates a directory named TeStDiReCtOrY. If you rename a directory or file to change its case, the directory or file name reflects the case of the string used when you rename it. For example, the following code renames a file named test.txt to Test.txt:

_Code sample not included: ~/samples/snippets/standard/io/file-names/cs/rename.cs._

However, directory and file name comparisons are case-insensitive. If you search for a file named "test.txt", .NET file system APIs ignore case in the comparison. "Test.txt", "TEST.TXT", "test.TXT", and any other combination of uppercase and lowercase letters will match "test.txt".
