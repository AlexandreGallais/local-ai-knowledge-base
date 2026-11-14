---
title: "Breaking change: FileConfigurationProvider.Load throws InvalidDataException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/extensions/6.0/filename-in-load-exception.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# FileConfigurationProvider.Load throws InvalidDataException

When `Microsoft.Extensions.Configuration.FileConfigurationProvider.Load` fails to load a file, it throws an `System.IO.InvalidDataException`. If the file or directory doesn't exist, it throws a `System.IO.DirectoryNotFoundException` or `System.IO.FileNotFoundException`.

## Version introduced

6.0 RC 1

## Previous behavior

When loading failed, `Microsoft.Extensions.Configuration.FileConfigurationProvider.Load` did not throw an `System.IO.InvalidDataException`.

## New behavior

Starting in .NET 6, `Microsoft.Extensions.Configuration.FileConfigurationProvider.Load` throws an `System.IO.InvalidDataException` if a file fails to load. In addition, the exception message includes the file path that failed to load.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change improves the debugging experience. When a file fails to load, it's helpful to know which file failed to load.

## Recommended action

If you are catching specific exceptions when calling `Microsoft.Extensions.Configuration.FileConfigurationProvider.Load`, make sure to also catch `System.IO.InvalidDataException`.

## Affected APIs

- `Microsoft.Extensions.Configuration.FileConfigurationProvider.Load`
