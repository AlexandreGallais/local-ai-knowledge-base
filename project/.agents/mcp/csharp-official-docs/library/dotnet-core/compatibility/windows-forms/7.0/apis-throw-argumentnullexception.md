---
title: "Breaking change: Some APIs throw ArgumentNullException (.NET 7)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/7.0/apis-throw-argumentnullexception.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Some APIs throw ArgumentNullException (.NET 7)

Some APIs now validate input parameters and throw an `System.ArgumentNullException` where previously they threw a `System.NullReferenceException`, if invoked with `null` input arguments.

## Previous behavior

In previous .NET versions, the affected APIs throw a `System.NullReferenceException` if invoked with an argument that's `null`.

## New behavior

Starting in .NET 7, the affected APIs throw an `System.ArgumentNullException` if invoked with an argument that's `null`.

## Change category

This change affects binary compatibility.

## Reason for change

Throwing `System.ArgumentNullException` conforms to .NET Runtime behavior. It provides a better debug experience by clearly communicating which argument caused the exception.

## Version introduced

.NET 7

## Recommended action

- Review and, if necessary, update your code to prevent passing `null` input arguments to the affected APIs.
- If your code handles `System.NullReferenceException`, replace or add an additional handler for `System.ArgumentNullException`.

## Affected APIs

The following table lists the affected APIs and specific parameters.

| Method/property | Parameter name | Change version |
|-|-|-|
| `System.Windows.Forms.ComboBox.ChildAccessibleObject.#ctor(System.Windows.Forms.ComboBox,System.IntPtr)` | `owner` | Preview 1 |
| `System.Windows.Forms.ControlPaint.CreateHBitmap16Bit(System.Drawing.Bitmap,System.Drawing.Color)` | `bitmap` | Preview 1 |
| `System.Windows.Forms.ControlPaint.CreateHBitmapColorMask(System.Drawing.Bitmap,System.IntPtr)` | `bitmap` | Preview 1 |
| `System.Windows.Forms.DataGridViewEditingControlShowingEventArgs.#ctor(System.Windows.Forms.Control,System.Windows.Forms.DataGridViewCellStyle)` | `control` or `cellStyle` | Preview 1 |
| `System.Windows.Forms.ToolStripArrowRenderEventArgs.#ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripItem,System.Drawing.Rectangle,System.Drawing.Color,System.Windows.Forms.ArrowDirection)` | `g` | Preview 1 |
| `System.Windows.Forms.ToolStripContentPanelRenderEventArgs.#ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripContentPanel)` | `g` or `contentPanel` | Preview 1 |
| `System.Windows.Forms.ToolStripItemRenderEventArgs.#ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripItem)` | `g` or `item` | Preview 1 |
| `System.Windows.Forms.ToolStripPanelRenderEventArgs.#ctor(System.Drawing.Graphics,System.Windows.Forms.ToolStripPanel)` | `g` or `toolStripPanel` | Preview 1 |
| `System.Windows.Forms.ListView.CheckedIndexCollection.#ctor(System.Windows.Forms.ListView)` | `owner` | Preview 5 |
