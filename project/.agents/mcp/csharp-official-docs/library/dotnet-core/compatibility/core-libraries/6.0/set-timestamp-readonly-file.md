---
title: "Breaking change: Set timestamp on read-only file on Windows"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/6.0/set-timestamp-readonly-file.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Set timestamp on read-only file on Windows

Setting the timestamp on a file with the read-only attribute now succeeds on Windows and no longer throws an exception.

## Old behavior

Prior to .NET 6 servicing releases, setting the timestamp on a read-only file on Windows resulted in an `System.UnauthorizedAccessException`.

## New behavior

Starting in .NET 6.0.2, setting the timestamp on a read-only file on Windows succeeds.

## Version introduced

.NET 6.0.2 (servicing release)

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

Customers gave feedback that they expected setting the timestamp on a read-only file to succeed. This change also makes the Windows behavior consistent with Linux. Finally, the behavior was unintentional, caused by a bug.

## Recommended action

It is unlikely that existing code expects setting the timestamp on a read-only file to fail. However, if your code expects it to fail, add a check for the read-only attribute using `System.IO.File.GetAttributes(System.String)` before attempting to set the timestamp.

## Affected APIs

- `System.IO.File.SetCreationTime(System.String,System.DateTime)`
- `System.IO.File.SetCreationTimeUtc(System.String,System.DateTime)`
- `System.IO.File.SetLastAccessTime(System.String,System.DateTime)`
- `System.IO.File.SetLastAccessTimeUtc(System.String,System.DateTime)`
- `System.IO.File.SetLastWriteTime(System.String,System.DateTime)`
- `System.IO.File.SetLastWriteTimeUtc(System.String,System.DateTime)`
