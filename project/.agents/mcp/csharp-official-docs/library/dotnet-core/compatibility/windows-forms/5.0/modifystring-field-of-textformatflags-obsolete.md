---
title: "Breaking change: TextFormatFlags.ModifyString is obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/5.0/modifystring-field-of-textformatflags-obsolete.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TextFormatFlags.ModifyString is obsolete

The `System.Windows.Forms.TextFormatFlags.ModifyString` field is obsolete, as a warning, and may be removed in a future .NET version.

## Change description

In previous .NET versions, the `System.Windows.Forms.TextFormatFlags.ModifyString` enumeration field is not marked obsolete. In .NET 5 and later versions, it is marked obsolete as a warning. This field may be removed in a future .NET version.

## Reason for change

Passing a string to `System.Windows.Forms.TextRenderer.MeasureText*` with `System.Windows.Forms.TextFormatFlags.ModifyString` alters the string in some situations. This behavior breaks the string immutability promise and may lead to a fatal .NET runtime state corruption.

## Version introduced

.NET 5.0

## Recommended action

Update any code that relies on `System.Windows.Forms.TextFormatFlags.ModifyString`.

## Affected APIs

- `System.Windows.Forms.TextFormatFlags.ModifyString`
