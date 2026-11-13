---
title: "Breaking change: 'Revert behavior with text drag-and-drop operations'"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/wpf/7.0/drag-and-drop.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Drag-and-drop operations in text editors

.NET 7 addresses a regression introduced in .NET Core 3.0 concerning drag operations in text editor controls. This update restores the behavior to match that of .NET Framework, ensuring consistency in how data is set during drag operations.

## Version introduced

.NET 7

## Previous behavior

In .NET Core 3.0 through .NET 6, the data type on `System.Windows.DataObject` when dragging text from a text editor control was `System.Windows.DataFormats.Text` or `System.Windows.DataFormats.UnicodeText`.

## New behavior

Starting in .NET 7, the data type on `System.Windows.DataObject` when dragging text from a text editor control is `System.Windows.DataFormats.StringFormat`.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The change was made to revert an unintentional change in .NET 3.0 and match the behavior of .NET Framework.

## Recommended action

Upgrade older projects to the latest version of .NET to restore the behavior.

## Affected APIs

- `System.Windows.DataObject`
