---
title: "Breaking change: WinForms methods now throw ArgumentException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/5.0/invalid-args-cause-argumentexception.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# WinForms methods now throw ArgumentException

Some Windows Forms methods now throw an `System.ArgumentException` for invalid arguments, where previously they did not.

## Change description

Previously, passing arguments of an unexpected or incorrect type to certain Windows Forms methods would result in an indeterminate state. Starting in .NET 5, these methods now throw an `System.ArgumentException` when passed invalid arguments.

Throwing an `System.ArgumentException` conforms to the behavior of the .NET runtime. It also improves the debugging experience by clearly communicating which argument is invalid.

## Version introduced

.NET 5.0

## Recommended action

- Update the code to prevent passing invalid arguments.
- If necessary, handle an `System.ArgumentException` when calling the method.

## Affected APIs

The following table lists the affected methods and parameters:

| Method | Parameter name | Condition | Version added |
|-|-|-|-|
| `System.Windows.Forms.TabControl.GetToolTipText(System.Object)` | `item` | Argument is not of type `System.Windows.Forms.TabPage`. | Preview 1 |
| `System.Windows.Forms.DataFormats.GetFormat(System.String)` | `format` | Argument is `null`, `System.String.Empty`, or white space. | Preview 5 |
| `System.Windows.Forms.InputLanguageChangedEventArgs.#ctor(System.Globalization.CultureInfo,System.Byte)` | `culture` | Unable to retrieve an `InputLanguage` for the specified culture. | Preview 7 |
