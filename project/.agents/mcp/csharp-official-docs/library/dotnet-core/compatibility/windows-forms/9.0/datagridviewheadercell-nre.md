---
title: "Breaking change: No exception if DataGridView is null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/9.0/datagridviewheadercell-nre.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# No exception if DataGridView is null

Previously, a `System.NullReferenceException` was thrown in `System.Windows.Forms.DataGridViewHeaderCell.MouseDownUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)`, `System.Windows.Forms.DataGridViewHeaderCell.MouseEnterUnsharesRow(System.Int32)`, `System.Windows.Forms.DataGridViewHeaderCell.MouseLeaveUnsharesRow(System.Int32)`, and `System.Windows.Forms.DataGridViewHeaderCell.MouseUpUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)` if the `System.Windows.Forms.DataGridViewElement.DataGridView` property was null. That behavior was unexpected and incorrect. These methods have been updated to simply return `false` if `DataGridView` is `null`.

## Version introduced

.NET 9 Preview 1

## Previous behavior

Previously, the affected methods threw a `System.NullReferenceException` when `DataGridViewHeaderCell.DataGridView` was `null`.

## New behavior

Starting in .NET 9, the affected methods return `false` if the `DataGridViewHeaderCell.DataGridView` property is `null`

## Change category

This change is a *behavioral change*.

## Reason for change

The previous behavior was incorrect.

## Recommended action

If you were relying on the code to throw a `System.NullReferenceException` in this scenario, change your code to check the return value instead.

## Affected APIs

- `System.Windows.Forms.DataGridViewHeaderCell.MouseDownUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)`
- `System.Windows.Forms.DataGridViewHeaderCell.MouseEnterUnsharesRow(System.Int32)`
- `System.Windows.Forms.DataGridViewHeaderCell.MouseLeaveUnsharesRow(System.Int32)`
- `System.Windows.Forms.DataGridViewHeaderCell.MouseUpUnsharesRow(System.Windows.Forms.DataGridViewCellMouseEventArgs)`
