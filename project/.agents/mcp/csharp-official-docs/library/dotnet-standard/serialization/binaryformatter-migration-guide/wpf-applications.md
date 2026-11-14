---
title: "BinaryFormatter migration guide: WPF apps"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/binaryformatter-migration-guide/wpf-applications.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Windows Presentation Foundation(WPF) migration guide for BinaryFormatter

## BinaryFormatter removal

Starting with .NET 9, [BinaryFormatter] is no longer supported due to its known security risks and its APIs always throw a `System.PlatformNotSupportedException` for all project types, including WPF apps. For more information about the risks [BinaryFormatter] poses and the reason for its removal, see the BinaryFormatter migration guide.

With [BinaryFormatter]’s removal, it's expected that many WPF applications will be impacted, and you'll need to take action to complete your migration to .NET 9 or a later version.

## How BinaryFormatter affects WPF

Prior to .NET 9, Windows Presentation Foundation (WPF) used [BinaryFormatter] to serialize and deserialize data for scenarios such clipboard, drag-and-drop, and load/store state in Journal. Starting with .NET 9, WPF and Windows Forms use a subset of the [BinaryFormatter] implementation internally for these scenarios. While [BinaryFormatter]'s risks cannot be addressed in general-purpose serialization/deserialization, measures have been taken to mitigate the risks in these very specific use cases with a known set of types. A fall-back to [BinaryFormatter] is still in place for unknown or unsupported types, which will throw a `System.PlatformNotSupportedException` unless migration steps are taken in the application.

WPF and WinForms apps both handle the following types, along with arrays and lists of these types. Clipboard, drag-and-drop, and Avalon Binding in Journal will continue to work with these types without any migration steps needed.

- `bool`
- `byte`
- `char`
- `decimal`
- `double`
- `int`
- `sbyte`
- `float`
- `System.TimeSpan`
- `System.DateTime`
- `uint`
- `string`
- `nint`
- `nuint`
- `long`
- `ulong`
- `short`
- `ushort`
- `System.Drawing.PointF`
- `System.Drawing.RectangleF`

### OLE Scenarios

For information about the effects [BinaryFormatter] removal has on OLE scenarios such as clipboard and drag-and-drop as well as migration guidance see Windows Forms and Windows Presentation Foundation BinaryFormatter OLE guidance.

You can refer to the function where we have used [BinaryFormatter] as fallback to read/save object to handle: SaveObjectToHandle and ReadObjectFromHandle for OLE scenarios

### Journaling

In the case when we need to store or load a state while managing the navigation history in WPF.

To load/save we call LoadSubStreams/ SaveSubStreams of `DataStream` class. If the element used in not part of know type handled by the new implementation, it will use [BinaryFormatter].

When a developer navigates through JournalEntry using `Navigate`, `GoForward`, or `GoBack`, the node's data is loaded or saved to a stream to save the state. If the type involved is not intrinsically handled during serialization/deserialization, [BinaryFormatter] is used.

Ref: DataStream.cs

### Compatibility Workaround (Not Recommended)

.NET 9 users who can't migrate away from [BinaryFormatter] can install an unsupported compatibility package. For more information, see BinaryFormatter migration guide: Compatibility Package.

> **Caution:**
> [BinaryFormatter] is dangerous and not recommended as it puts consuming apps at risk for attacks such as denial of service (DoS), information disclosure, or remote code execution. For more information about the risks [BinaryFormatter] poses, see Deserialization risks in use of BinaryFormatter and related types.

### Issues

If you experience unexpected behavior with your WPF application regarding [BinaryFormatter], please file an issue at dotnet/wpf/issues and indicate that the issue is related to the removal of [BinaryFormatter].
