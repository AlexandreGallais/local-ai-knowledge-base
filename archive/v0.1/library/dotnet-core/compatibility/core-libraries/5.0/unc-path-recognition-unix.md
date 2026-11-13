---
title: "Breaking change: Uri recognition of UNC paths on Unix"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/unc-path-recognition-unix.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Uri recognition of UNC paths on Unix

The `System.Uri` class now recognizes strings that start with two forward slashes (`//`) as universal naming convention (UNC) paths on Unix operating systems. This change makes the behavior for such strings consistent across all platforms.

## Change description

In previous versions of .NET, the `System.Uri` class recognizes strings that start with two forward slashes, for example, `//contoso`, as absolute file paths on Unix operating systems. However, on Windows, such strings are recognized as UNC paths.

Starting in .NET 5,  the `System.Uri` class recognizes strings that start with two forward slashes as UNC paths on all platforms, including Unix. In addition, properties behave according to UNC semantics:

- `System.Uri.IsUnc` returns `true`.
- Backslashes in the path are replaced with forward slashes. For example, `//first\second` becomes `//first/second`.
- `System.Uri.LocalPath` doesn't percent-encode characters. For example, `//first/\uFFF0` is *not* converted to `//first/%EF%BF%B0`.

## Version introduced

5.0

## Recommended action

No action is required on the part of the developer.

## Affected APIs

- `System.Uri`
