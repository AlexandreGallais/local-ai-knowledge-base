---
title: "Breaking change: URI paths with non-ASCII characters parse correctly on Unix"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/non-ascii-chars-in-uri-parsed-correctly.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# URI paths with non-ASCII characters parse correctly on Unix

A bug was fixed in the `System.Uri` class such that absolute URI paths that contain non-ASCII characters now parse correctly on Unix platforms.

## Change description

In previous versions of .NET, absolute URI paths that contain non-ASCII characters are parsed incorrectly on Unix platforms, and segments of the path are duplicated. (Absolute paths are those that start with "/".) The parsing issue has been fixed for .NET 5. If you move from a previous version of .NET to .NET 5 or later, you'll get different values produced by `System.Uri.AbsoluteUri`, `System.Uri.ToString`, and other `System.Uri` members.

Consider the output of the following code when run on Unix.

```csharp
var myUri = new Uri("/üri");

Console.WriteLine($"AbsoluteUri: {myUri.AbsoluteUri}");
Console.WriteLine($"ToString: {myUri.ToString()}");
```

Output on previous .NET version:

```text
AbsoluteUri: /%C3%BCri/%C3%BCri
ToString: /üri/üri
```

Output on .NET 5 or later version:

```text
AbsoluteUri: /%C3%BCri
ToString: /üri
```

## Version introduced

5.0

## Recommended action

If you have code that expects and accounts for the duplicated path segments, you can remove that code.

## Affected APIs

- `System.Uri`
