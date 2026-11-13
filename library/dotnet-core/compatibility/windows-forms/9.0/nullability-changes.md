---
title: "Breaking change: Changes to nullability annotations (Windows Forms)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/9.0/nullability-changes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Changes to nullability annotations (Windows Forms)

In .NET 9, some nullability annotations on the Windows Forms APIs have changed.

## Previous behavior

Previously, some parameters were marked as nullable.

## New behavior

Starting in .NET 9, these parameters are marked as non-nullable. If you pass an argument that might be null, you'll get a compiler warning.

## Version introduced

.NET 9 Preview 1

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The parameter on `System.Windows.Forms.Design.IWindowsFormsEditorService.DropDownControl(System.Windows.Forms.Control)` was previously marked as nullable, but there's no guidance for implementers on how they should handle null input. Also, logically this method should not accept `null`.

## Affected APIs

The following table lists the affected APIs:

| API | What changed | Recommended action |
| - | - | - |
| `System.Windows.Forms.Design.IWindowsFormsEditorService.DropDownControl(System.Windows.Forms.Control)` | The `control` parameter is non-nullable | Make sure you're not passing a nullable `Control` to this method. Also, update any implementations of `System.Windows.Forms.Design.IWindowsFormsEditorService` to remove nullability of the `DropDownControl` method's parameter. |
