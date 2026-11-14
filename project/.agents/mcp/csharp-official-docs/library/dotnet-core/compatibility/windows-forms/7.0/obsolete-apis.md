---
title: "Breaking change: .NET 7 obsoletions and warnings in Windows Forms"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/7.0/obsolete-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Windows Forms obsoletions and warnings (.NET 7)

Some Windows Forms APIs have been marked as obsolete, starting in .NET 7. Other APIs aren't obsolete but will cause a compile-time warning if you reference them.

## Previous behavior

In previous .NET versions, these APIs can be used without any build warning.

## New behavior

In .NET 7 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages.

| Diagnostic ID | Description | Severity | Version introduced |
| - | - |
| WFDEV001 | Casting to/from `System.IntPtr` is unsafe. Use `WParamInternal`, `LParamInternal`, or `ResultInternal` instead. | Warning | Preview 1 |
| WFDEV002 | `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject` is no longer used to provide accessible support for `System.Windows.Forms.DomainUpDown` controls. Use `System.Windows.Forms.AccessibleObject` instead. | Warning | RC 1 |
| WFDEV003 | `System.Windows.Forms.DomainUpDown.DomainItemAccessibleObject` is no longer used to provide accessible support for `System.Windows.Forms.DomainUpDown` items. Use `System.Windows.Forms.AccessibleObject` instead. | Warning | RC 1 |

## Version introduced

.NET 7

## Type of breaking change

These obsoletions and warnings can affect source compatibility.

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.
- If necessary, you can suppress the warning using the custom `WFDEVxxx` diagnostic ID value.

## Affected APIs

### WFDEV001

- `System.Windows.Forms.Message.WParam`
- `System.Windows.Forms.Message.LParam`
- `System.Windows.Forms.Message.Result`

### WFDEV002

- `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject`

### WFDEV003

- `System.Windows.Forms.DomainUpDown.DomainItemAccessibleObject`

## See also

- Obsolete Windows Forms features in .NET 7+
