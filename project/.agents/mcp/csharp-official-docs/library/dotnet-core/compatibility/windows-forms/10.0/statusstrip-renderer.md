---
title: "Breaking change: System.Windows.Forms.StatusStrip uses System RenderMode by default"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/10.0/statusstrip-renderer.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Windows.Forms.StatusStrip uses System RenderMode by default

`System.Windows.Forms.StatusStrip` has been updated to use the system renderer.

## Version introduced

.NET 10

## Previous behavior

Previously, `System.Windows.Forms.StatusStrip` used the default renderer.

## New behavior

The `StatusStrip.RenderMode` property is set to `System.Windows.Forms.ToolStripRenderMode.System` by default. You might observe minor changes to the appearance of the `StatusStrip`.

## Change category

This change is a *behavioral change*.

## Reason for change

The previous behavior was changed in .NET 9. This reverts the behavior to the previous default behavior.

## Recommended action

N/A

## Affected APIs

- `System.Windows.Forms.StatusStrip`
- `System.Windows.Forms.ToolStripManager.RenderMode`
