---
title: "Breaking change: .NET 10 obsoletions in Windows Forms"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/10.0/obsolete-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Windows Forms obsoletions (.NET 10)

Some Windows Forms APIs have been marked as obsolete, starting in .NET 10.

## Previous behavior

Previously, the affected APIs could be used without any build warnings.

## New behavior

In .NET 10 and later versions, use of these APIs produces a compile-time warning with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages.

| Diagnostic ID | Description | Severity |
|---------------|-------------|----------|
| WFDEV004 | `System.Windows.Forms.Form.OnClosing(System.ComponentModel.CancelEventArgs)`, `System.Windows.Forms.Form.OnClosed(System.EventArgs)` and the corresponding events are obsolete. Use `System.Windows.Forms.Form.OnFormClosing(System.Windows.Forms.FormClosingEventArgs)`, `System.Windows.Forms.Form.OnFormClosed(System.Windows.Forms.FormClosedEventArgs)`, `System.Windows.Forms.Form.FormClosing` and `System.Windows.Forms.Form.FormClosed` instead. | Warning |
| WFDEV005 | `System.Windows.Clipboard.GetData(System.String)` method is obsolete. Use `System.Windows.Forms.Clipboard.TryGetData*` methods instead. | Warning |
| WFDEV006 | `System.Windows.Forms.ContextMenu`, `System.Windows.Forms.DataGrid`, `System.Windows.Forms.MainMenu`, `System.Windows.Forms.Menu`, `System.Windows.Forms.StatusBar`, `System.Windows.Forms.ToolBar` are obsolete. They're provided for binary compatibility with .NET Framework. | Warning |

## Version introduced

.NET 10

## Type of breaking change

These obsoletion warnings can affect source compatibility.

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.
- If necessary, you can suppress the warning using the custom `WFDEVxxx` diagnostic ID value.

## Affected APIs

### WFDEV004

- `System.Windows.Forms.Form.OnClosing(System.ComponentModel.CancelEventArgs)`
- `System.Windows.Forms.Form.OnClosed(System.EventArgs)`

### WFDEV005

- `System.Windows.Clipboard.GetData(System.String)`

### WFDEV006

- `System.Windows.Forms.ContextMenu`
- `System.Windows.Forms.DataGrid`
- `System.Windows.Forms.MainMenu`
- `System.Windows.Forms.Menu`
- `System.Windows.Forms.StatusBar`
- `System.Windows.Forms.ToolBar`

## See also

- Obsolete Windows Forms features in .NET 10+
