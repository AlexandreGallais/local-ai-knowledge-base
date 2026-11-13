---
title: "Breaking change: User info in `mailto:` URIs is compared"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/networking/8.0/uri-comparison.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# User info in `mailto:` URIs is compared

Previously, `System.Uri` didn't compare user info when comparing two `Uri` instances for equality. However, this behavior is not intuitive in the case of `mailto:` URIs. With this change, `System.Uri.Equals*` and the `==`) operator now consider user info when comparing URIs.

## Previous behavior

Prior to .NET 8, both of the following comparisons returned `true`.

```csharp
Uri uri1 = new Uri("https://user1@www.microsoft.com");
Uri uri2 = new Uri("https://user2@www.microsoft.com");
System.Console.WriteLine(uri1 == uri2); // True.

Uri uri3 = new Uri("mailto:user1@microsoft.com");
Uri uri4 = new Uri("mailto:user2@microsoft.com");
System.Console.WriteLine(uri3 == uri4); // True.
```

## New behavior

Starting in .NET 8, the first comparison still returns `true`, but the second comparison (of `mailto` URIs) returns `false`.

```csharp
Uri uri1 = new Uri("https://user1@www.microsoft.com");
Uri uri2 = new Uri("https://user2@www.microsoft.com");
System.Console.WriteLine(uri1 == uri2); // True.

Uri uri3 = new Uri("mailto:user1@microsoft.com");
Uri uri4 = new Uri("mailto:user2@microsoft.com");
System.Console.WriteLine(uri3 == uri4); // False.
```

## Version introduced

.NET 8

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior was unexpected and unintuitive.

## Recommended action

If you want to compare only the host part of email addresses, compare only the `System.Uri.Host` members.

## Affected APIs

- `System.Uri.Equals(System.Uri)`
- `System.Uri.Equals(System.Object)`
- `System.Uri.op_Equality(System.Uri,System.Uri)`
