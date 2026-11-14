---
title: ".NET 6 breaking change: DataGridView-related APIs throw InvalidOperationException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/6.0/null-owner-causes-invalidoperationexception.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# DataGridView-related APIs now throw InvalidOperationException

Some APIs related to `System.Windows.Forms.DataGridView` now throw an `System.InvalidOperationException` if the object's `System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner` value is `null`.

## Change description

In previous .NET versions, the affected APIs throw a `System.NullReferenceException` when they are invoked and the `System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner` property value is `null`. Starting in .NET 6, these APIs throw an `System.InvalidOperationException` instead of a `System.NullReferenceException` if the `System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner` property value is `null` when they're invoked.

## Change category

This change affects binary compatibility.

## Reason for change

Throwing an `System.InvalidOperationException` conforms to the behavior of the .NET runtime. It also improves the debugging experience by clearly communicating the invalid property.

## Version introduced

.NET 6

## Recommended action

Review your code and, if necessary, update it to prevent constructing the affected types with the `System.Windows.Forms.DataGridViewCell.DataGridViewCellAccessibleObject.Owner` property as `null`.

## Affected APIs

The following table lists the affected properties and methods:

- `System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Bounds`
- `System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.DefaultAction`
- `System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Name`
- `System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.Navigate(System.Windows.Forms.AccessibleNavigation)`
- `System.Windows.Forms.DataGridViewTopLeftHeaderCell.DataGridViewTopLeftHeaderCellAccessibleObject.State`

## See also

- DataGridView-related APIs throw InvalidOperationException (.NET 5)
