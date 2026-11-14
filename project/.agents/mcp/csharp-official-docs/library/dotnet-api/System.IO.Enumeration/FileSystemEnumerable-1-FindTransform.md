---
title: "FileSystemEnumerable<TResult>+FindTransform delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Enumeration/FileSystemEnumerable`1+FindTransform.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemEnumerable<TResult>+FindTransform delegate

Namespace: `System.IO.Enumeration`

```csharp
public delegate TResult FileSystemEnumerable<TResult>.FindTransform(ref FileSystemEntry entry);
```

Encapsulates a method for transforming raw find data into a result.

Parameters:

- `entry`: A reference to the file system entry that will be evaluated with the predicate condition.

Returns: An instance of the type that this delegate encapsulates.

To be added.
