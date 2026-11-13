---
title: "Breaking change: Some TableLayoutSettings properties throw InvalidEnumArgumentException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/6.0/tablelayoutsettings-apis-throw-invalidenumargumentexception.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Selected TableLayoutSettings properties throw InvalidEnumArgumentException

Selected `System.Windows.Forms.TableLayoutSettings` properties now throw an `System.ComponentModel.InvalidEnumArgumentException` if you attempt to assign an incorrect value.

## Change description

In previous .NET versions, these properties throw an `System.ArgumentOutOfRangeException` if you attempt to assign an incorrect value. Starting in .NET 6, these properties throw an `System.ComponentModel.InvalidEnumArgumentException` in such cases.

## Change category

This change affects binary compatibility.

## Reason for change

Throwing `System.ComponentModel.InvalidEnumArgumentException` is in line with the existing Windows Forms API in similar situations. Throwing this exception also provides developers with a better debug experience.

## Version introduced

.NET 6

## Recommended action

- Update the code to prevent assigning incorrect values.
- If necessary, handle an `System.ComponentModel.InvalidEnumArgumentException` when accessing these APIs.

## Affected APIs

- `System.Windows.Forms.TableLayoutPanel.CellBorderStyle`
- `System.Windows.Forms.TableLayoutPanel.GrowStyle`
