---
title: "FileSystemEnumerable<TResult>+FindPredicate delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Enumeration/FileSystemEnumerable`1+FindPredicate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemEnumerable<TResult>+FindPredicate delegate

Namespace: `System.IO.Enumeration`

```csharp
public delegate bool FileSystemEnumerable<TResult>.FindPredicate(ref FileSystemEntry entry);
```

Encapsulates a method for filtering out find results.

Parameters:

- `entry`: A reference to the file system entry that will be evaluated with the predicate condition.

Returns: `true` if the predicate condition is met; otherwise, `false`.

To be added.
