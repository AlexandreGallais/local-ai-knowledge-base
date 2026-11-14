---
title: "Breaking change: System.Drawing OutOfMemoryException changed to ExternalException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/10.0/system-drawing-outofmemory-externalexception.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Drawing OutOfMemoryException changed to ExternalException

GDI+ error handling in System.Drawing has been updated to throw `System.Runtime.InteropServices.ExternalException` instead of `System.OutOfMemoryException` for `Status.OutOfMemory` errors.

## Version introduced

.NET 10

## Previous behavior

Previously, when GDI+ encountered `Status.OutOfMemory` errors (often due to invalid input rather than actual memory issues), System.Drawing APIs threw `System.OutOfMemoryException`.

## New behavior

Starting in .NET 10, when GDI+ encounters `Status.OutOfMemory` errors, System.Drawing APIs now throw `System.Runtime.InteropServices.ExternalException`.

## Type of breaking change

This is a behavioral change.

## Reason for change

GDI+ isn't particularly good at returning errors when it's unable to create internal objects. There are many cases where object creation fails due to invalid input, and higher-level code gets a null and turns it into `Status.OutOfMemory`. This is frequently a source of confusion since the error is often not related to actual memory issues.

The change to `ExternalException` provides more accurate error reporting, as this exception type is already thrown in other System.Drawing code paths for similar GDI+ errors.

## Recommended action

If your code catches `OutOfMemoryException` when using System.Drawing APIs, ensure you also catch `ExternalException` to handle these GDI+ errors.

```csharp
try
{
    // System.Drawing operations
}
catch (ExternalException ex)
{
    // Handle GDI+ errors (including former OutOfMemoryException cases)
}
catch (OutOfMemoryException ex)
{
    // Handle actual memory issues
}
```

```vb
Try
    ' System.Drawing operations
Catch ex As ExternalException
    ' Handle GDI+ errors (including former OutOfMemoryException cases)
Catch ex As OutOfMemoryException
    ' Handle actual memory issues
End Try
```

## Affected APIs

All System.Drawing APIs that interact with GDI+ and previously could throw `OutOfMemoryException` for `Status.OutOfMemory` errors, including but not limited to:

- `System.Drawing.Bitmap` constructors and methods
- `System.Drawing.Graphics` methods
- `System.Drawing.Image` methods
- `System.Drawing.Icon` constructors and methods
- Other System.Drawing types that use GDI+ internally
