---
title: "Breaking change: Removed status bar controls"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/5.0/winforms-deprecated-controls.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Removed status bar controls

Starting in .NET 5, some Windows Forms controls are no longer available.

## Change description

Starting with .NET 5, some of the status bar-related Windows Forms controls are no longer available. Replacement controls that have better design and support were introduced in .NET Framework 2.0. The deprecated controls were previously removed from designer toolboxes but were still available to be used. Now, they have been completely removed.

The following types are no longer available:

* `StatusBar`
* `StatusBarDrawItemEventArgs`
* `StatusBarDrawItemEventHandler`
* `StatusBarPanel`
* `StatusBarPanelAutoSize`
* `StatusBarPanelBorderStyle`
* `StatusBarPanelClickEventArgs`
* `StatusBarPanelClickEventHandler`
* `StatusBarPanelStyle`

## Version introduced

5.0

## Recommended action

Move to the replacement APIs for these controls and their scenarios:

| Old Control (API) | Recommended Replacement                          |
|-------------------|--------------------------------------------------|
| StatusBar         | `System.Windows.Forms.StatusStrip`          |
| StatusBarPanel    | `System.Windows.Forms.ToolStripStatusLabel` |

## Affected APIs

- `System.Windows.Forms.StatusBar`
- `System.Windows.Forms.StatusBarDrawItemEventArgs`
- `System.Windows.Forms.StatusBarDrawItemEventHandler`
- `System.Windows.Forms.StatusBarPanel`
- `System.Windows.Forms.StatusBarPanelAutoSize`
- `System.Windows.Forms.StatusBarPanelBorderStyle`
- `System.Windows.Forms.StatusBarPanelClickEventArgs`
- `System.Windows.Forms.StatusBarPanelClickEventHandler`
- `System.Windows.Forms.StatusBarPanelStyle`
