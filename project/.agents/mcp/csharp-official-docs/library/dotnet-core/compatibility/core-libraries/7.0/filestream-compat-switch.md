---
title: ".NET 7 breaking change: Legacy FileStream strategy removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/7.0/filestream-compat-switch.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Legacy FileStream strategy removed

The `AppContext` switch `System.IO.UseNet5CompatFileStream` and the ability to use the legacy `System.IO.FileStream` implementation were removed.

## Previous behavior

The legacy `FileStream` implementation was available and you could opt in to it by using the `UseNet5CompatFileStream` switch or the `DOTNET_SYSTEM_IO_USENET5COMPATFILESTREAM` environment variable.

## New behavior

Starting in .NET 7, you can no longer opt in to use the legacy `FileStream` implementation.

## Version introduced

.NET 7 Preview 1

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The `UseNet5CompatFileStream` switch and `DOTNET_SYSTEM_IO_USENET5COMPATFILESTREAM` environment variable were included in .NET 6 in case the new implementation caused breaking changes. Any breaking changes have now been fixed. Since there are no more bugs introduced by the `FileStream` changes, the compatibility mode was removed and with it all the legacy code, which makes the codebase easier to maintain.

## Recommended action

If you're currently using the switch (or the `DOTNET_SYSTEM_IO_USENET5COMPATFILESTREAM` environment variable) to opt in to legacy code and are upgrading to .NET 7, the switch will no longer have any effect and you should remove it.

## Affected APIs

- `System.IO.FileStream`
- `System.IO.File.Create(System.String)`
- `System.IO.File.Create(System.String,System.Int32)`
- `System.IO.File.Create(System.String,System.Int32,System.IO.FileOptions)`
- `System.IO.File.Create(System.String,System.Int32,System.IO.FileOptions,System.Security.AccessControl.FileSecurity)`
- `System.IO.File.Open(System.String,System.IO.FileMode)`
- `System.IO.File.Open(System.String,System.IO.FileStreamOptions)`
- `System.IO.File.Open(System.String,System.IO.FileMode,System.IO.FileAccess)`
- `System.IO.File.Open(System.String,System.IO.FileMode,System.IO.FileAccess,System.IO.FileShare)`
- `System.IO.File.OpenRead(System.String)`
- `System.IO.File.OpenWrite(System.String)`
- `System.IO.FileSystemAclExtensions.Create(System.IO.FileInfo,System.IO.FileMode,System.Security.AccessControl.FileSystemRights,System.IO.FileShare,System.Int32,System.IO.FileOptions,System.Security.AccessControl.FileSecurity)`
- `System.IO.FileInfo.Create`
- `System.IO.FileInfo.Open*`
- `System.IO.FileInfo.OpenRead`
- `System.IO.FileInfo.OpenWrite`

## See also

- FileStream no longer synchronizes file offset with OS (.NET 6)
- FileStream.Position updates after ReadAsync or WriteAsync completes (.NET 6)
