---
title: "Breaking change: WinForms methods now throw ArgumentNullException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/5.0/null-args-cause-argumentnullexception.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# WinForms methods now throw ArgumentNullException

Some Windows Forms methods now throw an `System.ArgumentNullException` for null arguments, where previously they threw a `System.NullReferenceException`.

## Change description

Previously, certain Windows Forms methods threw a `System.NullReferenceException` if passed an argument that was null. Starting in .NET 5, these methods now throw an `System.ArgumentNullException` for null arguments, instead.

Throwing an `System.ArgumentNullException` conforms to the behavior of the .NET runtime. It also improves the debugging experience by clearly communicating that an argument is null and which argument it is.

## Version introduced

.NET 5.0

## Recommended action

If you call any of these methods and your code currently catches a `System.NullReferenceException` for null arguments, catch an `System.ArgumentNullException` instead. In addition, consider updating the code to prevent passing null arguments to the listed methods.

## Affected APIs

The following table lists the affected methods and parameters:

>
> | Method | Parameter name | Version added |
> |-|-|-|
> | `System.Windows.Forms.Control.ControlCollection.#ctor(System.Windows.Forms.Control)` | `owner` | Preview 1 |
> | `System.Windows.Forms.TabControl.GetToolTipText(System.Object)` | `item` | Preview 1 |
> | `System.Windows.Forms.TableLayoutControlCollection.#ctor(System.Windows.Forms.TableLayoutPanel)` | `container` | Preview 1 |
> | `System.Windows.Forms.ToolStripRenderer.OnRenderArrow(System.Windows.Forms.ToolStripArrowRenderEventArgs)` | `e` | Preview 1 |
> | `System.Windows.Forms.ToolStripRenderer.OnRenderItemCheck(System.Windows.Forms.ToolStripItemImageRenderEventArgs)` | `e` | Preview 1 |
> | `System.Windows.Forms.ToolStripRenderer.OnRenderItemImage(System.Windows.Forms.ToolStripItemImageRenderEventArgs)` | `e` | Preview 1 |
> | `System.Windows.Forms.ToolStripRenderer.OnRenderItemText(System.Windows.Forms.ToolStripItemTextRenderEventArgs)` | `e` | Preview 1 |
> | `System.Windows.Forms.ToolStripRenderer.OnRenderStatusStripSizingGrip(System.Windows.Forms.ToolStripRenderEventArgs)` > | `e` | Preview 1 |
> | `System.Windows.Forms.DataGridViewComboBoxEditingControl.ApplyCellStyleToEditingControl(System.Windows.Forms.DataGridViewCellStyle)` | `dataGridViewCellStyle` | Preview 2 |
> | `System.Windows.Forms.RichTextBox.LoadFile(System.IO.Stream,System.Windows.Forms.RichTextBoxStreamType)` | `data` | Preview 2 |
> | `System.Windows.Forms.ListBox.IntegerCollection.#ctor(System.Windows.Forms.ListBox)` | `owner` | Preview 5 |
> | `System.Windows.Forms.ListBox.IntegerCollection.CopyTo(System.Array,System.Int32)` | `destination` | Preview 5 |
> | `System.Windows.Forms.ListViewGroup.System#Runtime#Serialization#ISerializable#GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | `info` | Preview 5 |
> | `System.Windows.Forms.VisualStyles.VisualStyleRenderer.#ctor(System.String,System.Int32,System.Int32)` | `className` | Preview 5 |
> | `System.Windows.Forms.ListBox.ObjectCollection.#ctor(System.Windows.Forms.ListBox)` | `owner` | Preview 6 |
> | `System.Windows.Forms.ListBox.ObjectCollection.#ctor(System.Windows.Forms.ListBox,System.Object[])` | `owner`, `value` | Preview 6 |
> | `System.Windows.Forms.ListBox.ObjectCollection.#ctor(System.Windows.Forms.ListBox,System.Windows.Forms.ListBox.ObjectCollection)` | `owner`, `value` | Preview 6 |
> | `System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Object[])` | `items` | Preview 6 |
> | `System.Windows.Forms.ListBox.ObjectCollection.AddRange(System.Windows.Forms.ListBox.ObjectCollection)` | `value` | Preview 6 |
> | `System.Windows.Forms.ListBox.ObjectCollection.CopyTo(System.Object[],System.Int32)` | `destination` | Preview 6 |
> | `System.Windows.Forms.ListBox.ObjectCollection.System#Collections#ICollection#CopyTo(System.Array,System.Int32)` | `destination` | Preview 6 |
> | `System.Windows.Forms.ListView.SelectedIndexCollection.#ctor(System.Windows.Forms.ListView)` | `owner` | Preview 7 |
> | `System.Windows.Forms.TreeNodeCollection.Find(System.String,System.Boolean)` | `key` is `null` or empty | Preview 8 |
> | `System.Windows.Forms.ListView.ListViewItemCollection.Find(System.String,System.Boolean)` | `key` is `null` or empty | RC1 |
> | `System.Windows.Forms.ScrollableControl.OnPaintBackground(System.Windows.Forms.PaintEventArgs)` | `e` | RC1 |
