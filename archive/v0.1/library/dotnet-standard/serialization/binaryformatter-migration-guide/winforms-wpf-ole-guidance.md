---
title: "BinaryFormatter migration guide: WinForms and WPF OLE guidance"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/binaryformatter-migration-guide/winforms-wpf-ole-guidance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Windows Forms and Windows Presentation Foundation BinaryFormatter OLE guidance

This document outlines the effects the [BinaryFormatter] removal has on OLE scenarios in Windows Forms and Windows Presentation Foundation (WPF). For information about the effects of BinaryFormatter removal in Windows Forms in general see Windows Forms migration guide for BinaryFormatter. For information about the effects of [BinaryFormatter] removal in WPF in general see WPF migration guide for BinaryFormatter.

## BinaryFormatter in OLE scenarios

### Clipboard

All standard OLE DataFormats in `System.Windows.Forms.DataFormats` and `System.Windows.DataFormats` don't go through BinaryFormatter, except for `DataFormats.Serializable` and any custom format. If you're using `DataFormats.Serializable` or a custom format, [BinaryFormatter] is used if your clipboard scenario involves a type that isn't intrinsically handled as outlined in Windows Forms migration guide for BinaryFormatter and WPF Migration Guide – Binary Formatter. Particularly, [BinaryFormatter] is used when `System.Windows.Forms.Clipboard.SetData*` or `System.Windows.Clipboard.SetData*` is called with your type and when `System.Windows.Forms.Clipboard.GetData*` or `System.Windows.Clipboard.GetData*` is called to get your type. BinaryFormatter is also used if `System.Windows.Forms.Clipboard.SetDataObject*` or `System.Windows.Clipboard.SetDataObject*` is called. With the BinaryFormatter removal, you won't see an exception when setting the data on the clipboard if BinaryFormatter was needed. Instead, you'll see a string about [BinaryFormatter] being removed when you attempt to get the type that isn't intrinsically handled from the clipboard.

### Drag-and-drop feature

If your drag-and-drop scenario involves types that aren't intrinsically handled during serialization and deserialization, [BinaryFormatter] is used when `System.Windows.Forms.Control.DoDragDrop*` or `System.Windows.DragDrop.DoDragDrop*` is called and the data has been dragged out of process. [BinaryFormatter] is also used when `System.Windows.Forms.DataObject.GetData*` or `System.Windows.DataObject.GetData*` is called to retrieve the data that originated from another process if the type isn't intrinsically handled. With the [BinaryFormatter] removal, you'll now see a string about [BinaryFormatter] being removed when you attempt retrieve the data that has originated from another process for types that aren't intrinsically handled.

## Migrating away from BinaryFormatter

### Clipboard and drag-and-drop

For types that aren't intrinsically handled that are used in clipboard and drag-and-drop operations, it's recommended that you format those types as a `byte[]` or `string` payload before passing the data to clipboard or drag-and-drop APIs. Using JSON is one way to achieve this. You'll need to make adjustments to handle receiving a JSON formatted type similar to adjustments made to place JSON formatted types on clipboard or drag-and-drop operations. For more information on how to serialize and deserialize the type with JSON, see How to write .NET objects as JSON (serialize).

## Issues

If you experience unexpected behavior with your Windows Forms or WPF app regarding [BinaryFormatter] serialization or deserializing, please file an issue at github.com/dotnet/winforms or github.com/dotnet/wpf respectively.
