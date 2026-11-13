---
title: ".NET 6 breaking change: File.Replace exceptions on Unix"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/file-replace-exceptions-on-unix.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# File.Replace on Unix throws exceptions to match Windows implementation

The behavior of `System.IO.File.Replace*` on Unix-based operating systems has changed. The exceptions it throws now match those that are thrown by the Windows implementation.

## Previous behavior

On Unix, with .NET 5, the `System.IO.File.Replace*` method:

- Throws `System.IO.IOException` with the message `Is a directory` when `sourceFileName` is a file and `destinationFileName` is a directory.
- Throws `System.IO.IOException` with the message `Not a directory` when `sourceFileName` is a directory and `destinationFileName` is a file.
- Silently succeeds when both `sourceFileName` and `destinationFileName` point to the same file or directory.

## New behavior

On Unix, with .NET 6, the `System.IO.File.Replace*` method:

- Throws `System.UnauthorizedAccessException` with the message `The specified path  is not a path`, when either `sourceFileName` or `destinationFileName` exists and is not a file, or when both `sourceFileName` and `destinationFileName` point to the same existing directory.
- Throws `System.IO.IOException` with the message `The source <sourceFileName> and destination <destinationFileName> are the same file` when `sourceFileName` and `destinationFileName` point to the same existing file.

## Version introduced

.NET 6

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change was made to ensure that `System.IO.File.Replace*` throws the same exceptions for the same reasons across platforms.

## Recommended action

If you invoke `System.IO.File.Replace*` on Unix inside a `try catch` block, make sure to now also catch `System.UnauthorizedAccessException`. Also, be aware of the new behaviors that are caught.

## Affected APIs

- `System.IO.File.Replace*`
